const http = require('http');

http.get('http://localhost:3000/vi', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('======================================================================');
    console.log(`🌐 [http://localhost:3000/vi 실시간 HTML 렌더링 응답 코드]: ${res.statusCode}`);
    console.log(`📊 응답 크기: ${body.length.toLocaleString()} bytes`);
    console.log('======================================================================\n');

    const checkPhrases = [
      'Giao dịch an tâm',
      'Thanh lý về nước',
      'Đăng đồ của bạn trong 1 phút',
      'Tra cứu hoàn thuế',
      'Khoản tiền hoàn thuế',
      '30 giây',
      'Chat dịch 1:1',
      'K-Market',
    ];

    console.log('🔍 [핵심 베트남어 문구 실시간 렌더링 포함 여부 검증]');
    let passCount = 0;
    checkPhrases.forEach(p => {
      const exists = body.includes(p);
      if (exists) passCount++;
      console.log(`[${exists ? 'PASS ✅' : 'FAIL ❌'}] "${p}" 포함 여부: ${exists}`);
    });

    console.log(`\n🏆 [결과]: 총 ${checkPhrases.length}개 중 ${passCount}개 통과 (${Math.round(passCount/checkPhrases.length*100)}%)`);
  });
}).on('error', (err) => {
  console.error('HTTP Request Error:', err);
});
