/* ==========================================================================
   COLECCIÓN DEL MUSEO DE LA NOSTALGIA
   Todo el contenido del museo vive en este archivo. Las dos páginas
   (la pared y el recorrido) se arman leyendo estos datos.

   Para agregar una pieza: copia un bloque de `piezas`, cambia los textos
   y guarda su portada como  img/portadas/<slug>.jpg
   ========================================================================== */

window.MUSEO = {

  entrada: {
    kicker: "Colección permanente · 2009 – 2015",
    titulo: "Lo que leíamos",
    subtitulo: "cuando nadie nos miraba",
    texto: "La literatura juvenil que formó a la generación de Wattpad: los libros que se prestaban en el salón, se escondían bajo el cuaderno y se terminaban a las tres de la mañana."
  },

  alas: [
    { id: "distopias", numero: "I", nombre: "Las distopías", corto: "Distopías",
      lema: "Donde el mundo se acaba y aun así hay tiempo para elegir entre dos muchachos." },
    { id: "sobrenatural", numero: "II", nombre: "Lo sobrenatural", corto: "Sobrenatural",
      lema: "Criaturas inmortales con problemas estrictamente de colegio." },
    { id: "dolor", numero: "III", nombre: "El dolor bonito", corto: "El dolor bonito",
      lema: "Cuando aprendimos que un libro también podía ser un duelo." },
    { id: "fundacional", numero: "IV", nombre: "Sala fundacional", corto: "Fundacional",
      lema: "La obra que hizo lectores a todos los que visitan las otras salas." }
  ],

  /* motivo: brasas | anillos | rejilla | seda | luna | trazos | ala | horizonte | arco
     (es la obra abstracta que se ve mientras no haya portada) */
  piezas: [
    {
      slug: "los-juegos-del-hambre", ala: "distopias",
      titulo: "Los Juegos del Hambre", autor: "Suzanne Collins",
      anio: "2008", fecha: "2008 (ed. española 2009)",
      motivo: "brasas", colores: ["#8e2f17", "#2b0f0c"],
      curaduria: [
        "La pieza que abrió el ala y, con ella, la década. Convirtió la distopía en conversación de pasillo y le enseñó a una generación entera que un libro podía doler y acelerarse al mismo tiempo.",
        "Lo que se exhibe aquí no es solo la novela: es el momento en que leer dejó de ser tarea y se volvió urgencia. La gente terminaba el primer tomo y salía a buscar el segundo el mismo día."
      ],
      ficha: {
        tecnica: "Tapa blanda, lomo partido a la mitad",
        procedencia: "Donación de quien leyó los tres libros en una semana de vacaciones",
        estado: "Regular. Esquinas dobladas como señaladores"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2012",
        texto: "La adaptación mejor resuelta del período. Respetó el tono político del libro en vez de suavizarlo, y puso en el centro a una heroína de acción adolescente que no estaba ahí para ser rescatada.",
        meta: "2012 · dir. Gary Ross · saga de 4 películas hasta 2015"
      },
      pistas: [
        { titulo: "Safe & Sound", artista: "Taylor Swift con The Civil Wars" },
        { titulo: "Abraham's Daughter", artista: "Arcade Fire" },
        { titulo: "Atlas", artista: "Coldplay" },
        { titulo: "Yellow Flicker Beat", artista: "Lorde" }
      ]
    },
    {
      slug: "divergente", ala: "distopias",
      titulo: "Divergente", autor: "Veronica Roth",
      anio: "2011", fecha: "2011",
      motivo: "anillos", colores: ["#1f3b4d", "#0b1620"],
      curaduria: [
        "Cinco facciones y una pregunta que se volvió test de personalidad antes de que los tests de personalidad fueran contenido de redes.",
        "Se leía por la trama y se discutía por la identidad: la pieza documenta el momento en que los lectores empezaron a usar los libros para describirse a sí mismos."
      ],
      ficha: {
        tecnica: "Edición de bolsillo con frases subrayadas a lápiz",
        procedencia: "Donación de quien hizo el test para saber a qué facción pertenecía",
        estado: "Bueno. Tercer tomo sin terminar"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2014",
        texto: "Caso de estudio de cómo se agotó la fórmula. La taquilla fue cayendo película tras película y la cuarta entrega nunca llegó a rodarse: la saga quedó inconclusa en pantalla, con los lectores esperando un final que solo existe en papel.",
        meta: "2014 · dir. Neil Burger · saga interrumpida: la cuarta película nunca se hizo"
      },
      pistas: [
        { titulo: "Beating Heart", artista: "Ellie Goulding" },
        { titulo: "Dead in the Water", artista: "Ellie Goulding" },
        { titulo: "Find You", artista: "Zedd con Matthew Koma y Miriam Bryant" }
      ]
    },
    {
      slug: "correr-o-morir", ala: "distopias",
      titulo: "Correr o morir", autor: "James Dashner",
      anio: "2009", fecha: "2009",
      motivo: "rejilla", colores: ["#2f4034", "#0d1310"],
      curaduria: [
        "El laberinto como estructura y como excusa. Muchos llegaron por el tráiler y se quedaron por la sensación de no entender nada durante doscientas páginas, que era justamente el punto.",
        "Marca también un cambio de industria: a partir de aquí, la adaptación al cine dejó de ser consecuencia del éxito y empezó a ser parte del plan."
      ],
      ficha: {
        tecnica: "Préstamo de biblioteca nunca devuelto",
        procedencia: "Donación de quien lo leyó para llegar antes que la película",
        estado: "Aceptable. Portada con el reparto del cine"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2014",
        texto: "Completó su trilogía en pantalla, algo que Divergente no logró. Se apoyó en música orquestal y no en canciones pop, lo que la dejó fuera de la economía de las bandas sonoras que definió a sus competidoras.",
        meta: "2014 · dir. Wes Ball · trilogía completa hasta 2018 · música de John Paesano"
      },
      pistas: []
    },
    {
      slug: "la-seleccion", ala: "distopias",
      titulo: "La Selección", autor: "Kiera Cass",
      anio: "2012", fecha: "2012",
      motivo: "seda", colores: ["#8d4f68", "#2a1420"],
      curaduria: [
        "Distopía con vestidos. La pieza demuestra que el género no siempre fue sobre derrocar gobiernos: a veces era sobre elegir, y sobre defender esa elección frente a desconocidos en internet.",
        "Se exhibe junto a las demás distopías a propósito, para que se note lo ancho que llegó a ser ese rótulo."
      ],
      ficha: {
        tecnica: "Saga completa comprada en orden desordenado",
        procedencia: "Donación de quien defendía a Maxon en los foros",
        estado: "Excelente. Nunca se prestó a nadie"
      },
      adaptacion: {
        estado: "no", sello: "Nunca adaptada",
        texto: "Pieza de la sala de las adaptaciones que nunca ocurrieron. The CW grabó dos pilotos y no recogió ninguno. Años después Netflix anunció una película y terminó cancelando el proyecto. La saga sigue existiendo solo en papel.",
        meta: "Sin adaptación · 2 pilotos fallidos en The CW · película de Netflix cancelada"
      },
      pistas: []
    },
    {
      slug: "crepusculo", ala: "sobrenatural",
      titulo: "Crepúsculo", autor: "Stephenie Meyer",
      anio: "2005", fecha: "2005 · fiebre 2008–2012",
      motivo: "luna", colores: ["#3a3550", "#0e0c18"],
      curaduria: [
        "La pieza más visitada del museo y la que menos gente admite haber visitado. Fundó el vocabulario sentimental de la década y la costumbre de dividirse en bandos por un personaje.",
        "También concentra el desprecio con que se trató durante años a la literatura leída mayoritariamente por mujeres jóvenes. Esa parte de la historia se exhibe sin retoques."
      ],
      ficha: {
        tecnica: "Tapa dura, relectura compulsiva",
        procedencia: "Donación de quien todavía no admite en voz alta que lo releyó",
        estado: "Deteriorado por uso. Páginas marcadas con esquina doblada"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2008",
        texto: "La adaptación que convirtió el romance juvenil en negocio de franquicia: un estreno por año y bandas sonoras de grupos alternativos que de pronto sonaban en todas partes.",
        meta: "2008 · dir. Catherine Hardwicke · 5 películas hasta 2012"
      },
      pistas: [
        { titulo: "Decode", artista: "Paramore" },
        { titulo: "Supermassive Black Hole", artista: "Muse" },
        { titulo: "Flightless Bird, American Mouth", artista: "Iron & Wine" },
        { titulo: "Possibility", artista: "Lykke Li" }
      ]
    },
    {
      slug: "ciudad-de-hueso", ala: "sobrenatural",
      titulo: "Ciudad de hueso", autor: "Cassandra Clare",
      anio: "2007", fecha: "2007",
      motivo: "trazos", colores: ["#2d2a46", "#120f1f"],
      curaduria: [
        "Primera entrega de Cazadores de Sombras. Nació en el mundo del fanfiction y volvió a él.",
        "Es la pieza que mejor explica cómo escribir en internet dejó de ser un hobby menor y se volvió una puerta de entrada real a la publicación: el camino que después recorrería Wattpad completo."
      ],
      ficha: {
        tecnica: "Saga leída fuera de orden cronológico",
        procedencia: "Donación de quien llegó por el fanfic y se quedó por el canon",
        estado: "Bueno. Árbol genealógico dibujado en la contraportada"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2013",
        texto: "Fracasó en taquilla y la secuela ya anunciada se canceló. Tres años después la historia volvió como serie de televisión con otro reparto: una de las piezas del museo que fue adaptada dos veces, y que funcionó mejor la segunda.",
        meta: "2013 · dir. Harald Zwart · secuela cancelada · reiniciada como serie en 2016"
      },
      pistas: [
        { titulo: "Almost Is Never Enough", artista: "Ariana Grande con Nathan Sykes" },
        { titulo: "Heart by Heart", artista: "Demi Lovato" }
      ]
    },
    {
      slug: "hush-hush", ala: "sobrenatural",
      titulo: "Hush, Hush", autor: "Becca Fitzpatrick",
      anio: "2009", fecha: "2009",
      motivo: "ala", colores: ["#43303a", "#130d12"],
      curaduria: [
        "Ángeles caídos y tensión en clase de biología. La pieza se exhibe sin juicio: era el libro que se escondía bajo el cuaderno, y esa clandestinidad también es parte de la obra.",
        "Documenta un hábito que hoy se perdió: leer a escondidas, en papel, sin que quedara registro en ninguna parte."
      ],
      ficha: {
        tecnica: "Lectura bajo el pupitre",
        procedencia: "Donación de quien lo leía en clase de matemáticas",
        estado: "Regular. Forrado con papel de cuaderno"
      },
      adaptacion: {
        estado: "no", sello: "Nunca adaptada",
        texto: "Segunda pieza de la sala de las adaptaciones que nunca ocurrieron. Los derechos se vendieron, hubo anuncios, hubo fechas de rodaje y hubo fans eligiendo reparto en internet. La película nunca se filmó.",
        meta: "Sin adaptación · derechos vendidos y rodaje anunciado en varias ocasiones"
      },
      pistas: []
    },
    {
      slug: "bajo-la-misma-estrella", ala: "dolor",
      titulo: "Bajo la misma estrella", autor: "John Green",
      anio: "2012", fecha: "2012",
      motivo: "horizonte", colores: ["#1e4a52", "#08171a"],
      curaduria: [
        "El cierre del ciclo adolescente: ya no hay vampiros ni arenas, solo dos personas y un final que se sabe desde el principio.",
        "Marca el paso de la fantasía al realismo que duele, y con él la salida de la infancia lectora de toda una generación."
      ],
      ficha: {
        tecnica: "Tapa blanda con manchas de agua, páginas 280–300",
        procedencia: "Donación de quien lloró en el bus",
        estado: "Bueno. Frases transcritas en una libreta aparte"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2014",
        texto: "Costó una fracción de lo que costaban las sagas de fantasía y recaudó más de veinte veces su presupuesto. Su banda sonora funcionó como la última gran playlist compartida de la generación: se escuchaba completa, en orden, llorando.",
        meta: "2014 · dir. Josh Boone"
      },
      pistas: [
        { titulo: "All I Want", artista: "Kodaline" },
        { titulo: "Boom Clap", artista: "Charli XCX" },
        { titulo: "Not About Angels", artista: "Birdy" },
        { titulo: "Wait", artista: "M83" }
      ]
    },
    {
      slug: "percy-jackson", ala: "fundacional",
      titulo: "Percy Jackson y el ladrón del rayo", autor: "Rick Riordan",
      anio: "2005", fecha: "2005 (ed. española 2006)",
      motivo: "anillos", colores: ["#1d4f6e", "#0a1a26"],
      curaduria: [
        "La otra puerta de entrada. Mientras una mitad de la generación esperaba la carta de Hogwarts, la otra descubría que los dioses griegos seguían vivos y tenían hijos con déficit de atención y dislexia.",
        "Convirtió la mitología en lectura de recreo y demostró que un protagonista podía ser chistoso, inseguro y heroico al mismo tiempo. Muchos aprendieron quién era Medusa antes de verlo en clase."
      ],
      ficha: {
        tecnica: "Saga de cinco tomos, más las que vinieron después",
        procedencia: "Donación de quien todavía sabe en qué cabaña lo habrían puesto",
        estado: "Bueno. Mapa del Campamento Mestizo copiado a mano"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2010",
        texto: "Pieza adaptada dos veces. Las películas cambiaron tanto la historia que los lectores las rechazaron y la saga se detuvo en la segunda. Años después volvió como serie, esta vez con el autor involucrado, como reparación pedida por los propios fans.",
        meta: "2010 · dir. Chris Columbus · secuela en 2013 · reiniciada como serie en 2023"
      },
      pistas: [
        { titulo: "Highway to Hell", artista: "AC/DC" },
        { titulo: "Poker Face", artista: "Lady Gaga" }
      ]
    },
    {
      slug: "harry-potter", ala: "fundacional",
      titulo: "Harry Potter", autor: "J. K. Rowling",
      anio: "1997–2007", fecha: "1997–2007",
      motivo: "arco", colores: ["#4a3a1c", "#0f0c08"],
      curaduria: [
        "Anterior al período de la colección y, sin embargo, su condición de posibilidad.",
        "Sin esta pieza no habría filas en librerías, ni sagas de siete tomos, ni una generación acostumbrada a esperar un libro como se espera un estreno. Todo lo que se exhibe en las otras salas ocurre después de aquí."
      ],
      ficha: {
        tecnica: "Siete tomos, tres ediciones distintas, un solo lector",
        procedencia: "Donación de la generación entera",
        estado: "Variable. El cuarto tomo no sobrevivió"
      },
      adaptacion: {
        estado: "si", sello: "Adaptada 2001",
        texto: "Ocho películas en diez años, con el mismo reparto creciendo en pantalla. Estableció el modelo que todas las piezas de las otras salas intentaron repetir, y que pocas consiguieron sostener hasta el final.",
        meta: "2001–2011 · 8 películas · música de John Williams en las tres primeras"
      },
      pistas: [
        { titulo: "Hedwig's Theme", artista: "John Williams" },
        { titulo: "Do the Hippogriff", artista: "The Weird Sisters" },
        { titulo: "O Children", artista: "Nick Cave and the Bad Seeds" }
      ]
    }
  ],

  muro2014: {
    numero: "V", nombre: "El muro de 2014", corto: "Muro 2014",
    lema: "Donde la generación guardaba lo que sentía: texto blanco sobre una foto desenfocada.",
    nota: "Reconstrucción museográfica. Ninguna imagen de archivo original se exhibe aquí: lo que se conserva es el formato, no el contenido ajeno.",
    posts: [
      { frase: "leer para no estar aquí", notas: "14.892", tags: "#books #soft grunge #2014", colores: ["#6b7f8c", "#2a333c"] },
      { frase: "nadie me entiende como este libro a las 3 a.m.", notas: "8.431", tags: "#bookblr #mine #late night", colores: ["#a88b7d", "#3b2d2a"] },
      { frase: "mi generación aprendió a sentir en tapa blanda", notas: "22.107", tags: "#quotes #ya lit #aesthetic", colores: ["#8d7fa3", "#2e2639"] },
      { frase: "terminé la saga y ahora no sé qué hacer con mi vida", notas: "5.776", tags: "#book hangover #help", colores: ["#7f9480", "#263029"] },
      { frase: "era más fácil cuando el mundo cabía en siete tomos", notas: "31.540", tags: "#nostalgia #childhood #hp", colores: ["#b08a95", "#3a2a30"] },
      { frase: "escribí mi primera historia aquí y nadie la leyó nunca", notas: "2.019", tags: "#wattpad #writing #old post", colores: ["#6f8396", "#232c35"] }
    ]
  },

  testimonios: {
    titulo: "El museo lo terminan los visitantes",
    texto: "Última sala del recorrido: los recuerdos de quienes leyeron estos libros cuando salieron. La nostalgia no está en las piezas, está en lo que la gente cuenta de ellas.",
    cita: "Lo leí en el bus del colegio, en el puesto de atrás, y me pasé la parada tres veces esa semana.",
    pendiente: "Formulario de testimonios · pendiente de conectar"
  }
};
