
import { useEffect, useState } from 'react';
import "./videocursos-on-deman/CursosDinamicos.css";
import './dj/DJ.css';
// import { db } from "../../firebase/firebase";
import { cursos, imgHeaderOnDemand } from './dj/ArraysDataBaseCursosOnDemand';
import { TarjetasCursosImagen } from './dj/TarjetasCursosImagen';

export const Videocursos = () => {
    const [cursosEncontrados, setCursosEncontrados] = useState([]);



    useEffect(() => {
        const cursosLeidos = cursos.map(doc => ({
            cursoId: doc.cursoId,
            titulo: doc.nombre || "",
            descripcion: doc.descripcion || "",
            img:doc.img || "",
        }));

        setCursosEncontrados(cursosLeidos);
    }, [setCursosEncontrados]);

    // useEffect(() => {
        
    //     const leerCursosEncontrados = async () => {
    //         try {
    //         const snapshot = await db.collection("cursos_privados").get();
    //         const cursosLeidos = snapshot.docs.map(doc => ({
    //             cursoId: doc.id,
    //             titulo: doc.data().nombre || "",
    //             descripcion: doc.data().descripcion || "",
    //             img:""
    //         }));
    
    //         setCursosEncontrados(cursosLeidos);
    //         } catch (error) {
    //         console.error("❌ Error al leer cursos privados:", error);
    //         }
    //     };

    //     leerCursosEncontrados();
    // }, []);



  return (
    <div className="app-wrapper position-relative">

        {/* Fondo con círculos animados */}
        <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div>

        <div className="content position-relative">

            <header
                // className="position-relative" 
                // style={dynamicHeight()}
                style={{
                    width: "100%",
                    // margin: "100px auto 0 auto",
                    height: "300px",
                    position: "relative",
                    // boxShadow: "0 0px 15px rgba(255, 255, 255, 0.6)",
                }}
            >
                {/* Imagen de fondo en Header */}
                <div
                    className="background-img"
                    style={{backgroundImage: `url(${imgHeaderOnDemand?.imgHeaderOnDemand})`, filter:"saturate(0)", opacity:"0.3"}}
                >
                </div>
                {/* Overlay oscuro con opacidad al 10% */}
                <div className='overlay-img' style={{filter:"invert(1)", backgroundColor:"rgba(206, 206, 206, 0.48)"}}></div>

                <div className='texto-header w-100 text-center text-white d-flex flex-column justify-content-center align-items-center h-100' style={{padding:"0rem"}}>
                    <h1 className='text-white text-center'>
                        Videocursos On-Demand
                        
                    </h1>
                        {/* <span class="glass-icon" style={{margin:"0 auto"}}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                width="28" 
                                height="28"
                                class="icon-play"
                            >
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                         </span>  */}
                    

                    <h6 className='fw-normal fs-6 text-center'>
                        Accede a una formación completa para DJs y productores, disponible cuando y donde quieras.
                    </h6>
                </div>
            </header>

            <main className='pt-5'>
                {cursosEncontrados.length === 0 ? (
                    <div className="mx-auto w-100 d-flex justify-content-center">
                        <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h3 style={{ margin: 'auto', padding:"0"}}>CARGANDO CURSOS</h3>
                            <div className="spinner-border text-white mx-2 my-auto" role="status"></div>
                        </div>
                    </div>
                ) : (
                    <TarjetasCursosImagen ArrayCursos={cursosEncontrados} onDemand={true} inicio={true} />
                )}
            </main>
        </div>

    </div>
  )
}
