import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { translateToAllLanguages } from '@/lib/server/genkitTranslator';

// 서비스 롤 키로 접근 (RLS 우회)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // 간단한 보안: 서비스 롤 키 헤더 확인
  const authHeader = req.headers.get('x-service-key');
  if (authHeader !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { offset = 0, limit = 5 } = body; // 한 번에 5개씩 처리

  try {
    // 1. 매물 목록 조회
    const { data: items, error, count } = await supabaseAdmin
      .from('kmarket_items')
      .select('id, title, description, translations', { count: 'exact' })
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ done: true, total: count, processed: 0 });
    }

    let successCount = 0;
    let failCount = 0;
    const results: string[] = [];

    // 2. 각 매물 Gemini로 번역 후 업데이트
    for (const item of items) {
      try {
        const translations = await translateToAllLanguages(
          item.title || '',
          item.description || ''
        );

        const { error: updateError } = await supabaseAdmin
          .from('kmarket_items')
          .update({ translations })
          .eq('id', item.id);

        if (updateError) {
          failCount++;
          results.push(`[FAIL] ${item.id}: ${updateError.message}`);
        } else {
          successCount++;
          results.push(`[OK] ${item.id}: ${item.title?.slice(0, 20)}`);
        }
      } catch (err: any) {
        failCount++;
        results.push(`[ERR] ${item.id}: ${err.message}`);
      }

      // 과부하 방지 딜레이
      await new Promise(r => setTimeout(r, 500));
    }

    return NextResponse.json({
      done: false,
      total: count,
      offset,
      processed: items.length,
      successCount,
      failCount,
      results,
      nextOffset: offset + limit,
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
