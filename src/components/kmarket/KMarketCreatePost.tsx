'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Camera,
  Sparkles,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { ItemCategory, IndustrialRegion } from '@/types/kmarket';
import { CATEGORIES_DATA } from '@/lib/languages';
import KMarketMapPicker from './KMarketMapPicker';

const SAMPLE_IMAGE_PRESETS = [
  'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80', // 밥솥
  'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80', // 세탁기
  'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop&q=80', // 냉장고
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80', // 전동킥보드
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80', // 스마트폰
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80', // 침대매트리스
];

export default function KMarketCreatePost() {
  const { isCreateModalOpen, setIsCreateModalOpen, addItem, isLoading } = useKMarket();
  const { t, currentLangOption, languages } = useLanguage();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('30000');
  const [originalPrice, setOriginalPrice] = useState<string>('150000');
  const [category, setCategory] = useState<ItemCategory>('appliances');
  const [regionDetail, setRegionDetail] = useState('안산시 단원구 원곡동 다문화거리 입구');
  const [lat, setLat] = useState<number>(37.3275);
  const [lng, setLng] = useState<number>(126.7924);
  const [address, setAddress] = useState<string>('경기 안산시 단원구 원곡동 795');
  const [isMovingSale, setIsMovingSale] = useState(false);
  const [movingDDay, setMovingDDay] = useState(5);
  const [images, setImages] = useState<string[]>([SAMPLE_IMAGE_PRESETS[0]]);
  const [sellerCountry, setSellerCountry] = useState(currentLangOption.countryCode || 'VN');
  const [sellerName, setSellerName] = useState('Nguyễn (외국인 회원)');

  if (!isCreateModalOpen) return null;

  const handleAddSampleImage = (imgUrl: string) => {
    if (images.length < 5 && !images.includes(imgUrl)) {
      setImages([...images, imgUrl]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('제목과 설명을 입력해 주세요.');
      return;
    }

    const matchedLang = languages.find((l) => l.countryCode === sellerCountry) || currentLangOption;

    await addItem({
      title,
      description,
      price: Number(price) || 0,
      original_price: isMovingSale && originalPrice ? Number(originalPrice) : undefined,
      category,
      industrial_zone: 'other',
      region: regionDetail,
      address: address || regionDetail,
      latitude: lat,
      longitude: lng,
      is_moving_sale: isMovingSale,
      moving_d_day: isMovingSale ? movingDDay : undefined,
      images: images.length > 0 ? images : [SAMPLE_IMAGE_PRESETS[0]],
      seller_country: sellerCountry,
      seller_country_flag: matchedLang.flag,
      seller_name: sellerName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* 모달 헤더 - 딥 네이비 & 2px 골드 테두리 */}
        <div 
          style={{ 
            background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
            borderBottom: '2px solid #f3ba2f' 
          }}
          className="p-5 text-white flex items-center justify-between shadow-md"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 bg-black/40 px-2.5 py-0.5 rounded-full text-xs font-bold text-[#f3ba2f] border border-[#f3ba2f]/40 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#f3ba2f]" />
              <span>{t('auto_ui_109')}</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              {t('create_modal_title')}
            </h2>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 폼 입력 영역 */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* 1. 사진 업로드 및 프리셋 */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-800">
              📷 상품 사진 ({images.length}/5장)
            </label>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                  <img src={img} alt="upload" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white p-1 rounded-full cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold text-center py-0.5">
                      대표사진
                    </span>
                  )}
                </div>
              ))}

              {images.length < 5 && (
                <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 shrink-0 cursor-pointer transition-colors">
                  <Camera className="w-5 h-5" />
                  <span className="text-[10px] mt-1 font-semibold">{t('auto_ui_110')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setImages([...images, event.target.result as string]);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* 빠른 샘플 사진 클릭 추가 */}
            <div className="pt-1">
              <span className="text-[11px] text-slate-500 block mb-1">
                💡 빠른 테스트용 추천 사진 클릭:
              </span>
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                {SAMPLE_IMAGE_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAddSampleImage(preset)}
                    className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 hover:border-blue-500 shrink-0 opacity-80 hover:opacity-100 cursor-pointer transition-all"
                  >
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. 귀국자 무빙세일 체크박스 */}
          <div className="p-3.5 bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMovingSale}
                  onChange={(e) => {
                    setIsMovingSale(e.target.checked);
                    if (e.target.checked) setCategory('moving_sale');
                  }}
                  className="w-4 h-4 text-orange-600 rounded-md focus:ring-orange-500 cursor-pointer"
                />
                <span className="font-extrabold text-orange-950 text-xs sm:text-sm flex items-center space-x-1">
                  <span>{t('auto_ui_111')}</span>
                </span>
              </label>
            </div>

            {isMovingSale && (
              <div className="space-y-2 pt-2 border-t border-amber-200/60">
                <div>
                  <span className="text-[11px] text-orange-900 font-bold block mb-1.5">
                    귀국 예정 D-Day 선택 (남은 기간에 따라 긴박감 뱃지 자동 부착)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { days: 3, label: '🚨 D-3 오늘마감', sub: '헐값 급처분' },
                      { days: 7, label: '🔥 D-7 초특가', sub: '일주일 임박' },
                      { days: 14, label: '⚡ D-14 묶음할인', sub: '2주 전 예약' },
                      { days: 30, label: '✈️ D-30 사전예약', sub: '1달 전 등록' },
                    ].map((opt) => (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => setMovingDDay(opt.days)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          movingDDay === opt.days
                            ? 'border-orange-500 bg-orange-500 text-white font-bold shadow-xs'
                            : 'border-orange-200 bg-white text-orange-950 hover:bg-orange-100/60'
                        }`}
                      >
                        <span className="block text-xs font-black">{opt.label}</span>
                        <span className="block text-[9px] opacity-80">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-orange-900 font-bold block mb-1">
                    원래 구입 가격 / 정가 (할인율 뱃지 표시용)
                  </span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder={t('auto_ui_112')}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-orange-300 text-xs font-bold text-orange-950 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. 매물 제목 및 카테고리 */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                매물 제목 (Item Title)
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('auto_ui_113')}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none text-xs sm:text-sm font-medium"
              />
            </div>

            {/* 3-1. 카테고리 원터치 선택 칩 그리드 */}
            <div>
              <label className="block font-bold text-slate-900 mb-2">
                🏷️ 카테고리 선택 (Category)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'appliances', label: '원룸 가전', icon: '🔌' },
                  { id: 'furniture', label: '가구·수납', icon: '🛏️' },
                  { id: 'digital', label: '스마트폰·IT', icon: '📱' },
                  { id: 'moving_sale', label: '무빙세일', icon: '✈️', badge: 'HOT' },
                  { id: 'free_give', label: '무료나눔', icon: '🎁', badge: '0원' },
                  { id: 'clothes', label: '의류·잡화', icon: '👕' },
                  { id: 'daily', label: '생활·주방', icon: '🍳' },
                  { id: 'vehicles', label: '자전거·탈것', icon: '🚲' },
                ].map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id as ItemCategory);
                        if (cat.id === 'moving_sale') {
                          setIsMovingSale(true);
                        }
                        if (cat.id === 'free_give') {
                          setPrice('0');
                        }
                      }}
                      className={`relative p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'text-white shadow-md scale-[1.02]'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                      style={isSelected ? {
                        background: 'linear-gradient(135deg, #162447 0%, #1e3a8a 100%)',
                        border: '2px solid #f3ba2f',
                        boxShadow: '0 3px 12px rgba(243, 186, 47, 0.25)',
                      } : undefined}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className={`text-xs ${isSelected ? 'font-black text-[#f3ba2f]' : 'font-medium'}`}>
                        {cat.label}
                      </span>
                      {cat.badge && (
                        <span className={`ml-auto text-[8px] font-black px-1.5 py-0.2 rounded-full ${
                          cat.badge === 'HOT' ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-2. 판매 가격 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-900">
                  💰 판매 가격 (0원 입력 시 무료나눔 자동 적용)
                </label>
                {price === '0' && (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    🎁 무료 나눔
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (e.target.value === '0') {
                      setCategory('free_give');
                    }
                  }}
                  placeholder={t('auto_ui_114')}
                  className="w-full pl-4 pr-12 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#f3ba2f] text-sm font-black text-[#1f1914] focus:outline-none"
                />
                <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">
                  원 (KRW)
                </span>
              </div>
            </div>
          </div>

          {/* 4. 당근마켓 스타일 직거래 지도 핀 & 상세 주소 글씨 입력기 */}
          <div className="pt-1">
            <KMarketMapPicker
              regionText={regionDetail}
              onChangeRegionText={(text) => setRegionDetail(text)}
              latitude={lat}
              longitude={lng}
              onChangeCoordinates={(newLat, newLng, newAddr) => {
                setLat(newLat);
                setLng(newLng);
                if (newAddr) setAddress(newAddr);
              }}
            />
          </div>

          {/* 5. 판매자 정보 및 국기 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                판매자 국가 (Country)
              </label>
              <select
                value={sellerCountry}
                onChange={(e) => setSellerCountry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.countryCode}>
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                판매자 닉네임
              </label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          {/* 6. 상세 설명 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-800">
                상세 설명 (Description)
              </label>
              <span className="text-[10px] text-blue-600 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>{t('auto_ui_115')}</span>
              </span>
            </div>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('auto_ui_116')}
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>

          {/* 등록 버튼 - 딥 네이비 & 2px 골드 테두리 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
                border: '2px solid #f3ba2f',
                boxShadow: '0 4px 16px rgba(243, 186, 47, 0.20)',
              }}
              className="w-full py-3.5 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 hover:brightness-110"
            >
              {isLoading ? (
                <span className="text-[#f3ba2f]">{t('auto_ui_117')}</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#f3ba2f]" />
                  <span className="text-[#f3ba2f]">{t('auto_ui_118')}</span>
                  <span className="text-white">{t('auto_ui_119')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
