import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BLOG_17_POSTS_DATA } from './blog/blog17Data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseBlog: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// 프로젝트 환경변수 또는 도메인에 따라 테이블 자동 선택
export const isEasyTax = process.env.NEXT_PUBLIC_SERVICE_ID === 'easytax';
export const BLOG_TABLE = isEasyTax ? 'easytax_blogs' : 'kmarket_blogs';

export interface BlogPost {
  id: number | string;
  slug: string;
  target_lang: string;
  title: string;
  excerpt: string;
  content_html: string;
  content_md?: string;
  thumbnail_url: string;
  category: string;
  author: string;
  read_time_min?: number;
  views?: number;
  likes?: number;
  published_at: string;
  created_at?: string;
}

// 1. 특정 언어의 최신 블로그 목록 조회 (Supabase DB 우선, 17개국어 시드 데이터 스마트 폴백)
export async function getBlogPosts(lang: string = 'en', limit: number = 24): Promise<BlogPost[]> {
  const normLang = lang ? lang.toLowerCase() : 'en';

  if (supabaseBlog) {
    try {
      const { data, error } = await supabaseBlog
        .from(BLOG_TABLE)
        .select('*')
        .eq('target_lang', normLang)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (!error && data && data.length > 0) {
        return data as BlogPost[];
      }
    } catch (err) {
      console.warn(`[Supabase Blog] Query failed for lang=${normLang}, using 17-lang verified data:`, err);
    }
  }

  // 17개 언어별 정밀 번역 칼럼 데이터
  const seedList = BLOG_17_POSTS_DATA[normLang] || BLOG_17_POSTS_DATA['en'] || BLOG_17_POSTS_DATA['ko'] || [];
  return seedList.slice(0, limit);
}

// 2. 특정 슬러그와 언어의 블로그 상세 조회
export async function getBlogPostBySlug(slug: string, lang: string = 'en'): Promise<BlogPost | null> {
  const normLang = lang ? lang.toLowerCase() : 'en';

  if (supabaseBlog) {
    try {
      const { data, error } = await supabaseBlog
        .from(BLOG_TABLE)
        .select('*')
        .eq('slug', slug)
        .eq('target_lang', normLang)
        .maybeSingle();

      if (!error && data) {
        return data as BlogPost;
      }
    } catch (err) {
      console.warn(`[Supabase Blog] Single query failed for slug=${slug}, lang=${normLang}:`, err);
    }
  }

  // 17개국 데이터셋에서 검색
  const directList = BLOG_17_POSTS_DATA[normLang] || [];
  const foundDirect = directList.find((p) => p.slug === slug);
  if (foundDirect) return foundDirect;

  const allPosts = Object.values(BLOG_17_POSTS_DATA).flat();
  return allPosts.find((p) => p.slug === slug) || null;
}
