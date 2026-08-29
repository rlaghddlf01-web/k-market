import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts, isEasyTax } from '@/lib/supabaseBlog';
import { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';
import { getBlogTranslation, BLOG_UI_KEYS } from '@/lib/i18n/blogTranslations';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const SUPPORTED_LANG_CODES = [
  'ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 
  'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur'
];

// 1. Google SEO 리치 스니펫 & hreflang 17개국어 메타데이터 자동 주입
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPostBySlug(slug, lang);
  if (!post) return { title: 'Article Not Found | K-Market' };

  const isTax = isEasyTax;
  const baseDomain = isTax ? 'https://ktrs-service.vercel.app' : 'https://ktrs-market.vercel.app';
  const canonicalUrl = `${baseDomain}/${lang}/blog/${slug}`;

  // 17개 언어 hreflang 상호 링크
  const languageAlternates: Record<string, string> = {};
  SUPPORTED_LANG_CODES.forEach((l) => {
    languageAlternates[l] = `${baseDomain}/${l}/blog/${slug}`;
  });
  languageAlternates['x-default'] = `${baseDomain}/en/blog/${slug}`;

  return {
    title: `${post.title} | ${isTax ? 'EasyTax' : 'K-Market'} Official Guide`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.published_at,
      images: post.thumbnail_url ? [{ url: post.thumbnail_url }] : ['/images/og-kmarket.jpg'],
      siteName: isTax ? 'EasyTax Korea' : 'K-Market Korea',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail_url ? [post.thumbnail_url] : ['/images/og-kmarket.jpg'],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  const currentLang = lang || 'ko';
  const post = await getBlogPostBySlug(slug, currentLang);

  if (!post) {
    notFound();
  }

  const isTax = isEasyTax;
  const baseDomain = isTax ? 'https://ktrs-service.vercel.app' : 'https://ktrs-market.vercel.app';
  const canonicalUrl = `${baseDomain}/${currentLang}/blog/${slug}`;

  const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // 추천 글 목록
  const allPosts = await getBlogPosts(currentLang, 4);
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // 다국어 헬퍼
  const tr = (key: string) => getBlogTranslation(key, currentLang);

  // 2. Schema.org BlogPosting JSON-LD 리치 스니펫 (구글 검색 상단 강조 노출용)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    image: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    author: {
      '@type': 'Organization',
      name: post.author || (isTax ? 'EasyTax Legal Team' : 'K-Market Expat Team'),
      url: baseDomain,
    },
    publisher: {
      '@type': 'Organization',
      name: isTax ? 'EasyTax Korea' : 'K-Market Korea',
      logo: {
        '@type': 'ImageObject',
        url: `${baseDomain}/images/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#f2ede8] text-[#1a1209] selection:bg-[#3d2817] selection:text-white">
      {/* 구글 검색엔진용 JSON-LD 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 🧭 최상단 글로벌 블랙 공지 띠 */}
      <div className="bg-[#140e0a] text-slate-200 text-xs py-2 px-4 border-b border-black/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">KTRS</span>
            <span className="font-semibold text-slate-300">
              {tr(BLOG_UI_KEYS.header_top_badge)}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {tr(BLOG_UI_KEYS.header_verified_support)}
          </span>
        </div>
      </div>

      {/* 🧭 상단 내비게이션 바 */}
      <header className="border-b border-[#ded1c4] bg-[#fefcf9]/95 backdrop-blur-xl sticky top-0 z-40 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={`/${currentLang}/blog`}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5c3818] hover:text-[#1a1209] transition-colors"
          >
            <span>←</span>
            <span>{tr(BLOG_UI_KEYS.btn_back_to_list)}</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#705e4f] hidden sm:inline font-semibold">
              {langInfo.flag} {langInfo.name}
            </span>
            <Link
              href={`/${currentLang}`}
              className="px-3.5 py-1.5 rounded-full bg-[#ede2d6] hover:bg-[#e4d7c8] text-xs font-bold text-[#3d2817] transition-all border border-[#ded1c4] shadow-2xs"
            >
              {tr(BLOG_UI_KEYS.btn_back_feed)}
            </Link>
          </div>
        </div>
      </header>

      {/* 📖 본문 아티클 영역 (포근한 화이트 매거진 카드) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        <article className="bg-[#ffffff] rounded-3xl border border-[#ded1c4] p-6 sm:p-10 shadow-card">
          {/* 상단 메타 정보 */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#ede2d6] text-[#5c3818] border border-[#ded1c4] px-3 py-1 rounded-full">
              {post.category || 'Official Guide'}
            </span>
            <span className="text-xs text-[#705e4f] bg-[#f4ede6] border border-[#ded1c4] px-3 py-1 rounded-full">
              ⏱️ {post.read_time_min || 4} min read
            </span>
            <span className="text-xs text-[#705e4f] bg-[#f4ede6] border border-[#ded1c4] px-3 py-1 rounded-full">
              👁️ {(post.views || 1840).toLocaleString()} views
            </span>
          </div>

          {/* 대형 칼럼 제목 */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#1a1209] leading-snug sm:leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* 저자 및 발행일자 카드 */}
          <div className="mt-6 mb-8 p-4 rounded-2xl bg-[#f8f4ef] border border-[#ded1c4] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3d2817] flex items-center justify-center text-amber-300 font-black text-sm shadow-sm">
                ✓
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#1a1209] flex items-center gap-1.5">
                  <span>{post.author}</span>
                  <span className="text-[10px] bg-[#ede2d6] text-[#5c3818] px-1.5 py-0.5 rounded font-bold">
                    {tr(BLOG_UI_KEYS.tag_verified)}
                  </span>
                </div>
                <div className="text-[11px] text-[#705e4f]">
                  {tr(BLOG_UI_KEYS.label_publish_date)} {new Date(post.published_at).toLocaleDateString()} • KTRS Research
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#705e4f]">
              <span className="text-amber-600 font-bold">♥ {post.likes || 142}</span>
              <span>Reactions</span>
            </div>
          </div>

          {/* 대표 썸네일 이미지 */}
          {post.thumbnail_url && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-[#ded1c4] bg-[#f4ede6] shadow-xs">
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="w-full h-auto max-h-[440px] object-cover"
              />
            </div>
          )}

          {/* 요약 박스 (Lead) */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#fbf8f4] border-l-4 border-amber-600 border-y border-r border-[#ded1c4]">
            <p className="text-sm sm:text-base font-semibold text-[#4a2c11] leading-relaxed">
              💡 {post.excerpt}
            </p>
          </div>

          {/* 1,500자 상세 본문 렌더링 (가독성 높은 딥 모카 폰트) */}
          <div
            className="prose max-w-none text-[#2d2218] text-base sm:text-lg leading-relaxed sm:leading-8 space-y-6 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-black [&>h2]:text-[#1a1209] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-[#ede2d6] [&>h2]:pb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-amber-600 [&>blockquote]:bg-[#f8f4ef] [&>blockquote]:p-4 [&>blockquote]:rounded-r-xl [&>blockquote]:text-[#4a2c11] [&>blockquote]:font-semibold [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {/* 🎁 하단 전환 CTA 카드 (딥 로스티드 커피 톤) */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#2b1b17] via-[#3d2817] to-[#4a2c11] text-white shadow-xl text-center">
            <div className="inline-block p-3 rounded-2xl bg-amber-400/20 text-amber-300 text-3xl mb-4">
              {isTax ? '💰' : '🎁'}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {isTax ? tr(BLOG_UI_KEYS.cta_title_tax) : tr(BLOG_UI_KEYS.cta_title_market)}
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#e2d7cc] max-w-lg mx-auto leading-relaxed">
              {isTax
                ? tr(BLOG_UI_KEYS.cta_desc_tax)
                : tr(BLOG_UI_KEYS.cta_desc_market)}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={isTax ? `/${currentLang}/welcome?utm_source=blog_cta` : `/${currentLang}`}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-full shadow-lg text-sm transition-all hover:scale-105"
              >
                {isTax ? tr(BLOG_UI_KEYS.btn_tax_simulate) : tr(BLOG_UI_KEYS.btn_explore_items)}
              </Link>
              <Link
                href={`/${currentLang}/blog`}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-sm border border-white/20 transition-all"
              >
                {tr(BLOG_UI_KEYS.btn_more_articles)}
              </Link>
            </div>
          </div>

          {/* 🔗 추천 관련 글 섹션 */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#ede2d6]">
              <h4 className="text-lg font-black text-[#1a1209] mb-5 flex items-center gap-2">
                <span>📚</span>
                <span>{tr(BLOG_UI_KEYS.section_related)}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/${currentLang}/blog/${rPost.slug}`}
                    className="p-5 rounded-2xl bg-[#f8f4ef] border border-[#ded1c4] hover:border-[#845b37] transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#5c3818] uppercase">
                        {rPost.category || 'Guide'}
                      </span>
                      <h5 className="mt-2 text-sm font-bold text-[#1a1209] group-hover:text-[#845b37] transition-colors line-clamp-2">
                        {rPost.title}
                      </h5>
                    </div>
                    <div className="mt-4 text-[11px] text-[#705e4f]">
                      {new Date(rPost.published_at).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
