import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CarruselSlider.css';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

const CarruselSlider = ({ cursos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);  // Controla la animación
  const [swipeDirection, setSwipeDirection] = useState(null);  // Dirección del swipe

  // Cambiar al siguiente curso cada 2 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
  }, [cursos.length, isAnimating]);

  // Función para manejar el cambio manual
  const nextSlide = () => {
    if (isAnimating) return;  // Evitar cambios si ya está animando
    setSwipeDirection('left');  // Indicar dirección del cambio
    setIsAnimating(true);  // Bloquear nuevos cambios hasta que la animación termine
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cursos.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;  // Evitar cambios si ya está animando
    setSwipeDirection('right');  // Indicar dirección del cambio
    setIsAnimating(true);  // Bloquear nuevos cambios hasta que la animación termine
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cursos.length) % cursos.length
    );
  };

  // Manejo de swipe táctil (gestos táctiles)
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,  // Evitar el comportamiento de scroll
    trackMouse: true,  // Permite también el swipe con el mouse en escritorio
  });

  // Función que se llama cuando la animación termina
  const handleAnimationComplete = () => {
    setIsAnimating(false);  // Permite nuevos cambios de imagen
  };

  return (
    <div className="carrusel-container" {...handlers}>
      {/* <button className="carrusel-button prev" onClick={prevSlide}>
        ❮
      </button> */}

      <motion.div
        className="carrusel-slide"
        key={currentIndex} // Cambiar el key para reiniciar la animación
        initial={{ opacity: 0, x: swipeDirection === 'left' ? 100 : -100 }} // Animación de entrada desde la izquierda o derecha
        animate={{ opacity: 1, x: 0 }}    // En su lugar
        exit={{ opacity: 0, x: swipeDirection === 'left' ? -100 : 100 }}   // Se mueve a la izquierda o derecha
        transition={{ duration: .3 }}      // Duración de la animación de 2 segundos
        onAnimationComplete={handleAnimationComplete} // Detecta cuando la animación termina
      >
        <Link to={`/videocursos`} className="course-card" style={{textDecoration:"none"}}>
          <img
            src={cursos[currentIndex].img}
            alt={cursos[currentIndex].titulo}
            className="course-image"
          />
          <h3 style={{ fontSize: '10px', fontWeight: '100', margin:"10px 0 0 0" }}>{cursos[currentIndex].titulo}</h3>
          {/* <p>{cursos[currentIndex].descripcion}</p> */}
        </Link>
      </motion.div>

      {/* <button className="carrusel-button next" onClick={nextSlide}>
        ❯
      </button> */}
    </div>
  );
};

export default CarruselSlider;
