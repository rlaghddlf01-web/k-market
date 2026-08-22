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

# 홈 화면 전수 1:1 베트남어 통문장 매핑
HOMEPAGE_VI_EXACT = {
    # 1. 최상단 KTRS 슈퍼앱 바 & 헤더
    "kmarket_top_bar_title": "Nền tảng tổng hợp số 1 Hàn Quốc cho lao động nước ngoài",
    "kmarket_top_bar_fee": "Phí 0 đồng 100% giao dịch trực tiếp miễn phí",
    "header_pwa_install_btn": "Cài App trong 1 giây",
    "app_title": "K-Market",
    "app_badge_free": "Phí 0 đồng miễn phí",
    "app_subtitle": "Sàn giao dịch an tâm 17 ngôn ngữ cho lao động nước ngoài",
    "header_search_placeholder": "Tìm từ khóa, đồ gia dụng, thanh lý về nước...",
    "header_post_item_btn": "Đăng tin bán trong 1 phút",
    "nav_signup": "Đăng ký nhanh",
    "nav_mypage": "Trang cá nhân",

    # 2. 메인 탭
    "tab_market": "K-Market (Đồ cũ / Về nước)",
    "tab_community": "Đời sống & KTX cộng đồng",
    "tab_tax": "Hoàn thuế (Bình quân 1.84tr won)",

    # 3. 히어로 쇼케이스
    "hero_top_badge": "Nền tảng giao dịch trực tiếp an toàn số 1 Hàn Quốc cho lao động nước ngoài",
    "hero_main_headline": "Sàn giao dịch an toàn & Thanh lý đồ về nước đặc biệt cho người nước ngoài",
    "hero_desc_1": "Hỗ trợ chat dịch tự động 2 chiều 17 ngôn ngữ với Gemini AI thời gian thực.",
    "hero_desc_2": "Nền tảng giao dịch trực tiếp xác minh danh tính an toàn, đi bộ 1 phút ngay cổng KTX khu công nghiệp.",
    "hero_post_btn": "Đăng bán đồ miễn phí trong 1 phút",
    "hero_tax_btn": "Công cụ tính hoàn thuế bình quân 1.84 triệu won",

    # 4. 히어로 묶음 패키지 쇼케이스
    "auto_ui_148": "Bộ sưu tập trọn gói đồ gia dụng & nội thất",
    "hero_moving_tag_top": "Lao động về nước",
    "hero_moving_tag_main": "Thanh lý về nước",
    "hero_bundle_discount": "Ưu đãi giảm giá 75%",
    "hero_bundle_tag": "Thanh lý trọn bộ gói đồ",
    "hero_bundle_title": "Tủ lạnh · Máy giặt · Nồi cơm điện đồ gia dụng trọn gói thanh lý gấp",
    "hero_bundle_action": "Thanh lý trọn bộ giá rẻ",

    # 5. 4대 안심 보증 띠 바 (온전한 베트남어 통문장)
    "trust_bar_fee": "Phí 0 đồng 100% giao dịch trực tiếp an toàn miễn phí",
    "trust_bar_ai": "Hỗ trợ dịch AI 2 chiều 17 ngôn ngữ thời gian thực",
    "trust_bar_tax": "Liên kết quyền lợi hoàn thuế bình quân 1.84 triệu won",
    "trust_bar_moving": "Ưu đãi đặc biệt trọn gói đồ thanh lý về nước",

    # 6. 세금 환급 와이드 배너
    "tax_banner_img_alt": "Tư vấn hoàn thuế chuyên sâu cho lao động nước ngoài",
    "tax_banner_sub": "Quyền lợi pháp lý của người nước ngoài theo Điều 30 Luật Miễn giảm thuế đặc biệt Cục Thuế Hàn Quốc",
    "tax_banner_headline_1": "Quyền lợi hoàn thuế dễ bị bỏ quên,",
    "tax_banner_headline_2": "Lao động nước ngoài cũng được nhận",
    "tax_banner_headline_amount": "[Bình quân 1.84 triệu won]",
    "tax_banner_headline_tail": "Tra cứu miễn phí trong 30 giây",
    "tax_banner_feature_1": "Thời gian chỉ mất 30 giây",
    "tax_banner_feature_2": "Nhận bình quân 1.84 triệu won",
    "tax_banner_feature_3": "Chi phí trả trước 0 đồng (100% phí sau)",
    "tax_banner_btn": "Tra cứu tiền hoàn thuế miễn phí trong 30 giây",

    # 7. 안심 거래 쉴드 바
    "scam_bar_badge": "Khiên bảo vệ giao dịch an toàn",
    "scam_bar_desc": "Yêu cầu chuyển cọc trước 99% là lừa đảo! Tuyệt đối chỉ thanh toán sau khi kiểm tra đồ trực tiếp.",
    "auto_ui_251": "Xem 3 quy tắc an toàn",

    # 8. 카테고리
    "cat_section_title": "Tìm đồ theo danh mục",
    "cat_all": "Xem tất cả tin đăng",
    "cat_appliances": "Đồ gia dụng phòng trọ",
    "cat_furniture": "Đồ nội thất sinh hoạt",
    "cat_digital": "Điện thoại & Đồ điện tử",
    "cat_moving_bundle": "Gói đồ thanh lý về nước",
    "cat_free_share": "0 đồng Tặng miễn phí",
    "cat_clothing": "Quần áo & Phụ kiện",
    "cat_work_supplies": "Đồ bảo hộ & Dụng cụ làm việc",

    # 9. 귀국 무빙세일 특가관
    "moving_sale_title": "Gian hàng thanh lý đồ về nước đặc biệt",
    "moving_sale_desc": "Chuyên mục xả gấp trọn bộ đồ gia dụng & nội thất giá rẻ của lao động chuẩn bị về nước.",
    "auto_ui_203": "Giảm giá trọn bộ lên đến 85%",
    "moving_all_badge": "Xem tất cả tin đăng",
    "auto_ui_204": "🚨 Còn 3 ngày - Hôm nay xả gấp & tặng 0đ",
    "auto_ui_205": "🔥 Còn 7 ngày - Sắp hết hạn xả siêu rẻ",
    "auto_ui_206": "✈️ Còn 14 ngày - Đặt cọc giữ gói đồ về nước"
}

vi_dict.update(HOMEPAGE_VI_EXACT)

# vi.ts 저장
lines = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const vi: TranslationDictionary = {"
]
for k in ko_dict.keys():
    v = vi_dict.get(k, "Thông tin giao dịch an toàn K-Market")
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'  {k}: "{escaped}",')
lines.append("};")
lines.append("")

with open(vi_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("PERFECT: Homepage exact full Vietnamese sentences applied to vi.ts!")
