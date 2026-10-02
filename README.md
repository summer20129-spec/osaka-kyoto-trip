# 大阪・京都 五日紀行

2026.11.03 — 11.07 大阪・京都五日旅遊行程網站。手機優先、無需建置流程的純靜態網站。

## 如何開啟

直接用瀏覽器開啟 `index.html` 即可（雙擊或拖曳到瀏覽器）。不需要伺服器、不需要安裝任何套件。

```
open index.html
```

## 資料架構（Content Layer / UI Layer 分離）

```
osaka-kyoto-trip/
├── 大阪京都五日行程.txt   ← 原始行程 Source of Truth（不可修改）
├── index.html             ← 網站骨架（UI Layer）
├── css/style.css          ← 設計系統（UI Layer）
├── js/app.js              ← Render / 互動邏輯（UI Layer）
└── data/itinerary.js      ← 結構化行程資料（Content Layer）
```

- **`大阪京都五日行程.txt`** 是行程內容的唯一真實來源，網站本身不會讀取它，也**不應該修改它**。
- **`data/itinerary.js`** 是網站實際渲染時讀取的資料，內容取自 TXT，一般行程異動只需要改這個檔案。
- **`js/app.js`** 只負責把 `data/itinerary.js` 的資料畫成畫面、處理 sticky nav / smooth scroll / 目前 Day 自動 highlight，本身不含任何行程內容。
- **`css/style.css`** 是整站的設計系統（顏色、字級、間距、Badge 樣式），不含行程內容。
- **`index.html`** 只是頁面骨架與區塊容器，實際內容由 `app.js` 在載入時注入。

### 維護原則

> 一般行程修改（改時間、改餐廳、加景點、刪景點、改交通、改備註、改預約時間）
> **只需要修改 `data/itinerary.js`，不需要也不應該修改 `index.html` / `style.css` / `app.js`。**

只有在需要調整版面設計、新增區塊類型、或新增「Badge 種類」以外的新功能時，才需要動到 UI Layer。

## 如何修改 `data/itinerary.js`

打開 `data/itinerary.js`，找到全域變數 `ITINERARY_DATA`，裡面有三大區塊：

- `trip`：Hero 顯示的標題、日期、統計數字（Travelers / Nights / Cities）
- `overview`：Trip Overview 卡片（旅行日期、人數、城市、住宿）
- `days`：一個陣列，每個元素是一天的行程
- `travelNotes`：頁尾 Travel Notes 卡片

### 修改時間 / 景點 / 餐廳 / 交通 / 備註

每個 `days[n].items` 陣列裡的一個物件代表時間軸上的一個項目：

```js
{
  time: "09:00〜11:30",        // 顯示的時間
  title: "海遊館",              // 地點 / 活動名稱
  description: "鯨鯊、企鵝、水獺，室內動線平緩", // 一行簡短說明
  notes: [],                    // 額外備註（陣列，每行一則，會加上 "—" 前綴）
  badges: ["PHOTO"]             // 見下方 Badge 清單
}
```

`notes` 的每一項通常是純文字；若該則備註提到的地點想附上地圖連結，可改寫成 `{ text: "...", locationQuery: "搜尋字串" }`。

直接修改對應欄位的文字即可，例如把 `time` 改成新的時段，或把 `title` 換成新地點。

### 新增景點

在對應 `days[n].items` 陣列中，於想要的位置插入一個新的物件（格式同上）。陣列順序就是時間軸顯示順序，請依時間先後放置。

### 刪除景點

直接刪除 `days[n].items` 陣列中的整個物件（包含前後的 `{ ... },`）。

### 新增 / 修改 Badge

目前支援的 Badge 種類（定義在 `js/app.js` 的 `BADGE_LABELS`，樣式定義在 `css/style.css`）：

| Badge Code | 顯示文字 | 用途 |
|---|---|---|
| `RESERVATION` | Reservation | 需要預約的項目 |
| `FOOD` | Food | 用餐 |
| `SHOPPING` | Shopping | 購物 |
| `PHOTO` | Photo | 拍照景點 |
| `TRANSPORT` | Transport | 交通移動 |
| `REST` | Rest | 休息 / 自由活動 |

在某個 item 的 `badges` 陣列中加入對應字串即可，例如 `badges: ["FOOD", "RESERVATION"]`。

若要新增一種全新的 Badge 類型（例如未來想加 `NIGHT`）：

1. 在 `js/app.js` 的 `BADGE_LABELS` 物件中加入 `NIGHT: "Night"`。
2. 在 `css/style.css` 的 Badge System 區塊加入對應的 `.badge--night { background: ...; color: ...; }`。
3. 之後就能在 `data/itinerary.js` 的任何 item 用 `badges: ["NIGHT"]`。

這是唯一需要同時修改 UI Layer 的情境（新增 Badge 種類本身是一次性的系統設定，日常使用只需套用既有 Badge）。

### 高體力 / 特殊警示日（例如 Day 3）

在該天物件加上：

```js
highActivity: true,
warning: {
  label: "HIGH ACTIVITY",
  title: "04:45 出發，全天近 14 小時",
  body: "本次旅程體力消耗最大的一天……"
}
```

`highActivity: false` 或省略 `warning` 則不會顯示警示卡。

### 修改行前準備清單

編輯最外層的 `checklist` 陣列，每組為 `{ title, items }`，每個項目為 `{ id, label, detail?, day? }`。`id` 必須唯一且不要隨意更改（勾選狀態以 `id` 儲存在使用者自己瀏覽器的 localStorage，不會上傳到任何地方）。

### 修改 Travel Notes

編輯最外層的 `travelNotes` 陣列，每個項目為 `{ title, body }`。

## 技術說明

- 純 HTML5 + CSS3 + Vanilla JavaScript，無任何 npm package、外部 CDN、UI framework。
- `data/itinerary.js` 與 `js/app.js` 皆以一般 `<script>`（非 `type="module"`）載入，確保用 `file://` 直接開啟也能正常運作。
- 無任何外部網路請求（無 Google Maps、無 Analytics、無 Tracking、無外部字型 CDN）。
- Mobile First：Sticky Day Navigation 可水平滑動，目前瀏覽的 Day 會自動 highlight（使用 `IntersectionObserver`）。

## 安全性

- 不含任何第三方 JavaScript CDN、npm 套件、Analytics 或 Tracking。
- 不含登入、資料庫或後端服務。
- 純靜態網站，攻擊面最小化。
