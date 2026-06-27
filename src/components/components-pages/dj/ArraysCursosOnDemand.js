// Lista de Cursos para componente de Cursos Dinamicos

import produccionInicial from "./img/produccion-inicial.jpg";
import produccionInicialSamples from "./img/cursos-dissidents/erwi-AJ3r-NL28PI-unsplash.jpg";
import produccionAvanzadaProgressive from "./img/cursos-dissidents/duncan-kidd-89IypmbKhZI-unsplash.jpg";
import produccionInermedia from "./img/cursos-dissidents/elijah-ekdahl-8bEjYHFhSUo-unsplash.jpg";
import produccionAvanzadaMelodicTechno from "./img/cursos-dissidents/techivation-a8QFpNkJojI-unsplash.jpg";
import mezclaYMasterizacion from "./img/cursos-dissidents/mezcla-y-masterizacion.jpg";

const produccionInicial2 = undefined;


export const ArrayCursos = [
    {   
        // IMPORTANTE: el id y nombre deben contener 
        // las mismas palabras y el mismo orden
        id: "curso-de-produccion-inicial",
        pathname: "/produccion-musical",
        titulo:"Curso de Producción Inicial",
        cursoId: "HHTzk47PSIBMEkoxHoux",
        nombre: "Curso de Producción Inicial",
        img: produccionInicialSamples,//undefined,//
        imgHeader: undefined,//headerProduccionInicial,
        imgSecundaria: produccionInicial2,
        imgGaleria: [produccionInicial, produccionInicial, produccionInicial, produccionInicial, produccionInicial, produccionInicial],
        descipcion:"Creá tu propia música desde cero, utilizando Ableton Live. En esta capacitación desarrollaremos temas sobre uso de sintetizadores, samplers, efectos, conceptos básicos de teoría musical (escalas, acordes y progresiones armónicas), creaciones de patrones rítmicos, estructura, mezcla y mastering básico para poder finalizar tu proyecto musical.",
        informacionCurso: [
            {
                titulo: "Aprende a Crear Tracks Desde Cero Usando Ableton Live",
                descripcion: "Aprenderas a utilizar Ableton Live, uno de los DAWs más populares en la industria musical. Desde la configuración inicial hasta la exportación final, te guiaremos paso a paso para que puedas crear tus propias producciones musicales de manera eficiente y profesional."
            },
            {
                titulo: "Domina el Uso de Samples y Sonidos Originales",
                descripcion: "Aprende a utilizar sonidos pregrabados de manera creativa para dar vida a tus ideas. Aprenderas las técnicas más efectivas para transformar cualquier muestra en un sonido único."
            },
            {
                titulo: "Manejo del Ecualizador y Diseño Sonoro",
                descripcion: "Aprenderas cómo usar el ecualizador para darle claridad y balance a tu mezcla. Entiende cómo ajustar frecuencias para que cada elemento de tu track suene en su lugar."
            },
            {
                titulo: "Estructura de un Track y Elementos que lo Componen",
                descripcion: "Construiras un track completo, te enseñaremos cómo estructurar un track, desde la introducción hasta el drop. Aprende sobre los diferentes elementos de un track (bajo, percusión, sintetizadores, efectos, etc.) y cómo integrarlos para lograr una producción sólida y fluida."
            },
            {
                titulo: "Material de Práctica para Mejorar Tu Técnica",
                descripcion: "Accede a material práctico diseñado para perfeccionar tus habilidades, además de plantillas y recursos que te ayudarán a seguir desarrollando tu técnica y estilo propio en cada producción."
            }
        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en videos de 30 minutos c/u aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "curso-de-produccion-avanzado-progressive-house",
        pathname: "/produccion-musical",
        titulo:"Curso de Producción Avanzado - Progressive House",
        cursoId: "ZdaaZwWyzN6K63Ln502a",
        nombre: "Curso de Producción Avanzado - Progressive House",
        img: produccionAvanzadaProgressive,//mezclaYMaster,
        imgHeader: undefined,//headerMixingMasteing,
        imgSecundaria: undefined,//mezclaYMaster,
        imgGaleria: [undefined],
        descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, panoramización, efectos como delay y reverb, son algunos de los temas en donde profundizaremos el contenido.",
        informacionCurso: [
            {
                titulo: "Diseña un Track de Progressive House Desde Cero",
                descripcion: "Aprenderás el flujo completo de producción: desde la idea inicial hasta el armado del proyecto en Ableton Live. Verás cómo organizar pistas, seleccionar sonidos y definir el groove para crear un track coherente y profesional."
            },
            {
                titulo: "Técnicas para Crear Texturas y Profundidad",
                descripcion: "Domina técnicas de diseño sonoro, capas y efectos para sumar riqueza y atmósfera a tus producciones. Aprenderás a construir espacios, ambientes y detalles que hacen que el progressive house se sienta envolvente y emocional."
            },
            {
                titulo: "Momentos, Build-Ups y Cambios Dinámicos",
                descripcion: "Descubrirás cómo estructurar el track en secciones que generen tensión, evolución y energía. Te enseñaremos a construir build-ups, drops, fillers y transiciones que mantengan al oyente atrapado hasta el final."
            },
            {
                titulo: "Material Exclusivo y Proyectos de Clase",
                descripcion: "Accederás al proyecto, samples y recursos para practicar las técnicas vistas en el curso. Podrás abrir el proyecto, analizarlo y aplicarlo en tus propias producciones."
            },
            {
                titulo: "Mezcla y Mastering desde Cero",
                descripcion: "Aprenderás a equilibrar frecuencias, volúmenes y dinámicas para que tu track suene limpio, profesional y listo para su distribución. Veremos cómo llevar una mezcla al siguiente nivel y cómo aplicar mastering adecuado para el género."
            }
        ],

        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en videos de 30 minutos a 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "Proyecto completo en Ableton Live", "", ""]}],
    },
    {   
        id: "curso-de-produccion-intermedio",
        pathname: "/produccion-musical",
        titulo:"Curso de Producción Intermedio",
        cursoId: "9x2pU83yx7t9mi0l4Gjy",
        nombre: "Curso de Producción Intermedio",
        img: produccionInermedia,//mezclaYMaster,
        imgHeader: undefined,//headerMixingMasteing,
        imgSecundaria: undefined,//mezclaYMaster,
        imgGaleria: [undefined],
        descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, panoramización, efectos como delay y reverb, son algunos de los temas en donde profundizaremos el contenido.",
        informacionCurso: [
            {
                titulo: "Pasa Tu Idea Musical a un Track Real",
                descripcion: "Aprenderás cómo llevar una idea o inspiración al entorno de producción. Verás cómo comenzar un proyecto, organizar tus primeras pistas y empezar a construir un track dentro de Ableton Live."
            },
            {
                titulo: "Construye Ritmos que Complementen Tu Música",
                descripcion: "Descubrirás cómo trabajar ritmos y bases que sostengan tu track. Aprenderás a elegir sonidos, editar patrones y crear un groove que le dé movimiento a la producción."
            },
            {
                titulo: "Explora Nuevas Herramientas: Simpler, Drum Rack y MIDI",
                descripcion: "Verás cómo utilizar herramientas esenciales para la producción electrónica, como el Simpler, el Drum Rack y efectos MIDI. Entenderás cómo estas herramientas te permiten moldear ideas de forma más creativa y flexible."
            },
            {
                titulo: "Diseña Tu Sonido con Conceptos de Síntesis",
                descripcion: "Introducción a la síntesis y al diseño sonoro. Aprenderás a crear y modificar sonidos usando controles simples, explorando cómo construir líneas de bajo, leads y texturas."
            },
            {
                titulo: "Mejora Tu Track con Mezcla y Limitación",
                descripcion: "Vas a aprender a mejorar el balance general del track ajustando niveles, limpiando elementos y aplicando limitación. El objetivo es lograr un resultado más prolijo, claro y listo para compartir."
            }
        ],

        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en videos de 15 minutos a 40 minutos aprox", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "curso-de-produccion-avanzado-melodic-techno",
        pathname: "/produccion-musical",
        titulo:"Curso de Producción Avanzado - Melodic Techno",
        cursoId: "3JrMxAbb1x3O4yvsK3dz",
        nombre: "Curso de Producción Avanzado - Melodic Techno",
        img: produccionAvanzadaMelodicTechno,//mezclaYMaster,
        imgHeader: undefined,//headerMixingMasteing,
        imgSecundaria: undefined,//mezclaYMaster,
        imgGaleria: [undefined],
        descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, panoramización, efectos como delay y reverb, son algunos de los temas en donde profundizaremos el contenido.",
        informacionCurso: [
            {
                titulo: "Descubre Cómo Evoluciona un Track de Melodic Techno",
                descripcion: "Analizaremos cómo se desarrolla un track completo dentro del género. Verás cómo se construye la evolución, cómo se introducen elementos y cómo se mantienen el interés y la energía a lo largo del proyecto."
            },
            {
                titulo: "Construye Momentos de Energía y Transición",
                descripcion: "Exploraremos cómo funcionan los cambios de energía, los build-ups, drops y momentos clave dentro del Melodic Techno. Aprenderás cómo conectar secciones con transiciones que mantienen la tensión y la coherencia."
            },
            {
                titulo: "Agrega Percusión que Sume Movimiento y Profundidad",
                descripcion: "Descubrirás el rol de la percusión secundaria y cómo aporta groove, relleno y sensación de movimiento continuo. Analizaremos cómo elegir sonidos y cómo integrarlos dentro del proyecto existente."
            },
            {
                titulo: "Da Identidad a Tu Track con Melodías y Capas",
                descripcion: "Veremos cómo las melodías, arpegios, pads y texturas construyen la atmósfera emocional característica del género. Identificaremos cómo las capas agregan personalidad y dirección al track."
            },
            {
                titulo: "Analiza Qué Hace Único a Cada Canal del Proyecto",
                descripcion: "Revisaremos canal por canal qué elementos forman el track, qué función cumple cada uno y con qué instrumento se creó. Entenderás cómo cada pieza del proyecto contribuye al resultado final."
            }
        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clase única en video, de 2:21:00 horas", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "curso-de-mezcla-y-masterizacion",
        pathname: "/mezcla-y-masterizacion",
        titulo:"Curso de Mezcla y Masterización",
        cursoId: "DXCDJzYnt5xE5MhT61sn",
        nombre: "Curso de Mezcla y Masterización",
        img: mezclaYMasterizacion,//mezclaYMaster,
        imgHeader: undefined,//headerMixingMasteing,
        imgSecundaria: undefined,//mezclaYMaster,
        imgGaleria: [undefined],
        descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, saturación armónica, son algunos de los temas en donde profundizaremos el contenido.",
        informacionCurso: [
            {
                titulo: "Logra un Balance Profesional en Tu Mezcla",
                descripcion: "Aprenderás a equilibrar todos los elementos de tu track para que convivan de forma clara y definida. Veremos cómo distribuir frecuencias, niveles y panoramas para obtener una mezcla sólida y profesional."
            },
            {
                titulo: "Controla la Dinámica y la Energía del Track",
                descripcion: "Exploraremos el uso de compresión, automatización y procesamiento dinámico para mantener la energía y el impacto. Entenderás cómo dar consistencia sin perder movimiento ni expresividad."
            },
            {
                titulo: "Consigue Pegada y Claridad en la Base Rítmica",
                descripcion: "Trabajaremos el kick y el bajo para lograr una base firme y contundente. Aprenderás técnicas para evitar conflictos en graves y conseguir una mezcla limpia, potente y bien definida."
            },
            {
                titulo: "Limpia y Potencia Cada Elemento con EQ",
                descripcion: "Veremos cómo ecualizar correctamente cada sonido para eliminar conflictos y resaltar lo importante. Aprenderás a esculpir frecuencias para lograr claridad y definición en todo el track."
            },
            {
                titulo: "Finaliza Tu Track con un Mastering Profesional",
                descripcion: "Analizaremos el proceso de mastering paso a paso: limitación, saturación, control de loudness y balance final. Entenderás cómo preparar tu track para que suene competitivo en cualquier sistema."
            }
        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en videos de 15 minutos a 30 minutos aprox", "Aprendé sin horarios fijos", "Material de estudio para consultar", "Proyecto completo en Ableton Live", ""]}],
    },
];