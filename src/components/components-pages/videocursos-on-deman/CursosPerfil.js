import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db, firebase } from "../../../firebase/firebase";
import "./CursosPerfil.css";
import "../dj/DJ.css";

export const CursosPerfil = () => {
  const { slug } = useParams();
  const [curso, setCurso] = useState(null);
  const [cursoUrl, setCursoUrl] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const auth = firebase.auth().currentUser;
  const [suscripcionActiva, setSuscripcionActiva] = useState(null);
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const clasesPorPagina = 1; // Mostrar solo 1 clase por página





  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }

    const userRef = db.collection("users").doc(auth.uid);
    userRef.get().then(snap => {
      const data = snap.data() || {};

      const subActiva = data.suscripcionActiva === true;

      // Reglas:
      // SI NO tiene suscripción → bloquear
      if ( !subActiva) {
        console.log("No tiene acceso al curso, redirigiendo...");
        return navigate("/perfil/videocursos", { replace: true });
      }

      setSuscripcionActiva(subActiva);
    });
  }, []);








  useEffect(() => {
    const obtenerCurso = async () => {
      try {
        const docRef = db.collection("cursos_privados").doc(state.id);
        const docSnap = await docRef.get();
        const docRef2 = db.collection("consejos").doc(state.id);
        const docSnap2 = await docRef2.get();

        if (docSnap.exists || docSnap2.exists) {
          const cursoData = { id: docSnap.id, ...docSnap.data() };
          const cursoData2 = { id: docSnap2.id, ...docSnap2.data() };
          // Dependiendo del origen, cargamos un curso u otro. 
          // Esto es porque los cursos favoritos pueden ser tanto de videocursos como de consejos,
          //  y cada uno tiene una colección diferente en Firestore.
          if(state.origen === "cursosFavoritos"){
            setCurso(cursoData);
          }else if(state.origen === "consejosFavoritos"){
            setCurso(cursoData2);
            setCursoUrl(cursoData2.url);
            console.log("🚀 cursoData2!!!!!!!!s:", cursoData2);
          }

        } else {
          console.warn("⚠️ No se encontró el curso.", docSnap.id);
        }
      } catch (error) {
        console.error("❌ Error al cargar el curso:", error);
      }
    };

    obtenerCurso();
  }, [slug, state.id, state.origen]);






  useEffect(() => {
    if (!state?.id) {
      navigate("/perfil/videocursos", { replace: true });
    }
  }, [state, navigate]);




  useEffect(() => {
    // Si el origen es "consejosFavoritos", no actualizamos ultimosTresVistos
    // porque esa funcionalidad es solo para videocursos.
    if(state.origen === "consejosFavoritos")return;


     // si no hay cursoId público, no hacemos nada
    if(!state.cursoId){
      console.warn("👉 No hay cursoId público, no se actualizan últimos vistos.");
      return;
    }

    // actualizar ultimosTresVistos en Firestore
    const actualizarUltimosVistos = async () => {


      const uid = auth.uid;
      if (!state.id) return console.warn("No hay cursoId privado");

      // 1) actualizar ultimosTresVistos
      const userRef = db.collection("users").doc(uid);

      const snap = await userRef.get();
      console.log("snap.data()", snap.data());

      let arr = snap.data()?.ultimosTresVistos || [];

      arr = arr.filter(id => id.idPrivado !== state.id);
      arr.push({idPrivado: state.id, idPublico: state.cursoId});
      if (arr.length > 3) arr.shift(); // mantener solo los últimos 3

      console.log("🚀 Actualizando ultimosTresVistos a:", arr);
      console.log("REFERENCIA USUARIO:", userRef);

      await db.collection("users").doc(uid).update({ ultimosTresVistos: arr });

      console.log("✅ ultimosTresVistos actualizado.");
    };

    if (auth) {
        actualizarUltimosVistos();
    }
  }, []);



  if (!state?.id) return null;
  if (!suscripcionActiva) return null;

  const getEmbedUrl = (url) => {
    console.log("URL original:", url);
    const match = url.match(/\/file\/d\/([^/]+)\//);
    if (!match || !match[1]) return "";
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  };

  // Paginación: obtenemos solo la clase actual basada en la página
  let claseParaMostrar = [];
  if(state.origen === "cursosFavoritos"){
      claseParaMostrar =  curso?.clases.slice(
        (paginaActual - 1) * clasesPorPagina,
        paginaActual * clasesPorPagina
      )[0]; // Solo tomamos la primera clase del slice (una por página)
  }

  const siguientePagina = () => {
    if (paginaActual < curso?.clases.length) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Calcular el número total de páginas
  let totalPaginas = 1;
  if(state.origen === "cursosFavoritos"){
    totalPaginas = Math.ceil(curso?.clases.length / clasesPorPagina);
  }

  // Función para manejar el cambio de página al hacer clic en un número
  const irAPagina = (pagina) => {
    if (pagina === ". . .") return; //anulamos el click en ". . ."
    setPaginaActual(pagina);
  };

  // Lógica para mostrar los números de página con puntos y el número actual
  const mostrarPaginas = () => {
    const paginas = [];
    if (totalPaginas <= 5) {
      // Si hay 5 o menos páginas, mostramos todos los números
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Si hay más de 5 páginas, mostramos una selección
      if (paginaActual === 1) {
        paginas.push(1, ". . .", totalPaginas);
      } else if (paginaActual === totalPaginas) {
        paginas.push(1, '. . .', totalPaginas);
      } else {
        paginas.push(paginaActual-1, paginaActual, '. . .', totalPaginas);
      }
    }

    // Filtramos duplicados
    const paginasFiltradas = paginas.filter((pagina, index, self) => {
      return self.indexOf(pagina) === index;
    });

    return paginasFiltradas;
  };

  if(!curso) return <p>Cargando curso...</p>;

  return (
    <div className="app-wrapper position-relative">
      <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div>
      <div className="content position-relative">
        <header
          className="position-relative"
          style={{ width: "100%", height: "300px", position: "relative" }}
        >
          <div
            className="background-img"
            style={{ backgroundImage: `url(${curso?.imagen})` }}
          ></div>
          <div className="overlay-img"></div>
          <div className="texto-header w-100 text-center text-white d-flex flex-column justify-content-center align-items-center h-100">
            <h1 style={{ textAlign: "center", fontSize:"20px", fontWeight:"700"}}>{curso?.nombre}</h1>
            <h1 className="fw-light mt-2 fs-6">{curso?.descripcion}</h1>
          </div>
        </header>

        <main style={{margin:"0 auto"}}>
          <section
            className="contenedor-body"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              width: "70%",
            }}
          >
            <h1 style={{ textAlign: "center", fontSize:"18px", fontWeight:"700", objectFit: "contain"}}>{curso?.tituloBody}</h1>

            {/* Mostramos la clase actual */}
            {claseParaMostrar ? (
              <div key={claseParaMostrar?.id} className="p-0" style={{ listStyle: "none", width: "100%" }}>
                <li className="mb-4">
                  <h4 style={{fontSize:"16px", fontWeight:"300"}}> {(state.origen === "cursosFavoritos") ? `${paginaActual} - ${claseParaMostrar?.titulo}` : claseParaMostrar?.titulo}</h4>
                  <p>{claseParaMostrar?.descripcion}</p>
                  <div
                    style={{
                      position: "relative",
                      minWidth: "300px",
                      maxWidth: "800px",
                      height: "360px",
                      margin: "0 auto",
                    }}
                  >
                    {/* Capa para bloquear el botón de "compartir", solo cubre una pequeña área */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1%", // Aproximadamente la posición vertical del botón
                        right: "0", // Aproximadamente la posición horizontal del botón
                        width: "80px", // Ancho de la zona que cubre el botón
                        height: "20%", // Alto de la zona que cubre el botón
                        backgroundColor: "rgba(255, 255, 255, 0)", // Transparente
                        zIndex: 10, // Asegura que esté por encima del iframe
                        pointerEvents: "all", // Bloquea la interacción solo en esta zona
                      }}
                    />
                    
                    {/* Iframe del video */}
                    {
                      (state.origen === "cursosFavoritos") ?

                      <iframe
                        src={getEmbedUrl(claseParaMostrar.videoUrl)}
                        width="100%"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={`Clase`}
                        onContextMenu={(e) => e.preventDefault()} // Deshabilitar clic derecho
                      />

                      :

                      <iframe
                        src={getEmbedUrl(cursoUrl)}
                        width="100%"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={`Clase`}
                        onContextMenu={(e) => e.preventDefault()} // Deshabilitar clic derecho
                      />

                    }
                  </div>
                </li>
              </div>
            ) : (
              <p>No hay clases disponibles</p>
            )}


            {/* Paginación */}

            {
              (state.origen === "cursosFavoritos") &&

              <div className="paginacion mb-5">
                <button 
                  className="btn btn-dark" 
                  onClick={paginaAnterior} 
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>

                {/* Mostrar los números de página con puntos */}
                <div className="numeros-pagina">
                  {mostrarPaginas().map((pagina, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (pagina !== '...') irAPagina(pagina);
                      }}
                      className={paginaActual === pagina ? "activo" : ""}
                      disabled={pagina === '...'}
                    >
                      <p className="m-0">{pagina}</p>  
                    </button>
                  ))}
                </div>

                <button
                  className="btn btn-dark"
                  onClick={siguientePagina}
                  disabled={paginaActual >= totalPaginas}
                >
                  Siguiente
                </button>
              </div>
            }


            {
              (curso?.material?.url1?.url && curso?.material?.url1?.url !== "") &&
              <section 
                style={{
                  boxShadow:"0px 0px 12px #ffffffb4", 
                  borderRadius:"15px",
                  margin:"40px auto",
                  padding:"30px",
                }}
              >
                  {/* MATERIAL DE CLASES */}
                  <h2 style={{fontSize:"18px", fontWeight:"700", textAlign:"center", margin:"0px 0 20px 0"}}>Material de Clases</h2>
                  <ul>
                    <p style={{fontSize:"14px", fontWeight:"200"}}>{curso?.material?.descripcion}</p>
                    {
                      curso?.material?.url1?.url &&
                      <li style={{margin:"0 0 20px 0"}}>
                        <p style={{margin:"0", padding:"0"}}>{curso?.material?.url1?.nota}:</p>
                        <a href={curso?.material?.url1.url}  target="_blank" rel="noopener noreferrer" style={{overflowWrap:"anywhere", fontSize:"14px", fontWeight:"200"}}> {curso?.material?.url1.url}</a>
                      </li>
                    }
                    {
                      curso?.material?.url2?.url &&
                      <li style={{margin:"0 0 20px 0"}}>
                        <p style={{margin:"0", padding:"0"}}>{curso?.material?.url2?.nota}:</p>
                        <a href={curso?.material?.url2.url}  target="_blank" rel="noopener noreferrer" style={{overflowWrap:"anywhere", fontSize:"14px", fontWeight:"200"}}> {curso?.material?.url2.url}</a>
                      </li>
                    }
                    {
                      curso?.material?.url3?.url &&
                      <li style={{margin:"0 0 20px 0"}}>
                        <p style={{margin:"0", padding:"0"}}>{curso?.material?.url3?.nota}:</p>
                        <a href={curso?.material?.url3.url}  target="_blank" rel="noopener noreferrer" style={{overflowWrap:"anywhere", fontSize:"14px", fontWeight:"200"}}> {curso?.material?.url3.url}</a>
                      </li>
                    }
                    {
                      curso?.material?.url4?.url &&
                      <li style={{margin:"0 0 20px 0"}}>
                        <p style={{margin:"0", padding:"0"}}>{curso?.material?.url4?.nota}:</p>
                        <a href={curso?.material?.url4.url}  target="_blank" rel="noopener noreferrer" style={{overflowWrap:"anywhere", fontSize:"14px", fontWeight:"200"}}> {curso?.material?.url4.url}</a>
                      </li>
                    }
                    {
                      curso?.material?.url5?.url &&
                      <li style={{margin:"0 0 20px 0"}}>
                        <p style={{margin:"0", padding:"0"}}>{curso?.material?.url5?.nota}:</p>
                        <a href={curso?.material?.url5.url}  target="_blank" rel="noopener noreferrer" style={{overflowWrap:"anywhere", fontSize:"14px", fontWeight:"200"}}> {curso?.material?.url5.url}</a>
                      </li>
                    }
                    {
                      curso?.material?.url6?.url &&
                      <li style={{margin:"0 0 20px 0"}}>
                        <p style={{margin:"0", padding:"0"}}>{curso?.material?.url6?.nota}:</p>
                        <a href={curso?.material?.url6.url}  target="_blank" rel="noopener noreferrer" style={{overflowWrap:"anywhere", fontSize:"14px", fontWeight:"200"}}> {curso?.material?.url6.url}</a>
                      </li>
                    }
                  </ul>
              </section>
            }
          </section>
        </main>
      </div>
    </div>
  );
};
