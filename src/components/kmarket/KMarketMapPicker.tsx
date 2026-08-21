'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation, ExternalLink, RefreshCw, Crosshair } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KMarketMapPickerProps {
  regionText: string;
  onChangeRegionText: (text: string) => void;
  latitude?: number;
  longitude?: number;
  onChangeCoordinates: (lat: number, lng: number, address?: string) => void;
}

export default function KMarketMapPicker({
  regionText,
  onChangeRegionText,
  latitude = 37.3275,
  longitude = 126.7924,
  onChangeCoordinates,
}: KMarketMapPickerProps) {
  const [currentLat, setCurrentLat] = useState(latitude);
  const [currentLng, setCurrentLng] = useState(longitude);
  const [baseAddress, setBaseAddress] = useState(regionText || '경기 안산시 단원구 원곡동 795');
  const [landmarkDetail, setLandmarkDetail] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // 최종 조합된 직거래 장소 텍스트 전달 함수
  const updateFullLocation = (baseAddr: string, detail: string) => {
    const trimmedBase = baseAddr.trim();
    const trimmedDetail = detail.trim();
    const fullText = trimmedDetail ? `${trimmedBase} (${trimmedDetail})` : trimmedBase;
    onChangeRegionText(fullText);
  };

  // 좌표를 기반으로 서버 API를 통해 실제 주소 가져오기
  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch('/api/kmarket/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.address) {
          setBaseAddress(data.address);
          updateFullLocation(data.address, landmarkDetail);
          onChangeCoordinates(lat, lng, data.address);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch address:', e);
    }
    const fallback = `위치 지정됨 (위도: ${lat.toFixed(4)}, 경도: ${lng.toFixed(4)})`;
    setBaseAddress(fallback);
    updateFullLocation(fallback, landmarkDetail);
    onChangeCoordinates(lat, lng, fallback);
  };

  // 1. 카카오맵 SDK 동적 로드 & 지도 초기화
  useEffect(() => {
    const KAKAO_KEY = '8e4337ba76935409cbca08d66e74b34b';
    const scriptId = 'kakao-map-sdk';

    const initMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapContainerRef.current) return;

      window.kakao.maps.load(() => {
        const container = mapContainerRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(currentLat, currentLng),
          level: 3, // 당근마켓 줌 레벨 (상세 골목/사거리 확인용)
        };

        const map = new window.kakao.maps.Map(container, options);
        kakaoMapRef.current = map;

        // 드래그 가능한 인터랙티브 핀(마커) 생성
        const markerPosition = new window.kakao.maps.LatLng(currentLat, currentLng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          draggable: true, // 사용자가 손으로 직접 핀을 잡고 끌 수 있음
        });
        marker.setMap(map);
        markerRef.current = marker;

        // 핀 드래그 종료 시 좌표 업데이트 및 주소 자동 변환
        window.kakao.maps.event.addListener(marker, 'dragend', () => {
          const latlng = marker.getPosition();
          const lat = latlng.getLat();
          const lng = latlng.getLng();
          setCurrentLat(lat);
          setCurrentLng(lng);
          fetchAddressFromCoords(lat, lng);
        });

        // 지도 아무 곳이나 클릭 시 해당 지점으로 핀 즉시 이동!
        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          const lat = latlng.getLat();
          const lng = latlng.getLng();
          marker.setPosition(latlng);
          setCurrentLat(lat);
          setCurrentLng(lng);
          fetchAddressFromCoords(lat, lng);
        });

        setIsMapLoaded(true);
      });
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, []);

  // 2. GPS 내 위치 버튼 클릭 시 지도 & 핀 이동
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보(GPS)를 지원하지 않는 브라우저입니다.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCurrentLat(lat);
        setCurrentLng(lng);

        if (kakaoMapRef.current && markerRef.current && window.kakao) {
          const newPos = new window.kakao.maps.LatLng(lat, lng);
          kakaoMapRef.current.setCenter(newPos);
          markerRef.current.setPosition(newPos);
        }

        await fetchAddressFromCoords(lat, lng);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        console.warn(err);
        alert('위치 권한을 허용해 주시거나 지도 위를 직접 클릭하여 핀을 이동해 주세요.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // 3. 주소 텍스트 검색 시 카카오 장소 검색으로 지도 이동
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!baseAddress.trim() || !window.kakao || !window.kakao.maps) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(baseAddress, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);
        const newPos = new window.kakao.maps.LatLng(lat, lng);

        setCurrentLat(lat);
        setCurrentLng(lng);
        kakaoMapRef.current?.setCenter(newPos);
        markerRef.current?.setPosition(newPos);

        const addr = result[0].road_address?.address_name || result[0].address?.address_name || baseAddress;
        setBaseAddress(addr);
        updateFullLocation(addr, landmarkDetail);
        onChangeCoordinates(lat, lng, addr);
      } else {
        // 키워드 장소 검색 시도
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(baseAddress, (data: any, pStatus: any) => {
          if (pStatus === window.kakao.maps.services.Status.OK && data.length > 0) {
            const lat = parseFloat(data[0].y);
            const lng = parseFloat(data[0].x);
            const newPos = new window.kakao.maps.LatLng(lat, lng);

            setCurrentLat(lat);
            setCurrentLng(lng);
            kakaoMapRef.current?.setCenter(newPos);
            markerRef.current?.setPosition(newPos);

            const addr = data[0].road_address_name || data[0].address_name || data[0].place_name;
            setBaseAddress(addr);
            updateFullLocation(addr, landmarkDetail);
            onChangeCoordinates(lat, lng, addr);
          } else {
            alert('해당 주소나 장소를 찾을 수 없습니다. 지도를 직접 클릭하여 핀을 이동해 주세요.');
          }
        });
      }
    });
  };

  return (
    <div className="space-y-3">
      {/* 1. 주소 및 만남 장소 입력 바 */}
      <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#845b37]" />
            <span>📍 직거래 주소 &amp; 만남 장소 (지도 핀 이동 가능)</span>
          </label>

          {/* GPS 내 위치 자동완성 버튼 */}
          <button
            type="button"
            onClick={handleGetGpsLocation}
            disabled={isLocating}
            className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4] shadow-2xs"
            title="현재 내 위치로 주소 & 핀 자동 세팅"
          >
            {isLocating ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-[#845b37]" />
                <span>위치 확인중...</span>
              </>
            ) : (
              <>
                <Crosshair className="w-3.5 h-3.5 text-[#845b37]" />
                <span>📍 내 위치로 핀 이동</span>
              </>
            )}
          </button>
        </div>

        {/* 1) 도로명 주소 검색창 */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={baseAddress}
              onChange={(e) => {
                setBaseAddress(e.target.value);
                updateFullLocation(e.target.value, landmarkDetail);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }
              }}
              placeholder="도로명/동네 주소 검색 또는 지도에서 핀을 직접 클릭하세요"
              className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs sm:text-sm font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] shadow-2xs"
            />
            <MapPin className="w-4 h-4 text-[#845b37] absolute left-3 top-3" />
          </div>

          <button
            type="button"
            onClick={handleSearchSubmit}
            className="px-3.5 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-bold text-xs rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1 border border-[#5c3818]"
          >
            <Search className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>주소 검색</span>
          </button>
        </div>

        {/* 2) 고객 직접 입력 상세 장소명 */}
        <div className="space-y-1 pt-2 border-t border-[#ded1c4]/70">
          <label className="text-xs font-black text-[#3d2817] flex items-center justify-between">
            <span>상세 만남 장소명 (고객 직접 입력)</span>
            <span className="text-[10px] text-[#845b37] font-bold">편의점 앞, 기숙사 정문, 3번 출구 등</span>
          </label>
          <input
            type="text"
            value={landmarkDetail}
            onChange={(e) => {
              setLandmarkDetail(e.target.value);
              updateFullLocation(baseAddress, e.target.value);
            }}
            placeholder="예: GS25 편의점 앞 / 기숙사 2동 경비실 앞 / 정문 시계탑"
            className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] shadow-2xs"
          />
        </div>
      </div>

      {/* 2. 실제 인터랙티브 지도 (클릭/드래그로 핀 직접 이동) */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1 text-[#3d2817] font-black">
            <Navigation className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>👇 지도를 클릭하거나 핀을 끌어당겨 원하는 만남 장소에 콕 찍으세요!</span>
          </span>
        </div>

        {/* 카카오맵 인터랙티브 지도 DOM 컨테이너 */}
        <div className="relative h-60 sm:h-72 w-full rounded-3xl overflow-hidden border-2 border-[#f3ba2f] shadow-md bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* 좌측 상단: 실시간 핀 주소 배지 */}
          <div className="absolute top-3 left-3 bg-[#09101f]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-[#f3ba2f]/70 text-xs shadow-lg max-w-[85%] pointer-events-none z-10">
            <div className="flex items-center gap-1 font-bold text-[#f3ba2f]">
              <MapPin className="w-3.5 h-3.5 fill-[#f3ba2f]" />
              <span>선택된 직거래 핀 위치</span>
            </div>
            <p className="text-[11px] text-slate-100 font-medium truncate mt-0.5">
              {landmarkDetail ? `${baseAddress} (${landmarkDetail})` : baseAddress}
            </p>
          </div>

          {/* 우측 하단 안내 툴팁 */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#3d2817] px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md border border-[#ded1c4] pointer-events-none z-10">
            🖱️ 지도 클릭 / 핀 드래그로 이동
          </div>
        </div>
      </div>
    </div>
  );
}
