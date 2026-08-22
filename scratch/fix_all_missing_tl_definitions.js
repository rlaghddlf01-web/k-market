const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// 1. src/lib/i18n/index.ts
const i18nIndexPath = path.join(srcDir, 'lib', 'i18n', 'index.ts');
let i18nIndex = fs.readFileSync(i18nIndexPath, 'utf8');
if (!i18nIndex.includes("import { tl }")) {
  i18nIndex = i18nIndex.replace(
    "import { ur } from './locales/ur';",
    "import { ur } from './locales/ur';\nimport { tl } from './locales/tl';"
  );
  i18nIndex = i18nIndex.replace(
    "  ur,\n};",
    "  ur,\n  tl,\n};"
  );
  i18nIndex = i18nIndex.replace(
    "      ur: ur[key] || ko[key] || '',\n    };",
    "      ur: ur[key] || ko[key] || '',\n      tl: tl[key] || ko[key] || '',\n    };"
  );
  fs.writeFileSync(i18nIndexPath, i18nIndex, 'utf8');
  console.log('✅ Updated src/lib/i18n/index.ts');
}

// 2. src/app/api/kmarket/translate/route.ts
const transRoutePath = path.join(srcDir, 'app', 'api', 'kmarket', 'translate', 'route.ts');
if (fs.existsSync(transRoutePath)) {
  let transRoute = fs.readFileSync(transRoutePath, 'utf8');
  if (!transRoute.includes("tl: ")) {
    transRoute = transRoute.replace(
      /ur:\s*['"][^'"]*['"],?/g,
      (m) => `${m}\n  tl: 'Tagalog (Filipino)',`
    );
    fs.writeFileSync(transRoutePath, transRoute, 'utf8');
    console.log('✅ Updated src/app/api/kmarket/translate/route.ts');
  }
}

// 3. src/lib/aligoSmsService.ts
const aligoPath = path.join(srcDir, 'lib', 'aligoSmsService.ts');
if (fs.existsSync(aligoPath)) {
  let aligo = fs.readFileSync(aligoPath, 'utf8');
  if (!aligo.includes("tl: ")) {
    aligo = aligo.replace(
      /ur:\s*\(code:\s*string\)\s*=>\s*\{[^}]+\},/g,
      (m) => `${m}\n  tl: (code: string) => ({\n    title: '[K-Market] Code sa Pag-verify',\n    body: \`[K-Market] Ang iyong verification code ay [\${code}]. Huwag itong ibahagi sa iba.\`,\n  }),`
    );
    fs.writeFileSync(aligoPath, aligo, 'utf8');
    console.log('✅ Updated src/lib/aligoSmsService.ts');
  }
}

// 4. src/lib/i18n/welcomeTranslations.ts
const welcomePath = path.join(srcDir, 'lib', 'i18n', 'welcomeTranslations.ts');
if (fs.existsSync(welcomePath)) {
  let welcome = fs.readFileSync(welcomePath, 'utf8');
  if (!welcome.includes("tl: ")) {
    welcome = welcome.replace(
      /ur:\s*\{[^}]+\},/g,
      (m) => `${m}\n  tl: {\n    badge: '17-Wikang Real-time',\n    title: 'Ligtas na Pamilihan at Buhay Komunidad',\n    subtitle: 'Direktang kalakalan sa pagitan ng mga dayuhan nang walang komisyon',\n    footerButton: 'Simulan ang K-Market',\n    bannerBenefit: '0 won komisyon + ARC ID verified',\n  },`
    );
    fs.writeFileSync(welcomePath, welcome, 'utf8');
    console.log('✅ Updated src/lib/i18n/welcomeTranslations.ts');
  }
}

// 5. src/lib/pushTranslations.ts
const pushPath = path.join(srcDir, 'lib', 'pushTranslations.ts');
if (fs.existsSync(pushPath)) {
  let push = fs.readFileSync(pushPath, 'utf8');
  if (!push.includes("tl: ")) {
    push = push.replace(
      /ur:\s*\{[^}]+\},/g,
      (m) => `${m}\n  tl: {\n    welcomeTitle: '🎉 Maligayang pagdating sa K-Market!',\n    welcomeBody: 'Aktibo na ang real-time push notifications.',\n    keywordTitle: (kw: string) => \`🔔 Bagong item: "\${kw}"\`,\n    keywordBody: (t: string, p: string, r: string) => \`\${t} (\${p}) - \${r}\`,\n    chatTitle: (s: string) => \`💬 Bagong mensahe mula kay \${s}\`,\n    appointmentTitle: (time: string) => \`📍 Paalala sa meetup (\${time})\`,\n    appointmentBody: (place: string) => \`Lugar ng pagkikita: \${place}\`,\n  },`
    );
    fs.writeFileSync(pushPath, push, 'utf8');
    console.log('✅ Updated src/lib/pushTranslations.ts');
  }
}

// 6. src/lib/pwaTranslations.ts
const pwaPath = path.join(srcDir, 'lib', 'pwaTranslations.ts');
if (fs.existsSync(pwaPath)) {
  let pwa = fs.readFileSync(pwaPath, 'utf8');
  if (!pwa.includes("tl: ")) {
    pwa = pwa.replace(
      /ur:\s*\{[^}]+\},/g,
      (m) => `${m}\n  tl: {\n    promptTitle: 'I-install ang K-Market sa 1 segundo ⚡',\n    promptDesc: 'Makatanggap ng mga alerto sa chat at balita sa komunidad.',\n    installBtn: 'I-install ang App',\n    dismissBtn: 'Mamaya na',\n    inAppChromeTitle: 'Buksan sa Chrome',\n    inAppChromeDesc: 'Para sa mas maayos na karanasan sa pag-install',\n    inAppSafariTitle: 'Buksan sa Safari',\n    inAppSafariDesc: 'Pindutin ang share button at Idagdag sa Home Screen',\n    openChromeBtn: 'Buksan sa Browser',\n    copyLinkBtn: 'Kopyahin ang Link',\n  },`
    );
    fs.writeFileSync(pwaPath, pwa, 'utf8');
    console.log('✅ Updated src/lib/pwaTranslations.ts');
  }
}

console.log('🎉 All tl missing definitions fixed!');
