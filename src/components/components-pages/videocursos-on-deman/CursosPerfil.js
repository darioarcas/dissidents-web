import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase/firebase";
import "./CursosPerfil.css";
import "../dj/DJ.css";

export const CursosPerfil = () => {
  const { slug } = useParams();
  const [curso, setCurso] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const clasesPorPagina = 1; // Mostrar solo 1 clase por página

  useEffect(() => {
    const obtenerCurso = async () => {
      try {
        const docRef = db.collection("cursos_privados").doc(state.id);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
          const cursoData = { id: docSnap.id, ...docSnap.data() };
          setCurso(cursoData);
        } else {
          console.warn("⚠️ No se encontró el curso.");
        }
      } catch (error) {
        console.error("❌ Error al cargar el curso:", error);
      }
    };

    obtenerCurso();
  }, [slug, state.id]);

  useEffect(() => {
    if (!state?.id) {
      navigate("/perfil/videocursos", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.id) return null;

  const getEmbedUrl = (url) => {
    const match = url.match(/\/file\/d\/([^/]+)\//);
    if (!match || !match[1]) return "";
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  };

  // Paginación: obtenemos solo la clase actual basada en la página
  const claseParaMostrar = curso?.clases.slice(
    (paginaActual - 1) * clasesPorPagina,
    paginaActual * clasesPorPagina
  )[0]; // Solo tomamos la primera clase del slice (una por página)

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
  const totalPaginas = Math.ceil(curso?.clases.length / clasesPorPagina);

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
            <h1 className="mb-2">{curso?.nombre}</h1>
            <h1 className="fw-light mt-2 fs-6">{curso?.descripcion}</h1>
          </div>
        </header>

        <main>
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
            <h1 className="titulo-body text-center">{curso?.tituloBody}</h1>

            {/* Mostramos la clase actual */}
            {claseParaMostrar ? (
              <div key={claseParaMostrar?.id} className="p-0" style={{ listStyle: "none", width: "100%" }}>
                <li className="mb-4">
                  <h4>{claseParaMostrar?.titulo}</h4>
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
                    <iframe
                      src={getEmbedUrl(claseParaMostrar.videoUrl)}
                      width="100%"
                      height="360"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={`Clase`}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </li>
              </div>
            ) : (
              <p>No hay clases disponibles</p>
            )}

            {/* Paginación */}
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
          </section>
        </main>
      </div>
    </div>
  );
};
