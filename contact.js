/* KAG Vertretungsplan – Support-Website
   Kontaktformular: sendet an Formspree, ohne die Seite zu verlassen.
   Ohne JavaScript schickt der Browser das Formular ganz normal an Formspree. */

(function () {
  "use strict";

  var form = document.getElementById("kontaktformular");
  if (!form || !window.fetch || !window.FormData) return;

  var status = document.getElementById("formular-status");
  var button = form.querySelector('button[type="submit"]');
  var buttonText = button.textContent;

  function show(kind, text) {
    status.className = "form-status form-status--" + kind;
    status.textContent = text;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Browser-Prüfung (Pflichtfelder, E-Mail-Format) zuerst
    if (!form.reportValidity()) return;

    button.disabled = true;
    button.textContent = "Wird gesendet …";
    show("info", "Deine Nachricht wird gesendet …");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          form.hidden = true;
          show("ok", "Danke! Deine Nachricht ist angekommen. Wenn du eine E-Mail-Adresse angegeben hast, bekommst du eine Antwort.");
          status.focus();
          return;
        }
        return res.json().then(
          function (data) {
            var msg = data && data.errors && data.errors.length
              ? data.errors.map(function (x) { return x.message; }).join(" ")
              : "";
            throw new Error(msg);
          },
          function () { throw new Error(""); }
        );
      })
      .catch(function (err) {
        show(
          "error",
          "Das hat leider nicht geklappt" + (err && err.message ? " (" + err.message + ")" : "") +
            ". Bitte versuch es später noch einmal oder schreib eine E-Mail an phandevstudios@gmx.de."
        );
        status.focus();
      })
      .then(function () {
        button.disabled = false;
        button.textContent = buttonText;
      });
  });
})();
