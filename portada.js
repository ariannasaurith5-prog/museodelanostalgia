/* ==========================================================================
   PORTADAS
   Busca la foto de cada portada en <slug>.jpg (en la raíz del repositorio) (o en la ruta
   que indique el campo `portada` de la pieza). Si la foto existe, la pone
   dentro del cuadro. Si no existe, el cuadro conserva su obra abstracta.
   ========================================================================== */

window.Portadas = (function () {
  "use strict";

  var cache = {};

  function rutaDe(slug) {
    var piezas = (window.MUSEO && window.MUSEO.piezas) || [];
    for (var i = 0; i < piezas.length; i++) {
      if (piezas[i].slug === slug && piezas[i].portada) return piezas[i].portada;
    }
    return slug + ".jpg";
  }

  /* Devuelve una promesa con la ruta de la foto, o null si no existe. */
  function buscar(slug) {
    if (!cache[slug]) {
      cache[slug] = new Promise(function (resolver) {
        var url = rutaDe(slug);
        var img = new Image();
        img.onload = function () { resolver(url); };
        img.onerror = function () { resolver(null); };
        img.src = url;
      });
    }
    return cache[slug];
  }

  /* Pone la foto dentro de un elemento que tenga data-portada="<slug>". */
  function vestir(el) {
    var slug = el.getAttribute("data-portada");
    if (!slug) return;
    buscar(slug).then(function (url) {
      if (!url || el.querySelector("img.portada")) return;
      var img = document.createElement("img");
      img.className = "portada";
      img.src = url;
      img.alt = "";
      img.decoding = "async";
      el.appendChild(img);
      el.classList.add("con-foto");
    });
  }

  function vestirTodo(raiz) {
    var els = (raiz || document).querySelectorAll("[data-portada]");
    for (var i = 0; i < els.length; i++) vestir(els[i]);
  }

  return { buscar: buscar, vestir: vestir, vestirTodo: vestirTodo };
})();
