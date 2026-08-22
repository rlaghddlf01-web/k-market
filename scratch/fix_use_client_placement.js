const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getAllFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(full, list);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      list.push(full);
    }
  }
  return list;
}

const files = getAllFiles(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes("'use client'") || content.includes('"use client"')) {
    // 'use client' 라인들 제거 후 최상단 1번째 줄에 단 1개만 배치
    const cleaned = content.replace(/['"]use client['"];?\s*\n?/g, '').trimStart();
    content = `'use client';\n\n` + cleaned;
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('✅ 모든 컴포넌트의 use client 선언을 최상단 1번째 줄로 정돈 완료!');
