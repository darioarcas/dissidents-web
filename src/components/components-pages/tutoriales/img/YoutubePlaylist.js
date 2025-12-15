import { useEffect, useState } from 'react';
import { TarjetasCursos } from '../../dj/TarjetasCursos';

const YouTubePlaylist = ({ playlistId, resultados = 50, inicio = false }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Clave de la API de YouTube
  const apiKey = 'AIzaSyDfTOw7qr-LelCZM2etfJfNJQw9pqR_d5M';
  const channelId = 'UCYWYLARM4cdXL4BUeWgTjJw'; // ID del canal

  // Estado para el playlistId de la playlist de "Uploads"
  const [uploadsPlaylistId, setUploadsPlaylistId] = useState(null);

  // Función para obtener el playlistId de "Uploads"
  const fetchUploadsPlaylistId = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
      );
      const data = await response.json();
      const uploadsId = data.items[0].contentDetails.relatedPlaylists.uploads;
      setUploadsPlaylistId(uploadsId); // Guardamos el playlistId de "Uploads"
    } catch (err) {
      setError('No se pudo obtener el playlist de "Uploads".');
      setLoading(false);
    }
  };

  // Función para obtener videos de la playlist de "Uploads"
  const fetchVideos = async () => {
    try {
      if (!uploadsPlaylistId) return; // Si no tenemos el playlistId, no hacemos la petición
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${apiKey}`
      );
      const data = await response.json();
      setVideos(data.items);  // Guardar los videos en el estado
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los videos de la playlist.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadsPlaylistId(); // Obtener el playlistId de "Uploads"
  }, []); // Solo se ejecuta una vez, cuando el componente se monta

  useEffect(() => {
    if (uploadsPlaylistId) {
      fetchVideos(); // Obtener videos de la playlist de "Uploads"
    }
  }, [uploadsPlaylistId]); // Se ejecuta cuando el playlistId de "Uploads" está disponible

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const arrayVideosYoutube = videos.map((video) => ({
    titulo: video.snippet.title,
    // img: `https://img.youtube.com/vi/${video.snippet.resourceId.videoId}/hqdefault.jpg`, // Miniatura del video
    // videoId: video.snippet.resourceId.videoId, // Usamos solo el videoId
    img: `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`, // URL para embeber el video
    descripcion: video.snippet.description,
    playlistId: playlistId,
  }));

  return (
    <div className={`${!inicio ? 'container mt-4 d-flex flex-column' : ""} mx-auto`}>
      <TarjetasCursos ArrayCursos={arrayVideosYoutube} youtube={true} inicio={inicio} />
    </div>
  );
};

export default YouTubePlaylist;
