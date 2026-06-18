import type { Game } from "@/lib/types";

export const games: Game[] = [
  {
    id: "g-wukong", slug: "black-myth-wukong", title: "Black Myth: Wukong",
    studio: "Game Science", publisher: "Game Science",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["accion", "rpg"],
    status: "actualizado", releaseDate: "2024-08-20", releaseLabel: "Disponible",
    summary: "El action RPG basado en Viaje al Oeste llega por fin a Xbox Series X|S con todo su contenido y parches de rendimiento.",
    description: [
      "Black Myth: Wukong adapta la novela clásica china con un sistema de combate ágil, transformaciones místicas y batallas contra jefes monumentales que desafían al jugador.",
      "La versión de Xbox incluye todas las optimizaciones gráficas y correcciones acumuladas desde el lanzamiento inicial, logrando un rendimiento pulido en consolas de Microsoft."
    ],
    tags: ["souls-like", "mitología", "un jugador", "acción"],
    editorialScore: 8.8, communityScore: 9.2, hypeCount: 48210,
    similarIds: ["g-elden", "g-mhwilds"], updateNote: "Lanzamiento en Xbox Series X|S confirmado.", seed: "wukong",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900_2x.jpg"
  },
  {
    id: "g-stellar", slug: "stellar-blade", title: "Stellar Blade",
    studio: "Shift Up", publisher: "Sony Interactive",
    platformIds: ["pc", "ps5"], genreIds: ["accion"],
    status: "disponible", releaseDate: "2025-06-11", releaseLabel: "Disponible",
    summary: "El hack and slash de Shift Up llega a PC con combates sumamente intensos, soporte técnico avanzado y gran estilo visual.",
    description: [
      "Stellar Blade combina combate elegante, exploración vertical y una dirección artística deslumbrante en un futuro postapocalíptico desolador.",
      "La versión de PC ofrece un port sumamente cuidado que cuenta con frame rate desbloqueado, soporte ultrawide y tecnologías de escalado de última generación."
    ],
    tags: ["hack and slash", "un jugador", "acción", "femenina"],
    editorialScore: 8.2, communityScore: 8.5, hypeCount: 21750,
    similarIds: ["g-wukong", "g-mhwilds"], updateNote: null, seed: "stellar",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3489700/header.jpg"
  },
  {
    id: "g-gta6", slug: "gta-6", title: "Grand Theft Auto VI",
    studio: "Rockstar Games", publisher: "Rockstar Games",
    platformIds: ["ps5", "xsx"], genreIds: ["mundo-abierto", "accion"],
    status: "proximo", releaseDate: "2026-11-19", releaseLabel: "19 nov 2026",
    summary: "El regreso a Vice City más esperado de la década, presentando a dos protagonistas en un mundo masivo, vivo y en constante cambio.",
    description: [
      "Grand Theft Auto VI introduce a Lucía y Jason en el estado de Leonida, entregando una simulación de mundo abierto y densidad social nunca antes vistas en el medio.",
      "Rockstar promete elevar los estándares narrativos y jugables combinando crimen, sátira social e interacciones orgánicas de nueva generación."
    ],
    tags: ["open world", "crimen", "AAA", "acción"],
    editorialScore: null, communityScore: null, hypeCount: 982300,
    similarIds: ["g-cyberpunk", "g-elden"], updateNote: "Fecha de lanzamiento confirmada.", seed: "gtavi",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png"
  },
  {
    id: "g-hades2", slug: "hades-ii", title: "Hades II",
    studio: "Supergiant Games", publisher: "Supergiant Games",
    platformIds: ["pc", "switch", "switch2"], genreIds: ["indie", "accion", "rpg"],
    status: "actualizado", releaseDate: "2025-09-25", releaseLabel: "1.0 disponible",
    summary: "La secuela del aclamado roguelike de Supergiant Games sale de Early Access con su versión 1.0, agregando su verdadero acto final.",
    description: [
      "Hades II nos pone en la piel de Melinoë, la princesa del Inframundo, en una cruzada de hechicería contra el titán del tiempo, Cronos.",
      "La versión 1.0 completa la historia principal, equilibra todas las bendiciones divinas e incorpora nuevos desafíos endgame."
    ],
    tags: ["roguelike", "mitología", "indie", "acción"],
    editorialScore: 9.3, communityScore: 9.5, hypeCount: 65400,
    similarIds: ["g-split", "g-helldivers"], updateNote: "Versión 1.0 lanzada con final completo.", seed: "hades2",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg"
  },
  {
    id: "g-elden", slug: "elden-ring-nightreign", title: "Elden Ring: Nightreign",
    studio: "FromSoftware", publisher: "Bandai Namco",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["accion", "rpg", "coop"],
    status: "disponible", releaseDate: "2025-05-30", releaseLabel: "Disponible",
    summary: "Un spin-off oficial enfocado en cooperativo y supervivencia que traslada el combate característico de FromSoftware a partidas en equipo.",
    description: [
      "Elden Ring: Nightreign reimagina las Tierras Intermedias bajo una estructura roguelite para hasta tres jugadores aliados.",
      "Enfrentá hordas de enemigos formidables y jefes implacables mientras recolectás equipamiento dinámico bajo un ciclo de noche eterna."
    ],
    tags: ["souls-like", "cooperativo", "roguelite", "acción"],
    editorialScore: 8.5, communityScore: 8.0, hypeCount: 88120,
    similarIds: ["g-wukong", "g-helldivers"], updateNote: null, seed: "nightreign",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2622380/header.jpg"
  },
  {
    id: "g-cyberpunk", slug: "cyberpunk-2077", title: "Cyberpunk 2077",
    studio: "CD Projekt RED", publisher: "CD Projekt RED",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["rpg", "accion", "mundo-abierto"],
    status: "disponible", releaseDate: "2020-12-10", releaseLabel: "Disponible",
    summary: "El aclamado RPG de ciencia ficción de CD Projekt RED brilla tras la actualización 2.0 y su expansión Phantom Liberty.",
    description: [
      "Cyberpunk 2077 te sumerge en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal.",
      "El juego ha sido rediseñado por completo en su sistema de habilidades, combate vehicular e inteligencia policial, convirtiéndose en el benchmark visual definitivo de PC."
    ],
    tags: ["cyberpunk", "rpg", "mundo abierto", "disparos"],
    editorialScore: 9.0, communityScore: 8.9, hypeCount: 220000,
    similarIds: ["g-gta6", "g-cyberpunk"], updateNote: "Edición Ultimate disponible en tiendas.", seed: "cyberpunk",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg"
  },
  {
    id: "g-helldivers", slug: "helldivers-2", title: "Helldivers 2",
    studio: "Arrowhead Game Studios", publisher: "Sony Interactive",
    platformIds: ["pc", "ps5"], genreIds: ["shooter", "coop"],
    status: "actualizado", releaseDate: "2024-02-08", releaseLabel: "Live service",
    summary: "El shooter cooperativo PvE definitivo que mantiene su caótica guerra galáctica por la Democracia Gestionada.",
    description: [
      "Helldivers 2 para PC y PS5 combina una jugabilidad de acción cooperativa desenfrenada con humor satírico y fuego amigo caótico.",
      "La última actualización agrega armamento avanzado de apoyo, biomas áridos peligrosos y desafíos cooperativos globales contra los autómatas."
    ],
    tags: ["cooperativo", "shooter", "PvE", "acción"],
    editorialScore: 8.9, communityScore: 8.4, hypeCount: 53200,
    similarIds: ["g-elden", "g-mhwilds"], updateNote: "Nueva actualización 'Escalada de la Libertad'.", seed: "helldivers2",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg"
  },
  {
    id: "g-mhwilds", slug: "monster-hunter-wilds", title: "Monster Hunter Wilds",
    studio: "Capcom", publisher: "Capcom",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["accion", "rpg", "coop"],
    status: "disponible", releaseDate: "2025-02-28", releaseLabel: "Disponible",
    summary: "La consagrada saga de caza de Capcom introduce ecosistemas dinámicos de mundo abierto y transiciones de clima extremas.",
    description: [
      "Monster Hunter Wilds lleva la jugabilidad cooperativa de caza a un nivel orgánico sin precedentes, donde las manadas y el terreno influyen directamente.",
      "Usa tu montura Seikret para moverte con fluidez, equipa múltiples armas sobre la marcha y lánzate a misiones dinámicas sin pantallas de carga."
    ],
    tags: ["caza", "cooperativo", "rpg", "acción"],
    editorialScore: 8.8, communityScore: 8.7, hypeCount: 71200,
    similarIds: ["g-wukong", "g-elden"], updateNote: "Parches de rendimiento multijugador aplicados.", seed: "mhwilds",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2246340/header.jpg"
  },
  {
    id: "g-metroid", slug: "metroid-prime-4", title: "Metroid Prime 4: Beyond",
    studio: "Retro Studios", publisher: "Nintendo",
    platformIds: ["switch", "switch2"], genreIds: ["accion", "aventura"],
    status: "proximo", releaseDate: "2026-09-04", releaseLabel: "4 sep 2026",
    summary: "Samus Aran regresa para enfrentar una nueva amenaza en una entrega que expandirá los horizontes técnicos de Nintendo Switch.",
    description: [
      "Metroid Prime 4: Beyond retoma la icónica exploración en primera persona con escaneo de entornos, plataformas y combate contra piratas espaciales.",
      "El título sacará partido del nuevo hardware de Nintendo para ofrecer una tasa de cuadros estable a 60 fps y un apartado artístico soberbio."
    ],
    tags: ["ciencia ficción", "primera persona", "aventura", "un jugador"],
    editorialScore: null, communityScore: null, hypeCount: 132400,
    similarIds: ["g-stellar", "g-wukong"], updateNote: "Confirmado para la sucesora de Nintendo Switch.", seed: "metroid4",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/48/Metroid_Prime_4_Beyond_cover_art.png"
  },
  {
    id: "g-silenthill", slug: "silent-hill-f", title: "Silent Hill f",
    studio: "NeoBards Entertainment", publisher: "Konami",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["terror", "aventura"],
    status: "proximo", releaseDate: "2026-03-13", releaseLabel: "13 mar 2026",
    summary: "Un giro refrescante y tétrico para la franquicia, trasladando el horror al Japón rural de la década de 1960.",
    description: [
      "Silent Hill f cuenta una historia completamente nueva escrita por Ryukishi07, creador de las famosas novelas visuales When They Cry.",
      "El terror psicológico se entrelaza con una belleza melancólica de flores carnívoras e infecciones fúngicas que consumen a sus habitantes."
    ],
    tags: ["survival horror", "terror", "narrativo", "misterio"],
    editorialScore: null, communityScore: null, hypeCount: 74300,
    similarIds: ["g-stellar", "g-cyberpunk"], updateNote: null, seed: "silenthillf",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2947440/header.jpg"
  },
  {
    id: "g-doom", slug: "doom-the-dark-ages", title: "DOOM: The Dark Ages",
    studio: "id Software", publisher: "Bethesda Softworks",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["shooter", "accion"],
    status: "proximo", releaseDate: "2025-10-14", releaseLabel: "14 oct 2025",
    summary: "La precuela de acción desenfrenada que narra el origen de la furia del Doom Slayer en un entorno de fantasía oscura medieval.",
    description: [
      "DOOM: The Dark Ages cuenta con un Slayer más pesado y brutal, equipado con un escudo de sierra y armas propulsadas por calaveras.",
      "id Software promete batallas aéreas a bordo del meca Atlan y combates contra dragones cibernéticos montables en una escala descomunal."
    ],
    tags: ["FPS", "acción", "gore", "metal"],
    editorialScore: null, communityScore: null, hypeCount: 145000,
    similarIds: ["g-helldivers", "g-elden"], updateNote: "Tráiler oficial de gameplay revelado.", seed: "doomdark",
    coverUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3017860/header.jpg"
  },
  {
    id: "g-forza6", slug: "forza-horizon-6", title: "Forza Horizon 6",
    studio: "Playground Games", publisher: "Xbox Game Studios",
    platformIds: ["pc", "xsx"], genreIds: ["carreras", "mundo-abierto"],
    status: "disponible", releaseDate: "2026-05-14", releaseLabel: "Disponible",
    summary: "La saga de Playground Games lleva el Festival Horizon a Japón, con la ciudad de Tokio y rutas montañosas como telón de fondo.",
    description: [
      "Forza Horizon 6 presenta el mapa más detallado y extenso de la saga, con más de 550 modelos de autos y climas dinámicos que transforman la conducción en segundos.",
      "La ambientación japonesa incluye detalles culturales como máquinas expendedoras, autos con volante a la derecha y Shibuya fielmente recreada."
    ],
    tags: ["carreras", "mundo abierto", "coches", "exploración"],
    editorialScore: 9.5, communityScore: 8.5, hypeCount: 142800,
    similarIds: ["g-cyberpunk", "g-mhwilds"], updateNote: "Lanzamiento disponible con 550+ autos y climas dinámicos.", seed: "forza6",
    coverUrl: "https://www.levelup.com/resizer/v2/IMEDT4I6JVGWBFDDF6JUSFKQ74.jpg?auth=21e1a609e60e3f0017b1846d42508d8e2d8f0779db43519663100efce409318d&smart=true&width=900&height=506&quality=70"
  },
  {
    id: "g-007", slug: "007-first-light", title: "007 First Light",
    studio: "IO Interactive", publisher: "IO Interactive",
    platformIds: ["pc", "ps5", "xsx"], genreIds: ["accion", "aventura"],
    status: "disponible", releaseDate: "2026-03-27", releaseLabel: "Disponible",
    summary: "IO Interactive reimagina al agente 007 en una aventura de espionaje con infiltración sandbox y combate cuerpo a cuerpo dinámico.",
    description: [
      "007 First Light captura la fantasía del espionaje con gadgets clásicos como el reloj hackeable y un sistema de infiltración que premia la creatividad del jugador.",
      "La historia presenta a un James Bond joven interpretado por Patrick Gibson, con misiones que equilibran sigilo, combate y exploración de locaciones exóticas."
    ],
    tags: ["espionaje", "sigilo", "acción", "AAA"],
    editorialScore: 9.0, communityScore: 8.8, hypeCount: 78900,
    similarIds: ["g-stellar", "g-cyberpunk"], updateNote: "El mejor juego de James Bond en décadas según Level Up.", seed: "007",
    coverUrl: "https://www.levelup.com/resizer/v2/ZZWMCYXEQVEZ5JFDLBXWZKRHRE.jpg?auth=21854152d2e9b883380fab584373764ec877a147257dc16472fbed35847a74f5&smart=true&width=900&height=503&quality=70"
  },
  {
    id: "g-dbd", slug: "dead-by-daylight", title: "Dead by Daylight",
    studio: "Behaviour Interactive", publisher: "Behaviour Interactive",
    platformIds: ["pc", "ps4", "ps5", "xsx", "switch"], genreIds: ["terror", "coop", "multiplayer"],
    status: "actualizado", releaseDate: "2016-06-14", releaseLabel: "10.° aniversario",
    summary: "El multijugador asimétrico de Behaviour Interactive celebra una década con colaboración de Jason Voorhees, Five Nights at Freddy's y más.",
    description: [
      "Dead by Daylight enfrenta a un asesino controlado por un jugador contra cuatro supervivientes en mapas procedurales con ganchos, generadores y sacrificios.",
      "La versión actual incluye capítulos crossover con Viernes 13, Resident Evil, Silent Hill, Castlevania, Stranger Things y Alien."
    ],
    tags: ["terror", "asimétrico", "multiplayer", "supervivencia"],
    editorialScore: 8.5, communityScore: 9.1, hypeCount: 95400,
    similarIds: ["g-doom", "g-silenthill"], updateNote: "Jason Voorhees debut + 60% descuento en Steam por 10.° aniversario.", seed: "dbd",
    coverUrl: "https://www.levelup.com/resizer/v2/4IWR6ZQATNHELF6NB6ALFLPKFA.jpg?auth=3e507645598e6383a661743c55fb3688a53d1d1d68e0d0ce247974fcee9fe6ef&focal=666%2C395&width=900&height=525&quality=70"
  }
];

export function gameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function gameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}
