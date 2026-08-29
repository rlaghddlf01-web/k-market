import Link from 'next/link';
import { getBlogPosts, isEasyTax, BlogPost } from '@/lib/supabaseBlog';
import { Metadata } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';
import { getBlogTranslation, BLOG_UI_KEYS } from '@/lib/i18n/blogTranslations';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isTax = isEasyTax;
  const baseDomain = isTax ? 'https://ktrs-service.vercel.app' : 'https://ktrs-market.vercel.app';
  const title = isTax 
    ? 'EasyTax Korea Expat Tax Refund & Legal Reduction Guides' 
    : 'K-Market Expat Life, Moving & 0 KRW Giveaway Blog';
  const description = isTax
    ? 'Official multilingual tax guides for foreign workers (E-9, H-2, E-7) and students under Korean Tax Law (Article 30).'
    : 'Find 0 KRW free items, student moving sales, and safe secondhand trading tips across South Korea in 17 languages.';

  return {
    title: `${title} (${(lang || 'en').toUpperCase()}) | ${isTax ? 'EasyTax' : 'K-Market'}`,
    description,
    alternates: {
      canonical: `${baseDomain}/${lang}/blog`,
    },
    openGraph: {
      title,
      description,
      url: `${baseDomain}/${lang}/blog`,
      siteName: isTax ? 'EasyTax Korea' : 'K-Market Korea',
    }
  };
}

export default async function BlogListPage({ params }: Props) {
  const { lang } = await params;
  const currentLangCode = lang || 'ko';
  const posts = await getBlogPosts(currentLangCode, 24);
  const isTax = isEasyTax;

  const currentLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  const featuredPost: BlogPost | null = posts.length > 0 ? posts[0] : null;
  const restPosts: BlogPost[] = posts.length > 1 ? posts.slice(1) : [];

  // 다국어 헬퍼
  const tr = (key: string) => getBlogTranslation(key, currentLangCode);

  return (
    <div className="min-h-screen bg-[#f2ede8] text-[#1a1209] selection:bg-[#3d2817] selection:text-white">
      {/* 🧭 최상단 글로벌 블랙 공지 띠 */}
      <div className="bg-[#140e0a] text-slate-200 text-xs py-2 px-4 border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">KTRS</span>
            <span className="font-semibold text-slate-300">
              {tr(BLOG_UI_KEYS.header_top_badge)}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span>{tr(BLOG_UI_KEYS.header_verified_support)}</span>
          </div>
        </div>
      </div>

      {/* 🧭 상단 메인 화이트/크림 내비게이션 바 */}
      <header className="border-b border-[#ded1c4] bg-[#fefcf9]/95 backdrop-blur-xl sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href={`/${currentLangCode}`}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3d2817] to-[#1a1209] flex items-center justify-center shadow-md shadow-[#3d2817]/20 group-hover:scale-105 transition-transform">
                <span className="text-amber-400 font-black text-sm">K</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-[#1a1209] group-hover:text-[#845b37] transition-colors">
                  {isTax ? 'KTRS EasyTax' : tr(BLOG_UI_KEYS.header_kmarket_mag)}
                </span>
                <span className="text-[10px] text-[#705e4f] font-medium">
                  {currentLangInfo.nativeName} ({currentLangInfo.name})
                </span>
              </div>
            </Link>
          </div>

          {/* 17개국 언어 퀵 스위처 & 홈 바로가기 */}
          <div className="flex items-center gap-2">
            <Link
              href={`/${currentLangCode}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#3d2817] bg-[#ede2d6] hover:bg-[#e4d7c8] border border-[#ded1c4] transition-all shadow-2xs"
            >
              <span>🏠</span>
              <span>{tr(BLOG_UI_KEYS.btn_back_to_feed)}</span>
            </Link>
            <div className="flex items-center gap-1.5 bg-[#ffffff] border border-[#ded1c4] px-2.5 py-1 rounded-full text-xs shadow-2xs">
              <span className="text-sm">{currentLangInfo.flag}</span>
              <span className="font-extrabold text-[#3d2817] uppercase">{currentLangCode}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 📰 상단 메인 매거진 히어로 섹션 (따뜻한 베이지 & 크림 톤) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ede2d6] border border-[#ded1c4] rounded-full text-[#5c3818] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{isTax ? 'Official Tax Law & Expat Rights' : 'Expat Life & Smart Moving Media'}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-[#1a1209] tracking-tight leading-tight">
            {isTax ? (
              <>{tr(BLOG_UI_KEYS.hero_title_tax)}</>
            ) : (
              <>{tr(BLOG_UI_KEYS.hero_title_market)}</>
            )}
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-[#5a4a38] leading-relaxed max-w-2xl font-normal">
            {isTax
              ? tr(BLOG_UI_KEYS.hero_desc_tax)
              : tr(BLOG_UI_KEYS.hero_desc_market)}
          </p>

          {/* 17개 언어 칩 바 */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 max-w-4xl py-2 px-3 bg-[#ffffff] rounded-2xl border border-[#ded1c4] shadow-xs">
            {SUPPORTED_LANGUAGES.map((item) => (
              <Link
                key={item.code}
                href={`/${item.code}/blog`}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  item.code === currentLangCode
                    ? 'bg-[#3d2817] text-[#fbf9f6] font-bold shadow-xs scale-105'
                    : 'text-[#705e4f] hover:text-[#1a1209] hover:bg-[#f4ede6]'
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.code.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 1. 피처드 히어로 아티클 (최상단 강조 칼럼 - 화이트 크림 카드) */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative rounded-3xl overflow-hidden border border-[#ded1c4] bg-[#ffffff] p-6 sm:p-8 shadow-card hover:shadow-hover transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* 썸네일 */}
              <div className="lg:col-span-6 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#ded1c4] bg-[#f4ede6] shadow-inner">
                <img
                  src={featuredPost.thumbnail_url}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#3d2817] text-amber-300 text-xs font-black px-3 py-1 rounded-full shadow-md">
                  {tr(BLOG_UI_KEYS.tag_featured)}
                </div>
              </div>

              {/* 본문 정보 */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-[#5c3818] bg-[#ede2d6] border border-[#ded1c4] px-2.5 py-1 rounded-lg uppercase">
                      {featuredPost.category || 'Special Guide'}
                    </span>
                    <span className="text-xs text-[#705e4f]">
                      ⏱️ {featuredPost.read_time_min || 4} min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[#1a1209] leading-tight group-hover:text-[#845b37] transition-colors">
                    <Link href={`/${currentLangCode}/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="mt-3.5 text-sm sm:text-base text-[#5a4a38] line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-[#ede2d6] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#f4ede6] border border-[#ded1c4] flex items-center justify-center text-sm font-bold text-[#5c3818]">
                      ✍️
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a1209]">{featuredPost.author}</div>
                      <div className="text-[11px] text-[#705e4f]">{new Date(featuredPost.published_at).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <Link
                    href={`/${currentLangCode}/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3d2817] hover:bg-[#2b1b17] text-[#fbf9f6] font-bold text-xs sm:text-sm shadow-md transition-all hover:translate-x-0.5"
                  >
                    <span>{tr(BLOG_UI_KEYS.btn_read_full)}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 📚 2. 최신 칼럼 리스트 그리드 (포근한 화이트 카드) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-7 pb-3 border-b border-[#ded1c4]">
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1209] flex items-center gap-2">
            <span>📖</span>
            <span>{tr(BLOG_UI_KEYS.section_all_articles)} ({currentLangCode.toUpperCase()})</span>
          </h3>
          <span className="text-xs text-[#705e4f] font-semibold bg-[#ede2d6] px-3 py-1 rounded-full border border-[#ded1c4]">
            {tr(BLOG_UI_KEYS.section_total_count).replace('{count}', String(posts.length))}
          </span>
        </div>

        {restPosts.length === 0 && !featuredPost ? (
          <div className="text-center py-20 bg-[#ffffff] rounded-3xl border border-[#ded1c4] p-8 shadow-xs">
            <div className="text-5xl mb-4">📰</div>
            <h4 className="text-lg font-bold text-[#1a1209] mb-2">{currentLangCode.toUpperCase()} Verified Guides</h4>
            <p className="text-[#5a4a38] text-sm max-w-md mx-auto mb-6">
              {tr(BLOG_UI_KEYS.hero_desc_tax)}
            </p>
            <Link
              href={`/${currentLangCode}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3d2817] text-[#fbf9f6] font-bold text-sm"
            >
              {tr(BLOG_UI_KEYS.btn_go_home)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(restPosts.length > 0 ? restPosts : posts).map((post) => (
              <article
                key={post.id}
                className="bg-[#ffffff] border border-[#ded1c4] rounded-2xl overflow-hidden hover:border-[#caa37a] transition-all duration-300 shadow-card hover:shadow-hover hover:-translate-y-1 flex flex-col justify-between group"
              >
                {/* 썸네일 */}
                {post.thumbnail_url && (
                  <div className="relative h-48 w-full bg-[#f4ede6] overflow-hidden">
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#ffffff]/90 backdrop-blur-md text-[11px] font-bold text-[#5c3818] px-2.5 py-0.5 rounded-md border border-[#ded1c4]">
                      {post.category || 'Guide'}
                    </div>
                  </div>
                )}

                {/* 카드 내용 */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#705e4f] mb-2.5">
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      <span>⏱️ {post.read_time_min || 3} min</span>
                    </div>

                    <h4 className="text-base font-bold text-[#1a1209] line-clamp-2 leading-snug group-hover:text-[#845b37] transition-colors">
                      <Link href={`/${currentLangCode}/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#5a4a38] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#ede2d6] flex items-center justify-between text-xs">
                    <span className="text-[#705e4f] font-medium truncate max-w-[140px]">
                      By {post.author}
                    </span>
                    <Link
                      href={`/${currentLangCode}/blog/${post.slug}`}
                      className="text-[#845b37] font-bold hover:text-[#4a2c11] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      {tr(BLOG_UI_KEYS.btn_read_article)}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 🎁 3. 하단 전환 CTA 배너 (케이마켓 시그니처 딥 로스티드 커피 톤) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2b1b17] via-[#3d2817] to-[#4a2c11] text-white p-8 sm:p-12 text-center shadow-xl border border-[#5c3818]/40">
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-3">💎</div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {isTax ? tr(BLOG_UI_KEYS.cta_title_tax) : tr(BLOG_UI_KEYS.cta_title_market)}
            </h3>
            <p className="mt-3 text-sm text-[#e2d7cc] leading-relaxed">
              {isTax
                ? tr(BLOG_UI_KEYS.cta_desc_tax)
                : tr(BLOG_UI_KEYS.cta_desc_market)}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={isTax ? `/${currentLangCode}/welcome` : `/${currentLangCode}`}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-full shadow-lg text-sm transition-all hover:scale-105 cursor-pointer"
              >
                {isTax ? tr(BLOG_UI_KEYS.btn_tax_simulate) : tr(BLOG_UI_KEYS.btn_explore_items)}
              </Link>
              <Link
                href={`/${currentLangCode}`}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 text-sm transition-all"
              >
                {tr(BLOG_UI_KEYS.btn_back_to_feed)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
