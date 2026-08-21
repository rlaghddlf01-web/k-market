import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { translateItemToAllLanguages } from '@/lib/itemTranslationService';
import { INITIAL_COMMUNITY_POSTS } from '@/lib/communityMockData';
import { CommunityPost } from '@/types/community';

let memoryPosts: CommunityPost[] = [...INITIAL_COMMUNITY_POSTS];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const region = searchParams.get('region');
    const search = searchParams.get('search');

    if (supabase) {
      let query = supabase
        .from('kmarket_community_posts')
        .select('*')
        .eq('is_hidden', false)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return NextResponse.json({ posts: data });
      }
    }

    // 인메모리 필터링
    let filtered = memoryPosts.filter((p) => !p.is_hidden);
    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ posts: filtered });
  } catch (error: any) {
    console.error('Error fetching community posts:', error);
    return NextResponse.json({ posts: memoryPosts });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // 1. 공감/힘내요 리액션 처리
    if (action === 'react') {
      const { postId, reactionType } = body;
      const target = memoryPosts.find((p) => p.id === postId);
      if (target) {
        if (reactionType === 'cheer') {
          target.cheer_count += 1;
        } else {
          target.like_count += 1;
        }
      }

      if (supabase) {
        try {
          if (reactionType === 'cheer') {
            await supabase.rpc('increment_post_cheer', { post_id_param: postId });
          } else {
            await supabase.rpc('increment_post_like', { post_id_param: postId });
          }
        } catch (e) {
          // ignore rpc fail
        }
      }

      return NextResponse.json({ success: true, post: target });
    }

    // 2. 게시글 신고 처리
    if (action === 'report') {
      const { postId, reporterId, reporterName, targetUserId, targetUserName, reasonType, reasonDetail } = body;
      
      if (supabase) {
        await supabase.from('kmarket_community_reports').insert({
          reporter_id: reporterId || 'anonymous',
          reporter_name: reporterName || '익명',
          target_type: 'post',
          target_id: postId,
          target_user_id: targetUserId,
          target_user_name: targetUserName,
          reason_type: reasonType || 'other',
          reason_detail: reasonDetail || '',
        });
      }

      return NextResponse.json({ success: true, message: '신고가 정상 접수되었습니다.' });
    }

    // 3. 새 게시글 등록 + 15개국어 일괄 번역 생성
    const {
      userId = 'user-current',
      userName = 'K-Market User',
      userCountry = 'VN',
      userFlag = '🇻🇳',
      category = 'friends',
      title,
      content,
      images = [],
      region = '전국',
      sourceLang = 'ko',
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: '제목과 내용을 입력해주세요.' }, { status: 400 });
    }

    // Gemini Flash 15개국어 일괄 번역 생성 (단 1회 호출)
    let translations: Record<string, { title: string; content: string }> = {
      [sourceLang]: { title, content },
    };

    try {
      const transResult = await translateItemToAllLanguages(title, content, sourceLang);
      if (transResult && Object.keys(transResult).length > 0) {
        // description 필드를 content로 매핑
        const mapped: Record<string, { title: string; content: string }> = {};
        for (const [lang, val] of Object.entries(transResult)) {
          mapped[lang] = { title: val.title, content: val.description };
        }
        translations = { ...mapped, [sourceLang]: { title, content } };
      }
    } catch (transErr) {
      console.warn('Community translation generation failed, saving source:', transErr);
    }

    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      user_id: userId,
      user_name: userName,
      user_country: userCountry,
      user_flag: userFlag,
      category,
      title,
      content,
      images: Array.isArray(images) ? images.slice(0, 5) : [],
      region,
      source_lang: sourceLang,
      translations,
      like_count: 0,
      cheer_count: 0,
      comment_count: 0,
      view_count: 1,
      is_hidden: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Supabase 저장 시도
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('kmarket_community_posts')
          .insert({
            user_id: newPost.user_id,
            user_name: newPost.user_name,
            user_country: newPost.user_country,
            user_flag: newPost.user_flag,
            category: newPost.category,
            title: newPost.title,
            content: newPost.content,
            images: newPost.images,
            region: newPost.region,
            source_lang: newPost.source_lang,
            translations: newPost.translations,
          })
          .select()
          .single();

        if (!error && data) {
          memoryPosts = [data, ...memoryPosts];
          return NextResponse.json({ success: true, post: data }, { status: 201 });
        }
      } catch (dbErr) {
        console.warn('Supabase post insert failed, using memory:', dbErr);
      }
    }

    memoryPosts = [newPost, ...memoryPosts];
    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating community post:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
