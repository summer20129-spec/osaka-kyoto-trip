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

  function renderDayNav(data) {
    var container = document.getElementById("day-nav-scroll");
    if (!container) return;

    data.days.forEach(function (day) {
      var btn = el("button", "day-nav__item");
      btn.type = "button";
      btn.id = "nav-" + day.id;
      btn.textContent = "DAY " + String(day.day).padStart(2, "0");
      btn.setAttribute("aria-label", "Jump to Day " + day.day + " — " + day.title);
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

  function renderTimelineItem(item) {
    var li = el("li", "timeline-item");

    li.appendChild(el("p", "timeline-item__time", item.time));
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

  function renderDay(day) {
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
      timeline.appendChild(renderTimelineItem(item));
    });
    section.appendChild(timeline);

    return section;
  }

  function renderDays(data) {
    var container = document.getElementById("days");
    if (!container) return;
    data.days.forEach(function (day) {
      container.appendChild(renderDay(day));
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

    renderHeroStats(ITINERARY_DATA);
    renderOverview(ITINERARY_DATA);
    renderDayNav(ITINERARY_DATA);
    renderDays(ITINERARY_DATA);
    renderTravelNotes(ITINERARY_DATA);
    setupActiveDayHighlight(ITINERARY_DATA);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
