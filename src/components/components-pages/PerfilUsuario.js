//src/components/components-pages/PerfilUsuario.js

import { useSelector } from "react-redux"
import Dashboard from './perfil-usuario/Dashboard';
import DropdownUsuario from "../helpers/DropDownUsuario";
import AnimatedBackground from "./videocursos-on-deman/AnimateBackground";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import AnimatedBackground2 from "./videocursos-on-deman/AnimateBackground2";
// import AnimatedBackground2 from "./videocursos-on-deman/AnimateBackground2";

export const PerfilUsuario = ({handleLogout, suscripcionActiva}, checking) => {

    const auth = useSelector(store=>{return store.auth});
    const [modalSuscripcion, setModalSuscripcion] = useState(false);
    const [modalSoporte, setModalSoporte] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [siquieroCancelar, setSiquieroCancelar] = useState(true);
    const [peticionCancelacion, setPeticionCancelacion] = useState(false);

    useEffect(() => {
    if (modalSuscripcion) {
        // pequeño delay para que el CSS tome el fade
        setTimeout(() => setVisible(true), 10);
    } else {
        setVisible(false);
    }
    if (modalSoporte) {
        // pequeño delay para que el CSS tome el fade
        setTimeout(() => setVisible2(true), 10);
    } else {
        setVisible2(false);
    }
    }, [modalSuscripcion, modalSoporte]);

    const cerrarModal = () => {
        setVisible(false);
        setTimeout(() => setModalSuscripcion(false), 300); // coincide con duración fade
    };

    const cerrarModalSoporte = () => {
        setVisible2(false);
        setTimeout(() => setModalSoporte(false), 300); // coincide con duración fade
    };

    const handleLogout2 = ()=>{
        handleLogout();
    }



    const cancelarSuscripcion = async ()=>{

        setSiquieroCancelar(false)
        try {
            const userRef = db.collection("users").doc(auth.uid);

            const snap = await userRef.get();
            const info = snap.data() || {};
            console.log("ID de Suscripcion: ", info.suscripcionId) 
            if (!info.suscripcionId) return;
    
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/subscription/${info.suscripcionId}/cancel`,
                { method: "POST" }
            );
    
            const data = await res.json();
            console.log("cancel:", data);
    
            if (data.cancelled) {
                // alert("Tu suscripción fue cancelada");
                setPeticionCancelacion(true);
    
                setTimeout(() => {
                    cerrarModal();
                    setModalSuscripcion(false);
                    setPeticionCancelacion(false);           
                }, 3000);
            }
            
        } catch (error) {
            console.error("Error al solicitar la cancelacion: ", error)
        }

    }


    if(!checking){
        return (
            <>
                <h1>CARGANDO...</h1>
            </>
        )
    }

  return (
    <div className="app-wrapper position-relative" style={{backgroundColor:"#0e1b1b"}}>
        {/* Fondo con círculos animados */}
        {/* <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div> */}

        {/* <AnimatedBackground/> */}
        <AnimatedBackground2/>

        


        <div className="content position-relative">
            <div>
                
                <header
                    className="animate__animated animate__fadeIn animate__slow"
                    style={{
                        width: "50%",
                        maxWidth:"350px",
                        minWidth:"250px",
                        margin: "100px auto 0 auto",
                        // height: "300px",
                        position: "relative",
                        boxShadow: "0 0px 15px rgba(255, 255, 255, 0.7)",
                        borderRadius: "15px",
                        zIndex: 20,
                        // overflow: "hidden",
                    }}
                >    
                    {/* Overlay oscuro con opacidad al 10% */}
                    <div className='overlay-img' style={{filter:"invert(1)",borderRadius: "15px", backgroundColor:"rgba(206, 206, 206, 0.48)"}}></div>

                    <div style={{minWidth:"300px"}}>
                        <div className="d-flex flex-row justify-content-start w-100 my-3 mx-0">
                            <img 
                                className="foto-perfil rounded-circle me-3" 
                                src={auth.photoURL} 
                                alt="Foto de perfil"
                                style={{ width: '60px', height: '60px', margin:"10px", zIndex:2 }}
                            />
                            {/* <h3 className='my-auto text-white' style={{marginRight:"auto"}}>{auth.name}</h3> */}
                            <div class="dropdown my-auto" style={{overflow: "visible", position: "relative", cursor:"pointer", zIndex:2}}>
                                {/* <info class="dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth.name}
                                </info>
                                <ul
                                    class="dropdown-menu dropdown-menu-dark" 
                                    style={{
                                        position: "absolute",     // ✅ clave
                                        top: "100%",              // ✅ para que salga debajo del botón
                                        left: 0,
                                        zIndex: 1000,             // ✅ encima de todo
                                        overflow: "visible",      // ✅ para que se vea el contenido
                                    }}
                                >
                                    <li className='fw-normal fs-6 mx-0 my-auto'>
                                        <button onClick={()=>{handleLogout2()}} className="btn btn text-white" >Cerrar Sesion</button>
                                    </li>
                                </ul> */}
                                {DropdownUsuario({auth, handleLogout2, suscripcionActiva, setModalSuscripcion, modalSuscripcion, setModalSoporte, modalSoporte})}
                            </div>
                            
                        </div>
                    </div>

                </header>
                
            </div>


            {/* Contenido principal */}
            <main className='pt-5 d-flex flex-column justify-content-center w-100 mx-auto'>
                <Dashboard/>
            </main>

        </div>



        {modalSuscripcion && (
            <div
                onClick={cerrarModal}
                style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.2s ease"
                }}
            >
                <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#000000f3",
                    padding: "24px",
                    borderRadius: "10px",
                    width: "400px",
                    maxWidth: "90%",
                    textAlign: "center",
                    boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.55)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.97)",
                    transition: "opacity 0.3s ease, transform 0.3s ease"
                }}
                >
                <h3 style={{ marginBottom: "12px", color:"white", fontSize:"18px", fontWeight:"700" }}>
                    {
                        peticionCancelacion ?
                        "Tu suscripción fue cancelada"
                        :
                        "¿Estas seguro que deseas cancelar la suscripción a Dissidents School?"
                    }
                </h3>

                <p style={{ fontSize: "14px", marginBottom: "24px", color: "#dbdbdb" }}>
                    {
                        peticionCancelacion ?
                        ""
                        :
                        "Esta acción no puede revertirse. Para acceder al contenido de Dissidents School deberás suscribirte nuevamente."
                    
                    }
                </p>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {siquieroCancelar ? 
                        <>
                            <button
                            onClick={cerrarModal}
                            style={{
                                padding: "10px 16px",
                                backgroundColor: "#757575",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "white",
                            }}
                            >
                            Cerrar
                            </button>

                            <button
                            onClick={cancelarSuscripcion}
                            style={{
                                padding: "10px 16px",
                                backgroundColor: "#c01818",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "white",
                                fontWeight: "bold"
                            }}
                            >
                            Sí, quiero cancelar
                            </button>
                        </>
                        :
                        (
                            peticionCancelacion ?
                            ""
                            :
                            <div style={{margin:"0 auto"}}>
                                <div className="d-flex flex-row justify-content-center cargando">
                                    <h4 style={{margin:"auto 20px auto 0", textAlign:"center", fontSize:"14px"}}>Enviando petición</h4>
                                    <div className="spinner-border text-light" role="status"></div>
                                </div>
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
        )}



        {modalSoporte && (
            <div
                onClick={cerrarModalSoporte}
                style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                opacity: visible2 ? 1 : 0,
                transition: "opacity 0.2s ease"
                }}
            >
                <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#000000f3",
                    padding: "24px",
                    borderRadius: "10px",
                    width: "400px",
                    maxWidth: "90%",
                    textAlign: "center",
                    boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.55)",
                    opacity: visible2 ? 1 : 0,
                    transform: visible2 ? "scale(1)" : "scale(0.97)",
                    transition: "opacity 0.3s ease, transform 0.3s ease"
                }}
                >
                <h3 style={{ marginBottom: "12px", color:"white", fontSize:"18px", fontWeight:"700" }}>
                    {
                        peticionCancelacion ?
                        "Tu suscripción fue cancelada"
                        :
                        "Puedes contactar al soporte técnico por los siguientes medios:"
                    }
                </h3>

                <div style={{margin:"10px 0"}}>
                    <Link
                    to="https://wa.me/543513164779?text=Hola%20tengo%20un%20problema%20con%20mi%20suscripción%20a%20Dissidents%20Schools"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{cursor:"pointer", textDecoration:"none", color:"white", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"10px"}}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 80 80" width="40px" height="40px"><path fill="#f2faff" d="M7.904,58.665L7.8,58.484c-3.263-5.649-4.986-12.102-4.983-18.66 C2.826,19.244,19.577,2.5,40.157,2.5C50.14,2.503,59.521,6.391,66.57,13.446C73.618,20.5,77.5,29.879,77.5,39.855 c-0.01,20.583-16.76,37.328-37.34,37.328c-6.247-0.003-12.418-1.574-17.861-4.543l-0.174-0.096L2.711,77.636L7.904,58.665z"/><path fill="#788b9c" d="M40.157,3L40.157,3c9.85,0.003,19.105,3.838,26.059,10.799C73.17,20.76,77,30.013,77,39.855 c-0.009,20.307-16.536,36.828-36.855,36.828c-6.149-0.003-12.237-1.553-17.606-4.482l-0.349-0.19l-0.384,0.101l-18.384,4.82 l4.91-17.933l0.11-0.403l-0.209-0.362c-3.22-5.574-4.92-11.94-4.917-18.41C3.326,19.52,19.852,3,40.157,3 M40.157,2 C19.302,2,2.326,18.969,2.317,39.824C2.313,46.49,4.055,53,7.367,58.735L2,78.339l20.06-5.26 c5.526,3.015,11.751,4.601,18.084,4.604h0.016c20.855,0,37.831-16.969,37.84-37.827c0-10.108-3.933-19.613-11.077-26.764 C59.78,5.942,50.28,2.003,40.157,2L40.157,2z"/><path fill="#40c351" d="M39.99,70c-5.009-0.003-9.965-1.263-14.332-3.646l-2.867-1.564l-3.159,0.828l-6.482,1.699	l1.659-6.061l0.907-3.312l-1.718-2.974C11.38,50.437,9.997,45.255,10,39.986C10.007,23.453,23.464,10.002,39.997,10	c8.022,0.003,15.558,3.126,21.221,8.793C66.881,24.461,70,31.998,70,40.011C69.992,56.547,56.535,70,39.99,70z"/><path fill="#fff" d="M56.561,47.376c-0.9-0.449-5.321-2.626-6.143-2.924c-0.825-0.301-1.424-0.449-2.023,0.449	c-0.599,0.9-2.322,2.924-2.845,3.523c-0.524,0.599-1.048,0.674-1.948,0.226c-0.9-0.449-3.797-1.4-7.23-4.462	c-2.674-2.382-4.478-5.327-5.001-6.227c-0.524-0.9-0.057-1.385,0.394-1.834c0.403-0.403,0.9-1.051,1.349-1.575	c0.449-0.524,0.599-0.9,0.9-1.5c0.301-0.599,0.151-1.126-0.075-1.575c-0.226-0.449-2.023-4.875-2.773-6.673	c-0.729-1.752-1.472-1.515-2.023-1.542c-0.524-0.027-1.123-0.03-1.722-0.03c-0.599,0-1.575,0.226-2.397,1.126	c-0.822,0.9-3.147,3.074-3.147,7.498s3.222,8.699,3.671,9.298c0.449,0.599,6.338,9.678,15.36,13.571	c2.144,0.924,3.821,1.478,5.125,1.894c2.153,0.684,4.113,0.587,5.664,0.355c1.728-0.259,5.321-2.174,6.067-4.273	c0.75-2.099,0.75-3.899,0.524-4.273C58.06,48.051,57.461,47.825,56.561,47.376z"/></svg>
                    <p style={{padding:"0", margin:"0"}}>+543513164779</p>
                    </Link>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    {siquieroCancelar ? 
                        <>
                            <button
                            onClick={cerrarModalSoporte}
                            style={{
                                padding: "10px 16px",
                                backgroundColor: "#757575",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "white",
                                width:"100%",
                            }}
                            >
                            Cerrar
                            </button>
                        </>
                        :
                        (
                            peticionCancelacion ?
                            ""
                            :
                            <div style={{margin:"0 auto"}}>
                                <div className="d-flex flex-row justify-content-center cargando">
                                    <h4 style={{margin:"auto 20px auto 0", textAlign:"center", fontSize:"14px"}}>Enviando petición</h4>
                                    <div className="spinner-border text-light" role="status"></div>
                                </div>
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
        )}



    </div>
  )
}
