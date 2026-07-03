// src/components/components-pages/videocursos-on-deman/CursosDinamicos.js


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { firebase } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
// import { convertirASlug } from "../../helpers/convertirASlug";
import TituloDesplegable from "../curso/titulo-desplegable/TituloDesplegable";
import "./CursosDinamicos.css";
import "../dj/DJ.css";
import "./GlassFX.css";
import { ArrayCursos } from '../dj/ArraysCursosOnDemand';
// import mercadopagoLogo from './img/mercadopago.png';
import ReactDOMServer from 'react-dom/server';
import LoadingPagoPage from './LoadingPayPage';
import AnimatedBackground from "./AnimateBackground";
import AnimatedBackground2 from "./AnimateBackground2";
import { useSelector } from "react-redux";


export const CursosDinamicos = ({suscripcionActiva = "no-cargo"}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userId = useSelector(state => state.auth.uid);
  const { slug } = useParams();
  const [curso, setCurso] = useState(null);
  const [cursoPublicos, setCursoPublicos] = useState([]);
  const [suscripcion, setSuscripcion] = useState([]);
  const [esFavoritoCurso, setEsFavoritoCurso] = useState(false);
  const navigate = useNavigate();


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
                const snapshotSuscripcion = await db
                .collection("cursos_publicos")
                .doc("suscripcion")
                .get();

                const cursosLeidos = snapshot.docs.map(doc => ({
                cursoId: doc.id,
                cursoIdPay: doc.data().cursoId || "", // El id del curso en la coleccion de cursos privados
                nombre: doc.data().nombre || "",
                descripcion: doc.data().descripcion || "",
                imagen: doc.data().imagen || "",
                precio: doc.data().precio || "",
                }));


                // Buscar el nombre del curso en el array usando el id publico del curso(esto nos da el precio del curso)
                const cursoEncontrado = cursosLeidos.find( cursos => cursos.cursoId === curso2.cursoId);
                console.log("Curso encontrado CURSO:", cursoEncontrado);
                // Obtener precio de suscripcion
                if (snapshotSuscripcion.exists) {
                    const data = snapshotSuscripcion.data();
                    setSuscripcion(data);
                }
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
    const probarPago = async (tipo="") => {
        const user = firebase.auth().currentUser;
        
        if (!user) {
            alert("Debes estar logueado para Comprar.");
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

            const preferencia = [""];

            if(tipo === "suscripcion"){
                preferencia[0] = "create_subscription";
            }else if(tipo === "pago"){
                preferencia[0] = "create_preference";
            }
            
            const response = await fetch(`https://backend-dissident.onrender.com/api/${preferencia[0]}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cursoId: cursoPublicos?.cursoIdPay,// El id del curso en la coleccion de cursos privados
                    cursoNombre: "Servicios de Dissidents School",//cursoPublicos?.nombre,
                    uid: user.uid,
                    base_url: base_url, // 👈 esto manda el dominio actual
                    email: user.email,
                    name: user.displayName || "Usuario sin nombre",
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





    const handleVerCursoAhora = async () => {
        const cursoIdPrivado = cursoPublicos?.cursoIdPay;
        navigate(`/perfil/videocursos/${slug}`, {
            state: { id: cursoIdPrivado, cursoId: curso.cursoId, origen: "cursosFavoritos" }
        });
    };





    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (!userId || !user) return;

        const unsub = db.collection("users").doc(userId)
            .onSnapshot(snap => {
                const arr = snap.data()?.contenidoFavorito || [];
                setEsFavoritoCurso(arr.includes(cursoPublicos?.cursoId));
            });

        return () => unsub();
    }, [userId, cursoPublicos?.cursoId]);







    const handleFavoritos = async () => {
        const uid = userId;
        const cursoIdPublico = cursoPublicos?.cursoId;

        if (!cursoIdPublico) return console.warn("No hay cursoId público");

        const userRef = db.collection("users").doc(uid);

        const snap = await userRef.get();
        const data = snap.data() || {};

        let arr = data.contenidoFavorito || [];
        arr = arr.filter(id => id !== ""); // limpiar entradas vacías



        // 🔄 toggle: si ya existe lo saco, si no existe lo agrego
        if (arr.includes(cursoIdPublico)) {
            arr = arr.filter(id => id !== cursoIdPublico);
            console.log("❌ Quitando de favoritos:", cursoIdPublico);
        } else {
            arr = [...arr, cursoIdPublico];
            console.log("⭐ Agregando a favoritos:", cursoIdPublico);
        }

        await userRef.update({ contenidoFavorito: arr });

        console.log("✅ contenidoFavorito actualizado:", arr);
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





    console.log("🧑 Esta autenticado: ", suscripcionActiva);

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
                        height: "150px",
                        position: "relative",
                        marginTop:"80px",
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
                        <h1 className="mb-1 fs-5 text-center pt-5 animate__animated animate__fadeInDown animate__slow">{curso?.titulo}</h1>
                        {/* <h1 className="fw-normal mt-4 fs-6">{curso?.descripcion}</h1> */}
                        <span className="animate__animated animate__fadeInDown animate__slow" onClick={handleFavoritos} style={{cursor:"pointer", backgroundColor:"#00000044", borderRadius:"15px", padding:"5px"}}>
                            {(esFavoritoCurso ) ? 
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="#ffffff" viewBox="0 0 24 24" >
                                    <path d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
                                </svg>
                                : 
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="#ffffff1e" viewBox="0 0 24 24" >
                                    <path d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
                                </svg>
                            }                            
                        </span>
                    </div>
                </header>



                <main>
                    {/* imgSecundaria */}
                    {img3()}
                    {/* img2 */}
                    {img2()}
                    {
                        curso?.img &&
                        <div className="animate__animated animate__fadeInDown animate__slow">
                            <img className="mx-auto d-block mt-5 pt-3 mb-4 w-75 animate__animated animate__pulse animate__slower animate__infinite" style={{maxWidth:"800px"}} src={curso?.img} alt="imagen del curso"/>
                        </div>

                    }
                    {/* <section className="contenedor-body"> */}
                        <section className="contenedor-body animate__animated animate__fadeInDown">
                            <h1 className="titulo-body text-center" style={{fontSize:"16px"}}>{curso?.tituloBody}</h1>
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


                    <section className="contenedor-body d-flex justify-content-center align-items-center flex-column">
                        <h1 className="animate__animated animate__fadeInDown animate__slow animate__infinite" style={{fontSize:"50px"}}>⬇</h1>
                        
                        <div className="glass-effect mb-5" style={{width:"100%", maxWidth:"450px"}}>
                            {(suscripcionActiva !== "no-cargo") ?
                            
                                (suscripcionActiva && isAuthenticated ? 
                                    ""
                                    :
                                    // <h4 className="text-center mb-4">
                                    //     $ 
                                    //     {
                                    //         cursoPublicos?.precio && !isNaN(cursoPublicos?.precio) 
                                    //         ? ` ${new Intl.NumberFormat('es-AR').format(cursoPublicos?.precio)} ARS` 
                                    //         : ""
                                    //     }
                                    // </h4>
                                    <h4 className="text-center mb-4">
                                        $ 
                                        {
                                            suscripcion?.precio && !isNaN(suscripcion?.precio) 
                                            ? ` ${new Intl.NumberFormat('es-AR').format(suscripcion?.precio)} ARS/MES` 
                                            : ""
                                        }
                                    </h4>                                    
                                )
                                : 'Cargando...'
                            }
                            {/* <div className="contenido-header">
                                <button 
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => probarPago("pago")}
                                >
                                    COMPRAR AHORA
                                </button>
                            </div> */}
                            {(suscripcionActiva !== "no-cargo") ? 
                                (suscripcionActiva && isAuthenticated ? 
                                    <div className="contenido-header">
                                        <button
                                            type="button"
                                            className="btn btn-light m-5"
                                            onClick={handleVerCursoAhora}
                                        >
                                            <p style={{color:"black", margin:"10px"}}>
                                                VER CURSO AHORA
                                            </p>
                                            
                                        </button>
                                    </div>
                                    : 
                                    <div className="contenido-header text-center d-flex flex-column justify-content-center align-items-center">
                                        <p style={{fontSize:"12px"}}>Suscripción mensual con tarjeta de crédito 💳 o cuenta bancaria 🏛</p>
                                        <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={() => probarPago("suscripcion")}
                                        >
                                            SUSCRIBIRME AHORA
                                        </button>
                                    </div>
                                ) 
                                : 
                                'Cargando...'
                            }

                        </div>
                        
                    </section>


                        
                </main>
            </div>

        </div>
    );                      
};
