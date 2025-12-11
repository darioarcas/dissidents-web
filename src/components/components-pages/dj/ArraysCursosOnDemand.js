import djCdj from "./img/galeria-dj-cdj/dj-cdj-inicial-on-demand.png";
import djAvanzado from "./img/galeria-dj-avanzado/dj-avanzado-1.png";
import djTraktor from "./img/galeria-dj-traktor/curso-de-dj-con-traktor.png";
import djUrbano from "./img/galeria-dj-urbano/curso-de-dj-urbano-inicial.png";  
import headerDjCdj from "./img/galeria-dj-cdj/imgHeader.webp";
import headerDjTrktor from "./img/headerDjTraktor.jpg";
import headerDjUrbano from "./img/headerDjUrbano.jpg";
// import produccionInicial from "../produccion-musical/img/galeria-produccion-inicial/produccion-musical-1.jpg";
// import produccionInicial2 from "../produccion-musical/img/galeria-produccion-inicial/curso-de-produccion-musical-electronica-con-ableton-inicial.webp";
// import produccionAvanzada from "../produccion-musical/img/galeria-produccion-avanzada/produccion-musical-avanzada-1.jpeg";
// import teoriaMusical from "../produccion-musical/img/03.jpg";
// import mezclaYMaster from "../produccion-musical/img/galeria-mixing-mastering/mixing-mastering-1.avif"; 
// import headerProduccionInicial from "../produccion-musical/img/headerProduccionInicial.jpg"; 
// import headerProduccionAvanzada from "../produccion-musical/img/headerProduccionAvanzada.jpg"; 
// import headerMixingMasteing from "../produccion-musical/img/headerMixingMasteing.jpg"; 

const produccionInicial = undefined;
const produccionInicial2 = undefined;
const produccionAvanzada = undefined;
const teoriaMusical = undefined;
const mezclaYMaster = undefined;
const headerProduccionInicial = undefined;
const headerProduccionAvanzada = undefined;
const headerMixingMasteing = undefined;


export const ArrayCursos = [
    {   
        id: "curso-de-dj-con-cdj-pioneer-inicial",
        pathname: "/dj",
        titulo:"Curso de DJ con CDJ Pioneer Inicial",
        cursoId: "AZWe4N6HbE2KKM1XQiCC",
        nombre: "Curso de DJ con CDJ Pioneer Inicial",
        img: djCdj,
        imgHeader: headerDjCdj,
        imgSecundaria: undefined, //djCdj,
        imgGaleria: [djCdj, djAvanzado, djTraktor, djCdj, djCdj, djCdj],
        descipcion:"Si buscas iniciarte como DJ, en este curso vas a aprender todo lo necesario como sincronización, conexiones de equipamiento, uso de efectos, análisis y búsqueda de música, géneros musicales dentro de la electrónica, selección musical, warm up y mucho más para que estés listo al momento de una presentación.",
        informacionCurso: [
            {titulo: "Dominio de los equipos y sus funciones", descripcion:"Aprenderás a utilizar los CDJs Pioneer y el mixer profesional, entendiendo cada botón y característica esencial para una mezcla fluida."}, 
            {titulo: "Técnicas de mezcla", descripcion:"Desde cuadratura y sincronización hasta la ecualización precisa y la mezcla armónica, para crear transiciones profesionales."}, 
            {titulo: "Gestión y preparación musical", descripcion:"Cómo adquirir música adecuada según los géneros, preparar playlists, y usar herramientas como Rekordbox para análisis y configuración."}, 
            {titulo: "Uso de efectos y funciones especiales", descripcion:"Aprende a manejar efectos, CUE, Memory, y técnicas como el Vinyl Break para enriquecer tus sesiones."}, 
            {titulo: "Construcción del set y warm-up", descripcion:"Desarrolla habilidades para estructurar un set, preparar un calentamiento efectivo y manejar el flujo de trabajo en cabina."}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "curso-de-dj-con-cdj-pioneer-avanzado",
        pathname: "/dj",
        titulo:"Curso de DJ con CDJ Pioneer Avanzado",
        cursoId: "nps0NwWeiM0iNSi0eJKG",
        nombre: "Curso de DJ con CDJ Pioneer Avanzado",
        img: djCdj,
        img2: djAvanzado,
        imgHeader: headerDjCdj,
        imgSecundaria: undefined, //djAvanzado,
        imgGaleria: [djAvanzado, djAvanzado, djAvanzado, djAvanzado, djAvanzado, djAvanzado],
        descipcion:"Preparamos este curso para aquellos que ya son dj o han finalizado 'Dj con cdj' y busquen destacarse en sus presentaciones. Aprenderás a incorporar en tus sets el uso de samples, acapellas, combinación de efectos, apertura y cierre de set, configuración de los equipos; utilizando 3 o 4 cdj 's. También aprenderás a utilizar y conectar otros equipos tales como mixer xone 92/96 y la efectera RMX 1000 de Pioneer DJ.",
        informacionCurso: [
            {titulo: "Manejo Avanzado de Equipos Profesionales", descripcion:"Aprenderás a utilizar mixers de alta gama como el Xone 92 y 96, así como a integrar efectos avanzados mediante pedales de delay y reverb, optimizando la calidad sonora de tus sets."}, 
            {titulo: "Dominio del RMX 1000", descripcion:"Explorarás el potencial del RMX 1000, incluyendo su conexión con mixers como Xone y Pioneer, el uso de Isolator FX, X-Pad para samples, y efectos Release FX para enriquecer tus mezclas."}, 
            {titulo: "Técnicas de Mezcla Avanzadas", descripcion:"Desarrollarás habilidades de mezcla por oído y la capacidad de trabajar con tres compacteras simultáneamente, logrando transiciones dinámicas y creativas."}, 
            {titulo: "Uso de Acapellas y Samples", descripcion:"Incorporarás acapellas y samples en tus sets, perfeccionando tu capacidad para añadir capas únicas y personalizar cada presentación."}, 
            {titulo: "Optimización del Flujo de Trabajo", descripcion:"Diseñarás un flujo de trabajo eficiente que combine técnicas avanzadas y creatividad, logrando sets profesionales y perfectamente estructurados."}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],

    },
    {   
        id: "curso-de-dj-con-traktor",
        pathname: "/dj",
        titulo:"DJ con Traktor Pro Plus",
        cursoId: "xU8cTi81WXJIAP4vZBrE",
        nombre: "Curso de DJ con Traktor",
        img: djTraktor,
        imgHeader: headerDjTrktor,
        imgSecundaria: undefined, //djTraktor,
        imgGaleria: [djTraktor, djTraktor, djTraktor, djTraktor, djTraktor, djTraktor,],
        descipcion:"Diseñamos este curso para que puedas potenciar tu creatividad con las posibilidades que brinda Traktor Pro. Aprenderás a mezclar utilizando 4 decks, combinando efectos, agregando loops y samples, permitiéndote generar más dinamismo en tu set. También aprenderás a configurar y mapear el setup.",
        informacionCurso: [
            {titulo: "Instalación y configuración del software", descripcion:"Dominarás la instalación, configuración inicial y personalización de Traktor Pro Plus para adaptarlo a tus necesidades."}, 
            {titulo: "Tipos de mezcla y análisis de listas", descripcion:"Explorarás diferentes técnicas de mezcla y aprenderás a analizar y estructurar tus playlists para sets dinámicos y coherentes."}, 
            {titulo: "Uso creativo de herramientas avanzadas", descripcion:"Manejarás efectos, Hot Cues, Loops, el modo Slip y el secuenciador para añadir originalidad a tus sesiones"}, 
            {titulo: "Mapping y Remix Decks", descripcion:"Configurarás controladores MIDI mediante mapping y utilizarás Remix Decks para una experiencia de DJing más creativa."}, 
            {titulo: "Evaluación y desarrollo profesional", descripcion:"Realizarás prácticas evaluadas para aplicar lo aprendido y desarrollar un estilo único que potencie tu creatividad."}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],

    },
    {   
        id: "curso-de-dj-urbano-inicial",
        pathname: "/dj",
        titulo:"Curso de DJ Urbano con RekordBox",
        cursoId: "Ds4La90WmSxEzdyC3CuO",
        nombre: "Curso de DJ Urbano Inicial",
        img: djUrbano,
        imgHeader: headerDjUrbano,
        imgSecundaria: undefined, //djUrbano,
        imgGaleria: [djUrbano, djUrbano, djUrbano, djUrbano, djUrbano, djUrbano],
        descipcion:"Este curso está enfocado en técnicas y habilidades específicas para el DJing en géneros musicales populares en la cultura urbana, como el reggaetón, trap, hip-hop, R&B y otros estilos similares. Selección, organización, técnicas de mezclas, uso de loops y samples, equipos y software, lectura de público y desarrollo de estilo personal, son algunos de los temas que se desarrollan en el curso.",
        informacionCurso: [
            {titulo: "Cuadratura, sincronización y mezcla", descripcion:"Domina la estructura musical y aprende técnicas de  mezcla en 4 y 8 compases, esenciales para transiciones fluidas y dinámicas."}, 
            {titulo: "Uso avanzado de Rekordbox DJ", descripcion:"Maneja herramientas como análisis de pistas, grids, hotcues, ordenamiento y exportación/importación de listas, optimizando tu flujo de trabajo."}, 
            {titulo: "Técnicas de mezcla urbana y electrónica", descripcion:"Aprende a mezclar tracks con intros vocales, cortes precisos y estilos propios de los géneros urbanos, integrando efectos y combinaciones creativas (Pad FX)."}, 
            {titulo: "Exploración de géneros musicales", descripcion:"Familiarízate con los principales estilos de música electrónica y urbana para crear sets versátiles adaptados a diferentes públicos."}, 
            {titulo: "Preparación y desarrollo del DJ set", descripcion:"Aprende a estructurar un set profesional desde el warm-up hasta los momentos de mayor energía, utilizando equipo de alta gama como Pioneer DJ, Allen & Heath, y Native Instruments."}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],

    },
    {   
        id: "produccion-musical-electronica-con-ableton",
        pathname: "/produccion-musical",
        titulo:"Producción Musical Electrónica con Ableton",
        cursoId: "FtKt6g2fieCbOuqN64h8",
        nombre: "Curso de Produccion Musical Electronica con Ableton Inicial",
        img: undefined,//produccionInicial,
        imgHeader: headerProduccionInicial,
        imgSecundaria: produccionInicial2,
        imgGaleria: [produccionInicial, produccionInicial, produccionInicial, produccionInicial, produccionInicial, produccionInicial],
        descipcion:"Creá tu propia música desde cero, utilizando Ableton Live. En esta capacitación desarrollaremos temas sobre uso de sintetizadores, samplers, efectos, conceptos básicos de teoría musical (escalas, acordes y progresiones armónicas), creaciones de patrones rítmicos, estructura, mezcla y mastering básico para poder finalizar tu proyecto musical.",
        informacionCurso: [
            {titulo: "Fundamentos de producción y configuración del software", descripcion:"Aprende los conceptos esenciales de trabajo, configurando herramientas como Ableton Live para aprovechar su vista y secciones de manera efectiva."}, 
            {titulo: "Manejo de clips, sintetizadores y drum racks", descripcion:"Trabaja con clips de audio y MIDI, utiliza sintetizadores analógicos, y domina las partes y usos del Drum Rack para la creación de beats y melodías únicas."}, 
            {titulo: "Integración de efectos y plugins", descripcion:"Instala y utiliza VSTs, envolventes, y aplica efectos en canales MIDI y de audio para personalizar y enriquecer tus producciones."}, 
            {titulo: "Grabación y edición de audio", descripcion:"Explora la grabación de audio externo, el sampleo creativo, y la organización de tracks en la vista de arreglos (Arrangement View) para un flujo de trabajo eficiente."}, 
            {titulo: "Estructura, mezcla y masterización", descripcion:"Aprende a estructurar canciones, realizar transiciones fluidas, y aplicar técnicas de mezcla y masterización profesional para lograr un sonido pulido y listo para distribución."}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "produccion-musical-electronica-con-ableton-avanzado",
        pathname: "/produccion-musical",
        titulo:"Curso de Produccion Musical Electronica con Ableton Avanzado",
        cursoId: "Rqs84SWXb9q0Q778zsnb",
        nombre: "Produccion Musical Electronica con Ableton Avanzado",
        img: undefined, //produccionAvanzada,
        imgHeader: headerProduccionAvanzada,
        imgSecundaria: produccionAvanzada,
        imgGaleria: [produccionAvanzada, produccionAvanzada, produccionAvanzada, produccionAvanzada, produccionAvanzada, produccionAvanzada],
        descipcion:"Aprenderás a perfeccionar tus habilidades de producción y a explorar técnicas más complejas para llevar tus creaciones a un nivel profesional. Diseño de sonido, procesamiento creativo de audio, optimización de flujo de trabajo, tecnicas de mezcla, son algunos de los temas que se desarrollan en las clases.",
        informacionCurso: [
            {titulo: "", descripcion:""}, 
            {titulo: "", descripcion:""}, 
            {titulo: "", descripcion:""}, 
            {titulo: "", descripcion:""}, 
            {titulo: "", descripcion:""}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "teoria-musical",
        pathname: "/produccion-musical",
        titulo:"TEORÍA MUSICAL",
        img: teoriaMusical,
        imgHeader: teoriaMusical,
        imgSecundaria: teoriaMusical,
        imgGaleria: [teoriaMusical, teoriaMusical, teoriaMusical, teoriaMusical, teoriaMusical, teoriaMusical],
        descipcion:"Te brindamos las herramientas para entender y crear música de manera más estructurada y creativa. Aprenderás los conceptos esenciales como escalas, acordes, armonía, ritmo, y formas musicales, para crear melodías, armonías, expresar tus ideas y emociones a través de la música.",
        informacionCurso: [
            {titulo: "Figuras y Ritmos Musicales", descripcion:"Estudiarás las figuras rítmicas (redondas, negras, corcheas, etc.) y su aplicación práctica en la producción, aprendiendo a crear patrones rítmicos sólidos y dinámicos."}, 
            {titulo: "Escalas y Armonización", descripcion:"Comprenderás las diferentes escalas musicales y cómo armonizarlas, lo que te permitirá construir progresiones de acordes coherentes y emocionantes para tus composiciones."}, 
            {titulo: "Funciones Tonales", descripcion:"Aprenderás a identificar las funciones tonales (tónica, dominante, subdominante) y a aplicarlas en tus producciones para estructurar piezas musicales con profundidad y sentido."}, 
            {titulo: "Relación entre Teoría y Software", descripcion:"Explorarás cómo traducir conceptos teóricos a herramientas digitales como DAWs (Digital Audio Workstations), optimizando tu flujo de trabajo en producción musical."}, 
            {titulo: "Composición Práctica", descripcion:"Desarrollarás tus habilidades creativas componiendo melodías, acordes y líneas de bajo, aplicando la teoría musical directamente en tus proyectos de producción."}
        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "curso-de-mezcla-y-masterizacion-incial",
        pathname: "/produccion-musical",
        titulo:"Curso Inicial de Mezcla y Mastering",
        cursoId: "pDNPw6ufGVUIDK92bBHb",
        nombre: "Curso de Mezcla y Masterizacion Incial",
        img: undefined, //mezclaYMaster,
        imgHeader: headerMixingMasteing,
        imgSecundaria: mezclaYMaster,
        imgGaleria: [mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster],
        descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, panoramización, efectos como delay y reverb, son algunos de los temas en donde profundizaremos el contenido.",
        informacionCurso: [
            {titulo: "Percepción y Procesamiento Sonoro", descripcion:"Desarrollarás tu percepción auditiva para identificar y corregir problemas en la mezcla, dominando técnicas como la limpieza de frecuencias, cancelación de fase y amplitud estéreo."}, 
            {titulo: "Uso de Equipamiento y Herramientas de Mezcla", descripcion:"Conocerás recomendaciones sobre equipamiento, ecualizadores y procesadores dinámicos para optimizar tus mezclas en cualquier entorno de producción."}, 
            {titulo: "Procesamiento de Elementos Clave", descripcion:"Aprenderás a tratar rangos específicos como bajos y sub bajos, asegurando claridad y profundidad en tus producciones."}, 
            {titulo: "Dominio de la Cadena de Mastering", descripcion:"Comprenderás cómo estructurar una cadena de mastering efectiva, incluyendo el uso de ecualización mid-side, curvas isofónicas, compresión multibanda y limitadores."}, 
            {titulo: "Medición y Control Dinámico", descripcion:"Manejarás mediciones avanzadas como DBFS, RMS, Peak y LUFS, garantizando que tus mezclas y masters cumplan con los estándares de la industria."}
        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    {   
        id: "curso-de-progressive-avanzado-intensivo-con-ableton",
        pathname: "/produccion-musical",
        titulo:"Curso de Progressive Avanzado Intensivo con Ableton",
        cursoId: "M3FEyummGSJHiaqltt6s",
        nombre: "Curso de Progressive Avanzado Intensivo con Ableton",
        img: undefined, //mezclaYMaster,
        imgHeader: headerMixingMasteing,
        imgSecundaria: mezclaYMaster,
        imgGaleria: [mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster],
        descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, panoramización, efectos como delay y reverb, son algunos de los temas en donde profundizaremos el contenido.",
        informacionCurso: [
            {titulo: "Percepción y Procesamiento Sonoro", descripcion:"Desarrollarás tu percepción auditiva para identificar y corregir problemas en la mezcla, dominando técnicas como la limpieza de frecuencias, cancelación de fase y amplitud estéreo."}, 
            {titulo: "Uso de Equipamiento y Herramientas de Mezcla", descripcion:"Conocerás recomendaciones sobre equipamiento, ecualizadores y procesadores dinámicos para optimizar tus mezclas en cualquier entorno de producción."}, 
            {titulo: "Procesamiento de Elementos Clave", descripcion:"Aprenderás a tratar rangos específicos como bajos y sub bajos, asegurando claridad y profundidad en tus producciones."}, 
            {titulo: "Dominio de la Cadena de Mastering", descripcion:"Comprenderás cómo estructurar una cadena de mastering efectiva, incluyendo el uso de ecualización mid-side, curvas isofónicas, compresión multibanda y limitadores."}, 
            {titulo: "Medición y Control Dinámico", descripcion:"Manejarás mediciones avanzadas como DBFS, RMS, Peak y LUFS, garantizando que tus mezclas y masters cumplan con los estándares de la industria."}
        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
];