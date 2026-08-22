# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
ko_path = os.path.join(locales_dir, 'ko.ts')
vi_path = os.path.join(locales_dir, 'vi.ts')

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
vi_dict = parse_locale(vi_path)

# 조각난 문구를 완벽한 "통째 완성 문구"로 전면 교정 매핑
FULL_SENTENCE_MASTER = {
    "safety_rule_1_desc": "\"물건을 맡아둘 테니 1만원만 먼저 보내라\", \"택배비 먼저 입금해라\" 등은 대표적인 사기 수법입니다. 반드시 직접 만나 물건을 꼼꼼히 확인한 후 대금을 지급하세요.",
    "safety_rule_1_desc_tail": "반드시 직접 만나 물건을 꼼꼼히 확인한 후 대금을 지급하세요.",
    "safety_rule_2_desc": "외부 메신저로 대화할 경우 사기 피해 발생 시 증거 확보 및 구제가 어렵습니다. 반드시 K-Market의 안심 자동 번역 채팅방 안에서만 안전하게 거래를 진행하세요.",
    "safety_rule_2_desc_tail": "반드시 K-Market의 안심 자동 번역 채팅방 안에서만 안전하게 거래를 진행하세요.",
    "safety_rule_3_desc": "인적이 드문 골목보다 GS25 편의점 앞, 밝은 지하철 출구 등 안전한 랜드마크 지도 핀을 만남 장소로 잡으세요.",
    "safety_rule_3_desc_tail": "GS25 편의점 앞, 밝은 지하철 출구 등 안전한 랜드마크 지도 핀을 만남 장소로 잡으세요.",
    "hero_main_headline": "외국인 안심 직거래 & 귀국 무빙세일 특가전",
    "hero_title_1": "외국인 안심 직거래 &",
    "hero_title_moving": "귀국 무빙세일 특가전",
    "hero_title_collection": "특가전",
    "hero_top_badge": "대한민국 No.1 외국인 근로자 안심 직거래 마켓",
    "hero_desc_1": "17개국어 실시간 Gemini 양방향 안심 번역 채팅을 지원합니다.",
    "hero_desc_2": "공단 기숙사 정문 앞 1분 거리에서 신원 인증을 거친 안전한 직거래 플랫폼입니다.",
    "hero_post_btn": "1분 만에 내 물건 무료로 등록하기",
    "hero_tax_btn": "평균 184만 원 예상 세금 환급액 계산기",
    "hero_bundle_discount": "75% 파격 할인 혜택",
    "hero_bundle_tag": "풀패키지 가전·가구 묶음 할인",
    "hero_bundle_title": "냉장고·세탁기·밥솥 가전 가구 풀세트 급처분 매물",
    "hero_bundle_action": "묶음 특가로 처분하기",
    "pwa_banner_title": "K-Market 앱을 1초 만에 설치하세요",
    "pwa_banner_desc": "스마트폰 홈 화면에 추가하고 실시간 번역 채팅과 거래 알림을 받아보세요.",
    "pwa_banner_install_btn": "홈 화면에 앱 설치하기",
    "tax_modal_headline": "나의 잠재 세금 환급액을 10초 만에 확인하세요",
    "tax_modal_link_badge": "KTRS x EasyTax 국세청 실시간 원스톱 연계",
    "tax_modal_manner_title": "K-Trust 신뢰 매너온도 안내",
    "tax_modal_manner_what_is": "K-Trust 매너온도란 무엇인가요?",
    "tax_modal_ocr_verified_badge": "법무부 외국인등록증 OCR 본인인증 완료 (+7.0℃ 보너스 점수 반영)",
    "tax_modal_top_12_badge": "신뢰도 상위 12% 최우수 안심 회원 뱃지",
    "tax_modal_ai_amount_title": "AI가 분석한 예상 세금 환급 가능 금액",
    "tax_modal_salary_value": "월 평균 250만 원",
    "tax_modal_avg_salary": "평균 월 급여 기준 (세전 소득)",
    "tax_modal_period_value": "36개월 (3.0년 근무)",
    "tax_modal_work_period": "최근 5년간 대한민국 내 근무 기간",
    "tax_modal_age_value": "만 15세 ~ 34세 이하",
    "tax_modal_age_guide": "세금 감면 혜택 대상 연령 안내",
    "tax_modal_zero_prepay": "선결제 비용 0원 (초기 수수료 없음)",
    "tax_modal_success_pay": "100% 세금 환급 성공 시에만 후불 정산",
    "tax_modal_apply_now_btn": "KTRS에서 지금 바로 세금 환급 신청하기 ➔",
    "post_submit_complete_btn": "1분 만에 매물 등록 완료하기",
    "post_meetup_location_label": "직거래 만남 장소 (지도의 핀을 이동하여 지정하세요)",
    "post_detail_spot_label": "상세한 만남 장소명 (직접 입력해 주세요)",
    "post_detail_spot_placeholder": "예: GS25 편의점 앞, 기숙사 2동 경비실 앞, 정문 시계탑",
    "post_price_label": "판매 가격 (0원을 입력하시면 무료나눔으로 자동 등록됩니다)",
    "post_category_select_label": "상품 카테고리를 선택해 주세요",
    "post_title_placeholder": "예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 귀국 세일합니다",
    "post_item_title_label": "등록할 매물 제목을 입력하세요",
    "post_moving_sale_check": "귀국자 헐값 급처분 [무빙 세일(Moving Sale)] 코너로 등록하기",
    "post_add_photo_btn": "+ 상품 사진 추가하기 (최대 5장)",
    "post_cover_badge": "대표 대표사진",
    "post_photos_label": "상품 실물 사진 (최대 5장까지 등록 가능)",
    "post_zero_fee_badge": "수수료 0원 100% 무료 외국인 개인 직거래",
    "auth_btn_next_sms": "휴대폰 SMS 인증번호 전송받기 ➔",
    "auth_gps_btn": "📍 내 위치 정보에 동의하고 주소 1초 자동 입력하기",
    "auth_dorm_label": "실제 거주 중인 기숙사 / 공단 도로명 주소",
    "auth_phone_number_label": "본인 명의의 휴대폰 번호 입력",
    "auth_stay_expiry": "체류 기간 만료일 (Expiry Date)",
    "auth_visa_type": "보유 중인 비자 종류 (Visa Status)",
    "auth_arc_number": "외국인등록번호 13자리 입력",
    "auth_passport_name": "여권상 영문 실명 (Passport Name)",
    "auth_nickname_placeholder": "예: 안산호랑이, 베트남마켓, 평택친구 (2~15자)",
    "auth_sms_step_title": "휴대폰으로 전송된 SMS 인증번호 6자리 입력",
    "auth_sms_step_desc": "고객님의 휴대폰으로 발송된 6자리 인증번호를 정확하게 입력해 주세요.",
    "auth_sms_confirm_btn": "SMS 본인인증 완료하고 계속 진행하기",
    "auth_complete_badge": "외국인 신원인증 완료 안심 뱃지",
    "auth_welcome_suffix": "님, K-Market에 오신 것을 진심으로 환영합니다!",
    "auth_complete_ocr_desc": "외국인등록증 OCR 인증이 성공적으로 완료되어 매너온도 43.5℃(골드 등급)가 부여되었습니다.",
    "auth_complete_manual_desc": "기본 회원가입이 완료되었습니다. 외국인등록증을 추가 인증하시면 매너온도 43.5℃ 혜택을 받으실 수 있습니다.",
    "auth_tax_bonus_notice": "KTRS 연계 외국인 세금 환급 조회 시 평균 184만 원 혜택이 함께 제공됩니다.",
    "auth_start_trading_btn": "안심 직거래 서비스 시작하기 →"
}

FULL_SENTENCE_VI = {
    "safety_rule_1_desc": "\"Chuyển trước 10.000w để giữ đồ\", \"Chuyển trước tiền ship\" là các thủ đoạn lừa đảo phổ biến. Tuyệt đối chỉ thanh toán sau khi gặp mặt trực tiếp kiểm tra đồ cẩn thận.",
    "safety_rule_1_desc_tail": "Tuyệt đối chỉ thanh toán sau khi gặp mặt trực tiếp kiểm tra đồ cẩn thận.",
    "safety_rule_2_desc": "Nói chuyện qua Zalo/Kakao ngoài sẽ không có bằng chứng bảo vệ khi bị lừa đảo. Hãy luôn giao dịch an toàn bên trong phòng chat dịch tự động của K-Market.",
    "safety_rule_2_desc_tail": "Hãy luôn giao dịch an toàn bên trong phòng chat dịch tự động của K-Market.",
    "safety_rule_3_desc": "Thay vì ngõ vắng, hãy chọn các điểm hẹn an toàn như trước cửa hàng tiện lợi GS25, cửa ga tàu điện ngầm sáng sủa trên bản đồ.",
    "safety_rule_3_desc_tail": "Chọn điểm hẹn an toàn như trước cửa hàng tiện lợi GS25, cửa ga tàu điện ngầm sáng sủa trên bản đồ.",
    "hero_main_headline": "Sàn giao dịch an toàn & Thanh lý đồ về nước đặc biệt cho người nước ngoài",
    "hero_title_1": "Giao dịch an toàn cho người nước ngoài &",
    "hero_title_moving": "Thanh lý đồ về nước đặc biệt",
    "hero_title_collection": "Khu vực ưu đãi",
    "hero_top_badge": "Nền tảng giao dịch trực tiếp an toàn số 1 Hàn Quốc cho lao động nước ngoài",
    "hero_desc_1": "Hỗ trợ chat dịch tự động 2 chiều 17 ngôn ngữ với Gemini AI thời gian thực.",
    "hero_desc_2": "Nền tảng giao dịch trực tiếp xác minh danh tính an toàn, đi bộ 1 phút ngay cổng KTX khu công nghiệp.",
    "hero_post_btn": "Đăng bán đồ miễn phí trong 1 phút",
    "hero_tax_btn": "Công cụ tính tiền hoàn thuế ước tính bình quân 1.84 triệu won",
    "hero_bundle_discount": "Ưu đãi giảm giá sốc 75%",
    "hero_bundle_tag": "Thanh lý trọn bộ gói đồ gia dụng",
    "hero_bundle_title": "Tủ lạnh · Máy giặt · Nồi cơm điện đồ gia dụng trọn gói thanh lý gấp",
    "hero_bundle_action": "Thanh lý trọn bộ giá rẻ",
    "pwa_banner_title": "Cài đặt ứng dụng K-Market trong 1 giây",
    "pwa_banner_desc": "Thêm vào màn hình chính điện thoại để nhận tin nhắn dịch và thông báo giao dịch tức thì.",
    "pwa_banner_install_btn": "Cài đặt ứng dụng vào màn hình chính",
    "tax_modal_headline": "Kiểm tra số tiền hoàn thuế tiềm năng của bạn trong 10 giây",
    "tax_modal_link_badge": "Liên kết trực tiếp 1 chạm KTRS x EasyTax Cục Thuế Hàn Quốc",
    "tax_modal_manner_title": "Hướng dẫn điểm nhiệt độ uy tín K-Trust",
    "tax_modal_manner_what_is": "Điểm nhiệt độ uy tín K-Trust là gì?",
    "tax_modal_ocr_verified_badge": "Đã xác minh thẻ ARC qua OCR Bộ Tư pháp (+7.0℃ điểm thưởng uy tín)",
    "tax_modal_top_12_badge": "Huy hiệu thành viên xuất sắc top 12% uy tín nhất",
    "tax_modal_ai_amount_title": "Số tiền hoàn thuế tiềm năng do AI ước tính",
    "tax_modal_salary_value": "Bình quân 2.50 triệu won/tháng",
    "tax_modal_avg_salary": "Mức lương bình quân hàng tháng (Thu nhập trước thuế)",
    "tax_modal_period_value": "36 tháng (Làm việc 3.0 năm)",
    "tax_modal_work_period": "Thời gian làm việc tại Hàn Quốc trong 5 năm gần nhất",
    "tax_modal_age_value": "Từ 15 tuổi đến 34 tuổi",
    "tax_modal_age_guide": "Độ tuổi đủ điều kiện hưởng chính sách giảm thuế",
    "tax_modal_zero_prepay": "Chi phí trả trước 0 đồng (Không thu phí ban đầu)",
    "tax_modal_success_pay": "100% chỉ thanh toán phí sau khi nhận tiền hoàn thuế thành công",
    "tax_modal_apply_now_btn": "Đăng ký nhận tiền hoàn thuế ngay qua KTRS ➔",
    "post_submit_complete_btn": "Hoàn tất đăng tin bán trong 1 phút",
    "post_meetup_location_label": "Địa điểm hẹn gặp giao dịch trực tiếp (Kéo ghim trên bản đồ để chọn)",
    "post_detail_spot_label": "Tên địa điểm hẹn chi tiết (Vui lòng tự nhập trực tiếp)",
    "post_detail_spot_placeholder": "VD: Trước cửa GS25, Trước cổng KTX số 2, Cổng chính KCN",
    "post_price_label": "Giá bán (Nhập 0 đồng để tự động đăng dưới dạng tặng miễn phí)",
    "post_category_select_label": "Vui lòng chọn danh mục sản phẩm",
    "post_title_placeholder": "VD: Thanh lý máy giặt 10kg + Nồi cơm điện Cuckoo trọn gói về nước",
    "post_item_title_label": "Nhập tiêu đề món đồ cần đăng bán",
    "post_moving_sale_check": "Đăng bán vào chuyên mục [Thanh lý về nước (Moving Sale)] giá rẻ",
    "post_add_photo_btn": "+ Thêm ảnh sản phẩm (Tối đa 5 ảnh)",
    "post_cover_badge": "Ảnh đại diện chính",
    "post_photos_label": "Ảnh chụp thực tế món đồ (Có thể đăng tối đa 5 ảnh)",
    "post_zero_fee_badge": "Phí 0 đồng 100% miễn phí giao dịch trực tiếp giữa các cá nhân",
    "auth_btn_next_sms": "Nhận mã xác thực OTP qua tin nhắn SMS ➔",
    "auth_gps_btn": "📍 Đồng ý vị trí và tự động điền địa chỉ trong 1 giây",
    "auth_dorm_label": "Địa chỉ KTX / Khu công nghiệp đang cư trú thực tế",
    "auth_phone_number_label": "Nhập số điện thoại di động chính chủ của bạn",
    "auth_stay_expiry": "Ngày hết hạn thời gian lưu trú (Expiry Date)",
    "auth_visa_type": "Loại visa đang sở hữu (Visa Status)",
    "auth_arc_number": "Nhập 13 chữ số trên thẻ người nước ngoài ARC",
    "auth_passport_name": "Họ và tên tiếng Anh theo hộ chiếu (Passport Name)",
    "auth_nickname_placeholder": "VD: HoangViet, ChoVietHan, PoseungFriend (2-15 ký tự)",
    "auth_sms_step_title": "Nhập mã xác thực 6 chữ số gửi về điện thoại",
    "auth_sms_step_desc": "Vui lòng nhập chính xác mã xác thực 6 chữ số vừa được gửi tới số điện thoại của bạn.",
    "auth_sms_confirm_btn": "Hoàn tất xác thực SMS và tiếp tục",
    "auth_complete_badge": "Huy hiệu an tâm đã xác thực danh tính người nước ngoài",
    "auth_welcome_suffix": ", chào mừng bạn đến với sàn giao dịch K-Market!",
    "auth_complete_ocr_desc": "Xác thực thẻ ARC thành công, bạn được cộng +7.0℃ điểm uy tín (Hạng Vàng xuất sắc).",
    "auth_complete_manual_desc": "Đăng ký thành viên cơ bản hoàn tất. Hãy xác thực thêm thẻ ARC để nhận điểm 43.5℃.",
    "auth_tax_bonus_notice": "Tra cứu hoàn thuế KTRS nhận quyền lợi ước tính bình quân 1.84 triệu won.",
    "auth_start_trading_btn": "Bắt đầu sử dụng dịch vụ giao dịch an toàn ngay →"
}

ko_dict.update(FULL_SENTENCE_MASTER)
vi_dict.update(FULL_SENTENCE_VI)

# ko.ts 저장
lines_ko = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const ko: TranslationDictionary = {"
]
for k, v in ko_dict.items():
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines_ko.append(f'  {k}: "{escaped}",')
lines_ko.append("};")
lines_ko.append("")
with open(ko_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_ko))

# vi.ts 저장
lines_vi = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const vi: TranslationDictionary = {"
]
for k in ko_dict.keys():
    v = vi_dict.get(k, "Nội dung giao dịch K-Market")
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines_vi.append(f'  {k}: "{escaped}",')
lines_vi.append("};")
lines_vi.append("")
with open(vi_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_vi))

print("SUCCESS: 100% Full-Sentence Master Keys Written to ko.ts and vi.ts!")
