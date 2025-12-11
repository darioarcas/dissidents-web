//src/components/components-pages/PerfilUsuario.js

import { useSelector } from "react-redux"
import Dashboard from './perfil-usuario/Dashboard';
import DropdownUsuario from "../helpers/DropDownUsuario";
import AnimatedBackground from "./videocursos-on-deman/AnimateBackground";

export const PerfilUsuario = ({handleLogout}, checking) => {

    const auth = useSelector(store=>{return store.auth});

    const handleLogout2 = ()=>{
        handleLogout();
    }



    if(!checking){
        return (
            <>
                <h1>CARGANDO...</h1>
            </>
        )
    }

  return (
    <div className="app-wrapper position-relative">
        {/* Fondo con círculos animados */}
        {/* <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div> */}

        <AnimatedBackground/>


        <div className="content position-relative">
            <div>
                
                <header
                    style={{
                        width: "50%",
                        maxWidth:"350px",
                        minWidth:"250px",
                        margin: "100px auto 0 auto",
                        // height: "300px",
                        position: "relative",
                        boxShadow: "0 0px 15px rgba(255, 255, 255, 0.7)",
                        borderRadius: "15px",
                        // overflow: "hidden",
                    }}
                >    
                    {/* Overlay oscuro con opacidad al 10% */}
                    <div className='overlay-img' style={{filter:"invert(1)",borderRadius: "15px", backgroundColor:"rgba(206, 206, 206, 0.48)"}}></div>

                    <div style={{minWidth:"300px"}}>
                        <div className="d-flex flex-row justify-content-start w-75 my-3 mx-0">
                            <img 
                                className="foto-perfil rounded-circle me-3" 
                                src={auth.photoURL} 
                                alt="Foto de perfil"
                                style={{ width: '60px', height: '60px', margin:"10px", zIndex:2 }}
                            />
                            {/* <h3 className='my-auto text-white' style={{marginRight:"auto"}}>{auth.name}</h3> */}
                            <div class="dropdown my-auto" style={{overflow: "visible", position: "relative", zIndex:2}}>
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
                                {DropdownUsuario({auth, handleLogout2})}
                            </div>
                            
                        </div>
                    </div>

                </header>
                
            </div>


            {/* Contenido principal */}
            <main className='pt-5 d-flex flex-column justify-content-center w-75 mx-auto'>
                <Dashboard/>
            </main>
        </div>
    </div>
  )
}
