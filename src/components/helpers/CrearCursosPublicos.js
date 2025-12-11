// src/components/helpers/CrearCursosPublicos.js

import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import { useState } from "react";

export const CrearCursos = () => {
  const [cursosPrivados, setCursosPrivados] = useState([]);
  const cursos = [
  {
        cursoId: "pDNPw6ufGVUIDK92bBHb",
        nombre: "Curso de Mezcla y Masterizacion Incial",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "Ds4La90WmSxEzdyC3CuO",
        nombre: "Curso de DJ Urbano Inicial",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "xU8cTi81WXJIAP4vZBrE",
        nombre: "Curso de DJ con Traktor",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "nps0NwWeiM0iNSi0eJKG",
        nombre: "Curso de DJ con CDJ Pioneer Avanzado",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "FtKt6g2fieCbOuqN64h8",
        nombre: "Curso de Produccion Musical Electronica con Ableton Inicial",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "Rqs84SWXb9q0Q778zsnb",
        nombre: "Curso de Produccion Musical Electronica con Ableton Avanzado",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "AZWe4N6HbE2KKM1XQiCC",
        nombre: "Curso de DJ con CDJ Pioneer Inicial",
        descripcion: "",
        precio:0,
        imagen: "",
      },
  {
        cursoId: "M3FEyummGSJHiaqltt6s",
        nombre: "Curso de Progressive Avanzado Intensivo con Ableton",
        descripcion: "HOLAAAAAAAAA",
        imagen: "",
      },
  {
        cursoId: "e1NbdSjHO5q7QlVY3jlq",
        nombre: "Curso de Produccion Musical Urbana con Ableton",
        descripcion: "",
        precio:0,
        imagen: "",
      }
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

  const crearCursosEnFirestore = async () => {
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
    <div style={{ padding: "2rem" }}>
      <h2>.</h2>
      <h2>.</h2>
      <h2>.</h2>
      <h2>.</h2>

      <h2>PASO Nº 1: Leer cursos privados</h2>
      <p>No hace falta copiar el array para generar la estructura en Firebase</p>
      <button className="btn btn-primary" onClick={leerCursosPrivados}>Leer cursos privados</button>





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

      <h2>PASO Nº 2: Crear cursos en Firebase</h2>
      <p>Asegurate de borrar la coleccion cursos_publicos de firebase para evitar datos duplicados</p>
      <button 
        className="btn btn-success"
        onClick={crearCursosEnFirestore} 
        disabled={cursosPrivados.length === 0} 
      >
        Crear estructura
      </button>



    </div>
  );
};

export default CrearCursos;



