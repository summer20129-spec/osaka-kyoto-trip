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
          time: "15:30〜16:30",
          title: "黑門市場",
          description: "純逛街拍照，不在此用餐",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "黑門市場 大阪",
          guide: {
            type: "attraction",
            summary: "難波周邊的傳統市場，海鮮、熟食與街邊小吃聚集，適合感受大阪庶民市場氛圍。",
            tips: "本行程定位為純逛街拍照，用餐安排請參考頁尾「用餐原則」。"
          }
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
          locationQuery: "道頓堀 心齋橋 大阪",
          guide: {
            type: "attraction",
            summary: "大阪最具代表性的夜間街景，運河沿岸霓虹招牌林立，是大阪的象徵畫面。",
            highlights: "沿道頓堀川夜間散步看霓虹倒影；心齋橋筋商店街可順路逛街；固力果跑跑人是經典合照點。",
            photoTips: "戎橋（固力果橋）為最佳制高點，可一次收錄多個經典招牌入鏡。",
            tips: "晚間人潮壅擠，建議沿單側河岸步行；貴重物品隨身留意。"
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
          time: "09:00〜11:30",
          title: "海遊館",
          description: "鯨鯊、企鵝、水獺，室內動線平緩",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "海遊館 大阪",
          guide: {
            type: "attraction",
            summary: "以太平洋為主題的大型水族館，中央大水槽貫穿多樓層，是全館焦點。",
            highlights: "搭手扶梯上到最高樓層後沿螺旋動線向下參觀，可從不同高度眺望中央大水槽。",
            tips: "動線為單向設計，全程不需走回頭路。"
          }
        },
        {
          time: "12:00〜13:00",
          title: "天保山市場街午餐",
          description: "",
          notes: [],
          badges: ["FOOD"],
          locationQuery: "天保山市場街 大阪",
          guide: {
            type: "attraction",
            summary: "位於海遊館旁的商場，集中餐飲與伴手禮店，午餐動線順路。",
            highlights: "同區另有天保山大摩天輪與港灣遊船，行程未排入，若時間有餘裕可視情況加入。"
          }
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
          locationQuery: "大阪城 大阪",
          guide: {
            type: "attraction",
            historyBrief: "大阪城由豐臣秀吉於1583年下令建造，象徵其統一天下的權勢地位。歷經戰火與雷擊多次焚毀，現存天守閣為1931年重建的鋼筋混凝土建築，內部已改為展示館，並非豐臣時代原貌。",
            summary: "大阪代表性城郭地標，天守閣為園區核心焦點。",
            highlights: "天守閣最上層展望台可360度俯瞰大阪市區。",
            photoTips: "護城河沿岸可拍攝天守閣倒影，水面平靜時效果較佳。",
            tips: "園區範圍廣大，建議把體力留給天守閣核心區，外圍庭園可視時間彈性取捨。"
          }
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
          title: "晚餐＋御堂筋燈飾夜景",
          description: "晚餐後沿御堂筋散步賞燈，回住處順路",
          notes: [
            "御堂筋燈飾展演期間2026/11/03〜12/31，點燈約17:00〜25:00（出發前請再確認官方公告）",
            "燈飾範圍為阪神前交差點～難波西口交差點；今晚可從難波往北散步，與Day 1的道頓堀・心齋橋互補",
            "御堂筋為主要車道，請沿人行道步行，不要為拍照穿越馬路"
          ],
          badges: ["FOOD", "PHOTO"],
          locationQuery: "御堂筋 大阪",
          guide: {
            type: "attraction",
            summary: "大阪南北向主要幹道，秋冬期間以彩燈點綴行道樹，是大阪冬季代表性夜景之一。",
            photoTips: "以延伸的行道樹燈海為主體，沿人行道取景；夜間光線偏暗，手持拍攝請穩住相機。"
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
        title: "04:45 出發，全天近 14 小時",
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
            historyBrief: "清水寺相傳始建於778年，因坂上田村麻呂護持而興建。現存本堂與清水舞台為1633年江戶幕府重建，以傳統「懸造」工法建成，未使用一根釘子，1994年列入世界文化遺產。",
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
          locationQuery: "二年坂 三年坂 京都",
          guide: {
            type: "attraction",
            historyBrief: "二年坂・三年坂是京都東山地區通往清水寺的傳統參道，隨著周邊寺社興盛而發展為門前町。石板路與傳統町家至今保存完整，已被列為重要傳統建造物群保存地區。",
            summary: "京都東山最具代表性的石板老街，是清水寺周邊人氣最高的散策路段之一。",
            highlights: "石階兩側傳統京町家與老舖林立，保留京都舊時街景風貌。"
          }
        },
        {
          time: "07:30〜07:40",
          title: "八坂神社",
          description: "新增，順路零額外時間成本",
          notes: [],
          badges: ["PHOTO"],
          locationQuery: "八坂神社 京都",
          guide: {
            type: "attraction",
            historyBrief: "相傳創建於西元656年，主祀素戔嗚尊，是京都祇園祭的發源神社，每年7月的盛大祭典即源自此地驅除疫病的祈願儀式，歷史逾千年。",
            summary: "京都最古老神社之一，是東山地區信仰中心與祇園祭發源地。",
            highlights: "朱紅色樓門與本殿為代表性地標，緊鄰花見小路與二年坂，順遊便利。"
          }
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
          locationQuery: "祇園 花見小路 京都",
          guide: {
            type: "attraction",
            historyBrief: "花見小路是祇園的核心街道，江戶時代因鄰近八坂神社香客往來而發展為茶屋聚集的花街。傳統町家茶屋至今仍是藝妓、舞妓活動與傳統京都茶屋文化的重要據點。",
            summary: "京都最具代表性的傳統街景之一，石板路兩側洋溢濃厚古都氛圍。",
            highlights: "花見小路沿路町家建築完整，是祇園地區保存最完整的歷史街景之一。",
            tips: "部分巷弄為私人生活道路，請勿隨意進入或近距離拍攝藝妓、舞妓及店家，尊重在地居民與傳統文化從業者隱私。"
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
            historyBrief: "伏見稻荷大社相傳創建於711年，為全日本三萬多座稻荷神社的總本社，主祀掌管五穀豐收與商業繁榮的稻荷神。千本鳥居是信眾自江戶時代延續至今的還願奉納傳統，鳥居上可見捐贈者姓名與年份。",
            summary: "京都地標級神社，以綿延山徑的橘紅千本鳥居聞名。",
            highlights: "鳥居隧道從山腳延伸至山頂，前段密集排列的鳥居最具代表性。",
            tips: "全程往返山頂需2小時以上；一般遊客不必走完整座稻荷山，走前段千本鳥居即可獲得主要體驗。"
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
          locationQuery: "金閣寺 京都",
          guide: {
            type: "attraction",
            historyBrief: "金閣寺原為室町幕府將軍足利義滿於1397年建造的北山山莊，義滿過世後依其遺願改為禪寺。1950年曾遭僧人縱火燒毀，現存金閣為1955年重建，並非中世紀原始建築。",
            summary: "京都最具代表性景點之一，金箔外牆倒映鏡湖池，是經典畫面。",
            photoTips: "鏡湖池對岸為最佳合影角度，可將金閣寺與倒影一同入鏡。",
            tips: "順時針單向參觀動線，沿途皆為戶外步道，全程約30〜40分鐘。"
          }
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
          locationQuery: "阿倍野HARUKAS 大阪",
          guide: {
            type: "attraction",
            summary: "日本最高建築的展望台，可360度俯瞰大阪全景。",
            highlights: "天氣晴朗時可遠眺六甲山、明石海峽大橋方向。",
            tips: "設有室外露天甲板，可實際吹風眺望，建議留意保暖防風。"
          }
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
