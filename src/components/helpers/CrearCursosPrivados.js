// src/components/helpers/CrearCursosPrivados.js

import React from "react";
import { db } from "../../firebase/firebase"; // Usás tu archivo firebase.js clásico

export const CrearCursos = () => {
  const cursos = [
    "Curso de DJ con CDJ Pioneer Inicial",
    "Curso de DJ Urbano Inicial",
    "Curso de DJ con CDJ Pioneer Avanzado",
    "Curso de DJ con Traktor",
    "Curso de Produccion Musical Electronica con Ableton Inicial",
    "Curso de Produccion Musical Electronica con Ableton Avanzado",
    "Curso de Mezcla y Masterizacion Incial",
    "Curso de Produccion Musical Urbana con Ableton",
    "Curso de Progressive Avanzado Intensivo con Ableton",
  ];

  const generarClases = (cantidad) => {
    const clases = [];
    for (let i = 1; i <= cantidad; i++) {
      clases.push({
        titulo: `Clase ${i}`,
        videoUrl: "", // Link a completar a mano
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

  const crearCursosEnFirestore = async () => {
    try {
      for (const nombreCurso of cursos) {
        // Usamos add() para generar ID automático
        await db.collection("cursos_privados").add({
          nombre: nombreCurso,
          precio:"",
          descripcion: "",
          clases: generarClases(16),
          imagen: "",
        });
        console.log(`Curso creado: ${nombreCurso}`);
      }

      alert("✅ Cursos creados correctamente en Firestore.");
    } catch (error) {
      console.error("❌ Error al crear cursos:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>CREAR CURSOS EN FIREBASE</h2>
      <h2>CREAR CURSOS EN FIREBASE</h2>
      <h2>CREAR CURSOS EN FIREBASE</h2>
      <h2>CREAR CURSOS EN FIREBASE</h2>
      <h2>CREAR CURSOS EN FIREBASE</h2>
      <button onClick={crearCursosEnFirestore}>Crear estructura</button>
    </div>
  );
};

export default CrearCursos;
