// src/components/components-pages/videocursos-on-deman/CursosDinamicos.js


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebase } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
// import { convertirASlug } from "../../helpers/convertirASlug";
import TituloDesplegable from "../curso/titulo-desplegable/TituloDesplegable";
import "./CursosDinamicos.css";
import "../dj/DJ.css";
import { ArrayCursos } from '../dj/ArraysCursosOnDemand';
// import mercadopagoLogo from './img/mercadopago.png';
import ReactDOMServer from 'react-dom/server';
import LoadingPagoPage from './LoadingPayPage';
import AnimatedBackground from "./AnimateBackground";
import AnimatedBackground2 from "./AnimateBackground2";


export const CursosDinamicos = () => {
  const { slug } = useParams();
  const [curso, setCurso] = useState(null);
  const [cursoPublicos, setCursoPublicos] = useState([]);

//   const mensaje = "Hola,%20quisiera%20saber%20si%20hay%20cupos%20disponibles%20para";  // Mensaje predefinido codificado
//   const numero = "5493513417537";

 console.log("🔍 Slug obtenido de la URL:", slug);


  useEffect(() => {

    // Buscar el nombre del curso en el array usando el slug
    const cursoEncontrado = ArrayCursos.find( cursos => cursos.id === slug);
    console.log("🔍 Curso encontrado en ArrayCursos:", cursoEncontrado);
    setCurso(cursoEncontrado);


    const leerCursosPublicos = async () => {
        const curso2 = ArrayCursos.find( cursos => cursos.id === slug);
        try {
            const snapshot = await db.collection("cursos_publicos").get();
            const cursosLeidos = snapshot.docs.map(doc => ({
            cursoId: doc.id,
            cursoIdPay: doc.data().cursoId || "", // El id del curso en la coleccion de cursos privados
            nombre: doc.data().nombre || "",
            descripcion: doc.data().descripcion || "",
            imagen: doc.data().imagen || "",
            precio: doc.data().precio || "",
            }));


            // Buscar el nombre del curso en el array usando el nombre del curso (esto nos da el precio del curso)
            const cursoEncontrado = cursosLeidos.find( cursos => cursos.nombre === curso2.nombre);
            console.log("Curso encontrado PRECIO:", cursoEncontrado);
            setCursoPublicos(ant => {
            // Puedes usar el valor anterior (ant) para actualizar el estado de manera lógica
            return cursoEncontrado;
            });


        } catch (error) {
                console.error("❌ Error al leer cursos publicos:", error);
            }

        };

        leerCursosPublicos();

    }, [slug]);


  const base_url = window.location.origin; // Obtener el dominio actual
  console.log("🌐 Dominio actual:", base_url);


  // Funcion boton para probar un pago desde mercdado pago
    const probarPago = async () => {
        const user = firebase.auth().currentUser;
        if (!user) {
            alert("Debes estar logueado para probar.");
            return;
        }

        // 👇 Abrir una nueva pestaña de inmediato (sin contenido aún)
        const newTab = window.open('', '_blank');
        


        const logoUrl = `${window.location.origin}/public/logo-groove.jpg`;



        if (newTab) {
            const loadingHtml = ReactDOMServer.renderToString(<LoadingPagoPage logoUrl={logoUrl} />);
            newTab.document.write(loadingHtml);

            newTab.document.close();
        }

        

        try {
            // if(true)return;
            const token = await user.getIdToken();
            
            const response = await fetch("https://backend-dissident.onrender.com/api/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cursoId: cursoPublicos?.cursoIdPay,// El id del curso en la coleccion de cursos privados
                    cursoNombre: cursoPublicos?.nombre,
                    uid: user.uid,
                    base_url: base_url, // 👈 esto manda el dominio actual
                }),
            });

            const data = await response.json();
            console.log("✅ Preferencia creada:", data);

            if (data.init_point) {
                // 👇 Redirigir la pestaña que ya se abrió
                newTab.location.href = data.init_point;
            } else {
                newTab.close(); // cerrar si no hay link
                alert("No se generó el link de pago.");
            }
        } catch (error) {
            console.error("❌ Error al generar link de pago:", error);
            if (newTab) newTab.close();
            alert("Error al generar link de pago.");
        }
    };




    const img2 = () => {
        if(curso?.img2){
            return <img className="mx-auto d-block w-25" style={{position: "relative", top:120}} src={curso?.img2} alt="imagen del curso"/>
        }
        return null;
    }




    const img3 = () => {
        if(curso?.imgSecundaria){
            return <img className="mx-auto my-5 d-block w-50" src={curso?.imgSecundaria} alt="imagen del curso"/>
        }
        return null;
    }







    return (
        <div className="app-wrapper position-relative">
            
            {/* Fondo con círculos animados */}
            {/* <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div> */}

            <AnimatedBackground2/>

            {/* Contenido principal */}
            <div className="content position-relative">
                <header 
                    className="position-relative" 
                    style={{
                        width: "100%",
                        height: "300px",
                        position: "relative",
                    }}
                >
                    {/* Imagen de fondo en Header */}
                    <div
                        className="background-img"
                        style={{backgroundImage: `url(${curso?.imgHeader})`}}
                    >
                    </div>
                    {/* Overlay oscuro con opacidad al 10% */}
                    <div className='overlay-img'></div>
                    {/* Capa transparente que desenfoca lo de atrás */}
                    {/* <div className="blur-overlay"></div> */}

                    {/* Contenido encima */}
                    <div className="texto-header w-100 text-center text-white d-flex flex-column justify-content-center align-items-center h-100">
                        <h1 className="mb-4 texto-xxl">{curso?.titulo}</h1>
                        <h1 className="fw-normal mt-4 fs-6">{curso?.descripcion}</h1>
                    </div>
                </header>



                <main>
                    {img3()}
                    {img2()}
                    {
                        curso?.img &&
                        <img className="mx-auto d-block mt-5 pt-3 mb-4 w-75" src={curso?.img} alt="imagen del curso"/>

                    }
                    {/* <section className="contenedor-body"> */}
                        <section className="contenedor-body">
                            <h1 className="titulo-body text-center">{curso?.tituloBody}</h1>
                            <ul key={curso?.id}>
                                {curso?.informacionCurso?.map((temario, index) =>{
                                    // return <li>{item}</li>
                                    return <li><TituloDesplegable informacion={temario} /></li>
                                })}
                            </ul>
                        </section>

                        {/* <img className="imagen-secundaria rounded" src={curso?.imgSecundaria} alt="imagen del curso?"/> */}

                    {/* </section> */}

                    <section className="contenedor-temario">
                        <h1 className="titulo-body fs-6 w-100 text-center">{curso?.modalidadYTurnos[0].titulo}</h1>
                        <ul style={{textShadow: "0px 0px 3px rgba(0, 0, 0, 1)"}}>
                            {curso?.modalidadYTurnos[0].items.map((item, index) =>{
                                if( item.trim() === "" ){
                                    return null; // Omitir elementos vacíos
                                }
                                return <li>{item}</li>
                            })}
                        </ul>
                    </section>
                    <section className="contenedor-body">
                        <h4 className="text-center mb-4">
                            $ 
                            {
                                cursoPublicos?.precio && !isNaN(cursoPublicos?.precio) 
                                ? ` ${new Intl.NumberFormat('es-AR').format(cursoPublicos?.precio)} ARS` 
                                : ""
                            }
                        </h4>
                        {/* <p className="fw-bold mb-0 mt-2">{modulo.descripcion}</p>
                        <p className="fw-semibold mt-0 p-0 text-secondary">{modulo.descripcion}</p> */}
                        {/* <p className="fw-bold mb-0 mt-2">{curso?.modalidadYTurnos[0].turnos[0] && curso?.modalidadYTurnos[0].turnos[0].titulo}</p>
                        <p className="fw-semibold mt-0 p-0 text-secondary">{curso?.modalidadYTurnos[0].turnos[0] && curso?.modalidadYTurnos[0].turnos[0].descripcion}</p> */}
                    </section>
                        
                    <div className="contenido-header mb-5">
                        <button 
                            className="btn btn-light"
                            onClick={probarPago}
                        >
                            COMPRAR CURSO
                        </button>
                    </div>
                </main>
            </div>

        </div>
    );                      
};
