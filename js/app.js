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
    PENDING: "Pending"
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
      { key: "budget", label: "價格帶", verifiedAtKey: "budgetVerifiedAt" },
      { key: "reservationTip", label: "預約建議" },
      { key: "elderFriendly", label: "長輩友善提示" }
    ],
    shopping: [
      { key: "highlights", label: "店家特色" },
      { key: "recommendedItems", label: "必買" },
      { key: "limitedItems", label: "限定商品", verifiedAtKey: "limitedItemsVerifiedAt" },
      { key: "tips", label: "購買提醒" }
    ]
  };

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

    var cards = [
      { label: "旅行日期", value: overview.dates },
      { label: "旅行人數", value: overview.travelers },
      { label: "主要城市", value: overview.cities },
      {
        label: "住宿",
        value: overview.accommodation.name,
        detail: overview.accommodation.detail + " · " + overview.accommodation.location,
        locationQuery: overview.accommodation.locationQuery
      }
    ];

    cards.forEach(function (card) {
      var wrap = el("div", "overview__card");
      wrap.appendChild(el("p", "overview__card-label", card.label));
      wrap.appendChild(el("p", "overview__card-value", card.value));
      if (card.detail) {
        wrap.appendChild(el("p", "overview__card-detail", card.detail));
      }
      if (card.locationQuery) {
        wrap.appendChild(renderMapLink({ title: card.value, locationQuery: card.locationQuery }));
      }
      container.appendChild(wrap);
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

  function renderGuidePanel(item, panelId) {
    var panel = el("div", "guide-panel");
    panel.id = panelId;
    panel.hidden = true;

    var fields = GUIDE_FIELD_CONFIG[item.guide.type] || [];
    fields.forEach(function (field) {
      var fieldEl = renderGuideField(field, item.guide);
      if (fieldEl) panel.appendChild(fieldEl);
      if (field.key === "photoTips" && item.guide.photoExample) {
        var photoEl = renderPhotoExample(item.guide.photoExample);
        if (photoEl) panel.appendChild(photoEl);
      }
    });

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

  function renderGuide(item) {
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
    return wrap;
  }

  function renderTimelineItem(item, travelState) {
    var li = el("li", "timeline-item");

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
    li.appendChild(timeEl);
    li.appendChild(el("p", "timeline-item__title", item.title));

    if (item.description) {
      li.appendChild(el("p", "timeline-item__description", item.description));
    }

    if (item.notes && item.notes.length) {
      var notesWrap = el("div", "timeline-item__notes");
      item.notes.forEach(function (note) {
        // A note is a plain string, or { text, locationQuery } to also
        // show a MAP link for a place mentioned in that note.
        var isObject = !!(note && typeof note === "object");
        var hasMap = isObject && !!note.locationQuery;
        var noteEl = el("p", "timeline-item__note", isObject ? note.text : note);
        if (hasMap) {
          var mapLink = el("a", "map-link timeline-item__note-map", "MAP");
          mapLink.href = buildMapUrl(note.locationQuery);
          mapLink.target = "_blank";
          mapLink.rel = "noopener noreferrer";
          mapLink.setAttribute("aria-label", "在 Google Maps 開啟" + note.locationQuery);
          noteEl.appendChild(mapLink);
        }
        notesWrap.appendChild(noteEl);

        if (note && typeof note === "object" && note.image) {
          var imageEl = renderNoteImage(note.image);
          if (imageEl) notesWrap.appendChild(imageEl);
        }
      });
      li.appendChild(notesWrap);
    }

    if (item.badges && item.badges.length) {
      li.appendChild(renderBadges(item.badges));
    }

    if (item.locationQuery) {
      li.appendChild(renderMapLink(item));
    }

    if (item.guide) {
      li.appendChild(renderGuide(item));
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
    eyebrow.appendChild(
      el("span", "day__date", day.date + " " + day.weekday + "（" + day.weekdayLocal + "）")
    );
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

    var timeline = el("ul", "timeline");
    day.items.forEach(function (item) {
      if (item.group) {
        timeline.appendChild(el("li", "timeline-group", item.group));
      }
      timeline.appendChild(renderTimelineItem(item, travelState));
    });
    section.appendChild(timeline);

    return section;
  }

  function renderDays(data, travelState) {
    var container = document.getElementById("days");
    if (!container) return;
    data.days.forEach(function (day) {
      container.appendChild(renderDay(day, travelState));
    });
  }

  function renderTravelNotes(data) {
    var container = document.getElementById("travel-notes-grid");
    if (!container) return;
    data.travelNotes.forEach(function (note) {
      var card = el("div", "travel-note");
      card.appendChild(el("p", "travel-note__title", note.title));
      card.appendChild(el("p", "travel-note__body", note.body));
      container.appendChild(card);
    });
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

  function init() {
    if (typeof ITINERARY_DATA === "undefined") {
      console.error("ITINERARY_DATA not found. Check that data/itinerary.js loaded before js/app.js.");
      return;
    }

    var travelState = computeTravelMode(ITINERARY_DATA, getJapanNow());

    renderHeroStats(ITINERARY_DATA);
    renderOverview(ITINERARY_DATA);
    renderChecklist(ITINERARY_DATA);
    renderDayNav(ITINERARY_DATA, travelState);
    renderDays(ITINERARY_DATA, travelState);
    renderTravelNotes(ITINERARY_DATA);
    renderTravelJump(travelState);
    setupActiveDayHighlight(ITINERARY_DATA);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
