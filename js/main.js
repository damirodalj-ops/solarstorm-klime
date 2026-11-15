(function () {
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

  var rotator = document.querySelector("[data-hero-rotator]");
  if (rotator) {
    var slides = Array.prototype.slice.call(rotator.querySelectorAll("[data-hero-slide]"));
    var dots = Array.prototype.slice.call(rotator.querySelectorAll("[data-hero-dot]"));
    var toggle = rotator.querySelector("[data-hero-toggle]");
    var caption = rotator.querySelector("[data-hero-caption]");
    var index = 0;
    var timer = null;
    var delay = 5000;
    var paused = reduce;

    function setCaption(i) {
      if (!caption || !slides[i]) return;
      var raw = slides[i].getAttribute("data-caption") || "";
      var parts = raw.split(" ");
      var brand = parts.shift() || "";
      var rest = parts.join(" ");
      caption.innerHTML = "<strong>" + brand + "</strong> " + rest;
    }

    function setActive(next) {
      index = next;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === next);
      });
      dots.forEach(function (dot, i) {
        var on = i === next;
        dot.classList.toggle("is-active", on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      setCaption(next);
    }

    function go(next) {
      setActive((next + slides.length) % slides.length);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (paused || reduce || document.hidden || timer || slides.length < 2) return;
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
        paused ? "Pokreni izmjenu slika" : "Pauziraj izmjenu slika"
      );
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
        restart();
      });
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        paused = !paused;
        paintToggle();
        if (paused) stop();
        else start();
      });
    }

    rotator.addEventListener("keydown", function (event) {
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

    rotator.addEventListener("pointerenter", stop);
    rotator.addEventListener("pointerleave", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
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
      + "?subject=" + encodeURIComponent("Upit: " + tema + " — Klimoteka")
      + "&body=" + encodeURIComponent(body);
    showStatus("Otvaramo program za e-poštu. Ako se ništa ne dogodi, kopirajte tekst upita.", false);
    if (copyBox) copyBox.hidden = false;
    if (copyBtn) copyBtn.hidden = false;
    window.location.href = href;
  });
})();
