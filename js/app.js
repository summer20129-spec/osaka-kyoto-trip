/**
 * js/app.js
 * ------------------------------------------------------------------
 * Render + interaction logic for the itinerary site.
 * Reads structured data from the global ITINERARY_DATA (data/itinerary.js)
 * and renders the page. Contains no itinerary content itself — editing
 * the trip should never require touching this file.
 *
 * Loaded as a plain (non-module) script for file:// compatibility.
 * ------------------------------------------------------------------
 */

(function () {
  "use strict";

  var BADGE_LABELS = {
    RESERVATION: "Reservation",
    FOOD: "Food",
    SHOPPING: "Shopping",
    PHOTO: "Photo",
    TRANSPORT: "Transport",
    REST: "Rest",
    PENDING: "Pending",
    SHOOT: "🎬 分鏡"
  };

  /**
   * Travel Mode — TODAY / NOW / NEXT
   * ------------------------------------------------------------------
   * Reads only the browser's local Date() and formats it against the
   * Asia/Tokyo timezone via Intl.DateTimeFormat. No geolocation, no
   * network requests, no data ever leaves the browser.
   *
   * Testability: getJapanNow() reads an optional
   * window.__TRAVEL_MODE_MOCK_DATE__ (a Date instance) if present, so a
   * developer can exercise specific date/time cases from the browser
   * console without touching the system clock. This hook is undefined
   * by default — production always falls back to the real Date().
   * ------------------------------------------------------------------
   */
  var TRIP_TIMEZONE = "Asia/Tokyo";

  function getJapanNow() {
    var base =
      typeof window !== "undefined" && window.__TRAVEL_MODE_MOCK_DATE__ instanceof Date
        ? window.__TRAVEL_MODE_MOCK_DATE__
        : new Date();

    var formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: TRIP_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    var map = {};
    formatter.formatToParts(base).forEach(function (part) {
      if (part.type !== "literal") map[part.type] = part.value;
    });

    var hour = parseInt(map.hour, 10);
    if (hour === 24) hour = 0; // some engines report midnight as "24" with hour12:false
    var minute = parseInt(map.minute, 10);

    return {
      dateISO: map.year + "-" + map.month + "-" + map.day,
      hour: hour,
      minute: minute,
      minutesOfDay: hour * 60 + minute
    };
  }

  /**
   * Safely parses the itinerary's free-form time strings.
   * Supports: "HH:MM", "HH:MM〜HH:MM", "HH:MM～HH:MM", "HH:MM後".
   * Anything else is reported unparseable rather than guessed at.
   */
  function parseItemTime(str) {
    if (typeof str !== "string") {
      return { start: null, end: null, openEnded: false, unparseable: true };
    }

    var rangeMatch = str.match(/^(\d{1,2}):(\d{2})[〜～](\d{1,2}):(\d{2})$/);
    if (rangeMatch) {
      return {
        start: parseInt(rangeMatch[1], 10) * 60 + parseInt(rangeMatch[2], 10),
        end: parseInt(rangeMatch[3], 10) * 60 + parseInt(rangeMatch[4], 10),
        openEnded: false,
        unparseable: false
      };
    }

    var afterMatch = str.match(/^(\d{1,2}):(\d{2})後$/);
    if (afterMatch) {
      return {
        start: parseInt(afterMatch[1], 10) * 60 + parseInt(afterMatch[2], 10),
        end: null,
        openEnded: true,
        unparseable: false
      };
    }

    var singleMatch = str.match(/^(\d{1,2}):(\d{2})$/);
    if (singleMatch) {
      return {
        start: parseInt(singleMatch[1], 10) * 60 + parseInt(singleMatch[2], 10),
        end: null,
        openEnded: false,
        unparseable: false
      };
    }

    return { start: null, end: null, openEnded: false, unparseable: true };
  }

  /**
   * Determines TODAY / NOW / NEXT for the trip, given the current
   * Japan-time reading. Pure function of (data, now) — no side effects,
   * so it can be exercised directly with a mock `now` in tests.
   */
  function computeTravelMode(data, now) {
    var todayDay = null;
    for (var d = 0; d < data.days.length; d++) {
      if (data.days[d].dateISO === now.dateISO) {
        todayDay = data.days[d];
        break;
      }
    }

    if (!todayDay) {
      return { todayDay: null, nowItem: null, nextItem: null, dayComplete: false };
    }

    var items = todayDay.items;
    var nowItem = null;
    var nowIndex = -1;

    for (var i = 0; i < items.length; i++) {
      var parsed = parseItemTime(items[i].time);
      if (parsed.unparseable) continue;

      if (parsed.end !== null) {
        if (parsed.start <= now.minutesOfDay && now.minutesOfDay < parsed.end) {
          nowItem = items[i];
          nowIndex = i;
          break;
        }
      } else if (parsed.openEnded) {
        var isLastItem = i === items.length - 1;
        if (isLastItem && now.minutesOfDay >= parsed.start) {
          nowItem = items[i];
          nowIndex = i;
          break;
        }
      }
      // Single fixed-time items (no end, not open-ended) have no known
      // duration, so they are never considered NOW.
    }

    var nextItem = null;
    if (nowItem) {
      for (var j = nowIndex + 1; j < items.length; j++) {
        var afterNow = parseItemTime(items[j].time);
        if (afterNow.unparseable) continue;
        nextItem = items[j];
        break;
      }
    } else {
      for (var k = 0; k < items.length; k++) {
        var upcoming = parseItemTime(items[k].time);
        if (upcoming.unparseable || upcoming.start === null) continue;
        if (upcoming.start > now.minutesOfDay) {
          nextItem = items[k];
          break;
        }
      }
    }

    return {
      todayDay: todayDay,
      nowItem: nowItem,
      nextItem: nextItem,
      dayComplete: !nowItem && !nextItem
    };
  }

  /**
   * MAP — external map search links.
   * ------------------------------------------------------------------
   * The host/scheme/path are a fixed literal, never derived from data.
   * itinerary.js may only supply a short place-name search string
   * (locationQuery); it is percent-encoded into the query parameter
   * and can never redefine the destination domain or scheme. This is
   * the only mechanism in the app that produces an external URL, and
   * it is only ever attached to a plain <a> the user must click —
   * nothing here fetches, prefetches, or opens anything automatically.
   * ------------------------------------------------------------------
   */
  var MAP_URL_TEMPLATE = "https://www.google.com/maps/search/?api=1&query=";

  function buildMapUrl(query) {
    return MAP_URL_TEMPLATE + encodeURIComponent(query);
  }

  /**
   * GUIDE — optional place/food/shopping guide content.
   * ------------------------------------------------------------------
   * item.guide is entirely optional and additive; itinerary items with
   * no guide render exactly as before. All guide text is plain,
   * human-written content rendered via textContent only (see el()) —
   * never innerHTML — and never contains URLs, coordinates, or any
   * live/fetched data. Fields marked with a *VerifiedAt companion are
   * semi-dynamic (price, limited-stock info) and are always rendered
   * with an explicit "reference only, not live" note.
   * ------------------------------------------------------------------
   */
  var GUIDE_FIELD_CONFIG = {
    attraction: [
      { key: "historyBrief", label: "歷史小知識" },
      { key: "summary", label: "特色摘要" },
      { key: "highlights", label: "推薦看點" },
      { key: "photoTips", label: "拍照重點" },
      { key: "tips", label: "注意事項" }
    ],
    food: [
      { key: "specialty", label: "店家特色" },
      { key: "mustTry", label: "招牌必點" },
      { key: "orderingTips", label: "點餐攻略" },
      { key: "reviewSummary", label: "網路評價" },
      { key: "budget", label: "價格帶", verifiedAtKey: "budgetVerifiedAt" },
      { key: "hours", label: "營業時間" },
      { key: "reservationTip", label: "預約建議" },
      { key: "elderFriendly", label: "長輩友善提示" },
      { key: "checkTips", label: "入店時可確認" }
    ],
    // Plain information card (transport, forms…): content comes from
    // guide.sections only.
    info: [],
    // One time slot, several shops: guide.intro + guide.stops[] (each
    // stop has its own MAP link and the fields in STOP_FIELD_CONFIG).
    stops: [
      { key: "intro", label: "路線順序" }
    ],
    shopping: [
      { key: "highlights", label: "店家特色" },
      { key: "recommendedItems", label: "必買" },
      { key: "orderingTips", label: "點餐攻略" },
      { key: "limitedItems", label: "限定商品", verifiedAtKey: "limitedItemsVerifiedAt" },
      { key: "hours", label: "營業時間" },
      { key: "tips", label: "購買提醒" }
    ]
  };

  var STOP_FIELD_CONFIG = [
    { key: "specialty", label: "店家特色" },
    { key: "mustTry", label: "招牌必點／必買" },
    { key: "orderingTips", label: "點餐攻略" },
    { key: "reviewSummary", label: "網路評價" },
    { key: "budget", label: "價位", verifiedAtKey: "budgetVerifiedAt" },
    { key: "hours", label: "營業時間" }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null && text !== "") node.textContent = text;
    return node;
  }

  function renderHeroStats(data) {
    var container = document.getElementById("hero-stats");
    if (!container) return;
    data.trip.stats.forEach(function (stat) {
      var li = el("li", "hero__stat");
      li.appendChild(el("span", "hero__stat-value", stat.value));
      li.appendChild(el("span", "hero__stat-label", stat.label));
      container.appendChild(li);
    });
  }

  function renderOverview(data) {
    var container = document.getElementById("overview-grid");
    if (!container) return;
    var overview = data.overview;

    renderFlightCard(overview, container);
    renderAccommodationCard(overview.accommodation, container);
    renderWeatherCard(data, container);
  }

  /**
   * Accommodation card: name, nearest station, MAP link; the full
   * address sits behind an expand button.
   */
  function renderAccommodationCard(acc, container) {
    if (!acc) return;
    var card = el("div", "overview__card");
    card.appendChild(el("p", "overview__card-label", "住宿"));
    card.appendChild(el("p", "overview__card-value", acc.name));
    var detail = [acc.detail, acc.station].filter(Boolean).join(" · ");
    if (detail) card.appendChild(el("p", "overview__card-detail", detail));

    var actions = el("div", "overview__actions");
    if (acc.locationQuery) {
      actions.appendChild(renderMapLink({ title: acc.name, locationQuery: acc.locationQuery }));
    }
    var panelId = "address-panel";
    if (acc.address) {
      actions.appendChild(renderGuideButton(panelId, "詳細地址"));
    }
    card.appendChild(actions);

    if (acc.address) {
      var panel = el("div", "guide-panel overview__address");
      panel.id = panelId;
      panel.hidden = true;
      panel.appendChild(el("p", "guide-panel__value", acc.address));
      card.appendChild(panel);
    }
    container.appendChild(card);
  }

  /**
   * Flights card: label, flight number, times, terminals. Data only
   * carries public trip facts (no passenger name, booking reference or
   * ticket number — those stay out of the public site).
   */
  function renderFlightCard(overview, container) {
    if (!overview.flights || !overview.flights.length) return;
    var card = el("div", "overview__card overview__card--wide flight-card");
    card.appendChild(el("p", "overview__card-label", "航班"));

    overview.flights.forEach(function (f) {
      var row = el("div", "flight-row");
      var head = el("p", "flight-row__head");
      head.appendChild(el("span", "flight-row__dir", f.label));
      head.appendChild(el("span", "flight-row__no", f.flightNo));
      head.appendChild(el("span", "flight-row__meta", f.date));
      row.appendChild(head);

      var route = el("p", "flight-row__route");
      route.appendChild(el("span", "flight-row__time", f.departs));
      route.appendChild(el("span", "flight-row__place", f.from));
      route.appendChild(el("span", "flight-row__arrow", "→"));
      route.appendChild(el("span", "flight-row__time", f.arrives));
      route.appendChild(el("span", "flight-row__place", f.to));
      row.appendChild(route);

      card.appendChild(row);
    });

    if (overview.flightNote) {
      card.appendChild(el("p", "overview__card-detail", overview.flightNote));
    }
    container.appendChild(card);
  }

  /**
   * WEATHER — Japan Meteorological Agency (JMA) forecast.
   * ------------------------------------------------------------------
   * Static climate text always shows. When the trip days fall inside
   * JMA's 7-day forecast window, a per-day row (weather, min–max °C,
   * rain probability) is added from JMA's public forecast JSON.
   * - Only a GET to a fixed https://www.jma.go.jp/... URL built from a
   *   validated 6-digit office code; no cookies, no referrer, no user
   *   data; nothing is stored.
   * - Any failure (offline, format change) silently keeps the static
   *   text. Values are rendered via textContent only.
   * - window.__WEATHER_MOCK__ (object: office code -> parsed JSON) is a
   *   test hook, undefined in production.
   * Source credit shown on the card: 出典：気象庁ホームページ.
   * ------------------------------------------------------------------
   */
  var JMA_FORECAST_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
  var JMA_FORECAST_PAGE = "https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=";

  var WEATHER_CODE_TEXT = {
    "100": "晴", "101": "晴時多雲", "102": "晴一時雨", "103": "晴時有雨", "104": "晴一時雪",
    "110": "晴後時多雲", "111": "晴後多雲", "112": "晴後一時雨", "113": "晴後時有雨", "114": "晴後雨",
    "200": "多雲", "201": "多雲時晴", "202": "多雲一時雨", "203": "多雲時有雨", "204": "多雲一時雪",
    "210": "多雲後時晴", "211": "多雲後晴", "212": "多雲後一時雨", "213": "多雲後時有雨", "214": "多雲後雨",
    "300": "雨", "301": "雨時晴", "302": "雨時停", "303": "雨時有雪", "306": "大雨",
    "311": "雨後晴", "313": "雨後多雲", "400": "雪"
  };
  var WEATHER_BASE_TEXT = { "1": "晴", "2": "多雲", "3": "雨", "4": "雪" };

  function weatherCodeToText(code) {
    var key = String(code || "");
    if (WEATHER_CODE_TEXT[key]) return WEATHER_CODE_TEXT[key];
    return WEATHER_BASE_TEXT[key.charAt(0)] || "—";
  }

  function toNumberOrNull(value) {
    if (value === "" || value === null || value === undefined) return null;
    var n = Number(value);
    return isFinite(n) ? n : null;
  }

  /** JMA forecast JSON -> { "YYYY-MM-DD": { code, pop, tmin, tmax } } */
  function buildForecastByDate(json, tempAreaName) {
    var byDate = {};
    function slot(date) {
      if (!byDate[date]) byDate[date] = { code: null, pop: null, tmin: null, tmax: null };
      return byDate[date];
    }
    function pickArea(areas, name) {
      if (!areas || !areas.length) return null;
      for (var i = 0; i < areas.length; i++) {
        if (areas[i].area && areas[i].area.name === name) return areas[i];
      }
      return areas[0];
    }
    if (!Array.isArray(json)) return byDate;

    // Weekly block (json[1]): per-day code / probability / min-max temp.
    var weekly = json[1];
    if (weekly && Array.isArray(weekly.timeSeries)) {
      var wCode = weekly.timeSeries[0];
      var wTemp = weekly.timeSeries[1];
      if (wCode && Array.isArray(wCode.timeDefines) && wCode.areas && wCode.areas[0]) {
        wCode.timeDefines.forEach(function (t, i) {
          var s = slot(String(t).slice(0, 10));
          var code = wCode.areas[0].weatherCodes && wCode.areas[0].weatherCodes[i];
          if (code) s.code = String(code);
          if (wCode.areas[0].pops) s.pop = toNumberOrNull(wCode.areas[0].pops[i]);
        });
      }
      var tArea = wTemp && pickArea(wTemp.areas, tempAreaName);
      if (tArea && Array.isArray(wTemp.timeDefines)) {
        wTemp.timeDefines.forEach(function (t, i) {
          var s = slot(String(t).slice(0, 10));
          s.tmin = toNumberOrNull(tArea.tempsMin && tArea.tempsMin[i]);
          s.tmax = toNumberOrNull(tArea.tempsMax && tArea.tempsMax[i]);
        });
      }
    }

    // Short-range block (json[0]) is more precise for the next ~2 days.
    var daily = json[0];
    if (daily && Array.isArray(daily.timeSeries)) {
      var dCode = daily.timeSeries[0];
      var dPop = daily.timeSeries[1];
      var dTemp = daily.timeSeries[2];
      if (dCode && dCode.areas && dCode.areas[0] && Array.isArray(dCode.timeDefines)) {
        dCode.timeDefines.forEach(function (t, i) {
          var code = dCode.areas[0].weatherCodes && dCode.areas[0].weatherCodes[i];
          if (code) slot(String(t).slice(0, 10)).code = String(code);
        });
      }
      if (dPop && dPop.areas && dPop.areas[0] && Array.isArray(dPop.timeDefines)) {
        var maxPop = {};
        dPop.timeDefines.forEach(function (t, i) {
          var n = toNumberOrNull(dPop.areas[0].pops && dPop.areas[0].pops[i]);
          if (n === null) return;
          var d = String(t).slice(0, 10);
          if (maxPop[d] === undefined || n > maxPop[d]) maxPop[d] = n;
        });
        Object.keys(maxPop).forEach(function (d) {
          slot(d).pop = maxPop[d];
        });
      }
      var dArea = dTemp && pickArea(dTemp.areas, tempAreaName);
      if (dArea && Array.isArray(dTemp.timeDefines)) {
        dTemp.timeDefines.forEach(function (t, i) {
          var iso = String(t);
          var n = toNumberOrNull(dArea.temps && dArea.temps[i]);
          if (n === null) return;
          var s = slot(iso.slice(0, 10));
          if (iso.indexOf("T00:00") !== -1) s.tmin = n;
          else s.tmax = n;
        });
      }
    }
    return byDate;
  }

  function loadForecast(code) {
    if (!/^\d{6}$/.test(String(code))) return Promise.reject(new Error("bad office code"));
    if (typeof window !== "undefined" && window.__WEATHER_MOCK__ && window.__WEATHER_MOCK__[code]) {
      return Promise.resolve(window.__WEATHER_MOCK__[code]);
    }
    if (typeof fetch !== "function") return Promise.reject(new Error("no fetch"));
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 8000) : null;
    return fetch(JMA_FORECAST_URL + code + ".json", {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) throw new Error("http " + res.status);
        return res.json();
      })
      .catch(function (err) {
        if (timer) clearTimeout(timer);
        throw err;
      });
  }

  // City key (OSAKA / KYOTO) -> forecast-by-date map, filled by the card.
  var weatherByCity = {};

  /**
   * Short text for the day header: "白21° 晚13° 降雨10%". Returns null
   * when the forecast has neither temperature nor rain probability.
   */
  function describeForecast(forecast) {
    if (!forecast) return null;
    var parts = [];
    if (forecast.tmax !== null) parts.push("白" + forecast.tmax + "°");
    if (forecast.tmin !== null) parts.push("晚" + forecast.tmin + "°");
    if (forecast.pop !== null) parts.push("降雨" + forecast.pop + "%");
    if (!parts.length) return null;
    return parts.join(" ");
  }

  /**
   * JMA's weekly forecast covers about 7 days ahead, so a trip day's
   * forecast should appear around 7 days before it. Returns e.g.
   * "預報約10/27起", or null when that date is today or already past.
   */
  function forecastHint(dayISO) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dayISO));
    if (!m) return null;
    var tripDay = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    var available = new Date(tripDay - 7 * 24 * 60 * 60 * 1000);
    var today = /^(\d{4})-(\d{2})-(\d{2})$/.exec(getJapanNow().dateISO);
    if (!today) return null;
    var todayUtc = Date.UTC(Number(today[1]), Number(today[2]) - 1, Number(today[3]));
    if (available.getTime() <= todayUtc) return null;
    return "預報約" + (available.getUTCMonth() + 1) + "/" + available.getUTCDate() + "起";
  }

  /** Fills the weather chip right of each day's date (hidden when no data). */
  function fillDayWeather(data) {
    var cfg = data.weather;
    if (!cfg || !cfg.offices) return;
    data.days.forEach(function (day) {
      var section = document.getElementById(day.id);
      var strip = section && section.querySelector(".day__weather");
      if (!strip) return;
      var office = cfg.offices[day.city];
      var byDate = weatherByCity[day.city];
      var text = office && byDate ? describeForecast(byDate[day.dateISO]) : null;
      var hint = null;
      if (!text && office && byDate) {
        hint = forecastHint(day.dateISO);
      }
      if (!text && hint) {
        // Forecast not published yet: tell when it should appear.
        strip.textContent = hint;
        strip.setAttribute("aria-label", office.label + "天氣預報尚未公布：" + hint);
        strip.hidden = false;
      } else if (text) {
        // "降雨10%" -> "降" is its own span so very narrow phones show "雨10%".
        strip.textContent = "";
        var rainAt = text.indexOf("降雨");
        if (rainAt === -1) {
          strip.textContent = text;
        } else {
          strip.appendChild(document.createTextNode(text.slice(0, rainAt)));
          strip.appendChild(el("span", "day__weather-opt", "降"));
          strip.appendChild(document.createTextNode(text.slice(rainAt + 1)));
        }
        strip.setAttribute("aria-label", office.label + "天氣預報：" + text.replace("白", "白天").replace("晚", "晚上"));
        strip.hidden = false;
      } else {
        strip.hidden = true;
      }
    });
  }

  function renderWeatherCard(data, container) {
    var cfg = data.weather;
    if (!cfg) return;

    var card = el("div", "overview__card overview__card--wide weather-card");
    card.appendChild(el("p", "overview__card-label", "天氣"));
    card.appendChild(el("p", "overview__card-value", "11月上旬一般氣候"));

    var tiles = el("div", "weather-tiles");
    [
      { label: "白天", value: cfg.dayTemp },
      { label: "晚上", value: cfg.nightTemp }
    ].forEach(function (t) {
      if (!t.value) return;
      var tile = el("div", "weather-tile");
      tile.appendChild(el("span", "weather-tile__label", t.label));
      tile.appendChild(el("span", "weather-tile__value", t.value));
      tiles.appendChild(tile);
    });
    if (tiles.childNodes.length) card.appendChild(tiles);
    if (cfg.climate) card.appendChild(el("p", "overview__card-detail", cfg.climate));

    var status = el("p", "weather-card__status", "氣象廳預報：載入中…");
    card.appendChild(status);
    var table = el("div", "weather-table");
    table.hidden = true;
    card.appendChild(table);

    var credit = el("p", "weather-card__credit");
    credit.appendChild(document.createTextNode("白天＝預報最高氣溫、晚上＝預報最低氣溫（多出現在夜間至清晨）。出典：気象庁ホームページ（天氣與降雨機率經整理後顯示）。預報約在出發前7天內才有；"));
    ["OSAKA", "KYOTO"].forEach(function (key, idx) {
      var office = cfg.offices && cfg.offices[key];
      if (!office || !/^\d{6}$/.test(String(office.code))) return;
      if (idx > 0) credit.appendChild(document.createTextNode("、"));
      var link = el("a", "weather-card__link", "氣象廳" + office.label + "預報");
      link.href = JMA_FORECAST_PAGE + office.code;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      credit.appendChild(link);
    });
    card.appendChild(credit);
    container.appendChild(card);

    // One request per office actually needed by the trip days.
    var cityKeys = {};
    data.days.forEach(function (day) {
      if (cfg.offices && cfg.offices[day.city]) cityKeys[day.city] = true;
    });
    var keys = Object.keys(cityKeys);
    var results = {};
    var pending = keys.length;
    if (!pending) {
      status.textContent = "";
      return;
    }

    function finish() {
      Object.keys(results).forEach(function (key) {
        weatherByCity[key] = results[key];
      });
      fillDayWeather(data);
      var rows = 0;
      table.textContent = "";
      data.days.forEach(function (day) {
        var office = cfg.offices[day.city];
        var forecast = office && results[day.city] && results[day.city][day.dateISO];
        if (!forecast || (forecast.code === null && forecast.pop === null && forecast.tmax === null)) return;
        rows += 1;
        var row = el("div", "weather-row");
        var top = el("div", "weather-row__top");
        top.appendChild(el("span", "weather-row__day", day.date + " " + office.label));
        top.appendChild(el("span", "weather-row__sky", forecast.code ? weatherCodeToText(forecast.code) : "—"));
        top.appendChild(el("span", "weather-row__rain", forecast.pop !== null ? "降雨" + forecast.pop + "%" : "降雨—"));
        row.appendChild(top);
        var temps = el("div", "weather-row__temps");
        temps.appendChild(el("span", "weather-row__temp", "白天 " + (forecast.tmax !== null ? forecast.tmax + "°C" : "—")));
        temps.appendChild(el("span", "weather-row__temp", "晚上 " + (forecast.tmin !== null ? forecast.tmin + "°C" : "—")));
        row.appendChild(temps);
        table.appendChild(row);
      });
      if (rows > 0) {
        status.textContent = rows === data.days.length
          ? "氣象廳預報：行程 " + data.days.length + " 天都已公布"
          : "氣象廳預報：行程 " + data.days.length + " 天中已公布 " + rows + " 天，其餘約出發前7天陸續公布";
        table.hidden = false;
      } else {
        status.textContent = "氣象廳預報：行程日期尚未公布（約出發前7天開始），目前以一般氣候為準。";
        table.hidden = true;
      }
    }

    keys.forEach(function (key) {
      var office = cfg.offices[key];
      loadForecast(office.code)
        .then(function (json) {
          results[key] = buildForecastByDate(json, office.tempArea || office.label);
        })
        .catch(function () {
          results[key] = null;
        })
        .then(function () {
          pending -= 1;
          if (pending === 0) finish();
        });
    });
  }

  function renderDayNav(data, travelState) {
    var container = document.getElementById("day-nav-scroll");
    if (!container) return;

    data.days.forEach(function (day) {
      var btn = el("button", "day-nav__item");
      btn.type = "button";
      btn.id = "nav-" + day.id;
      btn.textContent = "DAY " + String(day.day).padStart(2, "0");
      var ariaLabel = "Jump to Day " + day.day + " — " + day.title;
      if (travelState.todayDay && travelState.todayDay.id === day.id) {
        btn.classList.add("is-today");
        ariaLabel += " (Today)";
      }
      btn.setAttribute("aria-label", ariaLabel);
      btn.addEventListener("click", function () {
        var target = document.getElementById(day.id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      container.appendChild(btn);
    });
  }

  function badgeClass(code) {
    return "badge badge--" + code.toLowerCase();
  }

  function renderBadges(codes) {
    var wrap = el("div", "timeline-item__badges");
    (codes || []).forEach(function (code) {
      var label = BADGE_LABELS[code];
      if (!label) return;
      wrap.appendChild(el("span", badgeClass(code), label));
    });
    return wrap;
  }

  /**
   * Renders the optional "MAP" external-search link. Only appears when
   * the item supplies a locationQuery — a plain <a> so it stays
   * semantic and keyboard-accessible with no JS click handler needed.
   * The href is built exclusively by buildMapUrl(); locationQuery is
   * never used as a URL/href itself.
   */
  function renderMapLink(item) {
    var wrap = el("div", "timeline-item__map");
    var link = el("a", "map-link", "MAP");
    link.href = buildMapUrl(item.locationQuery);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "在 Google Maps 開啟" + item.title);
    wrap.appendChild(link);
    return wrap;
  }

  var guideIdCounter = 0;
  var noteImageIdCounter = 0;
  var noteDetailsIdCounter = 0;

  /**
   * Optional text disclosure under a note: { label, text, link? }.
   * link.url may only point at the official Don Quijote coupon pages
   * (https://japanportal.donki-global.com/coupon/…html), so data can
   * never inject an arbitrary external URL. Collapsed by default.
   */
  // Public Instagram reels may be linked (opens in a new tab, never embedded).
  var INSTAGRAM_REEL_PATTERN = /^https:\/\/www\.instagram\.com\/reel\/[A-Za-z0-9_\-]+\/$/;
  // Official ISSEY MIYAKE product pages (no query string).
  var ISSEY_PRODUCT_PATTERN = /^https:\/\/www\.isseymiyake\.com\/products\/[A-Za-z0-9_\-]+$/;
  var COUPON_LINK_PATTERN = /^https:\/\/japanportal\.donki-global\.com\/coupon\/[A-Za-z0-9_\-\.]+\.html$/;

  /** Ordered "步驟 | 做法" table from [{ label, text }]. */
  function renderStepsTable(steps, headers) {
    var table = el("table", "note-steps");
    var head = el("thead");
    var headRow = el("tr");
    var h = (headers && headers.length === 2) ? headers : ["步驟", "做法"];
    headRow.appendChild(el("th", "", h[0]));
    headRow.appendChild(el("th", "", h[1]));
    head.appendChild(headRow);
    table.appendChild(head);
    var tbody = el("tbody");
    steps.forEach(function (step) {
      if (!step || !step.text) return;
      var row = el("tr");
      var labelCell = el("th", "note-steps__label", step.label || "");
      // Optional colour marker: swatch: "#RRGGBB" shows a small dot before the label.
      if (typeof step.swatch === "string" && /^#[0-9A-Fa-f]{6}$/.test(step.swatch)) {
        var dot = el("span", "note-steps__swatch");
        dot.style.backgroundColor = step.swatch;
        labelCell.insertBefore(dot, labelCell.firstChild);
      }
      row.appendChild(labelCell);
      row.appendChild(el("td", "", step.text));
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    return table;
  }

  /** Short bullet list from [string]. */
  function renderTipList(tips) {
    var list = el("ul", "note-tips");
    tips.forEach(function (tip) {
      if (typeof tip === "string" && tip) list.appendChild(el("li", "", tip));
    });
    return list;
  }

  function renderNoteDetails(details) {
    if (!details) return null;
    var hasSteps = !!(details.steps && details.steps.length);
    if (typeof details.text !== "string" && typeof details.intro !== "string" && !hasSteps) return null;
    noteDetailsIdCounter += 1;
    var panelId = "note-details-" + noteDetailsIdCounter;

    var wrap = el("div", "timeline-item__note-image");
    wrap.appendChild(renderGuideButton(panelId, details.label || "詳細"));

    var panel = el("div", "guide-panel note-details-panel");
    panel.id = panelId;
    panel.hidden = true;
    // Optional structure: intro (one line), steps [{ label, text }] shown as an
    // ordered table, tips [string] as a short list; text stays as plain fallback.
    if (typeof details.intro === "string") {
      panel.appendChild(el("p", "guide-panel__value", details.intro));
    }
    if (hasSteps) panel.appendChild(renderStepsTable(details.steps));
    if (details.tips && details.tips.length) panel.appendChild(renderTipList(details.tips));
    if (typeof details.text === "string") {
      panel.appendChild(el("p", "guide-panel__value", details.text));
    }

    if (details.link && typeof details.link.url === "string" &&
        (COUPON_LINK_PATTERN.test(details.link.url) || INSTAGRAM_REEL_PATTERN.test(details.link.url))) {
      var link = el("a", "map-link note-details-panel__link", details.link.label || "開啟官方頁面");
      link.href = details.link.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      panel.appendChild(link);
    }
    wrap.appendChild(panel);
    return wrap;
  }

  /**
   * Optional image attached to a note ({ src, alt, label }), shown in
   * the same collapsed-by-default disclosure pattern as the guide.
   * src must be a project-relative path under images/ (never a URL).
   */
  function renderNoteImage(image) {
    if (!image || typeof image.src !== "string") return null;
    if (!/^images\/[A-Za-z0-9_\-\/.]+$/.test(image.src) || image.src.indexOf("..") !== -1) return null;

    noteImageIdCounter += 1;
    var panelId = "note-image-" + noteImageIdCounter;

    var wrap = el("div", "timeline-item__note-image");
    wrap.appendChild(renderGuideButton(panelId, image.label || "圖片"));

    var panel = el("div", "note-image-panel");
    panel.id = panelId;
    panel.hidden = true;

    var link = el("a", "note-image-panel__link");
    link.href = image.src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "開啟原圖：" + (image.alt || ""));

    var img = document.createElement("img");
    img.className = "note-image-panel__img";
    img.src = image.src;
    img.alt = image.alt || "";
    img.loading = "lazy";
    // Start fetching as soon as the user opens the panel, instead of
    // waiting on the browser's lazy-load heuristics.
    wrap.querySelector(".guide-toggle").addEventListener("click", function () {
      img.loading = "eager";
    });
    link.appendChild(img);
    panel.appendChild(link);
    wrap.appendChild(panel);
    return wrap;
  }

  /**
   * Renders one guide field as label + plain-text value. Semi-dynamic
   * fields (budget, limited-stock info) carry a companion *VerifiedAt
   * key and always render a low-weight "reference only" note next to
   * the value — never presented as live data.
   */
  function renderGuideField(field, guide) {
    var value = guide[field.key];
    if (!value) return null;

    var wrap = el("div", "guide-panel__field");
    wrap.appendChild(el("p", "guide-panel__label", field.label));
    wrap.appendChild(el("p", "guide-panel__value", value));

    if (field.verifiedAtKey && guide[field.verifiedAtKey]) {
      wrap.appendChild(
        el(
          "p",
          "guide-panel__verified",
          "查證於 " + guide[field.verifiedAtKey] + "．僅供參考，非即時資訊"
        )
      );
    }

    return wrap;
  }

  /**
   * Example photo for a guide's photoTips: { src, alt, caption, author,
   * sourceUrl, licenseName, licenseUrl }. src must be a project-relative
   * path under images/ and the credit links may only point at
   * Wikimedia Commons or Creative Commons, so data can never inject an
   * arbitrary URL. The credit line is always shown with the photo.
   */
  var PHOTO_SRC_PATTERN = /^images\/[A-Za-z0-9_\-\/.]+$/;
  var PHOTO_LINK_PATTERN = /^https:\/\/(commons\.wikimedia\.org|creativecommons\.org)\//;

  function renderPhotoExample(photo) {
    if (!photo || typeof photo.src !== "string") return null;
    if (!PHOTO_SRC_PATTERN.test(photo.src) || photo.src.indexOf("..") !== -1) return null;

    var figure = el("figure", "guide-photo");

    var link = el("a", "guide-photo__link");
    link.href = photo.src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "開啟範例照片原圖：" + (photo.alt || ""));

    var img = document.createElement("img");
    img.className = "guide-photo__img";
    img.src = photo.src;
    img.alt = photo.alt || "";
    img.loading = "lazy";
    link.appendChild(img);
    figure.appendChild(link);

    var caption = el("figcaption", "guide-photo__caption");
    caption.appendChild(document.createTextNode("範例照片：" + (photo.caption || "") + "（攝影：" + (photo.author || "") + "，"));
    if (photo.sourceUrl && PHOTO_LINK_PATTERN.test(photo.sourceUrl)) {
      var source = el("a", "guide-photo__credit", "Wikimedia Commons");
      source.href = photo.sourceUrl;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      caption.appendChild(source);
      caption.appendChild(document.createTextNode("，"));
    }
    if (photo.licenseName) {
      if (photo.licenseUrl && PHOTO_LINK_PATTERN.test(photo.licenseUrl)) {
        var license = el("a", "guide-photo__credit", photo.licenseName);
        license.href = photo.licenseUrl;
        license.target = "_blank";
        license.rel = "noopener noreferrer";
        caption.appendChild(license);
      } else {
        caption.appendChild(document.createTextNode(photo.licenseName));
      }
      caption.appendChild(document.createTextNode("，"));
    }
    caption.appendChild(document.createTextNode("已縮小）"));
    figure.appendChild(caption);

    return figure;
  }

  var stopIdCounter = 0;

  /**
   * One shop inside a multi-shop guide: a collapsed-by-default card.
   * The header shows the shop name and a one-line brief; the toggle
   * button opens the details, and the MAP link (built through
   * buildMapUrl() like every other external link) stays visible. The
   * brief is data (stop.brief) — never derived from URLs or HTML.
   */
  function renderGuideStop(stop) {
    stopIdCounter += 1;
    var bodyId = "guide-stop-" + stopIdCounter;

    var card = el("div", "guide-stop");
    var head = el("div", "guide-stop__head");

    var toggle = el("button", "guide-stop__toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", bodyId);
    toggle.appendChild(el("span", "guide-stop__name", stop.name || ""));
    if (stop.brief) {
      toggle.appendChild(el("span", "guide-stop__brief", stop.brief));
    }
    head.appendChild(toggle);

    if (stop.locationQuery) {
      var link = el("a", "map-link", "MAP");
      link.href = buildMapUrl(stop.locationQuery);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", "在 Google Maps 開啟" + (stop.name || stop.locationQuery));
      head.appendChild(link);
    }
    card.appendChild(head);

    var body = el("div", "guide-stop__body");
    body.id = bodyId;
    body.hidden = true;
    var stopImage = renderGuideImage(stop.image);
    if (stopImage) body.appendChild(stopImage);
    STOP_FIELD_CONFIG.forEach(function (field) {
      var fieldEl = renderGuideField(field, stop);
      if (fieldEl) body.appendChild(fieldEl);
    });
    // Optional per-shop sections (e.g. Japanese menu and ordering phrases).
    (stop.sections || []).forEach(function (section) {
      if (sectionHasContent(section)) body.appendChild(renderSectionBlock(section));
    });
    card.appendChild(body);

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      body.hidden = isOpen;
    });

    return card;
  }

  /** "Expand all / collapse all" for a guide with several shop cards. */
  function renderStopsToggleAll(panel) {
    var btn = el("button", "guide-stops__toggle-all", "全部展開");
    btn.type = "button";
    btn.addEventListener("click", function () {
      var expand = btn.textContent === "全部展開";
      var toggles = panel.querySelectorAll(".guide-stop__toggle");
      for (var i = 0; i < toggles.length; i++) {
        toggles[i].setAttribute("aria-expanded", String(expand));
        var body = document.getElementById(toggles[i].getAttribute("aria-controls"));
        if (body) body.hidden = !expand;
      }
      btn.textContent = expand ? "全部收合" : "全部展開";
    });
    return btn;
  }

  /**
   * Optional project-local image inside a guide (src must be under
   * images/, never a URL). Tap opens the original in a new tab.
   */
  function renderGuideImage(image) {
    if (!image || typeof image.src !== "string") return null;
    if (!/^images\/[A-Za-z0-9_\-\/.]+$/.test(image.src) || image.src.indexOf("..") !== -1) return null;
    var link = el("a", "guide-panel__image-link");
    link.href = image.src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "開啟原圖：" + (image.alt || ""));
    var img = document.createElement("img");
    img.className = "guide-panel__img";
    img.src = image.src;
    img.alt = image.alt || "";
    img.loading = "lazy";
    link.appendChild(img);
    return link;
  }

  /** One labelled guide section: text, steps table, tip list, image. */
  function renderSectionBlock(section) {
    var wrap = el("div", "guide-panel__field");
    wrap.appendChild(el("p", "guide-panel__label", section.label || ""));
    if (section.text) wrap.appendChild(el("p", "guide-panel__value", section.text));
    if (section.steps && section.steps.length) wrap.appendChild(renderStepsTable(section.steps, section.stepsHeaders));
    if (section.tips && section.tips.length) wrap.appendChild(renderTipList(section.tips));
    var imageEl = renderGuideImage(section.image);
    if (imageEl) wrap.appendChild(imageEl);
    if (section.link && typeof section.link.url === "string" && ISSEY_PRODUCT_PATTERN.test(section.link.url)) {
      var linkEl = el("a", "map-link note-details-panel__link official-link", (section.link.label || "開啟官方頁面") + " ↗");
      linkEl.href = section.link.url;
      linkEl.target = "_blank";
      linkEl.rel = "noopener noreferrer";
      wrap.appendChild(linkEl);
    }
    return wrap;
  }

  function sectionHasContent(section) {
    return !!(section && (section.text || section.link || (section.steps && section.steps.length) || (section.tips && section.tips.length)));
  }

  function renderGuidePanel(item, panelId) {
    var panel = el("div", "guide-panel");
    panel.id = panelId;
    panel.hidden = true;

    var guideSections = item.guide.sections || [];
    var placedSections = [];
    var renderSection = renderSectionBlock;
    var hasSectionContent = sectionHasContent;

    // Optional collapsible groups of sections: groups: [{ title, brief, after?,
    // sections: [{ label, text|steps|tips }] }]. Collapsed by default; a group
    // with after: "<field key>" is shown right below that field, others at the end.
    var placedGroups = [];
    function buildGroupCard(group) {
      stopIdCounter += 1;
      var bodyId = "guide-group-" + stopIdCounter;
      var card = el("div", "guide-stop");
      var head = el("div", "guide-stop__head");
      var toggle = el("button", "guide-stop__toggle");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", group.open ? "true" : "false");
      toggle.setAttribute("aria-controls", bodyId);
      toggle.appendChild(el("span", "guide-stop__name", group.title || ""));
      if (group.brief) toggle.appendChild(el("span", "guide-stop__brief", group.brief));
      head.appendChild(toggle);
      card.appendChild(head);
      var body = el("div", "guide-stop__body");
      body.id = bodyId;
      body.hidden = !group.open;
      group.sections.forEach(function (section) {
        if (hasSectionContent(section)) body.appendChild(renderSection(section));
      });
      card.appendChild(body);
      toggle.addEventListener("click", function () {
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        body.hidden = isOpen;
      });
      return card;
    }
    function validGroup(group) {
      return !!(group && group.sections && group.sections.length);
    }

    // Sections with top: true are shown first, before the type's own fields.
    guideSections.forEach(function (section) {
      if (hasSectionContent(section) && section.top) {
        panel.appendChild(renderSection(section));
        placedSections.push(section);
      }
    });

    // Groups with top: true are shown first (open: true starts them expanded).
    (item.guide.groups || []).forEach(function (group) {
      if (validGroup(group) && group.top) {
        panel.appendChild(buildGroupCard(group));
        placedGroups.push(group);
      }
    });

    var fields = GUIDE_FIELD_CONFIG[item.guide.type] || [];
    fields.forEach(function (field) {
      var fieldEl = renderGuideField(field, item.guide);
      if (fieldEl) panel.appendChild(fieldEl);
      if (field.key === "photoTips" && item.guide.photoExample) {
        var photoEl = renderPhotoExample(item.guide.photoExample);
        if (photoEl) panel.appendChild(photoEl);
      }
      // A section with after: "<field key>" is shown right below that field.
      guideSections.forEach(function (section) {
        if (hasSectionContent(section) && section.after === field.key) {
          panel.appendChild(renderSection(section));
          placedSections.push(section);
        }
      });
      (item.guide.groups || []).forEach(function (group) {
        if (validGroup(group) && group.after === field.key) {
          panel.appendChild(buildGroupCard(group));
          placedGroups.push(group);
        }
      });
    });

    // Optional extra labelled paragraphs: sections: [{ label, text }].
    guideSections.forEach(function (section) {
      if (!hasSectionContent(section) || placedSections.indexOf(section) !== -1) return;
      panel.appendChild(renderSection(section));
    });

    (item.guide.groups || []).forEach(function (group) {
      if (!validGroup(group) || placedGroups.indexOf(group) !== -1) return;
      panel.appendChild(buildGroupCard(group));
    });

    // Optional shops list for any guide type (each with its own MAP).
    if (item.guide.stops && item.guide.stops.length) {
      if (item.guide.stops.length >= 3) {
        panel.appendChild(renderStopsToggleAll(panel));
      }
      item.guide.stops.forEach(function (stop) {
        panel.appendChild(renderGuideStop(stop));
      });
    }

    return panel;
  }

  /**
   * Renders the "攻略" disclosure toggle. Pure DOM state (aria-expanded
   * + the panel's hidden attribute) — no global registry of open
   * panels, so any number of guides can be open at once and each is
   * fully independent of every other item's state.
   */
  function renderGuideButton(panelId, label) {
    var btn = el("button", "guide-toggle", label || "攻略");
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", panelId);

    btn.addEventListener("click", function () {
      var panel = document.getElementById(panelId);
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      if (panel) {
        panel.hidden = isOpen;
      }
    });

    return btn;
  }

  function renderGuide(item, openByDefault) {
    guideIdCounter += 1;
    var panelId = "guide-panel-" + guideIdCounter;

    var wrap = el("div", "timeline-item__guide");
    var button = renderGuideButton(panelId);
    var panel = renderGuidePanel(item, panelId);
    // Fetch example photos as soon as the panel is opened, instead of
    // waiting on the browser's lazy-load heuristics.
    button.addEventListener("click", function () {
      var photos = panel.querySelectorAll("img[loading=lazy]");
      for (var i = 0; i < photos.length; i++) photos[i].loading = "eager";
    });
    wrap.appendChild(button);
    wrap.appendChild(panel);

    // Travel Mode: the guide of the item happening right now starts
    // open, so the ordering tips are already there when you walk in.
    if (openByDefault) {
      button.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      var openPhotos = panel.querySelectorAll("img[loading=lazy]");
      for (var j = 0; j < openPhotos.length; j++) openPhotos[j].loading = "eager";
    }
    return wrap;
  }

  /**
   * Quick-filter categories for an item: food (FOOD badge), shopping
   * (SHOPPING badge), reservation (RESERVATION badge or a confirmed
   * booking status).
   */
  function itemCategories(item) {
    var cats = [];
    var badges = item.badges || [];
    if (badges.indexOf("FOOD") !== -1) cats.push("food");
    if (badges.indexOf("SHOPPING") !== -1) cats.push("shopping");
    if (badges.indexOf("RESERVATION") !== -1 || item.status) cats.push("reservation");
    if (badges.indexOf("SHOOT") !== -1) cats.push("shoot");
    return cats;
  }

  /**
   * Renders a list of notes. A note is a plain string, or an object
   * { text, locationQuery, image, details }.
   */
  function renderNotes(notes) {
    var notesWrap = el("div", "timeline-item__notes");
    notes.forEach(function (note) {
      var isObject = !!(note && typeof note === "object");
      var hasMap = isObject && !!note.locationQuery;
      var noteEl = el("p", "timeline-item__note", isObject ? note.text : note);
      // kind: "shoot" turns the note (and its button) into a highlighted card.
      var target = notesWrap;
      if (isObject && note.kind === "shoot") {
        target = el("div", "shoot-callout");
        notesWrap.appendChild(target);
        noteEl.className = "shoot-callout__text";
      }
      if (hasMap) {
        var mapLink = el("a", "map-link timeline-item__note-map", "MAP");
        mapLink.href = buildMapUrl(note.locationQuery);
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
        mapLink.setAttribute("aria-label", "在 Google Maps 開啟" + note.locationQuery);
        noteEl.appendChild(mapLink);
      }
      target.appendChild(noteEl);

      if (isObject && note.image) {
        var imageEl = renderNoteImage(note.image);
        if (imageEl) target.appendChild(imageEl);
      }

      if (isObject && note.details) {
        var detailsEl = renderNoteDetails(note.details);
        if (detailsEl) target.appendChild(detailsEl);
      }
    });
    return notesWrap;
  }

  function renderTimelineItem(item, travelState, itemKey) {
    var li = el("li", "timeline-item");
    li.setAttribute("data-item-key", itemKey);
    li.setAttribute("data-cats", itemCategories(item).join(" "));

    var isNow = !!(travelState && travelState.nowItem === item);
    var isNext = !!(travelState && !isNow && travelState.nextItem === item);

    if (isNow) {
      li.classList.add("is-now");
      li.id = "travel-now";
    } else if (isNext) {
      li.classList.add("is-next");
      li.id = "travel-next";
    }

    var timeEl = el("p", "timeline-item__time", item.time);
    if (isNow) {
      timeEl.appendChild(el("span", "travel-tag travel-tag--now", "Now"));
    } else if (isNext) {
      timeEl.appendChild(el("span", "travel-tag travel-tag--next", "Next"));
    }
    // Optional confirmed-booking label, e.g. status: "已訂位 11:30".
    if (typeof item.status === "string" && item.status) {
      timeEl.appendChild(el("span", "status-chip", item.status));
    }
    li.appendChild(timeEl);
    li.appendChild(el("p", "timeline-item__title", item.title));

    if (item.description) {
      li.appendChild(el("p", "timeline-item__description", item.description));
    }

    if (item.notes && item.notes.length) {
      li.appendChild(renderNotes(item.notes));
    }

    if (item.badges && item.badges.length) {
      li.appendChild(renderBadges(item.badges));
    }

    if (item.locationQuery) {
      li.appendChild(renderMapLink(item));
    }

    if (item.guide) {
      li.appendChild(renderGuide(item, isNow));
    }

    // Notes shown below the MAP / guide row (e.g. shopping side-stops
    // that should not push the main guide buttons down).
    if (item.notesAfter && item.notesAfter.length) {
      li.appendChild(renderNotes(item.notesAfter));
    }

    return li;
  }

  function renderWarningCallout(warning) {
    var wrap = el("div", "warning-callout");
    wrap.setAttribute("role", "note");
    var icon = el("span", "warning-callout__icon", "⚠");
    icon.setAttribute("aria-hidden", "true");
    wrap.appendChild(icon);

    var body = el("div");
    body.appendChild(el("span", "warning-callout__label", warning.label));
    body.appendChild(el("p", "warning-callout__title", warning.title));
    body.appendChild(el("p", "warning-callout__body", warning.body));
    wrap.appendChild(body);

    return wrap;
  }

  var overviewIdCounter = 0;

  /**
   * "今日一覽": a collapsed list of time + title for the day. Each row
   * scrolls to its timeline item (found through data-item-key, never an
   * id taken from data). Open by default only on the actual trip day.
   */
  function renderDayOverview(day, travelState, openByDefault) {
    overviewIdCounter += 1;
    var listId = "day-overview-" + overviewIdCounter;

    var wrap = el("div", "day-overview");
    var btn = el("button", "day-overview__toggle", "今日一覽（" + day.items.length + " 項）");
    btn.type = "button";
    btn.setAttribute("aria-expanded", String(!!openByDefault));
    btn.setAttribute("aria-controls", listId);
    wrap.appendChild(btn);

    var list = el("ol", "day-overview__list");
    list.id = listId;
    list.hidden = !openByDefault;

    day.items.forEach(function (item, index) {
      var key = day.id + "-" + index;
      var row = el("li", "day-overview__item");
      row.setAttribute("data-cats", itemCategories(item).join(" "));

      var go = el("button", "day-overview__row");
      go.type = "button";
      go.appendChild(el("span", "day-overview__time", item.time));
      go.appendChild(el("span", "day-overview__title", item.title));
      if ((item.badges || []).indexOf("SHOOT") !== -1) {
        go.appendChild(el("span", "day-overview__shoot", "🎬 分鏡"));
      }
      if (typeof item.status === "string" && item.status) {
        go.appendChild(el("span", "status-chip", item.status));
      }
      go.addEventListener("click", function () {
        var target = document.querySelector('[data-item-key="' + key + '"]');
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      row.appendChild(go);
      list.appendChild(row);
    });
    wrap.appendChild(list);

    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      list.hidden = isOpen;
    });

    return wrap;
  }

  function renderDay(day, travelState) {
    var section = el("section", "day");
    section.id = day.id;
    section.setAttribute("aria-labelledby", day.id + "-heading");
    if (day.highActivity) {
      section.classList.add("day--high-activity");
    }

    var header = el("div", "day__header");
    var eyebrow = el("p", "day__eyebrow");

    var dayLabel = el("span", "day__number", "DAY " + String(day.day).padStart(2, "0"));
    eyebrow.appendChild(dayLabel);
    eyebrow.appendChild(el("span", "day__city", day.city));
    // The English weekday is its own span so narrow phones can hide it
    // and keep the weather chip on the same line.
    var dateEl = el("span", "day__date", day.date);
    dateEl.appendChild(el("span", "day__date-en", " " + day.weekday));
    dateEl.appendChild(document.createTextNode("（" + day.weekdayLocal + "）"));
    eyebrow.appendChild(dateEl);
    var weatherChip = el("span", "day__weather");
    weatherChip.hidden = true;
    eyebrow.appendChild(weatherChip);
    header.appendChild(eyebrow);

    var h2 = el("h2", "day__title", day.title);
    h2.id = day.id + "-heading";
    header.appendChild(h2);

    if (day.subtitle) {
      header.appendChild(el("p", "day__subtitle", day.subtitle));
    }

    section.appendChild(header);

    if (day.highActivity && day.warning) {
      section.appendChild(renderWarningCallout(day.warning));
    }

    var openOverview = !!(travelState && travelState.todayDay && travelState.todayDay.id === day.id);
    section.appendChild(renderDayOverview(day, travelState, openOverview));

    var timeline = el("ul", "timeline");
    day.items.forEach(function (item, index) {
      if (item.group) {
        timeline.appendChild(el("li", "timeline-group", item.group));
      }
      timeline.appendChild(renderTimelineItem(item, travelState, day.id + "-" + index));
    });
    section.appendChild(timeline);

    var empty = el("p", "timeline-empty", "這一天沒有符合篩選的項目");
    empty.hidden = true;
    section.appendChild(empty);

    return section;
  }

  function renderDays(data, travelState) {
    var container = document.getElementById("days");
    if (!container) return;
    data.days.forEach(function (day) {
      container.appendChild(renderDay(day, travelState));
    });
  }

  /**
   * Quick filter: 全部 / 餐廳 / 購物 / 預約. Pure show/hide of already
   * rendered items (data-cats), no state saved anywhere.
   */
  var FILTERS = [
    { id: "all", label: "全部" },
    { id: "food", label: "餐廳" },
    { id: "shopping", label: "購物" },
    { id: "reservation", label: "預約" },
    { id: "shoot", label: "🎬 分鏡" }
  ];
  var currentFilter = "all";

  function applyFilter(filterId, data) {
    currentFilter = filterId;
    var filtering = filterId !== "all";

    var tagged = document.querySelectorAll("[data-cats]");
    for (var i = 0; i < tagged.length; i++) {
      var cats = (tagged[i].getAttribute("data-cats") || "").split(" ");
      tagged[i].hidden = filtering && cats.indexOf(filterId) === -1;
    }

    var groups = document.querySelectorAll(".timeline-group");
    for (var g = 0; g < groups.length; g++) {
      groups[g].hidden = filtering;
    }

    data.days.forEach(function (day) {
      var section = document.getElementById(day.id);
      if (!section) return;
      var visible = section.querySelectorAll(".timeline-item:not([hidden])").length;
      var empty = section.querySelector(".timeline-empty");
      if (empty) empty.hidden = !(filtering && visible === 0);
    });

    var chips = document.querySelectorAll(".filter-chip");
    for (var c = 0; c < chips.length; c++) {
      chips[c].setAttribute("aria-pressed", String(chips[c].getAttribute("data-filter") === filterId));
    }

    var pill = document.getElementById("filter-pill");
    if (pill) {
      pill.hidden = !filtering;
      var label = "";
      FILTERS.forEach(function (f) {
        if (f.id === filterId) label = f.label;
      });
      var text = pill.querySelector(".filter-pill__text");
      if (text) text.textContent = "篩選：" + label;
    }
  }

  function renderFilterBar(data) {
    var days = document.getElementById("days");
    if (!days || !days.parentNode) return;

    var counts = { all: 0, food: 0, shopping: 0, reservation: 0, shoot: 0 };
    data.days.forEach(function (day) {
      day.items.forEach(function (item) {
        counts.all += 1;
        itemCategories(item).forEach(function (cat) {
          counts[cat] += 1;
        });
      });
    });

    var bar = el("div", "filter-bar");
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "行程篩選");
    bar.appendChild(el("span", "filter-bar__label", "快速篩選"));
    var chipRow = el("div", "filter-bar__chips");
    bar.appendChild(chipRow);
    FILTERS.forEach(function (f) {
      var chip = el("button", "filter-chip", f.label + "（" + counts[f.id] + "）");
      chip.type = "button";
      chip.setAttribute("data-filter", f.id);
      chip.setAttribute("aria-pressed", String(f.id === "all"));
      chip.addEventListener("click", function () {
        applyFilter(f.id, data);
      });
      chipRow.appendChild(chip);
    });
    days.parentNode.insertBefore(bar, days);

    // Floating reminder while a filter is on, so it can be cleared from
    // anywhere on the page.
    var pill = el("div", "filter-pill");
    pill.id = "filter-pill";
    pill.hidden = true;
    pill.appendChild(el("span", "filter-pill__text", ""));
    var clear = el("button", "filter-pill__clear", "清除");
    clear.type = "button";
    clear.addEventListener("click", function () {
      applyFilter("all", data);
    });
    pill.appendChild(clear);
    document.body.appendChild(pill);
  }


  var CHECKLIST_STORAGE_KEY = "osaka-kyoto-trip:checklist";

  // Check state lives only in this browser's localStorage (never sent
  // anywhere). Every access is guarded: storage can be blocked or empty.
  function loadChecklistState() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(CHECKLIST_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveChecklistState(ids) {
    try {
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      /* storage unavailable: checklist still works for this visit */
    }
  }

  var REFUND_STORAGE_KEY = "osaka-kyoto-trip:refund-checks";
  var REFUND_LINK_HOSTS = ["www.japan.travel", "www.customs.go.jp", "www.mlit.go.jp", "www.threads.com"];

  function loadRefundChecks() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(REFUND_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveRefundChecks(ids) {
    try {
      window.localStorage.setItem(REFUND_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      /* storage unavailable: checks still work for this visit */
    }
  }

  function isAllowedRefundLink(url) {
    try {
      var u = new URL(url);
      return u.protocol === "https:" && REFUND_LINK_HOSTS.indexOf(u.hostname) !== -1;
    } catch (e) {
      return false;
    }
  }

  var REFUND_TAB_KEY = "osaka-kyoto-trip:refund-tab";

  function chip(kind) {
    return kind === "official"
      ? el("span", "refund__chip refund__chip--official", "官方")
      : el("span", "refund__chip refund__chip--community", "網友整理・未經官方確認");
  }

  /**
   * Tax Refund Center: 30-second summary card, then five tabs
   * (流程 / 規則 / 關西機場 / 日文 / 核對) so only one short panel is
   * visible at a time. Source chips mark official vs community info.
   */
  function renderTaxRefund(data) {
    var t = data.taxRefund;
    var body = document.getElementById("refund-body");
    var progress = document.getElementById("refund-progress");
    if (!t || !body) return;

    function rowsToSteps(rows) {
      return rows.map(function (r) { return { label: r[0], text: r[1] }; });
    }
    function section(parent, title, kind) {
      var wrap = el("div", "refund__block");
      var head = el("div", "refund__block-head");
      head.appendChild(el("h3", "checklist__group-title", title));
      if (kind) head.appendChild(chip(kind));
      wrap.appendChild(head);
      parent.appendChild(wrap);
      return wrap;
    }
    function fold(parent, title, kind, openByDefault) {
      var d = document.createElement("details");
      d.className = "refund__fold";
      if (openByDefault) d.open = true;
      var sm = el("summary", "refund__fold-summary");
      sm.appendChild(el("span", "refund__fold-title", title));
      if (kind) sm.appendChild(chip(kind));
      d.appendChild(sm);
      var inner = el("div", "refund__fold-body");
      d.appendChild(inner);
      parent.appendChild(d);
      return inner;
    }

    // ---- 30-second summary ----
    var sum = el("div", "refund__summary");
    sum.appendChild(el("p", "refund__headline", t.headline));
    var stepsRow = el("div", "refund__flow");
    t.summary.steps.forEach(function (st, i) {
      var card = el("div", "refund__step");
      card.appendChild(el("span", "refund__step-icon", st[0]));
      var txt = el("div", "refund__step-main");
      txt.appendChild(el("p", "refund__step-title", (i + 1) + ". " + st[1]));
      txt.appendChild(el("p", "refund__step-text", st[2]));
      card.appendChild(txt);
      stepsRow.appendChild(card);
    });
    sum.appendChild(stepsRow);
    sum.appendChild(el("p", "refund__alert-title", "⚠ 這些情況會拿不到退款"));
    var alerts = el("ul", "refund__alerts");
    t.summary.alerts.forEach(function (a) { alerts.appendChild(el("li", "", a)); });
    sum.appendChild(alerts);
    body.appendChild(sum);

    // ---- Tabs ----
    var tabDefs = [
      { id: "flow", label: "流程" },
      { id: "rules", label: "規則" },
      { id: "kix", label: "關西機場" },
      { id: "jp", label: "日文" },
      { id: "check", label: "核對" }
    ];
    var tabBar = el("div", "refund__tabs");
    tabBar.setAttribute("role", "tablist");
    body.appendChild(tabBar);
    var panels = {};
    var buttons = {};

    function selectTab(id, focus) {
      tabDefs.forEach(function (d) {
        var on = d.id === id;
        buttons[d.id].setAttribute("aria-selected", String(on));
        buttons[d.id].tabIndex = on ? 0 : -1;
        panels[d.id].hidden = !on;
        if (on && focus) buttons[d.id].focus();
      });
      try { window.localStorage.setItem(REFUND_TAB_KEY, id); } catch (e) { /* ignore */ }
    }
    tabDefs.forEach(function (d, i) {
      var btn = el("button", "refund__tab", d.label);
      btn.type = "button";
      btn.id = "refund-tab-" + d.id;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-controls", "refund-panel-" + d.id);
      btn.addEventListener("click", function () { selectTab(d.id, false); });
      btn.addEventListener("keydown", function (ev) {
        var step = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        ev.preventDefault();
        selectTab(tabDefs[(i + step + tabDefs.length) % tabDefs.length].id, true);
      });
      tabBar.appendChild(btn);
      buttons[d.id] = btn;
      var panel = el("div", "refund__panel");
      panel.id = "refund-panel-" + d.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", btn.id);
      body.appendChild(panel);
      panels[d.id] = panel;
    });

    // ---- Panel: 流程 ----
    var pf = panels.flow;
    var s1 = section(pf, "舊制 → 新制，差在哪", "official");
    var cmp = el("div", "refund__cmp");
    t.compare.rows.forEach(function (r) {
      var card = el("div", "refund__cmp-card");
      card.appendChild(el("p", "refund__cmp-title", r[0]));
      var oldLine = el("p", "refund__cmp-old");
      oldLine.appendChild(el("span", "refund__tag", "舊"));
      oldLine.appendChild(document.createTextNode(r[1]));
      var newLine = el("p", "refund__cmp-new");
      newLine.appendChild(el("span", "refund__tag refund__tag--new", "新"));
      newLine.appendChild(document.createTextNode(r[2]));
      card.appendChild(oldLine);
      card.appendChild(newLine);
      cmp.appendChild(card);
    });
    s1.appendChild(cmp);

    var s2 = section(pf, "你這趟的時間軸", null);
    var tl = el("ol", "refund__timeline");
    t.mine.forEach(function (r) {
      var li = el("li", "refund__tl-item");
      li.appendChild(el("p", "refund__tl-when", r[0]));
      li.appendChild(el("p", "refund__tl-what", r[1]));
      var key = r[2] ? findItemKey(data, r[2]) : null;
      if (key) {
        var jump = el("a", "checklist__jump", "前往行程 ›");
        jump.href = "#" + key;
        jump.addEventListener("click", function (ev) {
          ev.preventDefault();
          var target = document.querySelector('[data-item-key="' + key + '"]');
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        li.appendChild(jump);
      }
      tl.appendChild(li);
    });
    s2.appendChild(tl);

    // ---- Panel: 規則 ----
    var pr = panels.rules;
    var r1 = section(pr, "規則速查", "official");
    r1.appendChild(renderStepsTable(rowsToSteps(t.rules), t.rulesHeaders));
    var r2 = section(pr, "最常見的錯誤", null);
    r2.appendChild(renderTipList(t.mistakes));
    var r3 = fold(pr, t.community.title.replace(/^⑨ /, ""), "community", false);
    r3.appendChild(renderStepsTable(rowsToSteps(t.community.rows), t.community.headers));
    if (t.community.tips) r3.appendChild(renderTipList(t.community.tips));

    // ---- Panel: 關西機場 ----
    var pk = panels.kix;
    var k1 = section(pk, t.vjw.title.replace(/^④ /, ""), "community");
    k1.appendChild(renderStepsTable(rowsToSteps(t.vjw.rows), t.vjw.headers));
    if (t.vjw.tips) k1.appendChild(renderTipList(t.vjw.tips));

    // ---- Panel: 日文 ----
    var pj = panels.jp;
    var j1 = section(pj, "購物時對店員說（日文）", null);
    j1.appendChild(renderStepsTable(rowsToSteps(t.phrases), t.phrasesHeaders));

    // ---- Panel: 核對（airport mode） ----
    var pc = panels.check;
    var c1 = section(pc, "出境前核對（會記在你的瀏覽器）", null);
    var bar = el("div", "refund__bar");
    var barFill = el("div", "refund__bar-fill");
    bar.appendChild(barFill);
    c1.appendChild(bar);
    var saved = loadRefundChecks();
    var list = el("ul", "checklist__list refund__checks");
    function sync() {
      var ids = [];
      list.querySelectorAll("input[type=checkbox]:checked").forEach(function (box) {
        ids.push(box.getAttribute("data-id"));
      });
      if (progress) progress.textContent = ids.length + " / " + t.checks.length;
      barFill.style.width = Math.round(ids.length / t.checks.length * 100) + "%";
      bar.setAttribute("aria-label", "已完成 " + ids.length + " / " + t.checks.length);
      return ids;
    }
    t.checks.forEach(function (c) {
      var li = el("li", "checklist__li");
      var label = el("label", "checklist__item refund__check");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.className = "checklist__box";
      box.setAttribute("data-id", c[0]);
      box.checked = saved.indexOf(c[0]) !== -1;
      box.addEventListener("change", function () { saveRefundChecks(sync()); });
      label.appendChild(box);
      var text = el("span", "checklist__text");
      text.appendChild(el("span", "checklist__label", c[1]));
      label.appendChild(text);
      li.appendChild(label);
      list.appendChild(li);
    });
    c1.appendChild(list);
    var reset = el("button", "refund__reset", "全部取消勾選");
    reset.type = "button";
    reset.addEventListener("click", function () {
      list.querySelectorAll("input[type=checkbox]").forEach(function (box) { box.checked = false; });
      saveRefundChecks(sync());
    });
    c1.appendChild(reset);
    sync();

    var c2 = fold(pc, "官方說明與提醒", "official", false);
    var links = el("ul", "refund__links");
    t.links.forEach(function (l) {
      if (!isAllowedRefundLink(l[1])) return;
      var li = el("li");
      var a = el("a", "map-link", l[0] + " ↗");
      a.href = l[1];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      links.appendChild(li);
    });
    c2.appendChild(links);
    c2.appendChild(renderTipList(t.notes));
    c2.appendChild(el("p", "refund__updated", "查證日：" + t.updated));

    // Summary shortcut + restore last tab
    var jumpBtn = el("button", "refund__jump", "到機場前，直接看核對清單 ›");
    jumpBtn.type = "button";
    jumpBtn.addEventListener("click", function () {
      selectTab("check", false);
      tabBar.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    sum.appendChild(jumpBtn);

    var initial = "flow";
    try {
      var savedTab = window.localStorage.getItem(REFUND_TAB_KEY);
      if (savedTab && panels[savedTab]) initial = savedTab;
    } catch (e) { /* ignore */ }
    selectTab(initial, false);
  }

  /** data-item-key ("<dayId>-<index>") for { day, time }, or null. */
  function findItemKey(data, ref) {
    if (!ref || typeof ref.day !== "string" || typeof ref.time !== "string") return null;
    for (var d = 0; d < data.days.length; d++) {
      if (data.days[d].id !== ref.day) continue;
      for (var i = 0; i < data.days[d].items.length; i++) {
        if (data.days[d].items[i].time === ref.time) return ref.day + "-" + i;
      }
    }
    return null;
  }

  function renderChecklist(data) {
    var body = document.getElementById("checklist-body");
    var progress = document.getElementById("checklist-progress");
    if (!body || !progress || !Array.isArray(data.checklist)) return;

    var saved = loadChecklistState();
    var total = 0;

    function sync() {
      var checked = body.querySelectorAll("input[type=checkbox]:checked");
      var ids = [];
      checked.forEach(function (box) {
        ids.push(box.getAttribute("data-id"));
      });
      progress.textContent = ids.length + " / " + total;
      return ids;
    }

    data.checklist.forEach(function (group) {
      var section = el("div", "checklist__group");
      section.appendChild(el("h3", "checklist__group-title", group.title));
      var list = el("ul", "checklist__list");

      group.items.forEach(function (item) {
        total += 1;
        var li = el("li", "checklist__li");
        var label = el("label", "checklist__item");

        var box = document.createElement("input");
        box.type = "checkbox";
        box.className = "checklist__box";
        box.setAttribute("data-id", item.id);
        box.checked = saved.indexOf(item.id) !== -1;
        box.addEventListener("change", function () {
          saveChecklistState(sync());
        });
        label.appendChild(box);

        var text = el("span", "checklist__text");
        if (item.day) text.appendChild(el("span", "checklist__day", item.day));
        text.appendChild(el("span", "checklist__label", item.label));
        // Optional jump to the matching itinerary item: itemRef: { day, time, spot? }.
        var jumpKey = findItemKey(data, item.itemRef);
        if (jumpKey) {
          var jump = el("a", "checklist__jump", "前往行程 ›" + (typeof item.itemRef.spot === "string" && item.itemRef.spot ? "（" + item.itemRef.spot + "）" : ""));
          jump.href = "#" + jumpKey;
          jump.addEventListener("click", function (event) {
            event.preventDefault();
            var target = document.querySelector('[data-item-key="' + jumpKey + '"]');
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          });
          text.appendChild(jump);
        }
        if (item.detail) text.appendChild(el("span", "checklist__detail", item.detail));
        label.appendChild(text);

        li.appendChild(label);
        list.appendChild(li);
      });

      section.appendChild(list);
      body.appendChild(section);
    });

    sync();
  }

  /**
   * Renders the floating "back to current itinerary" action. Only
   * appears when today falls within the trip dates. Prefers jumping to
   * the NOW item, falls back to NEXT, and shows a low-key "Day
   * Complete" state once today's itinerary has fully played out.
   * Never auto-scrolls on load — the user opts in by tapping it.
   */
  function renderTravelJump(travelState) {
    if (!travelState.todayDay) return;
    if (!travelState.nowItem && !travelState.nextItem && !travelState.dayComplete) return;

    var btn = el("button", "travel-jump");
    btn.type = "button";

    if (travelState.dayComplete) {
      btn.classList.add("is-complete");
      btn.textContent = "Day Complete";
      btn.setAttribute("aria-label", "Today's itinerary is complete");
    } else {
      btn.textContent = "回到目前行程";
      btn.setAttribute("aria-label", "回到目前行程 — jump to current itinerary item");
    }

    btn.addEventListener("click", function () {
      if (currentFilter !== "all") applyFilter("all", ITINERARY_DATA);
      var targetId = travelState.dayComplete
        ? travelState.todayDay.id
        : travelState.nowItem
        ? "travel-now"
        : "travel-next";
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    document.body.appendChild(btn);
  }

  function setupActiveDayHighlight(data) {
    var daySections = data.days
      .map(function (day) {
        return document.getElementById(day.id);
      })
      .filter(Boolean);

    if (!daySections.length || !("IntersectionObserver" in window)) return;

    var navButtons = {};
    data.days.forEach(function (day) {
      var btn = document.getElementById("nav-" + day.id);
      if (btn) navButtons[day.id] = btn;
    });

    function setActive(id) {
      Object.keys(navButtons).forEach(function (key) {
        navButtons[key].classList.toggle("is-active", key === id);
      });
      var activeBtn = navButtons[id];
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    daySections.forEach(function (section) {
      observer.observe(section);
    });

    // Highlight Day 1 on initial load.
    setActive(daySections[0].id);
  }

  /** Floating "back to top" button, shown after scrolling down a screen or so. */
  function renderBackToTop() {
    var btn = el("button", "back-to-top", "↑");
    btn.type = "button";
    btn.setAttribute("aria-label", "回到頁面最上方");
    btn.hidden = true;
    btn.addEventListener("click", function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
    document.body.appendChild(btn);
    function update() {
      btn.hidden = (window.pageYOffset || document.documentElement.scrollTop || 0) < 600;
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function init() {
    if (typeof ITINERARY_DATA === "undefined") {
      console.error("ITINERARY_DATA not found. Check that data/itinerary.js loaded before js/app.js.");
      return;
    }

    var travelState = computeTravelMode(ITINERARY_DATA, getJapanNow());

    renderHeroStats(ITINERARY_DATA);
    renderOverview(ITINERARY_DATA);
    renderChecklist(ITINERARY_DATA);
    renderTaxRefund(ITINERARY_DATA);
    renderDayNav(ITINERARY_DATA, travelState);
    renderDays(ITINERARY_DATA, travelState);
    renderFilterBar(ITINERARY_DATA);
    renderTravelJump(travelState);
    renderBackToTop();
    setupActiveDayHighlight(ITINERARY_DATA);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
