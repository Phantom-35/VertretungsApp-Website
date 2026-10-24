/* KAG Vertretungsplan – Support-Website
   Menü auf dem Handy: Knopf öffnet und schließt die Navigation.
   Ohne JavaScript bleiben die Links einfach sichtbar. Speichert und sendet nichts. */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var button = header && header.querySelector(".menu-button");
  var nav = header && document.getElementById(button && button.getAttribute("aria-controls"));
  if (!button || !nav) return;

  document.documentElement.classList.add("js-nav");

  function isOpen() {
    return button.getAttribute("aria-expanded") === "true";
  }

  function setOpen(open) {
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    header.classList.toggle("menu-open", open);
  }

  button.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  // Escape schließt und bringt den Fokus zurück auf den Knopf
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  // Klick auf einen Link oder außerhalb des Kopfes schließt das Menü
  nav.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("click", function (e) {
    if (isOpen() && !header.contains(e.target)) setOpen(false);
  });

  // Wird das Fenster breit genug für die normale Navigation, Menü zurücksetzen
  if (window.matchMedia) {
    var wide = window.matchMedia("(min-width: 48rem)");
    var reset = function () {
      if (wide.matches) setOpen(false);
    };
    if (wide.addEventListener) wide.addEventListener("change", reset);
  }
})();
