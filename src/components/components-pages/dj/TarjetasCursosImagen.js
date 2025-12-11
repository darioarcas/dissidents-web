import './TarjetasCursos.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export const TarjetasCursosImagen = ({ArrayCursos}) => {
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
    <div className='container mt-2'>

      <div className="row ancho-maximo">


        {ArrayCursos.map((curso, index) => (
          <div key={index} className="col-12 col-md-4 mb-5">
            <div className="m-0 p-0 div-curso" style={{}}>
              <Link
                to={`${location.pathname}/${convertirASlug(curso.titulo)}`}
                className="curso-preview"
              >
                <div className="curso-wrapper">
                  {/* Imagen de fondo */}
                  <div
                    className="curso-fondo"
                    style={{ backgroundImage: `url(${curso.img})` }}
                  ></div>

                  {/* Capa negra tipo viñeta */}
                  <div className="curso-vignette"></div>

                  {/* Nueva capa glassmorphism */}
                  <div className="glass-efecto"></div>

                  {/* Contenido encima */}
                  <div className="curso-contenido">
                    <h5 className="curso-titulo">{curso.titulo}</h5>
                    <h4 className="curso-vermas">Ver Más</h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}


      </div>



    </div>

  )
}
