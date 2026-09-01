import { Metadata } from 'next';
import Link from 'next/link';

// [K-Market SEO] 외국인 지원센터 직거래 랜딩 페이지
// Route: /[lang]/center/[slug]

interface Props {
  params: Promise<{ lang: string; slug: string }>;
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

function slugToTitle(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const langInfo = LANG_MAP[lang] || LANG_MAP['en'];
  const title = slugToTitle(slug);
  return {
    title: `[${title}] Free Expat Support & 0 KRW Safe Trading | K-Market Korea`,
    description: `Browse verified free listings near ${title} in Korea. 17-language AI chat. No scams. ${langInfo.name} supported.`,
    alternates: {
      canonical: `https://ktrs-market.vercel.app/${lang}/center/${slug}`,
      languages: Object.fromEntries(
        Object.keys(LANG_MAP).map(l => [l, `https://ktrs-market.vercel.app/${l}/center/${slug}`])
      ),
    },
    openGraph: {
      title: `[${title}] K-Market 🏢 Free Expat Support & 0 KRW Safe Trading`,
      description: `Verified K-Market listings near ${title}. ${langInfo.name} supported.`,
      url: `https://ktrs-market.vercel.app/${lang}/center/${slug}`,
      siteName: 'K-Market Korea',
    },
  };
}

export default async function KMarketCenterSEOPage({ params }: Props) {
  const { lang, slug } = await params;
  const langInfo = LANG_MAP[lang] || LANG_MAP['en'];
  const title = slugToTitle(slug);
  const cta = `https://ktrs-market.vercel.app/${lang}?utm_source=google_seo&utm_medium=organic&utm_campaign=center_${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'LocalBusiness',
    name: `K-Market @ ${title}`,
    description: `Free Expat Support & 0 KRW Safe Trading near ${title} in Korea.`,
    url: `https://ktrs-market.vercel.app/${lang}/center/${slug}`,
    address: { '@type': 'PostalAddress', addressCountry: 'KR' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ fontFamily: "'Inter', sans-serif", background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
        <header style={{ background: '#1e293b', padding: '16px 24px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={`/${lang}`} style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 900, fontSize: '20px' }}>
            🏢 K-Market
          </Link>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>{langInfo.flag} {langInfo.name}</span>
        </header>
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '52px', marginBottom: '20px' }}>🏢</div>
          <h1 style={{ fontSize: '30px', fontWeight: 900, lineHeight: 1.3, marginBottom: '16px' }}>
            {title} — Free Expat Support & 0 KRW Safe Trading
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
            {langInfo.welcome}! 외국인 지원센터 직거래 · {langInfo.flag} {langInfo.name}
          </p>
          <a href={cta} style={{ display: 'inline-block', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0f172a', fontWeight: 900, padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', fontSize: '16px' }}>
            🏢 Browse Listings in {title} →
          </a>
        </section>
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              ['🆓', '0 KRW Free Items', 'Beds, desks, appliances — completely free.'],
              ['🌍', '17-Language AI Chat', `Chat in ${langInfo.name}. No language barriers.`],
              ['✅', 'Verified Listings', 'All listings verified. Safe for expats.'],
              ['📍', `Near ${title}`, 'Hyper-local results near your location.'],
            ].map(([icon, t, d], i) => (
              <div key={i} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{t}</h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ maxWidth: '900px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f4c81)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center', border: '1px solid #1e5a9c' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '12px' }}>
              {langInfo.welcome}! Join K-Market Free Network
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>
              Connect with expats near {title}. 17 languages. Zero scams. Free forever.
            </p>
            <a href={cta} style={{ background: '#f59e0b', color: '#0f172a', fontWeight: 900, padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontSize: '15px' }}>
              Start Free →
            </a>
          </div>
        </section>
        <footer style={{ borderTop: '1px solid #1e293b', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#475569', fontSize: '13px' }}>
            © 2025 K-Market Korea ·{' '}
            <Link href={`/${lang}`} style={{ color: '#f59e0b', textDecoration: 'none' }}>Go to K-Market</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
