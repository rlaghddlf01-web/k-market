import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_CHATS } from '@/lib/mockData';
import { KMarketChat, KMarketMessage } from '@/types/kmarket';

let inMemoryChats: KMarketChat[] = [...INITIAL_CHATS];
let inMemoryMessages: Record<string, KMarketMessage[]> = {
  'chat-demo-1': [
    {
      id: 'msg-1',
      chat_id: 'chat-demo-1',
      sender_id: 'user-current',
      sender_type: 'buyer',
      original_text: '안녕하세요! 무빙세일 세탁기+밥솥 세트 아직 있나요? 오늘 저녁 7시에 포승공단 기숙사 앞에서 직거래 가능할까요?',
      translated_text: 'Xin chào bạn! Bộ combo máy giặt + nồi cơm điện thanh lý còn không? Tối nay 7 giờ gặp trực tiếp trước ký túc xá KCN Poseung được không ạ?',
      source_lang: 'ko',
      target_lang: 'vi',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'msg-2',
      chat_id: 'chat-demo-1',
      sender_id: 'user-vn-1',
      sender_type: 'seller',
      original_text: 'Chào bạn, vâng đồ vẫn còn nguyên ạ! 7 giờ tối nay gặp ở cổng ký túc xá nhé, mình sẽ mang ra cho bạn test thử.',
      translated_text: '안녕하세요, 네 물건 그대로 다 있습니다! 오늘 저녁 7시 기숙사 정문에서 봬요, 직접 테스트해보실 수 있게 가지고 나갈게요.',
      source_lang: 'vi',
      target_lang: 'ko',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
  ],
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get('chatId');

    if (chatId) {
      const messages = inMemoryMessages[chatId] || [];
      const chat = inMemoryChats.find((c) => c.id === chatId);
      return NextResponse.json({ chat, messages });
    }

    return NextResponse.json({ chats: inMemoryChats });
  } catch (error) {
    console.error('Error in chat API GET:', error);
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // 1. 새 채팅방 생성 또는 기존 채팅방 가져오기
    if (action === 'create_or_get_chat') {
      const { item, buyer_id, buyer_name, buyer_country, buyer_flag, buyer_lang } = body;
      
      let existingChat = inMemoryChats.find(
        (c) => c.item_id === item.id && c.buyer_id === buyer_id
      );

      if (!existingChat) {
        existingChat = {
          id: `chat-${Date.now()}`,
          item_id: item.id,
          item_title: item.title || '',
          item_price: item.price || 0,
          item_image: (item.images && item.images[0]) || '',
          item,
          buyer_id: buyer_id || 'user-current',
          buyer_name: buyer_name || 'Me (나)',
          buyer_country: buyer_country || 'KR',
          buyer_flag: buyer_flag || '🇰🇷',
          buyer_country_flag: buyer_flag || '🇰🇷',
          buyer_lang: buyer_lang || 'ko',
          seller_id: item.seller_id,
          seller_name: item.seller_name,
          seller_country: item.seller_country,
          seller_flag: item.seller_country_flag,
          seller_country_flag: item.seller_country_flag || '🇻🇳',
          seller_lang: item.source_lang || 'vi',
          last_message: '채팅방이 시작되었습니다.',
          last_message_at: new Date().toISOString(),
          unread_count: 0,
          status: 'active',
          messages: [],
          created_at: new Date().toISOString(),
        };
        inMemoryChats.unshift(existingChat);
        inMemoryMessages[existingChat.id] = [];
      }

      return NextResponse.json({ chat: existingChat });
    }

    // 2. 새 메시지 전송
    if (action === 'send_message') {
      const { chatId, senderId, senderType, originalText, translatedText, sourceLang, targetLang } = body;
      
      const newMsg: KMarketMessage = {
        id: `msg-${Date.now()}`,
        chat_id: chatId,
        sender_id: senderId,
        sender_type: senderType,
        original_text: originalText,
        translated_text: translatedText,
        source_lang: sourceLang,
        target_lang: targetLang,
        is_read: false,
        created_at: new Date().toISOString(),
      };

      if (!inMemoryMessages[chatId]) {
        inMemoryMessages[chatId] = [];
      }
      inMemoryMessages[chatId].push(newMsg);

      // 마지막 메시지 업데이트
      const chatIndex = inMemoryChats.findIndex((c) => c.id === chatId);
      if (chatIndex >= 0) {
        inMemoryChats[chatIndex].last_message = originalText;
        inMemoryChats[chatIndex].last_message_at = newMsg.created_at;
      }

      return NextResponse.json({ message: newMsg });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in chat API POST:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
