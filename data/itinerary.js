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
    accommodation: {
      name: "日本橋近鐵站附近套房",
      detail: "4晚・3人",
      location: "大阪市中央區，近鐵日本橋站步行約5分鐘，鄰近黑門市場／難波／道頓堀",
      locationQuery: "近鐵日本橋站 大阪"
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
          time: "12:50",
          title: "抵達關西機場",
          description: "南海Rapi:t直達難波",
          notes: [
            "入境提領行李後，依「南海電鐵／NANKAI」指標前往關西機場站（南海電鐵車站位於第1航廈2F，經聯絡空橋可達）",
            "搭乘南海特急Rapi:t前往「難波」站，為指定席，搭車前請確認車次、座位與月台",
            "抵達南海難波站後，再依當日住宿位置前往近鐵日本橋站附近",
            "提醒：不要誤搭JR關空快速；本行程使用南海Rapi:t前往難波"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "13:40〜14:00",
          title: "入住日本橋近鐵站套房",
          description: "稍作休息",
          notes: [],
          badges: ["REST"],
          locationQuery: "近鐵日本橋站 大阪"
        },
        {
          time: "14:00〜15:30",
          title: "自由活動／休息",
          description: "搭機後先休息，15:30前出發前往梅田",
          notes: [],
          badges: ["REST"]
        },
        {
          time: "15:30〜16:00",
          title: "前往梅田",
          description: "搭御堂筋線至梅田（大阪站）",
          notes: [
            "難波到梅田搭御堂筋線約10分鐘，從住處出發請預留約25〜30分鐘（實際路線與時間請用Google Maps確認）"
          ],
          badges: ["TRANSPORT"]
        },
        {
          time: "16:00〜18:30",
          title: "大丸梅田店",
          description: "13樓 Nintendo OSAKA、寶可夢中心大阪",
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
            tips: "店20:00打烊，建議18:30前離開；2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認。"
          }
        },
        {
          time: "18:30〜19:00",
          title: "返回難波",
          description: "搭御堂筋線回難波，前往道頓堀",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "19:00〜21:00",
          title: "道頓堀・心齋橋",
          description: "",
          notes: [
            {
              text: "晚餐建議：美津の 道頓堀本店（大阪燒，昭和20年創業；名物是「美津の燒」與口感鬆軟的山芋燒；11:00〜22:00營業，最後點餐21:00；常需排隊）",
              locationQuery: "お好み焼 美津の 道頓堀 大阪"
            },
            {
              text: "晚餐建議：福太郎 本店（難波千日前，大阪燒；最有名的是放滿青蔥的「蔥燒」，牛筋蔥燒很受歡迎；平日17:00開、假日12:00開，營業到23:30，最後點餐22:45；常需排隊）",
              locationQuery: "福太郎 本店 千日前 大阪"
            },
            "固力果跑跑人拍照、逛街",
            {
              text: "甜點：元祖Ice Dog（美國村，西心齋橋；11:00〜21:00營業，不定休）。招牌是把軟式冰淇淋夾進現炸的甜麵包，口味有牛奶、抹茶、巧克力等，加¥50可加醬料；價格各網站寫法不同，請看現場菜單",
              locationQuery: "元祖アイスドッグ 西心斎橋 大阪"
            },
            {
              text: "藥妝：Sundrug 道頓堀店（宗右衛門町，營業至深夜）；優惠券單筆未稅滿¥10,000起適用，最高約17% OFF（含免稅），有效至2026/12/31",
              locationQuery: "サンドラッグ 道頓堀店 大阪",
              image: { src: "images/coupons/sundrug.jpg", alt: "Sundrug 優惠券", label: "優惠券" }
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
            tips: "晚上人很多，貴重物品要看好；沿河邊單側走比較順。"
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
          description: "",
          notes: [],
          badges: ["FOOD"],
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
          }
        },
        {
          time: "13:20〜14:00",
          title: "移動至大阪城",
          description: "",
          notes: [],
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
            "週四公休（今日週三有營業）；付款方式未查到，請備日幣現鈔",
            "用餐後請直接前往下一站，不在新世界夜間逗留"
          ],
          badges: ["FOOD"],
          locationQuery: "大興壽司 本店 大阪",
          guide: {
            type: "food",
            specialty: "新世界老字號大眾壽司店，職人現場握製，3貫150円起，有吧台與桌位。",
            mustTry: "紅味噌湯（赤だし）、8貫握壽司套餐",
            budget: "約¥1,000〜2,000／人",
            budgetVerifiedAt: "2026-10",
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
          description: "回難波後沿御堂筋散步賞燈，回住處順路",
          notes: [
            "御堂筋燈飾展演期間2026/11/03〜12/31，點燈約17:00〜25:00（出發前請再確認官方公告）",
            "燈飾範圍為阪神前交差點～難波西口交差點；今晚可從難波往北散步，與Day 1的道頓堀・心齋橋互補",
            "御堂筋為主要車道，請沿人行道步行，不要為拍照穿越馬路"
          ],
          badges: ["PHOTO"],
          locationQuery: "御堂筋 大阪",
          guide: {
            type: "attraction",
            summary: "大阪最主要的南北向大馬路，秋冬時兩旁的行道樹（以銀杏為主）會亮起金黃色彩燈，是大阪冬天的代表夜景。",
            highlights: "燈飾範圍從阪神前交差點到難波西口交差點，從難波往北走就能看到；也可以順便逛心齋橋。",
            photoTips: "熱門拍法：站在人行道上，拍整排亮燈的行道樹一路延伸到遠方。夜晚光線暗，手機請拿穩或靠著欄杆拍。",
            photoExample: {
              src: "images/photos/midosuji.jpg",
              alt: "御堂筋行道樹燈飾夜景",
              caption: "御堂筋的行道樹燈飾（2024年12月）",
              author: "Tokumeigakarinoaoshima",
              sourceUrl: "https://commons.wikimedia.org/wiki/File:Midosuji_illumination_on_4th_December_2024.jpg",
              licenseName: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
            },
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
          time: "10:15〜11:15",
          title: "日東堂 KYOTO COFFEE",
          description: "八坂之塔旁，喝咖啡牛奶，穿和服在八坂之塔拍照",
          notes: [
            "10:00〜18:00營業（最後點餐17:30），週一與國定假日公休；附設KYOTO COFFEE咖啡站，招牌咖啡牛奶",
            "必買：京都みるくサンドクッキー（クローバー牧場特別牛乳，6個入約993円／12個入約1,695円）",
            "從和服店（祇園）步行約10〜15分鐘，穿和服請慢慢走"
          ],
          badges: ["FOOD", "SHOPPING", "PHOTO"],
          locationQuery: "日東堂 京都",
          guide: {
            type: "shopping",
            highlights: "古民家改裝的日本雜貨店，附設KYOTO COFFEE咖啡站；2樓有玻璃茶室，窗外可以看到八坂之塔。",
            recommendedItems: "招牌咖啡牛奶；京都みるくサンドクッキー",
            tips: "穿和服在八坂之塔旁拍照很上相；營業時間請以官網為準。"
          }
        },
        {
          time: "11:30〜12:15",
          title: "祇園・花見小路散策拍照",
          description: "",
          notes: [
            "可順手購買：生八ッ橋、茶の菓（MALEBRANCHE）－沿路店家皆有販售"
          ],
          badges: ["PHOTO", "SHOPPING"],
          locationQuery: "祇園 花見小路 京都",
          guide: {
            type: "attraction",
            historyBrief: "花見小路是祇園最有名的街，江戶時代因為靠近八坂神社、客人多，漸漸發展成茶屋聚集的花街。現在仍有藝妓、舞妓在這一帶活動。",
            summary: "京都最有名的傳統街景，石板路兩旁是木造茶屋和燈籠，很有古都氣氛。",
            highlights: "從八坂神社往南走就是花見小路；走過辰巳橋可以到白川河邊，柳樹配老房子也是熱門拍照點，午餐的白川なみ里就在附近。",
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
          time: "12:15〜12:30",
          title: "移動至白川なみ里",
          description: "步行約5分",
          notes: [],
          badges: ["TRANSPORT"],
          group: "下午"
        },
        {
          time: "12:30〜14:00",
          title: "午餐：祇園白川 なみ里",
          description: "白川沿岸京料理，輕鬆用餐氣氛",
          notes: [],
          badges: ["FOOD"],
          locationQuery: "祇園白川 なみ里 京都",
          guide: {
            type: "food",
            specialty: "白川沿岸京料理，環境優雅、步調輕鬆",
            mustTry: "季節御膳、京都野菜料理",
            budget: "約¥4,000〜6,000／人",
            budgetVerifiedAt: "2026-08",
            reservationTip: "用餐時段建議提前預約，假日尤其熱門",
            elderFriendly: "座位需脫鞋入座，行動不便者建議事先詢問是否有椅子座位"
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
          time: "15:00〜16:00",
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
            tips: "整座稻荷山往返要2小時以上；你們只有約1小時，走前段千本鳥居就能拍到主要畫面，再依體力決定要不要走到四辻。"
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
          time: "10:00〜11:00",
          title: "天龍寺",
          description: "",
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
          time: "11:00〜12:00",
          title: "嵐山大街逛街／伴手禮",
          description: "",
          notes: [
            "順路：中村屋総本店可樂餅",
            "建議先電話確認營業狀態：075-861-1888"
          ],
          badges: ["SHOPPING", "FOOD", "PENDING"],
          locationQuery: "嵐山 商店街 京都"
        },
        {
          time: "12:00〜13:10",
          title: "午餐",
          description: "",
          notes: [
            "午餐選項：湯豆腐（原行程安排）"
          ],
          badges: ["FOOD"]
        },
        {
          time: "13:10〜13:45",
          title: "咖啡／甜點、稍微休息",
          description: "",
          notes: [],
          badges: ["FOOD", "REST"]
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
          time: "11:30〜12:00",
          title: "難波・心齋橋採買",
          description: "",
          notes: [
            "可加購：りくろーおじさんの店（起司蛋糕，難波店）",
            "551蓬莱（豬肉包，難波／心齋橋均有分店）",
            {
              text: "運動用品（選擇性）：難波Parks 4樓 SPORTS DEPO／Alpen Outdoors（11:00起營業）；優惠券5% OFF，有效至2027/6/30",
              locationQuery: "スポーツデポ なんばパークス店 大阪",
              image: { src: "images/coupons/alpen.jpg", alt: "Alpen 優惠券", label: "優惠券" }
            }
          ],
          badges: ["SHOPPING", "FOOD"],
          locationQuery: "難波 心齋橋 大阪",
          guide: {
            type: "shopping",
            highlights: "心齋橋筋商店街、難波 CITY、難波 Parks 都在同一區域，購物選擇集中。",
            tips: "採買時間約30分鐘，建議擇一區域集中逛，並預留前往機場的時間。"
          }
        },
        {
          time: "12:00〜12:45",
          title: "EDION難波本店 Neverland",
          description: "電玩、公仔、模型樓層，4樓設有寄物櫃可空手逛街",
          notes: [
            {
              text: "優惠券：免稅10%，另有家電類7%或食品藥妝類5%（兩個條碼都要掃）；玩具、遊戲、影音軟體、書籍、酒類等不適用優惠券，僅可免稅，有效至2027/12/31",
              image: { src: "images/coupons/edion.jpg", alt: "EDION 優惠券", label: "優惠券" }
            }
          ],
          badges: ["SHOPPING"],
          locationQuery: "EDION難波本店 大阪"
        },
        {
          time: "13:00後",
          title: "前往關西機場",
          description: "",
          notes: [],
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
        { id: "rsv-kimono", day: "Day 3", label: "和服店預約確認", detail: "08:15 抵達報到，09:00 換裝" },
        { id: "rsv-namiri", day: "Day 3", label: "午餐：祇園白川 なみ里 預約", detail: "12:30 用餐時段，假日尤其熱門" },
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
        { id: "prep-lodging", label: "確認住宿入住方式與抵達時間" },
        { id: "prep-ic", label: "準備交通 IC 卡", detail: "建議使用 ICOCA（關西最通用）" },
        { id: "prep-coupons", label: "優惠券與護照", detail: "優惠券已附在行程備註；2026/11/1起免稅改為出境後退稅，結帳方式請向店員確認" },
        { id: "prep-cash", label: "準備日幣現鈔", detail: "寺廟門票、交通儲值、街邊小吃需現金，其餘以信用卡為主" },
        { id: "prep-weather", label: "洋蔥式穿搭與輕便雨具", detail: "白天約20〜23°C，晚上約13°C" },
        { id: "prep-network", label: "手機網路與行動電源" },
        { id: "prep-day3", day: "Day 3", label: "前一晚早點休息", detail: "04:45 出發，全天逾 15 小時" }
      ]
    }
  ],

  travelNotes: [
    {
      title: "用餐原則",
      body: "避開京都錦市場、大阪黑門市場用餐，網路評價不佳、易坑觀光客，僅適合走馬看花拍照。"
    },
    {
      title: "氣候",
      body: "白天約20〜23°C，晚上約13°C，早晚溫差大，建議洋蔥式穿搭；降雨機率低，仍建議攜帶輕便雨具。"
    },
    {
      title: "現金",
      body: "個人建議攜帶NT$6,000〜7,000日幣現鈔，寺廟門票、交通儲值、街邊小吃需現金，其餘以信用卡為主。"
    },
    {
      title: "交通IC卡",
      body: "建議使用ICOCA（關西最通用）。"
    },
    {
      title: "teamLab預約",
      body: "已購票，11/5 17:00入場，3位成人。"
    }
  ]
};
