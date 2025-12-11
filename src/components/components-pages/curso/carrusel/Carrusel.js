import React, { useState, useEffect } from 'react';
import './Carrusel.css';

const Carrusel = ({ imagenes }) => {
  const [indiceActual, setIndiceActual] = useState(1);  // Empezamos desde la segunda imagen
  const [isTransitioning, setIsTransitioning] = useState(true);  // Comienza con transición habilitada

  const totalImagenes = imagenes.length;

  // Función para mover a la siguiente imagen
  const siguienteImagen = () => {
    if (isTransitioning) return; // Evitar múltiples clics mientras transita
    setIsTransitioning(true);

    setIndiceActual((prevIndice) => {
      const nuevoIndice = prevIndice + 1;
      if (nuevoIndice === totalImagenes + 1) {
        // Volver al principio sin animación
        setTimeout(() => setIndiceActual(1), 500);  // Después de la animación
        return nuevoIndice;
      }
      return nuevoIndice;
    });
  };

  // Función para mover a la imagen anterior
  const imagenAnterior = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setIndiceActual((prevIndice) => {
      const nuevoIndice = prevIndice - 1;
      if (nuevoIndice === 0) {
        // Volver al final sin animación
        setTimeout(() => setIndiceActual(totalImagenes), 500);
        return nuevoIndice;
      }
      return nuevoIndice;
    });
  };

  useEffect(() => {
    // Reseteamos la transición luego de que se actualiza el índice
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);  // Duración de la animación

    return () => clearTimeout(timer);
  }, [indiceActual]);

  return (
    <div className="carrusel-container">
      <button onClick={imagenAnterior} className="animate__animated animate__fadeIn animate__delay-1s boton-carrusel">&#10094; {/* Flecha izquierda */}</button>
      
      <div className="carrusel">
        <div
          className="imagenes-carrusel"
          style={{
            transform: `translateX(-${indiceActual * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease' : 'none',
          }}
        >
          {/* Clonamos las imágenes para que el desplazamiento sea continuo */}
          <div className="imagen-carrusel my-auto">
            <img className="my-auto" src={imagenes[totalImagenes - 1]} alt="Imagen anterior" />
          </div>

          {imagenes.map((img, index) => (
            <div className="imagen-carrusel my-auto" key={index}>
               <img className="my-auto rounded" src={img} alt={`Imagen ${index + 1}`} />
            </div>
          ))}

          <div className="imagen-carrusel my-auto">
            <img className="my-auto" src={imagenes[0]} alt="Imagen siguiente" />
          </div>
        </div>
      </div>

      <button onClick={siguienteImagen} className="animate__animated animate__fadeIn animate__delay-1s boton-carrusel">&#10095; {/* Flecha derecha */}</button>
    </div>
  );
};

export default Carrusel;

