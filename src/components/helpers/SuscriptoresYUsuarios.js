// src/components/components-pages/perfil-usuario/Dashboard.js

import { firebase, db } from "../../firebase//firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCoursesOnce } from "../../actions/auth";

const SuscriptoresYUsuarios = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [modalFoto, setModalFoto] = useState(false);
  const [imgUsuario, setImgUsuario] = useState("");
  const [visible, setVisible] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);

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
  const unsubscribe = db.collection("users")
    .onSnapshot(
      (snapshot) => {
        setUsuarios(prevUsuarios => {
          let usuariosActualizados = [...prevUsuarios];

          snapshot.docChanges().forEach(change => {
            const data = {
              uid: change.doc.id,
              name: change.doc.data().name || "",
              email: change.doc.data().email || "",
              photoUrl: change.doc.data().photoURL || "",
              suscripcionActiva: change.doc.data().suscripcionActiva || false,
              suscripcionId: change.doc.data().suscripcionId || "",
              consejos: change.doc.data().consejos || [],
              contenidoFavorito: change.doc.data().contenidoFavorito || [],
              ultimosTresVistos: change.doc.data().ultimosTresVistos || [],
            };

            if (change.type === "added") {
              // Evita duplicados si ya existe
              const existe = usuariosActualizados.some(u => u.uid === data.uid);
              if (!existe) {
                usuariosActualizados.push(data);
              }
            }

            if (change.type === "modified") {
              usuariosActualizados = usuariosActualizados.map(u =>
                u.uid === data.uid ? data : u
              );
            }

            if (change.type === "removed") {
              usuariosActualizados = usuariosActualizados.filter(
                u => u.uid !== data.uid
              );
            }
          });

          return usuariosActualizados;
        });
      },
      (error) => {
        console.error("❌ Error al escuchar usuarios:", error);
      }
    );

  return () => unsubscribe();

}, [setUsuarios]);
 
 
 
 
 
 
 
 
useEffect(() => {
  const unsubscribe = db.collection("suscripciones")
    .onSnapshot(
      (snapshot) => {
        const suscripcionesLeidas = snapshot.docs.map(doc => ({
          id: doc.id,
          uid: doc.data().uid || "",
          createdAt: doc.data().createdAt || "",
          status: doc.data().status || "",
        }));

        setSuscripciones(suscripcionesLeidas);
      },
      (error) => {
        console.error("❌ Error al escuchar suscripciones:", error);
      }
    );

  // Limpieza del listener cuando el componente se desmonta
  return () => unsubscribe();

}, [setSuscripciones]);





const ampliarFoto = (url) => {
  setImgUsuario(url);
  setTimeout(() => setVisible(true), 100); // pequeño delay para activar fade
  setModalFoto(true);
}






const cargarUsuarios = (Usuarios)=>{
  return <div className="animate__animated animate__fadeInDown animate__slow" style={{boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)", borderRadius:"15px", backgroundColor:"#00000050", width:"95%", margin:"0 auto 50px auto", padding:"40px 0"}}>
        {(Usuarios?.length > 0) ? (
          <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Usuarios</h2>
          ) :
          <div style={{display:"flex", justifyContent:"center"}}>
            <p style={{padding:"0", margin:"auto 0", textAlign:"center", width:"70%"}}>
              Aquí apareceran todos los usarios que se han registrado en la plataforma, junto con su información de suscripción, consejos guardados, contenido favorito y últimos cursos vistos.
            </p>
          </div>
        }

        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", marginTop:"30px"}}>

            <section style={{ display: "grid", gridTemplateColumns: 'repeat(5, 1fr)', padding: '0 0 10px 0', textDecoration: "none", color: "inherit", width:"100%" }}>
                <h6>Usuario</h6>
                <h6>Email</h6>
                <h6>Foto</h6>
                <h6>Suscripto</h6>
                <h6>ID Suscrip</h6>
            </section>
          {(Usuarios?.length === 0) ? (
            ""
          ) : (Usuarios?.map((usuario, index) => {
            return (
            <div key={usuario.id+"ultimos videos vistos"+index} style={{marginBottom:"0px", width:"100%"}}>
                <header
                    style={{
                      width: "100%",
                      margin: "0",
                      borderRadius: "0px",
                      overflow: "hidden",
                      backgroundColor: "#3b3b3b",
                      boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)",
                      display: "flex",                   
                    }}
                >

                  <div
                    style={{ display: "grid", gridTemplateColumns: 'repeat(5, 1fr)', padding: '0', textDecoration: "none", color: "inherit", width:"100%" }}
                  >
                    <p className="curso-nombre-dashboard"  style={{textAlign:"initial", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{index + 1} - {usuario?.name}</p>
                    <p className="curso-nombre-dashboard"  style={{textAlign:"center", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{usuario?.email}</p>
                    <section className="curso-nombre-dashboard"  style={{display:"flex", justifyContent:"center", alignItems:"center", border:"1px solid #ccc", padding:"10px", margin:"0"}}>
                        {usuario?.photoUrl ? <img onClick={()=>ampliarFoto(usuario.photoUrl)} src={usuario.photoUrl} alt={usuario.name} style={{width:"50px", height:"50px", borderRadius:"50%", objectFit:"cover", cursor:"pointer"}} /> : <div style={{width:"50px", height:"50px", borderRadius:"50%", backgroundColor:"#ccc", display:"flex", justifyContent:"center", alignItems:"center"}}><span style={{color:"#000"}}>No Foto</span></div>}
                        {/* {usuario.photoUrl} */}
                    </section>
                    <p 
                        className="curso-nombre-dashboard"  
                        style={{
                            textAlign:"center", 
                            fontWeight:"200", 
                            fontSize:"12px", 
                            border:"1px solid #ccc", 
                            padding:"10px", 
                            margin:"0",
                            color: usuario?.suscripcionActiva ? "#5bff5b" : "#d6d6d6",
                        }}
                    >
                        {usuario?.suscripcionActiva ? "Sí" : "No"}
                    </p>
                    <p className="curso-nombre-dashboard"  style={{textAlign:"center", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{usuario?.suscripcionId}</p>
                  </div>
                    
                </header>
            </div>)
          }))}
        </div>
  </div>
}







const buscarNombre = (uid) => {
  const usuarioEncontrado = usuarios.find(usuario => usuario.uid === uid);
  return usuarioEncontrado ? usuarioEncontrado.name : "Usuario no encontrado";
}

const consultaSuscripcion = (uid) => {
  const usuarioEncontrado = usuarios.find(usuario => usuario.uid === uid);
  return usuarioEncontrado ? usuarioEncontrado.suscripcionActiva : null;
}

const fechaFormateada = (fecha) => {
    if (!fecha) return "Fecha no disponible";
    const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}









const cargarSuscriptores = (Suscriptores)=>{
  return <div className="animate__animated animate__fadeInDown animate__slow" style={{boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)", borderRadius:"15px", backgroundColor:"#00000050", width:"95%", margin:"0 auto 50px auto", padding:"40px 0"}}>
        {(Suscriptores?.length > 0) ? (
          <h2 style={{fontWeight:"300", fontSize:"20px", textAlign:"center"}}>Suscriptores</h2>
          ) :
          <div style={{display:"flex", justifyContent:"center"}}>
            <p style={{padding:"0", margin:"auto 0", textAlign:"center", width:"70%"}}>
              Aquí apareceran todos los usarios que se han suscripto en la plataforma.
            </p>
          </div>
        }

        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", marginTop:"30px"}}>

            <section style={{ display: "grid", gridTemplateColumns: 'repeat(5, 1fr)', padding: '0 0 10px 0', textDecoration: "none", color: "inherit", width:"100%" }}>
                <h6>Nombre</h6>
                <h6>id</h6>
                <h6>uid</h6>
                <h6>Fecha</h6>
                <h6>Estado</h6>
            </section>
          {(Suscriptores?.length === 0) ? (
            ""
          ) : (Suscriptores?.map((suscriptor, index) => {
            const suscripcion = consultaSuscripcion(suscriptor.uid);

            if(!suscripcion) return null;
            return (
            <div key={suscriptor.id+"ultimos videos vistos"+index} style={{marginBottom:"0px", width:"100%"}}>
                <header
                    style={{
                      width: "100%",
                      margin: "0",
                      borderRadius: "0px",
                      overflow: "hidden",
                      backgroundColor: "#3b3b3b",
                      boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)",
                      display: "flex",                   
                    }}
                >

                  <div
                    style={{ display: "grid", gridTemplateColumns: 'repeat(5, 1fr)', padding: '0', textDecoration: "none", color: "inherit", width:"100%" }}
                  >
                    <p className="curso-nombre-dashboard" style={{textAlign:"center", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{buscarNombre(suscriptor?.uid)}</p>
                    <p className="curso-nombre-dashboard" style={{textAlign:"initial", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{suscriptor?.id}</p>
                    <p className="curso-nombre-dashboard" style={{textAlign:"initial", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{suscriptor?.uid}</p>
                    <p className="curso-nombre-dashboard" style={{textAlign:"center", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>
                        {/* {suscriptor?.createdAt} */}{fechaFormateada(suscriptor?.createdAt)}

                    </p>
                    <p className="curso-nombre-dashboard" style={{textAlign:"center", fontWeight:"200", fontSize:"12px", border:"1px solid #ccc", padding:"10px", margin:"0"}}>{suscriptor?.status}</p>
                  </div>
                    
                </header>
            </div>
            )
          }))}
        </div>
  </div>
}


const cerrarModalFoto = () => {
  setVisible(false);
   setTimeout(() => setModalFoto(false), 300); // coincide con duración fade
}






  return (
    <div>
      {!cargando ?
        <div style={{width:"100%", padding:"60px 0 0 0", backgroundColor:"#0000009d"}}>
            {cargarSuscriptores(suscripciones)}
            {cargarUsuarios(usuarios)}
          {/* <MasCursos /> */}
        </div>
        : 
        <div className="d-flex flex-row justify-content-center cargando">
          <h4 style={{margin:"0 20px 0 0", textAlign:"center"}}>Cargando</h4>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      }


      {modalFoto && (
        <div
            onClick={cerrarModalFoto}
            style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.2s ease"
            }}
        >
            <div
            onClick={(e) => e.stopPropagation()}
            style={{
                backgroundColor: "#000000f3",
                padding: "0",
                borderRadius: "10px",
                width: "auto",
                textAlign: "center",
                boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.55)",
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.97)",
                transition: "opacity 0.3s ease, transform 0.3s ease"
            }}
            >
            
            <img src={imgUsuario} alt="Foto Ampliada" style={{width:"150px", height:"auto", borderRadius:"10px"}} />

            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <>
                    <button
                    onClick={cerrarModalFoto}
                    style={{
                        padding: "10px",
                        backgroundColor: "#ffffff0e",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "white",
                        width:"auto",
                    }}
                    >
                    X
                    </button>
                </>
            </div>
            </div>
        </div>
    )}
    </div>
  );
};

export default SuscriptoresYUsuarios;
