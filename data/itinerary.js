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
      name: "日本橋近鐵站套房",
      detail: "4晚・3人",
      location: "中央區日本橋站步行5分・近難波／心齋橋／道頓堀／黑門市場"
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
          notes: [],
          badges: ["TRANSPORT"],
          locationQuery: "關西國際機場 大阪"
        },
        {
          time: "13:40〜14:00",
          title: "入住日本橋近鐵站套房",
          description: "稍作休息",
          notes: [],
          badges: ["REST"],
          locationQuery: "日本橋近鐵站套房 大阪"
        },
        {
          time: "15:30〜16:30",
          title: "黑門市場",
          description: "純逛街拍照，不在此用餐",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "黑門市場 大阪"
        },
        {
          time: "17:30〜21:00",
          title: "道頓堀・心齋橋",
          description: "",
          notes: [
            "晚餐建議：美津の（大阪燒，道頓堀本店）或福太郎本店（大阪燒，難波）",
            "固力果跑跑人拍照、逛街"
          ],
          badges: ["FOOD", "PHOTO", "SHOPPING"],
          locationQuery: "道頓堀 心齋橋 大阪"
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
          time: "09:00〜11:30",
          title: "海遊館",
          description: "鯨鯊、企鵝、水獺，室內動線平緩",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "海遊館 大阪"
        },
        {
          time: "12:00〜13:00",
          title: "天保山市場街午餐",
          description: "",
          notes: [],
          badges: ["FOOD"],
          locationQuery: "天保山市場街 大阪"
        },
        {
          time: "13:00〜13:40",
          title: "移動至大阪城",
          description: "",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "13:40〜15:30",
          title: "大阪城公園・天守閣",
          description: "天守閣有電梯，免爬樓梯",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "大阪城 大阪"
        },
        {
          time: "15:30〜16:10",
          title: "返回難波",
          description: "",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "16:10〜18:00",
          title: "自由活動／休息",
          description: "",
          notes: [],
          badges: ["REST"]
        },
        {
          time: "18:00〜20:30",
          title: "晚間活動：空庭溫泉",
          description: "或替代方案，待最終確認",
          notes: ["待確認：最終方案尚未定案"],
          badges: ["REST", "PENDING"],
          locationQuery: "空庭溫泉 大阪"
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
        title: "04:45 出發，全天近 14 小時",
        body: "本次旅程體力消耗最大的一天，凌晨出發、深夜返回，建議先與女友母親確認能否配合。"
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
            summary: "京都最具代表性的世界文化遺產，以懸空木造舞台聞名",
            highlights: "仁王門、三重塔、清水舞台、音羽の滝",
            photoTips: "清晨06:00前後人潮最少，逆光角度可拍出舞台剪影",
            tips: "石階濕滑，建議穿防滑鞋"
          }
        },
        {
          time: "07:00〜07:30",
          title: "二年坂・三年坂",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "二年坂 三年坂 京都"
        },
        {
          time: "07:30〜07:40",
          title: "八坂神社",
          description: "新增，順路零額外時間成本",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "八坂神社 京都"
        },
        {
          time: "07:40〜08:15",
          title: "日東堂",
          description: "八坂之塔正對面，僅外觀拍照，10點才開門",
          notes: [
            "附設KYOTO COFFEE咖啡站，招牌咖啡牛奶",
            "必買：京都みるくサンドクッキー（クローバー牧場特別牛乳，6個入約993円／12個入約1,695円）"
          ],
          badges: ["FOOD", "SHOPPING", "PHOTO"],
          locationQuery: "日東堂 京都"
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
          time: "10:15〜11:00",
          title: "LE LABO 京都町家",
          description: "開店後15分鐘抵達，避免搶購撲空",
          notes: [
            "必買：OSMANTHUS 19金木犀（京都限定城市香）",
            "15mL約¥22,110／50mL約¥48,730／100mL約¥70,180"
          ],
          badges: ["SHOPPING"],
          locationQuery: "LE LABO 京都町家 京都",
          guide: {
            type: "shopping",
            highlights: "改裝自京都傳統町家建築，香氛品牌LE LABO日本限定店",
            recommendedItems: "OSMANTHUS 19金木犀（京都限定城市香）",
            limitedItems: "京都限定香氛僅此門市販售",
            limitedItemsVerifiedAt: "2026-08",
            tips: "開店後15分鐘內抵達可避開排隊人潮"
          }
        },
        {
          time: "11:15〜12:15",
          title: "祇園・花見小路散策拍照",
          description: "",
          notes: [
            "可順手購買：生八ッ橋、茶の菓（MALEBRANCHE）－沿路店家皆有販售"
          ],
          badges: ["PHOTO", "SHOPPING"],
          locationQuery: "祇園 花見小路 京都"
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
          locationQuery: "伏見稻荷大社 京都"
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
          time: "16:30〜18:30",
          title: "teamLab Biovortex Kyoto",
          description: "京都駅八條東口步行7分，¥3,800起（浮動定價）",
          notes: [],
          badges: ["RESERVATION"],
          group: "傍晚／晚間",
          locationQuery: "teamLab Biovortex Kyoto 京都"
        },
        {
          time: "18:45",
          title: "返回大阪",
          description: "JR新快速＋轉乘，約60分鐘",
          notes: [
            "提醒：略碰到晚間尖峰尾端(17:00-19:00)，車廂可能較擁擠"
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
          time: "08:30",
          title: "難波→嵐山",
          description: "",
          notes: [],
          badges: ["TRANSPORT"]
        },
        {
          time: "09:30〜10:30",
          title: "渡月橋・竹林小徑",
          description: "",
          notes: [
            "順路：中村屋総本店可樂餅",
            "建議先電話確認營業狀態：075-861-1888"
          ],
          badges: ["PHOTO", "FOOD", "PENDING"],
          locationQuery: "渡月橋 京都"
        },
        {
          time: "11:00〜12:30",
          title: "嵯峨野觀光小火車",
          description: "坐著賞景，全程輕鬆",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "嵯峨野觀光小火車 京都"
        },
        {
          time: "12:30〜14:00",
          title: "嵐山湯豆腐午餐",
          description: "",
          notes: [],
          badges: ["FOOD"]
        },
        {
          time: "14:30〜16:00",
          title: "金閣寺",
          description: "",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "金閣寺 京都"
        },
        {
          time: "17:00",
          title: "返回大阪，晚餐",
          description: "",
          notes: [],
          badges: ["TRANSPORT", "FOOD"]
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
          locationQuery: "阿倍野HARUKAS 大阪"
        },
        {
          time: "11:30〜12:00",
          title: "難波・心齋橋採買",
          description: "",
          notes: [
            "可加購：りくろーおじさんの店（起司蛋糕，難波店）",
            "551蓬莱（豬肉包，難波／心齋橋均有分店）"
          ],
          badges: ["SHOPPING", "FOOD"],
          locationQuery: "難波 心齋橋 大阪"
        },
        {
          time: "12:00〜12:45",
          title: "EDION難波本店 Neverland",
          description: "電玩、公仔、模型樓層，4樓設有寄物櫃可空手逛街",
          notes: [],
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
      body: "需提前於官網或KLOOK預約時段票。"
    },
    {
      title: "Day3體力提醒",
      body: "全天近14小時行程，凌晨出發、深夜返回，體力消耗最大，建議先與女友母親確認能否配合。"
    }
  ]
};
