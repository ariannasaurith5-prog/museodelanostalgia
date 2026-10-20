/* ==========================================================================
   RECORRIDO
   1. Arma las salas desde los datos de js/coleccion.js
   2. Navegación: rueda del mouse -> avance horizontal, flechas, plano
   3. Profundidad: los cuadros se desplazan e inclinan según su distancia al centro
   4. Vitrina: pieza ampliada con adaptación, banda sonora y ficha
   5. Audioguía con la voz del navegador
   6. Polvo en suspensión (canvas)
   7. Enlaces directos: recorrido.html#<slug> abre esa pieza
   ========================================================================== */

(function () {
  "use strict";

  var M = window.MUSEO;
  var sala = document.getElementById("sala");
  var navSalas = document.getElementById("salas");
  var plano = document.getElementById("plano");
  var ubicacion = document.getElementById("ubicacion");
  var suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function lienzoHTML(p) {
    return '<span class="lienzo m-' + esc(p.motivo) + '" data-portada="' + esc(p.slug) +
      '" style="--c1:' + esc(p.colores[0]) + ";--c2:" + esc(p.colores[1]) + '"></span>';
  }

  /* ---------------- 1. Armar las salas ---------------- */

  function entrada() {
    var e = M.entrada;
    return '<section class="panel entrada" data-parada data-tipo="rotulo">' +
      '<p class="kicker">' + esc(e.kicker) + "</p>" +
      "<h1>" + esc(e.titulo) + " <span>" + esc(e.subtitulo) + "</span></h1>" +
      "<p>" + esc(e.texto) + "</p>" +
      '<p class="meta">' + M.piezas.length + " piezas · " + (M.alas.length + 1) + " alas · Audioguía y banda sonora</p>" +
      '<p class="avanza"><i></i> Avanza hacia la derecha</p>' +
      "</section>";
  }

  function rotulo(numero, nombre, lema) {
    return '<section class="panel rotulo" data-parada data-tipo="rotulo">' +
      '<p class="num">Ala ' + esc(numero) + "</p>" +
      "<h2>" + esc(nombre) + "</h2>" +
      "<p>" + esc(lema) + "</p>" +
      "</section>";
  }

  function pieza(p) {
    return '<article class="panel pieza" data-parada data-tipo="pieza" data-slug="' + esc(p.slug) + '" id="pieza-' + esc(p.slug) + '">' +
      '<button class="obra" type="button" aria-label="Entrar en la pieza: ' + esc(p.titulo) + '">' +
        '<span class="sello" data-estado="' + esc(p.adaptacion.estado) + '">' + esc(p.adaptacion.sello) + "</span>" +
        '<span class="marco">' + lienzoHTML(p) + '<span class="entrar">Entrar en la pieza</span></span>' +
      "</button>" +
      '<div class="reflejo" aria-hidden="true">' + lienzoHTML(p) + "</div>" +
      '<div class="cartela"><h3>' + esc(p.titulo) + '</h3><p class="autor"><b>' + esc(p.autor) + "</b> · " + esc(p.fecha) + "</p></div>" +
      "</article>";
  }

  function muro() {
    var mu = M.muro2014;
    var posts = mu.posts.map(function (x) {
      return '<figure class="post">' +
        (x.imagen
          ? '<div class="foto" style="padding:0;filter:none;background:#ddd"><img src="' + esc(x.imagen) + '" alt="" loading="lazy" style="position:relative;z-index:1;width:100%;height:100%;object-fit:cover;display:block"></div>'
          : '<div class="foto" style="--f1:' + esc(x.colores[0]) + ";--f2:" + esc(x.colores[1]) + '"><span>' + esc(x.frase) + "</span></div>") +
        '<figcaption class="notas"><i aria-hidden="true">↻</i> <b>' + esc(x.notas) + "</b> notas</figcaption>" +
        '<p class="tags">' + esc(x.tags) + "</p>" +
        "</figure>";
    }).join("");
    return '<section class="panel muro2014" data-parada data-tipo="rotulo">' +
      '<p class="kicker">Sala de documentos · reconstrucción</p>' +
      '<div class="rejilla">' + posts + "</div>" +
      (mu.nota ? '<p class="cita">' + esc(mu.nota) + "</p>" : "") +
      "</section>";
  }

  function testimonios() {
    var t = M.testimonios;
    return '<section class="panel testimonios" id="testimonios" data-parada data-tipo="rotulo">' +
      '<p class="kicker">Sala de testimonios</p>' +
      "<h2>" + esc(t.titulo) + "</h2>" +
      "<p>" + esc(t.texto) + "</p>" +
      '<p class="cita">«' + esc(t.cita) + "»</p>" +
      (t.pendiente ? '<p class="pendiente">' + esc(t.pendiente) + "</p>" : "") +
      "</section>";
  }

  var partes = [entrada()];
  var accesos = [["Entrada", 0]];
  M.alas.forEach(function (ala) {
    accesos.push([ala.numero + " · " + ala.corto, partes.length]);
    partes.push(rotulo(ala.numero, ala.nombre, ala.lema));
    M.piezas.forEach(function (p) { if (p.ala === ala.id) partes.push(pieza(p)); });
  });
  accesos.push([M.muro2014.numero + " · " + M.muro2014.corto, partes.length]);
  partes.push(rotulo(M.muro2014.numero, M.muro2014.nombre, M.muro2014.lema));
  partes.push(muro());
  partes.push(testimonios());
  sala.innerHTML = partes.join("");

  var paradas = [].slice.call(sala.querySelectorAll("[data-parada]"));
  var piezasEls = [].slice.call(sala.querySelectorAll(".pieza"));
  var marcos = [].slice.call(sala.querySelectorAll(".pieza .marco"));
  var porSlug = {};
  M.piezas.forEach(function (p) { porSlug[p.slug] = p; });
  var nombres = paradas.map(function (p) {
    var h = p.querySelector("h1, h2, h3");
    return h ? h.textContent.trim() : "Sala";
  });

  Portadas.vestirTodo(sala);

  /* ---------------- 2. Navegación ---------------- */

  function ir(i, instantaneo) {
    var d = paradas[i];
    if (!d) return;
    d.scrollIntoView({ behavior: suave && !instantaneo ? "smooth" : "auto", inline: "center", block: "nearest" });
  }

  var botones = accesos.map(function (a) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = a[0];
    b.dataset.ir = a[1];
    b.addEventListener("click", function () { ir(a[1]); });
    navSalas.appendChild(b);
    return b;
  });

  var puntos = paradas.map(function (p, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.tipo = p.dataset.tipo;
    b.setAttribute("aria-label", "Ir a " + nombres[i]);
    b.addEventListener("click", function () { ir(i); });
    plano.appendChild(b);
    return b;
  });

  sala.addEventListener("wheel", function (e) {
    if (e.deltaY === 0 || e.shiftKey) return;
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    if (e.target.closest(".rejilla")) return; // el muro de 2014 se recorre hacia abajo
    e.preventDefault();
    sala.scrollLeft += e.deltaY;
  }, { passive: false });

  /* ---------------- 3. Profundidad y ubicación ---------------- */

  var actual = 0, pedido = false;
  function pintar() {
    pedido = false;
    var centro = sala.scrollLeft + sala.clientWidth / 2, cerca = 0, dist = Infinity;
    paradas.forEach(function (p, i) {
      var d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - centro);
      if (d < dist) { dist = d; cerca = i; }
    });
    actual = cerca;
    ubicacion.textContent = nombres[cerca];
    puntos.forEach(function (b, i) { b.setAttribute("aria-current", i === cerca ? "true" : "false"); });
    var ala = 0;
    accesos.forEach(function (a) { if (a[1] <= cerca) ala = a[1]; });
    botones.forEach(function (b) { b.setAttribute("aria-current", +b.dataset.ir === ala ? "true" : "false"); });
    if (suave) {
      marcos.forEach(function (m) {
        var d = m.getBoundingClientRect().left + m.offsetWidth / 2 - window.innerWidth / 2;
        m.style.transform = "translateX(" + (d * 0.05).toFixed(1) + "px) rotateY(" + (-d * 0.008).toFixed(2) + "deg)";
      });
    }
  }
  sala.addEventListener("scroll", function () {
    if (!pedido) { pedido = true; requestAnimationFrame(pintar); }
  }, { passive: true });
  window.addEventListener("resize", pintar);

  /* ---------------- 4. Vitrina ---------------- */

  var vitrina = document.getElementById("vitrina");
  var v = {
    marco: document.getElementById("vitrina-marco"),
    sala: document.getElementById("vitrina-sala"),
    titulo: document.getElementById("vitrina-titulo"),
    credito: document.getElementById("vitrina-credito"),
    cuerpo: document.getElementById("vitrina-cuerpo"),
    film: document.getElementById("vitrina-film"),
    filmMeta: document.getElementById("vitrina-film-meta"),
    pistas: document.getElementById("vitrina-pistas"),
    bloquePistas: document.getElementById("bloque-pistas"),
    ficha: document.getElementById("vitrina-ficha")
  };
  var bAudio = document.getElementById("audioguia");
  var abierta = -1, ultimoFoco = null;

  function nombreAla(id) {
    for (var i = 0; i < M.alas.length; i++) {
      if (M.alas[i].id === id) return "Ala " + M.alas[i].numero + " · " + M.alas[i].nombre;
    }
    return "";
  }

  function fijarHash(slug) {
    try {
      history.replaceState(null, "", slug ? "#" + slug : location.pathname + location.search);
    } catch (e) { /* algunos visores no lo permiten */ }
  }

  function abrir(i) {
    var el = piezasEls[i];
    if (!el) return;
    var p = porSlug[el.dataset.slug];
    if (abierta === -1) ultimoFoco = document.activeElement;
    abierta = i;

    v.marco.innerHTML = lienzoHTML(p);
    Portadas.vestir(v.marco.querySelector(".lienzo"));
    v.sala.textContent = nombreAla(p.ala);
    v.titulo.textContent = p.titulo;
    v.credito.textContent = p.autor + " · " + p.fecha;

    v.cuerpo.innerHTML = "";
    p.curaduria.forEach(function (texto) {
      var n = document.createElement("p");
      n.className = "cuerpo";
      n.textContent = texto;
      v.cuerpo.appendChild(n);
    });

    v.film.textContent = p.adaptacion.texto;
    v.filmMeta.textContent = p.adaptacion.meta;

    v.pistas.innerHTML = "";
    v.bloquePistas.hidden = p.pistas.length === 0;
    p.pistas.forEach(function (pista, n) {
      var li = document.createElement("li");
      li.innerHTML =
        '<span class="n">' + String(n + 1).padStart(2, "0") + "</span>" +
        '<span class="t">' + esc(pista.titulo) + "</span>" +
        '<span class="a">' + esc(pista.artista) + "</span>" +
        '<a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/search/' +
          encodeURIComponent(pista.titulo + " " + pista.artista) + '">Escuchar</a>';
      v.pistas.appendChild(li);
    });

    v.ficha.innerHTML = "";
    [["Técnica", "tecnica"], ["Procedencia", "procedencia"], ["Estado", "estado"]].forEach(function (par) {
      var dt = document.createElement("dt");
      dt.textContent = par[0];
      var dd = document.createElement("dd");
      dd.textContent = p.ficha[par[1]];
      v.ficha.appendChild(dt);
      v.ficha.appendChild(dd);
    });

    pararAudio();
    vitrina.scrollTop = 0;
    vitrina.dataset.abierta = "true";
    fijarHash(p.slug);
    document.getElementById("cerrar").focus();
  }

  function cerrar() {
    if (abierta === -1) return;
    vitrina.dataset.abierta = "false";
    pararAudio();
    ir(paradas.indexOf(piezasEls[abierta]));
    var destino = ultimoFoco && document.contains(ultimoFoco) ? ultimoFoco : piezasEls[abierta].querySelector(".obra");
    if (destino && destino.focus) destino.focus();
    abierta = -1;
    fijarHash(null);
  }

  piezasEls.forEach(function (el, i) {
    el.querySelector(".obra").addEventListener("click", function () { abrir(i); });
  });
  document.getElementById("cerrar").addEventListener("click", cerrar);
  vitrina.addEventListener("click", function (e) { if (e.target === vitrina) cerrar(); });
  document.getElementById("siguiente").addEventListener("click", function () {
    abrir((abierta + 1) % piezasEls.length);
  });

  /* ---------------- 5. Audioguía ---------------- */

  var sintesis = window.speechSynthesis || null;
  function pararAudio() {
    if (sintesis) { try { sintesis.cancel(); } catch (e) {} }
    bAudio.classList.remove("sonando");
    bAudio.textContent = "▶ Audioguía";
  }
  bAudio.addEventListener("click", function () {
    if (!sintesis) { bAudio.textContent = "Audioguía no disponible en este navegador"; return; }
    if (bAudio.classList.contains("sonando")) { pararAudio(); return; }
    var p = porSlug[piezasEls[abierta].dataset.slug];
    var texto = p.titulo + ". " + p.autor + ". " + p.curaduria.join(" ") + " Sobre la adaptación. " + p.adaptacion.texto;
    var u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    u.rate = 0.95;
    u.onend = pararAudio;
    u.onerror = pararAudio;
    bAudio.classList.add("sonando");
    bAudio.textContent = "■ Detener audioguía";
    try { sintesis.speak(u); } catch (e) { pararAudio(); }
  });

  document.addEventListener("keydown", function (e) {
    if (vitrina.dataset.abierta === "true") {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") { e.preventDefault(); abrir((abierta + 1) % piezasEls.length); }
      if (e.key === "ArrowLeft") { e.preventDefault(); abrir((abierta - 1 + piezasEls.length) % piezasEls.length); }
      return;
    }
    if (e.key === "ArrowRight") { e.preventDefault(); ir(Math.min(actual + 1, paradas.length - 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); ir(Math.max(actual - 1, 0)); }
  });

  /* ---------------- 6. Polvo en suspensión ---------------- */

  var cv = document.getElementById("polvo"), cx = cv.getContext("2d"), motas = [], anim = 0;
  function medir() {
    var r = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = window.innerWidth * r;
    cv.height = window.innerHeight * r;
    cx.setTransform(r, 0, 0, r, 0, 0);
    var n = Math.round(Math.min(window.innerWidth, 1400) / 16);
    motas = [];
    for (var i = 0; i < n; i++) {
      motas.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3, vx: (Math.random() - 0.5) * 0.12, vy: -Math.random() * 0.16 - 0.03,
        a: Math.random() * 0.4 + 0.08
      });
    }
  }
  function mover() {
    cx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < motas.length; i++) {
      var m = motas[i];
      m.x += m.vx; m.y += m.vy;
      if (m.y < -4) { m.y = window.innerHeight + 4; m.x = Math.random() * window.innerWidth; }
      if (m.x < -4) m.x = window.innerWidth + 4;
      if (m.x > window.innerWidth + 4) m.x = -4;
      cx.beginPath();
      cx.arc(m.x, m.y, m.r, 0, 6.283);
      cx.fillStyle = "rgba(150,115,60," + (m.a * 0.6).toFixed(3) + ")";
      cx.fill();
    }
    anim = requestAnimationFrame(mover);
  }
  if (suave) { medir(); mover(); window.addEventListener("resize", medir); }
  else { cv.style.display = "none"; }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { cancelAnimationFrame(anim); pararAudio(); }
    else if (suave) { cancelAnimationFrame(anim); mover(); }
  });

  /* ---------------- 7. Enlaces directos desde la pared ---------------- */

  function desdeHash() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (!h) return;
    for (var i = 0; i < piezasEls.length; i++) {
      if (piezasEls[i].dataset.slug === h) {
        ir(paradas.indexOf(piezasEls[i]), true);
        abrir(i);
        return;
      }
    }
    var destino = document.getElementById(h);
    if (destino && paradas.indexOf(destino) > -1) ir(paradas.indexOf(destino), true);
  }
  window.addEventListener("hashchange", desdeHash);

  pintar();
  desdeHash();
})();
