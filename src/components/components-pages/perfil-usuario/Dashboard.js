// src/components/components-pages/perfil-usuario/Dashboard.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCoursesOnce } from "../../../actions/auth";
import { Link } from "react-router-dom";
import { convertirASlug } from "../../helpers/convertirASlug";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Solo fetch si no tenemos cursos cargados
    if (auth?.uid && (!auth.cursosComprados || auth.cursosComprados.length === 0)) {
      dispatch(fetchUserCoursesOnce(auth.uid)).finally(() => {
        setCargando(false);
      });
    } else {
      setCargando(false);
    }
  }, [auth?.uid, dispatch, auth?.cursosComprados, setCargando]);


  const cursos = auth.cursosComprados || [];

  return (
    <div>
      <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Tus cursos</h2>
      {(cursos.length === 0) ? (
        
          !cargando ?
          <p>Aún no obtuviste ningún curso.</p> :
          <div className="d-flex flex-row justify-content-center cargando">
            <h4 style={{margin:"0 20px 0 0", textAlign:"center"}}>Cargando</h4>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        
      ) : (
        <ul className="p-0">
          {cursos.map((curso) => (
            <li key={curso.id} style={{listStyle: "none"}}>
              <Link 
                to={`/perfil/videocursos/${convertirASlug(curso.nombre)}`}
                state={{ id: curso.id }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <header
                    style={{
                        width: "50%",
                        maxWidth:"350px",
                        minWidth:"250px",
                        margin: "20px auto 0 auto",
                        // height: "300px",
                        position: "relative",
                        boxShadow: "0 0px 15px rgba(255, 255, 255, 0.7)",
                        borderRadius: "0px",
                        overflow: "hidden",
                    }}
                >    
                  {/* Overlay oscuro con opacidad al 10% */}
                  <div className='overlay-img' style={{filter:"invert(1)", backgroundColor:"rgba(206, 206, 206, 0.48)"}}></div>
                  <div style={{margin:"20px 30px", display:"flex", flexDirection:"row", alignItems:"center"}}>

                    <h3  style={{position: "relative", zIndex:2, textAlign:"center", fontWeight:"400", fontSize:"20px"}}>{curso.nombre}</h3>
                    <span
                      className="glass-icon"
                      style={{
                        display: "inline-flex",       // Asegura que el contenido se alinee correctamente
                        alignItems: "center",         // Centra verticalmente el SVG
                        justifyContent: "center",     // Centra horizontalmente el SVG
                        width: "80px",
                        height: "40px",               // Establece una altura fija
                        margin: "0",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="28"
                        height="28"
                        className="icon-play"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                         

                  </div>
               

                </header>
              </Link>
            </li>
          ))}
          <div style={{height:"150px"}}></div>
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
