/* ==========================================================================
   SALA V · MURO DE 2014
   Cuelga las fotos de Tumblr definidas en coleccion.js (muro2014.posts).
   ========================================================================== */
(function () {
  "use strict";
  var mu = window.MUSEO.muro2014;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  document.getElementById("muro-num").textContent = "Sala " + mu.numero;
  document.getElementById("muro-nombre").textContent = mu.nombre;
  document.getElementById("muro-lema").textContent = mu.lema;
  if (mu.nota) {
    var n = document.getElementById("muro-nota");
    n.textContent = mu.nota;
    n.hidden = false;
  }

  document.getElementById("tablero").innerHTML = mu.posts.map(function (x) {
    var foto = x.imagen
      ? '<div class="foto foto-real"><img src="' + esc(x.imagen) + '" alt="" loading="lazy"></div>'
      : '<div class="foto" style="--f1:' + esc(x.colores[0]) + ";--f2:" + esc(x.colores[1]) + '"><span>' + esc(x.frase) + "</span></div>";
    return '<figure class="post">' + foto +
      (x.notas ? '<figcaption class="notas"><i aria-hidden="true">↻</i> <b>' + esc(x.notas) + "</b> notas</figcaption>" : "") +
      (x.tags ? '<p class="tags">' + esc(x.tags) + "</p>" : "") +
      "</figure>";
  }).join("");
})();
