// import React, { useRef } from 'react';
// import YouTube from 'react-youtube';

// const CustomYouTubePlayer = ({url}) => {

//     const getYouTubeVideoId = (url2) => {
//         try {
//             const parsedUrl = new URL(url2);
//             const hostname = parsedUrl.hostname;

//             if (hostname === 'youtu.be') {
//             return parsedUrl.pathname.slice(1);
//             }

//             if (hostname.includes('youtube.com')) {
//             const params = parsedUrl.searchParams;
//             return params.get('v');
//             }

//             return null;
//         } catch (e) {
//             return null;
//         }
//     };

//   const playerRef = useRef(null);

//   const onReady = (event) => {
//     playerRef.current = event.target;
//   };

//   const playVideo = () => {
//     playerRef.current.playVideo();
//   };

//   const pauseVideo = () => {
//     playerRef.current.pauseVideo();
//   };

//   const seekForward = () => {
//     const currentTime = playerRef.current.getCurrentTime();
//     playerRef.current.seekTo(currentTime + 10, true);
//   };

//   const seekBackward = () => {
//     const currentTime = playerRef.current.getCurrentTime();
//     playerRef.current.seekTo(currentTime - 10, true);
//   };

//   const setQuality = (quality) => {
//     playerRef.current.setPlaybackQuality(quality);
//   };

//   const opts = {
//     height: '390',
//     width: '640',
//     playerVars: {
//       autoplay: 0,
//       controls: 0, // ❗️Esto oculta los controles de YouTube
//       modestbranding: 1,
//       rel: 0,
//       disablekb: 1, // ❗️Desactiva teclado del reproductor
//       fs: 0,        // ❗️Desactiva botón de pantalla completa
//     },
//   };

//   return (
//     <div>
//       <YouTube
//         videoId="QElyEyl0KQE" // El ID del video no listado
//         opts={opts}
//         onReady={onReady}
//         className="custom-player"
//       />
//       <div>
//         <button onClick={playVideo}>Play</button>
//         <button onClick={pauseVideo}>Pause</button>
//         <button onClick={seekBackward}>⏪ 10s</button>
//         <button onClick={seekForward}>⏩ 10s</button>
//         <button onClick={() => setQuality('hd720')}>Calidad HD</button>
//       </div>
//     </div>
//   );
// };

// export default CustomYouTubePlayer;






// import React, { useRef } from 'react';
// import YouTube from 'react-youtube';

// const CustomYouTubePlayer = () => {
//   const playerRef = useRef(null);

//   const onPlayerReady = (event) => {
//     playerRef.current = event.target;
//   };

//   const opts = {
//     height: '360',
//     width: '640',
//     playerVars: {
//       autoplay: 0,
//       controls: 0,       // Oculta los controles
//       modestbranding: 1, // Menos branding de YouTube
//       rel: 0,            // No mostrar videos relacionados
//       disablekb: 1,      // Desactiva el teclado
//       fs: 0,             // Desactiva pantalla completa
//     },
//   };

//   return (
//     <div>
//       <YouTube
//         videoId="QElyEyl0KQE"
//         opts={opts}
//         onReady={onPlayerReady}
//       />
//     </div>
//   );
// };

// export default CustomYouTubePlayer;



import React, { useRef } from 'react';
import YouTube from 'react-youtube';
import './CustomYouTube.css'; // asegúrate de importar el CSS

const CustomYouTubePlayer = () => {
  const playerRef = useRef(null);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      disablekb: 1,
    },
  };

  return (
    <div className="youtube-wrapper">
      <YouTube
        videoId="QElyEyl0KQE"
        opts={opts}
        onReady={onReady}
        className="youtube-embed"
      />
      {/* Overlays para ocultar visualmente elementos de YouTube */}
      <div className="overlay-top-right" />
      <div className="overlay-bottom-right" />
    </div>
  );
};

export default CustomYouTubePlayer;

