const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const ignorePaths = ['node_modules', '.next', '.git', 'src/app/admin', 'src/components/admin', 'src/lib/i18n'];

function getAllUserFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/');
    if (ignorePaths.some(ip => rel.startsWith(ip))) continue;

    if (entry.isDirectory()) {
      getAllUserFiles(full, list);
    } else if (entry.name.endsWith('.tsx')) {
      list.push(full);
    }
  }
  return list;
}

const userFiles = getAllUserFiles(srcDir);

userFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes("t('") || content.includes('t("')) {
    let modified = false;

    // 1. import useLanguage
    if (!content.includes('useLanguage')) {
      content = `import { useLanguage } from '@/context/LanguageContext';\n` + content;
      modified = true;
    }

    // 2. 함수 컴포넌트 내부에서 const { t } = useLanguage(); 선언 확인
    // 여러 컴포넌트 함수 패턴 체크
    const funcMatch = content.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/);
    if (funcMatch && !content.includes('const { t }') && !content.includes('const { t,') && !content.includes(' t,')) {
      content = content.replace(
        funcMatch[0],
        `${funcMatch[0]}\n  const { t } = useLanguage();`
      );
      modified = true;
    }

    // 일반 함수 컴포넌트 (export function X)
    const exportNamedMatch = content.match(/export\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/);
    if (exportNamedMatch && !content.includes('const { t }') && !content.includes('const { t,') && !content.includes(' t,')) {
      content = content.replace(
        exportNamedMatch[0],
        `${exportNamedMatch[0]}\n  const { t } = useLanguage();`
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`🔧 [useLanguage 주입 완료] 📁 ${path.relative(srcDir, file)}`);
    }
  }
});
