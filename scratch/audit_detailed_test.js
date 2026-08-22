const http = require('http');

const ENDPOINTS = [
  { path: '/', label: '🇰🇷 한국어 메인 피드 (Root)' },
  { path: '/welcome', label: '🌍 17개국 언어 선택 게이트웨이' },
  { path: '/vi', label: '🇻🇳 베트남어 전용 피드' },
  { path: '/zh', label: '🇨🇳 중국어 전용 피드' },
  { path: '/en', label: '🇺🇸 영어 전용 피드' },
  { path: '/ja', label: '🇯🇵 일본어 전용 피드' },
  { path: '/ru', label: '🇷🇺 러시아어 전용 피드' },
  { path: '/th', label: '🇹🇭 태국어 전용 피드' },
  { path: '/uz', label: '🇺🇿 우즈베크어 전용 피드' },
  { path: '/km', label: '🇰🇭 캄보디아어 전용 피드' },
  { path: '/mn', label: '🇲🇳 몽골어 전용 피드' },
  { path: '/ne', label: '🇳🇵 네팔어 전용 피드' },
  { path: '/id', label: '🇮🇩 인도네시아어 전용 피드' },
  { path: '/my', label: '🇲🇲 미얀마어 전용 피드' },
  { path: '/si', label: '🇱🇰 스리랑카어 전용 피드' },
  { path: '/kk', label: '🇰🇿 카자흐어 전용 피드' },
  { path: '/bn', label: '🇧🇩 방글라데시어 전용 피드' },
  { path: '/ur', label: '🇵🇰 파키스탄(우르두) 전용 피드' },
  { path: '/manifest.json', label: '📱 PWA 웹앱 매니페스트' },
  { path: '/sw.js', label: '⚡ PWA 오프라인 서비스워커' },
  { path: '/admin', label: '🛡️ 통합 관리자 대시보드' },
];

function testUrl(item) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(`http://localhost:3000${item.path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const duration = Date.now() - start;
        const isOk = res.statusCode === 200;
        resolve({
          path: item.path,
          label: item.label,
          status: res.statusCode,
          size: data.length,
          duration,
          isOk,
        });
      });
    });
    req.on('error', (err) => {
      resolve({
        path: item.path,
        label: item.label,
        status: 'ERR',
        size: 0,
        duration: 0,
        isOk: false,
        error: err.message,
      });
    });
    req.setTimeout(5000, () => {
      req.abort();
      resolve({
        path: item.path,
        label: item.label,
        status: 'TIMEOUT',
        size: 0,
        duration: 5000,
        isOk: false,
      });
    });
  });
}

async function run() {
  console.log('===============================================================');
  console.log('🧪 [K-Market 실시간 정밀 종합 진단 테스트] 시작');
  console.log('===============================================================\n');

  let passed = 0;
  for (const item of ENDPOINTS) {
    const res = await testUrl(item);
    const badge = res.isOk ? '✅ [PASS 200]' : '❌ [FAIL]';
    console.log(
      `${badge} ${res.path.padEnd(16)} | ${res.label.padEnd(25)} | ${res.size
        .toLocaleString()
        .padStart(7)} bytes | ⏱️ ${res.duration}ms`
    );
    if (res.isOk) passed++;
  }

  console.log('\n===============================================================');
  console.log(`📊 테스트 결과: 총 ${ENDPOINTS.length}개 항목 중 ${passed}개 성공 (${Math.round((passed / ENDPOINTS.length) * 100)}%)`);
  console.log('===============================================================');
}

run();
