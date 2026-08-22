const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.ts'));

const corruptedReport = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(localesDir, file), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('K-Market K-Market') || line.includes('K-Market &amp; K-Market') || line.includes('K-Market (post.')) {
      corruptedReport.push({
        file,
        lineNum: idx + 1,
        lineContent: line.trim()
      });
    }
  });
}

console.log(`Found ${corruptedReport.length} corrupted lines across locales:`);
corruptedReport.forEach(item => {
  console.log(`[${item.file}:${item.lineNum}] ${item.lineContent}`);
});

fs.writeFileSync(path.join(__dirname, 'corrupted_translations_report.json'), JSON.stringify(corruptedReport, null, 2), 'utf8');
