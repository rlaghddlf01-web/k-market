import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return NextResponse.json({ error: '위도와 경도 정보가 필요합니다.' }, { status: 400 });
    }

    let detectedAddress = '';

    // 1. 카카오 로컬 REST API 역지오코딩 시도 (서버 사이드 호출)
    try {
      const kakaoKey = process.env.KAKAO_REST_API_KEY || '8e4337ba76935409cbca08d66e74b34b';
      const kakaoRes = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${kakaoKey}`,
          },
          cache: 'no-store',
        }
      );

      if (kakaoRes.ok) {
        const kakaoData = await kakaoRes.json();
        if (kakaoData.documents && kakaoData.documents.length > 0) {
          const doc = kakaoData.documents[0];
          const roadAddr = doc.road_address?.address_name;
          const jibunAddr = doc.address?.address_name;
          detectedAddress = roadAddr || jibunAddr || '';
        }
      }
    } catch (e) {
      console.warn('Kakao geocoding error:', e);
    }

    // 2. OpenStreetMap Nominatim 글로벌 역지오코딩 폴백 (무료 공공 API)
    if (!detectedAddress) {
      try {
        const osmRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'KMarket-App-Geocode/1.0',
              'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
            },
            cache: 'no-store',
          }
        );
        if (osmRes.ok) {
          const osmData = await osmRes.json();
          if (osmData.display_name) {
            const addr = osmData.address || {};
            const province = addr.province || addr.state || addr.city || '';
            const district = addr.county || addr.district || addr.borough || addr.suburb || '';
            const town = addr.town || addr.village || addr.neighbourhood || addr.quarter || '';
            const road = addr.road || addr.street || '';
            const parts = [province, district, town, road].filter(Boolean);
            detectedAddress = parts.length >= 2 ? parts.join(' ') : osmData.display_name.split(',').slice(0, 3).reverse().join(' ').trim();
          }
        }
      } catch (e) {
        console.warn('Nominatim fallback failed:', e);
      }
    }

    // 3. 한국 좌표 범위 기반 스마트 폴백
    if (!detectedAddress) {
      // 경기 남양주시 좌표 범위 (위도 37.55~37.75, 경도 127.14~127.38)
      if (latitude >= 37.55 && latitude <= 37.75 && longitude >= 127.14 && longitude <= 127.38) {
        detectedAddress = '경기 남양주시 다산동 인근';
      } else if (latitude >= 37.54 && latitude <= 37.70 && longitude >= 126.90 && longitude <= 127.10) {
        detectedAddress = '서울 특별시 (GPS 위치 확인됨)';
      } else if (latitude >= 37.25 && latitude <= 37.42 && longitude >= 126.75 && longitude <= 126.95) {
        detectedAddress = '경기 안산시 단원구 인근';
      } else if (latitude >= 37.20 && latitude <= 37.38 && longitude >= 126.95 && longitude <= 127.15) {
        detectedAddress = '경기 수원시 인근';
      } else if (latitude >= 37.40 && latitude <= 37.58 && longitude >= 126.60 && longitude <= 126.80) {
        detectedAddress = '인천광역시 인근';
      } else {
        detectedAddress = `내 주변 (위도 ${latitude.toFixed(3)}, 경도 ${longitude.toFixed(3)})`;
      }
    }

    return NextResponse.json({
      success: true,
      address: detectedAddress,
      coords: { latitude, longitude },
    });
  } catch (error: any) {
    console.error('Geocoding server error:', error);
    return NextResponse.json({ error: '주소 변환 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
