import './AnimateBackground2.css';
import React, { useEffect, useState } from 'react';

const NUM_PARTICLES = 7;  // Número mayor de partículas para un fondo más denso

const getRandom = (min, max) => Math.random() * (max - min) + min;

// Función que genera partículas en base a una onda seno (patrón ondulante)
const createParticle = (forcedDelay = null, index) => {
  const size = getRandom(10, 500);  // Tamaño de la partícula
  const hue = getRandom(240, 300);  // Colores entre azul y violeta
  const saturation = getRandom(30, 60);
  const lightness = getRandom(30, 70);
  const speed = getRandom(1, 3);

  // Generar la posición inicial en la onda seno
  const top = getRandom(0, 100);  // Posición aleatoria vertical
  const left = getRandom(0, 100);  // Posición aleatoria horizontal

  return {
    id: Math.random().toString(36).substring(2),
    top,
    left,
    size,
    color: `hsl(${200 + Math.random() * 20}, 40%, ${20 + Math.random() * 80}%)`, // tonos azules suaves y variados. El porcentaje que esta a la mitad es la saturacion, y el ultimo porcentaje es la luminosidad, entre mas alto el numero mas claro el color. Al variar ambos se generan tonos pastel variados dentro de la gama de azules.
    // color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    duration: getRandom(15, 10),  // Aumentamos la duración para trayectorias más largas
    delay: forcedDelay !== null ? forcedDelay : getRandom(0, 5),
    speed,
  };
};

const AnimatedBackground2 = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Crear partículas iniciales
    const initialParticles = Array.from({ length: NUM_PARTICLES }, (_, index) => createParticle(0, index));
    setParticles(initialParticles);

    // Optimización: solicitar animación solo cuando la página está visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(handleVisibilityChange);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="animated-background">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            position: 'absolute',
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: particle.color,
            animation: `moveParticle ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
            filter: `blur(${getRandom(30, 100)}px)`, // Añadimos un blur aleatorio
            zIndex: -1, // Mantener las partículas atrás
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground2;

