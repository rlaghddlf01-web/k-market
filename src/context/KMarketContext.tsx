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
  UserLocationSettings,
} from '@/types/kmarket';
import { INITIAL_ITEMS, INITIAL_CHATS } from '@/lib/mockData';
import { shuffleItems } from '@/lib/itemShuffleUtils';
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
  
  // 1터치 글로벌 SNS 공유 모달 상태
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  shareItem: KMarketItem | null;
  openShareModal: (item: KMarketItem) => void;
  closeShareModal: () => void;
  authedUser: any;
  setAuthedUser: (user: any) => void;
  userLocation: UserLocationSettings;
  setUserLocation: (loc: UserLocationSettings) => void;
  syncCurrentGpsLocation: () => Promise<void>;
  isGpsSyncing: boolean;
  
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
  const { t } = useLanguage();
  const { currentLang } = useLanguage();
  const [items, setItems] = useState<KMarketItem[]>([]); // SSR hydration 안전: 빈 배열로 시작, useEffect에서 클라이언트에만 로드
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

  // 1터치 글로벌 SNS 공유 모달 상태
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareItem, setShareItem] = useState<KMarketItem | null>(null);

  const openShareModal = (item: KMarketItem) => {
    setShareItem(item);
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setShareItem(null);
  };

  // 내 위치 및 반경 설정 (기본값: 내 주변, 3km)
  const [userLocation, setUserLocationState] = useState<UserLocationSettings>({
    locationName: '내 주변',
    radiusKm: 3,
    coords: {
      lat: 37.5665,
      lng: 126.9780,
    },
    isGpsVerified: false,
  });

  const [isGpsSyncing, setIsGpsSyncing] = useState<boolean>(false);

  const setUserLocation = (newLoc: UserLocationSettings) => {
    setUserLocationState(newLoc);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kmarket_user_location', JSON.stringify(newLoc));
      } catch (err) {
        console.warn('Failed to save user location:', err);
      }
    }
  };

  // 실시간 접속자 실제 위치 자동 동기화 (HTML5 GPS + IP 스마트 폴백)
  const syncCurrentGpsLocation = async () => {
    if (typeof window === 'undefined') return;

    setIsGpsSyncing(true);

    const updateLocationState = (locName: string, lat: number, lng: number) => {
      const newLoc: UserLocationSettings = {
        locationName: locName,
        radiusKm: userLocation?.radiusKm || 3,
        coords: { lat, lng },
        isGpsVerified: true,
        updatedAt: new Date().toISOString(),
      };
      setUserLocationState(newLoc);
      try {
        localStorage.setItem('kmarket_user_location', JSON.stringify(newLoc));
      } catch (err) {
        console.warn(err);
      }
      setIsGpsSyncing(false);
    };

    // 1차 시도: 브라우저 고정밀 HTML5 Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          let resolvedAddress = '';

          try {
            const res = await fetch('/api/kmarket/geocode', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ latitude, longitude }),
            });
            if (res.ok) {
              const data = await res.json();
              if (data.address) {
                resolvedAddress = data.address;
              }
            }
          } catch (err) {
            console.warn('Geocoding call error:', err);
          }

          updateLocationState(resolvedAddress || '내 주변 (GPS 인증됨)', latitude, longitude);
        },
        async (error) => {
          console.warn('GPS permission denied or timeout, fallback to IP location:', error.message);
          // 2차 시도: IP 기반 실시간 접속자 도시/위치 자동 탐색
          try {
            const ipRes = await fetch('https://ipapi.co/json/');
            if (ipRes.ok) {
              const ipData = await ipRes.json();
              if (ipData.city || ipData.region) {
                const ipLat = ipData.latitude || 37.5665;
                const ipLng = ipData.longitude || 126.9780;
                const ipCity = ipData.city || ipData.region || '내 주변';
                updateLocationState(`${ipCity} (내 위치)`, ipLat, ipLng);
                return;
              }
            }
          } catch (e) {
            console.warn('IP location fallback failed:', e);
          }

          setIsGpsSyncing(false);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    }
  };

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
      message: '내 주변에 "통돌이 세탁기 10kg + 쿠쿠 밥솥" 매물이 새로 등록되었습니다.',
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
      message: '오늘 19:00 "근처 편의점 앞" 직거래 약속 1시간 전입니다.',
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

  // 키워드 알림 상태 (인기 기본값 3개 제공)
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
      industrial_zone: 'all',
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

      // 접속 및 새로고침 시 1회 다채로운 카테고리 랜덤 셔플 적용 (밥솥/세탁기 몰림 방지)
      setItems(shuffleItems(INITIAL_ITEMS));
      
      // 최신 서버 매물이 있을 경우 랜덤 셔플하여 피드 신선도 유지
      fetch('/api/kmarket/items')
        .then((res) => res.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            setItems(shuffleItems(data.items));
          }
        })
        .catch((err) => console.warn('Items API fetch warning:', err));

      const savedLikes = localStorage.getItem('kmarket_liked_items');
      if (savedLikes) {
        setLikedItemIds(new Set(JSON.parse(savedLikes)));
      }

      // 과거 구버전 평택/포승 캐시 데이터 자동 삭제 및 실시간 현재 접속자 위치(남양주 등) 최우선 감지
      const savedUserLoc = localStorage.getItem('kmarket_user_location');
      if (savedUserLoc) {
        try {
          const parsed = JSON.parse(savedUserLoc);
          if (parsed && (parsed.locationName?.includes('평택') || parsed.locationName?.includes('포승'))) {
            localStorage.removeItem('kmarket_user_location');
            syncCurrentGpsLocation();
          } else if (parsed && parsed.locationName && parsed.radiusKm) {
            setUserLocationState(parsed);
            // 백그라운드에서 최신 GPS 위치 갱신
            syncCurrentGpsLocation();
          } else {
            syncCurrentGpsLocation();
          }
        } catch (e) {
          console.warn('Failed to parse saved user location', e);
          syncCurrentGpsLocation();
        }
      } else {
        // 저장된 위치가 없으면 실제 현재 접속자 GPS 위치(남양주 등)로 1초 자동 감지
        syncCurrentGpsLocation();
      }

      // URL 쿼리 파라미터 ?item= 확인하여 해당 매물 상세 모달 즉시 오픈
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const targetItemId = urlParams.get('item');
        if (targetItemId) {
          const matched = INITIAL_ITEMS.find((i: KMarketItem) => i.id === targetItemId);
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

        // 🔔 관심 키워드 매칭 시 실시간 17개국어 웹 푸시 알림 발송 (Service Worker)
        // 원문뿐만 아니라 Gemini가 번역한 17개국어 번역문(translations) 전체와 교차 비교하여
        // 외국인이 모국어로 키워드를 등록해도 한국어/타국어 매물 등록 시 100% 알림 발송
        keywordAlerts.forEach((kw) => {
          if (!kw.is_active) return;
          const kwLower = kw.keyword.toLowerCase().trim();
          if (!kwLower) return;

          // 1. 원문 제목/설명 매칭
          let isMatched =
            created.title.toLowerCase().includes(kwLower) ||
            created.description.toLowerCase().includes(kwLower);

          // 2. 17개국어 번역본 제목/설명 교차 매칭 (베트남어, 중국어, 태국어, 영어, 러시아어 등)
          if (!isMatched && created.translations) {
            const transValues = Object.values(created.translations) as Array<{ title?: string; description?: string }>;
            for (const t of transValues) {
              if (
                (t?.title && t.title.toLowerCase().includes(kwLower)) ||
                (t?.description && t.description.toLowerCase().includes(kwLower))
              ) {
                isMatched = true;
                break;
              }
            }
          }

          if (isMatched) {
            sendLocalizedPushNotification({
              type: 'keyword',
              lang: currentLang,
              params: {
                keyword: kw.keyword,
                itemTitle: created.translations?.[currentLang]?.title || created.title,
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
        KR: 'ko',  // 한국
        VN: 'vi',  // 베트남
        CN: 'zh',  // 중국
        TH: 'th',  // 태국
        US: 'en',  // 영어권(미국)
        GB: 'en',  // 영어권(영국)
        AU: 'en',  // 영어권(호주)
        UZ: 'uz',  // 우즈베키스탄
        RU: 'ru',  // 러시아
        JP: 'ja',  // 일본
        KH: 'km',  // 캄보디아
        MN: 'mn',  // 몽골
        NP: 'ne',  // 네팔
        ID: 'id',  // 인도네시아
        MM: 'my',  // 미얀마
        LK: 'si',  // 스리랑카
        KZ: 'kk',  // 카자흐스탄
        BD: 'bn',  // 방글라데시
        PK: 'ur',  // 파키스탄
        PH: 'tl',  // 필리핀 (en → tl 수정)
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

      // 3. 270개 전시용 시드 매물(item-real-*)에 대해서만 20개 사유 예약 안내 답장 (실제 고객 등록 매물은 AI 개입 전혀 없이 100% 순수 P2P 대화)
      const delayedReply = async () => {
        const targetItem = activeChat.item || items.find((it) => it.id === activeChat.item_id) || items[0];
        const isSeed270Item = Boolean(targetItem && (targetItem.id.startsWith('item-real-') || targetItem.id.startsWith('item-demo-')));
        
        if (!isSeed270Item) {
          // 🌟 실제 고객이 직접 올린 매물은 AI가 전혀 개입하지 않고 구매자-판매자간 순수 실시간 대화만 유지
          return;
        }

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
      };
      setTimeout(delayedReply, 1200);
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
        isShareModalOpen,
        setIsShareModalOpen,
        shareItem,
        openShareModal,
        closeShareModal,
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
        userLocation,
        setUserLocation,
        syncCurrentGpsLocation,
        isGpsSyncing,
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
