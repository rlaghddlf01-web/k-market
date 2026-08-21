'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Camera,
  Sparkles,
  DollarSign,
  MapPin,
  Tag,
  Plane,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { ItemCategory, IndustrialRegion } from '@/types/kmarket';
import { REGIONS_DATA, CATEGORIES_DATA } from '@/lib/languages';

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
  const [industrialZone, setIndustrialZone] = useState<IndustrialRegion>('pyeongtaek');
  const [regionDetail, setRegionDetail] = useState('평택 포승공단 기숙사 2동 앞');
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
      industrial_zone: industrialZone,
      region: regionDetail,
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
        {/* 모달 헤더 */}
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-sky-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>수수료 0원 100% 무료 C2C</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">
              1분 간편 매물 등록
            </h2>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors cursor-pointer"
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
                  <span className="text-[10px] mt-1 font-semibold">+ 사진추가</span>
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
                  <span>✈️ 귀국자 헐값 급처분 [무빙 세일(Moving Sale)]로 등록하기</span>
                </span>
              </label>
            </div>

            {isMovingSale && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[11px] text-orange-800 font-semibold block mb-1">
                    귀국까지 남은 일수 (D-day)
                  </span>
                  <select
                    value={movingDDay}
                    onChange={(e) => setMovingDDay(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white rounded-xl border border-orange-300 text-xs font-bold text-orange-900"
                  >
                    <option value={1}>D-1 (내일 귀국 급처!)</option>
                    <option value={3}>D-3 (3일 후 귀국)</option>
                    <option value={5}>D-5 (5일 후 귀국)</option>
                    <option value={7}>D-7 (1주일 후 귀국)</option>
                  </select>
                </div>

                <div>
                  <span className="text-[11px] text-orange-800 font-semibold block mb-1">
                    원래 구입 가격 (정가)
                  </span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="예: 450000"
                    className="w-full px-2.5 py-1.5 bg-white rounded-xl border border-orange-300 text-xs font-bold text-orange-900"
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
                placeholder="예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 판매합니다"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none text-xs sm:text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  카테고리 (Category)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 text-xs font-medium"
                >
                  {CATEGORIES_DATA.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.nameKo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  판매 가격 (0원이면 무료나눔)
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0 (무료나눔)"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 text-xs font-bold text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* 4. 공단 직거래 지역 선택 */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-800">
              📍 공단 및 직거래 상세 위치
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={industrialZone}
                onChange={(e) => setIndustrialZone(e.target.value as IndustrialRegion)}
                className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
              >
                {REGIONS_DATA.filter((r) => r.id !== 'all').map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nameKo}
                  </option>
                ))}
              </select>

              <input
                type="text"
                required
                value={regionDetail}
                onChange={(e) => setRegionDetail(e.target.value)}
                placeholder="예: 포승공단 기숙사 앞 도보 5분"
                className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
              />
            </div>
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
                <span>등록 즉시 15개국어로 자동 번역됩니다</span>
              </span>
            </div>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="물건의 상태, 사용 기간, 직거래 가능한 시간대를 적어주세요. 모국어로 작성하셔도 구매자에게 자동 번역됩니다."
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>

          {/* 등록 버튼 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/25 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>매물 등록 중...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>1분 만에 무료 매물 등록 완료하기</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
