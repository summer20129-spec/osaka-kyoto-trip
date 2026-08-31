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
        detail: overview.accommodation.detail + " · " + overview.accommodation.location
      }
    ];

    cards.forEach(function (card) {
      var wrap = el("div", "overview__card");
      wrap.appendChild(el("p", "overview__card-label", card.label));
      wrap.appendChild(el("p", "overview__card-value", card.value));
      if (card.detail) {
        wrap.appendChild(el("p", "overview__card-detail", card.detail));
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
        notesWrap.appendChild(el("p", "timeline-item__note", note));
      });
      li.appendChild(notesWrap);
    }

    if (item.badges && item.badges.length) {
      li.appendChild(renderBadges(item.badges));
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
