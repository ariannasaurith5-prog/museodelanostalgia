/* ==========================================================================
   SALA PRINCIPAL · arma la pared de cuadros desde js/coleccion.js
   DISPOSICION decide qué cuadro va en cada fila, su tamaño (s, m, l, xl)
   y su moldura (dorado, negro, blanco, madera). Las piezas que no estén
   aquí se cuelgan solas en una fila extra al final.
   ========================================================================== */

(function () {
  "use strict";

  var M = window.MUSEO;

  var DISPOSICION = [
    [
      { pieza: "crepusculo", tam: "s", marco: "negro" },
      { pieza: "harry-potter", tam: "m", marco: "dorado" },
      { especial: "placa" },
      { pieza: "los-juegos-del-hambre", tam: "m", marco: "dorado" },
      { pieza: "divergente", tam: "s", marco: "negro" }
    ],
    [
      { pieza: "hush-hush", tam: "s", marco: "madera" },
      { pieza: "ciudad-de-hueso", tam: "m", marco: "blanco" },
      { pieza: "bajo-la-misma-estrella", tam: "l", marco: "dorado" },
      { pieza: "correr-o-morir", tam: "m", marco: "negro" },
      { pieza: "la-seleccion", tam: "s", marco: "madera" }
    ],
    [
      { especial: "fecha" },
      { pieza: "percy-jackson", tam: "m", marco: "dorado" },
      { especial: "entrar" },
      { especial: "cita" }
    ]
  ];

  /* pequeñas inclinaciones: ningún cuadro cuelga perfectamente recto */
  var GIROS = [-1.3, 0.8, -0.4, 1.1, -0.9, 0.5, -1.1, 0.9, -0.3, 1.2, -0.6, 0.7, -1.0];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var porSlug = {};
  M.piezas.forEach(function (p) { porSlug[p.slug] = p; });

  var COLGADOR =
    '<span class="colgador" aria-hidden="true">' +
    '<svg viewBox="0 0 100 24" preserveAspectRatio="none"><polyline points="4,24 50,2 96,24" vector-effect="non-scaling-stroke"/></svg>' +
    "<i></i></span>";

  var n = 0;
  function estilo() {
    var g = GIROS[n % GIROS.length];
    var s = "--giro:" + g + "deg;--i:" + n;
    n++;
    return s;
  }

  function cuadroPieza(p, tam, marco) {
    return '<a class="cuadro" href="recorrido.html#' + esc(p.slug) + '" data-tam="' + tam + '" data-marco="' + marco + '" style="' + estilo() + '">' +
      COLGADOR +
      '<span class="marco"><span class="paspartu">' +
        '<span class="lienzo m-' + esc(p.motivo) + '" data-portada="' + esc(p.slug) + '" style="--c1:' + esc(p.colores[0]) + ";--c2:" + esc(p.colores[1]) + '">' +
          '<span class="lienzo-titulo">' + esc(p.titulo) + "</span>" +
        "</span>" +
      "</span></span>" +
      '<span class="cartela"><b>' + esc(p.titulo) + "</b>" + esc(p.autor) + " · " + esc(p.anio) + "</span>" +
      "</a>";
  }

  function especial(tipo) {
    if (tipo === "placa") {
      return '<div class="cuadro placa" data-tam="xl" data-marco="dorado" style="' + estilo() + '">' + COLGADOR +
        '<span class="marco"><span class="paspartu"><span class="placa-contenido">' +
          '<span class="kicker">Colección permanente</span>' +
          "<h1>Museo de la <em>Nostalgia</em></h1>" +
          '<p class="lema">' + esc(M.entrada.titulo + " " + M.entrada.subtitulo) + "</p>" +
          '<p class="meta">' + M.piezas.length + " piezas · " + (M.alas.length + 1) + " alas · 2009–2015</p>" +
        "</span></span></span></div>";
    }
    if (tipo === "fecha") {
      return '<div class="cuadro" data-tam="s" data-marco="negro" style="' + estilo() + '">' + COLGADOR +
        '<span class="marco"><span class="paspartu"><span class="texto-enmarcado">' +
          '<span class="anios">2009<i>—</i>2015</span>' +
          '<span class="pie-texto">Período de la colección</span>' +
        "</span></span></span></div>";
    }
    if (tipo === "cita") {
      return '<div class="cuadro" data-tam="l" data-marco="blanco" style="' + estilo() + '">' + COLGADOR +
        '<span class="marco"><span class="paspartu"><span class="texto-enmarcado">' +
          "<q>" + esc(M.testimonios.cita) + "</q>" +
          '<span class="pie-texto">Sala de testimonios</span>' +
        "</span></span></span></div>";
    }
    if (tipo === "entrar") {
      return '<div class="entrada-bronce"><a class="placa-bronce" href="recorrido.html">Entrar al recorrido <span aria-hidden="true">→</span></a></div>';
    }
    return "";
  }

  var colgadas = {};
  var filas = DISPOSICION.map(function (fila) {
    return '<div class="fila">' + fila.map(function (c) {
      if (c.especial) return especial(c.especial);
      var p = porSlug[c.pieza];
      if (!p) return "";
      colgadas[p.slug] = true;
      return cuadroPieza(p, c.tam, c.marco);
    }).join("") + "</div>";
  });

  /* piezas nuevas que no estén en DISPOSICION */
  var TAM = ["m", "s", "m"], MARCO = ["negro", "dorado", "blanco", "madera"];
  var sueltas = M.piezas.filter(function (p) { return !colgadas[p.slug]; });
  if (sueltas.length) {
    filas.push('<div class="fila">' + sueltas.map(function (p, i) {
      return cuadroPieza(p, TAM[i % TAM.length], MARCO[i % MARCO.length]);
    }).join("") + "</div>");
  }

  var pared = document.getElementById("pared");
  pared.innerHTML = filas.join("");
  Portadas.vestirTodo(pared);

  document.getElementById("conteo").textContent = M.piezas.length + " piezas · 2009–2015";

  /* linterna que sigue al cursor */
  var linterna = document.querySelector(".linterna");
  if (window.matchMedia("(hover: hover)").matches) {
    var pedido = false, x = 0, y = 0;
    window.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY;
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(function () {
        linterna.style.setProperty("--x", x + "px");
        linterna.style.setProperty("--y", y + "px");
        pedido = false;
      });
    }, { passive: true });
  }
})();
