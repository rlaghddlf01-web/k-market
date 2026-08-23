/**
 * Haversine 공식 — 두 GPS 좌표 간 실제 지구 표면 거리(km) 계산
 * 지구 곡률을 반영한 정확한 거리 계산
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // km 단위 반환
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * radius_1 / radius_3 / radius_10 → 실제 km 숫자 반환
 */
export function radiusToKm(radiusId: string): number | null {
  switch (radiusId) {
    case 'radius_1': return 1;
    case 'radius_3': return 3;
    case 'radius_10': return 10;
    default: return null;
  }
}
