(function () {
  // ---------------------------------------------------------------------------
  // OVDJE ODABERI IZDVOJENE MODELE
  //
  // Upiši ID-eve modela (atribut data-model na karticama u odjeljku Brendovi).
  // Redoslijed u polju je redoslijed prikaza u sekciji Izdvojeni modeli.
  // Preporuka: do tri modela, iz različitih brendova. Promjena vrijedi odmah;
  // HTML izdvojenih kartica nije potrebno dirati.
  //
  // Privremeni odabir (Damir treba potvrditi):
  //   1. Tesla Virtuoso — TT37AF-1232IAW
  //   2. Toshiba DaiSeiKai 10 Wood — RAS-B13S4KVDG-E
  //   3. Haier Expert Nordic — AS35XCHHRA-NR
  // ---------------------------------------------------------------------------
  var FEATURED_MODELS = [
    "TT37AF-1232IAW",
    "RAS-B13S4KVDG-E",
    "AS35XCHHRA-NR"
  ];

  var header = document.querySelector(".site-header");
  var burger = document.querySelector("[data-burger]");
  var scrim = document.querySelector("[data-scrim]");
  var menu = document.getElementById("mobileMenu");

  function onScroll() {
    if (!header) return;
    header.setAttribute("data-scrolled", window.scrollY > 4 ? "true" : "false");
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    if (!header || !burger) return;
    header.setAttribute("data-menu-open", open ? "true" : "false");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    if (scrim) scrim.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("menu-open", open);
    if (open) {
      var first = menu && menu.querySelector("a");
      if (first) first.focus();
    } else if (document.activeElement && menu && menu.contains(document.activeElement)) {
      burger.focus();
    }
  }

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(header.getAttribute("data-menu-open") !== "true");
    });
  }

  if (scrim) scrim.addEventListener("click", function () { setMenu(false); });

  if (menu) {
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function featureList(text) {
    return text.split(",").map(function (part) {
      return part.replace(/\.$/, "").trim();
    }).filter(Boolean).slice(0, 3);
  }

  function buildFeatured() {
    var track = document.querySelector("[data-featured-track]");
    if (!track) return [];
    track.innerHTML = "";
    var cards = [];
    FEATURED_MODELS.forEach(function (id, index) {
      var source = document.querySelector('.model-card[data-model="' + id + '"]');
      if (!source) return;
      var brand = source.getAttribute("data-brand") || "";
      var img = source.querySelector("img");
      var seriesEl = source.querySelector(".model-card__series");
      var nameEl = source.querySelector("h4");
      var powerEl = source.querySelector(".model-card__power");
      var featEl = source.querySelector(".model-card__feat");
      var series = seriesEl ? seriesEl.textContent.trim() : "";
      var name = nameEl ? nameEl.textContent.trim() : id;
      var power = powerEl ? powerEl.textContent.trim() : "";
      var feats = featureList(featEl ? featEl.textContent : "");
      var label = (brand + " " + series + " " + name).replace(/\s+/g, " ").trim();
      var featsHtml = feats.map(function (f) {
        return "<li>" + escapeHtml(f) + "</li>";
      }).join("");
      var li = document.createElement("li");
      li.className = "featured-card";
      li.innerHTML =
        '<figure class="featured-card__photo">' +
          (img
            ? '<img src="' + escapeHtml(img.getAttribute("src")) + '" width="' + (img.getAttribute("width") || "") + '" height="' + (img.getAttribute("height") || "") + '" alt="' + escapeHtml(img.getAttribute("alt") || label) + '"' + (index === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + ">"
            : "") +
        "</figure>" +
        '<div class="featured-card__body">' +
          '<span class="featured-card__badge">Izdvojeno</span>' +
          (brand ? '<p class="featured-card__brand">' + escapeHtml(brand) + "</p>" : "") +
          "<h3>" + escapeHtml(series || name) + "</h3>" +
          (series ? '<p class="featured-card__sku">' + escapeHtml(name) + "</p>" : "") +
          (power ? '<p class="featured-card__power">' + escapeHtml(power) + "</p>" : "") +
          (featsHtml ? '<ul class="featured-card__feats">' + featsHtml + "</ul>" : "") +
          '<p class="featured-card__warranty">5 godina jamstva</p>' +
          '<a class="btn" href="#kontakt" data-inquire-model="' + escapeHtml(label) + '">Zatražite ponudu</a>' +
        "</div>";
      track.appendChild(li);
      cards.push(li);
    });
    return cards;
  }

  var featuredCards = buildFeatured();

  if (featuredCards.length && !reduce && "IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    featuredCards.forEach(function (card) { reveal.observe(card); });
  } else {
    featuredCards.forEach(function (card) { card.classList.add("is-in"); });
  }

  var featuredSlider = document.querySelector("[data-featured-slider]");
  if (featuredSlider && featuredCards.length > 1) {
    var track = featuredSlider.querySelector("[data-featured-track]");
    var dotsWrap = featuredSlider.querySelector("[data-featured-dots]");
    var toggle = featuredSlider.querySelector("[data-featured-toggle]");
    var index = 0;
    var timer = null;
    var delay = 5500;
    var paused = reduce;
    var dots = [];

    function isCarousel() {
      return window.matchMedia("(max-width: 959px)").matches;
    }

    function setActive(i) {
      index = i;
      dots.forEach(function (dot, d) {
        var on = d === i;
        dot.classList.toggle("is-active", on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function go(next, behavior) {
      var i = (next + featuredCards.length) % featuredCards.length;
      if (isCarousel()) {
        var motion = reduce ? "auto" : (behavior || "smooth");
        featuredCards[i].scrollIntoView({ behavior: motion, inline: "start", block: "nearest" });
      }
      setActive(i);
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      featuredCards.forEach(function (card, i) {
        var title = "";
        var h = card.querySelector("h3");
        var brand = card.querySelector(".featured-card__brand");
        if (brand && h) title = brand.textContent.trim() + " " + h.textContent.trim();
        else if (h) title = h.textContent.trim();
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", "Izdvojeni model " + (i + 1) + (title ? ": " + title : ""));
        if (i === 0) {
          btn.className = "is-active";
          btn.setAttribute("aria-current", "true");
        }
        btn.addEventListener("click", function () {
          go(i);
          restart();
        });
        dotsWrap.appendChild(btn);
        dots.push(btn);
      });
    }

    if ("IntersectionObserver" in window) {
      var slideObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || !isCarousel()) return;
          var i = featuredCards.indexOf(entry.target);
          if (i >= 0 && i !== index) setActive(i);
        });
      }, { root: track, threshold: 0.6 });
      featuredCards.forEach(function (card) { slideObs.observe(card); });
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (paused || reduce || document.hidden || timer || !isCarousel()) return;
      timer = setInterval(function () { go(index + 1); }, delay);
    }

    function restart() {
      stop();
      start();
    }

    function paintToggle() {
      if (!toggle) return;
      toggle.classList.toggle("is-paused", paused);
      toggle.setAttribute("aria-pressed", paused ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        paused ? "Pokreni izmjenu modela" : "Pauziraj izmjenu modela"
      );
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        paused = !paused;
        paintToggle();
        if (paused) stop();
        else start();
      });
    }

    featuredSlider.addEventListener("pointerenter", stop);
    featuredSlider.addEventListener("pointerleave", start);
    featuredSlider.addEventListener("focusin", stop);
    featuredSlider.addEventListener("focusout", function (event) {
      if (!featuredSlider.contains(event.relatedTarget)) start();
    });
    featuredSlider.addEventListener("keydown", function (event) {
      if (!isCarousel()) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
        restart();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
        restart();
      }
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener("resize", function () {
      if (!isCarousel()) stop();
      else restart();
    });

    setActive(0);
    paintToggle();
    start();
  }

  var tablist = document.querySelector("[role='tablist']");
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-brand-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-brand-panel]"));

  function showBrand(slug, moveFocus) {
    if (!slug) return;
    var found = false;
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-brand-tab") === slug;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      if (on) found = true;
    });
    if (!found) return;
    panels.forEach(function (panel) {
      var on = panel.getAttribute("data-brand-panel") === slug;
      if (on) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
    if (moveFocus) {
      var active = document.querySelector('[data-brand-tab="' + slug + '"]');
      if (active) active.focus();
    }
  }

  function slugFromHash(hash) {
    var id = (hash || "").replace(/^#/, "");
    if (id.indexOf("brend-") === 0) return id.slice(6);
    var known = { tesla: 1, toshiba: 1, haier: 1, maxon: 1 };
    if (known[id]) return id;
    return "";
  }

  if (tabs.length) {
    tabs.forEach(function (tab, i) {
      tab.tabIndex = i === 0 ? 0 : -1;
      tab.addEventListener("click", function () {
        var slug = tab.getAttribute("data-brand-tab");
        showBrand(slug);
        if (history.replaceState) history.replaceState(null, "", "#brend-" + slug);
      });
    });

    if (tablist) {
      tablist.addEventListener("keydown", function (event) {
        var current = document.activeElement;
        var i = tabs.indexOf(current);
        if (i < 0) return;
        var next = -1;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % tabs.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next < 0) return;
        event.preventDefault();
        showBrand(tabs[next].getAttribute("data-brand-tab"), true);
      });
    }

    var initial = slugFromHash(window.location.hash);
    if (initial) showBrand(initial);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#brend-"], a[href*="index.html#brend-"]');
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var hash = href.slice(href.indexOf("#"));
    var slug = slugFromHash(hash);
    if (slug) showBrand(slug);
  });

  window.addEventListener("hashchange", function () {
    var slug = slugFromHash(window.location.hash);
    if (slug) showBrand(slug);
  });

  function preselectModel(label) {
    var fieldWrap = document.getElementById("model-field");
    var input = document.getElementById("model");
    var tema = document.getElementById("tema");
    if (input) input.value = label || "";
    if (fieldWrap) fieldWrap.hidden = !label;
    if (tema && label) tema.value = "Prodaja";
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-inquire-model]");
    if (!link) return;
    preselectModel(link.getAttribute("data-inquire-model"));
  });

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-tema]");
    if (!link) return;
    var select = document.getElementById("tema");
    if (select) select.value = link.getAttribute("data-tema");
  });

  var form = document.querySelector("[data-inquiry]");
  if (!form) return;

  var status = form.querySelector("[data-form-status]");
  var copyBox = form.querySelector("[data-form-copy]");
  var copyBtn = form.querySelector("[data-copy]");
  var emailEl = document.getElementById("contact-email");

  function contactEmail() {
    return emailEl ? emailEl.textContent.replace(/\s+/g, "").trim() : "[EMAIL]";
  }

  function showStatus(message, isError) {
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  function field(name) {
    return form.elements[name];
  }

  function clearInvalid() {
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.willValidate) el.removeAttribute("aria-invalid");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBox.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = "Tekst je kopiran";
        }).catch(function () {
          copyBox.focus();
          copyBox.select();
        });
      } else {
        copyBox.focus();
        copyBox.select();
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearInvalid();
    if (copyBox) copyBox.hidden = true;
    if (copyBtn) {
      copyBtn.hidden = true;
      copyBtn.textContent = "Kopiraj tekst upita";
    }

    var name = field("ime").value.trim();
    var email = field("email").value.trim();
    var phone = field("telefon").value.trim();
    var tema = field("tema").value;
    var model = field("model") ? field("model").value.trim() : "";
    var message = field("poruka").value.trim();
    var consent = field("suglasnost").checked;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 2) {
      field("ime").setAttribute("aria-invalid", "true");
      field("ime").focus();
      showStatus("Unesite ime i prezime.", true);
      return;
    }
    if (!emailOk) {
      field("email").setAttribute("aria-invalid", "true");
      field("email").focus();
      showStatus("Unesite ispravnu e-poštu na koju možemo odgovoriti.", true);
      return;
    }
    if (message.length < 10) {
      field("poruka").setAttribute("aria-invalid", "true");
      field("poruka").focus();
      showStatus("Poruka treba imati barem 10 znakova.", true);
      return;
    }
    if (!consent) {
      field("suglasnost").focus();
      showStatus("Potvrdite da razumijete kako se upit šalje.", true);
      return;
    }

    var body = [
      "Ime i prezime: " + name,
      "E-pošta: " + email,
      "Telefon: " + (phone || "—"),
      "Tema: " + tema,
      "Model: " + (model || "—"),
      "",
      message
    ].join("\n");
    if (copyBox) copyBox.value = body;

    var target = contactEmail();
    var ready = target.indexOf("@") !== -1 && target.indexOf("[") === -1;

    if (!ready) {
      if (copyBox) copyBox.hidden = false;
      if (copyBtn) copyBtn.hidden = false;
      showStatus("Upit je sastavljen na ovom uređaju. Tekst možete kopirati.", false);
      return;
    }

    var href = "mailto:" + target
      + "?subject=" + encodeURIComponent("Upit: " + tema + (model ? " (" + model + ")" : "") + " — Klimoteka")
      + "&body=" + encodeURIComponent(body);
    showStatus("Otvaramo program za e-poštu. Ako se ništa ne dogodi, kopirajte tekst upita.", false);
    if (copyBox) copyBox.hidden = false;
    if (copyBtn) copyBtn.hidden = false;
    window.location.href = href;
  });
})();
