import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, firebase } from "../../../firebase/firebase";
import { convertirASlug } from "../../helpers/convertirASlug";
import TituloDesplegable from "../curso/titulo-desplegable/TituloDesplegable";

export const CursosDinamicos = () => {
  const { slug } = useParams();
  const [curso, setCurso] = useState(null);
  const [cargando, setCargando] = useState(true);
//   const mensaje = "Hola,%20quisiera%20saber%20si%20hay%20cupos%20disponibles%20para";  // Mensaje predefinido codificado
//   const numero = "5493513417537";

  useEffect(() => {
    const obtenerCurso = async () => {
      try {
        const snapshot = await db.collection("cursos_publicos").get();
        const cursos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const cursoEncontrado = cursos.find(c => convertirASlug(c.nombre) === slug);

        if (cursoEncontrado) {
          setCurso(cursoEncontrado);
        }

        setCargando(false);
      } catch (error) {
        console.error("❌ Error al cargar el curso:", error);
        setCargando(false);
      }
    };

    obtenerCurso();
  }, [slug]);


  const base_url = window.location.origin; // Obtener el dominio actual
//   console.log("🌐 Dominio actual:", base_url);


  // Funcion boton para probar un pago desde mercdado pago
      const probarPago = async () => {
          const user = firebase.auth().currentUser;
          if (!user) {
              alert("Debes estar logueado para probar.");
              return;
          }
  
          // 👇 Abrir una nueva pestaña de inmediato (sin contenido aún)
          const newTab = window.open('', '_blank');
  
          try {
              const token = await user.getIdToken();
  
              const response = await fetch("https://backend-groove-pi69.onrender.com/api/create_preference", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                      cursoId: curso.cursoId,
                      cursoNombre: curso.nombre,
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










  if (cargando) return <div className="d-flex justify-content-center align-items-center flex-row">
    <h3 className="text-center my-5 py-5">Cargando curso</h3>
    <div className="spinner-border text-white mx-2 my-auto" role="status"></div>
  </div>

  if (!curso) return <h3 className="text-center my-5 py-5">❌ Curso no encontrado</h3>;

  return (
        <div>
            <header
                className='animate__animated animate__fadeIn animate__faster'
                style={{ 
                    backgroundImage: `url(${curso.imgHeader})`,
                    backgroundSize: "cover", 
                    backgroundPosition: "center",
                    width:"100%",
                    height:"300px",
                    // height:"900px",
                    position:"relative",
                }}
            >

                {/* Overlay oscuro con opacidad al 10% */}
                <div className='overlay-img'></div>


                <div className='texto-header w-100'>

                    <h1 className='mb-4 texto-xxl text-white'>{curso.nombre}</h1>

                    <h1 className='fw-normal mt-4 fs-6'>{curso.descipcion}</h1>
                </div>
            </header>

            <body>
                {/* <section className="contenedor-body"> */}
                    <section className="contenedor-body">
                        <h1 className="titulo-body text-uppercase">{curso.nombre}</h1>
                        <ul>
                            {curso.temario.map((temario, index) =>{
                                // return <li>{item}</li>
                                return <li><TituloDesplegable informacion={temario} /></li>
                            })}
                        </ul>
                    </section>

                    {/* <img className="imagen-secundaria rounded" src={curso.imgSecundaria} alt="imagen del curso"/> */}

                {/* </section> */}

                <section className="contenedor-temario">
                    <h1 className="titulo-body w-100">Temario</h1>
                    <ul>
                        {curso.temario.map((modulo, index) =>{
                            return <li>{modulo.titulo}</li>
                        })}
                    </ul>
                </section>
                <section className="contenedor-body">
                    <p className="fw-bold mb-0 mt-2">{curso.nombre}</p>
                    <p className="fw-semibold mt-0 p-0 text-secondary">{curso.descripcion}</p>
                    {/* <p className="fw-bold mb-0 mt-2">{curso.modalidadYTurnos[0].turnos[0] && curso.modalidadYTurnos[0].turnos[0].titulo}</p>
                    <p className="fw-semibold mt-0 p-0 text-secondary">{curso.modalidadYTurnos[0].turnos[0] && curso.modalidadYTurnos[0].turnos[0].descripcion}</p> */}
                </section>

                    
                    
                    <div className="contenido-header mb-5">
                        <button 
                            className="btn btn-light"
                            onClick={probarPago}
                        >
                            COMPRAR CURSO
                        </button>
                    </div>
            </body>
        </div>
  );
};
