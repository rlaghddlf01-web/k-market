import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'KTRS K-Market (케이마켓) - 외국인 중고거래 & 무빙세일';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #09101f 0%, #1e1b4b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* 상단 뱃지 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(59, 130, 246, 0.2)',
            border: '2px solid rgba(96, 165, 250, 0.4)',
            padding: '10px 24px',
            borderRadius: '9999px',
            marginBottom: '28px',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa' }}>
            🌐 대한민국 No.1 외국인 안심 직거래 & 무빙세일
          </span>
        </div>

        {/* 메인 로고 & 타이틀 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)',
            }}
          >
            🛒
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              letterSpacing: '-2px',
              background: 'linear-gradient(90deg, #ffffff 0%, #93c5fd 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            K-Market
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#38bdf8',
              marginLeft: '-10px',
              marginTop: '20px',
            }}
          >
            (케이마켓)
          </div>
        </div>

        {/* 서브 카피 */}
        <div
          style={{
            fontSize: '28px',
            color: '#cbd5e1',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
            marginBottom: '40px',
          }}
        >
          17개국어 실시간 1:1 번역 채팅 · 전국 공단 안심 직거래 · 세금환급 원스톱 연계
        </div>

        {/* 하단 국가 깃발 및 특장점 뱃지 */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#facc15',
              border: '1px solid rgba(250, 204, 21, 0.3)',
            }}
          >
            ⚡ 수수료 0원 무료 등록
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#4ade80',
              border: '1px solid rgba(74, 222, 128, 0.3)',
            }}
          >
            🤝 100% 직거래 약속 리마인더
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            🇰🇷 🇻🇳 🇨🇳 🇹🇭 🇺🇸 🇺🇿 🇷🇺 🇯🇵 17개국 지원
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
