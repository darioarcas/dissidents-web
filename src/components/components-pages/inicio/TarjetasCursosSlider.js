import './TarjetasCursosSlider.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TarjetasCursosSlider = ({ ArrayCursos, youtube = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1); // Número de tarjetas visibles por slide

  // Función para ajustar el número de tarjetas visibles por slide dependiendo del tamaño de la pantalla
  const updateItemsPerSlide = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerSlide(2); // Dos tarjetas visibles por slide en pantallas grandes (1.5)
    } else {
      setItemsPerSlide(1); // Una tarjeta visible por slide en pantallas pequeñas
    }
  };

  useEffect(() => {
    updateItemsPerSlide(); // Llamamos al ajuste del número de items al cargar
    window.addEventListener('resize', updateItemsPerSlide); // Reajustamos en cambio de tamaño
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Funciones para avanzar y retroceder entre las tarjetas
  const goNext = () => {
    if (currentIndex < ArrayCursos.length - itemsPerSlide) {
      setCurrentIndex(currentIndex + itemsPerSlide); // Desplazamos hacia adelante
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerSlide); // Desplazamos hacia atrás
    }
  };

  return (
    <div className="container mt-5">
      <div className="slider-container">
        <div
          className="slider"
          style={{
            transform: `translateX(-${(currentIndex * 100) / (itemsPerSlide + 9.6)}%)`, // Calcular el desplazamiento 0.47
            transition: 'transform 0.5s ease', // Transición suave
            width: `${(ArrayCursos.length * (100 / itemsPerSlide))}%`, // El ancho del contenedor se ajusta al número de tarjetas
          }}
        >
          {ArrayCursos.map((curso, index) => (
            <div key={index} className="slider-item" style={{marginRight:"30px"}}>
              <div className="card" style={{backgroundColor:"rgba(116, 116, 116, 0.26)", backdropFilter:"blur(12px)"}}>
                <Link to={`${curso.pathname}`}>
                  <img
                    src={curso.img}
                    className="card-img-top"
                    alt="imagen del curso"
                    style={{height:"150px"}}
                  />
                </Link>
                <div className="card-body tarjeta" style={{height:"60px"}}>
                  <h5 className="card-title fs-6 fw-bold mt-2">{curso.titulo}</h5>
                  {/* <p className="card-text fs-6 fw-bold opacity-50">
                    <small className="text-body-secondary">{curso.descipcion}</small>
                  </p> */}
                </div>
                <div className="card-body d-flex justify-content-between">
                  <Link
                    to={`${curso.pathname}/${curso.id}`}
                    type="button"
                    className="btn btn-light text-white fw-bolder fw-semibold p-2 mx-auto"
                    style={{width:"70%", backgroundColor:"rgba(88, 88, 88, 0.38)"}}
                  >
                    Ver Curso
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-button prev" onClick={goPrev}>
          &#10094; {/* Flecha izquierda */}
        </button>
        <button className="slider-button next" onClick={goNext}>
          &#10095; {/* Flecha derecha */}
        </button>
      </div>
    </div>
  );
};

export default TarjetasCursosSlider;
