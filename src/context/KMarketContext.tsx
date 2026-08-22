'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  KMarketItem,
  KMarketChat,
  KMarketMessage,
  ItemCategory,
  ItemStatus,
  IndustrialRegion,
  SupportedLanguage,
  KeywordAlert,
  AppNotification,
  AuthedUserData,
  FeedbackItem,
} from '@/types/kmarket';
import { INITIAL_ITEMS, INITIAL_CHATS } from '@/lib/mockData';
import { useLanguage } from './LanguageContext';
import { sendLocalPushNotification, sendLocalizedPushNotification } from '@/lib/webPushService';
import { generateSmartSellerReply } from '@/lib/autoSellerReply';

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
  activeMainTab: 'market' | 'community';
  setActiveMainTab: (tab: 'market' | 'community') => void;
  
  // 모달 & 드로어 상태
  selectedItem: KMarketItem | null;
  setSelectedItem: (item: KMarketItem | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isTaxModalOpen: boolean;
  setIsTaxModalOpen: (open: boolean) => void;
  isFavoritesModalOpen: boolean;
  setIsFavoritesModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isMyPageOpen: boolean;
  setIsMyPageOpen: (open: boolean) => void;
  isKeywordModalOpen: boolean;
  setIsKeywordModalOpen: (open: boolean) => void;
  isLocationRadiusModalOpen: boolean;
  setIsLocationRadiusModalOpen: (open: boolean) => void;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  feedbacks: FeedbackItem[];
  submitFeedback: (feedback: FeedbackItem) => void;
  authedUser: any;
  setAuthedUser: (user: any) => void;
  
  // 통합 알림 센터 상태
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markAllNotificationsAsRead: () => void;
  markNotificationAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'created_at'>) => void;

  // 키워드 실시간 알림 상태
  keywordAlerts: KeywordAlert[];
  addKeywordAlert: (alert: Omit<KeywordAlert, 'id' | 'created_at' | 'matched_count'>) => void;
  removeKeywordAlert: (id: string) => void;
  toggleKeywordAlert: (id: string) => void;
  
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
  blockedUserIds: Set<string>;
  blockUser: (userId: string) => void;
  reportUser: (report: any) => void;
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
  const [activeMainTab, setActiveMainTab] = useState<'market' | 'community'>('market');
  const [likedItemIds, setLikedItemIds] = useState<Set<string>>(new Set());

  // 모달
  const [selectedItem, setSelectedItem] = useState<KMarketItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState<boolean>(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState<boolean>(false);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState<boolean>(false);
  const [isLocationRadiusModalOpen, setIsLocationRadiusModalOpen] = useState<boolean>(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [authedUser, setAuthedUser] = useState<any>(null);

  // 피드백 건의 제출 함수
  const submitFeedback = (newFeedback: FeedbackItem) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
    // 로컬스토리지 백업
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('kmarket_feedbacks') || '[]');
        localStorage.setItem('kmarket_feedbacks', JSON.stringify([newFeedback, ...stored]));
      } catch (err) {
        console.error('Failed to save feedback to storage', err);
      }
    }
  };

  // 통합 알림 목록 상태 (초기 시드 알림 제공)
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      type: 'keyword',
      title: '🔔 키워드 알림: [세탁기]',
      message: '평택 포승공단에 "통돌이 세탁기 10kg + 쿠쿠 밥솥" 매물이 새로 등록되었습니다.',
      item_id: 'item-1',
      item_image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80',
      is_read: false,
      created_at: '10분 전',
    },
    {
      id: 'notif-2',
      type: 'chat',
      title: '💬 1:1 안심 번역 채팅 도착',
      message: 'Nguyễn 님이 새로운 번역 메시지를 보냈습니다: "감사합니다! 오늘 저녁 7시에 만나요!"',
      item_id: 'item-1',
      chat_id: 'chat-demo-1',
      is_read: false,
      created_at: '25분 전',
    },
    {
      id: 'notif-3',
      type: 'price_drop',
      title: '🔥 찜한 매물 가격 인하',
      message: '관심 매물 "쿠쿠 전기밥솥 6인용" 가격이 25,000원으로 15% 인하되었습니다!',
      item_id: 'item-2',
      item_image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      is_read: false,
      created_at: '1시간 전',
    },
    {
      id: 'notif-4',
      type: 'appointment',
      title: '📍 직거래 약속 1시간 전 리마인더',
      message: '오늘 19:00 "포승공단 GS25 편의점 앞" 직거래 약속 1시간 전입니다.',
      item_id: 'item-1',
      is_read: true,
      created_at: '2시간 전',
    },
  ]);

  const unreadNotificationCount = notifications.filter((n) => !n.is_read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (newNotif: Omit<AppNotification, 'id' | 'created_at'>) => {
    const item: AppNotification = {
      ...newNotif,
      id: 'notif-' + Date.now(),
      created_at: '방금 전',
    };
    setNotifications((prev) => [item, ...prev]);
  };

  // 키워드 알림 상태 (외국인 기숙사 인기 기본값 3개 제공)
  const [keywordAlerts, setKeywordAlerts] = useState<KeywordAlert[]>([
    {
      id: 'kw-1',
      keyword: '세탁기',
      industrial_zone: 'all',
      is_active: true,
      notify_by_sms: true,
      matched_count: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 'kw-2',
      keyword: '0원',
      industrial_zone: 'all',
      is_active: true,
      notify_by_sms: true,
      matched_count: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 'kw-3',
      keyword: '냉장고',
      industrial_zone: 'pyeongtaek',
      is_active: true,
      notify_by_sms: true,
      matched_count: 3,
      created_at: new Date().toISOString(),
    },
  ]);

  const addKeywordAlert = (newKw: Omit<KeywordAlert, 'id' | 'created_at' | 'matched_count'>) => {
    const newAlert: KeywordAlert = {
      ...newKw,
      id: 'kw-' + Date.now(),
      matched_count: 0,
      created_at: new Date().toISOString(),
    };
    setKeywordAlerts((prev) => [newAlert, ...prev]);
  };

  const removeKeywordAlert = (id: string) => {
    setKeywordAlerts((prev) => prev.filter((k) => k.id !== id));
  };

  const toggleKeywordAlert = (id: string) => {
    setKeywordAlerts((prev) =>
      prev.map((k) => (k.id === id ? { ...k, is_active: !k.is_active } : k))
    );
  };

  // 채팅
  const [activeChat, setActiveChat] = useState<KMarketChat | null>(null);
  const [chatMessages, setChatMessages] = useState<KMarketMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // 초기 로컬 스토리지 불러오기 및 ?item= 딥링크 자동 모달 오픈
  useEffect(() => {
    try {
      // 중고나라 471개 실매물 데이터셋으로 최신 동기화
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kmarket_local_items');
      }

      setItems(INITIAL_ITEMS);
      let currentItems = INITIAL_ITEMS;
      const savedLikes = localStorage.getItem('kmarket_liked_items');
      if (savedLikes) {
        setLikedItemIds(new Set(JSON.parse(savedLikes)));
      }

      // URL 쿼리 파라미터 ?item= 확인하여 해당 매물 상세 모달 즉시 오픈
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const targetItemId = urlParams.get('item');
        if (targetItemId) {
          const matched = currentItems.find((i) => i.id === targetItemId);
          if (matched) {
            setSelectedItem(matched);
          }
        }
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

  const [blockedUserIds, setBlockedUserIds] = useState<Set<string>>(new Set());

  const blockUser = (userId: string) => {
    setBlockedUserIds((prev) => {
      const next = new Set(prev);
      next.add(userId);
      return next;
    });
    // 차단된 유저의 채팅방이 열려있으면 즉시 닫기
    if (activeChat && activeChat.seller_id === userId) {
      setActiveChat(null);
    }
  };

  const reportUser = (reportData: any) => {
    if (reportData.block_user && reportData.target_user_id) {
      blockUser(reportData.target_user_id);
    }
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

        // 🔔 관심 키워드 매칭 시 실시간 15개국어 웹 푸시 알림 발송 (Service Worker)
        keywordAlerts.forEach((kw) => {
          if (
            kw.is_active &&
            (created.title.toLowerCase().includes(kw.keyword.toLowerCase()) ||
              created.description.toLowerCase().includes(kw.keyword.toLowerCase()))
          ) {
            sendLocalizedPushNotification({
              type: 'keyword',
              lang: currentLang,
              params: {
                keyword: kw.keyword,
                itemTitle: created.title,
                itemPrice: created.price === 0 ? '0원' : created.price.toLocaleString() + '원',
                itemRegion: created.region,
              },
              url: `/?item=${created.id}`,
            });
          }
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
      const countryToLangMap: Record<string, SupportedLanguage> = {
        VN: 'vi',
        US: 'en',
        NP: 'ne',
        TH: 'th',
        MM: 'my',
        KH: 'km',
        MN: 'mn',
        PH: 'en',
        JP: 'ja',
        KZ: 'kk',
        PK: 'ur',
        ID: 'id',
        LK: 'si',
        BD: 'bn',
        CN: 'zh',
        RU: 'ru',
        KR: 'ko',
      };

      const targetLang =
        activeChat.seller_lang ||
        countryToLangMap[activeChat.seller_country?.toUpperCase()] ||
        'vi';
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

        // 3. 판매자의 지능형 스마트 답장 시뮬레이션 (1.2초 후 실제 상황별 15개국어 자동 응답)
      setTimeout(async () => {
        const targetItem = activeChat.item || items.find((it) => it.id === activeChat.item_id) || items[0];
        const smartReply = generateSmartSellerReply(text, targetItem, currentLang);

        // 판매자 원문 -> 현재 구매자 언어(currentLang)로 실시간 번역
        let sellerTransText = smartReply.koreanMeaning;
        if (currentLang !== 'ko') {
          try {
            const transRes = await fetch('/api/kmarket/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                text: smartReply.original,
                sourceLang: smartReply.sourceLang,
                targetLang: currentLang,
              }),
            });
            if (transRes.ok) {
              const data = await transRes.json();
              sellerTransText = data.translatedText;
            }
          } catch (e) {
            console.warn('Seller translation failed:', e);
          }
        }

        const autoReplyMsg: KMarketMessage = {
          id: `msg-reply-${Date.now()}`,
          chat_id: activeChat.id,
          sender_id: activeChat.seller_id,
          sender_type: 'seller',
          original_text: smartReply.original,
          translated_text: sellerTransText || smartReply.koreanMeaning,
          source_lang: smartReply.sourceLang,
          target_lang: currentLang,
          is_read: true,
          created_at: new Date().toISOString(),
        };

        setChatMessages((prev) => [...prev, autoReplyMsg]);

        // 🔔 1:1 번역 채팅 실시간 17개국어 웹 푸시 알림 발송 (Service Worker)
        sendLocalizedPushNotification({
          type: 'chat',
          lang: currentLang,
          params: {
            senderName: activeChat.seller_name,
            itemTitle: sellerTransText || activeChat.item_title,
          },
          url: `/?chat=${activeChat.id}`,
        });
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
        activeMainTab,
        setActiveMainTab,
        selectedItem,
        setSelectedItem,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isTaxModalOpen,
        setIsTaxModalOpen,
        isFavoritesModalOpen,
        setIsFavoritesModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isMyPageOpen,
        setIsMyPageOpen,
        isKeywordModalOpen,
        setIsKeywordModalOpen,
        isLocationRadiusModalOpen,
        setIsLocationRadiusModalOpen,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        feedbacks,
        submitFeedback,
        notifications,
        unreadNotificationCount,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        removeNotification,
        addNotification,
        keywordAlerts,
        addKeywordAlert,
        removeKeywordAlert,
        toggleKeywordAlert,
        authedUser,
        setAuthedUser,
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
        blockedUserIds,
        blockUser,
        reportUser,
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
