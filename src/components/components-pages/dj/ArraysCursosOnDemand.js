// Lista de Cursos para componente de Cursos Dinamicos


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
const mezclaYMaster = undefined;
const headerProduccionInicial = undefined;
const headerProduccionAvanzada = undefined;
const headerMixingMasteing = undefined;


export const ArrayCursos = [
    {   
        id: "curso-de-produccion-nivel-inicial-tecnica-con-samples",
        pathname: "/produccion-musical",
        titulo:"Curso de Producción Nivel Inicial",
        cursoId: "HHTzk47PSIBMEkoxHoux",
        nombre: "Curso de Producción: Nivel Inicial - Técnica con Samples",
        img: undefined,//produccionInicial,
        imgHeader: headerProduccionInicial,
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
        modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 30 minutos c/u aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    },
    // {   
    //     id: "produccion-musical-electronica-con-ableton-avanzado",
    //     pathname: "/produccion-musical",
    //     titulo:"Curso de Produccion Musical Electronica con Ableton Avanzado",
    //     cursoId: "Rqs84SWXb9q0Q778zsnb",
    //     nombre: "Produccion Musical Electronica con Ableton Avanzado",
    //     img: undefined, //produccionAvanzada,
    //     imgHeader: headerProduccionAvanzada,
    //     imgSecundaria: produccionAvanzada,
    //     imgGaleria: [produccionAvanzada, produccionAvanzada, produccionAvanzada, produccionAvanzada, produccionAvanzada, produccionAvanzada],
    //     descipcion:"Aprenderás a perfeccionar tus habilidades de producción y a explorar técnicas más complejas para llevar tus creaciones a un nivel profesional. Diseño de sonido, procesamiento creativo de audio, optimización de flujo de trabajo, tecnicas de mezcla, son algunos de los temas que se desarrollan en las clases.",
    //     informacionCurso: [
    //         {titulo: "", descripcion:""}, 
    //         {titulo: "", descripcion:""}, 
    //         {titulo: "", descripcion:""}, 
    //         {titulo: "", descripcion:""}, 
    //         {titulo: "", descripcion:""}

    //     ],
    //     tituloBody:"¿Que aprenderás en el curso?",
    //     modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    // },
    // {   
    //     id: "curso-de-mezcla-y-masterizacion-incial",
    //     pathname: "/produccion-musical",
    //     titulo:"Curso Inicial de Mezcla y Mastering",
    //     cursoId: "pDNPw6ufGVUIDK92bBHb",
    //     nombre: "Curso de Mezcla y Masterizacion Incial",
    //     img: undefined, //mezclaYMaster,
    //     imgHeader: headerMixingMasteing,
    //     imgSecundaria: mezclaYMaster,
    //     imgGaleria: [mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster, mezclaYMaster],
    //     descipcion:"Aprenderás una variedad de habilidades y técnicas esenciales para transformar tus producciones musicales asegurando que suenen claras, potentes y profesionales, listas para ser distribuidas en cualquier formato. Ecualización, equilibrio de volumen, compresión, panoramización, efectos como delay y reverb, son algunos de los temas en donde profundizaremos el contenido.",
    //     informacionCurso: [
    //         {titulo: "Percepción y Procesamiento Sonoro", descripcion:"Desarrollarás tu percepción auditiva para identificar y corregir problemas en la mezcla, dominando técnicas como la limpieza de frecuencias, cancelación de fase y amplitud estéreo."}, 
    //         {titulo: "Uso de Equipamiento y Herramientas de Mezcla", descripcion:"Conocerás recomendaciones sobre equipamiento, ecualizadores y procesadores dinámicos para optimizar tus mezclas en cualquier entorno de producción."}, 
    //         {titulo: "Procesamiento de Elementos Clave", descripcion:"Aprenderás a tratar rangos específicos como bajos y sub bajos, asegurando claridad y profundidad en tus producciones."}, 
    //         {titulo: "Dominio de la Cadena de Mastering", descripcion:"Comprenderás cómo estructurar una cadena de mastering efectiva, incluyendo el uso de ecualización mid-side, curvas isofónicas, compresión multibanda y limitadores."}, 
    //         {titulo: "Medición y Control Dinámico", descripcion:"Manejarás mediciones avanzadas como DBFS, RMS, Peak y LUFS, garantizando que tus mezclas y masters cumplan con los estándares de la industria."}
    //     ],
    //     tituloBody:"¿Que aprenderás en el curso?",
    //     modalidadYTurnos:[{titulo:"Modalidad y Detalles", items:["Modalidad On-Demand (videocursos)", "Clases en video de 1 hora aprox", "Material práctico para ejercitar lo aprendido", "Aprendé sin horarios fijos", "", "", ""]}],
    // },
    {   
        id: "curso-de-progressive-avanzado-intensivo-con-ableton",
        pathname: "/produccion-musical",
        titulo:"Curso de Progressive Avanzado Intensivo con Ableton",
        cursoId: "ZdaaZwWyzN6K63Ln502a",
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