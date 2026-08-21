'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  KMarketItem,
  KMarketChat,
  KMarketMessage,
  ItemCategory,
  IndustrialRegion,
  SupportedLanguage,
} from '@/types/kmarket';
import { INITIAL_ITEMS, INITIAL_CHATS } from '@/lib/mockData';
import { useLanguage } from './LanguageContext';

interface KMarketContextType {
  items: KMarketItem[];
  isLoading: boolean;
  selectedCategory: ItemCategory;
  setSelectedCategory: (cat: ItemCategory) => void;
  selectedRegion: IndustrialRegion;
  setSelectedRegion: (region: IndustrialRegion) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMovingSaleOnly: boolean;
  setIsMovingSaleOnly: (val: boolean) => void;
  
  // 모달 & 드로어 상태
  selectedItem: KMarketItem | null;
  setSelectedItem: (item: KMarketItem | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isTaxModalOpen: boolean;
  setIsTaxModalOpen: (open: boolean) => void;
  
  // 채팅 상태
  activeChat: KMarketChat | null;
  chatMessages: KMarketMessage[];
  isChatLoading: boolean;
  isTranslating: boolean;
  openChatForItem: (item: KMarketItem) => Promise<void>;
  closeChat: () => void;
  sendMessage: (text: string) => Promise<void>;

  // 기능 액션
  addItem: (item: Partial<KMarketItem>) => Promise<void>;
  updateItemStatus: (
    itemId: string,
    status: ItemStatus,
    targetUserId?: string,
    targetUserName?: string
  ) => void;
  boostItem: (itemId: string, newPrice?: number) => void;
  toggleLike: (itemId: string) => void;
  likedItemIds: Set<string>;
}

const KMarketContext = createContext<KMarketContextType | undefined>(undefined);

export function KMarketProvider({ children }: { children: React.ReactNode }) {
  const { currentLang } = useLanguage();
  const [items, setItems] = useState<KMarketItem[]>(INITIAL_ITEMS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all');
  const [selectedRegion, setSelectedRegion] = useState<IndustrialRegion>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMovingSaleOnly, setIsMovingSaleOnly] = useState<boolean>(false);
  const [likedItemIds, setLikedItemIds] = useState<Set<string>>(new Set());

  // 모달
  const [selectedItem, setSelectedItem] = useState<KMarketItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState<boolean>(false);

  // 채팅
  const [activeChat, setActiveChat] = useState<KMarketChat | null>(null);
  const [chatMessages, setChatMessages] = useState<KMarketMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // 초기 로컬 스토리지 불러오기
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('kmarket_local_items');
      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
      const savedLikes = localStorage.getItem('kmarket_liked_items');
      if (savedLikes) {
        setLikedItemIds(new Set(JSON.parse(savedLikes)));
      }
    } catch (e) {
      console.warn('Error loading localStorage:', e);
    }
  }, []);

  const toggleLike = (itemId: string) => {
    setLikedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      try {
        localStorage.setItem('kmarket_liked_items', JSON.stringify(Array.from(next)));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              like_count: likedItemIds.has(itemId)
                ? Math.max(0, item.like_count - 1)
                : item.like_count + 1,
            }
          : item
      )
    );
  };

  const addItem = async (itemData: Partial<KMarketItem>) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/kmarket/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...itemData,
          source_lang: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const created = data.item;
        setItems((prev) => {
          const updated = [created, ...prev];
          try {
            localStorage.setItem('kmarket_local_items', JSON.stringify(updated));
          } catch (e) {
            console.warn(e);
          }
          return updated;
        });
      }
    } catch (err) {
      console.error('Error adding item:', err);
    } finally {
      setIsLoading(false);
      setIsCreateModalOpen(false);
    }
  };

  const updateItemStatus = (
    itemId: string,
    status: ItemStatus,
    targetUserId?: string,
    targetUserName?: string
  ) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status,
              ...(status === 'reserved'
                ? { reserved_to_user_id: targetUserId, reserved_to_user_name: targetUserName }
                : {}),
              ...(status === 'sold'
                ? { sold_to_user_id: targetUserId, sold_to_user_name: targetUserName }
                : {}),
              updated_at: new Date().toISOString(),
            }
          : item
      );
      try {
        localStorage.setItem('kmarket_local_items', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem((prev) =>
        prev
          ? {
              ...prev,
              status,
              ...(status === 'reserved'
                ? { reserved_to_user_id: targetUserId, reserved_to_user_name: targetUserName }
                : {}),
              ...(status === 'sold'
                ? { sold_to_user_id: targetUserId, sold_to_user_name: targetUserName }
                : {}),
            }
          : null
      );
    }
  };

  const boostItem = (itemId: string, newPrice?: number) => {
    setItems((prev) => {
      const targetItem = prev.find((i) => i.id === itemId);
      if (!targetItem) return prev;

      const isPriceDrop = Boolean(newPrice && newPrice < targetItem.price);
      const discountRate =
        isPriceDrop && newPrice
          ? Math.round(((targetItem.price - newPrice) / targetItem.price) * 100)
          : undefined;

      const boostedItem: KMarketItem = {
        ...targetItem,
        price: newPrice !== undefined ? newPrice : targetItem.price,
        original_price:
          isPriceDrop && !targetItem.original_price ? targetItem.price : targetItem.original_price,
        is_price_dropped: isPriceDrop,
        drop_discount_rate: discountRate,
        boosted_at: new Date().toISOString(),
        created_at: new Date().toISOString(), // 상단 노출을 위해 시간 갱신
      };

      // 목록 맨 앞으로 끌어올리기
      const otherItems = prev.filter((i) => i.id !== itemId);
      const updated = [boostedItem, ...otherItems];
      try {
        localStorage.setItem('kmarket_local_items', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem((prev) =>
        prev
          ? {
              ...prev,
              price: newPrice !== undefined ? newPrice : prev.price,
              boosted_at: new Date().toISOString(),
              is_price_dropped: Boolean(newPrice && newPrice < prev.price),
            }
          : null
      );
    }
  };

  const openChatForItem = async (item: KMarketItem) => {
    setIsChatLoading(true);
    try {
      const res = await fetch('/api/kmarket/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_or_get_chat',
          item,
          buyer_id: 'user-current',
          buyer_name: 'Me (나)',
          buyer_country: 'KR',
          buyer_flag: '🇰🇷',
          buyer_lang: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const chat = data.chat;
        setActiveChat(chat);

        // 메시지 불러오기
        const msgRes = await fetch(`/api/kmarket/chat?chatId=${chat.id}`);
        if (msgRes.ok) {
          const msgData = await msgRes.json();
          setChatMessages(msgData.messages || []);
        }
      }
    } catch (error) {
      console.error('Failed to open chat:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const closeChat = () => {
    setActiveChat(null);
    setChatMessages([]);
  };

  const sendMessage = async (text: string) => {
    if (!activeChat || !text.trim()) return;

    setIsTranslating(true);
    try {
      // 1. 상대방 언어로 Gemini 0.3초 실시간 번역 요청
      const targetLang = activeChat.seller_lang || 'vi';
      const sourceLang = currentLang;

      let translatedText = '';
      try {
        const transRes = await fetch('/api/kmarket/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            sourceLang,
            targetLang,
          }),
        });
        if (transRes.ok) {
          const transData = await transRes.json();
          translatedText = transData.translatedText;
        }
      } catch (err) {
        console.warn('Translation call failed:', err);
      }

      // 2. 메시지 전송 API
      const msgRes = await fetch('/api/kmarket/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          chatId: activeChat.id,
          senderId: 'user-current',
          senderType: 'buyer',
          originalText: text,
          translatedText,
          sourceLang,
          targetLang,
        }),
      });

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setChatMessages((prev) => [...prev, msgData.message]);
      }

      // 3. 실감나는 시뮬레이션: 상대방 판매자의 15개국어 자동 응답 (데모 편의성)
      setTimeout(async () => {
        const sampleSellerReplies: Record<string, { original: string; trans: string; lang: SupportedLanguage }> = {
          vi: {
            original: 'Cảm ơn bạn! Mình có thể bớt thêm 5,000 won cho bạn nhé. Tối nay 7h gặp nha!',
            trans: '감사합니다! 5,000원 더 깎아드릴게요. 오늘 저녁 7시에 만나요!',
            lang: 'vi',
          },
          ne: {
            original: 'धन्यवाद! म ५,००० वोन छुट दिन सक्छु। आज साँझ ७ बजे भेटौँला!',
            trans: '감사합니다! 5,000원 할인해 드릴 수 있어요. 오늘 저녁 7시에 만나요!',
            lang: 'ne',
          },
          th: {
            original: 'ขอบคุณครับ! ลดให้อีก 5,000 วอนได้ครับ เจอกัน 1 ทุ่มนี้นะครับ',
            trans: '감사합니다! 5,000원 추가 할인 가능합니다. 오늘 저녁 7시에 봬요.',
            lang: 'th',
          },
        };

        const replyData =
          sampleSellerReplies[activeChat.seller_country?.toLowerCase()] ||
          sampleSellerReplies['vi'];

        const autoReplyMsg: KMarketMessage = {
          id: `msg-reply-${Date.now()}`,
          chat_id: activeChat.id,
          sender_id: activeChat.seller_id,
          sender_type: 'seller',
          original_text: replyData.original,
          translated_text: replyData.trans,
          source_lang: replyData.lang,
          target_lang: 'ko',
          is_read: true,
          created_at: new Date().toISOString(),
        };

        setChatMessages((prev) => [...prev, autoReplyMsg]);
      }, 1200);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <KMarketContext.Provider
      value={{
        items,
        isLoading,
        selectedCategory,
        setSelectedCategory,
        selectedRegion,
        setSelectedRegion,
        searchQuery,
        setSearchQuery,
        isMovingSaleOnly,
        setIsMovingSaleOnly,
        selectedItem,
        setSelectedItem,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isTaxModalOpen,
        setIsTaxModalOpen,
        activeChat,
        chatMessages,
        isChatLoading,
        isTranslating,
        openChatForItem,
        closeChat,
        sendMessage,
        addItem,
        updateItemStatus,
        boostItem,
        toggleLike,
        likedItemIds,
      }}
    >
      {children}
    </KMarketContext.Provider>
  );
}

export function useKMarket() {
  const context = useContext(KMarketContext);
  if (!context) {
    throw new Error('useKMarket must be used within a KMarketProvider');
  }
  return context;
}
