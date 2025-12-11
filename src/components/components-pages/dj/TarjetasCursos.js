import './TarjetasCursos.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export const TarjetasCursos = ({ArrayCursos, youtube=false, inicio=false, onDemand=false}) => {
  const location = useLocation();

  const convertirASlug = (texto) => {
    return texto
      .normalize('NFD')                         // separa tildes de letras (ej: á → a + ́)
      .replace(/[\u0300-\u036f]/g, '')          // elimina los signos diacríticos (tildes)
      .toLowerCase()                            // pasa a minúsculas
      .trim()                                   // quita espacios al principio y al final
      .replace(/[^a-z0-9\s-]/g, '')             // elimina caracteres no válidos (excepto espacios y guiones)
      .replace(/\s+/g, '-')                     // reemplaza espacios por guiones
      .replace(/-+/g, '-');                     // reemplaza múltiples guiones por uno solo
  };



  return (
    <div className={inicio ? ' container mt-2' : `container mt-5 mb-5`}>

      {/* Si NO es llamado por YoutubePlaylist */}
      {!youtube && !onDemand ? 
        <div className="row ancho-maximo">
          {ArrayCursos.map((curso, index) => {
            return (
              <div key={index} className={!inicio ? '' : 'col-12 col-md-4 mb-5'}>
                <div className="card sombra" style={{backgroundColor:"rgba(116, 116, 116, 0.15)", backdropFilter:"blur(12px)"}}>
                  <Link to={`${location.pathname}/${curso.id}`}>
                    <img src={curso.img} className="card-img-top" alt="imagen del curso" />
                  </Link>
                  <div className={`card-body tarjeta`}>
                    <h5 className="card-title fs-5 fw-bold text-uppercase">{curso.titulo}</h5>
                    <p className="card-text fs-6"><small>{curso.descipcion}</small></p>
                  </div>

                  <div className="card-body d-flex justify-content-between">
                    <Link to={`${location.pathname}/${curso.id}`} type='button' className="btn btn-light text-white fw-bolder fw-semibold p-2 mx-auto" style={{width:"70%", backgroundColor:"rgba(88, 88, 88, 0.38)"}}>Ver Más</Link>
                    {/* <Link to={`${location.pathname}`} type='button' className="btn btn-outline-info opacity-50 fw-semibold p-2 mx-auto" style={{width:"43%"}}>Comprar</Link> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        : ""   // Fin del Condicional  
      }
      
      
      
      
      {/* Si es llamado por YoutubePlaylist */}
      {youtube ? 
        <div className={inicio ? "w-100" : `row ancho-maximo`}>
          {ArrayCursos.map((curso, index) => {
            return (
              <div key={index} className={inicio ? 'w-75 mx-auto' : 'col-12 col-md-6 mb-5'}>
                <div className="card sombra" style={{backgroundColor:"rgba(116, 116, 116, 0.15)", backdropFilter:"blur(12px)"}}>
                  {/* <Link to={`${location.pathname}/${curso.id}`}>
                    <img src={curso.img} className="card-img-top" alt="imagen del curso" />
                  </Link> */}


                  <div className="embed-responsive tarjeta-youtube embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item card-img-top h-100"
                      src={curso.img}
                      title={curso.titulo}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>



                  <div className="card-body tarjeta">
                    <h5 className="card-title fs-6 fw-bold mt-2">{curso.titulo}</h5>
                    <p className="card-text fs-6 fw-bold opacity-50"><small className="text-body-secondary">{curso.descipcion}</small></p>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Botón para ver todos los videos */}
          <div className="mt-4 d-flex justify-content-center">
            <a
              href={`https://www.youtube.com/playlist?list=${ArrayCursos[0].playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
            >
              Lista en Youtube
            </a>
          </div>


        </div> 
        : ""   // Fin del Condicional  
      }




      {/* Si es llamado por onDemand */}
      {onDemand ? 
        <div className="row ancho-maximo">
          {ArrayCursos.map((curso, index) => {
            return (
              <div key={index} className={!inicio ? '' : 'col-12 col-md-4 mb-5'}>
                <div className="card sombra">
                  <Link to={`${location.pathname}/${curso.cursoId}`}>
                    <img src={curso.img} className="card-img-top" alt="imagen del curso" />
                  </Link>
                  <div className={`card-body tarjeta`}>
                    <h5 className="card-title fs-5 fw-bold text-uppercase">{curso.titulo}</h5>
                    <p className="card-text fs-6 fw-bold opacity-50"><small className="text-body-secondary">{curso.descripcion}</small></p>
                  </div>

                  <div className="card-body d-flex justify-content-between">
                    <Link 
                      to={`${location.pathname}/${convertirASlug(curso?.titulo)}`} 
                      type='button' 
                      className="btn btn-outline-dark text-black fw-bolder fw-semibold p-2 mx-auto" 
                      style={{width:"70%"}}
                    >
                      Ver Más
                    </Link>
                    {/* <Link to={`${location.pathname}`} type='button' className="btn btn-outline-info opacity-50 fw-semibold p-2 mx-auto" style={{width:"43%"}}>Comprar</Link> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        : ""   // Fin del Condicional  
      }



    </div>

  )
}
