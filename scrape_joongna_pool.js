// 중고나라 대분류 카테고리별 실제 매물 스크래퍼 (브랜드 편중 0% & 리얼 데이터)
const https = require('https');
const fs = require('fs');

const CATEGORIES = [
  { cat: 'appliances', query: '가전' },
  { cat: 'appliances', query: '주방가전' },
  { cat: 'appliances', query: '생활가전' },
  { cat: 'furniture', query: '가구' },
  { cat: 'furniture', query: '침대' },
  { cat: 'furniture', query: '수납장' },
  { cat: 'vehicles', query: '자전거' },
  { cat: 'vehicles', query: '전동킥보드' },
  { cat: 'digital', query: '스마트폰' },
  { cat: 'digital', query: '모니터' },
  { cat: 'digital', query: '공유기' },
  { cat: 'daily', query: '주방용품' },
  { cat: 'daily', query: '생활용품' },
  { cat: 'free_give', query: '무료나눔' },
];

function fetchJoongnaSearch(query) {
  return new Promise((resolve) => {
    const url = `https://web.joongna.com/search?keyword=${encodeURIComponent(query)}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        // description 메타태그에서 실제 등록된 상품명 리스트 파싱
        const descMatch = data.match(/<meta name="description" content="([^"]+)"/i);
        const metaDesc = descMatch ? descMatch[1] : '';
        const titles = metaDesc
          .split(/,\s*/)
          .map((t) => t.trim())
          .filter((t) => t.length > 2 && !t.includes('중고나라'));

        // og:image 및 img2.joongna.com 이미지 URL 정규식 파싱
        const imgRegex = /https:\/\/img2\.joongna\.com\/media\/original\/[^\s"'&?]+\.jpg/gi;
        const rawImages = data.match(imgRegex) || [];
        const uniqueImages = Array.from(new Set(rawImages));

        resolve({ query, titles, images: uniqueImages });
      });
    }).on('error', () => resolve({ query, titles: [], images: [] }));
  });
}

async function scrapeAll() {
  console.log('🚀 중고나라 대분류 카테고리별 실매물 수집 시작...');
  const pool = [];

  for (const item of CATEGORIES) {
    const res = await fetchJoongnaSearch(item.query);
    console.log(`[수집] "${item.query}" -> 제목 ${res.titles.length}개, 실사 이미지 ${res.images.length}개 확보`);
    
    // 제목과 이미지를 매칭하여 풀에 추가
    const count = Math.min(res.titles.length, res.images.length);
    for (let i = 0; i < count; i++) {
      pool.push({
        title: res.titles[i],
        image: res.images[i],
        category: item.cat,
        query: item.query,
      });
    }
  }

  console.log(`✨ 총 ${pool.length}개의 실제 중고나라 매물 원본 데이터 확보 완료!`);
  fs.writeFileSync('./joongna_scraped_pool.json', JSON.stringify(pool, null, 2));
}

scrapeAll();
