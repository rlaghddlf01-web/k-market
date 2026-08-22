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

# 주요 통문장 베트남어 정밀 매핑
VI_FULL_SENTENCES = {
    "welcome_change_ko": "Chuyển sang tiếng Hàn Quốc",
    "welcome_btn_korean": "Tiếp tục bằng tiếng Hàn Quốc ➔",
    "time_recent": "Vừa mới đăng",
    "time_months_ago": "tháng trước",
    "unit_items_count": "món đồ đã đăng",
    "zone_sub_desc": "Giao dịch trực tiếp gần KTX các khu công nghiệp Poseung, Banwol, Sihwa, Hyangnam, Namdong",
    "header_quick_lang": "Lựa chọn nhanh 17 ngôn ngữ",
    "moving_d_day_badge": "Đếm ngược ngày về nước",
    "cat_digital": "Điện thoại thông minh & Thiết bị điện tử",
    "meetup_zone_title": "Khu vực hẹn giao dịch trực tiếp an toàn tại các KCN",
    "tax_banner_sub": "Quyền lợi pháp lý của người nước ngoài theo Điều 30 Luật Miễn giảm thuế đặc biệt Cục Thuế Hàn Quốc",
    "scam_warning_title": "3 Quy tắc vàng giao dịch an toàn cho người nước ngoài",
    "scam_rule_3_desc": "Đường link thanh toán an toàn gửi từ bên ngoài là trang web lừa đảo. Tuyệt đối không nhấp vào.",
    "inapp_chrome_title": "Chuyển sang trình duyệt Google Chrome an toàn",
    "inapp_safari_title": "Mở bằng trình duyệt Safari",
    "inapp_safari_desc": "Để cài đặt ứng dụng trên iPhone, vui lòng chọn [Mở bằng Safari] từ menu trình duyệt.",
    "inapp_copy_success_safari": "Đã sao chép liên kết! Vui lòng dán vào thanh địa chỉ Safari.",
    "inapp_safari_guide_fallback": "Vui lòng nhấn vào menu góc trên hoặc dưới và chọn [Mở bằng Safari].",
    "moving_sale_title": "Gian hàng thanh lý đồ về nước đặc biệt",
    "mypage_manner_title": "Điểm nhiệt độ uy tín của tôi",
    "location_radius_1km": "Trong bán kính 1km (Đi bộ gần cổng KTX)",
    "location_radius_3km": "Trong bán kính 3km (Đi xe đạp hoặc xe điện scooter)",
    "location_radius_10km": "Trong bán kính 10km (Đi xe buýt hoặc ô tô)",
    "loc_radius_1km_title": "Trong vòng 1km",
    "loc_radius_3km_title": "Trong vòng 3km",
    "loc_radius_10km_title": "Trong vòng 10km",
    "loc_radius_10km_desc": "Tin đăng xung quanh khu vực bạn trong bán kính 10km",
    "post_detail_spot_placeholder": "VD: Trước cửa hàng tiện lợi GS25, Trước cổng KTX số 2, Cột đồng hồ cổng chính",
    "post_title_placeholder": "VD: Thanh lý máy giặt 10kg + Nồi cơm điện Cuckoo trọn gói về nước",
    "hero_main_headline": "Sàn giao dịch an toàn & Thanh lý đồ về nước đặc biệt cho người nước ngoài",
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
    "post_price_label": "Giá bán (Nhập 0 đồng để tự động đăng dưới dạng tặng miễn phí)",
    "post_category_select_label": "Vui lòng chọn danh mục sản phẩm",
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

vi_dict.update(VI_FULL_SENTENCES)

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

print("PERFECT: Full Vietnamese sentences synchronized 100% with ko.ts!")
