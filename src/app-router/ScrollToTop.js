// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Desactiva el scroll visualmente
    document.body.classList.add('no-scroll');

    // Forzar el scroll al principio de la página
    window.scrollTo(0, 0);

    // Restaurar el scroll después de un pequeño retraso
    setTimeout(() => {
      document.body.classList.remove('no-scroll'); // Vuelve a permitir el scroll
    }, 100); // Se asegura de que el scroll no se vea mientras navegas
  }, [location]); // Se ejecuta cada vez que cambia la ubicación

  return null; // Este componente no renderiza nada visible
};

export default ScrollToTop;
