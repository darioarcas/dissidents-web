import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, firebase } from "../../../firebase/firebase";
import "./CursosPerfil.css";
import "../dj/DJ.css";
import AnimatedBackground2 from "./AnimateBackground2";

export const Consejos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [curso, setCurso] = useState(null);
  const [consejosUsuario, setConsejosUsuario] = useState(null);
  const navigate = useNavigate();
  const auth = firebase.auth().currentUser;
  const [suscripcionActiva, setSuscripcionActiva] = useState(null);
  const [videoActivo, setVideoActivo] = useState(null);
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const clasesPorPagina = 9; // Mostrar solo 1 clase por página







  // Verificar suscripción activa al cargar el componente
 useEffect(() => {
  if (!auth && auth !== null) {
    navigate("/login");
    return;
  }

  const userRef = db.collection("users").doc(auth?.uid);

  const unsubscribe = userRef.onSnapshot((snap) => {
    const data = snap.data() || {};

    const subActiva = data.suscripcionActiva === true;
    const consejosUser = data.consejos || [];

    setConsejosUsuario(consejosUser);

    // SI NO tiene suscripción → bloquear
    if (!subActiva && subActiva !== null) {
      console.log("No tiene acceso al curso, redirigiendo...");
      navigate("/perfil/videocursos", { replace: true });
      return;
    }

    setSuscripcionActiva(subActiva);
  });

  // 🔥 IMPORTANTE: limpiar el listener
  return () => unsubscribe();

}, [auth]);





  const consultarConsejosUsuario = (id)=>{
    const resp = consejosUsuario?.some(consejo => consejo.idPrivado === id);
    console.log("Consultando consejosUsuario para id:", id, "Respuesta:", resp, "consejosUsuario:", consejosUsuario);
    return resp;
  }

  // const consultarConsejosUsuario = (id) => {
  //   return consejosUsuario?.includes(id);
  // };




  // Cargar los videos de Consejos

  useEffect(() => {
    const obtenerConsejos = async () => {
      try {
        const snapshot = await db.collection("consejos").get();

        const consejosArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Consejos:", consejosArray);
        setCurso(consejosArray);

      } catch (error) {
        console.error("❌ Error al cargar los consejos:", error);
      }
    };

    obtenerConsejos();
  }, []);





  // useEffect(() => {
  //   if (!state?.id) {
  //     navigate("/perfil/videocursos", { replace: true });
  //   }
  // }, [state, navigate]);






  //----------------> Reemplazar el user.id por el id del video visto

  useEffect(() => {

    // actualizar ultimosTresVistos en Firestore
    const actualizarUltimosVistos = async () => {
      if(true) return;
      // PROBLEMA: Los videos de cursos se administran de forma diferente a los videos de consejos,
      // entonces el id del video activo no se guarda en el mismo lugar ni con la misma estructura
      //  que los cursos.
      // SOLUCIÓN: Podemos guardar el id del consejo en idPrivado y, en idPublico, 
      // guardamos la url de la imagen del consejo.
      // DETALLE: Ejecutar solo cuando se le da play al video, no como ahora en un useEffect.
      if(!videoActivo || videoActivo === "" || videoActivo === null) return;
        const uid = auth.uid;

        // 1) actualizar ultimosTresVistos
        const userRef = db.collection("users")?.doc(uid);

        const snap = await userRef.get();
        console.log("snap.data()", snap.data());

        let arr = snap.data()?.ultimosTresVistos || [];

        arr = arr.filter(id => id.idPrivado !== videoActivo);
        arr.push({idPrivado: videoActivo, idPublico: videoActivo});
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



  const getEmbedUrl = (url) => {
    const match = url?.match(/\/file\/d\/([^/]+)\//);
    if (!match || !match[1]) return "";
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  };

  // Paginación: obtenemos solo la clase actual basada en la página
  const claseParaMostrar = curso?.slice(
    (paginaActual - 1) * clasesPorPagina, 
    paginaActual * clasesPorPagina
  ); // Solo tomamos la primera clase del slice (una por página)

  const siguientePagina = () => {
    if (paginaActual < curso?.length) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(curso?.length / clasesPorPagina);

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




  const ferozoToPublicUrl = (ferozoUrl) => {
    try {
      const url = new URL(ferozoUrl);
      const pathParam = url.searchParams.get("path");

      if (!pathParam) return null;

      // Decodificar la ruta
      let decodedPath = decodeURIComponent(pathParam);

      // Quitar /public_html
      decodedPath = decodedPath.replace(/^\/public_html/, "");

      // Construir URL final
      return `https://dissidentsschool.com${decodedPath}`;
    } catch (error) {
      console.error("URL inválida", error);
      return null;
    }
  };








  const handleConsejos = async (clase) => {
    const uid = auth.uid;
    const consejo = clase;

    if (!consejo) return console.warn("No hay cursoId público");

    const userRef = db.collection("users").doc(uid);

    const snap = await userRef.get();
    const data = snap.data() || {};

    let arr = data.consejos || [];
    arr = arr.filter(obj => obj && Object.keys(obj).length > 0); // eliminar null, undefined y objetos vacíos



    // 🔄 toggle: si ya existe lo saco, si no existe lo agrego
    const existe = arr.some(item => item.idPrivado === consejo.id);

    if (existe) {
      // ❌ quitar
      arr = arr.filter(item => item.idPrivado !== consejo.id);
      console.log("❌ Quitando de favoritos:", consejo);
    } else {
      // ✅ agregar
      arr = [...arr, { img: ferozoToPublicUrl(consejo.img), idPrivado: consejo.id, nombre: consejo.nombre }];
      console.log("Agregando a consejos:", consejo);
    }

    await userRef.update({ consejos: arr });
    setConsejosUsuario(arr);

    console.log("✅ consejos actualizado:", arr);
  };







  const palabras = busqueda.toLowerCase().trim().split(" ");

  const clasesFiltradas = claseParaMostrar?.filter((clase) => {
    return palabras.some((palabra) => {
      const coincideNombre = clase?.nombre?.toLowerCase().includes(palabra);

      const coincideTags = clase?.tags?.some(tag =>
        tag.toLowerCase().includes(palabra)
      );

      const coincideNuevo = ()=>{
        if(palabra !== "nuevo" && clase?.nuevo === false) return false;
        return clase.nuevo === true && palabra === "nuevo";
      }

      return coincideNombre || coincideTags || coincideNuevo()
    });
  });







  return (
    <div className="app-wrapper position-relative" >
      {/* <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div> */}
      <AnimatedBackground2/>

      <div className="content position-relative">
        <header
          className="animate__animated animate__fadeIn animate__slow position-relative"
          style={{ width: "100%", height: "300px", padding:"60px 0 0 0", position: "relative" }}
        >
          <div
            className="background-img"
            style={{ backgroundImage: `url(${curso?.imagen})` }}
          ></div>
          <div className="overlay-img"></div>
          <div className="texto-header w-100 text-center text-white d-flex flex-column justify-content-center align-items-center h-100">
            <h1 style={{ textAlign: "center", fontSize:"20px", margin:"0 0 20px 0", fontWeight:"700"}}>Consejos y Tips</h1>
            <h1 style={{ textAlign: "center", fontSize:"13px", fontWeight:"200", marginTop:"10px"}}>En esta sección encontrarás consejos y herramientas prácticas para mejorar tu producción musical, con ideas aplicables que te ayudarán a desarrollar mejores estructuras, tomar decisiones más sólidas y trabajar tus sonidos con mayor intención y criterio.</h1>
          </div>
        </header>

        <main style={{margin:"0 auto"}}>

          <div style={{ position: "relative", width: "80%", margin: "10px auto" }}>
  
            <input
              type="text"
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="animate__animated animate__fadeIn animate__slow"
              style={{
                width: "100%",
                padding: "10px 40px 10px 10px", // espacio para la X
                borderRadius: "10px",
                backgroundColor: "#ffffff1c",
                border: "none",
                color: "white",
                fontSize: "16px",
              }}
            />

            {busqueda && (
              <span
                onClick={() => setBusqueda("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "white",
                  opacity: 0.7
                }}
              >
                ✕
              </span>
            )}

          </div>
          <section
          className="animate__animated animate__fadeIn animate__slow"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "80%",
              margin: "10px auto",
              padding: "10px auto",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            <button className="btn btn-primary m-0" style={{ fontSize:"12px", padding:"5px" }} onClick={(e) => setBusqueda("nuevo")}>#nuevo</button>
            <button className="btn btn-primary p-1 m-0" style={{ fontSize:"12px", padding:"5px" }} onClick={(e) => setBusqueda("drumrack")}>#drumrack</button>
            <button className="btn btn-primary p-1 m-0" style={{ fontSize:"12px", padding:"5px" }} onClick={(e) => setBusqueda("sintesis")}>#sintesis</button>
            <button className="btn btn-primary p-1 m-0" style={{ fontSize:"12px", padding:"5px" }} onClick={(e) => setBusqueda("estructura")}>#estructura</button>
          </section>

          <section
            className="contenedor-body"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
              padding: "0 10px",
              width: "80%",
            }}
          >


            
            {/* Mostramos la clase actual */}
            {clasesFiltradas ? (
              clasesFiltradas?.map((clase, index) => (
                <div key={clase?.id || index} className="animate__animated animate__fadeIn animate__slow p-0" style={{ listStyle: "none", width: "100%" }}>
                  <li className="mb-4">

                    <p>{clase?.descripcion}</p>

                    <div
                      style={{
                          position: "relative",
                          minWidth: "300px",
                          maxWidth: "300px",
                          height: "200px",
                          margin: "0 auto",
                        }}
                    >

                      {/* Imagen overlay */}
                      {                        
                        // videoActivo !== clase.id && 
                        (
                        
                        <div
                          style={{
                            // 🔥 animación
                            opacity: videoActivo === clase.id ? 0 : 1,
                            transition: "opacity 0.7s ease",
                            pointerEvents: videoActivo === clase.id ? "none" : "auto",
                          }}
                        >

                          <span 
                            onClick={(e) => { e.stopPropagation(); handleConsejos(clase); }} 
                            style={{
                              position:"absolute",
                              cursor:"pointer",
                              top: "6px",
                              right: "6px",
                              fontSize:"28px",
                              zIndex:22,
                              display:"flex",
                              alignItems:"center",
                              justifyContent:"center",
                              aspectRatio:"1 / 1",
                              padding:"5px",
                              borderRadius:"15px",
                              backgroundColor:"#00000052",
                            }}
                          >
                            {(consultarConsejosUsuario(clase.id) ) ? 
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="#f3f587" viewBox="0 0 24 24" >
                                    <path d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
                                </svg>
                                : 
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                                    fill="#ffffff1e" viewBox="0 0 24 24" >
                                    <path d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
                                </svg>
                            }
                          </span>
                          
                          {clase.nuevo  &&
                            <span 
                              onClick={(e) => { e.stopPropagation(); }} 
                              style={{
                                position:"absolute",
                                cursor:"pointer",
                                top: "90%",
                                right: "6px",
                                fontSize:"10px",
                                height:"20px",
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
                          }


                          <img
                            src={ferozoToPublicUrl(clase?.img)}
                            alt={clase?.nombre}
                            onClick={() => setVideoActivo(clase.id)}
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "15px",
                              zIndex: 20,
                              cursor: "pointer",
                            }}
                          />

                          <span
                            className="glass-icon"
                            onClick={() => setVideoActivo(clase.id)}
                            style={{
                              position: "absolute",
                              cursor: "pointer",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 21,
                              display: "inline-flex",       // Asegura que el contenido se alinee correctamente
                              alignItems: "center",         // Centra verticalmente el SVG
                              justifyContent: "center",     // Centra horizontalmente el SVG
                              width: "80px",
                              height: "auto",               // Establece una altura fija
                              margin: "0",
                              aspectRatio:"1 / 1",     // 👈 círculo perfecto
                              borderRadius:"50%",      // 👈 vuelve el shape circular
                              background:"rgb(233, 13, 13)", // si querés glass, glow, etc
                              
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              width="50"
                              height="50"
                              className="icon-play"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>

                        </div>
                      )}

                      <div
                        style={{
                          position: "relative",
                          minWidth: "300px",
                          maxWidth: "800px",
                          height: "360px",
                          margin: "0 auto",
                        }}
                      >

                        {/* Capa para bloquear el botón */}
                        <div
                          style={{
                            position: "absolute",
                            top: "1%",
                            right: "0",
                            width: "80px",
                            height: "20%",
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            zIndex: 10,
                            pointerEvents: "all",
                          }}
                        />



                        {/* Iframe */}
                        <iframe
                          key={videoActivo === clase.id ? "activo" : "inactivo"}
                          src={videoActivo === clase.id ? getEmbedUrl(clase.url) : ""}
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title={`Clase ${index}`}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                    

                    {/* NOMBRE DE LA CLASE */}
                    <h4 style={{ fontSize: "16px", fontWeight: "300", textAlign: "center" }}>
                      {clase?.nombre}
                    </h4>

                  </li>
                </div>
              
              ))
              
                                                
              ) : (
                <p>No hay clases disponibles</p>
              ) 
            }




          </section>

            {/* Paginación */}
            <div className="paginacion mb-5 container d-flex justify-content-center align-items-center gap-3">
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
        </main>
      </div>
    </div>
  );
};
