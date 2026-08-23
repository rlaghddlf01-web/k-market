import { CommunityPost, CommunityComment } from '@/types/community';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    "id": "post-1",
    "user_id": "user-vn-01",
    "user_name": "호치민호랑이",
    "user_country": "VN",
    "user_flag": "🇻🇳",
    "category": "friends",
    "title": "주말에 평택에서 같이 베트남 쌀국수 먹고 한국어 공부할 친구 구해요! 🍜",
    "content": "안녕하세요! 한국에 온 지 8개월 된 호랑이라고 합니다. 주말마다 혼자 방에만 있으니까 너무 외로워서 글 올려요. 이번 주 일요일 오후에 같이 맛있는 거 먹고 서로 언어 교환(베트남어 ↔ 한국어) 하실 동네 친구분 계신가요? 국적 상관없이 편하게 댓글 남겨주세요!",
    "images": [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 평택시",
    "industrial_zone": "pyeongtaek",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "주말에 평택에서 같이 베트남 쌀국수 먹고 한국어 공부할 친구 구해요! 🍜",
        "content": "안녕하세요! 한국에 온 지 8개월 된 호랑이라고 합니다. 주말마다 혼자 방에만 있으니까 너무 외로워서 글 올려요. 이번 주 일요일 오후에 같이 맛있는 거 먹고 서로 언어 교환(베트남어 ↔ 한국어) 하실 동네 친구분 계신가요? 국적 상관없이 편하게 댓글 남겨주세요!"
      },
      "vi": {
        "title": "Tìm bạn ăn phở Việt Nam và học tiếng Hàn cùng nhau ở Pyeongtaek vào cuối tuần! 🍜",
        "content": "Xin chào! Mình là Horangi, đã đến Hàn Quốc được 8 tháng. Cuối tuần nào cũng chỉ ở trong phòng một mình thấy cô đơn quá nên mình đăng bài này. Có bạn nào ở gần muốn chiều Chủ nhật tuần này cùng ăn món gì đó ngon ngon và trao đổi ngôn ngữ (Tiếng Việt ↔ Tiếng Hàn) không? Không phân biệt quốc tịch, cứ thoải mái để lại bình luận nhé!"
      },
      "zh": {
        "title": "周末在平泽一起吃越南河粉、学韩语交朋友！🍜",
        "content": "你好！我是来韩国8个月的Horangi。每个周末都一个人呆在房间里，感觉太孤单了，所以发了这个帖。这周日下午有想一起吃美食、互相交流语言（越南语 ↔ 韩语）的附近朋友吗？不限国籍，欢迎随时留言！"
      },
      "en": {
        "title": "Looking for a friend to eat Vietnamese pho and study Korean together in Pyeongtaek this weekend! 🍜",
        "content": "Hello! My name is Horangi, and I've been in Korea for 8 months. I'm posting this because I feel so lonely staying alone in my room every weekend. Is there any local friend who would like to eat delicious food together this Sunday afternoon and do language exchange (Vietnamese ↔ Korean)? Feel free to leave a comment regardless of nationality!"
      },
      "ja": {
        "title": "週末に平沢（ピョンテク）で一緒にベトナムフォーを食べて韓国語を勉強する友達募集！🍜",
        "content": "こんにちは！韓国に来て8ヶ月になるホランイと申します。週末のたびに部屋に一人でいるのがとても寂しくて投稿しました。今週の日曜日の午後に、一緒に美味しいものを食べてお互いに言語交換（ベトナム語 ↔ 韓国語）をしてくださる近所のお友達はいらっしゃいますか？国籍問わず、お気軽にコメントを残してください！"
      },
      "ru": {
        "title": "Ищу друга, чтобы вместе поесть вьетнамский фо и поучить корейский язык на выходных в Пхёнтхэке! 🍜",
        "content": "Здравствуйте! Меня зовут Хоранги, я в Корее уже 8 месяцев. Каждые выходные сижу один в комнате, стало очень одиноко, поэтому решил написать. Есть ли поблизости друзья, которые хотят в это воскресенье днем вместе поесть что-нибудь вкусное и устроить языковой обмен (вьетнамский ↔ корейский)? Оставляйте комментарии, национальность не имеет значения!"
      },
      "th": {
        "title": "หาเพื่อนกินเฝอเวียดนามและเรียนภาษาเกาหลีด้วยกันที่พยองแท็กสุดสัปดาห์นี้! 🍜",
        "content": "สวัสดีครับ/ค่ะ! ฉันชื่อโฮรังงิ เพิ่งมาอยู่เกาหลีได้ 8 เดือน ทุกวันหยุดสุดสัปดาห์เอาแต่อยู่ห้องคนเดียวรู้สึกเหงามากเลยมาโพสต์ครับ/ค่ะ มีเพื่อนแถวนี้คนไหนอยากไปหาของอร่อยกินด้วยกันในบ่ายวันอาทิตย์นี้ และแลกเปลี่ยนภาษากัน (ภาษาเวียดนาม ↔ ภาษาเกาหลี) ไหมครับ/คะ? ไม่จำกัดสัญชาติ เมนต์กันเข้ามาได้สบายๆ เลยนะ!"
      },
      "uz": {
        "title": "Dam olish kunlari Pxyontxekda birga Vetnam fokosini yeb, koreys tilini o'rganadigan do'st qidiryapman! 🍜",
        "content": "Salom! Koreyaga kelganimga 8 oy bo'lgan Xorangiman. Har dam olish kuni xonada yolg'iz o'tirganim uchun juda zerikib, ushbu postni joylayapman. Bu yakshanba tushdan keyin birga mazali taom yeb, til almashish (vetnam tili ↔ koreys tili) qiladigan mahalliy do'stlar bormi? Fuqaroligidan qat'i nazar, bemalol izoh qoldiring!"
      },
      "km": {
        "title": "ស្វែងរកមិត្តភក្តិញ៉ាំហ្វើវៀតណាម និងរៀនភាសាកូរ៉េជាមួយគ្នានៅ Pyeongtaek ចុងសប្តាហ៍នេះ! 🍜",
        "content": "ជម្រាបសួរ! ខ្ញុំឈ្មោះ Horangi រស់នៅកូរ៉េបាន ៨ ខែហើយ។ ដោយសារតែចុងសប្តាហ៍នៅតែម្នាក់ឯងក្នុងបន្ទប់អផ្សុកខ្លាំងណាស់ ទើបខ្ញុំផុសសារនេះ។ តើមានមិត្តភក្តិនៅជិតនេះដែលចង់ទៅញ៉ាំអីឆ្ងាញ់ៗជាមួយគ្នានៅរសៀលថ្ងៃអាទិត្យនេះ ហើយផ្លាស់ប្តូរភាសាគ្នា (ភាសាវៀតណាម ↔ ភាសាកូរ៉េ) ដែរឬទេ? មិនប្រកាន់សញ្ជាតិទេ អាចខមិនបានដោយសេរី!"
      },
      "mn": {
        "title": "Амралтын өдрөөр Пёнтэкт хамтдаа Вьетнам фо шөл идэж, солонгос хэл сурах найз хайж байна! 🍜",
        "content": "Сайн байцгаана уу! Солонгост ирээд 8 сар болж байгаа Хоранги байна. Амралтын өдөр бүр өрөөндөө ганцаараа байхаар маш ганцаардаад энэ нийтлэлийг бичлээ. Энэ бүтэн сайн өдрийн үдээс хойш хамтдаа амттай юм идэнгээ харилцан хэл солилцох (Вьетнам хэл ↔ Солонгос хэл) ойр орчмын найз байна уу? Харьяалал харгалзахгүйгээр чөлөөтэй сэтгэгдэл үлдээгээрэй!"
      },
      "ne": {
        "title": "सप्ताहन्तमा प्योङतेक (Pyeongtaek) मा भियतनामी फो खाँदै कोरियाली भाषा पढ्न साथी खोज्दैछु! 🍜",
        "content": "नमस्ते! म कोरिया आएको ८ महिना भयो, मेरो नाम होराङ्गी हो। हरेक सप्ताहन्तमा कोठामा एक्लै बस्दा साह्रै एक्लो महसुस भएर यो पोस्ट गरेको हुँ। यो आइतबार दिउँसो सँगै मीठो खानेकुरा खाँदै भाषा साटासाट (भियतनामी ↔ कोरियाली) गर्ने वरपरका साथीहरू हुनुहुन्छ? जुनसुकै देशको भए पनि सजिलै कमेन्ट गर्नुहोला!"
      },
      "id": {
        "title": "Cari teman untuk makan pho Vietnam dan belajar bahasa Korea bareng di Pyeongtaek akhir pekan ini! 🍜",
        "content": "Halo! Saya Horangi, baru 8 bulan di Korea. Karena setiap akhir pekan cuma sendirian di kamar dan merasa kesepian, saya membuat postingan ini. Adakah teman sekitar sini yang mau makan makanan enak bareng di hari Minggu sore ini dan saling tukar bahasa (Bahasa Vietnam ↔ Bahasa Korea)? Tanpa memandang kewarganegaraan, silakan tinggalkan komentar ya!"
      },
      "my": {
        "title": "စနေ၊ တနင်္ဂနွေမှာ ပြုံးတက်မှာ ဗီယက်နမ် ဖို ခေါက်ဆွဲတူတူစားပြီး ကိုရီးယားစာ လေ့လာဖို့ သူငယ်ချင်းရှာနေပါတယ်။ 🍜",
        "content": "မင်္ဂလာပါ! ကိုရီးယားကို ရောက်တာ ၈ လရှိပြီဖြစ်တဲ့ Horangi ပါ။ စနေ၊ တနင်္ဂနွေတိုင်း အခန်းထဲမှာ တစ်ယောက်တည်းရှိနေလို့ အရမ်းပျင်းစရာကောင်းတာနဲ့ ဒီပိုစ့်ကို တင်လိုက်တာပါ။ ဒီတနင်္ဂနွေ နေ့လယ်ပိုင်းမှာ အတူတူ အရသာရှိတာလေးစားရင်း ဘာသာစကား ချိန်းဆက်လေ့လာချင်တဲ့ (ဗီယက်နမ်ဘာသာ ↔ ကိုရီးယားဘာသာ) အနီးအနားက သူငယ်ချင်းများ ရှိပါသလား? နိုင်ငံခြားသားဖြစ်ဖြစ် မည်သူမဆို လွတ်လပ်စွာ ကွန်မန့်ပေးခဲ့ပါနော်!"
      },
      "si": {
        "title": "සති අන්තයේ ප්යොංටෙක් හිදී වියට්නාම ෆෝ (Pho) කමින් කොරියානු භාෂාව ඉගෙන ගැනීමට යහළුවෙකු සොයමි! 🍜",
        "content": "ආයුබෝවන්! මම කොරියාවට ඇවිත් මාස 8 ක් වන හොරන්ගි. සෑම සති අන්තයකම කාමරයේ තනිවම සිටින විට ඉතා පාලුවක් දැනෙන නිසා මෙසේ සටහනක් තබමි. මේ ඉරිදා පස්වරුවේ එකතු වී රසවත් යමක් කමින් භාෂා හුවමාරු කර ගැනීමට (වියට්නාම භාෂාව ↔ කොරියානු භාෂාව) කැමති අවට සිටින යහළුවන් සිටිනවාද? ජාතිකත්වය අදාළ නොවේ, කමෙන්ට් කරන්න!"
      },
      "kk": {
        "title": "Демалыс күндері Пхёнтекте бірге вьетнамдық фо жеп, корей тілін үйренетін дос іздеймін! 🍜",
        "content": "Сәлеметсіздер ме! Кореяға келгеніме 8 ай болған Хорангимін. Әр демалыс сайын бөлмеде жалғыз отырған соң өте жалғызсырап, осы жазбаны қалдырып отырмын. Осы жексенбіде түстен кейін бірге дәмді тамақ жеп, тіл алмасатын (вьетнам тілі ↔ корей тілі) маңайдағы достар бар ма? Азаматтығына қарамастан, еркін пікір қалдырыңыздар!"
      },
      "bn": {
        "title": "উইকেন্ডে পিয়ংﺘেকে একসাথে ভিয়েতনামী ফো খেয়ে কোরিয়ান ভাষা পড়ার জন্য বন্ধু খুঁজছি! 🍜",
        "content": "হ্যালো! আমি হোরাঙ্গি, কোরিয়াতে এসেছি ৮ মাস হলো। প্রতি উইকেন্ডে ঘরে একা একা থাকতে খুব একা লাগে, তাই এই পোস্টটি করছি। এই রবিবার বিকেলে একসাথে সুস্বাদু খাবার খেয়ে ভাষা বিনিময় (ভিয়েতনামী ↔ কোরিয়ান) করার মতো কোনো স্থানীয় বন্ধু আছেন? জাতীয়তা যাই হোক না কেন, নির্দ্বিধায় কমেন্ট করুন!"
      },
      "ur": {
        "title": "ویک اینڈ پر پیونگ ٹیک میں مل کر ویتنامی فو کھانے اور کورین زبان سیکھنے کے لیے دوست کی تلاش ہے! 🍜",
        "content": "السلام علیکم! میں ہورانگی ہوں، مجھے کوریا آئے ہوئے 8 مہینے ہو چکے ہیں۔ ہر ویک اینڈ پر کمرے میں اکیلے رہنے کی وجہ سے بہت اکیلا پن محسوس ہوتا ہے، اس لیے یہ پوسٹ کر رہا ہوں۔ کیا اس اتوار کی دوپہر کو ساتھ مل کر کچھ مزیدار کھانے اور زبان کا تبادلہ (ویتنامی ↔ کورین) کرنے کے لیے کوئی قریبی دوست موجود ہے؟ کسی بھی قومیت کے لوگ بلا جھجھک کمنٹ کریں!"
      },
      "tl": {
        "title": "Naghahanap ng kasama ngayong weekend sa Pyeongtaek para kumain ng Vietnamese pho at mag-aral ng Korean! 🍜",
        "content": "Kumusta! Ako si Horangi, 8 buwan na ako rito sa Korea. Dahil palagi lang akong nag-iisa sa silid tuwing weekend, medyo nalulungkot ako kaya nag-post ako rito. May kapitbahay o kaibigan ba rito na gustong kumain ng masarap ngayong Linggo ng hapon at magpalitan ng wika (Vietnamese ↔ Korean)? Kahit anong nasyonalidad, huwag mag-atubiling mag-iwan ng komento!"
      }
    },
    "like_count": 14,
    "cheer_count": 8,
    "comment_count": 4,
    "view_count": 128,
    "is_hidden": false,
    "created_at": "2026-08-23T07:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-2",
    "user_id": "user-np-02",
    "user_name": "히말라야미소",
    "user_country": "NP",
    "user_flag": "🇳🇵",
    "category": "daily_healing",
    "title": "오늘 고향에 있는 딸아이와 영상통화 했는데 너무 보고 싶네요.. 힘내봅니다 ☕",
    "content": "퇴근하고 네팔에 있는 가족들과 통화했습니다. 5살 딸아이가 아빠 언제 오냐고 묻는데 눈물이 핑 돌더라고요. 가족들 생각하면서 오늘도 야근 열심히 버텼습니다. 한국에서 일하시는 모든 외국인 친구분들, 우리 모두 힘내요!",
    "images": [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 안산시",
    "industrial_zone": "ansan",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "오늘 고향에 있는 딸아이와 영상통화 했는데 너무 보고 싶네요.. 힘내봅니다 ☕",
        "content": "퇴근하고 네팔에 있는 가족들과 통화했습니다. 5살 딸아이가 아빠 언제 오냐고 묻는데 눈물이 핑 돌더라고요. 가족들 생각하면서 오늘도 야근 열심히 버텼습니다. 한국에서 일하시는 모든 외국인 친구분들, 우리 모두 힘내요!"
      },
      "vi": {
        "title": "Hôm nay tôi đã gọi video với con gái ở quê nhà, nhớ con quá.. Cố gắng lên nào ☕",
        "content": "Sau khi tan làm, tôi đã gọi điện cho gia đình ở Nepal. Con gái 5 tuổi hỏi khi nào bố về làm tôi rơm rớm nước mắt. Nghĩ đến gia đình nên hôm nay tôi cũng đã cố gắng vượt qua ca làm thêm giờ. Tất cả các bạn người nước ngoài đang làm việc tại Hàn Quốc ơi, chúng ta cùng cố gắng lên nhé!"
      },
      "zh": {
        "title": "今天和老家的女儿打了视频电话，好想她啊.. 加油 ☕",
        "content": "下班后和在尼泊尔的家人通了电话。5岁的女儿问我“爸爸什么时候回来”，眼泪一下子就泛上来了。想着家人，今天也努力熬过了加班。在韩国工作的所有外国朋友们，我们一起加油吧！"
      },
      "en": {
        "title": "Had a video call with my daughter back home today, I miss her so much.. Hanging in there ☕",
        "content": "After work, I called my family in Nepal. When my 5-year-old daughter asked, \"Daddy, when are you coming home?\" tears welled up in my eyes. Thinking of my family, I pushed through my overtime shift today as well. To all foreign friends working in Korea, let's all stay strong!"
      },
      "ja": {
        "title": "今日、国にいる娘とビデオ通話をしたのですが、とても会いたいです.. 頑張ります ☕",
        "content": "仕事が終わってからネパールにいる家族と話をしました。5歳の娘が「パパ、いつ帰ってくるの？」と聞くので、思わず涙が出そうになりました。家族のことを思いながら、今日も残業をしっかり乗り切りました。韓国で働くすべての外国人のお友達の皆さん、みんなで頑張りましょう！"
      },
      "ru": {
        "title": "Сегодня звонил по видеосвязи дочке на родину, так сильно скучаю.. Держусь ☕",
        "content": "После работы поговорил с семьёй в Непале. Когда 5-летняя дочка спросила: «Папа, когда ты приедешь?», на глаза навернулись слёзы. Думая о семье, я и сегодня изо всех сил выдержал сверхурочную работу. Всем иностранным друзьям, работающим в Корее, давайте держаться вместе!"
      },
      "th": {
        "title": "วันนี้ได้คอลสายวิดีโอกับลูกสาวที่บ้านเกิด คิดถึงมากๆ เลยครับ.. จะพยายามเข้มแข็งนะ ☕",
        "content": "เลิกงานแล้วได้คุยกับครอบครัวที่เนปาลครับ ลูกสาววัย 5 ขวบถามว่า \"พ่อจะกลับมาเมื่อไหร่\" น้ำตาก็รื้นขึ้นมาเลย คิดถึงครอบครัวก็เลยอดทนทำงานล่วงเวลาของวันนี้ผ่านไปได้ เพื่อนๆ ชาวต่างชาติทุกคนที่ทำงานในเกาหลี มาสู้ไปด้วยกันนะครับ!"
      },
      "uz": {
        "title": "Bugun vatanimdagi qizim bilan videomuloqot qildim, uni juda sog'indim.. Sabr qilib harakat qilaman ☕",
        "content": "Ishdan chiqib, Nepaldagi oilam bilan gaplashdim. 5 yoshli qizim \"Dada, qachon kelasiz?\" deb so'raganda ko'zimga yosh keldi. Oilamni o'ylab, bugun ham ortiqcha ish vaqtini astoydil o'tkazdim. Koreyada ishlayotgan barcha chet ellik do'stlar, hammamiz g'ayrat qilaylik!"
      },
      "km": {
        "title": "ថ្ងៃនេះបានវីដេអូខលលេងជាមួយកូនស្រីនៅស្រុកកំណើត នឹកកូនខ្លាំងណាស់.. ខិតខំប្រឹងប្រែងបន្តទៀត ☕",
        "content": "បន្ទាប់ពីចេញពីធ្វើការ ខ្ញុំបានទូរស័ព្ទទៅគ្រួសារនៅប្រទេសនេប៉ាល់។ កូនស្រីអាយុ ៥ ឆ្នាំបានសួរថា \"តើប៉ាមកវិញនៅពេលណា?\" ធ្វើឱ្យខ្ញុំស្រក់ទឹកភ្នែក luôn។ ដោយគិតដល់គ្រួសារ ថ្ងៃនេះខ្ញុំបានខិតខំប្រឹងប្រែងធ្វើការថែមម៉ោងរហូតដល់ចប់។ មិត្តភក្តិបរទេសទាំងអស់ដែលកំពុងធ្វើការនៅកូរ៉េ តោះពួកយើងខិតខំប្រឹងប្រែងទាំងអស់គ្នា!"
      },
      "mn": {
        "title": "Өнөөдөр нутагтаа байгаа охинтойгоо дүрсээ харан ярьлаа, маш их санаж байна.. Хичээцгээе ☕",
        "content": "Ажил тараад Непалд байгаа гэр бүлийнхэнтэйгээ ярьлаа. 5 настай охин минь \"Ааваа, хэзээ ирэх юм бэ?\" гэж асуухад нулимс цийлэгнээд ирсэн. Гэр бүлээ бодон өнөөдөр ч гэсэн илүү цагийн ажлаа хичээнгүйлэн давж гарлаа. Солонгост ажиллаж байгаа бүх гадаад найзууд аа, бүгдээрээ хүчтэй байгаарай!"
      },
      "ne": {
        "title": "आज घरमा भएकी छोरीसँग भिडियो कल गरेँ, साह्रै सम्झना आइरहेछ.. हिम्मत हारिँदैन ☕",
        "content": "काम सकेर नेपालमा भएको परिवारसँग कुरा गरेँ। ५ वर्षकी छोरीले \"बाबा कहिले आउनुहुन्छ?\" भनेर सोध्दा आँखामा टिलपिल आँसु आयो। परिवारको सम्झना गर्दै आज पनि ओभरटाइम मेहनतका साथ कटाएँ। कोरियामा काम गर्ने सम्पूर्ण विदेशी साथीहरू, हामी सबै हिम्मत गरौँ!"
      },
      "id": {
        "title": "Hari ini saya video call dengan putri saya di kampung halaman, kangen sekali.. Tetap semangat ☕",
        "content": "Pulang kerja, saya menelepon keluarga di Nepal. Saat putri saya yang berusia 5 tahun bertanya kapan ayahnya pulang, air mata saya hampir menetes. Mengingat keluarga, hari ini saya bertahan bekerja lembur dengan sungguh-sungguh. Untuk semua teman-teman asing yang bekerja di Korea, mari kita semua tetap semangat!"
      },
      "my": {
        "title": "ဒီနေ့ တိုင်းပြည်မှာရှိတဲ့ သမီးလေးနဲ့ ဗီဒီယိုကော ပြောခဲ့တယ်၊ အရမ်းလွမ်းတာပဲ.. အားတင်းထားပါတယ် ☕",
        "content": "အလုပ်ဆင်းတော့ နီပေါမှာရှိတဲ့ မိသားစုဆီ ဖုန်းဆက်ခဲ့တယ်။ ၅ နှစ်အရွယ် သမီးလေးက \"ပါပါး ဘယ်တော့ပြန်လာမလဲ\" လို့မေးတော့ မျက်ရည်တွေ ဝဲလာခဲ့တယ်။ မိသားစုကို တွေးပြီး ဒီနေ့လည်း အချိန်ပိုအလုပ်ကို ကြိုးစားပြီး သည်းခံလုပ်ခဲ့ပါတယ်။ ကိုရီးယားမှာ အလုပ်လုပ်နေကြတဲ့ နိုင်ငံခြားသား သူငယ်ချင်းများအားလုံး အားလုံးပဲ အားတင်းထားကြပါနော်!"
      },
      "si": {
        "title": "අද මව් රටේ ඉන්න දියණිය එක්ක වීඩියෝ කෝල් එකක් ගත්තා, ගොඩක් මතක් වෙනවා.. ශක්තිමත්ව ඉමු ☕",
        "content": "වැඩ ඇරුණාට පස්සේ නේපාලයේ ඉන්න පවුලේ අය එක්ක කතා කළා. අවුරුදු 5ක මගේ දියණිය \"තාත්තා කවදාද එන්නේ?\" කියලා අහද්දි මගේ ඇස්වලට කඳුළු ආවා. පවුලේ අය ගැන හිතලා අදත් ඕවර් ටයිම් වැඩ ටික අමාරුවෙන් හරි කරලා ඉවර කළා. කොරියාවේ වැඩ කරන සියලුම විදේශික යහළුවනේ, අපි හැමෝම ශක්තිමත්ව ඉමු!"
      },
      "kk": {
        "title": "Бүгін отанымдағы қызыммен бейнеқоңырау арқылы сөйлестім, қатты сағындым.. Шыдаймын ☕",
        "content": "Жұмыстан соң Непалдағы отбасыма қоңырау шалдым. 5 жасар қызым «Папа, қашан келесің?» деп сұрағанда, көзіме жас келді. Отбасымды ойлап, бүгін де үстеме жұмысты төзімділікпен аяқтадым. Кореяда жұмыс істеп жүрген барлық шетелдік достар, бәріміз жігерлі болайық!"
      },
      "bn": {
        "title": "আজ দেশে থাকা মেয়ের সাথে ভিডিও কলে কথা বললাম, খুব মনে পড়ছে.. শক্ত থাকার চেষ্টা করছি ☕",
        "content": "কাজ শেষে নেপালে থাকা পরিবারের সাথে কথা বললাম। ৫ বছরের মেয়েটা যখন জিজ্ঞেস করল \"বাবা তুমি কবে আসবে?\", চোখের জল ধরে রাখতে পারলাম না। পরিবারের কথা ভেবে আজও ওভারটাইম কষ্ট করে পার করলাম। কোরিয়ায় কর্মরত সকল বিদেশী বন্ধুরা, আমরা সবাই শক্ত থাকি!"
      },
      "ur": {
        "title": "آج وطن میں موجود اپنی بیٹی سے ویڈیو کال پر بات ہوئی، بہت یاد آ رہی ہے.. ہمت رکھ رہا ہوں ☕",
        "content": "کام سے چھٹی کے بعد نیپال میں موجود اپنے گھر والوں سے بات کی۔ 5 سال کی بیٹی نے جب پوچھا \"پاپا آپ کب آئیں گے؟\" تو آنکھوں میں آنسو آ گئے۔ گھر والوں کا سوچ کر آج بھی اوور ٹائم محنت سے کاٹ لیا۔ کوریا میں کام کرنے والے تمام غیر ملکی دوستو! ہم سب ہمت رکھیں۔"
      },
      "tl": {
        "title": "Naka-video call ko ang anak kong babae sa probinsya ngayon, miss na miss ko na siya.. Kinakaya pa rin ☕",
        "content": "Pagkatapos ng trabaho, tinawagan ko ang pamilya ko sa Nepal. Nang magtanong ang 5 taong gulang kong anak kung kailan uuwi si papa, naluha talaga ako. Isip ang pamilya, pinagtiyagaan ko ang overtime ngayong araw. Sa lahat ng mga foreign friends na nagtatrabaho sa Korea, laban lang tayong lahat!"
      }
    },
    "like_count": 32,
    "cheer_count": 27,
    "comment_count": 6,
    "view_count": 245,
    "is_hidden": false,
    "created_at": "2026-08-23T04:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-3",
    "user_id": "user-mn-03",
    "user_name": "초원의달림이",
    "user_country": "MN",
    "user_flag": "🇲🇳",
    "category": "qna",
    "title": "질문: 노란색 종량제 쓰레기봉투는 어디서 사나요? 편의점에서도 파나요?",
    "content": "원룸으로 이사 온 지 3일 됐는데 일반 쓰레기는 어떤 봉투에 버려야 하나요? 편의점 가서 종량제 봉투 달라고 하면 주나요?",
    "images": [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 화성시",
    "industrial_zone": "hwaseong",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "질문: 노란색 종량제 쓰레기봉투는 어디서 사나요? 편의점에서도 파나요?",
        "content": "원룸으로 이사 온 지 3일 됐는데 일반 쓰레기는 어떤 봉투에 버려야 하나요? 편의점 가서 종량제 봉투 달라고 하면 주나요?"
      },
      "vi": {
        "title": "Hỏi: Mua túi rác tính phí màu vàng ở đâu? Ở cửa hàng tiện lợi có bán không?",
        "content": "Tôi mới chuyển đến căn hộ studio được 3 ngày, rác thông thường thì phải vứt vào loại túi nào? Nếu ra cửa hàng tiện lợi hỏi mua túi rác tính phí (jongnyangje) thì họ có bán không?"
      },
      "zh": {
        "title": "提问：黄色的垃圾袋（按量收费）在哪里买？便利店有卖吗？",
        "content": "我刚搬到单间 (One-room) 3天，普通垃圾应该用什么袋子扔？去便利店要按量收费垃圾袋 (종량제 봉투) 的话会卖给我吗？"
      },
      "en": {
        "title": "Question: Where can I buy yellow pay-as-you-go trash bags? Do convenience stores sell them?",
        "content": "It's been 3 days since I moved into a studio apartment. What kind of bag should I use for general trash? If I go to a convenience store and ask for a standard garbage bag (jongnyangje bag), will they sell me one?"
      },
      "ja": {
        "title": "質問：黄色のごみ袋（指定ごみ袋）はどこで買えますか？コンビニでも売っていますか？",
        "content": "ワンルームに引っ越してきて3日目ですが、一般ごみはどんな袋に捨てればいいですか？コンビニに行って指定ごみ袋をくださいと言えば買えますか？"
      },
      "ru": {
        "title": "Вопрос: Где купить желтые мусорные пакеты для регулируемого сбора? Продаются ли они в круглосуточных магазинах?",
        "content": "Я переехал в однокомнатную квартиру (원룸) 3 дня назад. В каких пакетах нужно выбрасывать обычный мусор? Если я пойду в круглосуточный магазин (편의점) и попрошу пакет для мусора (종량제 봉투), мне его продадут?"
      },
      "th": {
        "title": "คำถาม: ถุงขยะสีเหลืองแบบคิดตามปริมาณซื้อได้ที่ไหน? ร้านสะดวกซื้อมีขายไหม?",
        "content": "ย้ายมาอยู่ห้องสตูดิโอ (원룸) ได้ 3 วันแล้ว ขยะทั่วไปต้องทิ้งใส่ถุงแบบไหนครับ/ค่ะ? ถ้าไปร้านสะดวกซื้อแล้วขอซื้อถุงขยะมาตรฐาน (จงนยังเจ) เขาจะมีขายไหมครับ/ค่ะ?"
      },
      "uz": {
        "title": "Savol: Sariq chiptali (hajmiga qarab to'lanadigan) chiqindi xaltasini qayerdan sotib olsa bo'ladi? Do'konlarda ham sotiladimi?",
        "content": "Bir xonali uyga (wonroom) ko'chib o'tganimga 3 kun bo'ldi, oddiy chiqindilarni qanday xaltaga tashlash kerak? Qulaylik do'koniga (convenience store) borib chiqindi xaltasi so'rasam berishadimi?"
      },
      "km": {
        "title": "សំណួរ៖ តើអាចទិញថង់សំរាមបង់ប្រាក់តាមទំហំពណ៌លឿងនៅឯណា? តើនៅហាងទំនិញងាយស្រួលមានលក់ទេ?",
        "content": "ខ្ញុំទើបតែរើមកនៅបន្ទប់ស្ទូឌីយោ (One-room) បាន ៣ ថ្ងៃ តើតម្រូវឱ្យបោះសំរាមទូទៅក្នុងថង់ប្រភេទណា? ប្រសិនបើខ្ញុំទៅហាងទំនិញងាយស្រួល ហើយសុំទិញថង់សំរាមបង់ប្រាក់ តើគេមានលក់ឱ្យទេ?"
      },
      "mn": {
        "title": "Асуулт: Шаардлагатай шар өнгийн хогны уутыг хаанаас авах вэ? Тохилог дэлгүүрт зардаг уу?",
        "content": "Нэг өрөө байранд нүүж ирээд 3 хонож байна. Энгийн хогийг ямар уутанд хийж хаях ёстой вэ? Тохилог дэлгүүр (convenience store) орж хогны уут авъя гэвэл зарах уу?"
      },
      "ne": {
        "title": "प्रश्न: पहेंलो रङको फोहोर फाल्ने झोला (Pay-as-you-go bag) कहाँ किन्न सकिन्छ? सुविधा पसल (Convenience store) मा पनि पाइन्छ?",
        "content": "म वान-रूम (Studio apartment) मा सारेको ३ दिन भयो, साधारण फोहोर कस्तो झोलामा फाल्नुपर्छ? सुविधा पसलमा गएर फोहोर फाल्ने झोला (Jongnyangje bag) मागेमा पाइन्छ?"
      },
      "id": {
        "title": "Pertanyaan: Di mana bisa membeli kantong sampah berbayar warna kuning? Apakah dijual di minimarket?",
        "content": "Saya baru 3 hari pindah ke kamar studio (one-room). Sampah umum harus dibuang memakai kantong yang mana? Jika saya ke minimarket dan minta kantong sampah berbayar (jongnyangje), apakah mereka menjualnya?"
      },
      "my": {
        "title": "မေးခွန်း- အဝါရောင် အမှိုက်အိတ် (ခါးစည်းအမှိုက်အိတ်) ကို ဘယ်မှာဝယ်လို့ရလဲ။ စတိုးဆိုင်တွေမှာရော ရောင်းပါသလား။",
        "content": "ဝမ်းရူးမ် (Studio) ကို ပြောင်းလာတာ ၃ ရက်ရှိပါပြီ။ အထွေထွေအမှိုက်ကို ဘယ်လိုအိတ်နဲ့ စွန့်ပစ်ရမလဲ။ စတိုးဆိုင်ကိုသွားပြီး အမှိုက်အိတ်တောင်းရင် ရောင်းပေးပါသလား။"
      },
      "si": {
        "title": "ප්‍රශ්නය: කහ පැහැති කැළිකසළ බෑග් (Pay-as-you-go garbage bag) මිලදී ගත හැක්කේ කොහෙන්ද? පහසුකම් සැපයුම් පාරිභෝගික සැල්වල (Convenience store) ද විකුණනවාද?",
        "content": "මම Studio කාමරයකට පදිංචියට ඇවිත් දින 3ක් වෙනවා, සාමාන්‍ය කැළිකසළ දැමිය යුත්තේ කවර ආකාරයේ බෑගයකටද? Convenience store එකකට ගොස් කැළිකසළ බෑගයක් (Jongnyangje bag) ඉල්ලුවොත් දෙයිද?"
      },
      "kk": {
        "title": "Сұрақ: Сары түсті қоқыс пакеттерін қайдан сатып алуға болады? Шағын маркеттерде сатыла ма?",
        "content": "Бір бөлмелі пәтерге (원룸) көшіп келгеніме 3 күн болды, әдеттегі қоқысты қандай пакетке тастау керек? Шағын маркетке барып қоқыс пакетін сұрасам, сата ма?"
      },
      "bn": {
        "title": "প্রশ্ন: হলুদ রঙের পে-অ্যাজ-ইউ-গো বর্জ্য ব্যাগ কোথায় কিনতে পাওয়া যায়? কনভিনিয়েন্স স্টোরেও কি পাওয়া যায়?",
        "content": "ওয়ান-রুম (স্টুডিও) ফ্ল্যাটে শিফট করার ৩ দিন হলো, সাধারণ ময়লা কোন ব্যাগে ফেলা উচিত? কনভিনিয়েন্স স্টোরে গিয়ে বর্জ্য ফেলার ব্যাগ (Jongnyangje bag) চাইলে কি দেবে?"
      },
      "ur": {
        "title": "سوال: پیلے رنگ کا کوڑے دان کا تھیلا (Pay-as-you-go trash bag) کہاں سے ملتا ہے؟ کیا سہولت اسٹور (Convenience store) پر بھی ملتا ہے؟",
        "content": "مجھے اسٹوڈیو اپارٹمنٹ (One-room) میں شفٹ ہوئے 3 دن ہوئے ہیں، عام کوڑا کس تھیلے میں پھینکنا چاہیے؟ اگر میں سہولت اسٹور جا کر کوڑے کا تھیلا مانگوں تو کیا وہ دیں گے؟"
      },
      "tl": {
        "title": "Tanong: Saan nakakabili ng kulay dilaw na pay-as-you-go trash bag? May tinitinda rin ba sa convenience store?",
        "content": "3 araw pa lang mula nang lumipat ako sa studio unit (one-room), anong uri ng plastic bag ang dapat gamitin para sa ordinaryong basura? Kung pupunta ako sa convenience store at hihingi ng standard trash bag (jongnyangje), bibigyan/titindahan ba nila ako?"
      }
    },
    "like_count": 5,
    "cheer_count": 2,
    "comment_count": 3,
    "view_count": 89,
    "is_hidden": false,
    "created_at": "2026-08-23T01:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-4",
    "user_id": "user-th-04",
    "user_name": "방콕라이더",
    "user_country": "TH",
    "user_flag": "🇹🇭",
    "category": "food_mart",
    "title": "화성 향남 근처에 진짜 태국 향신료랑 두리안 파는 아시안 마트 추천합니다 🍲",
    "content": "향남읍 행정복지센터 건너편에 새로 생긴 아시안 마트 가봤는데 똠얌 페이스트랑 피쉬소스, 신선한 야채가 다 있네요! 사장님도 엄청 친절하셔서 추천드려요.",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 화성시",
    "industrial_zone": "hwaseong",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "화성 향남 근처에 진짜 태국 향신료랑 두리안 파는 아시안 마트 추천합니다 🍲",
        "content": "향남읍 행정복지센터 건너편에 새로 생긴 아시안 마트 가봤는데 똠얌 페이스트랑 피쉬소스, 신선한 야채가 다 있네요! 사장님도 엄청 친절하셔서 추천드려요."
      },
      "vi": {
        "title": "Gợi ý siêu thị châu Á bán gia vị Thái chính gốc và sầu riêng gần Hyangnam, Hwaseong 🍲",
        "content": "Tôi đã ghé thăm siêu thị châu Á mới mở đối diện Trung tâm Phúc lợi Hành chính Hyangnam-eup, ở đây có đủ xốt Tom Yum, nước mắm và rau củ tươi ngon! Chủ quán cũng rất thân thiện nên tôi thực sự đề xuất mọi người ghé qua."
      },
      "zh": {
        "title": "推荐华城香南附近出售正宗泰国香料和榴莲的亚洲超市 🍲",
        "content": "去了一趟香南邑行政福利中心对面新开的亚洲超市，冬阴功膏、鱼露、新鲜蔬菜应有尽有！老板也很热情，非常推荐大家去看看。"
      },
      "en": {
        "title": "Highly recommend this Asian mart near Hyangnam, Hwaseong selling authentic Thai spices and durian 🍲",
        "content": "I visited a newly opened Asian mart across from the Hyangnam-eup Administrative Welfare Center, and they have Tom Yum paste, fish sauce, and fresh vegetables! The owner is super friendly, so I highly recommend it."
      },
      "ja": {
        "title": "華城・香南（ヒャンナム）近くの本物タイスパイスとドリアンが買えるアジアンマートをおすすめします 🍲",
        "content": "香南邑（ヒャンナムウプ）行政福祉センターの向かいに新しくできたアジアンマートに行ってきましたが、トムヤムペーストやナンプラー、新鮮な野菜が揃っています！店主さんもとても親切でおすすめです。"
      },
      "ru": {
        "title": "Рекомендую азиатский маркет недалеко от Хяннама в Хвасоне, где продаются настоящие тайские специи и дуриан 🍲",
        "content": "Посетил новый азиатский маркет напротив Центра административных и социальных услуг Хяннам-ып — там есть паста Том Ям, рыбный соус и свежие овощи! Владелец очень дружелюбный, всем рекомендую."
      },
      "th": {
        "title": "แนะนำเอเชียนมาร์ทแถวฮยางนัม ฮวาซอง ที่ขายเครื่องเทศไทยแท้และทุเรียน 🍲",
        "content": "ได้ไปลองเอเชียนมาร์ทเปิดใหม่ฝั่งตรงข้ามศูนย์สวัสดิการการบริหารฮยางนัมอึบมา มีทั้งพริกแกงต้มยำ น้ำปลา และผักสดครบเลย! เจ้าของร้านก็ใจดีและเป็นกันเองมาก แนะนำเลยครับ/ค่ะ"
      },
      "uz": {
        "title": "Xvason, Xyangnam yaqinida haqiqiy Tailand ziravorlari va durian sotadigan Osiyo do'konini tavsiya qilaman 🍲",
        "content": "Xyangnam-yup ma'muriy farovonlik markazi qarshisida yangi ochilgan Osiyo do'koniga borib ko'rdim, u yerda Tom Yum pastasi, baliq sousi va yangi sabzavotlar bor ekan! Do'kon egasi ham juda xushmuomala, tavsiya qilaman."
      },
      "km": {
        "title": "ណែនាំហាងអាស៊ីនៅជិត Hyangnam, Hwaseong ដែលលក់គ្រឿងទេសថៃពិតៗ និងទុរេន 🍲",
        "content": "ខ្ញុំបានទៅហាងអាស៊ីដែលទើបតែបើកថ្មីនៅទល់មុខមជ្ឈមណ្ឌលសង្គមកិច្ច Hyangnam-eup មានទាំងគ្រឿងត้มយាំ (Tom Yum), ទឹកត្រី និងបន្លែស្រស់ៗទាំងអស់! ម្ចាស់ហាងរាក់ទាក់ខ្លាំងណាស់ ដូច្នេះខ្ញុំសូមណែនាំ។"
      },
      "mn": {
        "title": "Хвасон Хяннамтай ойрхон жинхэнэ Тайланд амтлагч болон дуриан зардаг Ази дэлгүүрийг санал болгож байна 🍲",
        "content": "Хяннам-ып Захиргааны халамжийн төвийн эсрэг талд шинээр нээгдсэн Ази дэлгүүрээр орж үзлээ. Том Ям паста, загасны сүмс, шинэхэн ногоонууд бүгд байна! Эзэн нь маш эелдэг учраас заавал очиж үзэхийг санал болгож байна."
      },
      "ne": {
        "title": "ह्वासङ ह्याङनाम नजिकै वास्तविक थाई मसला र डुरियन बेच्ने एसियन मार्टको सिफारिस गर्दछु 🍲",
        "content": "ह्याङनाम-읍 प्रशासनिक कल्याण केन्द्रको पारिपट्टि भर्खरै खोलिएको एसियन मार्टमा गएको थिएँ, त्यहाँ तोम यम पेस्ट, फिस सस र ताजा तरकारीहरू सबै पाइन्छ! साहुजी पनि धेरै दयालु हुनुहुन्छ, त्यसैले म सिफारिस गर्दछु।"
      },
      "id": {
        "title": "Rekomendasi toko Asia dekat Hyangnam, Hwaseong yang menjual bumbu asli Thailand dan durian 🍲",
        "content": "Saya mengunjungi toko Asia yang baru buka di seberang Pusat Kesejahteraan Administratif Hyangnam-eup, di sana ada pasta Tom Yum, kecap ikan, dan sayuran segar! Pemiliknya juga sangat ramah, jadi saya sangat merekomendasikannya."
      },
      "my": {
        "title": "ဟွာဆောင်း၊ ဟျန်းနမ် အနီးရှိ ထိုင်းဟင်းခတ်အမွှေးအကြိုင်စစ်စစ်နှင့် ဒူးရင်းသီးရောင်းချသော အာရှမတ်ကို ညွှန်ပေးချင်ပါတယ် 🍲",
        "content": "ဟျန်းနမ်မြို့ အုပ်ချုပ်ရေးဝန်ဆောင်မှုစင်တာ မျက်နှာချင်းဆိုင်မှာ အသစ်ဖွင့်ထားတဲ့ အာရှမတ်ကို သွားကြည့်ခဲ့တယ်၊ တုံယမ်းနှစ်၊ ငံပြာရည်နဲ့ လတ်ဆတ်တဲ့ ဟင်းသီးဟင်းရွက်တွေ အကုန်ရှိပါတယ်! ဆိုင်ရှင်လည်း အရမ်းဖော်ရွေတာမို့ ညွှန်ပေးချင်ပါတယ်။"
      },
      "si": {
        "title": "හ්වාසොං හ්යංනම් අසල සැබෑ තායි කුළුබඩු සහ දුරියන් විකුණන ආසියානු මාර්ට් එකක් නිර්දේශ කරමි 🍲",
        "content": "හ්යංනම්-ඉයුප් පරිපාලන සුභසාධන මධ්‍යස්ථානය ඉදිරිපිට අලුතින් විවෘත කළ ආසියානු මාර්ට් එකට ගියා, එතැන ටොම් යම් පේස්ට්, මාළු සෝස් සහ නැවුම් එළවළු සියල්ලම තියෙනවා! අයිතිකරුත් ගොඩක් හිතකාමී නිසා මම නිර්දේශ කරනවා."
      },
      "kk": {
        "title": "Хвасон Хяннам маңындағы нағыз тай дәмдеуіштері мен дуриан сататын Азия маркетін ұсынамын 🍲",
        "content": "Хяннам-ып әкімшілік әлеуметтік орталығының қарсысында жаңадан ашылған Азия маркетіне барып қайттым. Онда Том Ям пастасы, балық соусы және жаңа піскен көкөністердің бәрі бар екен! Иесі де өте бауырмал, сондықтан баруға кеңес беремін."
      },
      "bn": {
        "title": "হুয়াসং হিয়াংনামের কাছে খাঁটি থাই মশলা এবং ডুরিয়ান বিক্রি করা এশিয়ান মার্টের সুপারিশ করছি 🍲",
        "content": "হিয়াংনাম-ইউপি প্রশাসনিক কল্যাণ কেন্দ্রের বিপরীতে নতুন খোলা এশিয়ান মার্টে গিয়েছিলাম, সেখানে টম ইয়াম পেস্ট, ফিশ সস এবং তাজা শাকসবজি সবই আছে! দোকানের মালিকও খুব অমায়িক, তাই সুপারিশ করছি।"
      },
      "ur": {
        "title": "ہواسونگ ہیانگ نام کے قریب اصل تھائی مصالحے اور ڈوریان بیچنے والی ایشیائی مارٹ کی تجویز 🍲",
        "content": "میں نے ہیانگ نام-اپ ایڈمنسٹریٹو ویلفیئر سینٹر کے سامنے کھلی نئی ایشیائی مارٹ کا دورہ کیا، وہاں ٹام یم پیسٹ، مچھلی کا ساس اور تازہ سبزیاں سب موجود ہیں! مالک بھی بہت ملنسار ہیں، اس لیے میں لازمی جانے کا مشورہ دیتا ہوں۔"
      },
      "tl": {
        "title": "Inirerekomenda ang Asian mart malapit sa Hyangnam, Hwaseong na nagbebenta ng totoong Thai spices at durian 🍲",
        "content": "Pumunta ako sa bagong bukas na Asian mart sa tapat ng Hyangnam-eup Administrative Welfare Center, mayroon silang Tom Yum paste, fish sauce, at mga sariwang gulay! Napakabait din ng may-ari kaya highly recommended ko ito."
      }
    },
    "like_count": 19,
    "cheer_count": 4,
    "comment_count": 5,
    "view_count": 172,
    "is_hidden": false,
    "created_at": "2026-08-22T19:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-5",
    "user_id": "user-uz-05",
    "user_name": "타슈켄트친구",
    "user_country": "UZ",
    "user_flag": "🇺🇿",
    "category": "visa",
    "title": "E-9 비자 근무처 변경할 때 고용센터에 필요한 서류 정리해드려요! 📄",
    "content": "얼마 전에 사업장 변경 신청하면서 직접 준비했던 서류들 공유합니다. 1) 사업장변경신청서, 2) 외국인등록증 앞뒤 복사본, 3) 표준근로계약서 사본, 4) 이전 회사 퇴사합의서(있을 경우). 고용센터 가실 때 아침 일찍 가시면 대기시간 없이 10분 만에 접수 가능해요! 궁금한 점 댓글 주세요.",
    "images": [
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 화성시",
    "industrial_zone": "hwaseong",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "E-9 비자 근무처 변경할 때 고용센터에 필요한 서류 정리해드려요! 📄",
        "content": "얼마 전에 사업장 변경 신청하면서 직접 준비했던 서류들 공유합니다. 1) 사업장변경신청서, 2) 외국인등록증 앞뒤 복사본, 3) 표준근로계약서 사본, 4) 이전 회사 퇴사합의서(있을 경우). 고용센터 가실 때 아침 일찍 가시면 대기시간 없이 10분 만에 접수 가능해요! 궁금한 점 댓글 주세요."
      },
      "vi": {
        "title": "Tổng hợp các giấy tờ cần thiết nộp cho Trung tâm Việc làm khi đổi nơi làm việc cho visa E-9! 📄",
        "content": "Mình xin chia sẻ các giấy tờ mình đã tự chuẩn bị khi nộp đơn xin chuyển đổi nơi làm việc gần đây. 1) Đơn xin chuyển đổi nơi làm việc, 2) Bản sao hai mặt Thẻ cư trú người nước ngoài, 3) Bản sao Hợp đồng lao động chuẩn, 4) Thỏa thuận nghỉ việc ở công ty cũ (nếu có). Khi đến Trung tâm Việc làm, nếu đi vào sáng sớm thì có thể nộp xong trong 10 phút mà không phải chờ đợi! Bạn nào có thắc mắc cứ để lại bình luận nhé."
      },
      "zh": {
        "title": "整理了E-9签证变更工作地点时雇佣中心所需的材料！📄",
        "content": "分享一下前阵子申请变更工作场所时亲自准备的材料。1) 工作场所变更申请书，2) 外国人登录证正反面复印件，3) 标准劳动合同书复印件，4) 前公司离职协议书（如果有的话）。去雇佣中心时如果早点去，不用排队10分钟就能办理完毕！有什么疑问请留言。"
      },
      "en": {
        "title": "A list of required documents for the Job Center when changing workplaces on an E-9 visa! 📄",
        "content": "Sharing the documents I personally prepared when applying for a workplace change recently. 1) Application for Workplace Change, 2) Copy of Alien Registration Card (front and back), 3) Copy of Standard Labor Contract, 4) Resignation Agreement from the previous company (if applicable). If you go to the Job Center early in the morning, you can submit them in 10 minutes without any waiting time! Leave a comment if you have any questions."
      },
      "ja": {
        "title": "E-9ビザの勤務先変更時に雇用センターで必要な書類をまとめました！📄",
        "content": "先日、事業所変更の申請をした際に自分で準備した書類を共有します。1) 事業所変更申請書、2) 外国人登録証の表裏のコピー、3) 標準労働契約書のコピー、4) 前の会社の退職合意書（ある場合）。雇用センターに行く際は、朝早くに行くと待ち時間なしで10分で受付完了できますよ！気になることがあればコメントしてください。"
      },
      "ru": {
        "title": "Список документов для Центра занятости при смене места работы по визе E-9! 📄",
        "content": "Делюсь документами, которые сам подготавливал при подаче заявления на смену места работы не так давно. 1) Заявление на смену места работы, 2) Копия регистрационной карты иностранца (с обеих сторон), 3) Копия стандартного трудового договора, 4) Соглашение об увольнении с предыдущего места работы (при наличии). Если прийти в Центр занятости рано утром, можно подать документы всего за 10 минут без очереди! Если есть вопросы, пишите в комментариях."
      },
      "th": {
        "title": "รวบรวมเอกสารที่ต้องใช้ ณ ศูนย์จัดหางานเมื่อต้องการย้ายสถานที่ทำงานสำหรับวีซ่า E-9! 📄",
        "content": "ขอแบ่งปันเอกสารที่เตรียมไว้เองตอนยื่นขอเปลี่ยนสถานที่ทำงานเมื่อไม่นานมานี้ครับ/ค่ะ 1) ใบคำร้องขอเปลี่ยนสถานที่ทำงาน, 2) สำเนาบัตรทะเบียนคนต่างด้าว (หน้า-หลัง), 3) สำเนาสัญญาจ้างงานมาตรฐาน, 4) หนังสือยินยอมให้ลาออกจากบริษัทเดิม (ถ้ามี) ถ้าไปศูนย์จัดหางานตั้งแต่เช้าตรู่ จะสามารถยื่นเรื่องได้ภายใน 10 นาทีโดยไม่ต้องรอคิวเลยครับ/ค่ะ! มีข้อสงสัยอะไรสอบถามในคอมเมนต์ได้เลยนะ"
      },
      "uz": {
        "title": "E-9 vizasi bilan ish joyini oʻzgartirishda Bandlik markaziga kerakli hujjatlar roʻyxati! 📄",
        "content": "Yaqinda ish joyimni oʻzgartirish uchun ariza topshirganimda oʻzim tayyorlagan hujjatlarni ulashaman. 1) Ish joyini oʻzgartirish haqida ariza, 2) Ajnabiy ID kartasi (ARC) old va orqa tomoni nusxasi, 3) Standart mehnat shartnomasi nusxasi, 4) Oldingi kompaniyadan ishdan boʻshash haqida kelishuv hujjati (agar boʻlsa). Bandlik markaziga ertalab barvaqt borsangiz, navbatsiz 10 daqiqada topshirib chiqishingiz mumkin! Savollaringiz boʻlsa, izohlarda qoldiring."
      },
      "km": {
        "title": "រៀបចំឯកសារចាំបាច់សម្រាប់មជ្ឈមណ្ឌលការងារពេលផ្លាស់ប្តូរកន្លែងធ្វើការសម្រាប់ទិដ្ឋាការ E-9! 📄",
        "content": "ខ្ញុំសូមចែករំលែកឯកសារដែលខ្ញុំបានរៀបចំដោយផ្ទាល់ពេលដាក់ពាក្យសុំផ្លាស់ប្តូរកន្លែងធ្វើការកាលពីពេលថ្មីៗនេះ។ ១) ពាក្យសុំផ្លាស់ប្តូរកន្លែងធ្វើការ, ២) កូពីកាតពលកររដ្ធបាលបរទេស (មុខ និងក្រោយ), ៣) កូពីកិច្ចសន្យាការងារស្តង់ដារ, ៤) លិខិតព្រមព្រៀងលាឈប់ពីក្រុមហ៊ុនចាស់ (ប្រសិនបើមាន)។ ប្រសិនបើអ្នកទៅមជ្ឈមណ្ឌលការងារនៅព្រឹកព្រលឹម អ្នកអាចដាក់ពាក្យបានក្នុងរយៈពេល ១០ នាទីដោយមិនបាច់រង់ចាំជួរឡើយ! បើមានចម្ងល់សូមខំមិនសួរបាន។"
      },
      "mn": {
        "title": "E-9 визээр ажлын байраа сольход Хөдөлмөрийн төвд шаардлагатай бичиг баримтуудыг эмхэтгэж өгье! 📄",
        "content": "Сүүлд ажлын байр солих хүсэлт гаргахдаа өөрөө бэлдэж байсан бичиг баримтуудаа хуваалцаж байна. 1) Ажлын байр солих өргөдөл, 2) Гадаадын иргэний үнэмлэхний урд болон ард талын хуулбар, 3) Стандарт хөдөлмөрийн гэрээний хуулбар, 4) Өмнөх компанийн ажлаас гарах зөвшилцлийн бичиг (байгаа бол). Хөдөлмөрийн төв рүү өглөө эрт очвол дугаарлах шаардлагагүй 10 минутын дотор материалаа өгөх боломжтой! Асуух зүйл байвал сэтгэгдэл үлдээгээрэй."
      },
      "ne": {
        "title": "E-9 भिसामा काम गर्ने ठाउँ (कार्यस्थल) परिवर्तन गर्दा रोजगारी केन्द्रमा चाहिने कागजातहरू! 📄",
        "content": "भर्खरै कार्यस्थल परिवर्तनको आवेदन दिँदा मैले आफैंले तयार पारेका कागजातहरू सेयर गर्दैछु। १) कार्यस्थल परिवर्तन आवेदन फारम, २) विदेशी दर्ता कार्डको अगाडि र पछाडिको फोटोकपी, ३) मानक श्रम सम्झौताको प्रतिलिपि, ४) अघिल्लो कम्पनीको राजीनामा सहमति पत्र (भएमा)। रोजगारी केन्द्र जाँदा बिहानै छिटो जानुभयो भने पर्खनु नपरी १० मिनेटमै दर्ता गर्न सकिन्छ! केही सोध्नुपरेमा कमेन्ट गर्नुहोस्।"
      },
      "id": {
        "title": "Rangkuman dokumen yang dibutuhkan di Pusat Ketenagakerjaan saat pindah tempat kerja visa E-9! 📄",
        "content": "Saya bagikan dokumen yang saya siapkan sendiri saat mengajukan permohonan pindah tempat kerja baru-baru ini. 1) Formulir permohonan pindah tempat kerja, 2) Fotokopi Kartu Registrasi Orang Asing (ARC) depan & belakang, 3) Fotokopi Kontrak Kerja Standar, 4) Surat Kesepakatan Berhenti Kerja dari perusahaan sebelumnya (jika ada). Jika Anda pergi ke Pusat Ketenagakerjaan pagi-pagi sekali, Anda bisa mendaftar hanya dalam waktu 10 menit tanpa harus mengantre! Silakan tinggalkan komentar jika ada pertanyaan."
      },
      "my": {
        "title": "E-9 ဗီဇာ အလုပ်နေရာပြောင်းရွှေ့သည့်အခါ အလုပ်အကိုင်ဌာနတွင် လိုအပ်သော စာရွက်စာတမ်းများ စုစည်းပေးထားပါတယ်! 📄",
        "content": "မကြာသေးမီက အလုပ်နေရာပြောင်းရွှေ့လျှောက်ထားစဉ်က ကိုယ်တိုင်ပြင်ဆင်ခဲ့သော စာရွက်စာတမ်းများကို မျှဝေပေးလိုက်ပါတယ်။ ၁) အလုပ်နေရာပြောင်းရွှေ့လျှောက်လွှာ၊ ၂) နိုင်ငံခြားသားမှတ်ပုံတင်ကတ် ရှေ့ကျော မိတ္တူ၊ ၃) စံနှုန်းမီ အလုပ်အကိုင်စာချုပ် မိတ္တူ၊ ၄) ယခင်ကုမ္ပဏီမှ အလုပ်ထွက်သဘောတူညီချက် (ရှိပါက)။ အလုပ်အကိုင်ဌာနသို့ သွားရောက်သည့်အခါ မနက်စောစောသွားပါက စောင့်ဆိုင်းချိန်မလိုဘဲ ၁၀ မိနစ်အတွင်း လျှောက်ထားနိုင်ပါတယ်! သိလိုသည်များကို ကွန်မန့်ပေးခဲ့ပါ။"
      },
      "si": {
        "title": "E-9 වීසා මඟින් රැකියා ස්ථානය වෙනස් කිරීමේදී රැකියා මධ්‍යස්ථානයට අවශ්‍ය ලේඛන මෙන්න! 📄",
        "content": "මෑතකදී මගේ රැකියා ස්ථානය වෙනස් කිරීමට අයදුම් කිරීමේදී මමම සූදානම් කළ ලේඛන බෙදා ගනිමි. 1) රැකියා ස්ථානය වෙනස් කිරීමේ අයදුම්පත, 2) විදේශික ලියාපදිංචි කාඩ්පතේ (ARC) දෙපැත්තේම පිටපතක්, 3) සම්මත සේවක ගිවිසුමේ පිටපතක්, 4) පෙර සමාගමේ ඉල්ලා අස්වීමේ ගිවිසුම (තිබේ නම්). රැකියා මධ්‍යස්ථානයට උදෙන්ම ගියහොත් පෝලිමේ නොසිට මිනිත්තු 10 කින් භාර දිය හැක! ඔබට කිසියම් ප්‍රශ්නයක් ඇත්නම් කමෙන්ට් කරන්න."
      },
      "kk": {
        "title": "E-9 визасымен жұмыс орнын ауыстырғанда Жұмыспен қамту орталығына қажетті құжаттар тізімі! 📄",
        "content": "Жақында жұмыс орнымды ауыстыруға өтініш бергенде өзім дайындаған құжаттарды бөлісемін. 1) Жұмыс орнын ауыстыру туралы өтініш, 2) Шетелдік азаматтың тіркеу картасының (ARC) екі жағының көшірмесі, 3) Стандартты еңбек шартының көшірмесі, 4) Бұрынғы компаниядан жұмыстан босату туралы келісім (бар болса). Жұмыспен қамту орталығына таңертең ерте барсаңыз, кезексіз 10 минутта тапсырып үлгересіз! Сұрақтарыңыз болса, пікір қалдырыңыз."
      },
      "bn": {
        "title": "E-9 ভিসায় কর্মসংস্থান পরিবর্তন করার সময় জব সেন্টারে প্রয়োজনীয় কাগজপত্রের তালিকা! 📄",
        "content": "সম্প্রতি কাজের স্থান পরিবর্তনের আবেদন করার সময় আমি নিজে যেসব কাগজপত্র প্রস্তুত করেছিলাম তা শেয়ার করছি। ১) কর্মসংস্থান পরিবর্তনের আবেদনপত্র, ২) এলিয়েন রেজিস্ট্রেশন কার্ডের (ARC) উভয় পিঠের ফটোকপি, ৩) স্ট্যান্ডার্ড লেবার কন্ট্রাক্টের ফটোকপি, ৪) পূর্ববর্তী কোম্পানির পদত্যাগ চুক্তিপত্র (যদি থাকে)। জব সেন্টারে সকাল সকাল গেলে কোন অপেক্ষা ছাড়াই ১০ মিনিটের মধ্যে জমা দেওয়া সম্ভব! কোনো প্রশ্ন থাকলে কমেন্ট করুন।"
      },
      "ur": {
        "title": "E-9 ویزا پر کام کی جگہ تبدیل کرتے وقت جاب سینٹر کے لیے ضروری دستاویزات کی تفصیلات! 📄",
        "content": "حال ہی میں کام کی جگہ کی تبدیلی کی درخواست دیتے وقت میں نے خود جو دستاویزات تیار کی تھیں، وہ شیئر کر رہا ہوں۔ 1) کام کی جگہ کی تبدیلی کی درخواست، 2) ایلین رجسٹریشن کارڈ (ARC) کے دونوں اطراف کی کاپی، 3) اسٹینڈرڈ لیبر کنٹریکٹ کی کاپی، 4) پچھلی کمپنی کا استعفیٰ کا معاہدہ (اگر موجود ہو)۔ اگر اپ جاب سینٹر صبح جلدی جائیں تو بغیر انتظار کیے صرف 10 منٹ میں جمع کروا سکتے ہیں! اگر کوئی سوال ہو تو کمنٹ کریں۔"
      },
      "tl": {
        "title": "Mga kailangan na dokumento sa Job Center kapag magpapalit ng lugar ng trabaho gamit ang E-9 visa! 📄",
        "content": "Ibinabahagi ko ang mga dokumentong inihanda ko mismo noong nag-apply ako para magpalit ng workplace kamakailan. 1) Application Form for Workplace Change, 2) Kopya ng Alien Registration Card (harap at likod), 3) Kopya ng Standard Labor Contract, 4) Resignation Agreement mula sa dating kumpanya (kung mayroon). Kapag pumunta ka sa Job Center nang maagang-maaga, maaari kang makapag-submit sa loob lamang ng 10 minuto nang walang hintayan! Mag-iwan ng komento kung may mga tanong ka."
      }
    },
    "like_count": 28,
    "cheer_count": 12,
    "comment_count": 7,
    "view_count": 310,
    "is_hidden": false,
    "created_at": "2026-08-22T15:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-6",
    "user_id": "user-kh-06",
    "user_name": "프놈펜스마일",
    "user_country": "KH",
    "user_flag": "🇰🇭",
    "category": "friends",
    "title": "천안 신부동 근처 주말에 같이 배드민턴이나 풋살 찰 외국인 친구들 모여요 🏸",
    "content": "주말마다 기숙사에만 있으니 몸도 찌뿌둥하고 답답해서 글 올립니다. 천안종합운동장이나 신부동 근처 체육공원에서 가볍게 배드민턴 치거나 풋살 하실 분 계신가요? 실력 상관없이 땀 흘리면서 친목 다져요! 라켓 없으시면 빌려드립니다.",
    "images": [
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "충남 천안시",
    "industrial_zone": "cheonan",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "천안 신부동 근처 주말에 같이 배드민턴이나 풋살 찰 외국인 친구들 모여요 🏸",
        "content": "주말마다 기숙사에만 있으니 몸도 찌뿌둥하고 답답해서 글 올립니다. 천안종합운동장이나 신부동 근처 체육공원에서 가볍게 배드민턴 치거나 풋살 하실 분 계신가요? 실력 상관없이 땀 흘리면서 친목 다져요! 라켓 없으시면 빌려드립니다."
      },
      "vi": {
        "title": "Tìm bạn nước ngoài cùng chơi cầu lông hoặc futsal vào cuối tuần quanh khu vực Sinbu-dong, Cheonan 🏸",
        "content": "Tôi đăng bài này vì ở trong ký túc xá suốt cuối tuần làm người mệt mỏi và tù túng quá. Có ai muốn chơi cầu lông nhẹ nhàng hoặc đá futsal ở Sân vận động Cheonan hoặc công viên thể thao gần Sinbu-dong không? Không quan trọng trình độ, hãy cùng vận động đổ mồ hôi và kết bạn nhé! Nếu không có vợt thì mình sẽ cho mượn."
      },
      "zh": {
        "title": "招募周末在天安新埠洞附近一起打羽毛球或踢室内足球的外籍朋友 🏸",
        "content": "每到周末都呆在宿舍里，感觉浑身僵硬又闷得慌，所以发这个帖子。有人想在天安综合运动场或新埠洞附近的体育公园轻松打打羽毛球或踢踢室内足球吗？水平不限，大家一起流汗交朋友吧！没有球拍的话我可以借给您。"
      },
      "en": {
        "title": "Looking for foreign friends to play badminton or futsal together on weekends near Sinbu-dong, Cheonan 🏸",
        "content": "I'm posting this because staying in the dorm every weekend makes me feel stiff and frustrated. Anyone interested in playing a light game of badminton or futsal at Cheonan Complex Stadium or a sports park near Sinbu-dong? Skill level doesn't matter, let's sweat together and make friends! If you don't have a racket, I can lend you one."
      },
      "ja": {
        "title": "天安・新富洞（シンブドン）近くで週末にバドミントンやフットサルを一緒にする外国人のお友達募集 🏸",
        "content": "毎週末寮にばかりいて体が重く、気分転換したくて投稿しました。天安総合運動場や新富洞近くの体育公園で軽めにバドミントンやフットサルをする方はいらっしゃいませんか？上手下手に関係なく、汗を流しながら親睦を深めましょう！ラケットがない方はお貸しします。"
      },
      "ru": {
        "title": "Ищем иностранных друзей, чтобы вместе поиграть в бадминтон или футзал по выходным неподалеку от Синбу-дона, Чхонан 🏸",
        "content": "Пишу этот пост, потому что сидеть в общежитии каждые выходные скучно, и тело затекает. Есть ли желающие легко поиграть в бадминтон или футзал на стадионе Чхонан или в спортивном парке возле Синбу-дона? Уровень игры не имеет значения, давайте попотеем и подружимся! Если нет ракетки, я могу одолжить."
      },
      "th": {
        "title": "ชวนเพื่อนต่างชาติมาตีแบดหรือเตะฟุตซอลด้วยกันช่วงวันหยุดสุดสัปดาห์ แถวชินบูดง เมืองชอนอัน 🏸",
        "content": "ที่มาโพสต์เพราะอยู่แต่ในหอพักทุกวันหยุดแล้วรู้สึกเมื่อยล้าและอึดอัดครับ มีใครสนใจตีแบดมินตันเบาๆ หรือเตะฟุตซอลที่สนามกีฬา Cheonan Complex หรือสวนสาธารณะเล่นกีฬาแถวชินบูดงไหมครับ? ฝีมือไม่สำคัญ มาออกกำลังกายให้เหงื่อออกและทำความรู้จักกันครับ! ถ้าไม่มีไม้แบด ผมมีให้ยืมครับ"
      },
      "uz": {
        "title": "Chonan Sinbu-dong atrofida dam olish kunlari birgalikda badminton yoki futzal o'ynaydigan xorijlik do'stlar yig'ilamiz 🏸",
        "content": "Har dam olish kuni yotoqxonada o'tiraverib, a'zoi badanim qotib, zerikib ketganim uchun ushbu e'lonni joylayapman. Chonan sport majmuasi yoki Sinbu-dong atrofidagi sport parkida yengil badminton yoki futzal o'ynaydiganlar bormi? Mahorat muhim emas, birga terlab, do'stlashaylik! Raketkangiz bo'lmasa, berib turaman."
      },
      "km": {
        "title": "ស្វែងរកមិត្តភក្តិបរទេសលេងវាយសី ឬហ្វុតសាលជុំគ្នានៅចុងសប្តាហ៍ ក្បែរតំបន់ Sinbu-dong, Cheonan 🏸",
        "content": "ខ្ញុំផុសនេះដោយសារតែនៅតែក្នុងអន្តេវាសិកដ្ឋានរាល់ចុងសប្តាហ៍ ធ្វើឱ្យរាងកាយស្ពឹកស្រពន់และធុញថប់។ តើមានអ្នកណាចង់លេងវាយសីស្រាលៗ ឬលេងហ្វុតសាលនៅកីឡដ្ឋាន Cheonan Complex Stadium ឬសួនកីឡាក្បែរ Sinbu-dong ទេ? មិនប្រកាន់កម្រិតសមត្ថភាពទេ មកហាត់ប្រាណបញ្ចេញញើស និងរាប់អានមិត្តភក្តិទាំងអស់គ្នា! បើគ្មានរ៉ាកែតទេ ខ្ញុំមានឱ្យខ្ចី។"
      },
      "mn": {
        "title": "Чонан Шинбү-дон орчим амралтын өдрүүдээр бадминтон эсвэл футзал хамт тоглох гадаад найзуудыг хайж байна 🏸",
        "content": "Амралтын өдөр бүр дотуур байранд байхаар бие хөшөөд, уйтгартай байдаг болохоор энэ бичвэрийг үлдээж байна. Чонан цогцолбор цэнгэлдэх хүрээлэн эсвэл Шинбү-дон орчмын спортын паркт хөнгөхөн бадминтон эсвэл футзал тоглох хүн байна уу? Ур чадвар хамаарахгүй, хамтдаа хөлсөө гаргаж, найзлууцгаая! Ракет байхгүй бол зээлж өгнө өө."
      },
      "ne": {
        "title": "Cheonan Sinbu-dong नजिकै सप्ताहन्तमा ब्याडमिन्टन वा फुटसल खेल्न विदेशी साथीहरू जम्मा हऔं 🏸",
        "content": "हरेक सप्ताहन्त होस्टेलमा मात्र बस्दा शरीर आलस्य र गुम्सिएको जस्तो भएर यो पोस्ट गरेको हुँ। Cheonan Complex Stadium वा Sinbu-dong नजिकैको खेलकुद पार्कमा हल्का ब्याडमिन्टन वा फुटसल खेल्ने कोही हुनुहुन्छ? खेलको स्तर जस्तो भए पनि फरक पर्दैन, सँगै पसिना बगाउँदै साथी बनौं! र्याकेट छैन भने म सापटी दिनेछु।"
      },
      "id": {
        "title": "Kumpul yuk teman-teman asing untuk main bulu tangkis atau futsal bareng di akhir pekan sekitar Sinbu-dong, Cheonan 🏸",
        "content": "Saya membuat postingan ini karena terus-terusan di asrama setiap akhir pekan membuat tubuh terasa pegal dan bosan. Ada yang mau main bulu tangkis santai atau futsal di Stadion Kompleks Cheonan atau taman olahraga dekat Sinbu-dong? Tidak masalah tingkat kemampuannya, mari berkeringat bersama dan berteman! Jika tidak punya raket, saya bisa pinjamkan."
      },
      "my": {
        "title": "ချောနန်း၊ ဆင်ဘူဒေါင်း အနီးတွင် စနီးတနင်္ဂနွေ၌ ကြက်တောင် သို့မဟုတ် ဖူဆယ် အတူကစားရန် နိုင်ငံခြားသားသူငယ်ချင်းများ စုဝေးကြစို့ 🏸",
        "content": "စနေတနင်္ဂနွေတိုင်း အဆောင်မှာပဲရှိနေလို့ ခန္ဓာကိုယ် ညောင်းညာပြီး ပျင်းရိနေတာကြောင့် ဒီပိုစ့်ကို တင်လိုက်တာပါ။ ချောနန်း အားကစားကွင်း သို့မဟုတ် ဆင်ဘူဒေါင်း အနီးရှိ အားကစားပန်းခြံမှာ ကြက်တောင် သို့မဟုတ် ဖူဆယ် ပေါ့ပေါ့ပါးပါး ကစားချင်သူများ ရှိပါသလား။ ကျွမ်းကျင်မှုမလိုပါဘူး၊ ချွေးထွက်အောင် ဆော့ရင်း ခင်မင်ရင်းနှီးမှု ယူကြရအောင်။ ရက်ကက်မရှိရင် ငှားပေးပါ့မယ်။"
      },
      "si": {
        "title": "Cheonan Sinbu-dong ආසන්නයේ සති අන්තයේ බැඩ්මින්ටන් හෝ ෆුට්සල් සෙල්ලම් කිරීමට විදේශීය යහළුවන් එකතු වෙමු 🏸",
        "content": "සෑම සති අන්තයකම නවාතැන්පොළේ පමණක් සිටින විට ශරීරයට අසනීප ගතියක් සහ පාලු බවක් දැනෙන නිසා මෙසේ සටහන් තබමි. Cheonan Stadium හෝ Sinbu-dong ආසන්නයේ ඇති ක්‍රීඩා උද්‍යානයේ සැහැල්ලුවෙන් බැඩ්මින්ටන් හෝ ෆුට්සල් සෙල්ලම් කිරීමට කැමති අය සිටීද? දක්ෂතාවය අදාළ නැත, එකට මහන්සි වී ක්‍රීඩා කර මිතුරු වෙමු! රැකට් නැත්නම් මම ලබා දෙන්නම්."
      },
      "kk": {
        "title": "Чхонан Синбу-дон маңында демалыс күндері бадминтон немесе футзал ойнайтын шетелдік достар жинаймыз 🏸",
        "content": "Әр демалыс сайын жатақханада отыра берген соң денем сіресіп, ішім пысқан соң осы жазбаны қалдырып отырмын. Чхонан спорт кешенінде немесе Синбу-дон маңындағы спорт саябағында бадминтон немесе футзал ойнағысы келетіндер бар ма? Шеберлік деңгейі маңызды емес, бірге терлеп, достасайық! Ракеткаңыз болмаса, бере тұрамын."
      },
      "bn": {
        "title": "ছেনান শিনবু-দং এর কাছে উইকেন্ডে ব্যাডমিন্টন বা ফুটসাল খেলার জন্য বিদেশী বন্ধুরা চলে আসুন 🏸",
        "content": "প্রতি উইকেন্ডে হোস্টেলে বসে থাকতে থাকতে শরীর জমে যাচ্ছে আর একঘেয়ে লাগছে, তাই এই পোস্টটি করছি। ছেনান স্পোর্টস কমপ্লেক্স বা শিনবু-দং এর কাছের স্পোর্টস পার্কে হালকা ব্যাডমিন্টন বা ফুটসাল খেলতে চান এমন কেউ আছেন? খেলার দক্ষতা যাই হোক সমস্যা নেই, চলুন একসাথে ঘাম ঝরিয়ে বন্ধুত্ব করি! র‍্যাকেট না থাকলে আমি ধার দেব।"
      },
      "ur": {
        "title": "چئونان شنبو ڈونگ کے قریب اختتام ہفتہ پر بیڈمنٹن یا فُٹسال کھیلنے کے لیے غیر ملکی دوست اکٹھے ہوں 🏸",
        "content": "ہر ویک اینڈ پر ہاسٹل میں رہنے کی وجہ سے جسم سست اور بوریت محسوس ہو رہی ہے اس لیے یہ پوسٹ کر رہا ہوں۔ کیا کوئی چئونان اسپورٹس کمپلیکس یا شنبو ڈونگ کے قریب اسپورٹس پارک میں بیڈمنٹن یا فُٹسال کھیلنا چاہتا ہے؟ کھیل کی مہارت کی کوئی بات نہیں، آئیں مل کر پسینہ بہائیں اور دوست بنیں! اگر ریکیٹ نہیں ہے تو میں دے دوں گا۔"
      },
      "tl": {
        "title": "Nagsasama-sama ang mga dayuhang kaibigan para maglaro ng badminton o futsal sa katapusan ng linggo malapit sa Sinbu-dong, Cheonan 🏸",
        "content": "Nag-post ako dahil pakiramdam ko ay naninigas at nababagot ang katawan ko sa paglagi lang sa dormitoryo tuwing katapusan ng linggo. May gusto bang maglaro ng badminton o futsal sa Cheonan Complex Stadium o sa sports park malapit sa Sinbu-dong? Kahit ano pa ang antas ng galing, sabay-sabay tayong magpawis at makipagkaibigan! Kung walang raket, papahiramin ko kayo."
      }
    },
    "like_count": 16,
    "cheer_count": 5,
    "comment_count": 4,
    "view_count": 142,
    "is_hidden": false,
    "created_at": "2026-08-22T11:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-7",
    "user_id": "user-id-07",
    "user_name": "자바섬형제",
    "user_country": "ID",
    "user_flag": "🇮🇩",
    "category": "food_mart",
    "title": "정왕동 시화공단 쪽에 인도네시아 삼발소스랑 할랄 식재료 파는 곳 어디가 제일 신선한가요? 🌶️",
    "content": "시화공단으로 이직해 온 지 2주 됐습니다. 기숙사에서 삼발 테라시랑 나시고렝 직접 해먹으려고 하는데 정왕시장 근처 아시안 마트 중에 할랄 닭고기랑 향신료 신선하게 파는 곳 추천 부탁드려요!",
    "images": [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 시흥시",
    "industrial_zone": "sihwa",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "정왕동 시화공단 쪽에 인도네시아 삼발소스랑 할랄 식재료 파는 곳 어디가 제일 신선한가요? 🌶️",
        "content": "시화공단으로 이직해 온 지 2주 됐습니다. 기숙사에서 삼발 테라시랑 나시고렝 직접 해먹으려고 하는데 정왕시장 근처 아시안 마트 중에 할랄 닭고기랑 향신료 신선하게 파는 곳 추천 부탁드려요!"
      },
      "vi": {
        "title": "Ở khu công nghiệp Sihwa, Jeongwang-dong, chỗ nào bán sốt sambal Indonesia và nguyên liệu Halal tươi ngon nhất ạ? 🌶️",
        "content": "Tôi mới chuyển đến làm việc ở khu công nghiệp Sihwa được 2 tuần. Tôi muốn tự nấu sambal terasi và nasi goreng ở ký túc xá, nhờ mọi người giới thiệu giúp siêu thị châu Á nào gần chợ Jeongwang bán thịt gà Halal và gia vị tươi ngon với ạ!"
      },
      "zh": {
        "title": "在正王洞西华工团附近，哪里的印度尼西亚辣酱（Sambal）和清真（Halal）食材最新鲜？🌶️",
        "content": "我跳槽到西华工团工作刚满两周。想在宿舍自己做Sambal Terasi（虾酱辣椒酱）和印尼炒饭（Nasi Goreng），求推荐正王市场附近卖新鲜清真鸡肉和香料的亚洲超市！"
      },
      "en": {
        "title": "Where is the best place near Jeongwang-dong / Sihwa Industrial Complex for the freshest Indonesian sambal sauce and halal ingredients? 🌶️",
        "content": "It's been 2 weeks since I started working at Sihwa Industrial Complex. I want to cook Sambal Terasi and Nasi Goreng in my dorm, so could anyone recommend an Asian market near Jeongwang Market that sells fresh halal chicken and spices?"
      },
      "ja": {
        "title": "正王洞（チョンワンドン）の正王市場・始華（シファ）工団近くで、インドネシアのサンバルソースやハラール食材が一番新鮮なお店はどこですか？🌶️",
        "content": "始華工団に転職して2週間になります。寮でサンバルテラシやナシゴレンを自分で作って食べようと思っているのですが、正王市場の近くにあるアジアンマートの中で、新鮮なハラール鶏肉やスパイスを売っているおすすめのお店を教えてください！"
      },
      "ru": {
        "title": "Где в районе Чонван-дон / промзоны Сихва самые свежие индонезийский соус самбал и халяльные продукты? 🌶️",
        "content": "Прошло 2 недели с тех пор, как я перешел на работу в промзону Сихва. Хочу сам приготовить самбал тераси и наси горенг в общежитии. Посоветуйте, пожалуйста, азиатский маркет недалеко от рынка Чонван, где продаются свежее халяльное куриное мясо и специи!"
      },
      "th": {
        "title": "แถวช็องวังดง/นิคมอุตสาหกรรมชีฮวา มีร้านไหนขายซอสซัมบัลอินโดนีเซียและวัตถุดิบฮาลาลสดที่สุดบ้างครับ? 🌶️",
        "content": "ย้ายมาทำงานที่นิคมอุตสาหกรรมชีฮวาได้ 2 สัปดาห์แล้วครับ อยากทำซัมบัลเทราซีกับนาซีโกเร็งกินเองที่หอพัก ช่วยแนะนำเอเชียมาร์เก็ตแถวตลาดช็องวังที่มีไก่ฮาลาลและเครื่องเทศสดๆ ขายหน่อยครับ!"
      },
      "uz": {
        "title": "Chongwang-dong Sihwa sanoat zonasi atrofida Indoneziya sambal sousi va halol masalliqlarni eng sarxil sotadigan joy qayerda? 🌶️",
        "content": "Sihwa sanoat zonasiga ishga o'tganimga 2 hafta bo'ldi. Yotoqxonada sambal terasi va nasi goreng pishirmoqchiman. Chongwang bozori yaqinidagi osiyo marketlaridan qaysi birida sarxil halol tovuq go'shti va ziravorlar sotiladi, tavsiya bera olasizmi?"
      },
      "km": {
        "title": "ຢູ່ម្ដុំ Jeongwang-dong / Sihwa Industrial Complex តើកន្លែងណាដែលលក់ទឹកជ្រលក់ Sambal អ៊ីនដូណេស៊ី និងគ្រឿងផ្សំ Halal ស្រស់ៗជាងគេ? 🌶️",
        "content": "ខ្ញុំបានផ្លាស់បដូរការងារមកធ្វើនៅ Sihwa Industrial Complex បាន ២សប្ដាហ៍ហើយ។ ខ្ញុំចង់ធ្វើ Sambal Terasi និង Nasi Goreng ញ៉ាំเองនៅអន្តេវាសិកដ្ឋាន សូមជួយណែនាំផ្សារអាស៊ីនៅជិតផ្សារ Jeongwang ដែលមានលក់សាច់មាន់ Halal និងគ្រឿងទេសស្រស់ៗផង!"
      },
      "mn": {
        "title": "Чонван-дон Шихва үйлдвэрийн бүс орчимд Индонезийн самбал соус болон халал хүнсний бүтээгдэхүүн хамгийн шинээр нь зардаг газар хаана байна вэ? 🌶️",
        "content": "Шихва үйлдвэрийн бүсэд ажилд ороод 2 долоо хонож байна. Дотуур байрандаа самбал тераси, наси горенг хийж идэх гэсэн юм. Чонван захын ойролцоох Ази дэлгүүрүүдээс шинэ халал тахианы мах, амтлагч зардаг газар санал болгож өгнө үү!"
      },
      "ne": {
        "title": "जङवाङ-दोङ सिह्वा औद्योगिक क्षेत्र वरपर इन्डोनेसियाली सम्बल सस र हलाल खाद्य सामग्री बिक्री गर्ने कुन ठाउँ सबैभन्दा ताजा छ? 🌶️",
        "content": "सिह्वा औद्योगिक क्षेत्रमा काम सरेको २ हप्ता भयो। होस्टेलमा आफैं सम्बल तेरासी र नासी गोरेङ बनाएर खान मन छ, जङवाङ बजार नजिकैका एसियन मार्टहरू मध्ये ताजा हलाल कुखुराको मासु र मसाला पाइने ठाउँ सिफारिस गरिदिनुहोला!"
      },
      "id": {
        "title": "Di daerah Jeongwang-dong / Kawasan Industri Sihwa, di mana ya tempat yang jual saus sambal Indonesia dan bahan makanan halal paling segar? 🌶️",
        "content": "Sudah 2 minggu sejak saya pindah kerja ke Kawasan Industri Sihwa. Mau coba masak Sambal Terasi dan Nasi Goreng sendiri di asrama, tolong rekomendasikan supermarket Asia dekat Pasar Jeongwang yang menjual daging ayam halal dan bumbu-bumbu segar ya!"
      },
      "my": {
        "title": "ဂျောင်ဝမ်ဒုန်း ဆီဟွာစက်မှုဇုန်ဘက်မှာ အင်ဒိုနီးရှား ဆမ်ဗာဆော့စ်နဲ့ ဟာလာလ်စားသောက်ကုန်တွေကို အလတ်ဆတ်ဆုံးရောင်းတဲ့နေရာ ဘယ်မှာလဲခဗျာ။ 🌶️",
        "content": "ဆီဟွာစက်မှုဇုန်ကို အလုပ်ပြောင်းလာတာ ၂ ပတ်ရှိပါပြီ။ အဆောင်မှာ ဆမ်ဗာ ထရာစီ နဲ့ နာစီဂိုရင်း ကိုယ်တိုင်ချက်စားမလို့မို့ ဂျောင်ဝမ်ဈေးအနီးနားက အာရှကုန်စုံဆိုင်တွေထဲမှာ ဟာလာလ် ကြက်သားနဲ့ ဟင်းခတ်အမွှေးအကြိုင်တွေကို လတ်လတ်ဆတ်ဆတ်ရောင်းတဲ့နေရာလေး ညွှန်းပေးကြပါဦး။"
      },
      "si": {
        "title": "ජොංවං-දොං සිහ්වා කාර්මික කලාපය අසල ඉන්දුනීසියානු සම්බල් සෝස් සහ හලාල් ආහාර ද්‍රව්‍ය වඩාත්ම නැවුම්ව විකුණන්නේ කොහේද? 🌶️",
        "content": "මම සිහ්වා කාර්මික කලාපයේ රැකියාවට ඇවිත් සති 2ක් වෙනවා. නවාතැන්පොළේදී සම්බල් තෙරාසි සහ නාසි ගෝරෙං තනිවම සාදාගෙන කන්න හදන්නේ. ජොංවං වෙළඳපොළ අසල තියෙන ආසියානු මාර්කට් අතුරින් නැවුම් හලාල් කුකුළු මස් සහ කුළුබඩු විකුණන තැනක් නිර්දේශ කරන්න පුළුවන්ද?"
      },
      "kk": {
        "title": "Чонван-дон Чихва өнеркәсіп аймағы жағында индонезиялық самбал соусы мен халал өнімдерін ең балғын күйінде сататын жер қайда? 🌶️",
        "content": "Чихва өнеркәсіп аймағына жұмысқа ауысқаныма 2 апта болды. Жатақханада самбал тераси мен наси горенг өзім жасап жейін деп едім, Чонван базары маңындағы азиялық дүкендердің ішінде балғын халал тауық еті мен дәмдеуіштер сататын жерді ұсына аласыздар ма?"
      },
      "bn": {
        "title": "জংওয়াং-দং সিহওয়া শিল্প এলাকা সংলগ্ন ইন্দোনেশিয়ান সাম্বাল সস এবং হালাল খাদ্যপণ্য সবচেয়ে তাজা কোথায় পাওয়া যায়? 🌶️",
        "content": "সিহওয়া শিল্প এলাকায় নতুন কাজে যোগ দেওয়ার ২ সপ্তাহ হলো। ডরমিটরিতে নিজে সাম্বাল তেরাসি এবং নাসি গোরেং রান্না করে খেতে চাই। জংওয়াং বাজারের কাছে কোন এশিয়ান মার্টে তাজা হালাল মুরগির মাংস এবং মশলা পাওয়া যায়, দয়া করে একটু সুপারিশ করবেন!"
      },
      "ur": {
        "title": "چونگ وانگ ڈونگ سیہوا انڈسٹریل زون کے قریب انڈونیشین سمبل ساس اور حلال اشیائے خوردونوش کہاں سب سے تازہ ملتی ہیں؟ 🌶️",
        "content": "مجھے سیہوا انڈسٹریل زون میں کام شروع کیے 2 ہفتے ہو گئے ہیں۔ ہاسٹل میں خود سمبل تراسی اور ناسی گورینگ بنانا چاہتا ہوں۔ برائے مہربانی چونگ وانگ مارکیٹ کے قریب کسی ایسے ایشین مارٹ کی تجویذ دیں جہاں تازہ حلال مرغی کا گوشت اور مصالحے ملتے ہوں!"
      },
      "tl": {
        "title": "Saan sa bandang Jeongwang-dong / Sihwa Industrial Complex ang may pinakasariwang Indonesian sambal sauce at halal ingredients? 🌶️",
        "content": "2 linggo na mula nang lumipat ako ng trabaho sa Sihwa Industrial Complex. Gusto kong magluto ng Sambal Terasi at Nasi Goreng sa dormitoryo, baka may mairerekomenda kayong Asian market malapit sa Jeongwang Market na nagtitinda ng sariwang halal chicken at mga pampalasa!"
      }
    },
    "like_count": 11,
    "cheer_count": 3,
    "comment_count": 5,
    "view_count": 98,
    "is_hidden": false,
    "created_at": "2026-08-22T07:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-8",
    "user_id": "user-mm-08",
    "user_name": "양곤의별",
    "user_country": "MM",
    "user_flag": "🇲🇲",
    "category": "daily_healing",
    "title": "첫 월급 받아서 고향 부모님께 송금해 드렸습니다. 뿌듯하고 가슴이 벅차네요 💌",
    "content": "한국에 입국해서 3교대 공장 일 시작한 지 꼭 한 달 만에 첫 월급 받았습니다. 월급 받자마자 부모님 생활비랑 동생 학비 먼저 송금해 드렸는데, 어머니께서 전화로 눈물 흘리시면서 고맙다고 하시네요. 타국에서 힘들지만 이 맛에 버티나 봅니다. 모두 건강 챙기면서 일하세요!",
    "images": [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "인천 남동구",
    "industrial_zone": "namdong",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "첫 월급 받아서 고향 부모님께 송금해 드렸습니다. 뿌듯하고 가슴이 벅차네요 💌",
        "content": "한국에 입국해서 3교대 공장 일 시작한 지 꼭 한 달 만에 첫 월급 받았습니다. 월급 받자마자 부모님 생활비랑 동생 학비 먼저 송금해 드렸는데, 어머니께서 전화로 눈물 흘리시면서 고맙다고 하시네요. 타국에서 힘들지만 이 맛에 버티나 봅니다. 모두 건강 챙기면서 일하세요!"
      },
      "vi": {
        "title": "Tôi đã nhận được khoản lương đầu tiên và chuyển tiền về cho bố mẹ ở quê. Thật tự hào và xúc động khôn xiết 💌",
        "content": "Đúng tròn một tháng kể từ khi sang Hàn Quốc và bắt đầu làm công việc 3 ca ở nhà máy, tôi đã nhận được khoản lương đầu tiên. Ngay khi nhận lương, tôi đã chuyển tiền sinh hoạt phí cho bố mẹ và học phí cho em trước. Mẹ tôi đã khóc qua điện thoại và nói lời cảm ơn. Dù vất vả ở xứ người, nhưng có lẽ chính cảm giác này giúp tôi cố gắng vươn lên. Chúc mọi người luôn giữ gìn sức khỏe khi làm việc nhé!"
      },
      "zh": {
        "title": "领到第一份薪水并汇给了老家的父母。感到无比自豪和感动 💌",
        "content": "来韩国开始工厂三班倒的工作整整一个月后，我领到了第一份薪水。一拿到工资，我就先给父母汇去了生活费，给弟妹汇去了学费。母亲在电话里流着泪向我道谢。虽然身在异国他乡很辛苦，但或许正是为了这一刻才坚持下来的吧。希望大家工作的同时也一定要保重身体！"
      },
      "en": {
        "title": "I got my first paycheck and sent money to my parents back home. I feel so proud and overwhelmed 💌",
        "content": "Exactly one month after entering Korea and starting my 3-shift factory job, I received my first paycheck. As soon as I got my salary, I sent money for my parents' living expenses and my sibling's tuition first. My mother cried over the phone and thanked me. It's tough working in a foreign country, but I guess this feeling makes it all worth it. Please take care of your health while working, everyone!"
      },
      "ja": {
        "title": "初任給をもらって実家の両親に送金しました。誇らしくて胸がいっぱいです 💌",
        "content": "韓国に入国して3交代の工場仕事を開始してからちょうど1ヶ月で、初任給をもらいました。給料をもらってすぐ、まず両親の生活費と弟・妹の学費を送金したのですが、母が電話で涙を流しながら「ありがとう」と言ってくれました。他国で大変ですが、この気持ちがあるから耐えられるのだと思います。皆さん、健康に気をつけてお仕事頑張ってください！"
      },
      "ru": {
        "title": "Получил первую зарплату и перевел деньги родителям на родину. Чувствую гордость и переполняющие эмоции 💌",
        "content": "Ровно через месяц после приезда в Корею и начала работы на заводе в три смены я получил свою первую зарплату. Как только получил деньги, первым делом перевел родителям на жизнь и младшему брату/сестре на учебу. Мама плакала по телефону и благодарила меня. Работать на чужбине нелегко, но, кажется, ради таких моментов стоит держаться. Берегите свое здоровье и берегите себя на работе!"
      },
      "th": {
        "title": "ได้รับเงินเดือนแรกและโอนเงินกลับบ้านให้พ่อแม่แล้วครับ รู้สึกภูมิใจและตื้นตันใจมาก 💌",
        "content": "หลังจากเดินทางมาถึงเกาหลีและเริ่มทำงานโรงงานแบบ 3 กะ ครบ 1 เดือนเต็ม ผมก็ได้รับเงินเดือนแรก ทันทีที่เงินเดือนออก ผมโอนค่าใช้จ่ายในชีวิตประจำวันให้พ่อแม่และค่าเทอมให้น้องก่อนเลย คุณแม่ร้องไห้ผ่านโทรศัพท์และบอกขอบคุณ การทำงานในต่างแดนมันเหนื่อย แต่คงเป็นเพราะความรู้สึกนี้มั้งครับที่ทำให้ทนสู้ต่อไปได้ ขอให้ทุกคนดูแลสุขภาพขณะทำงานด้วยนะครับ!"
      },
      "uz": {
        "title": "Birinchi maoshimni olib, uyga - ota-onamga pul o'tkazdim. Juda faxrlanib, hayajonga tushdim 💌",
        "content": "Koreyaga kelib, zavodda 3 smenali ishni boshlaganimga rosa bir oy bo'lganda birinchi maoshimni oldim. Maosh olishim bilan eng avvalo ota-onamga ro'zg'or uchun va uka/singlimga o'qish pulini o'tkazdim. Onam telefonda yig'lab, rahmat aytdilar. O'zga yurtda qiyin, lekin mana shunday quvonchli daqiqalar uchun chidasa bo'ladi. Hamma sog'lig'ini asrab ishlasin!"
      },
      "km": {
        "title": "ទទួលបានប្រាក់ខែដំបូង ហើយបានផ្ញើជូនឪពុកម្តាយនៅស្រុកកំណើត។ មានអារម្មណ៍ថាមានមោទនភាព និងរំភើបញាប់ញ័រណាស់ 💌",
        "content": "បន្ទាប់ពីបានមកដល់ប្រទេសកូរ៉េ និងចាប់ផ្តើមធ្វើការរោងចក្រ ៣វេន បានរយៈពេលគត់មួយខែ ខ្ញុំទទួលបានប្រាក់ខែដំបូង។ ភ្លាមៗពេលទទួលបានប្រាក់ខែ ខ្ញុំបានផ្ញើប្រាក់ថ្លៃជីវភាពជូនឪពុកម្តាយ និងថ្លៃសិក្សារបស់ប្អូនមុនគេ។ ម្តាយរបស់ខ្ញុំបានយំតាមទូរស័ព្ទ ហើយពោលពាក្យអរគុណ។ ទោះបីជាលំបាកនៅក្រៅប្រទេស ប៉ុន្តែប្រហែលជាដោយសារអារម្មណ៍មួយនេះហើយដែលធ្វើឱ្យខ្ញុំអាចអត់ធ្មត់បាន។ សូមអ្នកទាំងអស់គ្នាថែរក្សាសុខភាពពេលធ្វើការផង!"
      },
      "mn": {
        "title": "Анхны цалингаа аваад нутагтаа байгаа аав ээждээ мөнгө явууллаа. Маш их бахархалтай, сэтгэл дүүрэн байна 💌",
        "content": "Солонгост ирээд үйлдвэрт 3 ээлжээр ажиллаж эхэлснээс хойш яг нэг сарын дараа анхны цалингаа авлаа. Цалингаа авмагцаа хамгийн түрүүнд аав ээжийн амьжиргааны зардал, дүүгийнхээ сургалтын төлбөрийг явуулсан чинь ээж маань утсаар ярихдаа баярын нулимс унагаж, баярлалаа гэж хэллээ. Хүний нутагт хэцүү ч гэсэн ийм л мэдрэмжийн төлөө тэсдэг байх даа. Бүрэн эрүүл мэнддээ анхаарч ажиллаарай!"
      },
      "ne": {
        "title": "पहिलो तलब पाएर गाउँका आमाबुबालाई पैसा पठाएँ। धेरै गर्व र खुसी लागेको छ 💌",
        "content": "कोरिया आएर कारखानामा ३ सिफ्टको काम सुरु गरेको ठ्याक्कै एक महिनामा मैले पहिलो तलब पाएँ। तलब पाउनेबित्तिकै मैले पहिले आमाबुबाको खर्च र भाइ/बहिनीको पढाइ खर्च पठाएँ। आमाले फोनमा रुँदै धन्यवाद भन्नुभयो। परदेशमा गाह्रो भए पनि सायद यस्तै खुसीको लागि सहन सकिँदो रहेछ। सबैजना स्वास्थ्यको ख्याल गर्दै काम गर्नुहोस्!"
      },
      "id": {
        "title": "Menerima gaji pertama dan mengirimkannya ke orang tua di kampung halaman. Sangat bangga dan terharu 💌",
        "content": "Tepat satu bulan setelah tiba di Korea dan mulai bekerja 3 shift di pabrik, saya menerima gaji pertama saya. Begitu menerima gaji, saya langsung mengirimkan uang biaya hidup untuk orang tua dan uang sekolah adik saya terlebih dahulu. Ibu saya menangis di telepon dan mengucapkan terima kasih. Meski sulit di negeri orang, rasanya perasaan inilah yang membuat saya bertahan. Semuanya, jaga kesehatan saat bekerja ya!"
      },
      "my": {
        "title": "ပထမဆုံး လစာရရှိပြီး နေရပ်က မိဘများထံ ငွေလွှဲပေးခဲ့ပါတယ်။ ဝမ်းသာဂုဏ်ယူမိပြီး ရင်ထဲမှာ အတိုင်းမသိ ကြည်နူးရပါတယ် 💌",
        "content": "ကိုရီးယားကို ရောက်ရှိပြီး စက်ရုံမှာ ၃ ဆိုင်းအလုပ် စတင်လုပ်ကိုင်ခဲ့တာ အတိအကျ ၁ လအကြာမှာ ပထမဆုံး လစာကို ရရှိခဲ့ပါတယ်။ လစာရရချင်း မိဘများရဲ့ စားဝတ်နေရေးစရိတ်နဲ့ ညီလေး/ညီမလေးရဲ့ ကျောင်းစရိတ်ကို အရင်ဆုံး လွှဲပေးခဲ့ရာ အမေက ဖုန်းထဲကနေ မျက်ရည်ကျရင်း ကျေးဇူးတင်တယ်လို့ ပြောပါတယ်။ တိုင်းတစ်ပါးမှာ ပင်ပန်းပေမဲ့ ဒီလိုကြည်နူးမှုကြောင့်ပဲ အလုပ်ကို အံ့တုနိုင်တာ ဖြစ်ပါလိမ့်မယ်။ အားလုံးပဲ ကျန်းမာရေးကို ဂရုစိုက်ပြီး အလုပ်လုပ်ကြပါနော်!"
      },
      "si": {
        "title": "මුල්ම පඩිය ලැබී මව්බිමේ සිටින දෙමාපියන්ට මුදල් යැව්වා. ගොඩක් ආඩම්බරයි වගේම හිත පිරී ගියා 💌",
        "content": "කොරියාවට පැමිණ කර්මාන්තශාලාවක ෂිෆ්ට් 3 ක රැකියාව ආරම්භ කර හරියටම මාසයකට පසු මට මගේ මුල්ම පඩිය ලැබුණා. පඩිය ලැබුණු වහාම මම මුලින්ම දෙමාපියන්ගේ ජීවන වියදම් සහ මල්ලීගේ/නංගීගේ අධ්‍යාපන ගාස්තු යැව්වා. අම්මා දුරකථනයෙන් අඬමින් මට ස්තූති කළා. පිටරටකදී වැඩ කිරීම අමාරු වුණත්, මේ වගේ සතුටක් නිසා මම විඳදරාගන්නවා වෙන්න ඇති. හැමෝම සෞඛ්‍යය ගැන සැලකිලිමත් වෙමින් වැඩ කරන්න!"
      },
      "kk": {
        "title": "Алғашқы жалақымды алып, ауылдағы ата-анама ақша жібердім. Мақтаныш пен толқыныс сезімі кернеп тұр 💌",
        "content": "Кореяға келіп, зауытта 3 ауысымды жұмысты бастағаныма тура бір ай болғанда алғашқы жалақымды алдым. Еңбекақыны ала салысымен, ең алдымен ата-анама тұрмыстық шығындарына және бауырыма оқу ақысына ақша аудардым. Анам телефонмен сөйлескенде көзіне жас алып, алғысын айтты. Бөтен елде қиын болса да, осындай сәттер үшін шыдауға болады екен. Бәріңіз денсаулықтарыңызды күтіп жұмыс істеңіздер!"
      },
      "bn": {
        "title": "প্রথম বেতন পেয়ে দেশের বাড়ির মা-বাবাকে টাকা পাঠালাম। খুব গর্বিত এবং আবেগপ্লুত লাগছে 💌",
        "content": "কোরিয়ায় এসে কারখানায় ৩ শিফটের কাজ শুরু করার ঠিক এক মাস পর আমি আমার প্রথম বেতন পেলাম। বেতন পাওয়ার সাথে সাথেই আগে মা-বাবার খরচের টাকা আর ছোট ভাই/বোনের পড়াশোনার খরচ পাঠালাম। মা ফোনে কাঁদতে কাঁদতে আমাকে ধন্যবাদ জানালেন। পরবাসে কষ্ট হলেও হয়তো এই অনুভূতির জন্যই সহ্য করা যায়। সবাই স্বাস্থ্যের যত্ন নিয়ে কাজ করবেন!"
      },
      "ur": {
        "title": "پہلی تنخواہ ملنے پر وطن میں موجود والدین کو رقم بھیج دی۔ بہت فخر اور دلی خوشی محسوس ہو رہی ہے 💌",
        "content": "کوریا آ کر فیکٹری میں 3 شفٹوں والی نوکری شروع کرنے کے ٹھیک ایک ماہ بعد مجھے میری پہلی تنخواہ ملی۔ تنخواہ ملتے ہی میں نے سب سے پہلے والدین کے اخراجات اور چھوٹے بہن/بھائی کی تعلیم کی فیس بھیجی۔ میری والدہ نے فون پر روتے ہوئے میرا شکریہ ادا کیا۔ پردیس میں مشکلات تو ہیں لیکن شاید اسی خوشی کے لیے انسان برداشت کرتا ہے۔ سب لوگ اپنی صحت کا خیال رکھتے ہوئے کام کریں!"
      },
      "tl": {
        "title": "Natanggap ko na ang unang sweldo ko at naipadala ko na sa mga magulang ko sa probinsya. Sobrang nakakapagmalaki at nakakataba ng puso 💌",
        "content": "Sakto isang buwan matapos kong dumating sa Korea at magsimula sa 3-shift na trabaho sa pabrika, natanggap ko ang aking unang sweldo. Pagkakuha na pagkakuha ko ng sweldo, ipinadala ko agad ang panggastos ng aking mga magulang at matrikula ng aking kapatid. Umiyak si nanay sa telepono at nagpasalamat sa akin. Mahirap man sa ibang bansa, mukhang dahil sa ganitong pakiramdam kaya nakakakaya rin. Mag-ingat po sa kalusugan ang lahat habang nagtatrabaho!"
      }
    },
    "like_count": 45,
    "cheer_count": 38,
    "comment_count": 9,
    "view_count": 412,
    "is_hidden": false,
    "created_at": "2026-08-22T03:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-9",
    "user_id": "user-cn-09",
    "user_name": "안산판다",
    "user_country": "CN",
    "user_flag": "🇨🇳",
    "category": "qna",
    "title": "질문: 건강보험 피부양자 등록할 때 가족관계증명서 아포스티유 공증 꼭 필요한가요? 🤔",
    "content": "F-4 비자로 회사 다니고 있는데 고향에 계신 부모님을 피부양자로 등록하려고 합니다. 국민건강보험공단 지사 방문 시 중국 가족관계증명서 원본에 외교부 인증 및 한국어 번역공증이 필수인가요? 최근에 등록해보신 선배님들 조언 부탁드립니다.",
    "images": [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 안산시",
    "industrial_zone": "ansan",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "질문: 건강보험 피부양자 등록할 때 가족관계증명서 아포스티유 공증 꼭 필요한가요? 🤔",
        "content": "F-4 비자로 회사 다니고 있는데 고향에 계신 부모님을 피부양자로 등록하려고 합니다. 국민건강보험공단 지사 방문 시 중국 가족관계증명서 원본에 외교부 인증 및 한국어 번역공증이 필수인가요? 최근에 등록해보신 선배님들 조언 부탁드립니다."
      },
      "vi": {
        "title": "Câu hỏi: Khi đăng ký người phụ thuộc bảo hiểm y tế, có bắt buộc phải công chứng Apostille Giấy chứng nhận quan hệ gia đình không? 🤔",
        "content": "Tôi đang đi làm bằng visa F-4 và muốn đăng ký cha mẹ ở quê nhà làm người phụ thuộc. Khi đến chi nhánh Tổng công ty Bảo hiểm Y tế Quốc gia (NHIS), bản gốc Giấy chứng nhận quan hệ gia đình Trung Quốc có bắt buộc phải có chứng nhận của Bộ Ngoại giao và công chứng dịch thuật sang tiếng Hàn không? Rất mong nhận được lời khuyên từ các tiền bối đã đăng ký gần đây."
      },
      "zh": {
        "title": "提问：在登记健康保险被扶养人时，家庭关系证明书必须办理海牙认证（Apostille）公证吗？🤔",
        "content": "我目前持F-4签证在公司上班，打算将老家的父母登记为被扶养人。去国民健康保险公团支社办理时，中国家庭关系证明书原件必须经过外交部认证及韩文翻译公证吗？希望最近办理过的前辈们能给予一些建议，谢谢！"
      },
      "en": {
        "title": "Question: Is Apostille notarization of the family relation certificate mandatory when registering a health insurance dependent? 🤔",
        "content": "I am currently working at a company on an F-4 visa and would like to register my parents in my home country as dependents. When visiting a branch of the National Health Insurance Service, are Ministry of Foreign Affairs authentication and Korean translation notarization mandatory for the original Chinese family relation certificate? I would appreciate advice from seniors who have registered recently."
      },
      "ja": {
        "title": "質問：健康保険の扶養家族登録をする際、家族関係証明書のアポスティーユ公証は必須ですか？🤔",
        "content": "F-4ビザで会社に勤務しており、実家にいる両親を扶養家族として登録しようと思っています。国民健康保険公団の支社を訪問する際、中国の家族関係証明書の原本に外務省認証および韓国語翻訳公証が必須でしょうか？最近登録された先輩方、アドバイスをお願いします。"
      },
      "ru": {
        "title": "Вопрос: Обязательна ли апостилированная нотариальная справка о семейном положении при регистрации иждивенца в системе медицинского страхования? 🤔",
        "content": "Я работаю в компании по визе F-4 и хочу зарегистрировать родителей, проживающих на родине, в качестве иждивенцев. Обязательно ли иметь заверение Министерства иностранных дел и нотариально заверенный перевод на корейский язык оригинала китайской справки о семейном положении при посещении отделения Национальной службы медицинского страхования? Буду благодарен за советы от тех, кто регистрировал недавно."
      },
      "th": {
        "title": "คำถาม: เวลาลงทะเบียนผู้อยู่ในอุปการะประกันสุขภาพ จำเป็นต้องมีการรับรองอัครสถานทูต (Apostille) โนตารีของใบรับรองความสัมพันธ์ครอบครัวหรือไม่? 🤔",
        "content": "ตอนนี้ฉันทำงานในบริษัทด้วยวีซ่า F-4 และต้องการลงทะเบียนพ่อแม่ที่บ้านเกิดเป็นผู้อยู่ในอุปการะครับ/ค่ะ เวลาไปติดต่อที่สาขาของสำนักงานประกันสุขภาพแห่งชาติ จำเป็นต้องมีการรับรองจากกระทรวงการต่างประเทศและการรับรองแปลเป็นภาษาเกาหลีสำหรับใบรับรองความสัมพันธ์ครอบครัวจีนฉบับจริงหรือไม่? ขอคำแนะนำจากรุ่นพี่ที่เคยลงทะเบียนเมื่อเร็วๆ นี้ด้วยครับ/ค่ะ"
      },
      "uz": {
        "title": "Savol: Tibbiy sug'urtada qaramog'idagi shaxs sifatida ro'yxatdan o'tishda oilaviy munosabatlar guvohnomasini apostil bilan tasdiqlash shartmi? 🤔",
        "content": "Men F-4 vizasi bilan kompaniyada ishlayman va vatanimda yashayotgan ota-onamni qaramog'imdagi shaxs sifatida ro'yxatdan o'tkazmoqchiman. Milliy tibbiy sug'urta korporatsiyasi filialiga tashrif buyurganimda, Xitoy oilaviy munosabatlar guvohnomasining asl nusxasi Tashqi ishlar vazirligi tasdig'i va koreys tiliga tarjima qilinib нотариус orqali tasdiqlanishi shartmi? Yaqinda ro'yxatdan o'tgan tajribali shaxslardan maslahat berishlarini so'rayman."
      },
      "km": {
        "title": "សំណួរ៖ តើចាំបាច់ត្រូវមានការបញ្ជាក់ Apostille លើលិខិតបញ្ជាក់ទំនាក់ទំនងគ្រួសារដែរឬទេ នៅពេលចុះឈ្មោះអ្នកនៅក្នុងបន្ទុកនៃធានារ៉ាប់រងសុខភាព? 🤔",
        "content": "ខ្ញុំកំពុងធ្វើការនៅក្រុមហ៊ុនមួយដោយប្រើទិដ្ឋាការ F-4 ហើយចង់ចុះឈ្មោះឪពុកម្តាយដែលនៅស្រុកកំណើតជាអ្នកនៅក្នុងបន្ទុក។ នៅពេលទៅកាន់សាខានៃអង្គភាពធានារ៉ាប់រងសុខភាពជាតិ តើចាំបាច់ត្រូវមានการបញ្ជាក់ពីក្រសួងការបរទេស និងការបកប្រែជាភាសាកូរ៉េដែលមានការបញ្ជាក់សារការីលើច្បាប់ដើមនៃលិខិតបញ្ជាក់ទំនាក់ទំនងគ្រួសារចិនដែរឬទេ? សូមបងៗដែលធ្លាប់ចុះឈ្មោះថ្មីៗនេះជួយផ្តល់ប្រឹក្សាផង។"
      },
      "mn": {
        "title": "Асуулт: Эрүүл мэндийн даатгалд асрамжид байгаа хүнээр бүртгүүлэхэд гэр бүлийн харилцааны тодорхойлолтыг Апостиль баталгаажуулалт хийлгэх шаардлагатай юу? 🤔",
        "content": "Би F-4 визээр компанид ажилладаг бөгөөд нутагтаа байгаа эцэг эхийгээ асрамжид байгаа хүнээр бүртгүүлэх гэж байгаа юм. Үндэсний эрүүл мэндийн даатгалын корпорацийн салбарт очиход Хятадын гэр бүлийн харилцааны тодорхойлолтын эх хувьд Гадаад харилцааны яамны соёрхол болон солонгос хэлний орчуулгын нотариат заавал шаардлагатай юу? Сүүлийн үед бүртгүүлсэн туршлагатай хүмүүс зөвлөгөө өгнө үү."
      },
      "ne": {
        "title": "प्रश्न: स्वास्थ्य बीमामा आश्रित व्यक्ति दर्ता गर्दा पारिवारिक सम्बन्ध प्रमाण पत्रको एपास्टिल (Apostille) प्रमाणीकरण अनिवार्य छ? 🤔",
        "content": "म F-4 भिसामा कम्पनीमा काम गर्दैछु र आफ्नो देशमा हुनुभएका आमाबाबुलाई आश्रितको रूपमा दर्ता गर्न चाहन्छु। राष्ट्रिय स्वास्थ्य बीमा निगमको शाखामा जाँदा चीनको पारिवारिक सम्बन्ध प्रमाण पत्रको मूल प्रतिमा परराष्ट्र मन्त्रालयको प्रमाणीकरण र कोरियन भाषा अनुवाद प्रमाणीकरण अनिवार्य छ? हालै दर्ता गर्नुभएका अग्रजहरूबाट सल्लाहको अपेक्षा गर्दछु।"
      },
      "id": {
        "title": "Pertanyaan: Saat mendaftarkan tanggungan asuransi kesehatan, apakah legalisasi Apostille untuk Surat Keterangan Hubungan Keluarga wajib dilakukan? 🤔",
        "content": "Saya bekerja di sebuah perusahaan dengan visa F-4 dan ingin mendaftarkan orang tua saya di kampung halaman sebagai tanggungan. Saat mengunjungi kantor cabang Badan Asuransi Kesehatan Nasional (NHIS), apakah konfirmasi Kementerian Luar Negeri dan legalisasi terjemahan bahasa Korea pada Surat Keterangan Hubungan Keluarga Tiongkok yang asli wajib ada? Mohon saran dari senior yang baru-baru ini mendaftar."
      },
      "my": {
        "title": "မေးခွန်း- ကျန်းမာရေးအာမခံမှီခိုသူအဖြစ် စာရင်းသွင်းသည့်အခါ မိသားစုဆက်နွယ်မှုထောက်ခံစာကို အေပိုစတေးလ် (Apostille) နိုတိုရီပြုလုပ်ရန် မဖြစ်မနေ လိုအပ်ပါသလား။ 🤔",
        "content": "ကျွန်တော်/မသည် F-4 ဗီဇာဖြင့် ကုမ္ပဏီတစ်ခုတွင် အလုပ်လုပ်နေပြီး ဇာတိမြေရှိ မိဘများကို မှီခိုသူအဖြစ် စာရင်းသွင်းလိုပါသည်။ အမျိုးသားကျန်းမာရေးအာမခံအဖွဲ့ခွဲသို့ သွားရောက်သည့်အခါ တရုတ်မိသားစုဆက်နွယ်မှုထောက်ခံစာ မူရင်းတွင် နိုင်ငံခြားရေးဝန်ကြီးဌာန အတည်ပြုချက်နှင့် ကိုရီးယားဘာသာပြန် နိုတိုရီ မဖြစ်မနေ လိုအပ်ပါသလား။ အသစ်စက်စက် စာရင်းသွင်းဖူးသည့် စီနီယာများ အကြံဉာဏ်ပေးကြပါဦး။"
      },
      "si": {
        "title": "ප්‍රශ්නය: සෞඛ්‍ය රක්ෂණයේ යැපෙන්නෙකු ලෙස ලියාපදිංචි වීමේදී පවුල් සබඳතා සහතිකයේ ඇපොස්ටිල් (Apostille) නීතිගත කිරීම අනිවාර්යද? 🤔",
        "content": "මම F-4 වීසා බලපත්‍රයෙන් සමාගමක සේවය කරන අතර මව් රටේ සිටින මගේ දෙමාපියන් යැපෙන්නන් ලෙස ලියාපදිංචි කිරීමට අවශ්‍යයි. ජාතික සෞඛ්‍ය රක්ෂණ සංස්ථාවේ ශාඛාවට යන විට චීන පවුල් සබඳතා සහතිකයේ මුල් පිටපත සඳහා විදේශ කටයුතු අමාත්‍යාංශයේ සහතිකය සහ කොරියානු පරිවර්තන නීතිගත කිරීම අනිවාර්යද? මෑතකදී ලියාපදිංචි වූ ජ්‍යෙෂ්ඨයින්ගෙන් උපදෙස් බලාපොරොත්තු වෙමි."
      },
      "kk": {
        "title": "Сұрақ: Медициналық сақтандыруға асырауындағы адамды тіркеу кезінде Отбасылық қатынастар туралы анықтаманың Апостиль нотариалды куәландыруы міндетті ме? 🤔",
        "content": "Мен F-4 визасымен компанияда жұмыс істеймін және туған жерімдегі ата-анамды асырауымдағы адам ретінде тіркегім келеді. Ұлттық медициналық сақтандыру корпорациясының филиалына барған кезде, Қытайдың отбасылық қатынастар туралы анықтамасының түпнұсқасына Сыртқы істер министрлігінің растауы мен кәріс тіліне аудармасының нотариалды куәландыруы міндетті ме? Жақында тіркелген тәжірибелі адамдардан кеңес күтемін."
      },
      "bn": {
        "title": "প্রশ্ন: স্বাস্থ্য বীমায় নির্ভরশীল হিসেবে নিবন্ধন করার সময় পারিবারিক সম্পর্ক সনদের অ্যাপোস্টিল (Apostille) নোটারাইজেশন কি বাধ্যতামূলক? 🤔",
        "content": "আমি F-4 ভিসায় একটি কোম্পানিতে কাজ করছি এবং নিজ দেশে থাকা বাবা-মাকে নির্ভরশীল হিসেবে নিবন্ধন করতে চাই। জাতীয় স্বাস্থ্য বীমা কর্পোরেশনের শাখায় যাওয়ার সময়, চায়নিজ পারিবারিক সম্পর্ক সনদের মূল কপিতে পররাষ্ট্র মন্ত্রণালয়ের সত্যায়ন এবং কোরিয়ান অনুবাদের নোটারাইজেশন কি বাধ্যতামূলক? সম্প্রতি নিবন্ধন করেছেন এমন অভিজ্ঞদের পরামর্শ কামনা করছি।"
      },
      "ur": {
        "title": "سوال: ہیلتھ انشورنس میں زیر کفالت شخص کے طور پر اندراج کرتے وقت خاندانی تعلقات کے سرٹیفکیٹ کی اپوسٹائل (Apostille) نوٹری کروانا ضروری ہے؟ 🤔",
        "content": "میں F-4 ویزا پر ایک کمپنی میں کام کر رہا ہوں اور اپنے وطن میں موجود والدین کو زیر کفالت کے طور پر درج کروانا چاہتا ہوں۔ نیشنل ہیلتھ انشورنس کارپوریشن کی برانچ میں جاتے وقت، کیا چینی خاندانی تعلقات کے سرٹیفکیٹ کی اصل کاپی پر وزارت خارجہ کی تصدیق اور کورین ترجمے کی نوٹری ضروری ہے؟ حال ہی میں اندراج کروانے والے سینئرز سے مشورے کی درخواست ہے۔"
      },
      "tl": {
        "title": "Tanong: Kailangan ba talaga ng Apostille notarization sa Family Relation Certificate kapag nagpaparehistro ng dependent sa health insurance? 🤔",
        "content": "Nagtatrabaho ako sa isang kumpanya gamit ang F-4 visa at gusto kong irehistro ang aking mga magulang sa aming bayan bilang mga dependent. Kapag pumunta sa branch ng National Health Insurance Service, obligado ba ang Ministry of Foreign Affairs authentication at Korean translation notarization sa orihinal na Chinese family relation certificate? Hihingi po sana ako ng payo sa mga nakapagparehistro kamakailan."
      }
    },
    "like_count": 8,
    "cheer_count": 3,
    "comment_count": 4,
    "view_count": 115,
    "is_hidden": false,
    "created_at": "2026-08-21T22:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-10",
    "user_id": "user-ph-10",
    "user_name": "마닐라프렌드",
    "user_country": "PH",
    "user_flag": "🇵🇭",
    "category": "friends",
    "title": "수원역 근처에서 주말에 따뜻하게 커피 마시면서 영어-한국어 대화 나눌 친구 구해요 ☕",
    "content": "안녕하세요! 수원 제조업체에서 일하는 마크입니다. 한국 온 지 1년 정도 되었는데 한국어 회화 실력을 더 늘리고 싶어요. 주말에 수원역 AK플라자나 인계동 카페에서 편하게 수다 떨면서 한국어 가르쳐주실 한국 친구나 영어 교환하고 싶으신 분 언제든 연락주세요!",
    "images": [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 수원시",
    "industrial_zone": "suwon",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "수원역 근처에서 주말에 따뜻하게 커피 마시면서 영어-한국어 대화 나눌 친구 구해요 ☕",
        "content": "안녕하세요! 수원 제조업체에서 일하는 마크입니다. 한국 온 지 1년 정도 되었는데 한국어 회화 실력을 더 늘리고 싶어요. 주말에 수원역 AK플라자나 인계동 카페에서 편하게 수다 떨면서 한국어 가르쳐주실 한국 친구나 영어 교환하고 싶으신 분 언제든 연락주세요!"
      },
      "vi": {
        "title": "Tìm bạn trò chuyện tiếng Anh - tiếng Hàn vừa uống cà phê ấm áp gần ga Suwon vào cuối tuần ☕",
        "content": "Xin chào! Tôi là Mark, đang làm việc tại một công ty sản xuất ở Suwon. Tôi đến Hàn Quốc được khoảng 1 năm rồi và muốn cải thiện kỹ năng giao tiếp tiếng Hàn của mình. Nếu bạn là người bạn Hàn Quốc có thể dạy tiếng Hàn cho tôi trong khi trò chuyện thoải mái tại quán cà phê ở AK Plaza Ga Suwon hoặc Ingye-dong vào cuối tuần, hoặc muốn trao đổi ngôn ngữ tiếng Anh, hãy liên hệ với tôi bất cứ lúc nào nhé!"
      },
      "zh": {
        "title": "寻找周末在水原站附近一起喝杯热咖啡、用英韩双语交流的朋友 ☕",
        "content": "你好！我是马克，在水原的一家制造业公司工作。我来韩国大约一年了，想进一步提高我的韩语口语水平。如果您愿意在周末在水原站AK Plaza或仁溪洞的咖啡馆里轻松聊天并教我韩语，或者想和我进行语言交换（韩语-英语），请随时与我联系！"
      },
      "en": {
        "title": "Looking for a friend to chat in English & Korean over warm coffee near Suwon Station on weekends ☕",
        "content": "Hello! I'm Mark, working at a manufacturing company in Suwon. I've been in Korea for about a year and want to improve my Korean speaking skills. If you're a Korean friend who can teach me Korean while casually chatting at a cafe around Suwon Station AK Plaza or Ingye-dong on weekends, or if you want to do a language exchange with English, feel free to contact me anytime!"
      },
      "ja": {
        "title": "水原駅近くで週末に温かいコーヒーを飲みながら英語・韓国語で話せる友達募集 ☕",
        "content": "こんにちは！水原の製造業で働いているマークです。韓国に来て約1年になりますが、韓国語の会話力をもっと伸ばしたいと思っています。週末に水原駅のAKプラザや仁渓洞（インゲドン）のカフェで気楽におしゃべりしながら韓国語を教えてくださる韓国人の友達や、英語の言語交換をしたい方は、いつでもご連絡ください！"
      },
      "ru": {
        "title": "Ищу друга, чтобы попить горячий кофе и пообщаться на английском и корейском языках по выходным недалеко от станции Сувон ☕",
        "content": "Здравствуйте! Меня зовут Марк, я работаю в производственной компании в Сувоне. Я в Корее около года и хочу улучшить свои навыки разговорного корейского языка. Если вы корейский друг, который может научить меня корейскому языку за непринужденной беседой в кафе в AK Plaza у станции Сувон или в Инге-доне по выходным, или если вы хотите заниматься языковым обменом (английский-корейский), свяжитесь со мной в любое время!"
      },
      "th": {
        "title": "หาเพื่อนคุยภาษาอังกฤษ-เกาหลี พร้อมจิบกาแฟอุ่นๆ แถวสถานีซูวอนในวันเสาร์-อาทิตย์ ☕",
        "content": "สวัสดีครับ! ผมมาร์ก ทำงานอยู่ที่บริษัทผู้ผลิตในซูวอนครับ มาอยู่เกาหลีได้ประมาณ 1 ปีแล้ว และอยากเก่งทักษะการพูดภาษาเกาหลีมากขึ้นครับ หากคุณเป็นเพื่อนคนเกาหลีที่สามารถสอนภาษาเกาหลีให้ผมได้แบบเป็นกันเองที่คาเฟ่แถว AK Plaza สถานีซูวอน หรืออินเกดง ในวันเสาร์-อาทิตย์ หรือสนใจแลกเปลี่ยนภาษาอังกฤษ ติดต่อมาได้ตลอดเวลาเลยนะครับ!"
      },
      "uz": {
        "title": "Dam olish kunlari Suvon bekati yaqinida issiq kofe ichib, ingliz va koreys tillarida suhbatlashadigan do'st qidiryapman ☕",
        "content": "Salom! Men Suvondagi ishlab chiqarish kompaniyasida ishlaydigan Markman. Koreyaga kelganimga taxminan 1 yil bo'ldi va koreys tilida so'zlashuv mahoratimni oshirmoqchiman. Dam olish kunlari Suvon bekati AK Plaza yoki Ingye-dong dagi kafeda erkin suhbatlashib, koreys tilini o'rgatadigan koreyalik do'stlar yoki ingliz tili almashinuvi qilishni xohlaydiganlar istalgan vaqtda bog'lanishlari mumkin!"
      },
      "km": {
        "title": "ស្វែងរកមិត្តភក្តិជជែកភាសាអង់គ្លេស-កូរ៉េ និងញ៉ាំកាហ្វេក្តៅៗនៅជិតស្ថានីយ Suwon នៅចុងសប្តាហ៍ ☕",
        "content": "ជម្រាបសួរ! ខ្ញុំឈ្មោះ Mark ធ្វើការនៅក្រុមហ៊ុនផលិតកម្មមួយនៅ Suwon។ ខ្ញុំមកកូរ៉េបានប្រហែល ១ ឆ្នាំហើយ ហើយខ្ញុំចង់អភិវឌ្ឍជំនាញនិយាយភាសាកូរ៉េបន្ថែមទៀត។ ប្រសិនបើអ្នកជាមិត្តភក្តិជនជាតិកូរ៉េដែលអាចបង្រៀនភាសាកូរ៉េដល់ខ្ញុំ ខណៈពេលជជែកលេងកម្សាន្តនៅហាងកាហ្វេ AK Plaza ស្ថានីយ Suwon ឬ Ingye-dong នៅចុងសប្តាហ៍ ឬចង់ផ្លាស់ប្តូរភាសាអង់គ្លេស សូមទាក់ទងមកខ្ញុំបានគ្រប់ពេលវេលា!"
      },
      "mn": {
        "title": "Амралтын өдрүүдэд Сүвон буудлын ойролцоо халуун кофе ууж, англи-солонгос хэлээр ярилцах найз хайж байна ☕",
        "content": "Сайн байцгаана уу! Би Сүвон дахь үйлдвэрлэлийн компанид ажилладаг Марк байна. Солонгост ирээд 1 жил орчим болж байгаа бөгөөд солонгос хэлний ярианы чадвараа сайжруулмаар байна. Амралтын өдрүүдэд Сүвон буудлын AK Plaza эсвэл Инге-донгийн кофе шопод тухтай ярилцаж, солонгос хэл зааж өгөх солонгос найз эсвэл англи хэлний солилцоо хийхийг хүссэн хүмүүс хэзээ ч хамаагүй холбогдоорой!"
      },
      "ne": {
        "title": "हप्ताको अन्त्यमा सुवोन स्टेशन नजिकै तातो कफी पिउँदै अंग्रेजी-कोरियन कुराकानी गर्ने साथी खोज्दैछु ☕",
        "content": "नमस्ते! म सुवोनको एक उत्पादन कम्पनीमा काम गर्ने मार्क हुँ। म कोरिया आएको करिब १ वर्ष भयो र आफ्नो कोरियन भाषा बोल्ने क्षमता अझ बढाउन चाहन्छु। हप्ताको अन्त्यमा सुवोन स्टेशन AK प्लाजा वा इंग्ये-डोङको क्याफेमा सहज रूपमा कुराकानी गर्दै कोरियन भाषा सिकाउन सक्ने कोरियन साथी वा अंग्रेजी भाषा साटासाट गर्न चाहने जो कोहीले जुनसुकै बेला सम्पर्क गर्नुहोला!"
      },
      "id": {
        "title": "Cari teman untuk mengobrol bahasa Inggris-Korea sambil minum kopi hangat di dekat Stasiun Suwon pada akhir pekan ☕",
        "content": "Halo! Saya Mark, bekerja di sebuah perusahaan manufaktur di Suwon. Saya sudah berada di Korea sekitar satu tahun dan ingin meningkatkan kemampuan percakapan bahasa Korea saya. Jika Anda adalah teman Korea yang bisa mengajari saya bahasa Korea sambil santai mengobrol di kafe sekitar AK Plaza Stasiun Suwon atau Ingye-dong pada akhir pekan, atau ingin melakukan pertukaran bahasa Inggris, silakan hubungi saya kapan saja!"
      },
      "my": {
        "title": "စနေ၊ တနင်္ဂနွေနေ့များတွင် ဆူဝန်းဘူတာအနီး ကော်ဖီပူပူလေးသောက်ရင်း အင်္ဂလိပ်-ကိုရီးယား စကားပြောရန် သူငယ်ချင်းရှာနေပါသည် ☕",
        "content": "မင်္ဂလာပါ! ကျွန်တော်က ဆူဝန်းရှိ ထုတ်လုပ်ရေးကုမ္ပဏီတစ်ခုမှာ အလုပ်လုပ်နေတဲ့ Mark ဖြစ်ပါတယ်။ ကိုရီးယားကို ရောက်တာ ၁ နှစ်လောက်ရှိပြီဖြစ်ပြီး ကိုရီးယားစကားပြောစွမ်းရည်ကို ပိုမိုတိုးတက်ချင်ပါတယ်။ စနေ၊ တနင်္ဂနွေနေ့တွေမှာ ဆူဝန်းဘူတာ AK Plaza သို့မဟုတ် Ingye-dong ကဖေးမှာ လွတ်လပ်စွာ စကားပြောရင်း ကိုရီးယားဘာသာစကား သင်ပေးနိုင်တဲ့ ကိုရီးယားသူငယ်ချင်း သို့မဟုတ် အင်္ဂလိပ်ဘာသာစကား လဲလှယ်ချင်သူများ မည်သည့်အချိန်မဆို ဆက်သွယ်နိုင်ပါတယ်!"
      },
      "si": {
        "title": "සති අන්තයේ සුවොන් දුම්රිය ස්ථානය අසල උණුසුම් කෝපි බොමින් ඉංග්‍රීසි-කොරියානු සංවාදයේ යෙදීමට මිතුරෙකු සොයමි ☕",
        "content": "ආයුබෝවන්! මම සුවොන් හි නිෂ්පාදන සමාගමක සේවය කරන මාක්. මම කොරියාවට පැමිණ වසරක් පමණ වන අතර මගේ කොරියානු කතා කිරීමේ හැකියාව තවදුරටත් වර්ධනය කර ගැනීමට අවශ්‍යයි. සති අන්තයේ සුවොන් දුම්රිය ස්ථානයේ AK ප්ලාසා හෝ ඉන්ග්‍යේ-දොං කැෆේ එකක සැහැල්ලුවෙන් කතාබහ කරමින් මට කොරියානු භාෂාව ඉගැන්විය හැකි කොරියානු මිතුරෙකු හෝ ඉංග්‍රීසි භාෂා හුවමාරුවක් කිරීමට කැමති ඕනෑම අයෙකු ඕනෑම වේලාවක මාව සම්බන්ධ කරගන්න!"
      },
      "kk": {
        "title": "Демалыс күндері Сувон станциясының жанында ыстық кофе ішіп, ағылшын-корей тілдерінде сөйлесетін дос іздеймін ☕",
        "content": "Сәлеметсіз бе! Мен Сувондағы өндірістік компанияда жұмыс істейтін Маркпін. Кореяға келгеніме 1 жылдай болды, корей тілінде сөйлесу дағдыларымды жақсартқым келеді. Демалыс күндері Сувон станциясының AK Plaza немесе Инге-дон кафесінде еркін сөйлесіп, корей тілін үйрететін кореялық дос немесе ағылшын тілімен алмасуды қалайтындар кез келген уақытта хабарласа алады!"
      },
      "bn": {
        "title": "ছুটির দিনে সুওন স্টেশনের কাছে গরম কফি খেতে খেতে ইংরেজি-কোরিয়ান কথোপকথন করার মতো বন্ধু খুঁজছি ☕",
        "content": "হ্যালো! আমি মার্ক, সুওনের একটি ম্যানুফ্যাকচারিং কোম্পানিতে কাজ করি। কোরিয়াতে এসেছি প্রায় ১ বছর হলো এবং আমি আমার কোরিয়ান কথোপকথনের দক্ষতা আরও বাড়াতে চাই। ছুটির দিনে সুওন স্টেশন একে প্লাজা বা ইনগিয়ে-দং-এর কোনো ক্যাফেতে স্বাচ্ছন্দ্যে আড্ডা দেওয়ার সাথে সাথে আমাকে কোরিয়ান শেখাতে পারেন এমন কোনো কোরিয়ান বন্ধু বা ইংরেজি ভাষা বিনিময় করতে চাইলে যেকোনো সময় যোগাযোগ করুন!"
      },
      "ur": {
        "title": "ویک اینڈ پر سیوون اسٹیشن کے قریب گرم کافی پیتے ہوئے انگریزی-کورین میں بات چیت کرنے کے لیے دوست کی تلاش ہے ☕",
        "content": "ہیلو! میں مارک ہوں، سیوون میں ایک مینوفیکچرنگ کمپنی میں کام کرتا ہوں۔ مجھے کوریا آئے ہوئے تقریبا 1 سال ہو گیا ہے اور میں اپنی کورین بول چال کی مہارت کو بہتر بنانا چاہتا ہوں۔ اگر آپ ویک اینڈ پر سیوون اسٹیشن AK پلازہ یا انگئے ڈونگ کے کسی کیفے میں آرام سے گپ شپ کرتے ہوئے مجھے کورین سکھا سکتے ہیں یا انگریزی کا تبادلہ کرنا چاہتے ہیں تو کسی بھی وقت مجھ سے رابطہ کریں!"
      },
      "tl": {
        "title": "Naghahanap ng kaibigan na makakausap sa Ingles at Koreano habang umiinom ng mainit na kape malapit sa Suwon Station ngayong weekend ☕",
        "content": "Kumusta! Ako si Mark, nagtatrabaho sa isang manufacturing company sa Suwon. Halos 1 taon na ako sa Korea at gusto ko pang pagbutihin ang aking kakayahan sa pagsasalita ng Koreano. Kung isa kang Koreanong kaibigan na pwedeng magturo sa akin ng Koreano habang kaswal na nagkukuwentuhan sa isang cafe malapit sa Suwon Station AK Plaza o Ingye-dong ngayong weekend, o kung gusto mong makipagpalitan ng wikang Ingles, huwag mag-atubiling makipag-ugnayan sa akin anumang oras!"
      }
    },
    "like_count": 21,
    "cheer_count": 6,
    "comment_count": 5,
    "view_count": 180,
    "is_hidden": false,
    "created_at": "2026-08-21T17:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-11",
    "user_id": "user-lk-11",
    "user_name": "실론티러버",
    "user_country": "LK",
    "user_flag": "🇱🇰",
    "category": "tips",
    "title": "KTRS에서 연말정산 외국인 세금환급 신청했는데 168만원 돌려받았습니다! 후기 공유해요 🎉",
    "content": "외국인 근로자는 세금 혜택 잘 모르면 그냥 넘어가는 경우가 많은데, KTRS 간편 세금환급 조회해보니 지난 3년간 냈던 소득세 중에 168만원이나 환급 대상이더라고요. 국세청에서 계좌로 입금된 후에 수수료 내는 후불제라 안심하고 신청했습니다. 안 해보신 분들 꼭 조회해보세요!",
    "images": [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경남 김해시",
    "industrial_zone": "gimhae",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "KTRS에서 연말정산 외국인 세금환급 신청했는데 168만원 돌려받았습니다! 후기 공유해요 🎉",
        "content": "외국인 근로자는 세금 혜택 잘 모르면 그냥 넘어가는 경우가 많은데, KTRS 간편 세금환급 조회해보니 지난 3년간 냈던 소득세 중에 168만원이나 환급 대상이더라고요. 국세청에서 계좌로 입금된 후에 수수료 내는 후불제라 안심하고 신청했습니다. 안 해보신 분들 꼭 조회해보세요!"
      },
      "vi": {
        "title": "Tôi đã nộp đơn xin hoàn thuế cho người nước ngoài quyết toán thuế cuối năm trên KTRS và nhận lại 1,68 triệu won! Chia sẻ trải nghiệm này 🎉",
        "content": "Người lao động nước ngoài thường hay bỏ qua vì không biết rõ về các ưu đãi thuế, nhưng khi tôi tra cứu hoàn thuế đơn giản trên KTRS, tôi phát hiện ra mình được hoàn lại tới 1,68 triệu won từ số thuế thu nhập đã nộp trong 3 năm qua. Vì đây là dịch vụ trả sau, chỉ thu phí sau khi tiền đã được Cơ quan Thuế Quốc gia chuyển vào tài khoản, nên tôi rất yên tâm khi đăng ký. Những ai chưa thử nhất định hãy tra cứu nhé!"
      },
      "zh": {
        "title": "在KTRS申请了年末结算外国税款退税，拿回了168万韩元！分享一下心得 🎉",
        "content": "外国工人如果不太了解税收优惠，往往就会白白错过。我在KTRS进行了简便退税查询，发现过去3年缴纳的所得税中，居然有168万韩元可以退税！因为是在国税厅将退款打入账户后才支付手续费的后付费模式，所以很放心地下单申请了。还没查过的朋友一定要查查看！"
      },
      "en": {
        "title": "Applied for a foreign tax refund during year-end tax settlement on KTRS and got 1.68 million KRW back! Sharing my review 🎉",
        "content": "Foreign workers often miss out on tax benefits if they don't know about them, but when I checked through KTRS's simple tax refund inquiry, I found out I was eligible for a refund of 1.68 million KRW from the income tax I paid over the past 3 years. It's a pay-later system where you pay the fee only after the money is deposited into your account by the National Tax Service, so I applied with peace of mind. If you haven't checked yet, make sure to look it up!"
      },
      "ja": {
        "title": "KTRSで年末調整の外国人税金還付を申請したら168万ウォン戻ってきました！レビューを共有します 🎉",
        "content": "外国人労働者は税金控除の特典をよく知らずに見過ごしてしまうことが多いですが、KTRSの簡単税金還付照会をしてみたら、過去3年間に納めた所得税のうち168万ウォンも還付対象になっていました。国税庁から口座に入金された後に手数料を支払う後払い制なので、安心して申請できました。まだやったことがない方はぜひ照会してみてください！"
      },
      "ru": {
        "title": "Подал заявку на возврат налогов для иностранцев при годовом перерасчете через KTRS и получил обратно 1,68 млн вон! Делюсь отзывом 🎉",
        "content": "Иностранные работники часто упускают налоговые льготы, потому что не знают о них. Но когда я воспользовался простым поиском возврата налогов на KTRS, оказалось, что из подоходного налога, уплаченного за последние 3 года, целых 1,68 млн вон подлежат возврату! Так как оплата комиссии происходит потом — только после того, как Национальная налоговая служба переведет деньги на счет, я подал заявку со спокойной душой. Кто еще не проверял, обязательно проверьте!"
      },
      "th": {
        "title": "ยื่นขอคืนภาษีสำหรับคนต่างชาติในการปรับปรุงภาษีสิ้นปีผ่าน KTRS และได้รับเงินคืนถึง 1.68 ล้านวอน! ขอมาแชร์รีวิวครับ 🎉",
        "content": "แรงงานต่างชาติมักจะมองข้ามสิทธิประโยชน์ทางภาษีเพราะไม่ค่อยรู้เรื่อง แต่พอได้ลองตรวจสอบคืนภาษีแบบง่ายๆ ของ KTRS ก็พบว่าภาษีเงินได้ที่เสียไปในช่วง 3 ปีที่ผ่านมา สามารถขอคืนได้ถึง 1.68 ล้านวอนเลยครับ! เนื่องจากเป็นระบบจ่ายค่าธรรมเนียมทีหลัง โดยจะหักค่าธรรมเนียมหลังจากที่กรมสรรพากรโอนเงินเข้าบัญชีแล้ว จึงสมัครได้อย่างสบายใจ ใครที่ยังไม่ได้เช็ค ลองไปตรวจดูนะครับ!"
      },
      "uz": {
        "title": "KTRS orqali yil oxiridagi soliq hisob-kitobida xorijliklar uchun soliq qaytarishga ariza topshirib, 1,68 million von qaytarib oldim! Sharhimni baham ko'raman 🎉",
        "content": "Xorijiy ishchilar soliq imtiyozlari haqida yaxshi bilmagani uchun ko'pincha buni o'tkazib yuborishadi, lekin KTRS soliq qaytarishni oddiy tekshirish xizmatidan foydalanganimda, oxirgi 3 yil davomida to'lagan daromad solig'imdan 1,68 million von qaytarilishi kerakligi ma'lum bo'ldi. Milliy soliq xizmati pulni hisob raqamimga o'tkazib bergandan keyin xizmat haqini to'laydigan tizim bo'lgani uchun xotirjam ariza topshirdim. Hali tekshirmaganlar albatta tekshirib ko'ring!"
      },
      "km": {
        "title": "បានដាក់ពាក្យសុំបង្វែរពន្ធជនបរទេសសម្រាប់ការទូទាត់ពន្ធចុងឆ្នាំតាម KTRS ហើយទទួលបានប្រាក់คืน ១,៦៨ លានវ៉ុន! ចែករំលែកបទពិសោធន៍ 🎉",
        "content": "ពលករររទេសច្រើនតែរំលងដោយសារមិនសូវយល់ដឹងពីអត្ថប្រយោជន៍ពន្ធ ប៉ុន្តែនៅពេលខ្ញុំពិនិត្យការបង្វែរពន្ធតាម KTRS ខ្ញុំបានដឹងថាពន្ធលើប្រាក់ចំណូលដែលបានបង់ក្នុងរយៈពេល ៣ ឆ្នាំកន្លងមក មានប្រាក់រហូតដល់ ១,៦៨ លានវ៉ុនដែលត្រូវទទួលបានមកវិញ។ ដោយសារវាជាប្រព័ន្ធបង់សេវាកម្មក្រោយ (បង់កម្រៃជើងសារបន្ទាប់ពីនាយកដ្ឋានពន្ធដារផ្ទេរប្រាក់ចូលគណនី) ខ្ញុំបានដាក់ពាក្យដោយទំនុកចិត្ត។ អ្នកที่ไม่ទាន់បានពិនិត្យ សូមប្រញាប់ពិនិត្យមើល!"
      },
      "mn": {
        "title": "KTRS-ээр дамжуулан оны эцсийн татварын тайлангийн гадаад иргэдийн татварын буцаан олголтод хамрагдаж 1.68 сая вон буцаан авлаа! Сэтгэгдлээ хуваалцаж байна 🎉",
        "content": "Гадаад ажилчид татварын хөнгөлөлтийн талаар сайн мэдэхгүйгээсээ болоод зүгээр өнгөрөөх тохиолдол их байдаг. KTRS-ийн хялбар татварын буцаан олголтын шалгалтаар шалгаж үзэхэд сүүлийн 3 жилд төлсөн орлогын албан татвараас 1.68 сая вон буцаан олгогдох боломжтой байсан. Үндэсний татварын албанаас данс руу мөнгө орсны дараа шимтгэлийг нь төлдөг дараа төлбөрт систем учраас санаа амар өргөдлөө гаргасан. Шалгаж үзээгүй хүмүүс заавал шалгаж үзээрэй!"
      },
      "ne": {
        "title": "KTRS बाट वर्षको अन्त्यको कर समायोजनमा विदेशी कर फिर्ताको लागि आवेदन दिएर १६ लाख ८० हजार वोन फिर्ता पाएँ! मेरो अनुभव शेयर गर्दैछु 🎉",
        "content": "विदेशी कामदारहरूले कर सुविधाहरूको बारेमा राम्रोसँग थाहा नभएर प्रायः त्यसै छोड्ने गर्छन्, तर KTRS को सरल कर फिर्ता खोजी मार्फत हेर्दा मैले विगत ३ वर्षमा तिरेको आयकर मध्ये १६ लाख ८० हजार वोन फिर्ता पाउने रहेछु। राष्ट्रिय कर सेवा (NTS) बाट खातामा रकम जम्मा भएपछि मात्र शुल्क तिर्ने प्रणाली (Post-payment) भएकोले ढुक्क भएर आवेदन दिएँ। अझै हेर्नुभएको छैन भने पक्कै पनि चेक गर्नुहोस्!"
      },
      "id": {
        "title": "Mengajukan pengembalian pajak warga negara asing untuk penyesuaian pajak akhir tahun di KTRS dan mendapatkan kembali 1,68 juta KRW! Berbagi ulasan 🎉",
        "content": "Pekerja asing sering kali melewatkan manfaat pajak karena kurang paham, tetapi saat saya menggunakan layanan penelusuran pengembalian pajak mudah di KTRS, ternyata dari pajak penghasilan yang saya bayarkan selama 3 tahun terakhir, ada 1,68 juta KRW yang bisa dikembalikan. Karena menggunakan sistem pascabayar (biaya dibayarkan setelah uang ditransfer ke rekening oleh Layanan Pajak Nasional), saya mengajukannya dengan tenang. Bagi yang belum coba, wajib cek!"
      },
      "my": {
        "title": "KTRS တွင် နှစ်ကုန်အခွန်ရှင်းလင်းခြင်းအတွက် နိုင်ငံခြားသား အခွန်ပြန်လည်ထုတ်ယူရန် လျှောက်ထားခဲ့ပြီး ၀မ် ၁.၆၈ သန်း ပြန်လည်ရရှိခဲ့ပါတယ်! သုံးသပ်ချက် မျှဝေလိုက်ပါတယ် 🎉",
        "content": "နိုင်ငံခြားသား အလုပ်သမားများသည် အခွန်သက်သာခွင့်များအကြောင်း ကောင်းစွာမသိသဖြင့် လက်လွှတ်ဆုံးရှုံးရသည်များ ရှိတတ်သော်လည်း KTRS လွယ်ကူသော အခွန်ပြန်အမ်းငွေ စစ်ဆေးခြင်းကို ပြုလုပ်ကြည့်ရာ လွန်ခဲ့သော ၃ နှစ်အတွင်း ပေးဆောင်ခဲ့သည့် ဝင်ငွေခွန်ထဲမှ ၀မ် ၁.၆၈ သန်းတိုင်အောင် ပြန်လည်ရရှိနိုင်သည်ကို တွေ့ရှိခဲ့ရပါသည်။ အမျိုးသားအခွန်ဝန်ဆောင်မှုဌာနမှ ဘဏ်အကောင့်ထဲသို့ ငွေထည့်ပေးပြီးမှ ဝန်ဆောင်ခပေးရသည့် စနစ်ဖြစ်သောကြောင့် စိတ်အေးချမ်းစွာ လျှောက်ထားခဲ့ပါသည်။ မစစ်ဆေးရသေးသူများ မဖြစ်မနေ စစ်ဆေးကြည့်ကြပါ!"
      },
      "si": {
        "title": "KTRS හරහා වසර අවසාන බදු ගැලපීමේ විදේශික බදු ආපසු ලබා ගැනීමට ඉල්ලුම් කර වොන් මිලියන 1.68 ක් ආපසු ලැබුණා! මගේ අත්දැකීම බෙදා ගන්නවා 🎉",
        "content": "විදේශික සේවකයින් බදු සහන ගැන හොඳින් නොදන්නා නිසා බොහෝ විට ඒවා මඟ හැරෙනවා. නමුත් KTRS සරල බදු ආපසු ගෙවීම් පරීක්ෂාව හරහා බලන විට, මම පසුගිය වසර 3 තුළ ගෙවූ ආදායම් බදුවලින් වොන් මිලියන 1.68 ක් ආපසු ලැබීමට සුදුසුකම් ලබා තිබුණා. ජාතික බදු දෙපාර්තමේන්තුවෙන් ගිණුමට මුදල් තැන්පත් වූ පසු ගාස්තු ගෙවන පද්ධතියක් නිසා මම කිසිදු බියකින් තොරව ඉල්ලුම් කළා. තවමත් පරීක්ෂා නොකළ අය අනිවාර්යයෙන්ම පරීක්ෂා කර බලන්න!"
      },
      "kk": {
        "title": "KTRS арқылы жылдық салықты қайта есептеуде шетелдіктерге арналған салықты қайтаруға өтініш беріп, 1,68 миллион вон қайтарып алдым! Пікіріммен бөлісемін 🎉",
        "content": "Шетелдік жұмысшылар салық жеңілдіктері туралы жақсы білмей, мүмкіндікті жіберіп алатын жағдайлар жиі кездеседі. Bірақ KTRS жеңілдетілген салықты қайтаруды тексеру қызметін пайдаланғанда, соңғы 3 жылда төлеген табыс салығымнан 1,68 миллион вон қайтарылуға тиіс екенін білдім. Ұлттық салық қызметі ақшаны шотқа аударғаннан кейін ғана комиссия төлейтін кейін төлеу жүйесі болғандықтан, алаңдамай өтініш бердім. Әлі тексермегендер болса, міндетті түрде тексеріп көрсеңіздер болады!"
      },
      "bn": {
        "title": "KTRS-এ বছরের শেষে কর সমন্বয়ের অধীনে বিদেশী নাগরিক বকেয়া কর ফেরত আবেদন করে ১.৬৮ মিলিয়ন ওন ফেরত পেয়েছি! আমার অভিজ্ঞতা শেয়ার করছি 🎉",
        "content": "বিদেশী কর্মীরা প্রায়শই কর সুবিধা সম্পর্কে না জানার কারণে তা মিস করেন, কিন্তু আমি KTRS-এর মাধ্যমে সহজ কর ফেরত সার্চ করে দেখেছি যে বিগত ৩ বছরে দেওয়া আয়করের মধ্যে ১.৬৮ মিলিয়ন ওন ফেরত পাওয়ার যোগ্য ছিল। জাতীয় কর সংস্থা অ্যাকাউন্ট টাকা জমা দেওয়ার পরই ফি পরিশোধের সুযোগ থাকায় আমি নিশ্চিন্তে আবেদন করেছি। যারা এখনো চেক করেননি, তারা অবশ্যই চেক করে দেখুন!"
      },
      "ur": {
        "title": "KTRS پر سالانہ ٹیکس ایڈجسٹمنٹ کے تحت غیر ملکیوں کے ٹیکس ریفنڈ کے لیے اپلائی کیا اور 1.68 ملین وان واپس مل گئے! اپنا تجربہ شیئر کر رہا ہوں 🎉",
        "content": "غیر ملکی کارکن اکثر ٹیکس فوائد سے واقف نہ ہونے کی وجہ سے انہیں نظر انداز کر دیتے ہیں، لیکن جب میں نے KTRS آسان ٹیکس ریفنڈ چیک کیا تو معلوم ہوا کہ پچھلے 3 سالوں میں ادا کیے گئے انکم ٹیکس میں سے 1.68 ملین وان ریفنڈ کے اہل تھے۔ چونکہ یہ نیشنل ٹیکس سروس کے اکاؤنٹ میں رقم منتقل کرنے کے بعد فیس کی ادائیگی کا بعد از وقت نظام ہے، اس لیے میں نے بغیر کسی ہچکچاہٹ کے اپلائی کیا۔ جن لوگوں نے ابھی تک چیک نہیں کیا وہ ضرور چیک کریں!"
      },
      "tl": {
        "title": "Nag-apply ako ng foreign tax refund para sa year-end tax settlement sa KTRS at nakakuha ako ng 1.68 million KRW pabalik! Ise-share ko ang aking review 🎉",
        "content": "Ang mga dayuhang manggagawa ay madalas na nakakaligtaan ang mga benepisyo sa buwis dahil hindi nila ito masyadong alam, ngunit nang i-check ko sa KTRS simple tax refund inquiry, nalaman kong kwalipikado pala ako para sa refund na 1.68 million KRW mula sa income tax na binayaran ko noong nakaraang 3 taon. Dahil ito ay pay-later system kung saan magbabayad ka lang ng fee pagkatapos maipasok ng National Tax Service ang pera sa iyong account, kampante akong nag-apply. Sa mga hindi pa nakakasubok, i-check niyo na rin!"
      }
    },
    "like_count": 36,
    "cheer_count": 19,
    "comment_count": 8,
    "view_count": 365,
    "is_hidden": false,
    "created_at": "2026-08-21T11:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-12",
    "user_id": "user-bd-12",
    "user_name": "다카나눔이",
    "user_country": "BD",
    "user_flag": "🇧🇩",
    "category": "tips",
    "title": "기숙사 이사하면서 깨끗한 전기포트랑 밥솥 무료나눔합니다! 필요하신 분 댓글 주세요 🎁",
    "content": "이번 주말에 다른 공장 기숙사로 이사하게 되어 짐 정리 중입니다. 6개월 정도 깨끗하게 사용한 3인용 쿠쿠 전기밥솥과 테팔 무선전기포트 무료로 나눔합니다. 청주 오창읍 산업단지 기숙사 앞으로 직접 가지러 오실 수 있는 분께 먼저 드릴게요!",
    "images": [
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "충북 청주시",
    "industrial_zone": "cheongju",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "기숙사 이사하면서 깨끗한 전기포트랑 밥솥 무료나눔합니다! 필요하신 분 댓글 주세요 🎁",
        "content": "이번 주말에 다른 공장 기숙사로 이사하게 되어 짐 정리 중입니다. 6개월 정도 깨끗하게 사용한 3인용 쿠쿠 전기밥솥과 테팔 무선전기포트 무료로 나눔합니다. 청주 오창읍 산업단지 기숙사 앞으로 직접 가지러 오실 수 있는 분께 먼저 드릴게요!"
      },
      "vi": {
        "title": "Tặng miễn phí ấm siêu tốc và nồi cơm điện còn sạch đẹp do chuyển ký túc xá! Ai cần vui lòng bình luận nhé 🎁",
        "content": "Cuối tuần này tôi chuyển sang ký túc xá nhà máy khác nên đang dọn dẹp đồ đạc. Tôi tặng miễn phí nồi cơm điện Cuckoo 3 người ăn và ấm siêu tốc không dây Tefal đã dùng giữ gìn khoảng 6 tháng. Ưu tiên cho bạn nào có thể đến lấy trực tiếp trước ký túc xá Khu công nghiệp Ochang-eup, Cheongju!"
      },
      "zh": {
        "title": "因搬宿舍免费赠送干净的电水壶和电饭煲！有需要的朋友请留言 🎁",
        "content": "这周末我要搬到另一个工厂宿舍，正在整理行李。免费赠送使用约6个月、保持得很干净的福库(Cuckoo)3人份电饭煲和特福(Tefal)无线电水壶。能亲自来清州市梧仓邑工业园区宿舍门前自提的朋友优先哦！"
      },
      "en": {
        "title": "Free clean electric kettle and rice cooker as I move dorms! Please comment if you need them 🎁",
        "content": "I'm packing up as I'm moving to another factory dormitory this weekend. Giving away for free a 3-serving Cuckoo rice cooker and a Tefal cordless electric kettle, both cleanly used for about 6 months. First come, first served for those who can pick them up directly in front of the dormitory at the Ochang-eup Industrial Complex in Cheongju!"
      },
      "ja": {
        "title": "寮の引越しのため綺麗な電気ケトルと炊飯器を無料でお譲りします！必要な方はコメントください 🎁",
        "content": "今週末に別の工場の寮に引っ越すことになり、荷整理中です。約6ヶ月間綺麗に使用した3人用クック（Cuckoo）炊飯器とティファール（Tefal）コードレス電気ケトルを無料でお譲りします。清州市梧倉邑（オチャンウプ）の産業団地寮の前まで直接取りに来られる方を優先させていただきます！"
      },
      "ru": {
        "title": "Отдам бесплатно чистый электрочайник и рисоварку при переезде из общежития! Кому нужно, пишите в комментариях 🎁",
        "content": "На этих выходных я переезжаю в общежитие другого завода и разбираю вещи. Бесплатно отдаю 3-местную рисоварку Cuckoo и беспроводной электрочайник Tefal, которыми аккуратно пользовался около 6 месяцев. Отдам тому, кто сможет лично забрать перед общежитием в промзоне Очан-ып, Чонджу!"
      },
      "th": {
        "title": "ย้ายหอพัก แจกฟรี กาน้ำร้อนไฟฟ้าและหม้อหุงข้าวสภาพดี! ใครสนใจเม้นท์ไว้เลยครับ 🎁",
        "content": "สัปดาห์นี้จะย้ายไปหอพักโรงงานอื่น เลยกำลังเก็บของครับ แจกฟรีหม้อหุงข้าว Cuckoo ขนาด 3 คน และกาน้ำร้อนไร้สาย Tefal สภาพดี ใช้งานมาประมาณ 6 เดือน ให้สิทธิ์คนที่สามารถมารับเองได้ที่หน้าหอพักนิคมอุตสาหกรรม โอชางอึบ เมืองชองจู ก่อนนะครับ!"
      },
      "uz": {
        "title": "Yotoqxonadan ko'chayotganim sababli toza elektr choynak va guruch pishirgichni tekinga beraman! Kerak bo'lsa izoh qoldiring 🎁",
        "content": "Shu dam olish kunlari boshqa zavod yotoqxonasiga ko'chayotganim uchun buyumlarimni yig'yapman. Taxminan 6 oy davomida toza ishlatilgan 3 kishilik Cuckoo guruch pishirgich va Tefal simsiz elektr choynakni tekinga beraman. Cheongju Ochang-eup sanoat zonasi yotoqxonasi oldiga o'zi kelib olib keta oladigan odamga birinchi bo'lib beraman!"
      },
      "km": {
        "title": "រើកន្លែងស្នាក់នៅ ចែកជូនកំសៀវអគ្គិសនី និងឆ្នាំងដាំបាយស្អាតដោយឥតគិតថ្លៃ! អ្នកត្រូវការសូមខメント 🎁",
        "content": "ចុងសប្តាហ៍នេះ ខ្ញុំត្រូវរើទៅកន្លែងស្នាក់នៅរោងចក្រផ្សេង ដូច្នេះកំពុងរៀបចំអីវ៉ាន់។ ខ្ញុំចែកជូនឥតគិតថ្លៃនូវឆ្នាំងដាំបាយ Cuckoo សម្រាប់ ៣ នាក់ និងកំសៀវអគ្គិសនីឥតខ្សែ Tefal ដែលប្រើប្រាស់បានស្អាតប្រហែល ៦ ខែ។ ផ្តល់ជូនមុនគេសម្រាប់អ្នកដែលអាចមកយកផ្ទាល់នៅមុខកន្លែងស្នាក់នៅតំបន់ឧស្សាហកម្ម Ochang-eup ក្រុង Cheongju!"
      },
      "mn": {
        "title": "Дотуур байраа солиж байгаа тул цэвэрхэн хэрэглэсэн уснаас буцалгагч, чанагчийг үнэгүй өгнө! Хэрэгтэй нь сэтгэгдэл үлдээгээрэй 🎁",
        "content": "Энэ амралтын өдрүүдээр өөр үйлдвэрийн дотуур байр руу нүүх болсон тул ачаа бараагаа цэгцэлж байна. 6 сар орчим цэвэрхэн хэрэглэсэн 3 хүний Cuckoo чанагч болон Tefal утасгүй уснаас буцалгагчийг үнэгүй өгнө. Чонжү Очан-ып үйлдвэрлэлийн бүсийн дотуур байрны урдаас өөрөө ирээд авч чадах хүнд эхэлж өгнө шүү!"
      },
      "ne": {
        "title": "होस्टेल सर्दै गर्दा सफा इलेक्ट्रिक केतली र राइस कुकर नि:शुल्क बाँड्दै छु! चाहिनेले कमेन्ट गर्नुहोस् 🎁",
        "content": "यो साताको अन्त्यमा अर्कै फ्याक्ट्रीको होस्टेलमा सर्ने भएकाले सामान मिलाउँदै छु। करिब ६ महिना सफासँग प्रयोग गरिएको ३ जनाको Cuckoo राइस कुकर र Tefal को वायरलेस इलेक्ट्रिक केतली नि:शुल्क बाँड्दै छु। चोङजु ओछाङ-इप औद्योगिक क्षेत्रको होस्टेल अगाडि आफैँ आएर लैजान सक्ने व्यक्तिलाई पहिला दिनेछु!"
      },
      "id": {
        "title": "Gratis ketel listrik dan penanak nasi bersih karena mau pindah asrama! Yang butuh silakan tinggalkan komentar 🎁",
        "content": "Akhir pekan ini saya akan pindah ke asrama pabrik lain, jadi sedang membereskan barang. Saya membagikan secara gratis penanak nasi Cuckoo kapasitas 3 orang dan ketel listrik nirkabel Tefal yang dipakai dengan bersih selama sekitar 6 bulan. Diutamakan bagi yang bisa datang mengambil sendiri di depan asrama Kawasan Industri Ochang-eup, Cheongju!"
      },
      "my": {
        "title": "အဆောင်ပြောင်းလို့ သန့်ရှင်းတဲ့ ရေနွေးအိုးနဲ့ ထမင်းပေါင်းအိုး အခမဲ့ပေးပါမည်! လိုချင်သူများ ကွန်မန့်ပေးပါ 🎁",
        "content": "ဒီစနေတနင်္ဂနွေမှာ တခြားစက်ရုံအဆောင်ကို ပြောင်းရမှာမို့ ပစ္စည်းတွေ သိမ်းဆည်းနေပါတယ်။ ၆ လလောက် သန့်သန့်ရှင်းရှင်း သုံးထားတဲ့ ၃ ယောက်စာ Cuckoo ထမင်းပေါင်းအိုးနဲ့ Tefal ကြိုးမဲ့ရေနွေးအိုးကို အခမဲ့ ပေးချင်ပါတယ်။ ချောင်ဂျူ၊ အိုချောင်းအက်ပ် စက်မှုဇုန် အဆောင်ရှေ့ကို ကိုယ်တိုင် လာယူနိုင်သူကို ဦးစားပေး ပေးပါမည်။"
      },
      "si": {
        "title": "නවාතැන්පොළ මාරු වන බැවින් පිරිසිදු විදුලි කේතලය සහ රයිස් කුකරය නොමිලේ ලබා දේ! අවශ්‍ය අය කමෙන්ට් කරන්න 🎁",
        "content": "මේ සති අන්තයේ වෙනත් කර්මාන්තශාලා නවාතැනකට මාරු වන බැවින් බඩු බාහිරාදිය අසුරමින් සිටිමි. මාස 6 ක් පමණ පිරිසිදුව භාවිත කළ දෙනෙකු 3 දෙනෙකුගේ Cuckoo රයිස් කුකරය සහ Tefal රැහැන් රහිත විදුලි කේතලය නොමිලේ ලබා දෙමි. චොංජු ඔචං-ඉප් කාර්මික කලාපයේ නවාතැන්පොළ ඉදිරිපිටට පැමිණ කෙලින්ම ලබාගත හැකි අයට මුල් තැන දෙනු ලැබේ!"
      },
      "kk": {
        "title": "Жатақханадан көшуге байланысты таза электр шәйнегі мен күріш пісіргішті тегін беремін! Қажет болса, пікір қалдырыңыз 🎁",
        "content": "Осы демалыс күндері басқа зауыттың жатақханасына көшетіндіктен, заттарымды жинап жатырмын. Шамамен 6 ай таза пайдаланылған 3 адамдық Cuckoo күріш пісіргіші мен Tefal сымсыз электр шәйнегін тегін беремін. Чонджу Очан-ып өндірістік аймағындағы жатақхана алдына өзі келіп алып кете алатын адамға бірінші беремін!"
      },
      "bn": {
        "title": "ডরমিটরি পরিবর্তন করায় পরিষ্কার ইলেকট্রিক কেটলি এবং রাইস কুকার বিনামূল্যে দিয়ে দিচ্ছি! যাদের প্রয়োজন তারা কমেন্ট করুন 🎁",
        "content": "এই সপ্তাহান্তে অন্য একটি ফ্যাক্টরির ডরমিটরিতে চলে যাচ্ছি, তাই জিনিসপত্র গোছাচ্ছি। প্রায় ৬ মাস পরিষ্কারভাবে ব্যবহার করা ৩ জনের Cuckoo রাইস কুকার এবং Tefal কর্ডলেস ইলেকট্রিক কেটলি বিনামূল্যে দিয়ে দেব। চংজু ওছাং-읍 ইন্ডাস্ট্রিয়াল পার্ক ডরমিটরির সামনে এসে যারা সরাসরি নিয়ে যেতে পারবেন তাদের আগে দেওয়া হবে!"
      },
      "ur": {
        "title": "ہاسٹل شفٹ کرنے پر صاف ستھری الیکٹرک کیتلی اور رائس ککر مفت حاصل کریں! ضرورت مند کمنٹ کریں 🎁",
        "content": "اس ویک اینڈ پر دوسری فیکٹری کے ہاسٹل میں شفٹ ہو رہا ہوں اس لیے سامان سمیٹ رہا ہوں۔ تقریباً 6 ماہ تک صاف ستھرا استعمال شدہ 3 افراد کا Cuckoo رائس ککر اور Tefal وائرلیس الیکٹرک کیتلی مفت دے رہا ہوں۔ چیونگجو اوچانگ-ایپ انڈسٹریل زون ہاسٹل کے سامنے خود آ کر لے جانے والے شخص کو پہلے دیا جائے گا!"
      },
      "tl": {
        "title": "Namimigay ng libreng malinis na electric kettle at rice cooker dahil lilipat ng dorm! Mag-comment kung kailangan niyo 🎁",
        "content": "Lilipat ako sa ibang factory dorm ngayong weekend kaya nag-aayos ako ng gamit. Namimigay ako ng libreng 3-person Cuckoo rice cooker at Tefal cordless electric kettle na ginamit nang malinis nang halos 6 na buwan. Unahin ko po ang pwedeng kumuha mismo sa harap ng dorm sa Ochang-eup Industrial Complex, Cheongju!"
      }
    },
    "like_count": 22,
    "cheer_count": 14,
    "comment_count": 6,
    "view_count": 195,
    "is_hidden": false,
    "created_at": "2026-08-21T05:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-13",
    "user_id": "user-kz-13",
    "user_name": "알마티바람",
    "user_country": "KZ",
    "user_flag": "🇰🇿",
    "category": "daily_healing",
    "title": "한국의 사계절 중 봄 벚꽃이 정말 아름답네요. 주말에 공원 산책 추천합니다 🌸",
    "content": "카자흐스탄에서는 볼 수 없었던 핑크빛 벚꽃길을 보니까 마음이 참 평화로워집니다. 퇴근길에 회사 근처 호수공원 걸으면서 사진 찍어봤어요. 다들 바쁘고 힘든 일상이지만 주변 풍경도 한 번씩 둘러보시면서 힐링하세요!",
    "images": [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "경기 화성시",
    "industrial_zone": "hwaseong",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "한국의 사계절 중 봄 벚꽃이 정말 아름답네요. 주말에 공원 산책 추천합니다 🌸",
        "content": "카자흐스탄에서는 볼 수 없었던 핑크빛 벚꽃길을 보니까 마음이 참 평화로워집니다. 퇴근길에 회사 근처 호수공원 걸으면서 사진 찍어봤어요. 다들 바쁘고 힘든 일상이지만 주변 풍경도 한 번씩 둘러보시면서 힐링하세요!"
      },
      "vi": {
        "title": "Trong bốn mùa ở Hàn Quốc, hoa anh đào mùa xuân thực sự rất đẹp. Cuối tuần khuyên bạn nên đi dạo công viên 🌸",
        "content": "Ngắm nhìn con đường hoa anh đào hồng rực rỡ mà tôi chưa từng thấy ở Kazakhstan làm lòng tôi cảm thấy thật bình yên. Trên đường đi làm về, tôi đã vừa đi dạo ở công viên hồ gần công ty vừa chụp vài bức ảnh. Dù cuộc sống hàng ngày của mọi người bận rộn và vất vả, hãy dành chút thời gian ngắm nhìn cảnh vật xung quanh để thư giãn nhé!"
      },
      "zh": {
        "title": "韩国的四季中，春天的樱花真的很美。推荐周末去公园散步 🌸",
        "content": "看到在哈萨克斯坦看不到的粉红色樱花小路，心里感到十分平静。下班路上，我一边在公司附近的湖畔公园散步，一边拍了照片。虽然大家的日常生活既忙碌又辛苦，但也请偶尔看看周围的风景，治愈一下自己吧！"
      },
      "en": {
        "title": "Among Korea's four seasons, spring cherry blossoms are truly beautiful. I recommend taking a walk in the park this weekend 🌸",
        "content": "Seeing the pink cherry blossom paths that I couldn't see in Kazakhstan brings such peace to my heart. On my way home from work, I took some photos while walking through the lake park near my office. Everyone's daily life is busy and tough, but take a moment to look around at the scenery and heal!"
      },
      "ja": {
        "title": "韓国の四季の中でも春の桜が本当に美しいですね。週末の公園散歩をおすすめします 🌸",
        "content": "カザフスタンでは見られなかったピンク色の桜並木を見ていると、心がとても穏やかになります。退勤時に会社近くの湖水公園を歩きながら写真を撮ってみました。皆さん忙しく大変な日々をお過ごしかと思いますが、たまには周囲の景色も眺めて癒やされてくださいね！"
      },
      "ru": {
        "title": "Весенняя сакура действительно прекрасна среди четырех сезонов Кореи. Рекомендую прогуляться по парку в выходные 🌸",
        "content": "Глядя на розовую аллею сакуры, которую я не мог увидеть в Казахстане, на душе становится так спокойно. По дороге с работы я пофотографировал, гуляя по парку у озера недалеко от офиса. У всех в жизни много забот и усталости, но иногда оглянитесь вокруг и отдохните душой!"
      },
      "th": {
        "title": "ในบรรดา 4 ฤดูของเกาหลี ดอกซากุระในฤดูใบไม้ผลิสวยงามมากจริงๆ ขอแนะนำให้ไปเดินเล่นที่สวนสาธารณะในวันหยุดสุดสัปดาห์นะคะ 🌸",
        "content": "พอได้เห็นถนนสายซากุระสีชมพูที่ไม่เคยเห็นในคาซัคสถาน ก็ทำให้รู้สึกสงบใจมากเลยค่ะ ตอนเลิกงานได้เดินเล่นที่สวนสาธารณะริมทะเลสาบแถวบริษัทแล้วถ่ายรูปมา ทุกคนคงมีชีวิตประจำวันี่ยุ่งและเหน็ดเหนื่อย แต่ลองมองดูทิวทัศน์รอบตัวสักนิดแล้วเยียวยาจิตใจกันนะคะ!"
      },
      "uz": {
        "title": "Koreyaning to'rt fasli orasida bahorgi gilos gullari (sakura) juda go'zal. Dam olish kunlarida bog'da sayr qilishni tavsiya qilaman 🌸",
        "content": "Qozog'istonda ko'rib bo'lmaydigan pushti sakura yo'lini ko'rib, ko'nglim juda xotirjam bo'ldi. Ishdan qaytishda kompaniya yaqinidagi ko'l bo'yidagi bog'da yurib, rasmga tushdim. Hamma band va charchagan bo'lsa ham, atrofdagi manzarani tomosha qilib, hordiq chiqaring!"
      },
      "km": {
        "title": "ក្នុងចំណោមរដូវទាំងបួននៅកូរ៉េ ផ្កាសារ៉ាគឺស្រស់ស្អាតខ្លាំងណាស់នៅរដូវផ្កាcontacts/រដូវរំហើយ។ ណែនាំឱ្យដើរលេងនៅឧទ្យាននៅចុងសប្តាហ៍ 🌸",
        "content": "នៅពេលឃើញផ្លូវផ្កាសារ៉ាពណ៌ផ្កាឈូកដែលមិនដែលឃើញនៅកាហ្សាក់ស្ថាន ធ្វើឱ្យចិត្តខ្ញុំស្ងប់ស្ងាត់ណាស់។ នៅពេលត្រឡប់មកពីធ្វើការវិញ ខ្ញុំបានដើរលេងនៅឧទ្យានបឹងជិតក្រុមហ៊ុន ហើយបានថតរូប។ ទោះបីជាជីវិតប្រចាំថ្ងៃរបស់ทุกคนមមាញឹកនិងហត់នឿយយ៉ាងណាក៏ដោយ សូមក្រឡេកមើលទេសភាពជុំវិញខ្លួនដើម្បីសម្រាកកាយនិងចិត្ត!"
      },
      "mn": {
        "title": "Солонгосын дөрвөн улирлаас хаврын интоорын цэцэгнэх үе үнэхээр үзэсгэлэнтэй юм. Амралтын өдрөөр паркаар салхилахыг санал болгож байна 🌸",
        "content": "Казахстанд харж байгаагүй ягаан интоорын цэцэгт замыг харахад сэтгэл үнэхээр тайван болж байна. Ажлаасаа харих замдаа компанитай ойрхон нуурын паркаар алхаж зураг авлаа. Хүн бүрийн өдөр тутмын амьдрал завгүй, ядарч байгаа ч эргэн тойрныхоо байгалийн үзэмжийг тольдон сэтгэлээ сэргээгээрэй!"
      },
      "ne": {
        "title": "कोरियाका चार ऋतुहरूमध्ये वसन्त ऋतुको चेरी ब्लासम साँच्चै सुन्दर छ। हप्ताको अन्त्यमा पार्कमा पैदल यात्रा गर्न सिफारिस गर्दछु 🌸",
        "content": "कजाकिस्तानमा देख्न नपाइएको गुलाबी चेरी ब्लासमको बाटो देख्दा मन एकदम शान्त हुन्छ। कामबाट फर्कने क्रममा कम्पनी नजिकैको तालको पार्कमा हिँड्दै तस्बिरहरू खिचेँ। सबैको दैनिक जीवन व्यस्त र गाह्रो भए तापनि वरपरको दृश्यलाई हेरेर मनलाई शान्त बनाउनुहोस्!"
      },
      "id": {
        "title": "Di antara empat musim di Korea, bunga sakura di musim semi sungguh indah. Saya merekomendasikan jalan-jalan di taman pada akhir pekan 🌸",
        "content": "Melihat jalanan penuh bunga sakura berwarna merah muda yang tidak bisa saya lihat di Kazakhstan membuat hati saya terasa sangat damai. Dalam perjalanan pulang kerja, saya mengambil beberapa foto sambil berjalan-jalan di taman danau dekat kantor. Meski kehidupan sehari-hari sibuk dan lelah, sempatkanlah melihat pemandangan di sekitar untuk menyegarkan pikiran!"
      },
      "my": {
        "title": "ကိုရီးယားရဲ့ ရာသီလေးခုထဲမှာ နွေဦးရာသီ ချယ်ရီပွင့်တွေက တကယ်ကို လှပပါတယ်။ စနွေ၊ တနင်္ဂနွေမှာ ပန်းခြံထဲ လမ်းလျှောက်ဖို့ အကြံပြုချင်ပါတယ် 🌸",
        "content": "ကာဇက်စတန်မှာ မမြင်ဖူးခဲ့တဲ့ ပန်းရောင် ချယ်ရီပန်းလမ်းလေးကို မြင်လိုက်ရတော့ စိတ်ထဲမှာ တကယ်ကို အေးချမ်းသွားပါတယ်။ အလုပ်အပြန်မှာ ကုမ္ပဏီအနီးနားက ရေကန်ပန်းခြံမှာ လမ်းလျှောက်ရင်း ဓာတ်ပုံရိုက်ခဲ့တာပါ။ လူတိုင်း အလုပ်များပြီး ပင်ပန်းတဲ့ နေ့စဉ်ဘဝမှာ ပတ်ဝန်းကျင် ရှုခင်းလေးတွေကို ကြည့်ပြီး စိတ်အပန်းဖြေကြပါဦး!"
      },
      "si": {
        "title": "කොරියාවේ ඍතු හතර අතුරින් වසන්ත කාලයේ චෙරි මල් සැබවින්ම ලස්සනයි. සති අන්තයේ උද්‍යානයක ඇවිදීමට මම නිර්දේශ කරමි 🌸",
        "content": "කසාකස්ථානයේදී දැකීමට නොලැබුණු රෝස පැහැති චෙරි මල් පාර දකින විට මගේ සිතට මහත් සැනසීමක් දැනේ. වැඩ නිම වී ආපසු එන අතරතුර සමාගම අසල ඇති වැව් උද්‍යානයේ ඇවිදිමින් ඡායාරූප කිහිපයක් ගත්තෙමි. සැමදෙනාගේම දෛනික ජීවිතය කාර්යබහුල සහ විඩexhausting වුවත්, අවට සිරිය දෙස බලමින් සිත සැහැල්ලු කරගන්න!"
      },
      "kk": {
        "title": "Кореяның төрт мезгілінің ішінде көктемгі шие гүлдері (сакура) өте әдемі. Демалыс күндері саябақта серуендеуге кеңес беремін 🌸",
        "content": "Қазақстанда көре алмаған қызғылт шие гүлдерінің жолын көріп, көңілім тынышталып қалды. Жұмыстан қайтар жолда компания маңындағы көл саябағында серуендеп, суретке түстім. Бәрінің күнделікті өмірі қарбалас әрі шаршаңқы болса да, айналадағы көрініске бір сәт көз жүгіртіп, демалып алыңыздар!"
      },
      "bn": {
        "title": "কোরিয়ার চারটি ঋতুর মধ্যে বসন্তের চেরি ব্লসম সত্ইি সুন্দর। উইকএন্ডে পার্কে হাঁটার সুপারিশ করছি 🌸",
        "content": "কাজাখস্তানে দেখতে না পাওয়া গোলাপি চেরি ব্লসমের রাস্তা দেখে মনটা সত্যিই শান্ত হয়ে যায়। কাজ শেষে ফেরার পথে কোম্পানির কাছের লেক পার্কে হাঁটতে হাঁটতে কিছু ছবি তুলেছি। সবার দৈনন্দিন জীবন ব্যস্ত এবং কঠিন, তবুও চারপাশের দৃশ্য একটু দেখে মনকে প্রফুল্ল করুন!"
      },
      "ur": {
        "title": "کوریا کے چاروں موسموں میں بہار کے چیری بلاسم واقعی خوبصورت ہیں۔ ویک اینڈ پر پارک میں واک کی سفارش کی جاتی ہے 🌸",
        "content": "قازقستان میں نہ دیکھا جانے والا گلابی چیری بلاسم کا راستہ دیکھ کر دل کو واقعی سکون ملتا ہے۔ کام سے واپسی پر کمپنی کے قریب جھیل کے پارک میں ٹہلتے ہوئے تصویریں لیں۔ ہر ایک کی روزمرہ کی زندگی مصروف اور مشکل ہے، لیکن اپنے ارد گرد کے مناظر کو دیکھ کر کچھ وقت پرسکون گزاریئے!"
      },
      "tl": {
        "title": "Sa apat na panahon ng Korea, napaganda talaga ng mga cherry blossom sa tagsibol. Inirerekomenda ko ang paglalakad sa parke ngayong weekend 🌸",
        "content": "Ang pagkakita sa kulay-rosas na daan ng cherry blossom na hindi ko nakikita sa Kazakhstan ay nagdudulot ng kapayapaan sa aking puso. Pauwi mula sa trabaho, kumuha ako ng mga litrato habang naglalakad sa lake park malapit sa kumpanya. Bagama't abala at mahirap ang araw-araw na buhay ng lahat, tingnan din ninyo ang paligid paminsan-minsan para mag-relax!"
      }
    },
    "like_count": 40,
    "cheer_count": 31,
    "comment_count": 7,
    "view_count": 288,
    "is_hidden": false,
    "created_at": "2026-08-20T23:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  },
  {
    "id": "post-14",
    "user_id": "user-pk-14",
    "user_name": "라호르청년",
    "user_country": "PK",
    "user_flag": "🇵🇰",
    "category": "qna",
    "title": "광주 하남공단 근처에 주말(일요일)에도 진료하는 외국인 친화 병원(치과/내과) 있을까요? 🏥",
    "content": "평일에는 야근 때문에 병원 가기가 힘든데 어금니 충치 통증이 너무 심해서요. 하남산단이나 송정역 근처에 일요일 오전에도 진료하고 외국인등록증 건강보험 적용 잘 해주는 친절한 치과 아시는 분 추천 부탁드립니다!",
    "images": [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80"
    ],
    "region": "광주 광산구",
    "industrial_zone": "gwangju",
    "source_lang": "ko",
    "translations": {
      "ko": {
        "title": "광주 하남공단 근처에 주말(일요일)에도 진료하는 외국인 친화 병원(치과/내과) 있을까요? 🏥",
        "content": "평일에는 야근 때문에 병원 가기가 힘든데 어금니 충치 통증이 너무 심해서요. 하남산단이나 송정역 근처에 일요일 오전에도 진료하고 외국인등록증 건강보험 적용 잘 해주는 친절한 치과 아시는 분 추천 부탁드립니다!"
      },
      "vi": {
        "title": "Có phòng khám/bệnh viện (nha khoa/nội khoa) thân thiện với người nước ngoài mở cửa vào cuối tuần (Chủ nhật) ở gần Khu công nghiệp Hanam, Gwangju không? 🏥",
        "content": "Ngày thường tôi phải tăng ca nên rất khó đi khám, nhưng răng cấm bị sâu đau quá. Có ai biết nha khoa nào thân thiện gần KCN Hanam hoặc ga Songjeong mở cửa cả sáng Chủ nhật và áp dụng bảo hiểm y tế thẻ đăng ký người nước ngoài tốt không, xin giới thiệu cho tôi với!"
      },
      "zh": {
        "title": "请问光州河南工业园区附近有周末（周日）营业且对外国人友好的医院（牙科/内科）吗？🏥",
        "content": "平时因为加班很难去医院，但大牙蛀牙疼得太厉害了。如果有知道河南产团或松汀站附近周日上午也诊疗、并且好好为外国人登录证办理健康保险的亲切牙科，麻烦推荐一下！"
      },
      "en": {
        "title": "Are there any foreigner-friendly hospitals (dental/internal medicine) open on weekends (Sundays) near Hanam Industrial Complex in Gwangju? 🏥",
        "content": "It's hard for me to visit a clinic on weekdays due to overtime work, but my molar toothache from a cavity is so severe. If anyone knows a friendly dental clinic near Hanam Industrial Complex or Songjeong Station that operates on Sunday mornings and properly accepts health insurance with an Alien Registration Card (ARC), please recommend one!"
      },
      "ja": {
        "title": "光州・河南（ハナム）工団の近くで、週末（日曜日）も診療している外国人フレンドリーな病院（歯科/内科）はありますか？🏥",
        "content": "平日は残業で病院に行くのが難しいのですが、奥歯の虫歯の痛みがひどくて…。河南産団や松汀（ソンジョン）駅の近くで、日曜日午前中も診療していて、外国人登録証の健康保険適用をしっかり行ってくれる親切な歯科をご存知でしたら推薦をお願いします！"
      },
      "ru": {
        "title": "Есть ли рядом с промзоной Ханам в Кванджу дружелюбная к иностранцам клиника (стоматология/терапия), работающая по выходным (в воскресенье)? 🏥",
        "content": "Из-за сверхурочной работы по будням трудно сходить в больницу, но боль в коренном зубе из-за кариеса стала невыносимой. Посоветуйте, пожалуйста, хорошую стоматологию в районе промзоны Ханам или станции Сонджон, которая работает в воскресенье утром и без проблем принимает регистрационную карту иностранца (ARC) по медицинской страховке!"
      },
      "th": {
        "title": "มีโรงพยาบาล/คลินิก (ทันตกรรม/อายุรกรรม) ที่เป็นมิตรกับชาวต่างชาติและเปิดวันหยุด (วันอาทิตย์) ใกล้นิคมอุตสาหกรรมฮานัม ในกวางจูไหมครับ/ค่ะ? 🏥",
        "content": "วันธรรมดาต้องทำงานล่วงเวลาเลยไปโรงพยาบาลลำบากมาก แต่ตอนนี้ปวดฟันกรามเพราะฟันผุมากครับ/ค่ะ ใครพอรู้จักคลินิกทำฟันแถวนิคมฮานัมหรือสถานีซงจอง ที่เปิดวันอาทิตย์ช่วงเช้า และรับประกันสุขภาพบัตรลงทะเบียนคนต่างด้าวดีๆ และบริการดีๆ ช่วยแนะนำหน่อยครับ/ค่ะ!"
      },
      "uz": {
        "title": "Gwangju Hanam sanoat zonasi yaqinida dam olish kunlari (yakshanba) ham ishlaydigan, chet elliklarga qulay shifoxona (stomatologiya/ichki kasalliklar) bormi? 🏥",
        "content": "Ish kunlari ortiqcha ish (overtime) tufayli shifoxonaga borish qiyin, lekin tish kariesi og'rig'i juda kuchayib ketdi. Hanam sanoat zonasi yoki Songjeong bekati yaqinida yakshanba ertalab ham ishlaydigan hamda chet ellik kartasi (ARC) tibbiy sug'urtasini yaxshi qo'llaydigan xushmuomala stomatologiyani bilsangiz, iltimos tavsiya qiling!"
      },
      "km": {
        "title": "តើមានមន្ទីរពេទ្យ (ធ្មេញ/រោគទូទៅ) ដែលរាក់ទាក់ចំពោះជនបរទេស និងបើកប្រឡងនៅចុងសប្តាហ៍ (ថ្ងៃអាទិត្យ) នៅជិតតំបន់ឧស្សាហកម្ម Hanam ក្នុងទីក្រុង Gwangju ដែរឬទេ? 🏥",
        "content": "នៅថ្ងៃធ្វើការពិបាកទៅប្រឡងពេទ្យដោយសារធ្វើការថែមម៉ោង ប៉ុន្តែការឈឺធ្មេញថ្គាមដោយសារពុកធ្មេញគឺខ្លាំងណាស់។ ប្រសិនបើមាននរណាម្នាក់ស្គាល់គ្លីនិកធ្មេញដែលល្អ និងស្ថិតនៅជិតតំបន់ឧស្សាហកម្ម Hanam ឬស្ថានីយ Songjeong ដែលបើកនៅព្រឹកថ្ងៃអាទិត្យ ហើយទទួលធានារ៉ាប់រងសុខភាពប័ណ្ណស្នាក់នៅជនបរទេសបានល្អ សូមជួយណែនាំផង!"
      },
      "mn": {
        "title": "Кванджу Ханам аж үйлдвэрийн цогцолборын ойролцоо амралтын өдөр (нямаар) ажилладаг гадаад иргэдэд ээлтэй эмнэлэг (шүд/дотор) байдаг болов уу? 🏥",
        "content": "Ажлын өдрүүдэд илүү цагаар ажилладаг болохоор эмнэлэг явахад хэцүү байдаг бөгөөд арааны шүд хорхойтож маш их өвдөж байна. Ханам үйлдвэрийн бүс эсвэл Сонжон вокзалын ойролцоо ням гарагийн өглөө ажилладаг, гадаадын иргэний үнэмлэхний эрүүл мэндийн даатгалд сайн хамруулдаг найрсаг шүдний эмнэлэг мэдэх хүн байвал санал болгож тусална уу!"
      },
      "ne": {
        "title": "ग्वाङ्जु हानाम औद्योगिक क्षेत्र नजिकै सप्ताहान्त (आइतबार) मा पनि उपचार गर्ने विदेशी-मैत्री अस्पताल (डेन्टल/जनरल) छ होला? 🏥",
        "content": "कामको दिनमा ओभरटाइमले गर्दा अस्पताल जान गाह्रो छ, तर बंगाराको दाँत कीराले खाएर साह्रै दुखिरहेको छ। हानाम औद्योगिक क्षेत्र वा सोङजोङ स्टेशन नजिकै आइतबार बिहान पनि खुल्ने र विदेशी परिचयपत्र (ARC) को स्वास्थ्य बीमा राम्ररी मिलाइदिने दयालु डेन्टल थाहा छ भने कृपया सिफारिस गरिदिनुहोला!"
      },
      "id": {
        "title": "Apakah ada rumah sakit/klinik (gigi/penyakit dalam) ramah warga asing di dekat Kompleks Industri Hanam, Gwangju yang buka pada akhir pekan (Hari Minggu)? 🏥",
        "content": "Hari kerja sulit ke rumah sakit karena lembur, tapi sakit gigi geraham akibat berlubang sungguh parah. Jika ada yang tahu klinik gigi ramah di dekat KWS Industri Hanam atau Stasiun Songjeong yang buka Minggu pagi dan melayani asuransi kesehatan Kartu Registrasi Orang Asing (ARC) dengan baik, mohon rekomendasinya!"
      },
      "my": {
        "title": "ဂွမ်ဂျူ ဟာနမ်စက်မှုဇုန်အနီးတွင် စနေ၊ တနင်္ဂနွေ (တနင်္ဂနွေနေ့) တွင်လည်း ကုသပေးသော နိုင်ငံခြားသားများအတွက် အဆင်ပြေသည့် ဆေးရုံ (သွားဘက်ဆိုင်ရာ/အတွင်းရောဂါ) ရှိပါသလား။ 🏥",
        "content": "ရုံးဖွင့်ရက်များတွင် အချိန်ပိုဆင်းရသဖြင့် ဆေးရုံသွားရန် ခက်ခဲသော်လည်း အံသွားဆွေးသည့် ဝေဒနာမှာ အလွန်ပြင်းထန်နေပါသည်။ ဟာနမ်စက်မှုဇုန် သို့မဟုတ် ဆုန်းဂျောင်းဘူတာအနီးတွင် တနင်္ဂနွေနေ့ နံနက်ပိုင်းတွင်လည်း ကြည့်ရှုပေးပြီး နိုင်ငံခြားသားမှတ်ပုံတင်ကတ် ကျန်းမာရေးအာမခံ သေချာစွာ အသုံးပြုနိုင်သည့် ဖော်ရွေသော သွားဆေးခန်းကို သိရှိပါက ညွှန်းပေးကြပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။"
      },
      "si": {
        "title": "ග්වංජු හානම් කර්මාන්තපුරය අසල සති අන්තයේ (ඉරිදා) සායන පවත්වන විදේශිකයන්ට හිතකාමී රෝහලක් (දන්ත/අභ්‍යන්තර) තිබේද? 🏥",
        "content": "සතියේ දිනවල අතිකාල වැඩ නිසා රෝහලට යාම අපහසුයි, නමුත් උකුළු දතේ දත් කුහර වේදනාව ඉතා දැඩියි. හානම් කර්මාන්තපුරය හෝ සොංජොං දුම්රිය ස්ථානය අසල ඉරිදා උදෑසන ද විවෘතව පවතින, විදේශික ලියාපදිංචි කාඩ්පතේ සෞඛ්‍ය රක්ෂණය හොඳින් භාවිත කළ හැකි මිත්‍රශීලී දන්ත සායනයක් දන්නේ නම් කරුණාකර නිර්දේශ කරන්න!"
      },
      "kk": {
        "title": "Кванджу Ханам өнеркәсіп кешенінің жанында демалыс күндері (жексенбіде) де жұмыс істейтін шетелдіктерге қолайлы емхана (стоматология/терапия) бар ма? 🏥",
        "content": "Жұмыс күндері үстеме жұмысқа байланысты ауруханаға бару қиын, бірақ азу тісімнің кариесі өте қатты ауырып тұр. Ханам өнеркәсіп аймағы немесе Сонджон вокзалының жанында жексенбі күні таңертең де қабылдайтын және шетелдік тіркеу картасының (ARC) медициналық сақтандыруын жақсы қолданатын мейірімді стоматологияны білетіндер болса, ұсынуыңызды өтінемін!"
      },
      "bn": {
        "title": "গুয়াংজু হানাম শিল্প এলাকার কাছে কি সপ্তাহান্তে (রবিবার) খোলা থাকা কোনো বিদেশি-বান্ধব হাসপাতাল (ডেন্টাল/ইনটার্নাল মেডিসিন) আছে? 🏥",
        "content": "সাধারণ দিনগুলোতে ওভারটাইমের কারণে হাসপাতালে যাওয়া কঠিন, কিন্তু মাড়ির দাঁতের ক্যাভিটির ব্যথা খুব তীব্র। হানাম শিল্প এলাকা বা সংজং স্টেশনের কাছে রবিবার সকালে খোলা থাকে এবং এলিয়েন রেজিস্ট্রেশন কার্ডের (ARC) স্বাস্থ্য বীমা ভালোভাবে গ্রহণ করে এমন কোনো ভালো ডেন্টাল ক্লিনিক জানা থাকলে অনুগ্রহ করে সুপারিশ করুন!"
      },
      "ur": {
        "title": "کیا گوانگجو ہانام انڈسٹریل زون کے قریب اختتامِ ہفتہ (اتوار) کو بھی علاج کرنے والا تارکینِ وطن کے لیے موزوں ہسپتال (ڈینٹل/انٹرنل میڈیسن) موجود ہے؟ 🏥",
        "content": "ہفتے کے دنوں میں اوور ٹائم کی وجہ سے ہسپتال جانا مشکل ہے لیکن داڑھ کے کیویٹی کا درد بہت شدید ہے۔ اگر کوئی ہانام انڈسٹریل زون یا سونگ جیونگ اسٹیشن کے قریب اتوار کی صبح بھی کھلی رہنے والی اور فارن رجسٹریشن کارڈ کی ہیلتھ انشورنس کو اچھی طرح قبول کرنے والی اچھی ڈینٹل کلینک جانتا ہو تو برائے مہربانی تجاویز دیں!"
      },
      "tl": {
        "title": "Mayroon bang foreigner-friendly na ospital (dental/internal medicine) malapit sa Hanam Industrial Complex sa Gwangju na bukas kapag katapusan ng linggo (Linggo)? 🏥",
        "content": "Mahirap pumunta sa ospital tuwing weekdays dahil sa overtime, pero sobrang sakit na ng bagang ko dahil sa sira. Kung may nakakaalam ng mabait na dental clinic malapit sa Hanam Industrial Complex o Songjeong Station na bukas ng Linggo ng umaga at maayos tumanggap ng health insurance ng Alien Registration Card (ARC), paki-rekomenda naman po!"
      }
    },
    "like_count": 15,
    "cheer_count": 7,
    "comment_count": 5,
    "view_count": 164,
    "is_hidden": false,
    "created_at": "2026-08-20T17:03:53.930Z",
    "updated_at": "2026-08-23T09:03:53.930Z"
  }
];

export const INITIAL_COMMUNITY_COMMENTS: Record<string, CommunityComment[]> = {
  "post-1": [
    {
      "id": "comm-1-1",
      "post_id": "post-1",
      "user_id": "user-kr-01",
      "user_name": "평택이웃",
      "user_country": "KR",
      "user_flag": "🇰🇷",
      "content": "반가워요! 저 평택역 근처 사는데 일요일에 시간 괜찮으시면 커피 한잔하면서 한국어 알려드릴게요! 환영합니다 :)",
      "source_lang": "ko",
      "translations": {
        "ko": "반가워요! 저 평택역 근처 사는데 일요일에 시간 괜찮으시면 커피 한잔하면서 한국어 알려드릴게요! 환영합니다 :)",
        "vi": "Rất vui được gặp bạn! Tôi sống gần ga Pyeongtaek, nếu Chủ Nhật bạn rảnh thì vừa uống cà phê vừa tôi dạy tiếng Hàn cho nhé! Chào mừng bạn :)",
        "zh": "很高兴认识你！我住在平泽站附近，如果星期天有空的话，我们可以一起喝杯咖啡，我教你韩语！欢迎你 :)",
        "en": "Nice to meet you! I live near Pyeongtaek Station. If you're free on Sunday, let's grab a cup of coffee and I'll teach you Korean! Welcome :)",
        "ja": "はじめまして！私は平沢（ピョンテク）駅の近くに住んでいるのですが、日曜日に時間があればコーヒーでも飲みながら韓国語を教えてあげますよ！歓迎します :)",
        "ru": "Приятно познакомиться! Я живу недалеко от станции Пхёнтхэк. Если у вас есть время в воскресенье, давайте выпьем по чашке кофе, и я научу вас корейскому языку! Добро пожаловать :)",
        "th": "ยินดีที่ได้รู้จักครับ/ค่ะ! ฉันอาศัยอยู่ใกล้สถานีพย็องแท็ก ถ้าวันอาทิตย์นี้ว่าง มาดื่มกาแฟกันแล้วฉันจะสอนภาษาเกาหลีให้นะคะ/ครับ! ยินดีต้อนรับ :)",
        "uz": "Tanishganimdan xursandman! Men Pyeongtaek bekati yaqinida yashayman. Agar yakshanba kuni vaqtingiz bo'lsa, bir finjon kofe ustida sizga koreys tilini o'rgataman! Xush kelibsiz :)",
        "km": "រីករាយដែលបានស្គាល់! ខ្ញុំរស់នៅជិតស្ថានីយ៍ Pyeongtaek ប្រសិនបើអ្នកទំនេរនៅថ្ងៃអាទិត្យ យើងអាចញ៉ាំកាហ្វេមួយកែវ ហើយខ្ញុំនឹងបង្រៀនភាសាកូរ៉េដល់អ្នក! ស្វាគមន៍ :)",
        "mn": "Уулзсандаа таатай байна! Би Пёнтек станцийн ойролцоо амьдардаг юм. Ням гарагт завтай бол кофе уунгаа танд солонгос хэл зааж өгье! Тавтай морил :)",
        "ne": "भेटेर खुसी लाग्यो! म प्योङटेक स्टेसन नजिकै बस्छु, यदि आइतबार समय छ भने कफी खाँदै कोरियाली भाषा सिकाउनेछु! स्वागत छ :)",
        "id": "Senang berkenalan denganmu! Aku tinggal di dekat Stasiun Pyeongtaek. Kalau ada waktu di hari Minggu, ayo minum kopi sambil aku ajarkan bahasa Korea! Selamat datang :)",
        "my": "တွေ့ရတာ ဝမ်းသာပါတယ်။ ကျွန်တော်/မ က ပြုံးထက်ဘူတာအနီးမှာ နေတာပါ။ တနင်္ဂနွေနေ့ အချိန်ရရင် ကော်ဖီသောက်ရင်း ကိုရီးယားစာ သင်ပေးပါမယ်။ ကြိုဆိုပါတယ် :)",
        "si": "හමුවීම සතුටක්! මම ප්යොංටෙක් දුම්රිය ස්ථානය අසල ජීවත් වන්නේ. ඉරිදාට වේලාව තිබෙනවා නම් කෝපි එකක් බොන ගමන් කොරියානු භාෂාව ඉගැන්විය හැකියි! සාදරයෙන් පිළිගන්නවා :)",
        "kk": "Танысқаныма қуаныштымын! Мен Пхентхэк станциясының жанында тұрамын. Жексенбіде уақытыңыз болса, кофе ішіп, сізге корей тілін үйретейін! Қош келдіңіз :)",
        "bn": "আপনার সাথে পরিচয় হয়ে ভালো লাগলো! আমি পিয়ংট্যাক স্টেশনের কাছে থাকি, রবিবারে সময় থাকলে একসাথে কফি খেতে খেতে আপনাকে কোরিয়ান ভাষা শিখিয়ে দেব! স্বাগতম :)",
        "ur": "آپ سے مل کر خوشی ہوئی! میں پیونگ ٹیک اسٹیشن کے قریب رہتا ہوں، اگر اتوار کو آپ کے پاس وقت ہو تو ایک کپ کافی کے ساتھ آپ کو کوریائی زبان سکھا دوں گا! خوش آمدید :)",
        "tl": "Ikinagagalak kitang makilala! Nakatira ako malapit sa Pyeongtaek Station. Kung libre ka sa Linggo, mag-kape tayo habang tuturuan kita ng Korean! Maligayang pagdating :)"
      },
      "is_hidden": false,
      "created_at": "2026-08-23T07:33:53.930Z"
    },
    {
      "id": "comm-1-2",
      "post_id": "post-1",
      "user_id": "user-vn-02",
      "user_name": "다낭친구",
      "user_country": "VN",
      "user_flag": "🇻🇳",
      "content": "Chào bạn! Mình cũng ở gần chợ Pyeongtaek nè, cuối tuần này cho mình tham gia với nha!",
      "source_lang": "vi",
      "translations": {
        "ko": "Chào bạn! Mình cũng ở gần chợ Pyeongtaek nè, cuối tuần này cho mình tham gia với nha!",
        "vi": "Chào bạn! Mình cũng ở gần chợ Pyeongtaek nè, cuối tuần này cho mình tham gia với nha!",
        "zh": "你好！我也住在平泽市场附近，这个周末让我也一起参加吧！",
        "en": "Hello! I live near Pyeongtaek Market too, please let me join you this weekend!",
        "ja": "こんにちは！私も平沢市場の近くに住んでいます。今週末、ぜひ仲間に入れてください！",
        "ru": "Привет! Я тоже живу недалеко от рынка Пхёнтхэк, можно мне присоединиться к вам в эти выходные?",
        "th": "สวัสดีครับ! ผมก็อยู่ใกล้ตลาดพย็องแท็กเหมือนกัน ขอร่วมด้วยคนในวันเสาร์-อาทิตย์นี้นะครับ!",
        "uz": "Salom! Men ham Pxyongtaek bozori yaqinida yashayman, bu dam olish kunlari menga ham qo'shilishga ruxsat bering!",
        "km": "សួស្តី! ខ្ញុំក៏នៅជិតផ្សារ Pyeongtaek ដែរ ចុងសប្តាហ៍នេះសុំចូលរួមផងណា!",
        "mn": "Сайн уу! Би бас Пёнтек захын ойролцоо амьдардаг юм, энэ амралтын өдрүүдээр намайг нэгдэхийг зөвшөөрөөрэй!",
        "ne": "नमस्ते! म पनि प्योङटेक बजार नजिकै बस्छु, यो साताको अन्त्यमा मलाई पनि सहभागी हुन दिनुहोस् है!",
        "id": "Halo! Aku juga tinggal di dekat Pasar Pyeongtaek, akhir pekan ini ajak aku gabung ya!",
        "my": "မင်္ဂလာပါ! ကျွန်တော်လည်း ပြုံးတက်ဈေးအနီးမှာ နေတာပါ၊ ဒီတစ်ပတ်ပိတ်ရက်မှာ ပါဝင်ခွင့်ပြုပါဦးနော်!",
        "si": "හලෝ! මමත් ප්යොංතෙක් වෙළඳපොළ අසල ජීවත් වෙනවා, මේ සති අන්තයේ මටත් එකතු වෙන්න දෙන්න!",
        "kk": "Сәлем! Мен де Пхёнтхэк базарының жанында тұрамын, осы демалыс күндері маған да қосылуға рұқсат етіңізші!",
        "bn": "হ্যালো! আমিও পিয়ংট্যাক বাজারের কাছেই থাকি, এই উইকেন্ডে আমাকেও সাথে নিয়েন!",
        "ur": "ہیلو! میں بھی پیونگ ٹیک مارکیٹ کے قریب رہتا ہوں، اس ویک اینڈ پر مجھے بھی شامل ہونے دیں!",
        "tl": "Hello! Nakatira rin ako malapit sa Pyeongtaek Market, pasama naman ngayong weekend!"
      },
      "is_hidden": false,
      "created_at": "2026-08-23T08:03:53.930Z"
    }
  ],
  "post-2": [
    {
      "id": "comm-2-1",
      "post_id": "post-2",
      "user_id": "user-kr-02",
      "user_name": "안산천사",
      "user_country": "KR",
      "user_flag": "🇰🇷",
      "content": "친구님 힘내세요! 딸아이가 아빠를 정말 자랑스러워할 겁니다. 환절기 감기 조심하시고 따뜻한 밥 챙겨드세요!",
      "source_lang": "ko",
      "translations": {
        "ko": "친구님 힘내세요! 딸아이가 아빠를 정말 자랑스러워할 겁니다. 환절기 감기 조심하시고 따뜻한 밥 챙겨드세요!",
        "vi": "Cố lên bạn nhé! Con gái chắc chắn sẽ rất tự hào về người cha của mình. Thời tiết giao mùa hãy cẩn thận kẻo bị cảm lạnh và nhớ ăn cơm ấm áp nhé!",
        "zh": "朋友，加油！女儿一定会为有你这样的爸爸而感到自豪的。换季时期注意别感冒，记得吃热乎饭！",
        "en": "Cheer up, my friend! Your daughter will be really proud of her dad. Be careful not to catch a cold during the change of seasons, and make sure to eat warm meals!",
        "ja": "お友達、元気を出してください！娘さんはお父さんのことを本当に誇りに思うはずです。季節の変わり目なので風邪に気をつけて、温かいご飯を食べてくださいね！",
        "ru": "Держись, мой друг! Дочка будет действительно гордиться своим папой. Береги себя от простуды в смену сезонов и обязательно ешь теплую еду!",
        "th": "สู้ๆ นะครับเพื่อน! ลูกสาวต้องภูมิใจในตัวคุณพ่อมากแน่ๆ ระวังเป็นหวัดช่วงเปลี่ยนฤดู และอย่าลืมทานอาหารอุ่นๆ นะครับ!",
        "uz": "Do'stim, g'ayrat qiling! Qizingiz otasidan juda faxrlanadi. Fasl almashinuvida shamollashdan ehtiyot bo'ling va issiq ovqat yeb turing!",
        "km": "មិត្តភក្តិអើយ ខិតខំឡើង! កូនស្រីពិតជាមានមោទនភាពចំពោះឪពុករបស់នាងខ្លាំងណាស់។ ប្រយ័ត្នផ្តាសាយនៅពេលផ្លាស់ប្តូររដូវ ហើយកុំភ្លេចញ៉ាំបាយក្តៅៗផង!",
        "mn": "Найз минь, хичээгээрэй! Охин чинь ааваараа үнэхээр бахархах болно. Улирал солигдох үеэр ханиад хүрэхээс сэргийлж, халуун хоол сайн идэж байгаарай!",
        "ne": "साथी, हिम्मत राख्नुहोस्! छोरीले आफ्नो बुबाप्रति धेरै गर्व गर्नेछिन्। मौसम परिवर्तनको बेला चिसोबाट बच्नुहोस् र तातो खाना खानुहोस्!",
        "id": "Semangat, temanku! Putrimu pasti akan sangat bangga pada ayahnya. Hati-hati flu di musim pancaroba ini, dan jangan lupa makan makanan hangat!",
        "my": "မိတ်ဆွေ၊ အားတင်းထားပါ! သမီးလေးက သူ၏ဖခင်အတွက် အလွန်ဂုဏ်ယူနေမှာပါ။ ရာသီအကူးအပြောင်းမှာ အအေးမိမှာ ဂရုစိုက်ပါ၊ နွေးထွေးတဲ့ ထမင်းဟင်းများ စားပါ!",
        "si": "මිතුරා, ශක්තිමත් වන්න! දියණිය ඇගේ පියා ගැන තවත් ආඩම්බර වනු ඇත. සෘතු වෙනස් වන විට සෙම්ප්‍රතිශ්‍යාවෙන් ආරක්ෂා වී උණුසුම් කෑම වේලක් ගන්න!",
        "kk": "Достым, еңсеңді түсірме! Қызың әкесін өте мақтан тұтатын болады. Маусым ауысқанда тұмаудан сақтанып, ыстық тамақ ішіп жүр!",
        "bn": "বন্ধু, সাহস রাখুন! আপনার মেয়ে তার বাবাকে নিয়ে সত্যিই খুব গর্বিত হবে। ঋতু পরিবর্তনের এই সময়ে ঠান্ডা লাগা থেকে সাবধানে থাকবেন এবং গরম খাবার খাবেন!",
        "ur": "دوست، ہمت رکھیں! آپ کی بیٹی کو اپنے والد پر واقعی بہت فخر ہوگا۔ موسم کی تبدیلی میں زکام سے بچیں اور گرم کھانا کھائیں!",
        "tl": "Magpakatatap ka, kaibigan! Siguradong magiging sobrang ipinagmamalaki ng anak mong babae ang kaniyang ama. Mag-ingat sa sipon ngayong nagbabago ang panahon at kumain ng mainit na pagkain!"
      },
      "is_hidden": false,
      "created_at": "2026-08-23T05:03:53.930Z"
    }
  ],
  "post-5": [
    {
      "id": "comm-5-1",
      "post_id": "post-5",
      "user_id": "user-kr-04",
      "user_name": "화성노무사",
      "user_country": "KR",
      "user_flag": "🇰🇷",
      "content": "정리 정말 잘해주셨네요! 추가로 이전 사업장 폐업 등으로 인한 변경일 때는 폐업사실증명원 챙겨가시면 훨씬 수월합니다.",
      "source_lang": "ko",
      "translations": {
        "ko": "정리 정말 잘해주셨네요! 추가로 이전 사업장 폐업 등으로 인한 변경일 때는 폐업사실증명원 챙겨가시면 훨씬 수월합니다.",
        "vi": "Cảm ơn bạn đã tổng hợp rất chi tiết! Ngoài ra, nếu thay đổi do đóng cửa cơ sở kinh doanh trước đó, mang theo Giấy chứng nhận đóng cửa doanh nghiệp sẽ giúp quá trình diễn ra dễ dàng hơn nhiều.",
        "zh": "总结得太好了！另外，如果是因上一家事业所倒闭等原因引起的变更，带上《停业事实证明书》办理起来会顺利得多。",
        "en": "You summarized this so well! Additionally, if the change is due to the closure of a previous business, bringing a Certificate of Business Closure will make the process much easier.",
        "ja": "とても分かりやすくまとめてくださりありがとうございます！追加ですが、前の事業所の廃業などに伴う変更の場合は、廃業事実証明書を持参すると手続きがずっとスムーズになります。",
        "ru": "Отличный свод информации! Кроме того, если изменения связаны с закрытием предыдущего предприятия, вам будет гораздо проще, если вы возьмёте с собой справку о закрытии бизнеса.",
        "th": "สรุปได้ดีมากเลยครับ/ค่ะ! นอกจากนี้ หากเป็นการเปลี่ยนแปลงเนื่องจากการปิดกิจการของสถานที่ทำงานเดิม การนำใบรับรองการปิดกิจการไปด้วยจะช่วยให้ดำเนินการได้ง่ายขึ้นมาก",
        "uz": "Juda yaxshi tartiblab beribsiz! Qo'shimcha qiladigan bo'lsak, agar o'zgartirish avvalgi ish joyining yopilishi sababli bo'lsa, biznes yopilganligi haqidagi guvohnomani olib borsangiz, ish juda osonlashadi.",
        "km": "រៀបចំបានល្អណាស់! បន្ថែមពីនេះ ប្រសិនបើជាការផ្លាស់ប្តូរដោយសារការបិទទីតាំងអាជីវកម្មមុន ការយកលិខិតបញ្ជាក់ការបិទអាជីវកម្មទៅជាមួយ នឹងធ្វើឱ្យកាន់តែងាយស្រួល។",
        "mn": "Маш сайн цэгцэлж бичсэн байна! Нэмж хэлэхэд, өмнөх ажлын байр хаагдсанаас үүдэлтэй өөрчлөлт бол бизнес хаагдсан тухай тодорхойлолтыг авч очиход хавьгүй хялбар байх болно.",
        "ne": "धेरै राम्ररी मिलाएर लेख्नुभएको रहेछ! थप रूपमा, यदि अघिल्लो कार्यस्थल बन्द भएका कारणले परिवर्तन भएको हो भने, व्यवसाय बन्द भएको प्रमाण पत्र लिएर जानुभयो भने धेरै सजिलो हुनेछ।",
        "id": "Rangkumannya sangat bagus! Selain itu, jika perubahan disebabkan oleh penutupan tempat usaha sebelumnya, akan jauh lebih mudah jika Anda membawa Surat Keterangan Penutupan Usaha.",
        "my": "သပ်သပ်ရပ်ရပ် စုစည်းပေးထားတာ တကယ်ကောင်းပါတယ်! ထပ်လောင်းပြောရရင် ယခင်လုပ်ငန်းခွင် ပိတ်သိမ်းခြင်း စသည်တို့ကြောင့် ပြောင်းလဲခြင်းဖြစ်ပါက လုပ်ငန်းပိတ်သိမ်းကြောင်းသက်သေခံလက်မှတ် ယူဆောင်သွားပါက ပိုမိုလွယ်ကူပါလိမ့်မည်။",
        "si": "ඉතාම හොඳින් සාරාංශ කර තිබෙනවා! මීට අමතරව, පෙර ව්‍යාපාරය වසා දැමීම වැනි හේතුවක් නිසා සිදුවන වෙනස්කමකදී, ව්‍යාපාරය වසා දැමීමේ සහතිකය රැගෙන ගියහොත් වැඩේ ගොඩක් ලේසි වේවි.",
        "kk": "Өте жақсы жинақтапсыз! Қосымша айта кетейін, егер өзгеріс бұрынғы жұмыс орнының жабылуына байланысты болса, бизнестің жабылуы туралы анықтаманы ала барсаңыз, әлдеқайда оңай болады.",
        "bn": "খুব সুন্দরভাবে গুছিয়ে লিখেছেন! অতিরিক্ত তথ্য হিসেবে, আগের কর্মসংস্থান বন্ধ হয়ে যাওয়ার কারণে এই পরিবর্তন হলে, ব্যবসা বন্ধের সনদপত্র সাথে নিয়ে গেলে কাজ অনেক সহজ হবে।",
        "ur": "آپ نے بہت اچھی طرح سے ترتیب دیا ہے! مزید برآں، اگر یہ تبدیلی پچھلے کاروبار کے بند ہونے وغیرہ کی وجہ سے ہے، تو کاروبار بند ہونے کا سرٹیفکیٹ ساتھ لے جانا کام کو بہت آسان بنا دے گا۔",
        "tl": "Napakaganda ng pagkakaayos ninyo! Bilang karagdagan, kung ang pagbabago ay dahil sa pagsasara ng nakaraang lugar ng trabaho, mas magiging madali kung magdadala ka ng Sertipiko ng Pagsasara ng Negosyo."
      },
      "is_hidden": false,
      "created_at": "2026-08-22T17:03:53.930Z"
    }
  ],
  "post-11": [
    {
      "id": "comm-11-1",
      "post_id": "post-11",
      "user_id": "user-vn-03",
      "user_name": "하노이라이더",
      "user_country": "VN",
      "user_flag": "🇻🇳",
      "content": "우와 축하드려요! 저도 KTRS 배너 보고 신청했는데 어제 140만원 입금 알림톡 받았습니다 ㅎㅎ",
      "source_lang": "ko",
      "translations": {
        "ko": "우와 축하드려요! 저도 KTRS 배너 보고 신청했는데 어제 140만원 입금 알림톡 받았습니다 ㅎㅎ",
        "vi": "Wow, chúc mừng bạn nhé! Tôi cũng thấy banner KTRS rồi đăng ký, hôm qua đã nhận được tin nhắn thông báo nạp 1,4 triệu won rồi haha.",
        "zh": "哇，恭喜你！我也看了KTRS的横幅后申请了，昨天收到了140万韩元到账的通知消息，哈哈。",
        "en": "Wow, congratulations! I also applied after seeing the KTRS banner, and yesterday I got a notification message that 1.4 million won was deposited haha.",
        "ja": "わぁ、おめでとうございます！私もKTRSのバナーを見て申請したのですが、昨日140万ウォンの入金通知トークを受け取りました笑",
        "ru": "Вау, поздравляю! Я тоже подал(а) заявку, увидев баннер KTRS, и вчера получил(а) уведомление о зачислении 1,4 млн вон ха-ха.",
        "th": "ว้าว ยินดีด้วยนะคะ/นะครับ! ฉันเห็นแบนเนอร์ KTRS เลยสมัครไปเหมือนกัน เมื่อวานได้รับข้อความแจ้งเตือนเงินเข้า 1.4 ล้านวอนแล้ว 555",
        "uz": "Vov, tabriklayman! Men ham KTRS bannerini ko'rib topshirgan edim, kecha 1,4 million von tushgani haqida xabar oldim haha.",
        "km": "វ៉ាវ អបអរសាទរ! ខ្ញុំក៏បានដាក់ពាក្យបន្ទាប់ពីឃើញបដា KTRS ដែរ ហើយកាលពីម្សិលមិញបានទទួលសារជូនដំណឹងអំពីការដាក់ប្រាក់ ១,៤ លានវ៉ុន ហាហា",
        "mn": "Ваа, баяр хүргэе! Би ч бас KTRS баннерыг хараад хүсэлт гаргасан, өчигдөр 1.4 сая вон орсон тухай мэдэгдэл авлаа хаха.",
        "ne": "वाह, बधाई छ! मैले पनि KTRS ब्यानर देखेर आवेदन दिएको थिएँ, हिजो १४ लाख वन जम्मा भएको सूचना पाएँ हाहा।",
        "id": "Wah, selamat ya! Saya juga mendaftar setelah melihat banner KTRS, dan kemarin mendapat pesan pemberitahuan transfer 1,4 juta won haha.",
        "my": "ဝါး၊ ဂုဏ်ယူပါတယ်! ကျွန်တော်လည်း KTRS ဘန်နာကိုကြည့်ပြီး လျှောက်ခဲ့တာ၊ မနေ့က ၁.၄ သန်းဝမ် ငွေဝင်ကြောင်း အကြောင်းကြားစာ ရရှိခဲ့ပါတယ် ဟဟ။",
        "si": "වාව්, සුභ පැතුම්! මමත් KTRS බැනරය දැකලා ඉල්ලුම් කළා, ඊයේ මට වොන් මිලියන 1.4 ක් තැන්පත් වූ බවට පණිවිඩයක් ලැබුණා හාහා.",
        "kk": "Уау, құттықтаймын! Мен де KTRS баннерін көргеннен кейін өтініш берген едім, кеше 1,4 миллион вон түскені туралы хабарлама алдым хаха.",
        "bn": "ওয়াও, অভিনন্দন! আমিও KTRS ব্যানার দেখে আবেদন করেছিলাম, গতকাল ১.৪ মিলিয়ন ওন জমার নোটিফিকেশন মেসেজ পেয়েছি হাহা।",
        "ur": "واہ، مبارک ہو! میں نے بھی KTRS بینر دیکھ کر اپلائی کیا تھا، کل مجھے 1.4 ملین وان جمع ہونے کا نوٹیفکیشن میسج ملا ہاہا।",
        "tl": "Wow, congratulations! Nag-apply din ako nung makita ko ang KTRS banner, at kahapon nakatanggap ako ng deposit notification na 1.4 million won haha."
      },
      "is_hidden": false,
      "created_at": "2026-08-21T15:03:53.930Z"
    }
  ],
  "post-12": [
    {
      "id": "comm-12-1",
      "post_id": "post-12",
      "user_id": "user-np-03",
      "user_name": "카트만두형",
      "user_country": "NP",
      "user_flag": "🇳🇵",
      "content": "혹시 아직 밥솥 남아있나요? 제가 이번 주에 기숙사 들어왔는데 필요합니다! 오늘 저녁 7시에 갈 수 있어요.",
      "source_lang": "ko",
      "translations": {
        "ko": "혹시 아직 밥솥 남아있나요? 제가 이번 주에 기숙사 들어왔는데 필요합니다! 오늘 저녁 7시에 갈 수 있어요.",
        "vi": "Có còn nồi cơm điện không ạ? Tuần này em mới chuyển vào ký túc xá nên rất cần! Tối nay 7 giờ em có thể qua lấy được ạ.",
        "zh": "请问电饭煲还有吗？我这周刚搬进宿舍，真的很需要！今天晚上7点我可以过去取。",
        "en": "Is the rice cooker still available by any chance? I moved into the dorm this week and really need one! I can come pick it up today at 7 PM.",
        "ja": "もしかしてまだ炊飯器は残っていますか？今週寮に入ったばかりで必要なのですが！今日の夜7時に取りに行けます。",
        "ru": "Подскажите, рисоварка ещё есть? Я на этой неделе заселился в общежитие, и она мне очень нужна! Могу приехать сегодня в 7 вечера.",
        "th": "ไม่ทราบว่าหม้อหุงข้าวยังอยู่ไหมครับ/ค่ะ? พอดีเพิ่งย้ายเข้าหอพักสัปดาห์นี้เลยจำเป็นต้องใช้ครับ/ค่ะ! วันนี้ตอน 19:00 น. สามารถไปรับได้ครับ/ค่ะ",
        "uz": "Guruch pishirgich hali ham bormi? Men bu hafta yotoqxonaga ko'chib kirgan edim, u menga juda kerak! Bugun kechqurun soat 7 da bora olaman.",
        "km": "តើនៅសល់ឆ្នាំងដាំបាយដែរឬទេ? ខ្ញុំទើបតែរើចូលអន្តេវាសិកដ្ឋាននៅសប្តាហ៍នេះ ហើយខ្ញុំត្រូវការវាណាស់! ខ្ញុំអាចទៅយកនៅម៉ោង ៧ យប់นี้បាន។",
        "mn": "Танайд арай будаа агшаагч үлдсэн үү? Би энэ долоо хоногт дотуур байранд орсон болохоор хэрэгтэй байна! Өнөө орой 19:00 цагт очиж авч чадна.",
        "ne": "के अझै राईस कुकर बाँकी छ? म यो हप्ता होस्टेलमा सारेको छु र मलाई यसको आवश्यकता छ! म आज बेलुका ७ बजे आउन सक्छु।",
        "id": "Apakah rice cooker-nya masih ada? Saya baru pindah ke asrama minggu ini dan sangat membutuhkannya! Saya bisa datang jam 7 malam ini.",
        "my": "ထမင်းပေါင်းအိုး ကျန်သေးလားရှင့်/ခင်ဗျာ။ ဒီအပတ်မှ အဆောင်ပြောင်းလာတာမို့လို့ လိုအပ်နေပါတယ်! ဒီနေ့ည ရ နာရီမှာ လာယူလို့ရပါတယ်။",
        "si": "තාම රයිස් කුකර් එක තියෙනවද? මම මේ සතියේ ඩෝමිටරි එකට ආවා, මට ඒක ගොඩක් අවශ්‍යයි! මට අද හවස 7ට එන්න පුළුවන්.",
        "kk": "Күріш пісіргіш әлі бар ма? Мен осы аптада жатақханаға көшіп келдім, маған ол өте қажет! Бүгін кешкі сағат 7-де бара аламын.",
        "bn": "রাইস কুকারটি কি এখনো আছে? আমি এই সপ্তাহে ডরমিটরিতে উঠেছি, আমার এটি খুব প্রয়োজন! আমি আজ সন্ধ্যা ৭টায় যেতে পারব।",
        "ur": "کیا رائس ککر ابھی بھی دستیاب ہے؟ میں اس ہفتے ڈارمیٹری میں منتقل ہوا ہوں اور مجھے اس کی ضرورت ہے! میں آج شام 7 بجے آ سکتا ہوں۔",
        "tl": "Baka naman may rice cooker pa? Lumipat ako sa dorm ngayong linggo at kailangan ko talaga ito! Makakapunta ako ngayong 7 PM ng gabi."
      },
      "is_hidden": false,
      "created_at": "2026-08-21T07:03:53.930Z"
    }
  ]
};
