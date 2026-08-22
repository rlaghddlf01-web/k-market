// 중고나라 다중 사진(2~3장) + 압축 최적화 실매물 데이터셋 빌더
const https = require('https');
const fs = require('fs');

const KEYWORDS = [
  // 생활/주방가전
  { cat: 'appliances', term: '쿠쿠 밥솥' },
  { cat: 'appliances', term: '쿠첸 밥솥' },
  { cat: 'appliances', term: '전기밥솥' },
  { cat: 'appliances', term: '통돌이 세탁기' },
  { cat: 'appliances', term: '드럼 세탁기' },
  { cat: 'appliances', term: '소형 냉장고' },
  { cat: 'appliances', term: '2도어 냉장고' },
  { cat: 'appliances', term: '전자레인지' },
  { cat: 'appliances', term: '에어프라이어' },
  { cat: 'appliances', term: '무선 청소기' },
  { cat: 'appliances', term: '선풍기' },
  { cat: 'appliances', term: '온수매트' },
  { cat: 'appliances', term: '전기포트' },
  { cat: 'appliances', term: '휴대용 가스버너' },
  { cat: 'appliances', term: '인덕션' },

  // 가구/침구
  { cat: 'furniture', term: '싱글 침대' },
  { cat: 'furniture', term: '침대 매트리스' },
  { cat: 'furniture', term: '서랍장' },
  { cat: 'furniture', term: '옷걸이 행거' },
  { cat: 'furniture', term: '원룸 좌식테이블' },
  { cat: 'furniture', term: '컴퓨터 책상' },
  { cat: 'furniture', term: '사무용 의자' },
  { cat: 'furniture', term: '소파베드' },

  // 자전거 / 모빌리티
  { cat: 'vehicles', term: '삼천리 자전거' },
  { cat: 'vehicles', term: '알톤 자전거' },
  { cat: 'vehicles', term: '하이브리드 자전거' },
  { cat: 'vehicles', term: '전기자전거' },
  { cat: 'vehicles', term: '전동킥보드' },
  { cat: 'vehicles', term: '나인봇' },
  { cat: 'vehicles', term: '미니벨로' },

  // 디지털
  { cat: 'digital', term: '갤럭시 S21' },
  { cat: 'digital', term: '갤럭시 S20' },
  { cat: 'digital', term: '아이폰 12' },
  { cat: 'digital', term: '아이폰 11' },
  { cat: 'digital', term: '컴퓨터 모니터' },
  { cat: 'digital', term: '와이파이 공유기' },
  { cat: 'digital', term: '노트북' },
  { cat: 'digital', term: '아이패드' },
  { cat: 'digital', term: '블루투스 스피커' },

  // 생활/주방
  { cat: 'daily', term: '프라이팬 세트' },
  { cat: 'daily', term: '라면 냄비' },
  { cat: 'daily', term: '옷걸이 묶음' },
  { cat: 'daily', term: '빨래건조대' },
  { cat: 'daily', term: '식기세트' },
  { cat: 'daily', term: '수납박스' },

  // 무료나눔 / 귀국 무빙세일
  { cat: 'free_give', term: '무료나눔' },
  { cat: 'free_give', term: '이사나눔' },
  { cat: 'moving_sale', term: '귀국 무빙세일' },
  { cat: 'moving_sale', term: '원룸 정리' },
];

function fetchTermDetails(term) {
  return new Promise((resolve) => {
    const url = `https://web.joongna.com/search?keyword=${encodeURIComponent(term)}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        const descMatch = data.match(/<meta name="description" content="([^"]+)"/i);
        const metaDesc = descMatch ? descMatch[1] : '';
        const titles = metaDesc
          .split(/,\s*/)
          .map((t) => t.trim())
          .filter((t) => t.length > 2 && !t.includes('중고나라'));

        const imgRegex = /https:\/\/img2\.joongna\.com\/media\/original\/[^\s"'&?]+\.jpg/gi;
        const rawImages = data.match(imgRegex) || [];
        // 압축 파라미터 적용 (?impolicy=thumb&size=500)
        const compressedImages = Array.from(new Set(rawImages)).map(
          (img) => `${img.replace(/\?.*/, '')}?impolicy=thumb&size=500`
        );

        resolve({ term, titles, images: compressedImages });
      });
    }).on('error', () => resolve({ term, titles: [], images: [] }));
  });
}

async function buildMultiImageDataset() {
  console.log('🚀 중고나라 다중 사진(2~3장) + 압축 최적화 실매물 수집 시작...');
  const allItems = [];
  let idCounter = 1;

  for (const item of KEYWORDS) {
    if (allItems.length >= 500) break;
    const res = await fetchTermDetails(item.term);
    const count = Math.min(res.titles.length, Math.floor(res.images.length / 2));
    
    for (let i = 0; i < count; i++) {
      const title = res.titles[i];
      // 매물당 2~3장의 서로 다른 폰카 사진 묶음 매핑
      const img1 = res.images[i * 2] || res.images[0];
      const img2 = res.images[i * 2 + 1] || res.images[i * 2] || img1;
      const img3 = res.images[i * 2 + 2] || img2;

      const photoList = [img1, img2, img3].filter(Boolean);

      allItems.push({
        id: `joongna-multi-${idCounter++}`,
        category: item.cat,
        term: item.term,
        title: title,
        images: photoList,
      });

      if (allItems.length >= 500) break;
    }
  }

  console.log(`✨ 총 ${allItems.length}개의 다중 사진(2~3장) 압축 실매물 데이터셋 구축 완료!`);
  fs.writeFileSync('./joongna_multi_compressed_500.json', JSON.stringify(allItems, null, 2));
}

buildMultiImageDataset();
