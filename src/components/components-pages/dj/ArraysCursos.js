import djCdj from "./img/galeria-dj-cdj/dj-cdj-1.jpg";
import djAvanzado from "./img/galeria-dj-avanzado/dj-avanzado-1.png";
import djAvanzado2 from "./img/galeria-dj-avanzado/dj-avanzado-2.JPG";
import djTraktor from "./img/galeria-dj-traktor/dj-traktor.jpg";
import djVinilos from "./img/galeria-dj-con-vinilos/dj-vinilos.jpeg";
import djUrbano from "./img/galeria-dj-urbano/dj-urbano.jpg";  
import headerDjVinilos from "./img/headerDjVinilos.jpg";
import headerDjCdj from "./img/headerDjCdj.jpg";
import headerDjCdj2 from "./img/headerDjCdj2.jpg";
import headerDjTrktor from "./img/headerDjTraktor.jpg";
import headerDjUrbano from "./img/headerDjUrbano.jpg";




export const ArrayCursos = [
    {   
        id: "dj-con-cdj-pioneer",
        pathname: "/dj",
        titulo:"DJ con CDJ Pioneer",
        img: djCdj,
        imgHeader: headerDjCdj,
        imgSecundaria: djCdj,
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
        modalidadYTurnos:[{titulo:"", modalidad:[{titulo:"", descripcion:""}], turnos:[{titulo:"", descripcion:""}]}],
    },
    {   
        id: "dj-avanzado",
        pathname: "/dj",
        titulo:"DJ AVANZADO",
        img: djAvanzado,
        imgHeader: djAvanzado,
        imgSecundaria: djAvanzado,
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
        modalidadYTurnos:[{titulo:"", modalidad:[{titulo:"", descripcion:""}], turnos:[{titulo:"", descripcion:""}]}],
    },
    {   
        id: "dj-con-traktor-pro-plus",
        pathname: "/dj",
        titulo:"DJ con Traktor Pro Plus",
        img: djTraktor,
        imgHeader: headerDjTrktor,
        imgSecundaria: djTraktor,
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
        modalidadYTurnos:[{titulo:"", modalidad:[{titulo:"", descripcion:""}], turnos:[{titulo:"", descripcion:""}]}],
    },
    {   
        id: "dj-con-vinilos",
        pathname: "/dj",
        titulo:"DJ CON VINILOS",
        img: djVinilos,
        imgHeader: headerDjVinilos,
        imgSecundaria: djVinilos,
        imgGaleria: [djVinilos, djVinilos, djVinilos, djVinilos, djVinilos, djVinilos],
        descipcion:"En este curso vas desarrollarás habilidades técnicas y creativas específicas para mezclar música usando bandejas y discos de vinilo. Aprenderás a cómo calibrar y mantener estos equipos. Y por último aprenderás a mezclar utilizando el formato Timecode de Traktor es una tecnología que permite a los DJs controlar software de DJing utilizando vinilos.",
        informacionCurso: [
            {titulo: "Conocimientos técnicos esenciales", descripcion:"Entenderás el funcionamiento de agujas, cápsulas y calibrado, aprendiendo a ajustar tu equipo para obtener el mejor rendimiento."}, 
            {titulo: "Técnicas de mezcla profesional", descripcion:"Dominarás el arte de mezclar con vinilos, desarrollando precisión y fluidez en tus transiciones."}, 
            {titulo: "Limpieza y cuidado de vinilos y equipos", descripcion:"Aprenderás cómo mantener tus discos y tornamesas en óptimas condiciones para prolongar su vida útil y garantizar un sonido de calidad."}, 
            {titulo: "Integración de tecnología Time Code", descripcion:"Combinarás vinilos con sistemas digitales como Traktor Pro y controladores, maximizando tu versatilidad como DJ."}, 
            {titulo: "Uso avanzado de mixers y efectos", descripcion:"Manejarás mixers como Xone 92/96 y explorarás el uso de pedales de efectos, como delay y reverb, para añadir creatividad a tus sets."}

        ],
        tituloBody:"¿Que aprenderás en el curso?",
        modalidadYTurnos:[{titulo:"", modalidad:[{titulo:"", descripcion:""}], turnos:[{titulo:"", descripcion:""}]}],
    },
    {   
        id: "dj-urbano",
        pathname: "/dj",
        titulo:"DJ URBANO",
        img: djUrbano,
        imgHeader: headerDjUrbano,
        imgSecundaria: djUrbano,
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
        modalidadYTurnos:[{titulo:"", modalidad:[{titulo:"", descripcion:""}], turnos:[{titulo:"", descripcion:""}]}],
    },
    {   
        id: "clase-de-consulta-dj",
        pathname: "/dj",
        titulo:"CLASE DE CONSULTA DJ",
        img: djAvanzado2,
        imgHeader: headerDjCdj2,
        imgSecundaria: djUrbano,
        imgGaleria: [djAvanzado2, djUrbano, djAvanzado2, djUrbano, djUrbano, djUrbano],
        descipcion:"Podrás resolver dudas específicas para mejorar tus habilidades y técnicas como DJ.",
        informacionCurso: [
            {titulo: "Uso de software", descripcion:"consultas sobre Rekordbox, Traktor u otros programas, incluyendo configuración, análisis de pistas y preparación de playlists."}, 
            {titulo: "Técnicas de mezcla", descripcion:" resolver dudas sobre mezcla armónica, transiciones, uso de efectos, Hot Cues y loops."}, 
            {titulo: "Configuración de equipos", descripcion:"ayuda con la conexión y configuración de CDJs, mixers, controladores y sistemas DVS."}, 
            {titulo: "Resolución de problemas técnicos", descripcion:"optimización de tu setup y solución de problemas comunes en cabina."}, 
            {titulo: "Asesoramiento creativo", descripcion:"tips para mejorar tu estilo personal, elegir música y desarrollar un set fluido."}

        ],
        tituloBody:"La clase incluye:",
        modalidadYTurnos:[{titulo:"Modalidad y Turnos", modalidad:[{titulo:"Modalidad:", descripcion:"disponible de forma online o presencial."}], turnos:[{titulo:"Turnos:", descripcion:"consultar disponibilidad para coordinar tu sesión personalizada."}]}],
    },
];