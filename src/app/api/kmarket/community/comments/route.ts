import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { translateItemToAllLanguages } from '@/lib/itemTranslationService';
import { INITIAL_COMMUNITY_COMMENTS } from '@/lib/communityMockData';
import { CommunityComment } from '@/types/community';

let memoryComments: Record<string, CommunityComment[]> = { ...INITIAL_COMMUNITY_COMMENTS };

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('kmarket_community_comments')
        .select('*')
        .eq('post_id', postId)
        .eq('is_hidden', false)
        .order('created_at', { ascending: true });

      if (!error && data) {
        return NextResponse.json({ comments: data });
      }
    }

    const comments = (memoryComments[postId] || []).filter((c) => !c.is_hidden);
    return NextResponse.json({ comments });
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      postId,
      userId = 'user-current',
      userName = 'K-Market User',
      userCountry = 'KR',
      userFlag = '🇰🇷',
      content,
      sourceLang = 'ko',
    } = body;

    if (!postId || !content) {
      return NextResponse.json({ error: 'postId and content are required' }, { status: 400 });
    }

    // 15개국어 번역 생성
    let translations: Record<string, string> = { [sourceLang]: content };
    try {
      const transResult = await translateItemToAllLanguages(
        content.slice(0, 30),
        content,
        sourceLang
      );
      if (transResult) {
        const mapped: Record<string, string> = {};
        for (const [lang, val] of Object.entries(transResult)) {
          mapped[lang] = val.description || val.title;
        }
        translations = { ...mapped, [sourceLang]: content };
      }
    } catch (e) {
      console.warn('Comment translation failed:', e);
    }

    const newComment: CommunityComment = {
      id: 'comm-' + Date.now(),
      post_id: postId,
      user_id: userId,
      user_name: userName,
      user_country: userCountry,
      user_flag: userFlag,
      content,
      source_lang: sourceLang,
      translations,
      is_hidden: false,
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('kmarket_community_comments')
          .insert({
            post_id: postId,
            user_id: userId,
            user_name: userName,
            user_country: userCountry,
            user_flag: userFlag,
            content,
            source_lang: sourceLang,
            translations,
          })
          .select()
          .single();

        if (!error && data) {
          if (!memoryComments[postId]) memoryComments[postId] = [];
          memoryComments[postId].push(data);
          return NextResponse.json({ success: true, comment: data }, { status: 201 });
        }
      } catch (err) {
        console.warn('Supabase comment insert failed:', err);
      }
    }

    if (!memoryComments[postId]) memoryComments[postId] = [];
    memoryComments[postId].push(newComment);

    return NextResponse.json({ success: true, comment: newComment }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
