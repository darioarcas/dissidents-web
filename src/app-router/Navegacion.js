// src/app-router/Navegacion.js

import { Link } from 'react-router-dom';
import logo from './LOGO NUEVO.png';
import { useSelector } from 'react-redux';

export const Navegacion = () => {
    const auth = useSelector(store => store.auth);

    return (
        <nav className="navbar navbar-expand-lg position-relative texto-barra-navegacion" data-bs-theme="dark">
            <div className="container-fluid" style={{ maxWidth: "75%" }}>
                
                {/* CURSOS y ALQUIELERES */}
                <ul className="navbar-nav d-flex flex-row align-items-center">

                    <li className="nav-item dropdown me-4">
                        <span className="nav-link dropdown-toggle fw-semibold text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            CURSOS
                        </span>
                        <ul className="dropdown-menu bg-dark text-white">
                            <li><Link className="dropdown-item" to="/tutoriales">TUTORIALES</Link></li>
                            <li><Link className="dropdown-item" to="/videocursos">VIDEOCURSOS ON-DEMAND</Link></li>
                        </ul>
                    </li>


                </ul>

                {/* LOGO centrado */}
                <div className="position-absolute top-50 start-50 translate-middle">
                    <Link className="nav-link" to="/">
                        <img src={logo} alt="logo groove" style={{ width: "55px" }} />
                    </Link>
                </div>

                {/* INICIO DE SESION */}
                <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link fw-semibold" to="/iniciar-sesion">
                            {Object.keys(auth).length !== 0 ? "PERFIL" : "INGRESAR"}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
