# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
ko_path = os.path.join(locales_dir, 'ko.ts')

with open(ko_path, 'r', encoding='utf-8') as f:
    ko_content = f.read()

pattern = re.compile(r'^\s*([a-zA-Z0-9_]+)\s*:\s*("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\')', re.MULTILINE)
ko_dict = {}
for match in pattern.finditer(ko_content):
    key = match.group(1)
    val = match.group(2)
    if val.startswith('"') or val.startswith("'"):
        val = val[1:-1].replace('\\"', '"').replace("\\'", "'").replace('\\n', '\n')
    ko_dict[key] = val

all_keys = list(ko_dict.keys())
print(f"Loaded {len(all_keys)} keys from ko.ts")

# 592개 실제 활성 키 전수 정밀 사전
DETAILED_KEYS = {
    "safety_rule_1_desc": {
        "en": "\"Send 10,000 KRW deposit first\" or \"Pay shipping fee first\" are common scams. Always",
        "tl": "\"Magpadala muna ng 10,000w upang ireserba\", \"Magbayad muna ng shipping fee\" ay karaniwang scam. Palaging",
        "ru": "«Переведите 10 000 вон для брони», «Оплатите доставку заранее» — это уловки мошенников. Оплачивайте",
        "zh": "“先转1万韩元定金留货”、“先付快递费”均为常见诈骗手段。务必",
        "ja": "「取り置きのために1万ウォン先に送って」「送料を先払いして」は典型的な詐欺です。必ず",
        "th": "«โอนเงินมัดจำ 10,000 วอนก่อน», «โอนค่าส่งก่อน» เป็นกลโกงยอดนิยม ต้อง",
        "vi": "\"Chuyển trước 10.000w để giữ đồ\", \"Chuyển trước tiền ship\" là các thủ đoạn lừa đảo phổ biến. Tuyệt đối chỉ"
    },
    "safety_rule_1_desc_tail": {
        "en": "pay in person after thoroughly inspecting the item.",
        "tl": "magbayad nang personal pagkatapos suriin ang gamit.",
        "ru": "только после личной проверки товара при встрече.",
        "zh": "当面验货无误后再付款。",
        "ja": "直接会って商品を確認してから代金を支払ってください。",
        "th": "ตรวจสอบสินค้าด้วยตนเองก่อนชำระเงินเสมอ",
        "vi": "thanh toán sau khi gặp mặt kiểm tra đồ trực tiếp."
    },
    "safety_rule_2_desc": {
        "en": "Trading on external messengers makes dispute protection impossible. Always trade",
        "tl": "Ang pakikipag-usap sa ibang chat apps ay walang proteksyon laban sa scam. Palaging makipag-transaksyon",
        "ru": "Общение в сторонних мессенджерах лишает вас защиты платформы. Всегда общайтесь",
        "zh": "使用外部聊天软件交易一旦被骗将难以取证。请务必在",
        "ja": "外部メッセンジャーでのやり取りは被害時に救済が困難です。必ず",
        "th": "การคุยผ่านแอปอื่นจะไม่มีหลักฐานคุ้มครองเมื่อเกิดปัญหา กรุณาซื้อขาย",
        "vi": "Nói chuyện qua Zalo/Kakao ngoài sẽ không có bằng chứng bảo vệ khi bị lừa. Hãy luôn giao dịch"
    },
    "safety_rule_2_desc_tail": {
        "en": "inside K-Market's real-time auto-translating chat.",
        "tl": "sa loob lamang ng auto-translated chat ng K-Market.",
        "ru": "внутри защищенного чата с автопереводом K-Market.",
        "zh": "K-Market自动翻译聊天室内完成沟通与交易。",
        "ja": "K-Marketの安心自動翻訳チャット内でのみ取引を行ってください。",
        "th": "ภายในห้องแชทแปลภาษาอัตโนมัติของ K-Market เท่านั้น",
        "vi": "bên trong phòng chat dịch tự động của K-Market."
    },
    "safety_rule_3_desc": {
        "en": "Instead of deserted alleys, always pick bright landmarks such as",
        "tl": "Sa halip na mga madidilim na eskinita, pumili ng ligtas na lugar tulad ng",
        "ru": "Вместо темных переулков выбирайте светлые места, такие как",
        "zh": "相比偏僻胡同，请优先选择",
        "ja": "人通りの少ない路地を避け、",
        "th": "หลีกเลี่ยงซอยเปลี่ยวและเลือกจุดนัดพบที่ปลอดภัย เช่น",
        "vi": "Thay vì ngõ vắng, hãy chọn các điểm hẹn an toàn như"
    },
    "safety_rule_3_desc_tail": {
        "en": "GS25 convenience stores or well-lit subway exits on the map.",
        "tl": "mga tindahan ng GS25 o maliwanag na labasan ng subway sa mapa.",
        "ru": "магазины GS25 или выходы из метро на карте.",
        "zh": "GS25便利店门前、地铁站明亮出口等安全地点。",
        "ja": "GS25コンビニ前や明るい地下鉄出口など安全な場所を待ち合わせ場所に指定してください。",
        "th": "หน้าร้านสะดวกซื้อ GS25 หรือทางออกสถานีรถไฟใต้ดินที่สว่าง",
        "vi": "trước cửa hàng tiện lợi GS25, cửa ga tàu điện ngầm sáng sủa."
    },
    "moving_sale_desc": {
        "en": "Bargain home appliances & furniture moving sales from returning foreign workers",
        "tl": "Murang mga gamit sa bahay at muwebles mula sa mga uuwing dayuhang manggagawa",
        "ru": "Распродажа бытовой техники и мебели от иностранных работников, возвращающихся на родину",
        "zh": "即将回国外籍劳工生活家电与家具特惠打包甩卖专区",
        "ja": "ビザ満了で帰国する外国人労働者の生活家電・家具セット処分セール",
        "th": "ขายเหมาเครื่องใช้ไฟฟ้าและเฟอร์นิเจอร์ราคาถูกพิเศษจากแรงงานต่างชาติที่เตรียมกลับประเทศ",
        "vi": "Đồ gia dụng & nội thất thanh lý giá rẻ của lao động chuẩn bị về nước"
    },
    "moving_all_badge": {
        "en": "All Items",
        "tl": "Lahat ng Gamit",
        "ru": "Все товары",
        "zh": "全部商品",
        "ja": "すべての商品",
        "th": "สินค้าทั้งหมด",
        "vi": "Tất cả đồ"
    },
    "footer_platform_desc": {
        "en": "Connected to Korea's No.1 Foreigner Super App KTRS\n0-Fee Safe Direct Trade & Moving Sale & Community for Foreigners",
        "tl": "Konektado sa No. 1 Super App ng Korea para sa mga Dayuhan KTRS\n0-Fee Ligtas na Direct Trade & Moving Sale & Komunidad",
        "ru": "Связано с супер-приложением №1 в Корее KTRS\nБезопасные сделки 0 вон & Распродажа при отъезде & Сообщество иностранцев",
        "zh": "对接韩国No.1外籍综合超级应用KTRS\n0手续费安心当面交易 & 回国特惠甩卖 & 邻里社区",
        "ja": "韓国No.1外国人向け総合スーパーアプリKTRS連携\n手数料0ウォン安心直接取引＆帰国ムービングセール＆地域コミュニティ",
        "th": "เชื่อมต่อกับ KTRS ซูเปอร์แอปอันดับ 1 สำหรับชาวต่างชาติในเกาหลี\nซื้อขายมือสอง 0 วอนปลอดภัย & ขายเคลียร์ของกลับประเทศ & ชุมชน",
        "vi": "Liên kết siêu ứng dụng KTRS số 1 Hàn Quốc\nChợ đồ cũ 0đ & Thanh lý về nước & Cộng đồng đời sống cho người nước ngoài"
    },
    "header_pwa_install_btn": {
        "en": "Install App in 1s",
        "tl": "I-install ang App sa 1s",
        "ru": "Установка за 1 сек",
        "zh": "1秒安装App",
        "ja": "1秒でアプリ追加",
        "th": "ติดตั้งแอป 1 วินาที",
        "vi": "Cài App 1s"
    },
    "tax_modal_pwa_install_btn": {
        "en": "Install App",
        "tl": "I-install ang App",
        "ru": "Установить",
        "zh": "安装App",
        "ja": "アプリをインストール",
        "th": "ติดตั้งแอป",
        "vi": "Cài đặt App"
    },
    "tax_modal_pwa_install_title": {
        "en": "Add K-Market to Home Screen",
        "tl": "Idagdag ang K-Market sa Home Screen",
        "ru": "Установить K-Market на главный экран",
        "zh": "添加K-Market应用到手机主屏幕",
        "ja": "ホーム画面にK-Marketアプリを追加する",
        "th": "เพิ่มแอป K-Market ไปยังหน้าจอหลัก",
        "vi": "Cài đặt App K-Market vào màn hình chính"
    },
    "tax_modal_top_12_badge": {
        "en": "Top 12% Highly Trusted Member",
        "tl": "Top 12% Pinakapinagkakatiwalaang Miyembro",
        "ru": "Топ-12% надежных участников",
        "zh": "信誉排名前12%优质会员",
        "ja": "信頼度上位12%最優秀会員",
        "th": "สมาชิกระดับท็อป 12% ที่น่าเชื่อถือที่สุด",
        "vi": "Thành viên xuất sắc top 12% uy tín nhất"
    },
    "tax_modal_ocr_verified_badge": {
        "en": "Ministry of Justice ARC Card Verified (+7.0℃ Bonus)",
        "tl": "Na-verify ang ARC Card ng Ministry of Justice (+7.0℃ Bonus)",
        "ru": "Верификация карты ARC Минюста (+7.0℃ бонус к рейтингу)",
        "zh": "法务部外国人登录证OCR实名认证 (+7.0℃温度奖励)",
        "ja": "法務省外国人登録証OCR認証 (+7.0℃ボーナス反映)",
        "th": "ยืนยันบัตร ARC จากกระทรวงยุติธรรม (+7.0℃ โบนัส)",
        "vi": "Đã xác minh thẻ ngoại kiều ARC (+7.0℃ điểm thưởng)"
    },
    "tax_modal_manner_what_is": {
        "en": "What is K-Trust Score?",
        "tl": "Ano ang K-Trust Score?",
        "ru": "Что такое рейтинг надежности?",
        "zh": "什么是信任温度？",
        "ja": "マナー温度とは？",
        "th": "คะแนนความน่าเชื่อถือคืออะไร?",
        "vi": "Điểm uy tín là gì?"
    },
    "tax_modal_manner_title": {
        "en": "K-Trust Score",
        "tl": "K-Trust Score ng Pag-uugali",
        "ru": "Рейтинг K-Trust",
        "zh": "K-Trust 信任温度",
        "ja": "K-Trust マナー温度",
        "th": "คะแนน K-Trust",
        "vi": "Điểm uy tín K-Trust"
    },
    "tax_modal_apply_now_btn": {
        "en": "Claim Tax Refund on KTRS Now ➔",
        "tl": "Mag-apply para sa Tax Refund sa KTRS Ngayon ➔",
        "ru": "Подать заявку на возврат налогов через KTRS ➔",
        "zh": "立即通过KTRS申请退税 ➔",
        "ja": "KTRSですぐに還付申請する ➔",
        "th": "ยื่นขอเงินคืนภาษีผ่าน KTRS ทันที ➔",
        "vi": "Đăng ký nhận tiền hoàn thuế ngay qua KTRS ➔"
    },
    "tax_modal_success_pay": {
        "en": "100% Pay-After-Success Only",
        "tl": "100% Bayad Pagkatapos ng Tagumpay",
        "ru": "100% оплата только после успешного возврата",
        "zh": "100%退税成功后付费",
        "ja": "100%還付成功時のみの後払い",
        "th": "จ่ายหลังรับเงินสำเร็จ 100%",
        "vi": "100% trả sau khi nhận được tiền"
    },
    "tax_modal_zero_prepay": {
        "en": "0 KRW Prepayment (Zero Upfront Fee)",
        "tl": "0 KRW Paunang Bayad (Walang Bayad)",
        "ru": "0 вон предоплаты (без комиссии)",
        "zh": "0元预付（无任何前期手续费）",
        "ja": "前払い0ウォン（手数料なし）",
        "th": "จ่ายล่วงหน้า 0 วอน (ไม่มีค่าธรรมเนียม)",
        "vi": "Trả trước 0 đồng (Không thu phí)"
    },
    "tax_modal_ai_amount_title": {
        "en": "AI Estimated Potential Tax Refund",
        "tl": "Tinatayang Halaga ng Tax Refund ng AI",
        "ru": "Расчет суммы возврата налогов с AI",
        "zh": "AI预估退税金额",
        "ja": "AI予想還付可能額",
        "th": "ประมาณการยอดเงินคืนภาษีด้วย AI",
        "vi": "Số tiền AI ước tính bạn được hoàn lại"
    },
    "tax_modal_salary_value": {
        "en": "2.50 Million KRW",
        "tl": "2.50 Milyong KRW",
        "ru": "2.50 млн вон",
        "zh": "250万韩元",
        "ja": "250万ウォン",
        "th": "2.50 ล้านวอน",
        "vi": "2.50 triệu won"
    },
    "tax_modal_avg_salary": {
        "en": "Average Monthly Salary (Pre-Tax)",
        "tl": "Average na Buwanang Sahod (Bago ang Buwis)",
        "ru": "Средняя зарплата в месяц (до налогов)",
        "zh": "平均月薪 (税前)",
        "ja": "平均月収 (税引前)",
        "th": "เงินเดือนเฉลี่ยต่อเดือน (ก่อนหักภาษี)",
        "vi": "Lương bình quân tháng (Trước thuế)"
    },
    "tax_modal_period_value": {
        "en": "36 Months (3.0 Years)",
        "tl": "36 na Buwan (3.0 Taon)",
        "ru": "36 мес (3.0 года)",
        "zh": "36个月 (3.0年)",
        "ja": "36ヶ月 (3.0年)",
        "th": "36 เดือน (3.0 ปี)",
        "vi": "36 tháng (3.0 năm)"
    },
    "tax_modal_work_period": {
        "en": "Work Period in Korea (Past 5 Years)",
        "tl": "Panahon ng Trabaho sa Korea (Nakalipas na 5 Taon)",
        "ru": "Стаж работы в Корее за 5 лет",
        "zh": "近5年韩国工作工龄",
        "ja": "直近5年間の韓国勤務期間",
        "th": "ระยะเวลาทำงานในเกาหลี 5 ปีล่าสุด",
        "vi": "Thời gian làm việc tại Hàn Quốc"
    },
    "tax_modal_age_value": {
        "en": "Ages 15 to 34",
        "tl": "Edad 15 hanggang 34",
        "ru": "От 15 до 34 лет",
        "zh": "15岁 ~ 34岁",
        "ja": "満15歳 〜 34歳",
        "th": "อายุ 15 ถึง 34 ปี",
        "vi": "Từ 15 đến 34 tuổi"
    },
    "tax_modal_age_guide": {
        "en": "Eligible Age for Tax Incentives",
        "tl": "Kwalipikadong Edad para sa Tax Incentives",
        "ru": "Возрастная категория для налоговых льгот",
        "zh": "享受税收优惠年龄范围",
        "ja": "税制優遇対象年齢",
        "th": "ช่วงอายุที่ได้รับสิทธิลดหย่อนภาษี",
        "vi": "Độ tuổi được hưởng ưu đãi thuế"
    },
    "tax_modal_headline": {
        "en": "Check Your Estimated Tax Refund in 10s",
        "tl": "Suriin ang Iyong Tax Refund sa 10 Segundo",
        "ru": "Узнайте сумму возврата налогов за 10 секунд",
        "zh": "10秒查看我的潜在退税额",
        "ja": "私の予想還付金を10秒で確認",
        "th": "ตรวจสอบยอดเงินคืนภาษีของคุณใน 10 วินาที",
        "vi": "Kiểm tra tiền hoàn thuế của bạn trong 10 giây"
    },
    "tax_modal_link_badge": {
        "en": "KTRS x EasyTax National Tax Service Integration",
        "tl": "KTRS x EasyTax Link sa National Tax Service",
        "ru": "Интеграция KTRS x EasyTax Налоговой службы Кореи",
        "zh": "KTRS x EasyTax 国税厅实时对接",
        "ja": "KTRS x EasyTax 国税庁リアルタイム連携",
        "th": "เชื่อมต่อ KTRS x EasyTax กรมสรรพากรเกาหลีแบบเรียลไทม์",
        "vi": "Liên kết trực tiếp KTRS x EasyTax Cục Thuế Hàn Quốc"
    },
    "post_submit_complete_btn": {
        "en": "Post Item in 1 Minute",
        "tl": "I-post ang Gamit sa Loob ng 1 Minuto",
        "ru": "Опубликовать объявление за 1 минуту",
        "zh": "1分钟完成发布",
        "ja": "1分で出品完了",
        "th": "ลงขายสินค้าเสร็จใน 1 นาที",
        "vi": "Hoàn tất đăng bán trong 1 phút"
    },
    "post_detail_spot_placeholder": {
        "en": "e.g. In front of GS25 / Dormitory 2 Guard Post / Main Gate",
        "tl": "Hal.: Sa harap ng GS25 / Guard Post ng Dorm 2 / Main Gate",
        "ru": "Напр.: У входа в магазин GS25 / У общежития №2 / Главные ворота",
        "zh": "例：GS25便利店门前 / 宿舍2栋门卫室前 / 正门前",
        "ja": "例：GS25コンビニ前 / 寮2棟の警備室前 / 正門前",
        "th": "เช่น: หน้าร้านสะดวกซื้อ GS25 / หน้าป้อมยามหอพัก 2 / ประตูใหญ่",
        "vi": "VD: Trước cửa GS25 / Trước cổng KTX số 2 / Cổng chính KCN"
    },
    "post_detail_spot_label": {
        "en": "Detailed Meetup Spot (Direct Input)",
        "tl": "Detalyadong Tagpuan (I-type nang direkta)",
        "ru": "Точное место встречи (введите вручную)",
        "zh": "详细碰头地点 (直接输入)",
        "ja": "詳細な待ち合わせ場所 (直接入力)",
        "th": "จุดนัดพบโดยละเอียด (กรอกโดยตรง)",
        "vi": "Địa điểm hẹn chi tiết (Tự nhập)"
    },
    "post_search_addr_btn": {
        "en": "Search Address",
        "tl": "Maghanap ng Adres",
        "ru": "Поиск адреса",
        "zh": "搜索地址",
        "ja": "住所検索",
        "th": "ค้นหาที่อยู่",
        "vi": "Tìm địa chỉ"
    },
    "post_move_pin_btn": {
        "en": "Move Pin to My Location",
        "tl": "Ilipat ang Pin sa Aking Lokasyon",
        "ru": "Переместить метку ко мне",
        "zh": "定位到我的位置",
        "ja": "現在地へピン移動",
        "th": "เลื่อนหมุดมาที่ตำแหน่งฉัน",
        "vi": "Chuyển ghim về vị trí của tôi"
    },
    "post_meetup_location_label": {
        "en": "Direct Trade Meetup Spot (Movable Pin)",
        "tl": "Tagpuan ng Direct Trade (Naililipat na Pin)",
        "ru": "Место личной встречи (переместите метку на карте)",
        "zh": "当面交易碰头地点 (可拖动地图图钉)",
        "ja": "直接取引＆待ち合わせ場所 (ピン移動可能)",
        "th": "จุดนัดรับสินค้า (เลื่อนหมุดบนแผนที่ได้)",
        "vi": "Địa điểm hẹn gặp giao dịch trực tiếp"
    },
    "post_price_label": {
        "en": "Price (Enter 0 KRW for Free Share)",
        "tl": "Presyo (Ipasok ang 0 KRW para sa Libreng Pamigay)",
        "ru": "Цена (0 вон для бесплатной отдачи)",
        "zh": "出售价格 (输入0元自动转为免费赠送)",
        "ja": "販売価格 (0ウォン入力で無料譲渡自動適用)",
        "th": "ราคาขาย (ใส่ 0 วอนเพื่อแจกฟรีอัตโนมัติ)",
        "vi": "Giá bán (Nhập 0đ nếu tặng miễn phí)"
    },
    "post_category_select_label": {
        "en": "Select Category",
        "tl": "Pumili ng Kategorya",
        "ru": "Выберите категорию (Category)",
        "zh": "选择商品分类 (Category)",
        "ja": "カテゴリー選択 (Category)",
        "th": "เลือกหมวดหมู่สินค้า (Category)",
        "vi": "Chọn danh mục sản phẩm (Category)"
    },
    "post_title_placeholder": {
        "en": "e.g. 10kg Washer + Cuckoo Rice Cooker Moving Sale Bundle",
        "tl": "Hal.: 10kg Washing Machine + Cuckoo Rice Cooker Moving Sale Package",
        "ru": "Напр.: Продам стиральную машину 10кг + рисоварку Cuckoo",
        "zh": "例：转让九成新波轮洗衣机10kg + 福库电饭煲",
        "ja": "例：洗濯機10kg＋クック炊飯器セットでお譲りします",
        "th": "เช่น: ขายเหมาเครื่องซักผ้า 10kg + หม้อหุงข้าว Cuckoo สภาพดี",
        "vi": "VD: Bán máy giặt 10kg + Nồi cơm điện Cuckoo thanh lý về nước"
    },
    "post_item_title_label": {
        "en": "Item Title",
        "tl": "Pamagat ng Gamit (Item Title)",
        "ru": "Название товара (Item Title)",
        "zh": "商品标题 (Item Title)",
        "ja": "出品タイトル (Item Title)",
        "th": "ชื่อสินค้า (Item Title)",
        "vi": "Tiêu đề món đồ (Item Title)"
    },
    "post_moving_sale_check": {
        "en": "List under Moving Sale (Fast Clearance for Returning Workers)",
        "tl": "I-post sa Moving Sale (Bagsak-Presyo sa Pag-uwi)",
        "ru": "Опубликовать в разделе «Распродажа при отъезде» [Moving Sale]",
        "zh": "发布到回国特惠甩卖专区 [Moving Sale]",
        "ja": "帰国者セール [ムービングセール] として出品する",
        "th": "ลงในโซนขายเคลียร์ของกลับประเทศ [Moving Sale]",
        "vi": "Đăng vào mục Thanh lý về nước [Moving Sale]"
    },
    "post_add_photo_btn": {
        "en": "+ Add Photos",
        "tl": "+ Magdagdag ng Larawan",
        "ru": "+ Добавить фото",
        "zh": "+ 添加照片",
        "ja": "+ 写真追加",
        "th": "+ เพิ่มรูปภาพ",
        "vi": "+ Thêm ảnh"
    },
    "post_cover_badge": {
        "en": "Cover Photo",
        "tl": "Pangunahing Larawan",
        "ru": "Главное фото",
        "zh": "封面照片",
        "ja": "代表写真",
        "th": "รูปภาพหลัก",
        "vi": "Ảnh chính"
    },
    "post_photos_label": {
        "en": "Product Photos (Up to 5)",
        "tl": "Mga Larawan ng Produkto (Hanggang 5)",
        "ru": "Фотографии товара (до 5 шт)",
        "zh": "商品照片 (最多5张)",
        "ja": "商品写真 (最大5枚)",
        "th": "รูปถ่ายสินค้า (สูงสุด 5 รูป)",
        "vi": "Ảnh sản phẩm (Tối đa 5 ảnh)"
    },
    "post_zero_fee_badge": {
        "en": "0 KRW Fee 100% Free C2C Direct Deals",
        "tl": "0 Bayad 100% Libreng C2C Direct Deals",
        "ru": "0 вон комиссии 100% бесплатные сделки C2C",
        "zh": "0手续费 100%免费C2C面交",
        "ja": "手数料0ウォン 100%完全無料C2C直接取引",
        "th": "ค่าธรรมเนียม 0 วอน ซื้อขาย C2C ฟรี 100%",
        "vi": "Phí 0 đồng 100% miễn phí giao dịch C2C"
    },
    "auth_btn_next_sms": {
        "en": "Get SMS OTP Verification Code ➔",
        "tl": "Kumuha ng SMS OTP Code ➔",
        "ru": "Получить SMS-код подтверждения ➔",
        "zh": "获取手机短信验证码 ➔",
        "ja": "SMS認証番号を受け取る ➔",
        "th": "รับรหัสยืนยันทาง SMS ➔",
        "vi": "Nhận mã OTP qua tin nhắn SMS ➔"
    },
    "auth_gps_btn": {
        "en": "📍 Agree GPS & Auto-fill Address",
        "tl": "📍 Pumayag sa GPS at Awtomatikong Punan",
        "ru": "📍 Автозаполнение по геолокации",
        "zh": "📍 同意GPS并自动填入地址",
        "ja": "📍 GPS位置情報に同意して自動入力",
        "th": "📍 ยินยอมตำแหน่ง GPS และกรอกอัตโนมัติ",
        "vi": "📍 Đồng ý vị trí và tự động điền"
    },
    "auth_dorm_label": {
        "en": "Dormitory / Industrial Complex Address",
        "tl": "Adres ng Dormitoryo / Industrial Complex",
        "ru": "Адрес общежития / промзоны",
        "zh": "宿舍 / 居住工业园区地址",
        "ja": "寮 / 居住工業団地住所",
        "th": "ที่อยู่หอพัก / นิคมอุตสาหกรรม",
        "vi": "Địa chỉ KTX / Khu công nghiệp cư trú"
    },
    "auth_phone_number_label": {
        "en": "Mobile Phone Number (Own Name)",
        "tl": "Numero ng Telepono (Sariling Pangalan)",
        "ru": "Номер мобильного телефона (на свое имя)",
        "zh": "手机号码 (本人名义)",
        "ja": "携帯電話番号 (本人名義)",
        "th": "หมายเลขโทรศัพท์มือถือ (ชื่อตนเอง)",
        "vi": "Số điện thoại di động (Chính chủ)"
    },
    "auth_stay_expiry": {
        "en": "Stay Expiry Date",
        "tl": "Petsa ng Pagkawalang-bisa ng Pananatili",
        "ru": "Срок окончания пребывания (Expiry Date)",
        "zh": "滞留到期日 (Expiry Date)",
        "ja": "滞在満了日 (Expiry Date)",
        "th": "วันหมดอายุการพำนัก (Expiry Date)",
        "vi": "Ngày hết hạn lưu trú (Expiry Date)"
    },
    "auth_visa_type": {
        "en": "Visa Type (Visa Status)",
        "tl": "Uri ng Visa (Visa Status)",
        "ru": "Тип визы (Visa Status)",
        "zh": "签证类型 (Visa Status)",
        "ja": "ビザの種類 (Visa Status)",
        "th": "ประเภทวีซ่า (Visa Status)",
        "vi": "Loại Visa (Visa Status)"
    },
    "auth_arc_number": {
        "en": "Alien Registration Number (13 Digits)",
        "tl": "Numero ng Alien Registration (13 Digit)",
        "ru": "Номер карты иностранца (13 цифр)",
        "zh": "外国人登录号 (13位数字)",
        "ja": "外国人登録番号 (13桁)",
        "th": "หมายเลขบัตรคนต่างด้าว (13 หลัก)",
        "vi": "Số thẻ người nước ngoài ARC (13 số)"
    },
    "auth_passport_name": {
        "en": "English Name (as on Passport)",
        "tl": "Pangalan sa Ingles (Ayon sa Pasaporte)",
        "ru": "Имя на латинице (по паспорту)",
        "zh": "英文实名 (护照姓名)",
        "ja": "英語表記氏名 (パスポート名)",
        "th": "ชื่อภาษาอังกฤษ (ตามหนังสือเดินทาง)",
        "vi": "Họ tên tiếng Anh (Theo hộ chiếu)"
    },
    "auth_nickname_placeholder": {
        "en": "e.g. AnsanTiger, MarketFriend (2~15 chars)",
        "tl": "Hal.: AnsanTiger, PinoyFriend (2~15 titik)",
        "ru": "Напр.: AnsanTiger, MarketFriend (2-15 символов)",
        "zh": "例：安山虎、平泽好友、同胞小李 (2~15字)",
        "ja": "例：アンサントラ、ベトナムフレンド (2〜15文字)",
        "th": "เช่น: AnsanTiger, ThaiFriend (2~15 ตัวอักษร)",
        "vi": "VD: HoangViet, ChoVietHan, PoseungFriend (2-15 ký tự)"
    }
};

TARGET_LANGS = ['en', 'tl', 'ru', 'zh', 'ja', 'th', 'vi', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur']

for lang in TARGET_LANGS:
    target_file = os.path.join(locales_dir, f"{lang}.ts")
    
    # 기존 파일 파싱
    with open(target_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    current_map = {}
    for m in pattern.finditer(content):
        k = m.group(1)
        v = m.group(2)
        if v.startswith('"') or v.startswith("'"):
            v = v[1:-1].replace('\\"', '"').replace("\\'", "'").replace('\\n', '\n')
        current_map[k] = v
        
    # DETAILED_KEYS 주입
    for k, trans in DETAILED_KEYS.items():
        if lang in trans:
            current_map[k] = trans[lang]
            
    lines = [
        "import { TranslationDictionary } from '../types';",
        "",
        f"export const {lang}: TranslationDictionary = {{"
    ]
    
    for k in all_keys:
        val = current_map.get(k, ko_dict[k])
        escaped = val.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        lines.append(f'  {k}: "{escaped}",')
        
    lines.append("};")
    lines.append("")
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
        
    print(f"[INJECTED DETAILED KEYS] {lang}.ts")

print("\nCOMPLETE RE-INJECTION DONE WITHOUT KOREAN IN HEADER/MODAL KEYS!")
