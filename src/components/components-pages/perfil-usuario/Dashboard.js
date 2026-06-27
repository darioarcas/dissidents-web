// src/components/components-pages/perfil-usuario/Dashboard.js

import { firebase, db } from "../../../firebase//firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCoursesOnce } from "../../../actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { convertirASlug } from "../../helpers/convertirASlug";
import { ArrayCursos } from "../dj/ArraysCursosOnDemand";
import MasCursos from "./MasCursos";
// import { style } from "framer-motion/client";

const Dashboard = () => {
  const [ultimos, setUltimos] = useState([]);
  const [ultimosIds, setUltimosIds] = useState([]);
  const [consejosUsuario, setConsejosUsuario] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [cargando, setCargando] = useState(true);
  const [contenidoFavorito, setContenidoFavorito] = useState(true);
  const [cursoPublicos, setCursoPublicos] = useState(true);
  const [suscripcionActiva, setSuscripcionActiva] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Solo fetch si no tenemos cursos cargados
    if (auth?.uid && (!auth.cursosComprados || auth.cursosComprados.length === 0)) {
      dispatch(fetchUserCoursesOnce(auth.uid)).finally(() => {
        setCargando(false);
      });
      
    } else {
      setCargando(false);
    }
  }, [auth?.uid, dispatch, setCargando]);



  useEffect(() => {
    const leerCursosPublicos = async () => {
        try {
            const snapshot = await db.collection("cursos_publicos").get();
            const cursosLeidos = snapshot.docs.map(doc => ({
            cursoId: doc.id,
            cursoIdPay: doc.data().cursoId || "", // El id del curso en la coleccion de cursos privados
            nombre: doc.data().nombre || "",
            descripcion: doc.data().descripcion || "",
            imagen: doc.data().imagen || "",
            precio: doc.data().precio || "",
            }));

            setCursoPublicos(ant => {
            // Puedes usar el valor anterior (ant) para actualizar el estado de manera lógica
            return cursosLeidos;
            });


        } catch (error) {
                console.error("❌ Error al leer cursos publicos:", error);
            }

        };

        leerCursosPublicos();

  }, [setCursoPublicos]);




  useEffect(() => {
      const user = firebase.auth().currentUser;
      if (!auth.uid || !user) return;

      const unsub = db.collection("users").doc(auth.uid)
          .onSnapshot(snap => {
              setSuscripcionActiva(snap.data()?.suscripcionActiva || false);
              const arr = snap.data()?.contenidoFavorito || [];
              const arr2 = snap.data()?.consejos || [];
              const cursosEncontrados = arr.map(cursoId => {
                const curso = ArrayCursos.find(c => c.cursoId === cursoId);
                return curso;
              });
              setContenidoFavorito(cursosEncontrados);
              setConsejosUsuario(arr2);
          });

      return () => unsub();
  }, []);







  

  useEffect(() => {
    const fetchUltimos = async () => {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const snap = await db.collection("users").doc(user.uid).get();
      const userData = snap.data();
      
      const ids = userData?.ultimosTresVistos || [];
      const status = userData?.status || null; // ← si no existe, queda null

      setUltimosIds(ids);

      // === Si STATUS esta pendiente volvemos a consultar ===
      if (status === "pending") {
        try {
          // 1) Buscar suscripción por UID
          const subSnap = await db
            .collection("suscripciones")
            .where("uid", "==", user.uid)
            .limit(1)
            .get();

          if (!subSnap.empty) {
            const subDoc = subSnap.docs[0];
            const preapprovalId = subDoc.id;

            // 2) Verificar con el backend
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/subscription/${preapprovalId}/verify`
            );

            // opcional:
            // const result = await verifyRes.json();
            // console.log("verify status:", result);
          }
        } catch (err) {
          console.error("Error verificando suscripción pending:", err);
        }
      }

      // === LÓGICA EXISTENTE DE ULTIMOS TRES ===
      const cursos = await Promise.all(
        ids.map(id => {
          if (id.idPrivado === "") return false;
          if (!id.idPrivado) return false;
          console.log("Consultando curso privado con id:", id.idPrivado);
          return db.collection("cursos_privados").doc(id?.idPrivado).get();
        })
      );

      const data = cursos
        .filter(c => c?.exists)
        .map(c => ({ id: c.id, ...c.data() }));

      setUltimos(data);
    };

    fetchUltimos();
  }, []);


  const imagenFondoCurso = (index) => {
    const curso = ultimosIds[index];
    console.log("🚀 curso ultimosIds:", ultimosIds);
    const cursoEncontrado = ArrayCursos.find(c => c.cursoId === curso.idPublico);
    console.log("🚀 cursoEncontrado:", cursoEncontrado);
    return cursoEncontrado?.img; // Reemplaza con la lógica adecuada
  }



  
  
  
  
  // Renderizado de la sección de cursos COMPRADOS
  
  // const cursos = auth.cursosComprados || [];
  
  // const cargaCursos = ()=>{
  //   return <div>
  //         <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Tus cursos</h2>
  //         {(cursos.length === 0) ? (
            
  //             !cargando ?
  //             <p>Aún no obtuviste ningún curso.</p> :
  //             <div className="d-flex flex-row justify-content-center cargando">
  //               <h4 style={{margin:"0 20px 0 0", textAlign:"center"}}>Cargando</h4>
  //               <div className="spinner-border text-light" role="status">
  //                 <span className="visually-hidden">Cargando...</span>
  //               </div>
  //             </div>
            
  //         ) : (
  //           <ul className="p-0">
  //             {cursos.map((curso) => (
  //               <li key={curso.id} style={{listStyle: "none"}}>
  //                 <Link 
  //                   to={`/perfil/videocursos/${convertirASlug(curso.nombre)}`}
  //                   state={{ id: curso.id }}
  //                   style={{ textDecoration: "none", color: "inherit" }}
  //                 >
  //                   <header
  //                       style={{
  //                           width: "50%",
  //                           maxWidth:"350px",
  //                           minWidth:"250px",
  //                           margin: "20px auto 0 auto",
  //                           // height: "300px",
  //                           position: "relative",
  //                           boxShadow: "0 0px 15px rgba(255, 255, 255, 0.7)",
  //                           borderRadius: "0px",
  //                           overflow: "hidden",
  //                       }}
  //                   >    
  //                     {/* Overlay oscuro con opacidad al 10% */}
  //                     <div className='overlay-img' style={{filter:"invert(1)", backgroundColor:"rgba(206, 206, 206, 0.48)"}}></div>
  //                     <div style={{margin:"20px 30px", display:"flex", flexDirection:"row", alignItems:"center"}}>

  //                       <h3  style={{position: "relative", zIndex:2, textAlign:"center", fontWeight:"400", fontSize:"20px"}}>{curso.nombre}</h3>
  //                       <span
  //                         className="glass-icon"
  //                         style={{
  //                           display: "inline-flex",       // Asegura que el contenido se alinee correctamente
  //                           alignItems: "center",         // Centra verticalmente el SVG
  //                           justifyContent: "center",     // Centra horizontalmente el SVG
  //                           width: "80px",
  //                           height: "40px",               // Establece una altura fija
  //                           margin: "0",
  //                         }}
  //                       >
  //                         <svg
  //                           xmlns="http://www.w3.org/2000/svg"
  //                           viewBox="0 0 24 24"
  //                           fill="currentColor"
  //                           width="28"
  //                           height="28"
  //                           className="icon-play"
  //                         >
  //                           <path d="M8 5v14l11-7z" />
  //                         </svg>
  //                       </span>
                            

  //                     </div>
                  

  //                   </header>
  //                 </Link>
  //               </li>
  //             ))}
  //             <div style={{height:"150px"}}></div>
  //           </ul>
  //         )}
  //   </div>
  // }


  // Renderizado de la sección de ÚLTIMOS VISTOS
  const cargaUltimos = (ultimos)=>{
    return <div className="animate__animated animate__fadeIn animate__slow" style={{boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)", maxWidth:"350px", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#00000050", width:"80%", padding:"40px 0"}}>
          {(ultimos?.length > 0) ? (
            <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Ultimo visto</h2>
          ) : ""}

          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>

            {(ultimos?.length === 0) ? (
              <p style={{padding:"0", margin:"0", textAlign:"center", width:"70%"}}>
                Aún no viste ningún curso. {!suscripcionActiva && "Para acceder a los cursos debes suscribirte"}
              </p>
            ) : (ultimos.map((curso, index) => {
              return (
              <div key={curso.id+"ultimos videos vistos"+index} style={{marginBottom:"20px"}}>
                <Link
                  to={`/perfil/videocursos/${convertirASlug(curso.nombre)}`}
                  state={{ id: curso.id, cursoId: cursoPublicos?.find(cursos => {return cursos.cursoIdPay === curso.id})?.cursoId, origen: "cursosFavoritos" }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <header
                      style={{
                          width: "50%",
                          maxWidth:"500px",
                          minWidth:"90px",
                          margin: "20px auto",
                          borderRadius: "0px",
                          overflow: "hidden",
                      }}
                  >

                    <img
                      src={imagenFondoCurso(index)}
                      alt={curso.nombre}
                      className="course-image"
                    />
                      {/* Nombre del curso */}
                      <h3 className="curso-nombre-dashboard"  style={{position: "relative", zIndex:2, textAlign:"center", fontWeight:"200", fontSize:"12px"}}>{curso.nombre}</h3>
                      
                  </header>
                </Link>
              </div>)
            }))}
          </div>
    </div>
  }



  const handleFavoritos = async (id) => {
    const uid = auth.uid;
    const cursoIdPublico = id;

    if (!cursoIdPublico) return console.warn("No hay cursoId público");

    const userRef = db.collection("users").doc(uid);

    const snap = await userRef.get();
    const data = snap.data() || {};

    let arr = data.contenidoFavorito || [];
    arr = arr.filter(id => id !== ""); // limpiar entradas vacías



    // 🔄 toggle: si ya existe lo saco, si no existe lo agrego
    if (arr.includes(cursoIdPublico)) {
        arr = arr.filter(id => id !== cursoIdPublico);
        console.log("❌ Quitando de favoritos:", cursoIdPublico);
    } else {
        arr = [...arr, cursoIdPublico];
        console.log("⭐ Agregando a favoritos:", cursoIdPublico);
    }

    await userRef.update({ contenidoFavorito: arr });

    console.log("✅ contenidoFavorito actualizado:", arr);
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



  const handleConsejos = async (curso) => {
    console.log("🚀 handleConsejos llamado con curso:", curso);
    const uid = auth.uid;
    const consejo = curso;

    if (!consejo) return console.warn("No hay cursoId público");

    const userRef = db.collection("users").doc(uid);

    const snap = await userRef.get();
    const data = snap.data() || {};

    let arr = data.consejos || [];
    arr = arr.filter(obj => obj && Object.keys(obj).length > 0); // eliminar null, undefined y objetos vacíos



    // 🔄 toggle: si ya existe lo saco, si no existe lo agrego
    const existe = arr.some(item => item.idPrivado === consejo.idPrivado);

    if (existe) {
      // ❌ quitar
      arr = arr.filter(item => item.idPrivado !== consejo.idPrivado);
      console.log("❌ Quitando de favoritos:", consejo);
    } else {
      // ✅ agregar
      arr = [...arr, { img: ferozoToPublicUrl(consejo.img), idPrivado: consejo.idPrivado, nombre: consejo.nombre }];
      console.log("Agregando a consejos:", consejo);
    }

    await userRef.update({ consejos: arr });
    setConsejosUsuario(arr);

    console.log("✅ consejos actualizado:", arr);
  };








const validacion = (id, slug, origen)=>{
  let state = null;
  if(origen === "cursosFavoritos"){
    state = cursoPublicos?.find(cursos => {return cursos.cursoId === id})?.cursoIdPay
    console.log("🚀 state validacion:", cursoPublicos);    
  } else if(origen === "consejosFavoritos"){
    state = id;
  }

  if(suscripcionActiva){
    navigate(`/perfil/videocursos/${slug}`, {
        state: {id: state, cursoId: id, origen: origen}
    });
  } else {
    alert("Debes estar suscripto para acceder a los cursos.");
  }
}




const cargarContenidoFavorio = (Favoritos)=>{
  return <div className="animate__animated animate__fadeInDown animate__slow" style={{boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)", borderRadius:"15px", backgroundColor:"#00000050", width:"80%", margin:"0 auto 50px auto", padding:"40px 0"}}>
        {(Favoritos?.length > 0) ? (
          <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Cursos Favoritos</h2>
          ) :
          <div style={{display:"flex", justifyContent:"center"}}>
            <p style={{padding:"0", margin:"auto 0", textAlign:"center", width:"70%"}}>
              Aquí apareceran tus cursos marcados como favoritos 
            </p>
            <span                       
              style={{
                width:"28px",
                fontSize:"28px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                aspectRatio:"1 / 1",
                padding:"5px",
                borderRadius:"15px",
                backgroundColor:"#00000052"
              }}
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" className="my-auto">
                <path className="my-auto" d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
              </svg>
            </span>
          </div>
        }

        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>

          {(Favoritos?.length === 0) ? (
            // <p style={{padding:"0", margin:"0 auto", textAlign:"center", width:"70%"}}>
            //   Aún no viste ningún curso. Para acceder a los cursos debes suscribirte
            // </p>
            ""
          ) : (Favoritos.map((curso, index) => {
            return (
            <div key={curso.id+"ultimos videos vistos"+index} style={{marginBottom:"20px"}}>
                <header
                    style={{
                      width: "50%",
                      maxWidth:"500px",
                      minWidth:"300px",
                      margin: "20px auto",
                      borderRadius: "0px",
                      overflow: "hidden"                      
                    }}
                >

                  <div
                    // to={`/perfil/videocursos/${convertirASlug(curso.nombre)}`}
                    onClick={()=>validacion(curso.cursoId, convertirASlug(curso.nombre), "cursosFavoritos")}
                    // state={{ id: ultimosIds.find(cursos => {return cursos.idPublico === curso.cursoId})?.idPrivado }}
                    style={{ cursor:"pointer", position: "relative", display: "inline-block", textDecoration: "none", color: "inherit" }}
                  >

                    <span 
                      onClick={(e) => { e.stopPropagation(); handleFavoritos(curso.cursoId); }} 
                      style={{
                        position:"absolute",
                        cursor:"pointer",
                        top: "6px",
                        right: "6px",
                        fontSize:"28px",
                        zIndex:"20",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        aspectRatio:"1 / 1",
                        padding:"5px",
                        borderRadius:"15px",
                        backgroundColor:"#00000052"
                      }}
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" className="my-auto">
                        <path className="my-auto" d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
                      </svg>
                    </span>
                    <img
                      src={curso.img}
                      alt={curso.nombre}
                      className="course-image"
                      style={{position:"relative"}}
                    />


                      <span
                        className="glass-icon"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 3,
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



                    {/* Nombre del curso */}
                    <h3 className="curso-nombre-dashboard"  style={{position: "relative", zIndex:2, textAlign:"center", fontWeight:"200", fontSize:"12px"}}>{curso.nombre}</h3>
                  </div>
                    
                </header>
            </div>)
          }))}
        </div>
  </div>
}









const cargarConsejos = (Consejos)=>{
  return <div className="animate__animated animate__fadeIn animate__slow" style={{boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)", borderRadius:"15px", backgroundColor:"#00000050", width:"80%", margin:"0 auto 50px auto", padding:"40px 0"}}>
        {(Consejos?.length > 0) ? (
          <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Consejos Favoritos</h2>
          ) :
          <div style={{display:"flex", justifyContent:"center"}}>
            <p style={{padding:"0", margin:"auto 0", textAlign:"center", width:"70%"}}>
              Aquí apareceran tus consejos favoritos 
            </p>
            <span                       
              style={{
                width:"28px",
                fontSize:"28px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                aspectRatio:"1 / 1",
                padding:"5px",
                borderRadius:"15px",
                backgroundColor:"#00000052"
              }}
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" className="my-auto">
                <path className="my-auto" d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
              </svg>
            </span>
          </div>
        }

        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>

          {(Consejos?.length === 0) ? (
            // <p style={{padding:"0", margin:"0 auto", textAlign:"center", width:"70%"}}>
            //   Aún no viste ningún curso. Para acceder a los cursos debes suscribirte
            // </p>
            ""
          ) : (Consejos.map((curso, index) => {
            return (
            <div key={curso.id+"ultimos videos vistos"+index} style={{marginBottom:"20px"}}>
                <header
                    style={{
                      width: "50%",
                      maxWidth:"500px",
                      minWidth:"300px",
                      margin: "20px auto",
                      borderRadius: "0px",
                      overflow: "hidden"                      
                    }}
                >

                  <div
                    // to={`/perfil/videocursos/${convertirASlug(curso.nombre)}`}
                    onClick={()=>validacion(curso.idPrivado, convertirASlug(curso.nombre), "consejosFavoritos")}
                    // state={{ id: ultimosIds.find(cursos => {return cursos.idPublico === curso.cursoId})?.idPrivado }}
                    style={{ cursor:"pointer", position: "relative", display: "inline-block", textDecoration: "none", color: "inherit" }}
                  >

                    <span 
                      onClick={(e) => { e.stopPropagation(); handleConsejos(curso); }} 
                      style={{
                        position:"absolute",
                        cursor:"pointer",
                        top: "6px",
                        right: "6px",
                        fontSize:"28px",
                        zIndex:"20",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        aspectRatio:"1 / 1",
                        padding:"5px",
                        borderRadius:"15px",
                        backgroundColor:"#00000052"
                      }}
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" className="my-auto">
                        <path className="my-auto" d="m4.83 12.49 2.04 1.83-.83 2.9-1 3.5c-.12.4.03.84.37 1.08.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63 3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5-.83-2.9 2.04-1.83 2.5-2.25c.3-.27.41-.69.28-1.06-.13-.38-.47-.64-.87-.68l-3.15-.25-2.56-.2-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25 2.52-.2.62-.05.59-.05.84-1.86 1.2-2.66 1.2 2.66.84 1.86.59.05.62.05 2.52.2.83.07-.77.69-2.5 2.25-.46.42.17.6 1.25 4.38-3.74-2.49-.55-.37-.55.37-3.74 2.49 1.25-4.38.17-.6-.46-.42L6.16 11l-.77-.69z"></path>
                      </svg>
                    </span>
                    <img
                      src={curso.img}
                      alt={curso.nombre}
                      className="course-image"
                      style={{position:"relative"}}
                    />


                      <span
                        className="glass-icon"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 3,
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



                    {/* Nombre del curso */}
                    <h3 className="curso-nombre-dashboard"  style={{position: "relative", zIndex:2, textAlign:"center", fontWeight:"200", fontSize:"12px"}}>{curso.nombre}</h3>
                  </div>
                    
                </header>
            </div>)
          }))}
        </div>
  </div>
  }






  return (
    <div>
      {!cargando ?
        <div style={{width:"100%"}}>
          {cargaUltimos(ultimos)}
          {cargarContenidoFavorio(contenidoFavorito)}
          {cargarConsejos(consejosUsuario)}
          <MasCursos />
        </div>
        : 
        <div className="d-flex flex-row justify-content-center cargando">
          <h4 style={{margin:"0 20px 0 0", textAlign:"center"}}>Cargando</h4>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      }
    </div>
  );
};

export default Dashboard;
