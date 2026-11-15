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

  var slider = document.querySelector("[data-slider]");
  if (slider) {
    var track = slider.querySelector("[data-slider-track]");
    var slides = Array.prototype.slice.call(track.children);
    var dots = Array.prototype.slice.call(slider.querySelectorAll("[data-slider-dot]"));
    var toggle = slider.querySelector("[data-slider-toggle]");
    var index = 0;
    var timer = null;
    var delay = 5000;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var paused = reduce;

    function setActive(next) {
      index = next;
      slides.forEach(function (slide, i) {
        if (i === next) slide.removeAttribute("inert");
        else slide.setAttribute("inert", "");
      });
      dots.forEach(function (dot, i) {
        var on = i === next;
        dot.classList.toggle("is-active", on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function go(next, behavior) {
      var i = (next + slides.length) % slides.length;
      var motion = reduce ? "auto" : (behavior || "smooth");
      track.scrollTo({ left: track.clientWidth * i, behavior: motion });
      setActive(i);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var i = slides.indexOf(entry.target);
          if (i >= 0 && i !== index) setActive(i);
        });
      }, { root: track, threshold: 0.6 });
      slides.forEach(function (slide) { observer.observe(slide); });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function (event) {
        event.preventDefault();
        go(i);
        restart();
      });
    });

    track.addEventListener("keydown", function (event) {
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

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      if (paused || reduce || document.hidden || timer) return;
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
        paused ? "Pokreni automatsku izmjenu slajdova" : "Pauziraj automatsku izmjenu slajdova"
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

    slider.addEventListener("pointerenter", stop);
    slider.addEventListener("pointerleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", function (event) {
      if (!slider.contains(event.relatedTarget)) start();
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    setActive(0);
    paintToggle();
    start();
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-tema]");
    if (!link) return;
    var select = document.getElementById("tema");
    if (select) select.value = link.getAttribute("data-tema");
  });


  function initModelSliders() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sliders = document.querySelectorAll("[data-model-slider]");
    sliders.forEach(function (slider) {
      var track = slider.querySelector("[data-model-track]");
      if (!track) return;
      var cards = Array.prototype.slice.call(track.children);
      if (!cards.length) return;
      var prev = slider.querySelector("[data-model-prev]");
      var next = slider.querySelector("[data-model-next]");
      var dotsWrap = slider.querySelector("[data-model-dots]");
      var index = 0;
      var timer = null;
      var delay = 5500;
      var paused = reduce;
      var dots = [];

      if (dotsWrap) {
        dotsWrap.innerHTML = "";
        cards.forEach(function (card, i) {
          var title = "";
          var h = card.querySelector("h4");
          var series = card.querySelector(".model-card__series");
          if (series && h) title = series.textContent.trim() + " " + h.textContent.trim();
          else if (h) title = h.textContent.trim();
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "model-slider__dot" + (i === 0 ? " is-active" : "");
          btn.setAttribute("aria-label", "Model " + (i + 1) + " od " + cards.length + (title ? ": " + title : ""));
          if (i === 0) btn.setAttribute("aria-current", "true");
          btn.addEventListener("click", function () {
            go(i);
            restart();
          });
          dotsWrap.appendChild(btn);
          dots.push(btn);
        });
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

      function go(nextIndex, behavior) {
        var i = (nextIndex + cards.length) % cards.length;
        var motion = reduce ? "auto" : (behavior || "smooth");
        var left = cards[i].offsetLeft;
        track.scrollTo({ left: left, behavior: motion });
        setActive(i);
      }

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var i = cards.indexOf(entry.target);
            if (i >= 0 && i !== index) setActive(i);
          });
        }, { root: track, threshold: 0.6 });
        cards.forEach(function (card) { observer.observe(card); });
      }

      if (prev) prev.addEventListener("click", function () { go(index - 1); restart(); });
      if (next) next.addEventListener("click", function () { go(index + 1); restart(); });

      function stop() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      function start() {
        if (paused || reduce || document.hidden || timer) return;
        timer = setInterval(function () { go(index + 1); }, delay);
      }

      function restart() {
        stop();
        start();
      }

      slider.addEventListener("pointerenter", stop);
      slider.addEventListener("pointerleave", start);
      slider.addEventListener("focusin", stop);
      slider.addEventListener("focusout", function (event) {
        if (!slider.contains(event.relatedTarget)) start();
      });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else start();
      });

      setActive(0);
      start();
    });
  }

  initModelSliders();

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

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearInvalid();
    copyBox.hidden = true;
    copyBtn.hidden = true;
    copyBtn.textContent = "Kopiraj tekst upita";

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
    copyBox.value = body;

    var target = contactEmail();
    var ready = target.indexOf("@") !== -1 && target.indexOf("[") === -1;

    if (!ready) {
      copyBox.hidden = false;
      copyBtn.hidden = false;
      showStatus("Upit je sastavljen na ovom uređaju. Zamijenite [EMAIL] stvarnom adresom da bi se poruka otvorila u programu za e-poštu. Tekst možete kopirati.", false);
      return;
    }

    var href = "mailto:" + target
      + "?subject=" + encodeURIComponent("Upit: " + tema + " — Solar Storm")
      + "&body=" + encodeURIComponent(body);
    showStatus("Otvaramo program za e-poštu. Ako se ništa ne dogodi, kopirajte tekst upita.", false);
    copyBox.hidden = false;
    copyBtn.hidden = false;
    window.location.href = href;
  });
})();
