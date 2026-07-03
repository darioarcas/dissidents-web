// src/components/components-pages/videocursos-on-deman/Precio.js


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { firebase, db } from "../../firebase/firebase";
// import { convertirASlug } from "../../helpers/convertirASlug";
import "./videocursos-on-deman/CursosDinamicos.css";
import "./dj/DJ.css";
import "./videocursos-on-deman/GlassFX.css";
// import mercadopagoLogo from './videocursos-on-deman/img/mercadopago.png';
import ReactDOMServer from 'react-dom/server';
import LoadingPagoPage from './videocursos-on-deman/LoadingPayPage';
import AnimatedBackground2 from "./videocursos-on-deman/AnimateBackground2";
import { useSelector } from "react-redux";


export const Precio = () => {
  const [suscripcion, setSuscripcion] = useState([]);
  const [suscripcionActiva, setSuscripcionActiva] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userId = useSelector(state => state.auth.uid);
  const { slug } = useParams();
  const navigate = useNavigate();


 console.log("🔍 Slug obtenido de la URL:", slug);



    useEffect(() => {

        const leerCursosPublicos = async () => {
            try {
                const snapshotSuscripcion = await db
                .collection("cursos_publicos")
                .doc("suscripcion")
                .get();

                // Obtener precio de suscripcion
                if (snapshotSuscripcion.exists) {
                    const data = snapshotSuscripcion.data();
                    setSuscripcion(data);
                }


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
                    cursoId: "suscription",// El id del curso en la coleccion de cursos privados
                    cursoNombre: "Servicios de Dissidents School",
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
        navigate(`/videocursos`);
    };





    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (!userId || !user) return;

        const unsub = db.collection("users").doc(userId)
            .onSnapshot(snap => {
                const arr = snap.data()?.suscripcionActiva || false;
                setSuscripcionActiva(arr);
            });

        return () => unsub();
    }, [userId]);








    // console.log("🧑 Esta autenticado: ", suscripcionActiva);


    return (
        <div className="app-wrapper position-relative">
            
            {/* Fondo con círculos animados */}
            <AnimatedBackground2/>

            {/* Contenido principal */}
            <div className="content position-relative">
                <header 
                    className="position-relative" 
                    style={{
                        width: "100%",
                        height: "150px",
                        position: "relative",
                        marginTop:"85px",
                        backgroundColor: "rgba(155, 155, 155, 0.1)",
                    }}
                >
                    {/* TITULO PRINCIPAL */}
                    <div 
                        className="text-center"
                        style={{                            
                            padding:"30px 0",
                        }}
                    >
                        <h2>Acceso a Cursos y Más Contenido</h2>
                        <p style={{fontSize:"14px", opacity:0.8}}>
                            Suscribite y accedé a todos los contenidos: niveles inicial, intermedio y avanzado + consejos exclusivos
                        </p>
                    </div>
                </header>

                <main>

                    <section className="contenedor-body d-flex justify-content-center align-items-center flex-column">


                        {/* CARD PRECIO */}
                        <div className="glass-effect mb-4" style={{width:"100%", maxWidth:"600px"}}>

                            {(suscripcionActiva !== "no-cargo") ?
                                (suscripcionActiva && isAuthenticated ? 
                                    ""
                                    :
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

                            {(suscripcionActiva !== "no-cargo") ? 
                                (suscripcionActiva && isAuthenticated ? 
                                    <div className="contenido-header">
                                        <button
                                            type="button"
                                            className="btn btn-light m-5"
                                            onClick={handleVerCursoAhora}
                                        >
                                            <p style={{color:"black", margin:"10px"}}>
                                                VER CURSOS
                                            </p>
                                        </button>
                                    </div>
                                    : 
                                    <div className="contenido-header text-center d-flex flex-column justify-content-center align-items-center">
                                        <p style={{fontSize:"12px"}}>
                                            Suscripción mensual con tarjeta de crédito 💳 o cuenta bancaria 🏛
                                        </p>
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



                        {/* BENEFICIOS */}
                        <div 
                            className="mb-4 p-4" 
                            style={{width:"100%", maxWidth:"600px", backgroundColor:"rgba(0, 0, 0, 0.03)", borderRadius:"8px"}}
                        >
                            <h4 className="text-center mb-3">Beneficios de la suscripción</h4>

                            <ul 
                                style={{
                                    fontSize:"14px", 
                                    paddingLeft:"18px",
                                    listStyle:"none"
                                }}
                            >
                                <li className="mb-2">✅ Acceso a todos los cursos (nivel inicial, intermedio y avanzado)</li>
                                <li className="mb-2">🎯 Consejos exclusivos dentro de la plataforma</li>
                                <li className="mb-2">🚀 Contenido actualizado constantemente</li>
                            </ul>
                        </div>


                        {/* INFO DE PAGOS */}
                        <div 
                            className=" p-4 text-start" 
                            style={{width:"100%", maxWidth:"600px", backgroundColor:"rgba(0, 0, 0, 0.03)", borderRadius:"8px", margin:"0 0 100px 0"}}
                        >
                            <h4 className="mb-3 text-center">💳 Información de Pagos</h4>

                            {/* ARGENTINA */}
                            <div className="mb-4">
                                <h5>🇦🇷 Pagos en Argentina</h5>
                                <p style={{fontSize:"14px", marginBottom:"8px"}}>
                                    Podés suscribirte de forma rápida y segura a través de <strong>MercadoPago</strong>.
                                </p>
                                <ul style={{fontSize:"14px", paddingLeft:"18px"}}>
                                    <li>Tarjetas de crédito y débito</li>
                                    <li>Transferencias bancarias</li>
                                    <li>Dinero en cuenta de MercadoPago</li>
                                </ul>
                                <p style={{fontSize:"14px"}}>
                                    La suscripción es <strong>mensual</strong> y se renueva automáticamente.
                                </p>
                            </div>

                            {/* EXTERIOR */}
                            <div className="mb-4">
                                <h5>🌎 Pagos desde el exterior</h5>
                                <p style={{fontSize:"14px"}}>
                                    Si estás fuera de Argentina, podés acceder a los cursos mediante <strong>PayPal</strong>.
                                </p>
                                <p style={{fontSize:"14px"}}>
                                    La suscripción se gestiona de forma manual.
                                </p>
                                <p style={{fontSize:"14px"}}>
                                    Contacto por WhatsApp:
                                </p>

                                <a 
                                    href="https://wa.me/5493513164779" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-sm"
                                >
                                    💬 Escribir por WhatsApp
                                </a>
                            </div>

                            {/* IMPORTANTE */}
                            <div>
                                <h5>📌 Importante</h5>
                                <ul style={{fontSize:"14px", paddingLeft:"18px"}}>
                                    <li>Acceso inmediato luego del pago</li>
                                    <li>Podés cancelar en cualquier momento</li>
                                    <li>Soporte por WhatsApp</li>
                                    <li><strong>No se realizan reembolsos una vez efectuado el pago</strong></li>
                                </ul>
                            </div>

                        </div>

                    </section>

                </main>
            </div>

        </div>
    );                      
};
