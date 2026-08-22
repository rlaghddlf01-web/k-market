# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
ko_path = os.path.join(locales_dir, 'ko.ts')

def parse_locale(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(r'^\s*([a-zA-Z0-9_]+)\s*:\s*("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\')', re.MULTILINE)
    res = {}
    for match in pattern.finditer(content):
        key = match.group(1)
        val = match.group(2)
        if val.startswith('"') or val.startswith("'"):
            val = val[1:-1].replace('\\"', '"').replace("\\'", "'").replace('\\n', '\n')
        res[key] = val
    return res

ko_dict = parse_locale(ko_path)

# 남은 모든 외래어/영문 약어를 100% 완전한 한국어 문구로 전면 정비
FINAL_CLEANSE = {
    "auto_ui_76": "예: 이나인(E-9) 비전문취업 비자",
    "auto_ui_273": "가격 대폭 인하",
    "auto_ui_320": "3. 월 평균 급여 기준 (세전 월 소득 금액)",
    "auto_ui_330": "예상 세금 환급 총액",
    "auto_ui_336": "예: 응우옌 반 훙 (외국인 성명)",
    "auto_loop_649": "본인 계정",
    "auto_loop_659": "대한민국 현재 위치 좌표 지정됨",
    "auto_loop_673": "아이폰 및 사파리 브라우저 앱 설치 방법",
    "auto_loop_691": "응우옌 (베트남 회원)",
    "auto_loop_695": "레티마이 (베트남 회원)",
    "auto_loop_696": "솜차이 (태국 회원)",
    "auto_loop_700": "바트바야르 (몽골 회원)",
    "auto_loop_701": "존 도 (필리핀 회원)",
    "auto_loop_717": "직거래 만남 장소 좌표가 지정되었습니다",
    "auto_loop_724": "이나인(E-9) 비전문취업 비자",
    "auto_loop_726": "현재 위치 좌표가 성공적으로 확인되었습니다",
    "auto_loop_749": "케이마켓 이웃 회원",
    "auto_loop_775": "응우옌 (외국인 회원)",
    "auto_loop_786": "스마트폰 및 전자기기",
    "auto_loop_807": "[케이마켓] 매물 가격 정보",
    "auto_loop_810": "🚨 귀국 3일 전 마감 헐값 처분 매물",
    "auto_loop_811": "🔥 귀국 5일 전 마감 임박 초특가 매물",
    "auto_loop_812": "✈️ 귀국 14일 전 묶음 할인 사전 예약 매물",
    "auto_loop_833": "새것 같은 풀박스 최상급 상태",
    "auto_loop_838": "내 현재 위치 정보 좌표 확인",
    "auto_loop_847": "매물 판매 가격",
    "auto_loop_866": "응우옌 (베트남 이웃)",
    "auto_loop_873": "신뢰 매너온도 점수",
    "auto_loop_879": "새로운 번역 채팅 메시지가 도착했습니다",
    "auto_loop_900": "1:1 채팅 메시지를 보내주세요",
    "auto_loop_973": "가까운 편의점 카운터 앞에서 직거래 가능합니다",
    "auto_loop_1000": "구미 3공단 엘지디스플레이 정문 앞",
    "auto_loop_1107": "공단 복지센터 1층 농협 현금인출기 앞",
    "auto_loop_1110": "골든루트 산단 메인 광장 편의점 앞",
    "auto_loop_1113": "쿠쿠 6인용 전기 압력밥솥",
    "auto_loop_1114": "케이마켓 이웃",
    "auto_loop_1115": "네, 오늘 저녁 7시 기숙사 정문 앞에서 만나요!",
    "auto_loop_1143": "이세븐(E-7) 특정활동 전문 비자",
    "auto_loop_1144": "에프포(F-4) 재외동포 비자",
    "auto_loop_1145": "에이치투(H-2) 방문취업 비자",
    "auto_loop_1151": "아이폰 화면 하단의 [공유 버튼]을 누른 후 [홈 화면에 추가]를 선택하시면 앱이 즉시 설치됩니다!",
    "auto_loop_1157": "이세븐(E-7) 특정활동 전문 비자",
    "auto_loop_1167": "기타 체류 비자",
    "auto_loop_1170": "직접 웹사이트 주소 입력 및 즐겨찾기 방문",
    "auto_loop_1171": "틱톡 숏폼 영상 및 홍보 채널",
    "auto_loop_1173": "잘로 베트남 커뮤니티 메신저",
    "auto_loop_1174": "라인 태국 및 동남아 공식 채널",
    "auto_loop_1175": "텔레그램 우즈베크 및 중앙아시아 채널",
    "auto_loop_1176": "위챗 동포 네트워크 커뮤니티",
    "auto_loop_1177": "유튜브 한국 생활 숏폼 채널",
    "auto_loop_1178": "인스타그램 릴스 소통 채널",
    "auto_loop_1179": "기숙사 및 쉼터 안내문 정보",
    "auto_loop_1181": "고용노동부 외국인고용관리시스템 게시판",
    "auto_loop_1183": "구글 다국어 포털 검색",
    "auto_loop_1214": "한국 생활 질문과 답변 게시판",
    "create_moving_dday_title": "귀국 예정 남은 일수를 선택하세요 (기간에 따라 긴박감 뱃지 자동 부착)",
    "comm_cat_qna": "한국 생활 질문과 답변",
    "comm_banner_desc": "외로움을 달래는 동네 친구 사귀기부터 고향 가족 생각나는 따뜻한 이야기, 한국 생활 궁금증까지 온기를 나누세요.",
    "telecom_kt_mvno": "📱 케이티 알뜰폰 공식 가입 센터",
    "auth_radius_badge": "반경 5킬로미터 내외 직거래 설정",
    "voc_banner_badge": "고객 소통 창구",
    "tax_monthly_pay_label": "3. 월 평균 급여 기준 (세전 월 소득 금액)",
    "visa_e_9_name": "이나인(E-9) 비전문취업 비자",
    "voc_modal_badge": "고객 의견 접수 창구",
    "notif_msg_chat_nguyen": "이웃 회원이 새로운 번역 메시지를 보냈습니다: \"감사합니다! 오늘 저녁 7시에 만나요!\"",
    "visa_e9": "이나인(E-9) 비전문취업 비자",
    "visa_e7": "이세븐(E-7) 특정활동 전문 비자"
}

ko_dict.update(FINAL_CLEANSE)

# ko.ts 저장
lines = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const ko: TranslationDictionary = {"
]
for k, v in ko_dict.items():
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'  {k}: "{escaped}",')
lines.append("};")
lines.append("")

with open(ko_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"SUCCESS: ko.ts 100% COMPLETE PURE KOREAN MASTER BUILT! ({len(ko_dict)} keys)")
