import { AppointmentData } from '@/types/kmarket';

/**
 * 직거래 약속 정보를 기반으로 구글 캘린더(Google Calendar) 자동 일정 등록 URL 생성
 */
export function createGoogleCalendarUrl(
  appointment: AppointmentData,
  itemTitle: string = 'K-Market 중고 물품'
): string {
  const title = `[K-Market 직거래] 🛒 ${itemTitle}`;
  const location = `${appointment.place_name || ''} (${appointment.address || ''})`.trim();
  const details = `[K-Market 외국인 안심 직거래 약속]\n\n📦 물품: ${itemTitle}\n📍 만남 장소: ${location}\n⏰ 약속 시간: ${appointment.meet_time}\n\n💡 약속 시간 10분 전에 도착하시면 더욱 매너 있는 거래가 됩니다!`;

  // ISO 날짜 파싱 (기본 오늘 기준 1시간 일정)
  const now = new Date();
  const startTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2시간 뒤 기본
  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30분 단위

  const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
  const dates = `${formatDate(startTime)}/${formatDate(endTime)}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    location: location,
    dates: dates,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
