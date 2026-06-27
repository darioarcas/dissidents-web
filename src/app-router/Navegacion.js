// src/app-router/Navegacion.js

import { firebase, db } from "../firebase//firebase";
import { Link, useLocation } from 'react-router-dom';
import logo from '../components/components-pages/inicio/img/dissidents-school-logo.png';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';


export const Navegacion = () => {
    const auth = useSelector(store => store.auth);
    const location = useLocation();
    const [suscripcionActiva, setSuscripcionActiva] = useState(false);

    console.log("Ruta actual:", location.pathname);

    useEffect(() => {
        if (!auth?.uid) {
            setSuscripcionActiva(false);
            return;
        }

        const unsub = db.collection("users")
            .doc(auth.uid)
            .onSnapshot(snap => {
                if (snap.exists) {
                    setSuscripcionActiva(snap.data().suscripcionActiva || false);
                } else {
                    setSuscripcionActiva(false);
                }
            });

        return () => unsub();
    }, [auth.uid]);


    return (
        <nav className="navbar navbar-expand-lg position-relative texto-barra-navegacion" data-bs-theme="dark">
            <div className="container-fluid" style={{ maxWidth: "75%" }}>
                

                {/* LOGO centrado */}
                {/* {location.pathname !== ('/'|| '/dissidents-web') && ( */}
                    <div className="" style={{margin:"0"}}>
                        <Link className="nav-link" to="/">
                            <img src={logo} alt="logo groove" style={{ width: "85px"}} />
                        </Link>
                    </div>
                {/* )} */}


                
                {/* NOVEDADES CURSOS CONSEJOS */}
                <ul className="navbar-nav d-flex flex-row align-items-center" style={{margin:"0 0 0 30px"}}>
                    <li className="nav-item me-4">
                        <Link className="nav-link fw-semibold" to="/novedades">Novedades</Link>
                    </li>
                    <li className="nav-item me-4">
                        <Link className="nav-link fw-semibold" to="/videocursos">Cursos</Link>
                    </li>
                    
                    {
                        (suscripcionActiva && auth?.uid) && // false &&// 
                        
                        <li className="nav-item me-4">
                            <Link className="nav-link fw-semibold" to="/consejos">
                                <div style={{position:"relative"}}>
                                    <p style={{padding:"0", margin:"0"}}>Consejos</p>
                                    <span 
                                    onClick={(e) => { e.stopPropagation(); }} 
                                    style={{
                                        position:"absolute",
                                        cursor:"pointer",
                                        top: "80%",
                                        right: "-20px",
                                        fontSize:"10px",
                                        height:"10px",
                                        zIndex:22,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        aspectRatio:"2s / 1",
                                        padding:"5px",
                                        borderRadius:"15px",
                                        backgroundColor:"#3785fa",
                                    }}
                                    >
                                    
                                        <p style={{padding:"0", margin:"0"}}>nuevo</p>
                                    </span>

                                </div>
                            </Link>
                        </li>
                    }

                    <li className="nav-item me-4">
                        <Link className="nav-link fw-semibold" to="/precio">Precios</Link>
                    </li>
                </ul>
               
                {/* <ul className="navbar-nav d-flex flex-row align-items-center">

                    <li className="nav-item dropdown me-4">
                        <span className="nav-link dropdown-toggle fw-semibold text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            CURSOS
                        </span>
                        <ul className="dropdown-menu bg-dark text-white">
                            <li><Link className="dropdown-item" to="/novedades">Novedades</Link></li>
                            <li><Link className="dropdown-item" to="/videocursos">Cursos de Producción</Link></li>
                        </ul>
                    </li>


                </ul> */}

                

                {/* INICIO DE SESION */}
                <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link fw-semibold" to="/iniciar-sesion">
                            {Object.keys(auth).length !== 0 ? "Perfil" : "Ingresar"}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
