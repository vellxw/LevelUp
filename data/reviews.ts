import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  {
    id: "r-wukong", slug: "black-myth-wukong", gameId: "g-wukong",
    title: "Black Myth: Wukong - Una carta de presentación monumental para el gaming chino",
    editorialScore: 8.8, userScore: 9.1, author: "Camila Acosta",
    dateISO: "2026-06-12T09:00:00Z", platformTested: "PC",
    pros: ["Combate ágil y extremadamente satisfactorio", "Batallas contra jefes memorables y visualmente impactantes", "Dirección artística espectacular inspirada en el budismo"],
    cons: ["Diseño de niveles y exploración algo pasillero", "Picos de dificultad abruptos en ciertos jefes secundarios"],
    verdict: "Un debut de acción ambicioso que se sostiene sobre su magnífico sistema de combate y enfrentamientos espectaculares. Un título que deja huella.",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg",
    body: [
      "Black Myth: Wukong entiende perfectamente sus virtudes: cada jefe final representa un despliegue de imaginación visual y maestría jugable que exige reflejos de acero.",
      "El sistema de transformaciones míticas y los conjuros basados en la leyenda china añaden una profundidad táctica que premia la experimentación constante.",
      "A nivel técnico, es un absoluto deleite en PC y su adaptación a consolas mantiene el nivel con parches constantes."
    ]
  },
  {
    id: "r-stellar", slug: "stellar-blade", gameId: "g-stellar",
    title: "Stellar Blade: Estilo de combate deslumbrante y filo impecable en PC",
    editorialScore: 8.2, userScore: 8.5, author: "Diego Ferreyra",
    dateISO: "2026-06-06T09:00:00Z", platformTested: "PC",
    pros: ["Combate vistoso basado en parry sumamente preciso", "Dirección de arte atractiva de ciencia ficción", "Excelente optimización y port para PC de salida"],
    cons: ["La historia decae en su segunda mitad", "Exploración de áreas semiabiertas algo genérica"],
    verdict: "Un hack and slash de acción soberbio con marcada identidad coreana que brilla con luz propia gracias a su sistema de combate fluido y exigente.",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3489700/header.jpg",
    body: [
      "Stellar Blade destaca por su jugabilidad adictiva que premia el timing perfecto de bloqueos y esquivas de última milésima de segundo.",
      "El paso a PC trae consigo mejoras gráficas contundentes, frame rate ilimitado y soporte para ultra-panorámicos que hacen lucir su mundo cyberpunk en su máximo esplendor."
    ]
  },
  {
    id: "r-hades2", slug: "hades-ii", gameId: "g-hades2",
    title: "Hades II: La princesa del Inframundo perfecciona un roguelike impecable",
    editorialScore: 9.3, userScore: 9.5, author: "Mariana Quiroz",
    dateISO: "2026-06-08T09:00:00Z", platformTested: "PC",
    pros: ["Combate más profundo con mecánicas de brujería y magia", "Escritura de personajes, actuaciones y música sobresalientes", "Nivel de rejugabilidad masivo y pulido"],
    cons: ["Curva de dificultad inicial algo elevada para primerizos"],
    verdict: "Una secuela monumental que expande y supera a su laureado predecesor en cada apartado jugable y narrativo. Una joya imprescindible de Supergiant.",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg",
    body: [
      "Hades II reinventa la experiencia original introduciendo a Melinoë y una baraja de habilidades mágicas que modifican de raíz el ritmo del combate tradicional.",
      "La versión definitiva 1.0 cierra el arco narrativo de forma espectacular, entregando un final conmovedor y desafíos adicionales que enriquecen su robusto endgame."
    ]
  },
  {
    id: "r-mhwilds", slug: "monster-hunter-wilds", gameId: "g-mhwilds",
    title: "Monster Hunter Wilds: La cacería evoluciona hacia un mundo orgánico y hostil",
    editorialScore: 8.8, userScore: 8.7, author: "Diego Ferreyra",
    dateISO: "2026-06-01T09:00:00Z", platformTested: "PS5",
    pros: ["Ecosistemas dinámicos de clima severo e interacciones de fauna reales", "Multijugador cooperativo integrado de forma impecable", "Gran variedad de monstruos imponentes"],
    cons: ["Problemas de rendimiento gráfico en consolas base"],
    verdict: "Una evolución soberbia de la franquicia insignia de Capcom. Consigue hacer que el mundo se sientan verdaderamente salvaje y peligroso para todo cazador.",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg",
    body: [
      "Wilds integra ciclos climáticos y tormentas de arena dinámicas que modifican el comportamiento de los monstruos, agregando capas de inmersión inéditas.",
      "El cooperativo se siente más accesible y dinámico que nunca, permitiendo pedir ayuda a la comunidad sobre la marcha sin fricciones ni esperas."
    ]
  },
  {
    id: "r-cyberpunk", slug: "cyberpunk-2077", gameId: "g-cyberpunk",
    title: "Cyberpunk 2077: Redención total en la megalópolis definitiva de Night City",
    editorialScore: 9.0, userScore: 8.9, author: "Mariana Quiroz",
    dateISO: "2026-06-13T09:00:00Z", platformTested: "PC",
    pros: ["Night City luce espectacular en Next-Gen con trazado de rayos", "Historia adulta, inmersiva y personajes memorables", "Sistemas RPG totalmente rediseñados y pulidos"],
    cons: ["Consumo extremo de hardware en PC de gama media/baja"],
    verdict: "El juego de CD Projekt RED alcanza finalmente su estado de gracia. Una obra de rol y acción colosal, inmersiva y visualmente incomparable.",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
    body: [
      "Tras la gran actualización 2.0 y la aclamada expansión Phantom Liberty, Cyberpunk 2077 se consolida como uno de los mejores mundos abiertos RPG de la actualidad.",
      "Los sistemas de progresión, ciberimplantes e inteligencia artificial policial han sido reestructurados desde cero, entregando la fantasía urbana distópica definitiva."
    ]
  },
  {
    id: "r-forza6", slug: "forza-horizon-6", gameId: "g-forza6",
    title: "Forza Horizon 6: el mejor juego de la saga recorre Japón con un nivel de detalle sin precedentes",
    editorialScore: 9.5, userScore: 8.5, author: "Dan Villalobos",
    dateISO: "2026-05-14T09:00:00Z", platformTested: "Xbox Series X",
    pros: ["Mapa de Japón impresionante y lleno de detalles culturales", "Más de 550 modelos de autos disponibles", "El mejor apartado visual y sonoro de toda la saga", "Tokio es la ciudad más grande y ambiciosa creada por Playground Games", "La exploración recompensa constantemente al jugador"],
    cons: ["Se desaprovechó la oportunidad con la música japonesa", "El Festival Horizon ofrece pocas novedades", "Algunas actividades secundarias pueden sentirse repetitivas"],
    verdict: "Una celebración del automovilismo en tierras niponas. El mejor Forza Horizon hasta la fecha, una postal interactiva del Japón moderno.",
    coverUrl: "https://www.levelup.com/resizer/v2/IMEDT4I6JVGWBFDDF6JUSFKQ74.jpg?auth=21e1a609e60e3f0017b1846d42508d8e2d8f0779db43519663100efce409318d&smart=true&width=900&height=506&quality=70",
    body: [
      "Playground Games entendió que las propuestas de velocidad se tratan de competir, pero también de viajar y descubrir lugares. Forza Horizon 6 lleva el festival a Japón con una autenticidad sorprendente.",
      "La atención al detalle se nota en cosas pequeñas: autos con volante a la derecha, máquinas expendedoras en cada calle, y un clima dinámico que cambia la conducción de un día soleado a una tormenta en minutos.",
      "Con más de 550 autos, desde JDM clásicos hasta superdeportivos modernos, y un mundo abierto que recompensa la exploración, esta es la entrega más ambiciosa y completa de la saga."
    ]
  },
  {
    id: "r-007", slug: "007-first-light", gameId: "g-007",
    title: "007 First Light: el mejor juego de James Bond en décadas llega con infiltración sandbox",
    editorialScore: 9.0, userScore: 8.8, author: "Redacción LevelUp",
    dateISO: "2026-03-27T09:00:00Z", platformTested: "PlayStation 5",
    pros: ["Experiencia de espionaje de alto octanaje", "La infiltración fomenta la creatividad del jugador", "Combate cuerpo a cuerpo brutal y satisfactorio", "Patrick Gibson construye una versión fresca de Bond", "Campaña emocionante con mensaje contemporáneo"],
    cons: ["Las secuencias de conducción se sienten poco refinadas", "La inteligencia artificial enemiga es torpe por momentos", "Algunos villanos importantes se desarrollan torpemente"],
    verdict: "El mejor juego de James Bond en décadas. IO Interactive reinterpretó la fórmula del espionaje con identidad propia y fantasía cumplida.",
    coverUrl: "https://www.levelup.com/resizer/v2/ZZWMCYXEQVEZ5JFDLBXWZKRHRE.jpg?auth=21854152d2e9b883380fab584373764ec877a147257dc16472fbed35847a74f5&smart=true&width=900&height=503&quality=70",
    body: [
      "La principal fortaleza de 007 First Light es que, por fin, hay un juego que realmente te hace sentir dentro de una película de James Bond.",
      "La infiltración ofrece múltiples caminos creativos: gadgets como el reloj hackeable, teléfonos, encendedores y bolígrafos con tecnología de espionaje escondida.",
      "Las fases de obtención de inteligencia y exploración de oportunidades dan una sensación de descubrimiento orgánico, como si encontraras las rutas por mérito propio."
    ]
  },
  {
    id: "r-saros", slug: "saros", gameId: "g-stellar",
    title: "Saros: Housemarque eleva el action-roguelike con una propuesta cinematográfica ambiciosa",
    editorialScore: 8.5, userScore: 8.4, author: "Redacción LevelUp",
    dateISO: "2026-05-20T09:00:00Z", platformTested: "PlayStation 5",
    pros: ["Combate explosivo característico de Housemarque", "Apartado visual de nueva generación con identidad propia", "Sistema de progresión satisfactorio entre runs", "Campaña con peso narrativo inusual en el género"],
    cons: ["La curva de dificultad puede desalentar a nuevos jugadores", "Algunas mecánicas tardan en desbloquearse"],
    verdict: "Una evolución ambiciosa de Returnal que mantiene la intensidad de la franquicia con una capa narrativa más profunda y un enfoque cinematográfico.",
    coverUrl: "https://www.levelup.com/resizer/v2/NWWJLGZ36RDQZAOTQSRCFG5HBY.png?auth=8814bc541f7eaa5c53f502a13b843c9f0d0c590528d5947ad2b61b2f2dc7de11&smart=true&width=900&height=1200&quality=70",
    body: [
      "Housemarque toma la base de Returnal y construye una secuela espiritual con mayor profundidad narrativa y sistemas más pulidos.",
      "El apartado visual es de los mejores en exclusivos de PlayStation 5, con un diseño artístico sólido y momentos de impacto visual que se quedan en la memoria.",
      "La acción es tan intensa como cabría esperar del estudio, con un sistema de combate que premia la agresividad y el conocimiento de los patrones enemigos."
    ]
  },
  {
    id: "r-dbd", slug: "dead-by-daylight", gameId: "g-dbd",
    title: "Dead by Daylight cumple 10 años como el rey de los multijugadores asimétricos",
    editorialScore: 8.5, userScore: 9.1, author: "Redacción LevelUp",
    dateISO: "2026-06-14T09:00:00Z", platformTested: "PC",
    pros: ["Gameplay asimétrico único en su tipo", "Colaboraciones constantes con franquicias icónicas", "Comunidad fiel tras 10 años de soporte", "Récord histórico de jugadores simultáneos"],
    cons: ["Curva de entrada empinada para nuevos jugadores", "Progresión lenta sin DLC", "DLC cuesta额外的 por separado"],
    verdict: "Una década después de su debut, Dead by Daylight sigue siendo la experiencia multijugador de terror más influyente. Behaviour Interactive demostró que un live service puede envejecer bien.",
    coverUrl: "https://www.levelup.com/resizer/v2/4IWR6ZQATNHELF6NB6ALFLPKFA.jpg?auth=3e507645598e6383a661743c55fb3688a53d1d1d68e0d0ce247974fcee9fe6ef&focal=666%2C395&width=900&height=525&quality=70",
    body: [
      "Dead by Daylight demostró que es posible construir una comunidad duradera. El concepto asimétrico 1vs4 con ganchos, generadores y sacrificios sigue siendo fresco una década después.",
      "Las colaboraciones con Viernes 13, Resident Evil, Silent Hill, Castlevania, Stranger Things, Alien y Five Nights at Freddy's mantienen el catálogo vivo y atraen a nuevas audiencias.",
      "El aniversario 10 trae a Jason Voorhees, free-to-play temporal y descuento del 60%, celebrando por lo alto una de las trayectorias más sólidas del género."
    ]
  }
];

export function reviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}
export function reviewByGame(gameId: string): Review | undefined {
  return reviews.find((r) => r.gameId === gameId);
}
