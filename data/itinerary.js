/**
 * data/itinerary.js
 * ------------------------------------------------------------------
 * Structured content layer for the Osaka/Kyoto itinerary website.
 *
 * Source of truth: ../大阪京都五日行程.txt (never edit that file).
 * This file is the ONLY place that should change for routine content
 * edits — times, restaurants, spots added/removed, transport, notes.
 *
 * Do NOT edit index.html / css/style.css / js/app.js just to change
 * itinerary content. See README.md for the editing guide and the
 * exact shape every field below must follow.
 *
 * Loaded as a plain (non-module) script so the site runs directly
 * from index.html via the file:// protocol — no build step, no server.
 * Exposes a single global: ITINERARY_DATA.
 * ------------------------------------------------------------------
 */

var ITINERARY_DATA = {
  trip: {
    title: "OSAKA · KYOTO",
    subtitle: "5 Days Journey",
    dateRange: "2026.11.03 — 11.07",
    titleLocal: "大阪・京都 五日紀行",
    stats: [
      { label: "Travelers", value: "3" },
      { label: "Nights", value: "4" },
      { label: "Cities", value: "2" }
    ]
  },

  overview: {
    dates: "2026年11月3日（二）～11月7日（六）・4泊5日",
    travelers: "三人同行",
    cities: "大阪・京都",
    flights: [
      { label: "去程", date: "11/3（二）", flightNo: "CI156", from: "桃園 T2", departs: "08:05", to: "關西 T1", arrives: "11:35" },
      { label: "回程", date: "11/7（六）", flightNo: "CI153", from: "關西 T1", departs: "14:30", to: "桃園 T2", arrives: "16:50" }
    ],
    flightNote: "T1＝第1航廈、T2＝第2航廈；時間為當地時間。",
    accommodation: {
      name: "日本橋近鐵站附近套房",
      detail: "4晚・3人",
      station: "近鐵日本橋站步行約5分鐘，鄰近黑門市場／難波／道頓堀",
      address: "2-chōme-6-17 Kōzu, Chuo Ward, Osaka, Osaka 542-0072（〒542-0072 大阪市中央區高津2丁目6-17）",
      locationQuery: "2-chōme-6-17 Kōzu, Chuo Ward, Osaka, Osaka 542-0072"
    }
  },

  days: [
    {
      id: "day1",
      day: 1,
      date: "11/3",
      dateISO: "2026-11-03",
      weekday: "TUE",
      weekdayLocal: "二",
      city: "OSAKA",
      title: "抵達＋大阪初體驗",
      subtitle: "文化の日",
      highActivity: false,
      items: [
        {
          time: "11:35〜12:50",
          title: "抵達關西機場",
          description: "CI156 11:35抵達關西機場第1航廈；入境後搭南海Rapi:t直達難波",
          notes: [
            "搭南海特急Rapi:t（指定席）到難波；不要誤搭JR關空快速",
            {
              text: "入境卡：官方推薦Visit Japan Web，也可用紙本；建議在飛機上先填好。領取與填寫重點見「攻略」，範例圖點下方按鈕",
              image: { src: "images/guides/arrival-card-example.png", alt: "紙本入境卡填寫範例（示意圖）", label: "填寫範例" }
            }
          ],
          badges: ["TRANSPORT"],
          guide: {
            type: "info",
            sections: [
              { label: "交通路線", text: "入境提領行李後，依「南海電鐵／NANKAI」指標前往關西機場站（南海電鐵車站位於第1航廈2F，經聯絡空橋可達）；搭乘南海特急Rapi:t前往「難波」站，為指定席，搭車前請確認車次、座位與月台；抵達南海難波站後，再依當日住宿位置前往近鐵日本橋站附近。" },
              { label: "入境卡領取", text: "官方推薦用Visit Japan Web線上填寫（取得QR碼），也可以用紙本；紙本有繁體中文版，多半在飛機上發放，或在入境審查場入口附近自取（實際以航班與現場為準），每人一張。" },
              { label: "紙本填寫重點", text: "英文或日文、黑色原子筆；姓名依護照拼音；生日依序日／月／年；現住所填TAIWAN與居住城市；目的勾「觀光」；填搭乘的航班編號；停留天數11/3〜11/7填5天；日本聯絡處填住宿名稱與地址（一處即可），電話填自己的電話；三題皆沒有就勾「いいえ／No」；簽名與護照相同。" },
              { label: "小提醒", text: "建議在飛機上先填好，下機排隊時就不用再停下來寫；範例圖為自行繪製的示意圖（虛構資料），實際以現場拿到的入境卡為準。" }
            ]
          }
        },
        {
          time: "13:40〜14:00",
          title: "入住日本橋近鐵站套房",
          description: "稍作休息",
          notes: [],
          badges: ["REST"],
          locationQuery: "2-chōme-6-17 Kōzu, Chuo Ward, Osaka, Osaka 542-0072"
        },
        {
          time: "14:00〜14:25",
          title: "自由活動／休息",
          description: "搭機後先休息約25分鐘，14:25前出發前往中之島；若入境延誤，休息時間直接縮短或略過",
          notes: [],
          badges: ["REST"]
        },
        {
          time: "14:25〜14:55",
          title: "前往中之島（肥後橋）",
          description: "搭地鐵四橋線至肥後橋",
          notes: [
            "從難波搭四橋線到肥後橋約10分鐘，從住處出發請預留約25〜30分鐘（實際路線與時間請用Google Maps確認）"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "14:55〜15:15",
          title: "GLITCH COFFEE OSAKA（外帶）",
          description: "中之島的精品咖啡店，這次外帶咖啡，邊走邊喝",
          notes: [
            "外帶計畫：點餐後直接前往梅田；假日人潮較多，可能需要排隊",
            "位置：中之島3-2-4（Festival Tower West 1樓），肥後橋站4號出口步行約1〜4分鐘"
          ],
          badges: ["FOOD"],
          locationQuery: "GLITCH COFFEE OSAKA 大阪",
          guide: {
            type: "food",
            specialty: "中之島的精品咖啡店，以淺焙單品手沖聞名，約30種豆子可選，店員會讓客人試聞咖啡豆；店內有沙發與黑膠唱片機，氣氛像飯店交誼廳。地址：大阪市北區中之島3-2-4（Festival Tower West 1樓），京阪渡邊橋站也近。",
            mustTry: "①淺焙單品手沖（評論最常稱讚，果香明顯）；②拿鐵（網友推薦為大阪最好喝的拿鐵之一）與Flat White；請店員依喜好推薦並試聞豆子",
            orderingTips: "①手沖：可直接說「想要果香明顯的淺焙，要外帶」請店員推薦；②拿鐵：有網友推薦拿鐵，也有訪客推薦用哥倫比亞豆的拿鐵，常客稱讚Flat White，想喝奶味可點這兩款，外帶最方便；③稀有特選豆有時會用日本酒酒器盛裝（約¥1,200起），外帶可能體驗不到，外帶是否能選手沖請現場確認（網路評論整理，樣本有限）。",
            reviewSummary: "有網友說這裡是大阪最好喝的拿鐵之一（網友說法，非官方評比）；食べログ約3.5分（約260則）、Google 4.4分（1,100多則）；多數評論稱讚手沖的果香，拿鐵也有人覺得順口帶一點果香。",
            budget: "手沖約¥1,000起，拿鐵約¥1,200（有網友記錄），整體約¥1,000〜2,000／人；請看現場菜單",
            budgetVerifiedAt: "2026-10",
            hours: "8:00〜19:00（週末與假日9:00〜19:00）；公休說法各網站不一，出發前請確認",
            reservationTip: "沒有查到預約資訊；假日人潮較多，建議14:55前後入店，外帶可節省時間。",
            elderFriendly: "店內有沙發與休息椅，環境安靜；這次計畫外帶，若想坐下休息也可以內用。"
          }
        },
        {
          time: "15:15〜15:35",
          title: "前往梅田",
          description: "拿著外帶咖啡，從肥後橋前往梅田（大阪站）",
          notes: [
            "實際路線與時間請用Google Maps確認（可搭四橋線到西梅田再步行）"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "15:35〜16:05",
          title: "Shake Shack 梅田阪神店",
          description: "阪神梅田本店1樓，面對御堂筋，先吃漢堡當點心",
          notes: [
            "營業10:00〜22:00；11/3是國定假日，用餐時段可能排隊",
            "晚餐要吃大阪燒，建議只點單品漢堡（例如招牌ShackBurger）或分食，不要點整套餐"
          ],
          badges: ["FOOD"],
          locationQuery: "Shake Shack 梅田阪神店 大阪",
          guide: {
            type: "food",
            specialty: "紐約起家的漢堡連鎖，招牌是ShackBurger與奶昔；梅田這間在阪神百貨1樓，面對御堂筋。地址：大阪市北區梅田1-13-13 阪神梅田本店1樓；JR大阪站與阪神梅田站步行約5分鐘，到大丸梅田店也只要步行幾分鐘。",
            mustTry: "①ShackBurger（招牌，評價最穩）；②Shroom Burger（蘑菇漢堡，店長推薦）或SmokeShack（偏辣）",
            orderingTips: "①最穩：招牌ShackBurger，安格斯牛肉漢堡，口味評價穩定，也是多數人的首選；②特色：Shroom Burger（炸波特貝拉蘑菇夾三種起司，不含肉），有評論說是店長推薦；想吃重口味可選SmokeShack（培根＋櫻桃辣椒，偏辣）；③薯條評價兩極，晚餐還有大阪燒，建議不點或分食；日本限定口味的奶昔常被推薦，但份量與甜度偏高（網路評論整理，樣本有限，價格請看現場菜單）。",
            hours: "10:00〜22:00（最後點餐約21:30，各網站寫法略有不同）",
            reservationTip: "沒有查到預約資訊；國定假日用餐時段可能排隊，提早到比較保險。"
          }
        },
        {
          time: "16:05〜16:25",
          title: "grenier 梅田店（外帶甜點）",
          description: "阪急Grand Building 1樓，烤布蕾千層酥；招牌不明顯，先看下面的找路說明",
          notes: [
            "找店：招牌非常不明顯，第一次來容易找不到。評論的走法：從梅田站下車走地下道，往「5-66」出口，右轉再右轉，看到電扶梯不要上去，店就在旁邊（出口編號與動線以現場標示和Google地圖為準）",
            "地面找法：在阪急Grand Building 1樓、阪急SUN廣場旁（HEP FIVE對面），入口在北側不是正面；看到轉角的排隊人潮就對了。從Shake Shack（阪神梅田本店）步行約3〜5分鐘（估計）",
            "排隊：有兩條動線，右邊是點餐結帳、左邊是取餐；先點餐拿號碼，再到取餐隊伍等叫號。11/3是國定假日，預留約20〜25分鐘"
          ],
          badges: ["FOOD"],
          locationQuery: "grenier 梅田店 阪急グランドビル 大阪",
          guide: {
            type: "food",
            specialty: "梅田阪急Grand Building 1樓的外帶甜點店（北濱也有分店），招牌是烤布蕾千層酥，卡士達內餡、表面炙燒焦糖；也賣焼き菓子、費南雪、磅蛋糕與紅茶。地址：大阪市北區角田町8-47，電話06-6360-6655。",
            mustTry: "烤布蕾千層酥（ブリュレミルフィーユ）；有草莓、綠葡萄、櫻花等季節限定口味，是否供應看現場",
            orderingTips: "沒有內用座位，入口附近有長椅可以簡單吃；現烤要稍等；烤好的酥脆口感最好，建議買了馬上吃；這天甜點較多（Glitch咖啡、漢堡、晚上的Ice Dog），建議3位分食1〜2個。",
            reviewSummary: "Google 4.5分（約1,020則）；網路評論稱讚酥脆、卡士達濃郁，也提到店面不顯眼、傍晚也常有人排隊。",
            budget: "原味約¥1,000（較早的資料）、草莓特別款曾記錄¥1,800；現價請看現場",
            budgetVerifiedAt: "2026-10",
            hours: "約10:00〜20:00；休息日各來源不一（不定休、依大樓公休、無休），出發前可看官方Instagram @patisserie_grenier",
            elderFriendly: "沒有內用座位，只有入口附近的長椅，需站著或邊走邊吃。",
            checkTips: "迷路時請用Google地圖導航，並找轉角的排隊人潮；店門口沒有明顯招牌"
          }
        },
        {
          time: "16:25〜17:05",
          title: "阪急うめだ本店：SHIRO＋LE LABO",
          description: "阪急うめだ本店3樓的兩個香氛品牌專櫃，離grenier步行幾分鐘；已決定香款，直接購買",
          notes: [
            "LE LABO（3樓，電話06-6313-7137）：官方寫部分品項有現場調配（フレッシュブレンディング），不提供補充瓶；已決定香款，直接向店員說品名與尺寸，免稅是否適用請現場確認",
            "SHIRO（樓層官方沒有寫，有資料寫在3樓化粧品賣場，請看現場樓層導覽）：有免稅對應（2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認），請帶護照；先決定要買的品項（香氛、保養或彩妝）",
            "兩個專櫃共約40分鐘；17:05離開，17:10到HARE（HEP FIVE，約1小時），18:15要到alotta，請留意時間"
          ],
          badges: ["SHOPPING"],
          locationQuery: "阪急うめだ本店 大阪",
          guide: {
            type: "shopping",
            highlights: "阪急うめだ本店3樓同時有LE LABO與SHIRO（官方一覽比對；大丸梅田店沒有SHIRO）。",
            recommendedItems: "LE LABO：已決定香款，建議先把品名與尺寸存在手機；SHIRO：官方標示取扱類別為彩妝、保養、香氛。",
            hours: "請以阪急うめだ本店的營業時間為準（官方一覽沒有寫各店時間，一般資料寫約10:00〜20:00）",
            tips: "LE LABO官方頁面沒有寫免稅，SHIRO寫有免稅與容器回收服務；免稅是否適用、結帳方式請向店員確認。",
            sections: [
              { label: "LE LABO 補充", text: "電話06-6313-7137；官方寫部分品項有現場調配，但不提供補充瓶（リフィル）；其他大阪店舖：高島屋大阪店（1樓）、南堀江（路面店），都不在這天路線上。" }
            ]
          }
        },
        {
          time: "17:10〜18:10",
          title: "HARE 梅田 HEP FIVE（5樓）",
          description: "阪急うめだ本店步行約3〜5分鐘（HEP FIVE就在阪急SUN廣場旁），日系男女服飾，預留約1小時",
          notes: [
            "營業11:00〜21:00（官方店舖頁）；地址：大阪市北區角田町5-15 HEP FIVE 5樓；電話06-6366-3900",
            "預留約1小時（含步行約5分鐘，適合試穿）；南堀江店不在路線上，這家是同品牌的梅田店，品項與南堀江是否相同我沒查到"
          ],
          badges: ["SHOPPING"],
          locationQuery: "HARE 梅田ヘップファイブ 大阪",
          guide: {
            type: "shopping",
            highlights: "HARE是日本的男女裝品牌；梅田店在HEP FIVE 5樓，與阪急うめだ本店的SHIRO、LE LABO同一區。另有LUCUA 7樓店（大阪站），這次沒排入。",
            hours: "11:00〜21:00（官方店舖頁；以現場為準）",
            tips: "免稅是否適用請向店員確認；HEP FIVE營業到21:00，若前面grenier排隊超過預期，這段可以順延或縮短。"
          }
        },
        {
          time: "18:15〜18:50",
          title: "alotta 梅田茶屋町（Milbon護髮）",
          description: "阪急梅田站茶屋町口步行約1〜3分鐘，沙龍專賣護髮品商店",
          notes: [
            "營業約11:00〜20:00（假日10:00〜20:00），各網站寫法不一致，免稅是否可用也尚未確認，請先電話或官網確認",
            "護髮品多為液體，請放托運行李；購買後要帶到旅程最後，請預留行李空間"
          ],
          badges: ["SHOPPING"],
          locationQuery: "alotta 梅田茶屋町 大阪",
          guide: {
            type: "shopping",
            highlights: "1樓商店常備約5,000種沙龍專賣護髮品，可現場試用與諮詢，包含Milbon等品牌；2樓是全包廂式美容院。地址：大阪市北區茶屋町2-28（Central茶屋町）；御堂筋線梅田站步行約2分鐘，阪急梅田站茶屋町口步行約1〜3分鐘。",
            hours: "約11:00〜20:00（假日10:00〜20:00），各網站營業時間與公休日寫法不一致，請先確認",
            tips: "建議先上網確認想買的Milbon產品線有沒有；液體商品請放托運行李；免稅是否可用請先詢問。"
          }
        },
        {
          time: "19:05〜19:45",
          title: "大丸梅田店",
          description: "13樓 Nintendo OSAKA、寶可夢中心大阪；從alotta步行約10〜15分鐘，離梅田站（御堂筋線）近",
          notes: [
            "營業10:00〜20:00；13樓的Nintendo OSAKA與寶可夢中心大阪營業時間同大丸，人多時可能需排隊進場",
            {
              text: "優惠券需出示護照，單筆含稅滿¥3,000，食品與餐廳不適用，有效至2027/8/31；角色商品是否適用請向店員確認",
              image: { src: "images/coupons/daimaru.jpg", alt: "大丸／松坂屋 優惠券", label: "優惠券" }
            }
          ],
          badges: ["SHOPPING"],
          locationQuery: "大丸梅田店 大阪",
          guide: {
            type: "shopping",
            highlights: "位在JR大阪站南門大樓，13樓集中Nintendo OSAKA、寶可夢中心大阪等角色商店，是任天堂與寶可夢周邊的熱門採買點。",
            tips: "店20:00打烊，行程安排19:45前離開，再搭御堂筋線回難波；2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認。"
          }
        },
        {
          time: "19:45〜20:30",
          title: "返回難波",
          description: "搭御堂筋線回難波，前往道頓堀",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "20:30〜22:00",
          title: "道頓堀・心齋橋",
          description: "",
          notes: [
            "晚餐建議美津の（大阪燒），甜點可吃Ice Dog；兩家的特色、點餐攻略與MAP在「攻略」裡",
            "⚠ 20:30才到：美津の最後點餐21:00（常排隊）、Ice Dog營業到21:00，請先排美津の、甜點視時間決定；Day 2是10:30才開始，Day 1可晚到約22:00回住處",
            {
              text: "藥妝（與下面的唐吉軻德二擇一，想用優惠券選這家）：Sundrug 道頓堀店（宗右衛門町，營業至深夜）；優惠券單筆未稅滿¥10,000起適用，最高約17% OFF（含免稅），有效至2026/12/31",
              locationQuery: "サンドラッグ 道頓堀店 大阪",
              image: { src: "images/coupons/sundrug.jpg", alt: "Sundrug 優惠券", label: "優惠券" }
            },
            {
              text: "零食雜貨（與Sundrug二擇一，想逛得久或晚點去選這家）：ドン・キホーテ 道頓堀店（宗右衛門町7-13，24小時營業、無休；難波站14號出口步行約5分鐘，有黃色摩天輪當標記）；有免稅對應（2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認，請帶護照）；沒有這個行程的優惠券",
              locationQuery: "ドン・キホーテ 道頓堀店 大阪",
              details: {
                label: "優惠券",
                text: "官方「Discount Coupon」（繁體中文頁）對象是免稅購買者：頁面圖片寫免稅最高10% OFF，另加不含稅¥10,000以上5% OFF，或不含稅¥30,000以上7% OFF（實際折扣以店員結帳為準）。重要：「結帳後出示優惠券將無法使用」，請在結帳前出示。官方頁面是互動式的（要選擇優惠券才會產生可出示的畫面，也有「已使用」狀態），所以我沒有把條碼放進網站，請在店內結帳前再開啟官方頁面。2026/11/1起免稅改為出境後退稅，優惠券在新制度下如何使用請向店員確認。",
                link: { label: "開啟唐吉軻德官方優惠券頁", url: "https://japanportal.donki-global.com/coupon/cp001_zhtw.html" }
              }
            }
          ],
          badges: ["FOOD", "PHOTO", "SHOPPING"],
          locationQuery: "道頓堀 心齋橋 大阪",
          guide: {
            type: "attraction",
            summary: "大阪最有名的夜景街，運河兩邊都是霓虹招牌，是大阪的象徵畫面。",
            highlights: "固力果跑跑人看板和大螃蟹招牌是外國遊客必拍；沿著河邊走很有氣氛，心齋橋筋商店街可以順路逛街。",
            photoTips: "最熱門的拍法：站在戎橋上，面向北邊（背對難波站），讓固力果招牌和運河一起入鏡。天黑招牌全亮最好看；橋上很擠，拍完請讓位給後面的人。",
            photoExample: {
              src: "images/photos/dotonbori.jpg",
              alt: "道頓堀運河與霓虹看板夜景",
              caption: "戎橋一帶看道頓堀運河與霓虹看板（夜景）",
              author: "Martin Falbisoner",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Dotonbori,_Osaka,_at_night,_November_2016.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "晚上人很多，貴重物品要看好；沿河邊單側走比較順。",
            stops: [
              {
                name: "晚餐：美津の 道頓堀本店", brief: "大阪燒老店；必點山芋焼",
                locationQuery: "お好み焼 美津の 道頓堀 大阪",
                specialty: "大阪燒老店，昭和20年創業；名物是「美津の燒」與口感鬆軟的山芋燒。",
                mustTry: "①山芋焼（最多人點，口感鬆軟、山芋味明顯，有評論說不用麵粉）；②美津の焼（店名招牌，豬肉、絞肉、花枝、蝦、干貝等海鮮豐富）",
                orderingTips: "想多嚐幾種可點山芋焼＋美津の焼各一份，3人分食（評論最常提到）。",
                budget: "約¥1,400〜1,650，各網站不同，請看現場菜單",
                budgetVerifiedAt: "2026-10",
                hours: "11:00〜22:00，最後點餐21:00；常需排隊"
              },
              {
                name: "購物：ドン・キホーテ 道頓堀店（24小時，與Sundrug二擇一）", brief: "24小時營業；零食、雜貨、藥妝一次逛",
                locationQuery: "ドン・キホーテ 道頓堀店 大阪",
                specialty: "戎橋一帶的大型驚安殿堂，黃色摩天輪是標記；地址：大阪市中央區宗右衛門町7-13，電話0570-026-511；難波站14號出口步行約5分鐘。",
                orderingTips: "與Sundrug擇一即可：想用Sundrug的優惠券（單筆未稅滿¥10,000起）選Sundrug；想逛零食、雜貨、伴手禮或晚一點去選這家，唐吉軻德官方優惠券（免稅者，不含稅¥10,000以上加5% OFF）可在備註的「優惠券」按鈕裡看說明與官方連結，要在結帳前出示。免稅（2026/11/1起出境後退稅）請向店員確認，並帶護照。",
                hours: "24小時營業、無休（官方店舖頁）；免稅櫃檯的時間官方沒有寫，深夜可能由別處處理"
              },
              {
                name: "甜點：元祖Ice Dog（美國村）", brief: "現炸麵包夾冰淇淋；原味最穩",
                locationQuery: "元祖アイスドッグ 西心斎橋 大阪",
                specialty: "西心齋橋美國村的名物，把軟式冰淇淋夾進現炸的甜麵包。",
                mustTry: "原味「アイスドッグ」（北海道牛乳軟冰淇淋夾現炸甜麵包，口味評價最一致）",
                orderingTips: "想換口味可選抹茶或巧克力「ミックス」；加¥50可加醬料；麵包現點現炸，要趁熱吃。",
                budget: "約¥350〜530，各網站寫法不同，請看現場菜單",
                budgetVerifiedAt: "2026-10",
                hours: "11:00〜21:00，不定休"
              }
            ]
          }
        }
      ]
    },

    {
      id: "day2",
      day: 2,
      date: "11/4",
      dateISO: "2026-11-04",
      weekday: "WED",
      weekdayLocal: "三",
      city: "OSAKA",
      title: "天保山＋大阪城",
      subtitle: "",
      highActivity: false,
      items: [
        {
          time: "10:30〜12:30",
          title: "海遊館",
          description: "鯨鯊、企鵝、水獺，室內動線平緩",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "海遊館 大阪",
          guide: {
            type: "attraction",
            summary: "世界級的大型水族館，最大亮點是中央的「太平洋」大水槽，裡面有鯨鯊。",
            highlights: "先搭手扶梯到最高樓，再沿著斜坡一路往下走，可以從不同高度看同一個大水槽；水獺和企鵝也很受歡迎。",
            photoTips: "最熱門的是大水槽裡的鯨鯊。手機貼近玻璃可以減少反光，請不要開閃光燈（館內禁止）。下層的大窗口可以近距離看到魚群。",
            photoExample: {
              src: "images/photos/kaiyukan.jpg",
              alt: "海遊館大水槽裡的鯨鯊與鬼蝠魟",
              caption: "「太平洋」大水槽裡的鯨鯊與鬼蝠魟",
              author: "SR EXR",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Kaiyukan_Manta_and_Whale_shark.JPG",
              licenseName: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
            },
            tips: "10:30開館（依日期會變動，請以官網為準）；動線是單向的，不用走回頭路。"
          }
        },
        {
          time: "12:30〜13:20",
          title: "天保山市場街午餐",
          description: "橫丁有營業就吃原訂的店；沒有營業就去森ノ宮吃うどん居酒屋 麦笑",
          notes: [
            "⚠ なにわ食いしんぼ橫丁自2026/9/29起除部分店家外休業整修（預計2027年3月下旬重開），哪些店繼續營業尚未公布，要到現場才知道；出發前可打電話問：海遊館／Marketplace 06-6576-5501（日本時間）",
            "現場決策：A. 橫丁有營業 → 吃原訂的店（自由軒、北極星、會津屋、ぼてぢゅう任選一家，出餐較快）；B. 沒有營業 → 12:30前離開，搭中央線到森ノ宮，吃うどん居酒屋 麦笑（週三有營業，午餐11:00〜15:00，最後點餐14:30），吃完直接走去大阪城。麦笑的特色、點餐攻略與MAP在「攻略」裡"
          ],
          badges: ["FOOD", "PENDING"],
          locationQuery: "天保山市場街 大阪",
          guide: {
            type: "attraction",
            summary: "海遊館旁邊的美食街兼伴手禮商場，吃飯、買紀念品都很方便。",
            highlights: "旁邊就是天保山大摩天輪，吃完飯可以順便看；同區還有港灣遊船，行程沒有排入，時間夠再考慮。",
            photoTips: "大摩天輪是這一帶最醒目的背景，可以把它和港邊景色一起拍。",
            photoExample: {
              src: "images/photos/tempozan.jpg",
              alt: "海遊館與遠處的天保山大摩天輪",
              caption: "海遊館（左）與遠處的大摩天輪",
              author: "Jan Eglinger",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Osaka_harbour_tempozan_view.jpg",
              licenseName: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/"
            },
            sections: [
              { label: "目前狀況", text: "なにわ食いしんぼ橫丁（天保山Marketplace 2樓）2026年9月18日公布全面改裝：9/29起除部分店家外休業，工程至2027年3月下旬，屆時新增7家店。哪些店家休業期間繼續營業，報導當時尚未公布，我也查不到最新名單。" },
              { label: "B方案時間（估計）", text: "12:30離開 → 搭中央線大阪港站到森ノ宮站（約20〜25分鐘）→ 步行約5分鐘到麦笑，約13:10用餐，吃完約13:50 → 從森ノ宮走到大阪城天守閣約18分鐘（資料），大阪城開始時間會比原本14:00晚約15分鐘。實際路線與時間請用Google Maps確認。" },
              { label: "評價怎麼看", text: "食べログ分數多來自2021年的整理文章，現在可能不同，請以最新頁面為準。不吃牛肉的話，請留意咖哩、串炸等是否含牛肉。" }
            ],
            stops: [
              {
                name: "【A 有營業時】自由軒 天保山店（橫丁2樓）", brief: "生蛋咖哩；食べログ約3.3",
                locationQuery: "自由軒 天保山マーケットプレース 大阪",
                specialty: "大阪名物咖哩的老店，咖哩附生蛋，淋上醬汁拌著吃。",
                mustTry: "名物カレー（生蛋咖哩）",
                reviewSummary: "食べログ約3.3分（約160〜210則，2021年資料），是橫丁店家中分數最高之一；Retty約370人想去、52則口評，評論說生蛋咖哩配啤酒也合。",
                hours: "橫丁整修，營業與否到現場確認"
              },
              {
                name: "【A 有營業時】北極星 天保山店（橫丁2樓）", brief: "蛋包飯＋炸蝦；食べログ約3.08",
                locationQuery: "北極星 天保山マーケットプレース 大阪",
                specialty: "蛋包飯發源店，昔日風格的洋食。",
                mustTry: "蛋包飯＋炸蝦套餐（人氣）；也可外帶",
                reviewSummary: "食べログ約3.08分（約140則，2021年資料）；Retty約400人想去、32則口評。",
                hours: "橫丁整修，營業與否到現場確認"
              },
              {
                name: "【A 有營業時】會津屋 天保山店（橫丁／美食廣場）", brief: "章魚燒，出餐快",
                locationQuery: "会津屋 天保山マーケットプレース 大阪",
                specialty: "章魚燒發源店；醬油高湯底的生地，不沾醬也能吃；橫丁與2樓美食廣場都有登記店舖。",
                mustTry: "章魚燒、ラヂオ焼き（筋與蒟蒻為主料的燒物）",
                orderingTips: "出餐快，適合只有50分鐘的行程；3位可各點不同款分著吃。",
                reviewSummary: "天保山店的食べログ分數我沒查到；本店評論稱讚高湯味突出。",
                budget: "章魚燒12個約¥700、ラヂオ焼き12個約¥850（資料未註明哪一家，僅供參考）",
                budgetVerifiedAt: "2026-10"
              },
              {
                name: "【A 有營業時】ぼてぢゅう（橫丁2樓）", brief: "大阪燒老店",
                locationQuery: "ぼてぢゅう 天保山マーケットプレース 大阪",
                specialty: "大阪燒老店，昭和21年創業，橫丁2樓設有店舖。",
                mustTry: "大阪燒",
                reviewSummary: "天保山店的食べログ分數我沒查到。"
              },
              {
                name: "【B 沒有營業時】うどん居酒屋 麦笑（森ノ宮）", brief: "烏龍麵百名店；油まぜ麺、咖哩烏龍麵",
                locationQuery: "うどん居酒屋 麦笑 森ノ宮 大阪",
                specialty: "森ノ宮站步行約5分的自家製麵烏龍麵店（兼居酒屋）。國產小麥全自家製麵，麵Q彈有嚼勁（剛麵系）；高湯用利尻昆布與多種柴魚片，有層次但後味清爽；曾入選「烏龍麵百名店2020」。地址：大阪市東成區中道1-10-19。",
                mustTry: "①午餐限定「自家製チャーシューの油まぜ麺」（叉燒拌麵，人氣）；②とり天カレーうどん（人氣，咖哩烏龍麵共約8種，可加烤起司）；③日替わり定食（有網友記錄為炸雞天丼配烏龍麵與小缽，約¥880，內容依日而異）",
                orderingTips: "評論最常提到：油まぜ麺（午餐限定）與とり天カレーうどん；3位可各點不同款分著嚐；麵可大盛免費的情況依日替定食而異，請看現場菜單；夏季限定的ひやかけ11月不一定有；麵賣完即打烊，建議13:10左右抵達，最後點餐14:30。",
                reviewSummary: "食べログ約3.7分（有資料寫3.71，現在分數請看食べログ）；評論稱讚麵的彈力與有層次的高湯、午餐划算；平日午餐常有行列。",
                budget: "午餐約¥1,000以內（資料）",
                budgetVerifiedAt: "2026-10",
                hours: "午餐11:00〜15:00（最後點餐14:30），麵賣完即打烊；夜間18:00〜22:00；週日公休（11/4週三有營業）；電話06-6971-0972"
              }
            ]
          }
        },
        {
          time: "13:20〜14:00",
          title: "移動至大阪城",
          description: "",
          notes: [
            "若午餐在森ノ宮吃麦笑（B方案），從麦笑直接走去大阪城（森ノ宮站→天守閣約18分鐘，資料），不用再搭車"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "14:00〜15:30",
          title: "大阪城公園・天守閣",
          description: "天守閣有電梯，免爬樓梯",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "大阪城 大阪",
          guide: {
            type: "attraction",
            historyBrief: "豐臣秀吉在1583年下令建造，是他統一天下的象徵。城堡被燒毀過好幾次，現在的天守閣是1931年重建的，裡面是博物館，不是當年的原樣。",
            summary: "大阪最有名的城堡，白綠色的天守閣立在高高的石牆上，四周有護城河和公園。",
            highlights: "天守閣最上層是戶外展望台，可以360度看大阪市區；天守閣有電梯，不用爬樓梯。",
            photoTips: "熱門拍照點：西之丸庭園（從西邊拍天守閣，是經典明信片角度）、極樂橋（橋和城堡一起入鏡）、護城河倒影（水面平靜時最好看）。早上10點前光線好、人也少。",
            photoExample: {
              src: "images/photos/osakajo.jpg",
              alt: "大阪城護城河與極樂橋",
              caption: "護城河與極樂橋（照片中沒有拍到天守閣）",
              author: "そらみみ (Soramimi)",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Gokurakubashi_Bridge_on_Inner_Moat_of_Osaka_Castle.JPG",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "園區很大，建議把體力留給天守閣，外圍庭園看時間再決定。"
          }
        },
        {
          time: "15:30〜16:15",
          title: "移動至新世界",
          description: "大阪城結束後直接前往大興壽司，不先回難波",
          notes: [
            "可搭JR大阪環狀線至新今宮站，再步行前往（實際路線與時間請用Google Maps確認）"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "16:15〜17:30",
          title: "晚餐：大興壽司 本店",
          description: "新世界ジャンジャン横丁，職人現場握壽司",
          notes: [
            "不可預約，排隊約30〜40分鐘；提早用餐可避開晚餐尖峰",
            "付款方式未查到，請備日幣現鈔；用餐後請直接前往下一站，不在新世界夜間逗留"
          ],
          badges: ["FOOD"],
          locationQuery: "大興壽司 本店 大阪",
          guide: {
            type: "food",
            specialty: "新世界老字號大眾壽司店，職人現場握製，3貫150円起，有吧台與桌位。",
            mustTry: "①基本款鮮魚握壽司（3貫約¥150起，評價最高）；②牡丹蝦、本鮪魚大腹、喉黑魚、炙烤鰻魚（評論常見升級選擇）；③紅味噌湯（赤だし）",
            orderingTips: "點餐方式：把想吃的寫在桌上的紙條交給店員（也有白板菜單）。評論最常提到：①基本款鮮魚握壽司（便宜又新鮮，米飯小顆適合多種類少量吃）；②想升級可加點牡丹蝦、本鮪魚大腹、喉黑魚、螃蟹、炙烤鰻魚等；③先點紅味噌湯（赤だし）暖身；3人可先各點幾款再追加。",
            budget: "基本款3貫約¥150起，多數約¥300，一人約¥1,000〜2,000",
            budgetVerifiedAt: "2026-10",
            hours: "週四公休（11/4週三有營業）",
            reservationTip: "不可預約，客人翻桌快，約30〜40分鐘可入座，建議提早前往。",
            elderFriendly: "有桌位可坐，但店面小、需排隊、人多，建議先確認長輩能否接受。"
          }
        },
        {
          time: "17:30〜18:30",
          title: "MEGA驚安殿堂 新世界店",
          description: "走路約1分鐘即達，藥妝零食一次逛",
          notes: [
            "有免稅服務，請隨身攜帶護照（2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認）",
            "購物袋較多時，可搭堺筋線回日本橋放置後再散步（出發前請用Google Maps確認路線）"
          ],
          badges: ["SHOPPING"],
          locationQuery: "MEGAドン・キホーテ新世界店 大阪",
          guide: {
            type: "shopping",
            highlights: "新世界區域的大型驚安殿堂，營業至深夜，品項齊全。",
            tips: "先吃完壽司再逛，建議以輕巧的物品為主；隔天Day 3凌晨04:45出發，請控制時間。"
          }
        },
        {
          time: "18:45〜20:00",
          title: "御堂筋燈飾夜景",
          description: "回難波後沿御堂筋散步賞燈，接著去道頓堀吃關東煮，再回住處",
          notes: [
            "御堂筋燈飾展演期間2026/11/03〜12/31，點燈約17:00〜25:00（出發前請再確認官方公告）",
            "御堂筋為主要車道，請沿人行道步行，不要為拍照穿越馬路"
          ],
          badges: ["PHOTO"],
          locationQuery: "御堂筋 大阪",
          guide: {
            type: "attraction",
            summary: "大阪最主要的南北向大馬路，秋冬時兩旁的行道樹（以銀杏為主）會亮起金黃色彩燈，是大阪冬天的代表夜景。",
            highlights: "燈飾範圍從阪神前交差點到難波西口交差點，從難波往北走就能看到；今晚與Day 1的道頓堀・心齋橋互補，也可以順便逛心齋橋。",
            photoTips: "熱門拍法：站在人行道上，拍整排亮燈的行道樹一路延伸到遠方。夜晚光線暗，手機請拿穩或靠著欄杆拍。",
            photoExample: {
              src: "images/photos/midosuji.jpg",
              alt: "御堂筋行道樹燈飾夜景",
              caption: "御堂筋的行道樹燈飾（2024年12月）",
              author: "Tokumeigakarinoaoshima",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Midosuji_illumination_on_4th_December_2024.jpg",
              licenseName: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
            }
          }
        },
        {
          time: "20:00〜21:00",
          title: "宵夜：たこ梅 本店（關東煮）",
          description: "道頓堀的日本最古老關東煮店，日本橋站步行約3分鐘，離住處近",
          notes: [
            "營業16:00〜22:30（最後點餐22:00），11月無休（官方）；可刷卡；座位限90分鐘；每人要付お通し¥275（税込，視為席料），沒查到其他低消。傍晚尖峰可能要等約1小時，20:00前後的等候時間我沒查到",
            "想吃鯨魚：名物是さえずり（鯨魚舌），另有ころ（鯨魚皮）、鯨すじ等，整理在「攻略」；已吃過大興壽司，建議3位點6〜8品分食即可；明天Day 3凌晨04:45出發，建議21:00前離店、回住處休息"
          ],
          badges: ["FOOD"],
          locationQuery: "たこ梅 本店 道頓堀 大阪",
          guide: {
            type: "food",
            specialty: "1844年創業，號稱日本最古老的關東煮店；用創業以來持續補充的高湯燉煮，約20〜30種具，以色分類的札子計價；吧台（コ字型）與桌席約24席；店名來自創業時流行的コ字型吧台「タコ〇〇」加上創業者名字的「梅」；織田作之助、開高健、池波正太郎等作家都曾光顧；酒用錫製溫酒杯盛裝，讓燗酒較不易變冷。地址：大阪市中央區道頓堀1-1-8，日本橋站2號出口步行約3分鐘。",
            mustTry: "①鯨魚：さえずり（鯨魚舌，名物，約¥900）、ころ（鯨魚皮，約¥900）、鯨すじ（約¥400〜450）；②大根（必吃，吸滿高湯）；③たこ甘露煮（名物，約¥600）；④ひろうす（大型飛龍頭，分量足）。價格為資料價，現場可能不同",
            orderingTips: "點的品項會拿到對應顏色的札放在面前，結帳時依札計價；每品約¥165起（未稅，2024年資料）；先點大根與たこ甘露煮，再依想吃的追加；〆可點「汁かけご飯」（白飯淋關東煮高湯，配鯨魚大和煮或豆腐）；座位限90分鐘（官方）；也有外帶窗口。入店後先拿號碼牌、等叫號入座（另一篇旅遊文章的經驗）；牆上貼有日、英、韓、中文版菜單，不懂日文也能看圖與文字點餐；坐吧台可以近距離看食材在鍋裡煮。",
            sections: [
              { label: "鯨魚料理一覽（想吃鯨魚看這裡）", after: "mustTry", text: "①さえずり：鯨魚舌，這家的登錄商標與名物，初代是第一個把鯨魚舌放進關東煮的人，因為咬的時候的聲音像小鳥啼叫而命名；白色、蓬鬆又有彈性，吸飽高湯後甘味自然、鯨魚味會持續很久，沒有腥味，約¥900。②ころ：鯨魚的皮下脂肪（皮），口感軟爛像麻糬、不難咬，但腥味較重，約¥900。③鯨すじ（鯨魚筋）：約¥400，也有「鯨すじ ネギ巾着」約¥450〜495。④鯨はりはり袋：資料寫11月限定，內容是ころ與さえずり配水菜，有評論說水菜占多數、鯨魚味不明顯，今年是否供應要到現場確認。⑤さらし鯨：官方網站介紹，點了才用生鯨皮手工製作的冷盤，約¥850，官方說沒有鯨魚的腥臭味，是否在本店菜單與11月是否供應要現場確認。⑥汁かけご飯：〆的白飯淋上關東煮高湯，配料可選鯨の大和煮或豆腐，也能追加配料；另一篇旅遊文章的作者推薦選大和煮，並提到是長鬚鯨的大和煮，味道偏濃。另外，湯底本身也用鯨魚的筋、皮、舌熬煮。" },
              { label: "鯨魚點法建議（3位）", after: "mustTry", text: "①先點さえずり1〜2份分食，是最值得吃的一道；②想嚐更多鯨魚口感，再加1份ころ（腥味重，不確定就先點1份）；③想吃鯨魚又不想太油，可點鯨すじ巾着；④〆點汁かけご飯，配料選鯨の大和煮；⑤其他搭配：大根、たこ甘露煮。鯨魚料理單價約¥900，3位吃2〜3種約¥2,000〜3,000，另加お通し¥825（資料價，現場可能不同）。" },
              { label: "日文點餐小抄", after: "mustTry", text: "さえずり（鯨魚舌）、ころ（鯨魚皮）、鯨すじ（鯨魚筋）、ねぎ巾着（蔥袋）、はりはり（水菜鍋風味）、さらし鯨、汁かけご飯（鯨の大和煮）、大根（白蘿蔔）、たこ甘露煮。提醒：牆上菜單有多語版本（含中文），但有文章提到不懂日文可能溝通困難，建議先把日文名稱存在手機。" }
            ],
            reviewSummary: "食べログ約3.54分（約495則）；另有旅遊文章記錄外面沒人排隊、店內常客滿，等叫號約40分鐘（店內有位子可坐著等）；有部落格記錄傍晚17:00客滿、約等1小時，價格比一般平價關東煮店高約1.2〜1.5倍，但服務周到、保存創業時的建築。",
            budget: "每人另付お通し¥275（税込，席料）；每品約¥165起（未稅）〜約¥1,000，酒水另計；晚上預算約¥3,000〜4,000／人是口評常見區間（資料價格，現場可能不同）",
            budgetVerifiedAt: "2026-10",
            hours: "16:00〜22:30（最後點餐22:00），11月無休（官方）；另有資料寫22:50，請以官網為準",
            reservationTip: "只接受電話預約，要15:00以後打（06-6211-6201，日文）；一般客人可預約一週前起，也就是11/4當天要在10/28（日本時間）15:00以後打；預約代行（非本人到場）會被取消。沒預約時，尖峰（傍晚）約等1小時；有外帶窗口可當作等候太久時的替代。",
            elderFriendly: "店內狹窄、以吧台為主，需互相讓路；長輩同行請先確認座位。"
          }
        }
      ]
    },

    {
      id: "day3",
      day: 3,
      date: "11/5",
      dateISO: "2026-11-05",
      weekday: "THU",
      weekdayLocal: "四",
      city: "KYOTO",
      title: "京都晨昏全日",
      subtitle: "★體力消耗最大的一天",
      highActivity: true,
      warning: {
        label: "HIGH ACTIVITY",
        title: "04:45 出發，全天逾 15 小時",
        body: "本次旅程體力消耗最大的一天，凌晨出發、深夜返回"
      },
      items: [
        {
          time: "04:45",
          title: "難波出發",
          description: "首班車往大阪駅",
          notes: [],
          badges: ["TRANSPORT"],
          group: "清晨"
        },
        {
          time: "05:20",
          title: "轉乘JR京都線首班新快速",
          description: "",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "05:50",
          title: "抵達京都駅，轉搭計程車",
          description: "",
          notes: [
            "已查證：京阪電車淀屋橋首班車05:48發車，抵達祇園四条最早06:57，太晚會錯過清水寺清晨黃金時段，JR+計程車仍是最佳方案"
          ],
          badges: ["TRANSPORT"],
          locationQuery: "京都駅 京都"
        },
        {
          time: "06:00〜07:00",
          title: "清水寺",
          description: "",
          notes: [
            "拍照重點：仁王門、三重塔（晨光）、奧之院",
            "備註：出來前先上廁所"
          ],
          badges: ["PHOTO"],
          locationQuery: "清水寺 京都",
          guide: {
            type: "attraction",
            historyBrief: "傳說778年建立，現在的本堂和有名的「清水舞台」是1633年重建的。舞台用傳統工法蓋成，沒有用釘子，1994年列入世界文化遺產。",
            summary: "京都最有名的寺院之一，蓋在山坡上，最大特色是懸空突出的木造舞台。",
            highlights: "站在舞台上可以俯瞰京都市區；音羽瀑布有三道水流，各代表不同的祈願；朱紅色的三重塔（約31公尺）很醒目。",
            photoTips: "熱門拍照點：舞台往外拍京都街景；從奧之院那一側拍本堂和舞台的全景；三重塔配山景。舞台上人多、動線快，站在側邊拍幾張就好。早上6點前後人最少。",
            photoExample: {
              src: "images/photos/kiyomizu.jpg",
              alt: "從對面山坡看清水寺本堂與舞台全景",
              caption: "從對面山坡看本堂與清水舞台全景（秋季）",
              author: "Martin Falbisoner",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-01.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "石階濕滑，請穿防滑的鞋；多數區域不能使用腳架。"
          }
        },
        {
          time: "07:00〜07:30",
          title: "二年坂・三年坂",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "二年坂 三年坂 京都",
          guide: {
            type: "attraction",
            historyBrief: "這是通往清水寺的傳統參道，因為寺社香火旺盛而慢慢發展成商店街。石板路和老町家保存得很好，被列為重要傳統建造物群保存地區。",
            summary: "京都東山最有名的石板老街，兩旁是木造老房子和小店，很有古都氣氛。",
            highlights: "沿著坡道往下走就是三年坂；旁邊的八坂通可以看到八坂之塔，是熱門的京都畫面。",
            photoTips: "最熱門的拍法：到八坂通，拍八坂之塔配石板路和老房子。早上6〜7點幾乎沒人，最好拍。",
            photoExample: {
              src: "images/photos/sannenzaka.jpg",
              alt: "二年坂三年坂一帶的石板路與老房子",
              caption: "二年坂・三年坂一帶的石板路與老房子",
              author: "Andrea Schaffer",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Sannenzaka_street,_Kyoto_(3811257874).jpg",
              licenseName: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/"
            },
            tips: "石板路和坡道比較滑，請穿好走的鞋；早上很多店還沒開，主要是散步拍照。"
          }
        },
        {
          time: "07:30〜07:50",
          title: "八坂之塔晨間拍照",
          description: "日東堂（八坂之塔旁）10:00才開門，早上只拍外觀",
          notes: [
            "換好和服後，10:15會再回到日東堂喝咖啡"
          ],
          badges: ["PHOTO"],
          locationQuery: "八坂の塔 京都",
          guide: {
            type: "attraction",
            historyBrief: "八坂之塔是法觀寺的五重塔，高約40公尺，是京都市區少數保留下來的古塔，被列為重要文化財。",
            summary: "京都東山最經典的古塔畫面：五重塔從石板坡道和老房子後面升起，外國遊客必拍。",
            highlights: "五重塔和石板路、老房子一起入鏡，是外國遊客最愛拍的京都景色之一。",
            photoTips: "最經典的角度在八坂通：塔在遠處升起，前面是石板坡道和町家。清晨5:30〜7:00人最少，塔晚上也有點燈。",
            photoExample: {
              src: "images/photos/yasaka.jpg",
              alt: "八坂通與八坂之塔",
              caption: "八坂通與八坂之塔（清晨）",
              author: "Basile Morin",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "日東堂就在塔旁，10:00才開門，早上主要拍照；10:15會再回來喝咖啡。"
          }
        },
        {
          time: "07:50〜08:05",
          title: "八坂神社",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "八坂神社 京都",
          guide: {
            type: "attraction",
            historyBrief: "傳說656年創建，是京都夏天「祇園祭」的發源地，歷史超過一千年。",
            summary: "祇園一帶的信仰中心，朱紅色的大門和樓門很醒目。",
            highlights: "朱紅色的西樓門是最醒目的地標；境內有很多燈籠，晚上很有氣氛；從這裡往南走就是花見小路和祇園。",
            photoTips: "熱門拍法：在四條通的盡頭拍朱紅色的西樓門。晚上燈籠亮起來最漂亮；你們早上來，人少，拍樓門比較乾淨。",
            photoExample: {
              src: "images/photos/yasakashrine.jpg",
              alt: "八坂神社西樓門",
              caption: "從四條通方向看八坂神社西樓門",
              author: "DXR",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Nishiromon_Gate,_Yasaka_Shrine,_Kyoto,_West_view_20190416_1.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
          }
        },
        {
          time: "08:15〜09:00",
          title: "抵達和服店，報到候位",
          description: "祇園區店家",
          notes: [],
          badges: ["RESERVATION"],
          group: "上午"
        },
        {
          time: "09:00〜10:00",
          title: "和服換裝",
          description: "",
          notes: [],
          badges: ["RESERVATION"]
        },
        {
          time: "10:15〜11:10",
          title: "日東堂 KYOTO COFFEE",
          description: "八坂之塔旁，喝咖啡牛奶，穿和服在八坂之塔拍照",
          notes: [
            "10:00〜18:00營業（最後點餐17:30），週一與國定假日公休；從和服店（祇園）步行約10〜15分鐘，穿和服請慢慢走",
            "2樓可以坐下休息，但不能帶外食，要先在1樓點好飲料"
          ],
          badges: ["FOOD", "SHOPPING", "PHOTO"],
          locationQuery: "日東堂 京都",
          guide: {
            type: "shopping",
            highlights: "古民家改裝的日本雜貨店，附設KYOTO COFFEE咖啡站（招牌咖啡牛奶）；2樓有玻璃茶室，窗外可以看到八坂之塔；原創馬克杯是這裡限定的人氣商品。",
            recommendedItems: "①京都みるくサンドクッキー（クローバー牧場特別牛乳，6個入約993円／12個入約1,695円，當伴手禮）；②原創馬克杯",
            orderingTips: "評論最常提到：①咖啡牛奶（京都クローバー牧場的牛乳，復古瓶裝，口味清爽，不是一般的咖啡牛奶）；②冰歐蕾（水出し冰滴咖啡浮在加糖牛奶上，約¥750）。",
            hours: "10:00〜18:00（最後點餐17:30），週一與國定假日公休",
            tips: "穿和服在八坂之塔旁拍照很上相；營業時間請以官網為準。"
          }
        },
        {
          time: "11:10〜11:30",
          title: "移動至祇園 ゆやま",
          description: "從八坂之塔步行前往，11:30入座，請提早5〜10分鐘到",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "11:30〜13:00",
          title: "午餐：祇園 ゆやま",
          description: "新橋通花見小路東入，日本料理（京懷石），已訂位",
          status: "已訂位 11:30",
          notes: [
            "已訂位：3位，11:30入座，用餐時間約1小時30分鐘；預訂編號請另存在手機，不放網站",
            "套餐：【會食推薦】清水計劃（共7道），每人¥7,500（含稅）"
          ],
          badges: ["FOOD", "RESERVATION"],
          locationQuery: "祇園 ゆやま 京都",
          guide: {
            type: "food",
            specialty: "新橋通花見小路東入的京懷石小店，料理長從市場採買食材，離花見小路與白川很近；依資料，名物還有鴨肉石燒（這次已訂清水計劃套餐，不需另外點餐）。店面小，約8席，另有1間個室。",
            mustTry: "【清水】計劃（共7道，含縁高盛り）",
            budget: "套餐每人¥7,500（含稅，已訂位的方案）",
            budgetVerifiedAt: "2026-10",
            hours: "週一公休；11/5週四有營業",
            reservationTip: "已訂位；店只有約8席，請準時入座，遲到前請先聯絡店家。",
            elderFriendly: "席位少、是否為椅子席尚未確認，穿和服與長輩同行建議先詢問店家。"
          }
        },
        {
          time: "13:00〜13:50",
          title: "祇園・花見小路散策拍照",
          description: "",
          notes: [
            "可順手購買：生八ッ橋、茶の菓（MALEBRANCHE）－沿路店家皆有販售"
          ],
          badges: ["PHOTO", "SHOPPING"],
          group: "下午",
          locationQuery: "祇園 花見小路 京都",
          guide: {
            type: "attraction",
            historyBrief: "花見小路是祇園最有名的街，江戶時代因為靠近八坂神社、客人多，漸漸發展成茶屋聚集的花街。現在仍有藝妓、舞妓在這一帶活動。",
            summary: "京都最有名的傳統街景，石板路兩旁是木造茶屋和燈籠，很有古都氣氛。",
            highlights: "從八坂神社往南走就是花見小路；走過辰巳橋可以到白川河邊，柳樹配老房子也是熱門拍照點。",
            photoTips: "熱門拍法：在花見小路主街（公共道路）拍石板路和兩旁的茶屋；傍晚燈籠亮起來更好看。白川河邊的景色也很上相。",
            photoExample: {
              src: "images/photos/hanamikoji.jpg",
              alt: "祇園的石板路與茶屋街景",
              caption: "祇園的石板路與傳統茶屋街景（夜間）",
              author: "lumoplank",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Streets_of_Gion,_Kyoto_-_Gion7708.jpg",
              licenseName: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
            },
            tips: "主街可以拍照，但兩旁的私人小巷禁止拍照，部分小巷已禁止進入，請遵守標示。請不要追拍、攔住或近距離拍藝妓與舞妓，尊重當地居民。"
          }
        },
        {
          time: "14:00〜14:15",
          title: "歸還和服，換回自己的鞋",
          description: "",
          notes: [],
          badges: []
        },
        {
          time: "14:30〜15:00",
          title: "移動至伏見稻荷",
          description: "",
          notes: [],
          badges: ["TRANSPORT"],
          locationQuery: "伏見稻荷大社 京都"
        },
        {
          time: "15:00〜15:20",
          title: "祢ざめ家（稻荷壽司）",
          description: "伏見稻荷參道上的老店，指定吃稻荷壽司（豆皮壽司，いなり寿し）",
          notes: [
            "營業約10:00〜16:00（賣完即打烊，不定休），建議一到伏見稻荷就先過來",
            "這次只吃稻荷壽司；若覺得時間不夠，也可以外帶邊走邊吃"
          ],
          badges: ["FOOD"],
          locationQuery: "祢ざめ家 伏見稲荷 京都",
          guide: {
            type: "food",
            specialty: "伏見稻荷參道上的老店，以稻荷壽司（豆皮壽司）聞名，醋飯拌有黑芝麻、牛蒡與麻籽，是這間的特色；餐廳另有鰻魚飯、狐狸烏龍麵等。",
            mustTry: "①稻荷壽司（招牌）；②三種盛（鯖魚、稻荷、太卷）想多嚐幾種時點；③狐狸烏龍麵想吃熱食時點",
            orderingTips: "資料常見：①稻荷壽司（招牌，外帶4個約¥600、7個¥1,000）；②想多嚐幾種可點「三種盛」（鯖魚壽司、稻荷、太卷，約¥1,500）；③想吃熱的可點狐狸烏龍麵（約¥800）；店內價格請看現場菜單。",
            budget: "外帶約4個¥600、7個¥1,000（資料價格，現場可能不同）",
            budgetVerifiedAt: "2026-10",
            hours: "約10:00〜16:00，賣完即打烊（各網站寫法不一致，不定休）",
            reservationTip: "沒有查到預約資訊；營業到約16:00且賣完即打烊，建議抵達後先來。",
            elderFriendly: "店內席位與是否有椅子席尚未確認，需要時可外帶。"
          }
        },
        {
          time: "15:20〜16:00",
          title: "伏見稻荷大社、千本鳥居",
          description: "已換回一般服裝",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "伏見稻荷大社 京都",
          guide: {
            type: "attraction",
            historyBrief: "傳說711年創建，是全日本三萬多座稻荷神社的總本社，供奉保佑生意興隆、五穀豐收的稻荷神。千本鳥居是信徒還願奉納的，鳥居上寫有捐贈者的姓名和年份，這個傳統從江戶時代延續到現在。",
            summary: "京都最熱門的景點之一，山路上一整排朱紅色鳥居，像走進橘紅色的隧道。",
            highlights: "前段的千本鳥居最密集、最經典；走到半山腰的四辻可以看到京都市區，多數遊客走到這裡就折返。",
            photoTips: "熱門拍法：入口後方的雙排鳥居隧道，很多人排隊拍。人最少是早上8點前，10點後很擠；過了四辻後人明顯變少。你們下午3點到，建議往裡走一點，找人少的空檔拍。",
            photoExample: {
              src: "images/photos/fushimi.jpg",
              alt: "伏見稻荷千本鳥居的雙排鳥居隧道",
              caption: "千本鳥居的雙排鳥居隧道",
              author: "Basile Morin",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Double_torii_path_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "整座稻荷山往返要2小時以上；你們只有約40分鐘，走前段千本鳥居就能拍到主要畫面，再依體力決定要不要走到四辻。"
          }
        },
        {
          time: "16:00〜16:20",
          title: "移動至京都駅",
          description: "稻荷駅→京都駅，JR約5分",
          notes: [],
          badges: ["TRANSPORT"],
          locationQuery: "京都駅 京都"
        },
        {
          time: "17:00〜20:00",
          title: "teamLab Biovortex Kyoto",
          description: "京都駅八條東口步行7分，已購票",
          status: "已購票 17:00 入場",
          notes: [
            "已購票：3位成人，17:00入場（票券請存在手機，現場出示）",
            "預留約3小時參觀，預計20:00前後離場，再步行回京都駅",
            "16:20抵達京都駅後，可先在站內休息或用晚餐，16:30前後再步行前往會場"
          ],
          badges: ["RESERVATION"],
          group: "傍晚／晚間",
          locationQuery: "teamLab Biovortex Kyoto 京都",
          guide: {
            type: "attraction",
            summary: "2025年10月開幕，是日本最大的teamLab數位藝術館，共4層、50多件作品，大多是黑暗空間配上光影與互動。",
            highlights: "作品大多由光、空氣、水和泡泡組成，會隨著人的動作改變；很多房間的地板是鏡面。",
            photoTips: "可以拍照、錄影和發社群，但禁止閃光燈、無人機，以及30公分以上的腳架、自拍棒等器材。鏡面房間請不要碰鏡子，以免留下指紋影響別人拍照。",
            tips: "建議穿好走的鞋；有人建議穿褲子，因為地板鏡面會反光。多數介紹建議預留3小時以上，營業到21:00（最晚入場19:30，請以官網為準），行程已預留到20:00。"
          }
        },
        {
          time: "20:15",
          title: "返回大阪",
          description: "JR新快速＋轉乘，約60分鐘",
          notes: [
            "預計約21:15抵達難波一帶，末班車時間請事先確認",
            "晚餐可在京都駅周邊解決，或回大阪後再吃"
          ],
          badges: ["TRANSPORT"]
        }
      ]
    },

    {
      id: "day4",
      day: 4,
      date: "11/6",
      dateISO: "2026-11-06",
      weekday: "FRI",
      weekdayLocal: "五",
      city: "KYOTO",
      title: "嵐山特色體驗",
      subtitle: "",
      highActivity: false,
      items: [
        {
          time: "07:30〜09:00",
          title: "前往嵯峨嵐山（JR路線）",
          description: "建議走JR路線，約09:00抵達JR嵯峨嵐山站",
          notes: [
            "JR大阪站→京都→嵯峨嵐山站，官方攻略估約48分鐘（不含轉車等待）",
            "從住處先前往JR大阪站（梅田）轉乘JR，實際路線與時間請用Google Maps確認"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "09:00〜09:25",
          title: "步行前往渡月橋",
          description: "沿途散步",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "09:25〜10:00",
          title: "渡月橋＋桂川",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "渡月橋 京都",
          guide: {
            type: "attraction",
            historyBrief: "名字的意思是「月亮渡過的橋」，相傳是古代的龜山上皇看到月亮好像在橋上移動而取名。現在的橋是1934年蓋的，外型仿照舊木橋。",
            summary: "嵐山最有名的橋，後面就是嵐山的山景，外國遊客多半從這裡開始逛嵐山。",
            highlights: "橋長約155公尺，可以走上橋看河景；橋旁的河邊有步道和小島（中之島），人比橋上少，適合坐下來休息。",
            photoTips: "最熱門的角度：站在河北岸（天龍寺、嵐山商店街這一側），面對橋拍，山景就在橋的後面。也可以在橋上拍上游的山。早上人少最好拍。",
            photoExample: {
              src: "images/photos/togetsukyo.jpg",
              alt: "從河岸看渡月橋與嵐山山景",
              caption: "從河岸看渡月橋與嵐山山景（傍晚長曝光，與白天樣子不同）",
              author: "Basile Morin",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Togetsu-kyo_bridge_at_dusk,_Kyoto,_Japan.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "橋上人多，拍照請靠邊，不要擋路。"
          }
        },
        {
          time: "10:00〜11:25",
          title: "天龍寺",
          description: "約11:25前逛完庭園，11:30到篩月入席",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "天龍寺 京都",
          guide: {
            type: "attraction",
            historyBrief: "約700年前，將軍足利尊氏為紀念後醍醐天皇而建。寺院多次被大火燒毀，現在的主要建築是1899年重建的，已列為世界遺產。",
            summary: "嵐山最有名的禪寺，特色是庭園：用池塘加上遠方的嵐山，組成一幅像畫一樣的景色。",
            highlights: "重點是曹源池庭園，坐在大方丈（主殿）的走廊看最舒服。大殿天花板的龍畫（雲龍圖）要另外付費，只在特定日期開放。",
            photoTips: "熱門拍法：從大方丈走廊拍池塘、石頭和後面的山。早上開門時人少、水面平靜，倒影最漂亮；人多時可以等一下找空檔。",
            photoExample: {
              src: "images/photos/tenryuji.jpg",
              alt: "天龍寺曹源池庭園與秋季楓葉",
              caption: "曹源池庭園與秋季楓葉",
              author: "lumoplank",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Arashiyama,_Part_II_-_Arashiyama7538.jpg",
              licenseName: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
            },
            tips: "北門出口直接接竹林之道。"
          }
        },
        {
          time: "11:30〜12:30",
          title: "午餐：天龍寺 篩月（精進料理）",
          description: "天龍寺直營的精進料理，在庭園邊的和室用餐；已訂位，不使用肉類與魚類，料理依季節更換",
          status: "已訂位 11:30",
          notes: [
            "已訂位：3位，11:30入席，「雪」套餐，用餐約1小時；預訂編號請另存在手機，不放網站",
            "費用：¥3,800 × 3位 = ¥11,400，當天店內付款；另加庭園參拜費¥500／人（共¥1,500），參拜費不能刷卡，請備現金"
          ],
          badges: ["FOOD", "RESERVATION"],
          locationQuery: "篩月 京都市右京区嵯峨天龍寺芒ノ馬場町68",
          guide: {
            type: "food",
            specialty: "天龍寺境內的精進料理店，坐在和室裡看庭園吃飯。三種套餐差別只在菜的數量與價格，以胡麻豆腐、湯葉、麩等植物性食材為主。地址：京都市右京區嵯峨天龍寺芒ノ馬場町68；電話075-882-9725。",
            mustTry: "已訂「雪」套餐（人氣第一）；胡麻豆腐是評論最常被點名的一道",
            orderingTips: "「雪」的內容（依官網與Tabelog，料理依季節更換）：前菜拼盤、坪拌菜、胡麻豆腐、炊合（麩、湯葉）、赤味噌湯、白飯、季節蒸物或炸物、季節水果。",
            reviewSummary: "評論最常稱讚胡麻豆腐與庭園景觀；多數人吃「雪」就飽；有些菜偏冷、口味清淡（網路評論整理，樣本有限，多為2015〜2023年）",
            budget: "已訂雪¥3,800／人（3位共¥11,400），另加庭園參拜費¥500／人；當天現場付款",
            budgetVerifiedAt: "2026-10",
            hours: "11:00〜14:00，週四公休（11/6週五有營業）；米其林指南有收錄，是否為Bib Gourmand（必比登推介）未獲官方頁面證實",
            reservationTip: "已訂位（11:30入席，3位）；請準時入席，預訂資訊存在手機。預約頁未標示價格是否含稅，請現場確認；想臨時升級可問店家：月¥6,500（一汁六菜）、花¥9,000（一汁七菜），是否可當天更換未確認。",
            elderFriendly: "座位是榻榻米和室，需脫鞋；評論提到可要求矮椅，長輩同行請入店時先說。",
            checkTips: "①是否可提供矮椅；②10:00已入園，¥500參拜費是否需重複支付；③遲到的處理方式未確認，請提早約10分鐘到"
          }
        },
        {
          time: "12:30〜13:30",
          title: "嵐山大街：甜點與伴手禮（5家路線）",
          description: "午餐後再逛，順序：まめもの鯛魚燒 → MALEBRANCHE → 新八茶屋 → 辻利 → 老松，取代原本的咖啡時段",
          notes: [
            "提醒：原本順路的中村屋総本店已於2026年6月結束營業（Google地圖顯示永久歇業，運營公司已破產），已從行程移除",
            "買的東西要提到下午的竹林、野宮、常寂光寺（有階梯），建議挑輕便的伴手禮"
          ],
          badges: ["SHOPPING", "FOOD", "PENDING"],
          locationQuery: "嵐山 商店街 京都",
          guide: {
            type: "stops",
            intro: "約60分鐘，各段時間為估計：12:35 ①まめもの → 12:45 ②MALEBRANCHE（①②同一棟昇龍苑）→ 12:55 ③新八茶屋 → 13:10 ④辻利 → 13:20 ⑤老松 → 13:30前離開去竹林。先吃現做的點心、伴手禮放後面買，提的時間較短；我只查到各店「距嵐電嵐山站幾分鐘」，實際順序請用Google地圖調整；時間不夠時先放棄⑤④。",
            stops: [
              {
                name: "①まめものとたい焼き 嵐山本店", brief: "あんバター鯛魚燒，趁熱吃",
                locationQuery: "まめものとたい焼き 嵐山本店 京都",
                specialty: "昇龍苑1F（嵐電嵐山站步行約1分）。圓形鯛魚燒，奶油用北海道日高奶油，外皮鬆軟又酥脆；昇龍苑內有可看庭園的休息座位。",
                mustTry: "あんバター（紅豆奶油）：賞味期限只有約1分鐘，趁熱吃",
                orderingTips: "網路最多人點あんバター；想換口味可選つぶあん或カスタード（約¥300，2023年資料）；3位可各點一個，拿到就在店旁吃。",
                budget: "あんバター約¥350〜390（各來源不同）",
                budgetVerifiedAt: "2026-10",
                hours: "10:00〜17:00，不定休"
              },
              {
                name: "②京都北山MALEBRANCHE 嵐山昇龍苑店", brief: "茶の菓伴手禮；茶々棒現吃",
                locationQuery: "京都北山マールブランシュ 嵐山昇龍苑店 京都",
                specialty: "昇龍苑1F（與①同棟）。京都的點心品牌，嵐山店有限定品。",
                mustTry: "現場吃：茶々棒（酥皮泡芙夾抹茶冰淇淋，撒抹茶鹽，多篇攻略標示為嵐山店限定）；伴手禮：茶の菓（宇治抹茶餅乾夾白巧克力，餅乾上印有「京、茶、菓」）",
                orderingTips: "茶の菓輕便好送人，是網路最常被推薦的伴手禮；茶々棒是冰品，買了要立刻吃。",
                hours: "10:00〜17:00，全年無休"
              },
              {
                name: "③新八茶屋", brief: "開心果義式冰淇淋，約¥550",
                locationQuery: "新八茶屋 嵐山 京都",
                specialty: "渡月橋旁（嵐電嵐山站步行約1分）。昭和16年（1941年）創業，賣義式冰淇淋與日式甜點。",
                mustTry: "プレミオ ピスタチオ（開心果，使用義大利進口開心果，據介紹得過義大利冰淇淋國際比賽獎項）",
                orderingTips: "網路最常被提到的是開心果；可選雙球，容器有杯、甜筒、鬆餅；偶有季節限定口味（例如櫻餅），11月是否供應請看現場。",
                budget: "約¥550（2024年資料）",
                budgetVerifiedAt: "2026-10",
                hours: "10:00〜18:00（來源不一，有資料寫週四公休，11/6週五不受影響）"
              },
              {
                name: "④辻利 嵐山 AKOGAREYA店", brief: "京茶ラスク、抹茶わらび餅",
                locationQuery: "辻利 嵐山 AKOGAREYA店 京都",
                specialty: "嵯峨天龍寺造路町37-8，渡月橋附近（嵐電嵐山站步行約2分）。宇治老牌茶舖「辻利」的嵐山店，開在AKOGAREYA商業設施內。",
                mustTry: "京茶ラスク（抹茶與焙茶巧克力裹的脆餅，輕便）；抹茶與焙茶綜合組合；宇治抹茶わらび餅",
                orderingTips: "要送人可買ラスク或茶葉組合；想當場吃可選宇治抹茶わらび餅。",
                hours: "平日10:00〜17:30，假日10:00〜18:00，無休"
              },
              {
                name: "⑤老松 嵐山店", brief: "本わらび餅；和菓子可外帶",
                locationQuery: "老松 嵐山店 京都",
                specialty: "嵯峨天龍寺芒ノ馬場町20（嵐電嵐山站步行約3〜5分）。京都老牌和菓子店，1樓賣和菓子，2樓有茶房「玄以庵」。",
                mustTry: "本わらび餅（點了才現做、用冰水盛裝，是網路介紹最常見的招牌）；和菓子外帶",
                orderingTips: "坐下吃要預留約20〜30分鐘（我的估計）；時間不夠就在1樓外帶和菓子；夏柑糖是4月起的季節品，11月不會有。",
                hours: "約9:00〜17:00，茶房約9:30〜16:30（來源不一，請以現場公告為準）"
              },
              {
                name: "備選：中村屋惣菜製作所（現況未確認）", brief: "是否營業未確認，出發前看地圖",
                locationQuery: "中村屋惣菜製作所 嵐山 京都",
                specialty: "有報導提到附近的「中村屋惣菜製作所」續賣可樂餅與炸肉餅，但我沒有查到它現在是否營業，想吃請出發前先看Google地圖的最新狀態。",
                hours: "來源資料寫8:00〜18:00，週一公休（未確認）"
              }
            ]
          }
        },
        {
          time: "13:30〜13:45",
          title: "步行前往竹林之道",
          description: "沿天龍寺外側道路走，不需再進入天龍寺",
          notes: [
            "約10〜15分鐘（估計值），實際路線請用Google Maps確認"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "13:45〜14:20",
          title: "竹林之道",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "嵐山竹林小徑 京都",
          guide: {
            type: "attraction",
            historyBrief: "這一帶古時候是貴族的別墅區，一般認為竹林從平安時代就有了。",
            summary: "高大的竹子夾道，像走進綠色隧道，是嵐山最有名的畫面。全長約400公尺，從野宮神社附近走到天龍寺北門。",
            highlights: "認真拍照大約需要30分鐘。天龍寺北門往大河內山莊那一段，有遊客說人較少、竹子更高。",
            photoTips: "熱門點：野宮神社入口附近，和天龍寺北門那一側。站在路中間往上拍，竹子會一路伸向天空。早上8點前人最少，下午人多，可以等人潮空檔再拍。",
            photoExample: {
              src: "images/photos/bamboo.jpg",
              alt: "嵐山竹林的竹子近拍",
              caption: "嵐山竹林的竹子（近拍質感，不是步道全景）",
              author: "Basile Morin",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Bamboo_Forest,_Arashiyama,_Kyoto,_Japan.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "路很窄，拍照請靠邊，不要在路中間停太久。"
          }
        },
        {
          time: "14:20〜14:40",
          title: "野宮神社",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "野宮神社 京都",
          guide: {
            type: "attraction",
            historyBrief: "傳說創建於809年。以前天皇派去伊勢神宮的公主（齋王），出發前要先在這裡淨身修行。《源氏物語》也寫過這個地方。",
            summary: "藏在竹林旁的小神社，入口的黑色鳥居很特別，是用帶著樹皮的原木做的。",
            highlights: "黑木鳥居被認為保留了最古老的鳥居樣式；日本人常來這裡求愛情、學業和安產。",
            photoTips: "熱門點：黑木鳥居，後面搭配竹林。神社很小，拍照要快，不要擋住參拜的人。",
            photoExample: {
              src: "images/photos/nonomiya.jpg",
              alt: "野宮神社的黑木鳥居",
              caption: "野宮神社的黑木鳥居",
              author: "Hyppolyte de Saint-Rambert",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Nonomiya-jinja_(Uky%C5%8D-ku_Kyoto)_Black_Torii_hdsr_S5_07.jpg",
              licenseName: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
            },
            tips: "人多時請輪流拍照，不要久留。"
          }
        },
        {
          time: "14:40〜15:40",
          title: "常寂光寺",
          description: "11月初可看初期紅葉",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "常寂光寺 京都",
          guide: {
            type: "attraction",
            historyBrief: "1596年創建的佛寺，位在小倉山山腰。相傳平安時代的歌人藤原定家曾住在附近。",
            summary: "比天龍寺更安靜的紅葉寺，滿山有兩百多棵楓樹，秋天像走進紅葉隧道。",
            highlights: "仁王門是茅草屋頂的老山門；往坡上走到高處有多寶塔（高約12公尺），可以看到楓葉和遠處的京都市區。",
            photoTips: "最熱門的三個點：仁王門前的楓葉拱道、仁王門的茅草屋頂、多寶塔配紅葉。11月初多半是初期紅葉，最盛約在11月中下旬；早上9點前人比較少。",
            photoExample: {
              src: "images/photos/jojakkoji.jpg",
              alt: "常寂光寺多寶塔與紅葉",
              caption: "多寶塔與紅葉（11月下旬）",
              author: "Inoue-hiro",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Jyoujyakouji-tahoutou-20071124.jpg",
              licenseName: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/"
            },
            tips: "要走坡道和階梯，長輩同行請放慢，只逛下段也可以。"
          }
        },
        {
          time: "15:40〜16:20",
          title: "周邊散步／紅葉拍照",
          description: "",
          notes: [],
          badges: ["PHOTO"]
        },
        {
          time: "16:20〜16:40",
          title: "移動到小火車嵐山站",
          description: "",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "16:40〜17:05",
          title: "上廁所、買飲料、準備搭車",
          description: "",
          notes: [],
          badges: ["REST"]
        },
        {
          time: "17:13〜17:38",
          title: "嵯峨野觀光小火車（嵯峨野81號，嵐山站→龜岡站）",
          description: "沿線點燈夜景，坐著賞景，全程輕鬆",
          notes: [
            "嵯峨野81號為「光の幻想列車」期間加開的臨時列車（沿線點燈，2026/10/24〜12/15），嵐山站17:13出發，約17:35〜17:38抵達龜岡站",
            "班次與購票方式請以官方網站公告為準，車票於乘車日前約1個月開賣，旺季建議提早購買"
          ],
          badges: ["PHOTO"],
          locationQuery: "嵯峨野觀光小火車 京都",
          guide: {
            type: "attraction",
            summary: "沿著保津川山谷行駛的復古小火車，約20〜25分鐘，窗外是溪谷和山林，秋天和春天特別熱門。",
            highlights: "5號車廂「The Rich」是沒有窗戶的開放式車廂，視野最好，拍照不隔玻璃（實際車廂以票面為準）。17:13的嵯峨野81號是點燈列車（2026/10/24〜12/15），有報導說現行車輛今年底退役，是最後一季。",
            photoTips: "這班在傍晚，以沿線點燈夜景為主。開放式車廂最好拍；一般車廂有玻璃反光，手機貼近玻璃、不要開閃光燈。",
            photoExample: {
              src: "images/photos/sagano.jpg",
              alt: "行駛在保津峽谷的嵯峨野小火車",
              caption: "行駛在保津峽谷的嵯峨野小火車（春季）",
              author: "Toshinori baba",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Sagano_scenic_railway_hotsukyo.jpg",
              licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
            },
            tips: "開放式車廂可能風大、比較冷，請多帶一件外套。班次與購票請以官網為準，車票最好提前買。"
          }
        },
        {
          time: "17:40〜18:00",
          title: "步行至JR馬堀站",
          description: "步行約10〜15分鐘",
          notes: [
            "天色已暗，請沿大路步行並留意安全"
          ],
          badges: ["TRANSPORT"],
          locationQuery: "馬堀駅 亀岡"
        },
        {
          time: "18:00〜19:15",
          title: "JR馬堀→京都→大阪",
          description: "",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "19:15〜20:00",
          title: "回大阪吃晚餐",
          description: "",
          notes: [],
          badges: ["FOOD"]
        }
      ]
    },

    {
      id: "day5",
      day: 5,
      date: "11/7",
      dateISO: "2026-11-07",
      weekday: "SAT",
      weekdayLocal: "六",
      city: "OSAKA",
      title: "展望＋採買＋返程",
      subtitle: "",
      highActivity: false,
      items: [
        {
          time: "09:00〜11:00",
          title: "阿倍野HARUKAS展望台",
          description: "早上人少視野佳",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "阿倍野HARUKAS 大阪",
          guide: {
            type: "attraction",
            summary: "高300公尺，是大阪最高的大樓，從展望台可以360度俯瞰大阪全景。",
            highlights: "展望台在58到60樓：58樓有天空庭園和咖啡廳，60樓是主要觀景台。天氣晴朗時可以遠眺六甲山、明石海峽大橋的方向。",
            photoTips: "手機貼近玻璃或戴防反光鏡頭可以減少反光；腳架禁止使用。白天能看到大阪城、通天閣和天王寺動物園，夜景更漂亮，但你們早上去人比較少。",
            tips: "58樓有戶外區域，風大會冷，請多穿一件。營業時間9:00〜22:00（最後入場21:30），請以官網為準。"
          }
        },
        {
          time: "11:30〜11:55",
          title: "難波・心齋橋採買",
          description: "",
          notes: [
            "可加購：りくろーおじさん（現烤起司蛋糕）、551蓬莱（豬肉包）；兩家的特色、點餐攻略與MAP在「攻略」裡",
            {
              text: "運動用品（選擇性）：難波Parks 4樓 SPORTS DEPO／Alpen Outdoors（11:00起營業）；優惠券5% OFF，有效至2027/6/30",
              locationQuery: "スポーツデポ なんばパークス店 大阪",
              image: { src: "images/coupons/alpen.jpg", alt: "Alpen 優惠券", label: "優惠券" }
            },
            {
              text: "家電／藥妝：BicCamera 難波店（離難波站約2〜3分鐘，約10:00〜21:00）；優惠券免稅10%，另依品類加7%／5%／3%，結帳兩個條碼都要掃；Apple、遊戲機等不適用，有效至2026/12/31；與EDION優惠券不能疊加",
              locationQuery: "ビックカメラ なんば店 大阪",
              image: { src: "images/coupons/biccamera.jpg", alt: "BicCamera 優惠券", label: "優惠券" }
            }
          ],
          badges: ["SHOPPING", "FOOD"],
          locationQuery: "難波 心齋橋 大阪",
          guide: {
            type: "shopping",
            highlights: "心齋橋筋商店街、難波 CITY、難波 Parks、BicCamera 難波店都在同一區域，購物選擇集中。",
            tips: "採買時間約30分鐘，建議擇一區域集中逛，並預留前往機場的時間。",
            sections: [
              { label: "BicCamera 難波店補充", text: "地址：千日前2-10-1，連接難波Walk；年中無休，營業約10:00〜21:00（各網站寫法不一致）。優惠券：免稅10%，另加照相機／家電／玩具7%、藥妝／食品／日用品5%、日本酒3%，結帳兩個條碼都要掃；Apple、遊戲機等不適用；與EDION優惠券不能疊加，同類商品擇一店購買。" }
            ],
            stops: [
              {
                name: "りくろーおじさんの店 難波本店", brief: "現烤起司蛋糕，趁熱吃",
                locationQuery: "りくろーおじさんの店 難波本店 大阪",
                specialty: "現烤起司蛋糕；每次約烤12個，週六可能要排約25分鐘，人多時會限購。",
                mustTry: "招牌現烤起司蛋糕（評論最多人點，趁熱最好吃，冷掉可微波加熱）",
                orderingTips: "想坐下吃可去2樓陸Cafe ROOM；起司蛋糕要當天食用。",
                hours: "1樓販售約9:00〜20:00，2〜3樓咖啡座約11:00〜17:30"
              },
              {
                name: "551蓬莱 本店", brief: "豬肉包，當天吃",
                locationQuery: "551蓬莱 本店 難波 大阪",
                specialty: "難波戎橋筋商店街的本店；本店限定的叉燒包與豆沙包（限量，分別約11:00、10:00起賣）。",
                mustTry: "招牌豬肉包（豚まん，評論最多人點，現做當天吃最好）",
                orderingTips: "想坐下吃可去2樓內用；伴手禮要買當天吃的份量，不建議帶上飛機隔夜。",
                hours: "售票口約10:00〜21:30，第1、第3週二公休，11/7週六有營業"
              }
            ]
          }
        },
        {
          time: "11:55〜12:10",
          title: "EDION難波本店 Neverland（選擇性）",
          description: "電玩、公仔、模型樓層，4樓設有寄物櫃可空手逛街；時間緊，與BicCamera二擇一，來不及就略過",
          notes: [
            "14:30的班機，最晚12:15前要離開難波；EDION與BicCamera的優惠券不能疊加，同類商品擇一店購買，建議只逛一家",
            {
              text: "優惠券：免稅10%，另有家電類7%或食品藥妝類5%（兩個條碼都要掃）；玩具、遊戲、影音軟體、書籍、酒類等不適用優惠券，僅可免稅，有效至2027/12/31",
              image: { src: "images/coupons/edion.jpg", alt: "EDION 優惠券", label: "優惠券" }
            }
          ],
          badges: ["SHOPPING"],
          locationQuery: "EDION難波本店 大阪"
        },
        {
          time: "12:15後",
          title: "前往關西機場",
          description: "CI153 14:30從關西機場第1航廈起飛，目標13:00前抵達機場",
          notes: [
            "搭南海電鐵到關西機場約40分鐘（含走到車站與等車請預留更多），預計12:55〜13:00抵達；報到櫃台通常在起飛前約60分鐘截止（以華航規定為準），行李、退稅與安檢都需要時間",
            "2026/11/1起免稅改為出境後退稅，退稅手續請預留時間"
          ],
          badges: ["TRANSPORT"],
          locationQuery: "關西國際機場 大阪"
        }
      ]
    }
  ],

  checklist: [
    {
      title: "需提前預約／購票",
      items: [
        { id: "tkt-rapit", day: "Day 1", label: "南海 Rapi:t 指定席（關西機場→難波）", detail: "確認車次、座位與月台；不要誤搭 JR 關空快速" },
        { id: "tkt-teamlab", day: "Day 3", label: "teamLab Biovortex Kyoto 時段票（已購票）", detail: "17:00 入場，3位成人；票券請存在手機，現場出示" },
        { id: "chk-tempozan", day: "Day 2", label: "天保山午餐：確認營業店家（橫丁整修休業中）", detail: "なにわ食いしんぼ橫丁2026/9/29起除部分店家外休業，到現場才知道哪些店營業；出發前可電話06-6576-5501確認；沒營業就去森ノ宮吃麦笑（週三有營業，午餐11:00〜15:00）" },
        { id: "rsv-takoume", day: "Day 2", label: "宵夜：たこ梅 本店（關東煮，可電話預約，尚未訂位）", detail: "預計20:00；只接受電話預約，15:00以後打（06-6211-6201，日文），一般客人一週前起受理，11/4的預約10/28（日本時間）15:00以後才能打；座位限90分鐘；每人お通し¥275；不預約則現場排隊；21:00前離店，Day 3凌晨04:45出發" },
        { id: "rsv-kimono", day: "Day 3", label: "和服店預約確認", detail: "08:15 抵達報到，09:00 換裝" },
        { id: "rsv-yuyama", day: "Day 3", label: "午餐：祇園 ゆやま（已訂位）", detail: "11:30 入座，3位；預訂資訊請存在手機" },
        { id: "rsv-shigetsu", day: "Day 4", label: "午餐：天龍寺 篩月（已訂位）", detail: "11:30 入席，3位，「雪」套餐¥3,800／人；預訂資訊請存在手機；餐費當天現場付款，庭園參拜費¥500／人另付" },
        { id: "tkt-sagano", day: "Day 4", label: "嵯峨野觀光小火車（嵯峨野81號）", detail: "17:13 嵐山站出發；車票於乘車日前約1個月（日本時間00:00）開賣，請盡早購買，並以官網公告為準" }
      ]
    },
    {
      title: "當天購票（出發前確認票價與購買方式）",
      items: [
        { id: "buy-kaiyukan", day: "Day 2", label: "海遊館" },
        { id: "buy-osakajo", day: "Day 2", label: "大阪城天守閣" },
        { id: "buy-kiyomizu", day: "Day 3", label: "清水寺（拜觀費）" },
        { id: "buy-joujakkouji", day: "Day 4", label: "常寂光寺（拜觀費）" },
        { id: "buy-tenryuji", day: "Day 4", label: "天龍寺（拜觀費）" },
        { id: "buy-harukas", day: "Day 5", label: "阿倍野HARUKAS展望台" }
      ]
    },
    {
      title: "行前準備",
      items: [
        { id: "prep-passport", label: "護照效期與入境所需文件確認" },
        { id: "prep-arrivalcard", label: "入境卡：Visit Japan Web 或紙本", detail: "官方推薦Visit Japan Web；紙本在飛機上或機場領取，填寫範例見Day 1備註" },
        { id: "prep-flight", label: "機票與登機", detail: "去程CI156 11/3 08:05桃園第2航廈；回程CI153 11/7 14:30關西第1航廈，13:00前抵達機場；託運行李每人1件（重量未註明）；辦理登機需出示護照；電子機票收據（含個資）存在手機" },
        { id: "prep-lodging", label: "確認住宿入住方式與抵達時間" },
        { id: "prep-ic", label: "準備交通 IC 卡", detail: "建議使用 ICOCA（關西最通用）" },
        { id: "prep-coupons", label: "優惠券與護照", detail: "優惠券已附在行程備註；2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認" },
        { id: "prep-cash", label: "準備日幣現鈔", detail: "個人建議攜帶約NT$6,000〜7,000的日幣現鈔；寺廟門票、交通儲值、街邊小吃需現金，其餘以信用卡為主" },
        { id: "prep-dining", label: "用餐原則", detail: "避開京都錦市場、大阪黑門市場用餐，網路評價不佳、易坑觀光客，僅適合走馬看花拍照" },
        { id: "prep-weather", label: "洋蔥式穿搭與輕便雨具", detail: "白天約20〜23°C，晚上約13°C" },
        { id: "prep-network", label: "手機網路與行動電源" },
        { id: "prep-day3", day: "Day 3", label: "前一晚早點休息", detail: "04:45 出發，全天逾 15 小時" }
      ]
    }
  ],

  // Weather card: static climate text + optional JMA forecast per city.
  weather: {
    dayTemp: "約20〜23°C",
    nightTemp: "約13°C",
    climate: "早晚溫差大，建議洋蔥式穿搭；降雨機率低，仍建議攜帶輕便雨具。",
    offices: {
      OSAKA: { code: "270000", label: "大阪", tempArea: "大阪" },
      KYOTO: { code: "260000", label: "京都", tempArea: "京都" }
    }
  }
};
