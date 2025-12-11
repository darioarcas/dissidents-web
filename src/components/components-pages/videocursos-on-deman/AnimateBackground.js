import React, { useEffect, useState } from 'react';

const NUM_CIRCLES = 6;

const getRandom = (min, max) => Math.random() * (max - min) + min;

const createCircle = (forcedDelay = null) => {
  const size = getRandom(60, 100);
  return {
    id: Math.random().toString(36).substring(2),
    top: getRandom(5, 95),
    left: getRandom(5, 95),
    size,
    // color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
    color: `white`,
    duration: getRandom(8, 32),
    delay: forcedDelay !== null ? forcedDelay : getRandom(1, 10), // default delay entre 2s y 10s
  };
};

const AnimatedBackground = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const initialCircles = [
      createCircle(0), // sin delay
      createCircle(0), // sin delay
      ...Array.from({ length: NUM_CIRCLES - 2 }, () => createCircle())
    ];
    setCircles(initialCircles);
  }, []);

  return (
    <div className="animated-background">
      {circles.map(circle => (
        <div
          key={circle.id}
          className="circle"
          style={{
            top: `${circle.top}%`,
            left: `${circle.left}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
            animationDuration: `${circle.duration}s`,
            animationDelay: `${circle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
