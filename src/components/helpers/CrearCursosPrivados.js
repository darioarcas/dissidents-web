// src/components/helpers/CrearCursosPrivados.js

import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";

export const CrearCursos = () => {
  const cursos = [
    "Curso de Produccion Musical Inicial con Ableton",
    "Curso de Produccion Musical Avanzado con Ableton",
    "Curso de Mezcla y Masterizacion Incial",
    "Curso de Progressive Avanzado Intensivo con Ableton",
  ];




  // PARA CREAR UN CURSO PRIVADO, SOLO CAMBIA EL NOMBRE Y EJECUTALO UNA VEZ
  const agregarCursoUnico = [
    "Curso de Mezcla y Masterizacion",
  ];

  const generarClases = (cantidad) => {
    const clases = [];
    for (let i = 1; i <= cantidad; i++) {
      clases.push({
        titulo: `Clase ${i}`,
        videoUrl: "",
        descripcion: "",
        material:{
            nota:"",
            url1:"",
            url2:"",
            url3:"",
        },
        actividad:{
            nota:"",
            url1:"",
            url2:"",
            url3:"",
        },
      });
    }
    return clases;
  };

  const crearCursosEnFirestore = async (cursos = []) => {
    if(cursos.length === 0){
    // if(true){
      alert(`No existen cursos que agregar: ${cursos}`)
      return
    }
    try {
      for (const nombreCurso of cursos) {
        // Usamos add() para generar ID automático
        await db.collection("cursos_privados").add({
          nombre: nombreCurso,
          precio:25000,
          descripcion: "",
          clases: generarClases(16),
          img: "",
          material:{
            descripcion:"",
            url1:{
              nota:"",
              url:""
            },
            url2:{
              nota:"",
              url:""
            },
            url3:{
              nota:"",
              url:""
            },
            url4:{
              nota:"",
              url:""
            },
            url5:{
              nota:"",
              url:""
            },
            url6:{
              nota:"",
              url:""
            },
            url7:{
              nota:"",
              url:""
            },
            url8:{
              nota:"",
              url:""
            },
          },
        });
        console.log(`Curso creado: ${nombreCurso}`);
      }

      alert("✅ Cursos creados correctamente en Firestore.");
    } catch (error) {
      console.error("❌ Error al crear cursos:", error);
    }
  };

  return (
    <div style={{ paddingTop: "90px", margin:"0 auto", width:"100%", display:"flex", justifyContent:"center", flexDirection:"column" }}>
      
      <h1 style={{textAlign:"center", marginBottom:"50px"}}>Cursos Privados</h1>


      <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>
        <h2 style={{textAlign:"center"}}>Agregar un curso único</h2>
        <p className="p-0 m-0">Esto agregará automaticamente un curso con el nombre: </p>
        <p>{agregarCursoUnico[0]}</p>
        <button className="btn btn-light mx-auto" onClick={()=>{crearCursosEnFirestore(agregarCursoUnico)}}>
          Agregar Curso
        </button>
      </section>
      
      <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>

        <h2 style={{textAlign:"center"}}>Crea una estructura con en array cursos</h2>
        <button className="btn btn-light mx-auto" onClick={()=>{crearCursosEnFirestore(cursos)}}>
          Crear Estructura
        </button>
      </section>


      <Link to="/crear-cursos-publicos" className="btn btn-success mx-auto my-5">
        Ir a crear Cursos Publicos
      </Link>
    </div>
  );
};

export default CrearCursos;
