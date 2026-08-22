const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');
const files = fs.readdirSync(localesDir);

for (const file of files) {
  if (file.endsWith('.ts')) {
    const filePath = path.join(localesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/,,/g, ',');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ [${file}] 쉼표 정돈 완료`);
  }
}
