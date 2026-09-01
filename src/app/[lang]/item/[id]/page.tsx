import { Metadata } from 'next';
import Link from 'next/link';

// [K-Market SEO] 매물 상세 0원 나눔/중고 페이지
// Route: /[lang]/item/[id]

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

const LANG_MAP: Record<string, { name: string; flag: string; welcome: string }> = {
  en: { name: 'English', flag: '🇺🇸', welcome: 'Welcome' },
  ko: { name: '한국어', flag: '🇰🇷', welcome: '환영합니다' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳', welcome: 'Chào mừng' },
  zh: { name: '中文', flag: '🇨🇳', welcome: '欢迎' },
  ja: { name: '日本語', flag: '🇯🇵', welcome: 'ようこそ' },
  th: { name: 'ภาษาไทย', flag: '🇹🇭', welcome: 'ยินดีต้อนรับ' },
  id: { name: 'Bahasa Indonesia', flag: '🇮🇩', welcome: 'Selamat datang' },
  mn: { name: 'Монгол', flag: '🇲🇳', welcome: 'Тавтай морилно уу' },
  uz: { name: "O'zbek", flag: '🇺🇿', welcome: 'Xush kelibsiz' },
  ru: { name: 'Русский', flag: '🇷🇺', welcome: 'Добро пожаловать' },
  kk: { name: 'Қазақша', flag: '🇰🇿', welcome: 'Қош келдіңіз' },
  ne: { name: 'नेपाली', flag: '🇳🇵', welcome: 'स्वागत छ' },
  bn: { name: 'বাংলা', flag: '🇧🇩', welcome: 'স্বাগতম' },
  ur: { name: 'اردو', flag: '🇵🇰', welcome: 'خوش آمدید' },
  my: { name: 'မြန်မာ', flag: '🇲🇲', welcome: 'ကြိုဆိုပါသည်' },
  km: { name: 'ខ្មែរ', flag: '🇰🇭', welcome: 'សូមស្វាគមន៍' },
  tl: { name: 'Filipino', flag: '🇵🇭', welcome: 'Maligayang pagdating' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const langInfo = LANG_MAP[lang] || LANG_MAP['en'];
  return {
    title: `[Item #${id}] 0 KRW Free Expat Item & Moving Sale | K-Market Korea`,
    description: `Verified secondhand listing #${id} on K-Market Korea. Instant AI translation chat in ${langInfo.name}. Safe trading.`,
  };
}

export default async function KMarketItemDetailPage({ params }: Props) {
  const { lang, id } = await params;
  const langInfo = LANG_MAP[lang] || LANG_MAP['en'];
  const cta = `https://ktrs-market.vercel.app/${lang}?utm_source=google_seo&utm_medium=organic&utm_campaign=item_${id}`;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <header style={{ background: '#1e293b', padding: '16px 24px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={`/${lang}`} style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 900, fontSize: '20px' }}>🛒 K-Market</Link>
        <span style={{ fontSize: '14px', color: '#94a3b8' }}>{langInfo.flag} {langInfo.name}</span>
      </header>
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '20px', padding: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎁</div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '12px' }}>Verified Expat Listing #{id}</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '28px' }}>Free giveaway & Moving Sale item. Connect directly with seller with 17-language AI instant translation chat.</p>
          <a href={cta} style={{ display: 'inline-block', background: '#f59e0b', color: '#0f172a', fontWeight: 900, padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', fontSize: '16px' }}>View Full Listing on K-Market →</a>
        </div>
      </main>
      <footer style={{ borderTop: '1px solid #1e293b', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#475569', fontSize: '13px' }}>© 2025 K-Market Korea · <Link href={`/${lang}`} style={{ color: '#f59e0b', textDecoration: 'none' }}>Back to Home</Link></p>
      </footer>
    </div>
  );
}
