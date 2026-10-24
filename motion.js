/* KAG Vertretungsplan – Support-Website
   Scroll-Bewegung der Bildschirmfotos für Browser ohne CSS-Scroll-Animationen
   (z. B. ältere Safari-Versionen). Setzt nur die CSS-Variable --p (0 bis 1);
   wie sich die Geräte bewegen, steht in styles.css.
   Tut nichts, wenn der Browser es selbst kann oder „Bewegung reduzieren“ an ist. */

(function () {
  "use strict";

  var css = window.CSS && CSS.supports;
  if (css && CSS.supports("animation-timeline: view()")) return;
  if (!window.matchMedia || !window.requestAnimationFrame) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return;

  document.documentElement.classList.add("js-motion");

  var hero = document.querySelectorAll(".hero-stage .phone");
  // Wie in styles.css: Bereich „entry 0 % bis cover 45 %“ bzw. 50 % für das Browserfenster
  var items = [];
  document.querySelectorAll(".step-media .phone").forEach(function (el) {
    items.push({ el: el, range: 0.45 });
  });
  document.querySelectorAll(".band .browser").forEach(function (el) {
    items.push({ el: el, range: 0.5 });
  });

  if (!hero.length && !items.length) return;

  var queued = false;

  function clamp(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  function update() {
    queued = false;
    var vh = window.innerHeight;

    var heroP = clamp(window.scrollY / (vh * 0.8));
    for (var i = 0; i < hero.length; i++) {
      hero[i].style.setProperty("--p", heroP.toFixed(3));
    }

    for (var j = 0; j < items.length; j++) {
      var r = items[j].el.getBoundingClientRect();
      // Element taucht unten auf (0) … hat einen Teil des Weges durch den Bildschirm geschafft (1)
      var p = clamp((vh - r.top) / (items[j].range * (vh + r.height)));
      items[j].el.style.setProperty("--p", p.toFixed(3));
    }
  }

  function queue() {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);

  // Schaltet jemand „Bewegung reduzieren“ ein, sofort aufhören
  var stop = function () {
    if (!reduce.matches) return;
    window.removeEventListener("scroll", queue);
    window.removeEventListener("resize", queue);
    document.documentElement.classList.remove("js-motion");
  };
  if (reduce.addEventListener) reduce.addEventListener("change", stop);

  update();
})();
