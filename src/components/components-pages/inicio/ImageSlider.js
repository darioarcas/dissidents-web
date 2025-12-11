import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ images, duration = 3000 }) => {
  const [frontImage, setFrontImage] = useState(0); // Índice de la imagen del frente
  const [backImage, setBackImage] = useState(1); // Índice de la imagen del fondo
  const [recentIndexes, setRecentIndexes] = useState([]); // Últimas 3 imágenes mostradas
  const [isFadingOut, setIsFadingOut] = useState(false); // Controla el efecto fade

  // Función para obtener un índice aleatorio sin repetir las últimas 3 imágenes
  const getRandomIndex = () => {
    const availableIndexes = images
      .map((_, index) => index)
      .filter((index) => !recentIndexes.includes(index));
    return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true); // Inicia el fade-out de la imagen del frente

      setTimeout(() => {
        // Alternar las imágenes después del fade-out
        const newBackImage = getRandomIndex();

        setRecentIndexes((prev) => {
          const updated = [...prev, newBackImage];
          return updated.length > 3 ? updated.slice(1) : updated;
        });

        // Cambiar la imagen al frente y realizar el fade-in
        setFrontImage(backImage);
        setIsFadingOut(false);
        
        setTimeout(() => {
          setBackImage(newBackImage); // Actualiza la imagen del fondo
        }, 1000); // Tiempo del fade-in
      }, 1000); // Tiempo del fade-out
    }, duration);

    return () => clearInterval(interval);
  }, [images, duration, backImage, recentIndexes]);

  return (
    <div className="slider">
      {/* Imagen del frente */}
      <img
        src={images[frontImage]}
        alt={`Front Slide ${frontImage}`}
        className={`slide front ${isFadingOut ? "fade-out" : "fade-in"}`}
      />

      {/* Imagen del fondo */}
      <img
        src={images[backImage]}
        alt={`Back Slide ${backImage}`}
        className="slide back"
      />
    </div>
  );
};

export default ImageSlider;
