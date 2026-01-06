import { useEffect, useState } from 'react';
import { TarjetasCursos } from '../../dj/TarjetasCursos';





const YouTubePlaylist = ({ playlistId, resultados = 50, inicio=false}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Clave de la API de YouTube
  const apiKey = 'AIzaSyBIPHND0BUHLCfZbU1s3tElsUXSQSBvJPU';

  // Función para obtener videos de la playlist
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${resultados}&playlistId=${playlistId}&key=${apiKey}`
      );
      const data = await response.json();
      setVideos(data.items);  // Guardar los videos en el estado
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [playlistId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;


  const arrayVideosYoutube = videos.map((video) => ({ //para que solo aparezca un video .slice(0, 1)
        titulo: `${video.snippet.title}`,
        img:`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`,
        descripcion:"",
        playlistId: playlistId,
    }
  ))

  return (
    <div className={`${!inicio ? 'container mt-4 d-flex flex-column' : ""} mx-auto`}>
      {/* <h3 className='mx-auto mt-5 text-bg-dark p-3 rounded fw-semibold'>TUTORIALES</h3> */}

      <TarjetasCursos ArrayCursos={arrayVideosYoutube} youtube={true} inicio={inicio}/>
    </div>
  );
};

export default YouTubePlaylist;

