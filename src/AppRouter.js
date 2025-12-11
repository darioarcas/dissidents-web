//src/AppRouter.js

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { firebase } from "./firebase/firebase";
import { Inicio } from './components/components-pages/Inicio';
import { IniciarSesion } from './components/components-pages/IniciarSesion';
import { Navegacion } from './app-router/Navegacion';
import { Menu } from './app-router/Menu';
import './app-router/Navegacion.css';
import './app-router/Menu.css';
import { Footer } from './app-router/Footer';
import { Curso } from './components/components-pages/curso/Curso';
import ScrollToTop from './app-router/ScrollToTop';
import { Tutoriales } from './components/components-pages/Tutoriales';
import { Registro } from './components/components-pages/Registro';
import { Calendario } from './components/components-pages/gestion-alumnos/Calendario';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, startLogout } from './actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { PerfilUsuario } from './components/components-pages/PerfilUsuario';
import { Videocursos } from './components/components-pages/Videocursos';
import CrearCursosPrivados from './components/helpers/CrearCursosPrivados';
import CrearCursosPublicos from './components/helpers/CrearCursosPublicos';
import {CursosDinamicos} from './components/components-pages/videocursos-on-deman/CursosDinamicos';
import { PagoExitoso } from './components/components-pages/respuesta-pagos/pagoExitoso';
import { PagoFallido } from './components/components-pages/respuesta-pagos/pagoFallido';
import { CursosPerfil } from './components/components-pages/videocursos-on-deman/CursosPerfil';




export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const mensaje = "Hola,%20quisiera%20saber%20sobre%20los%20cursos,%20precios%20y%20cupos%20disponibles.%20¡Muchas%20gracias!";  // Mensaje predefinido codificado
    const numero = "5493513417537";

    const handleLogout = ()=>{
       dispatch(startLogout());
    }




    useEffect(() => {
        // Observable de firebase, detecta cuando un usuario se loguea o cierra sesión
        firebase.auth().onAuthStateChanged(async(user) => {

        if (user?.uid) {

            dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
            setIsLoggedIn(true);

        } else {
            setIsLoggedIn(false);
        }
        setChecking(false);
        });
    }, [dispatch]);




  return (
    <>
        {/* <BrowserRouter> */}
        <HashRouter>

                <ScrollToTop/>

                <div>

                    <header className=' position-fixed w-100 top-0 navegacion'>
                        <Navegacion/>
                    </header>

                    <div className='menu'>
                        <Menu/>
                    </div>


                    {/* RUTAS */}
                    <Routes>
                        {
                            console.log(isLoggedIn)
                        }
                        {/* Definimos las rutas y sus respectivos componentes */}
                        <Route path="/" element={<Inicio />} />
                        <Route path="/tutoriales" element={<Tutoriales />} />
                        <Route path="/videocursos" element={<Videocursos />} />
                        <Route path="/pago-exitoso" element={<PagoExitoso />} />
                        <Route path="/pago-fallido" element={<PagoFallido />} />
                        <Route path="/videocursos/:slug" element={<CursosDinamicos />} />
                        <Route path="/perfil/videocursos/:slug" element={<CursosPerfil />} />


                        {/* Componente Temporal para crear Estructura de cursos en Firebase */}
                        <Route path="/crear-cursos-privados" element={<CrearCursosPrivados />} />
                        <Route path="/crear-cursos-publicos" element={<CrearCursosPublicos />} />




                        {/* RUTAS PUBLICAS */}

                        <Route path="/iniciar-sesion" element={
                            <PublicRoute isLoggedIn={isLoggedIn}
                            >
                                <IniciarSesion />
                            </PublicRoute>
                        } />

                        <Route path="/registro" element={
                            <PublicRoute isLoggedIn={isLoggedIn}
                            >
                                <Registro />
                            </PublicRoute>
                        } />




                        {/* RUTA PRIVADA */}
                        <Route path="/perfil" element={
                            <PrivateRoute isLoggedIn={isLoggedIn}
                            >
                                <PerfilUsuario handleLogout={handleLogout} checking={checking}/>
                            </PrivateRoute>
                        } />




                        {/* RUTA PROTEGIDA */}
                        <Route path="/calendario" element={<Calendario />} />


                        {/* Rutas y Componentes de los Cursos */}
                        <Route path="/dj/:id" element={<Curso />} />
                        <Route path="/produccion-musical/:id" element={<Curso />} />


                        <Route path="/*" element={<Inicio />} />

                    </Routes>


                    {/* <button onClick={probarPago}>Probar conexión con backend</button> */}
                    
                </div>


                {/* ICONO FLOTANTE DE WHATSAPP */}
                {
                    !isLoggedIn &&
                    <a href={`https://wa.me/${numero}?text=${mensaje}`} target="_blank" rel="noopener noreferrer" className='icono-whatsapp' style={{position:"fixed", bottom: "5vh", right:"3%", zIndex:"20", cursor:"pointer"}}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 80 80" width="60px" height="60px"><path fill="#f2faff" d="M7.904,58.665L7.8,58.484c-3.263-5.649-4.986-12.102-4.983-18.66 C2.826,19.244,19.577,2.5,40.157,2.5C50.14,2.503,59.521,6.391,66.57,13.446C73.618,20.5,77.5,29.879,77.5,39.855 c-0.01,20.583-16.76,37.328-37.34,37.328c-6.247-0.003-12.418-1.574-17.861-4.543l-0.174-0.096L2.711,77.636L7.904,58.665z"/><path fill="#788b9c" d="M40.157,3L40.157,3c9.85,0.003,19.105,3.838,26.059,10.799C73.17,20.76,77,30.013,77,39.855 c-0.009,20.307-16.536,36.828-36.855,36.828c-6.149-0.003-12.237-1.553-17.606-4.482l-0.349-0.19l-0.384,0.101l-18.384,4.82 l4.91-17.933l0.11-0.403l-0.209-0.362c-3.22-5.574-4.92-11.94-4.917-18.41C3.326,19.52,19.852,3,40.157,3 M40.157,2 C19.302,2,2.326,18.969,2.317,39.824C2.313,46.49,4.055,53,7.367,58.735L2,78.339l20.06-5.26 c5.526,3.015,11.751,4.601,18.084,4.604h0.016c20.855,0,37.831-16.969,37.84-37.827c0-10.108-3.933-19.613-11.077-26.764 C59.78,5.942,50.28,2.003,40.157,2L40.157,2z"/><path fill="#40c351" d="M39.99,70c-5.009-0.003-9.965-1.263-14.332-3.646l-2.867-1.564l-3.159,0.828l-6.482,1.699	l1.659-6.061l0.907-3.312l-1.718-2.974C11.38,50.437,9.997,45.255,10,39.986C10.007,23.453,23.464,10.002,39.997,10	c8.022,0.003,15.558,3.126,21.221,8.793C66.881,24.461,70,31.998,70,40.011C69.992,56.547,56.535,70,39.99,70z"/><path fill="#fff" d="M56.561,47.376c-0.9-0.449-5.321-2.626-6.143-2.924c-0.825-0.301-1.424-0.449-2.023,0.449	c-0.599,0.9-2.322,2.924-2.845,3.523c-0.524,0.599-1.048,0.674-1.948,0.226c-0.9-0.449-3.797-1.4-7.23-4.462	c-2.674-2.382-4.478-5.327-5.001-6.227c-0.524-0.9-0.057-1.385,0.394-1.834c0.403-0.403,0.9-1.051,1.349-1.575	c0.449-0.524,0.599-0.9,0.9-1.5c0.301-0.599,0.151-1.126-0.075-1.575c-0.226-0.449-2.023-4.875-2.773-6.673	c-0.729-1.752-1.472-1.515-2.023-1.542c-0.524-0.027-1.123-0.03-1.722-0.03c-0.599,0-1.575,0.226-2.397,1.126	c-0.822,0.9-3.147,3.074-3.147,7.498s3.222,8.699,3.671,9.298c0.449,0.599,6.338,9.678,15.36,13.571	c2.144,0.924,3.821,1.478,5.125,1.894c2.153,0.684,4.113,0.587,5.664,0.355c1.728-0.259,5.321-2.174,6.067-4.273	c0.75-2.099,0.75-3.899,0.524-4.273C58.06,48.051,57.461,47.825,56.561,47.376z"/></svg>
                    </a>
                }

                <Footer/>
                
        </HashRouter>
        {/* </BrowserRouter> */}
    </>
  )
}