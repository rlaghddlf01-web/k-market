import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_ITEMS } from '@/lib/mockData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { KMarketItem } from '@/types/kmarket';
import { translateItemToAllLanguages } from '@/lib/itemTranslationService';
import { translateToAllLanguages } from '@/lib/server/genkitTranslator';

// 서버 인메모리 스토리지 (로컬 개발 및 Supabase 미설정 시 안전 fallback)
let inMemoryItems: KMarketItem[] = [...INITIAL_ITEMS];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const region = searchParams.get('region');
    const search = searchParams.get('search');
    const isMovingSale = searchParams.get('moving_sale');

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('kmarket_items').select('*').order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      if (region && region !== 'all') {
        query = query.eq('industrial_zone', region);
      }
      if (isMovingSale === 'true') {
        query = query.eq('is_moving_sale', true);
      }
      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return NextResponse.json({ items: data, source: 'supabase' });
      }
    }

    // 폴백 필터링
    let filtered = [...inMemoryItems];

    if (category && category !== 'all') {
      filtered = filtered.filter((i) => i.category === category);
    }
    if (region && region !== 'all') {
      filtered = filtered.filter((i) => i.industrial_zone === region);
    }
    if (isMovingSale === 'true') {
      filtered = filtered.filter((i) => i.is_moving_sale);
    }
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(lower) ||
          i.description.toLowerCase().includes(lower) ||
          i.region.toLowerCase().includes(lower)
      );
    }

    return NextResponse.json({ items: filtered, source: 'in-memory' });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sourceLang = body.source_lang || 'ko';

    // 17개 언어 일괄 자동 번역 실행 (Genkit + Gemini 기반)
    let itemTranslations = body.translations || {};
    try {
      const generated = await translateToAllLanguages(
        body.title || '',
        body.description || ''
      );
      itemTranslations = { ...itemTranslations, ...generated };
    } catch (transErr) {
      console.warn('Genkit translation failed, using dictionary fallback:', transErr);
      try {
        const fallback = await translateItemToAllLanguages(body.title || '', body.description || '', sourceLang);
        itemTranslations = { ...itemTranslations, ...fallback };
      } catch (e) {}
    }
    
    const newItem: KMarketItem = {
      id: `item-${Date.now()}`,
      seller_id: body.seller_id || 'user-current',
      seller_name: body.seller_name || 'Me (나)',
      seller_phone: body.seller_phone || '010-0000-0000',
      seller_country: body.seller_country || 'KR',
      seller_country_flag: body.seller_country_flag || '🇰🇷',
      title: body.title,
      description: body.description,
      price: Number(body.price) || 0,
      original_price: body.original_price ? Number(body.original_price) : undefined,
      category: body.category || 'appliances',
      images: body.images && body.images.length > 0 ? body.images : [
        'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
      ],
      region: body.region || '내 주변',
      industrial_zone: body.industrial_zone || 'other',
      address: body.address || body.region || '내 주변',
      latitude: body.latitude !== undefined ? Number(body.latitude) : undefined,
      longitude: body.longitude !== undefined ? Number(body.longitude) : undefined,
      status: 'selling',
      view_count: 1,
      like_count: 0,
      is_moving_sale: Boolean(body.is_moving_sale),
      moving_d_day: body.moving_d_day ? Number(body.moving_d_day) : undefined,
      source_lang: sourceLang,
      translations: itemTranslations,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('kmarket_items').insert([newItem]).select();
      if (!error && data && data.length > 0) {
        inMemoryItems.unshift(data[0]);
        return NextResponse.json({ item: data[0], source: 'supabase' }, { status: 201 });
      } else if (error) {
        console.warn('Supabase insert warning:', error.message);
      }
    }

    inMemoryItems.unshift(newItem);
    return NextResponse.json({ item: newItem, source: 'in-memory' }, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
