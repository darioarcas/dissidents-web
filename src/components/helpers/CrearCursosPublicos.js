// src/components/helpers/CrearCursosPublicos.js

import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

export const CrearCursos = () => {
  const [cursosPrivados, setCursosPrivados] = useState([]);
  const curso = [
    // PREPARACIÓN:
    // Para agregar un curso nuevo, primero debes crear uno en cursos_privados en firestore
    // Una vez hecho, leer los cursos con el boton "leer cursos privados", 
    // copiar el id en firestore de ese curso y pegar en cursoId
    // hacer lo mismo con el nombre, la descripcion (si tiene) y la imagen (si tiene)
    // El precio no es necesario si preferis trabajar con suscripciones
    // IMPORTANTE: Agregar el curso con el servidor en localhost, no en produccion

    // SUBIR A FIRESTORE:
    // Se añadira el curso a tus 
    // cursos_publicos en firestore, sin borrar ningun curso que ya hubieses tenido de antemano
    {
      cursoId: "9VUgHiWmUwO4L9hWHF8r",
      nombre: "Curso de Mezcla y Masterizacion",
      descripcion: "",
      precio:0,
      imagen: "",
    },
  ]

  const generarTemario = (cantidad) => {
    const temario = [];
    for (let i = 1; i <= cantidad; i++) {
      temario.push({
        titulo: `Modulo ${i}`,
        descripcion: "",        
      });
    }
    return temario;
  };

  const crearCursosEnFirestore = async (cursosPrivados=[]) => {
    if(cursosPrivados.length === 0){
    // if(true){
      alert(`No existen cursos que agregar: ${cursosPrivados}`)
      return
    }

    try {
      for (const curso of cursosPrivados) {//cursos) {
        // Usamos add() para generar ID automático
        await db.collection("cursos_publicos").add({
          nombre: curso.nombre,
          precio:curso.precio,
          descripcion: curso.descripcion,
          temario: generarTemario(16),
          imagen: curso.imagen,
          cursoId: curso.cursoId,
        });
        // console.log(`Curso creado: ${curso.nombre}`);
        // alert( `✅ Curso creado: ${curso.nombre}`);
        Swal.fire({
          toast: true,
          position: 'top-end',           // esquina superior derecha
          icon: 'success',               // ícono de éxito
          title: '✅ Curso creado: ' + curso.nombre,
          showConfirmButton: false,      // sin botón de OK
          timer: 5000,                   // 5 segundos
          timerProgressBar: true,        // barra de tiempo
          background: '#333',            // fondo oscuro
          color: '#fff',                 // texto claro
          iconColor: '#00e676',          // color del ícono
          customClass: {
            popup: 'small-toast'         // clase CSS personalizada (opcional)
          }
        });
      }

      setCursosPrivados([]); // Limpiar el estado después de crear los cursos

      // alert("✅ Cursos creados correctamente en Firestore.");
      Swal.fire({
        toast: true,
        position: 'top-end',           // esquina superior derecha
        icon: 'success',               // ícono de éxito
        title: "✅ Cursos creados correctamente en Firestore.",
        showConfirmButton: false,      // sin botón de OK
        timer: 3000,                   // 5 segundos
        timerProgressBar: true,        // barra de tiempo
        background: '#333',            // fondo oscuro
        color: '#fff',                 // texto claro
        iconColor: '#00e676',          // color del ícono
        customClass: {
          popup: 'small-toast'         // clase CSS personalizada (opcional)
        }
      });
    } catch (error) {
      console.error("❌ Error al crear cursos:", error);
    }
  };
  
  
  
  
  
  
  const crearCursoUnicoEnFirestore = async (cursosPrivados=[]) => {
    if(cursosPrivados.length === 0){
    // if(true){
      alert(`No existen cursos que agregar: ${cursosPrivados}`)
      return
    }

    try {
      for (const curso of cursosPrivados) {//cursos) {
        // Usamos add() para generar ID automático
        await db.collection("cursos_publicos").add({
          nombre: curso.nombre,
          precio:curso.precio,
          descripcion: curso.descripcion,
          temario: generarTemario(16),
          imagen: curso.imagen,
          cursoId: curso.cursoId,
        });
        // console.log(`Curso creado: ${curso.nombre}`);
        // alert( `✅ Curso creado: ${curso.nombre}`);
        Swal.fire({
          toast: true,
          position: 'top-end',           // esquina superior derecha
          icon: 'success',               // ícono de éxito
          title: '✅ Curso creado: ' + curso.nombre,
          showConfirmButton: false,      // sin botón de OK
          timer: 5000,                   // 5 segundos
          timerProgressBar: true,        // barra de tiempo
          background: '#333',            // fondo oscuro
          color: '#fff',                 // texto claro
          iconColor: '#00e676',          // color del ícono
          customClass: {
            popup: 'small-toast'         // clase CSS personalizada (opcional)
          }
        });
      }

      setCursosPrivados([]); // Limpiar el estado después de crear los cursos

      // alert("✅ Cursos creados correctamente en Firestore.");
      Swal.fire({
        toast: true,
        position: 'top-end',           // esquina superior derecha
        icon: 'success',               // ícono de éxito
        title: "✅ Cursos creados correctamente en Firestore.",
        showConfirmButton: false,      // sin botón de OK
        timer: 3000,                   // 5 segundos
        timerProgressBar: true,        // barra de tiempo
        background: '#333',            // fondo oscuro
        color: '#fff',                 // texto claro
        iconColor: '#00e676',          // color del ícono
        customClass: {
          popup: 'small-toast'         // clase CSS personalizada (opcional)
        }
      });
    } catch (error) {
      console.error("❌ Error al crear cursos:", error);
    }
  };




  const leerCursosPrivados = async () => {
    try {
      const snapshot = await db.collection("cursos_privados").get();
      const cursosLeidos = snapshot.docs.map(doc => ({
        cursoId: doc.id,
        nombre: doc.data().nombre || "",
        descripcion: doc.data().descripcion || "",
        imagen: doc.data().imagen || "",
        precio: doc.data().precio || "",
      }));

      setCursosPrivados(cursosLeidos);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: "✅ Cursos privados leídos",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        background: '#333',
        color: '#fff',
        iconColor: '#00e676',
        customClass: {
          popup: 'small-toast'
        }
      });
    } catch (error) {
      console.error("❌ Error al leer cursos privados:", error);
    }
  };

  const copiarArrayAlPortapapeles = async () => {
      try {
        const jsFormatted = cursosPrivados.map(curso => {
          return `  {
        cursoId: "${curso.cursoId}",
        nombre: "${curso.nombre}",
        descripcion: "${curso.descripcion}",
        imagen: "${curso.imagen}",
      }`;
        });

        const finalString = "[\n" + jsFormatted.join(",\n") + "\n]";

        await navigator.clipboard.writeText(finalString);

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: "✅ Array copiado",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          background: '#333',
          color: '#fff',
          iconColor: '#00e676',
          customClass: {
            popup: 'small-toast'
          }
        });
      } catch (err) {
        console.error("❌ Error al copiar array:", err);
      }
  };







  return (
    <div style={{ paddingTop: "90px", margin:"0 auto", width:"100%", display:"flex", justifyContent:"center", flexDirection:"column" }}>

      <h1 style={{textAlign:"center", marginBottom:"50px"}}>Cursos Publicos</h1>


            <hr style={{ margin: "2rem 0" }} />


      <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>

        <h2>Agregar curso Publico único</h2>
        <p style={{margin:"0", padding:"0"}}>
               Para agregar un curso nuevo, primero debes crear uno en cursos_privados en firestore.
               Una vez hecho, leer los cursos con el boton "leer cursos privados", 
               copiar el id en firestore de ese curso y pegar en cursoId
               hacer lo mismo con los otros campos del objeto
        </p>
        <button 
          className="btn btn-success"
          onClick={()=>{crearCursoUnicoEnFirestore(curso)}} 
          disabled={cursosPrivados.length === 0} 
        >
          Agregar curso
        </button>
      </section>



      <h2 style={{textAlign:"center", width:"100%", margin:"0 auto", backgroundColor:"black", padding:"30px", borderRadius:"15px"}}>Crear Estructura desde Cero (implica borrar todos los cursos publicos, problemas futuros con los id)</h2>
      
      <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>
        <h2>PASO Nº 1: Leer cursos privados</h2>
        <p>No hace falta copiar el array para generar la estructura en Firebase</p>
        <button className="btn btn-primary mx-auto" onClick={leerCursosPrivados}>Leer cursos privados</button>
      </section>





      {cursosPrivados.length > 0 && (
        <>
          <pre
            style={{
              background: "#222",
              color: "#0f0",
              padding: "1rem",
              marginTop: "1rem",
              maxHeight: "300px",
              overflowY: "auto",
              fontSize: "0.85rem",
              borderRadius: "5px",
            }}
          >
            {JSON.stringify(cursosPrivados, null, 2)}
          </pre>
          <button 
            className="btn btn-light"
            onClick={copiarArrayAlPortapapeles} 
            style={{ marginTop: "1rem" }}
          >
            Copiar array
          </button>
        </>
      )}



      <hr style={{ margin: "2rem 0" }} />


      <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>

        <h2>PASO Nº 2: Crear cursos en Firebase</h2>
        <p>Asegurate de borrar la coleccion cursos_publicos de firebase para evitar datos duplicados</p>
        <button 
          className="btn btn-success"
          onClick={()=>{crearCursosEnFirestore(cursosPrivados)}} 
          disabled={cursosPrivados.length === 0} 
        >
          Crear estructura
        </button>
      </section>


      <Link to="/crear-cursos-privados" className="btn btn-success mx-auto my-5">
        Ir a crear Cursos Privados
      </Link>



    </div>
  );
};

export default CrearCursos;



