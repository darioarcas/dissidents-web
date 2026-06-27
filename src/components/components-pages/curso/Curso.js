// import { ArrayCursos } from "../dj/ArraysCursos";
import { ArrayProduccionMusical } from "./ArrayProduccionMusical";
import { useParams } from 'react-router-dom';

import '../dj/DJ.css';
import TituloDesplegable from "./titulo-desplegable/TituloDesplegable";


const ArrayCursos = [];

export const Curso = () => {
    const { id } = useParams();  // Obtener el parámetro 'id' de la URL
    const cursos = [...ArrayCursos, ...ArrayProduccionMusical];
    const cursoEncontrado = cursos.find( cursos => cursos.id === id);


    const mensaje = "Hola,%20quisiera%20saber%20si%20hay%20cupos%20disponibles%20para";  // Mensaje predefinido codificado
    const numero = "5493513417537";
  return (
    <div className="app-wrapper position-relative">

        {/* Fondo con círculos animados */}
        <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div>

        <div className="content position-relative">
            <header
                    className='animate__animated animate__fadeIn animate__faster'
                    style={{ 
                        backgroundImage: `url(${cursoEncontrado.imgHeader})`,
                        backgroundSize: "cover", 
                        backgroundPosition: "center",
                        width:"100%",
                        height:"50%",
                        position:"relative",
                    }}
                >

                    {/* Overlay oscuro con opacidad al 10% */}
                    <div className='overlay-img'></div>


                    <div className='texto-header w-100'>

                        <h1 className='mb-4 texto-xxl text-white'>{cursoEncontrado.titulo}</h1>

                        <h1 className='fw-normal mt-4 fs-6'>{cursoEncontrado.descipcion}</h1>
                    </div>
                </header>

                <main>
                    {/* <section className="contenedor-body"> */}
                        <section className="contenedor-body">
                            <h1 className="titulo-body text-uppercase">{cursoEncontrado.tituloBody}</h1>
                            <ul>
                                {cursoEncontrado.informacionCurso.map((item) =>{
                                    // return <li>{item}</li>
                                    return <li><TituloDesplegable informacion={item} /></li>
                                })}
                            </ul>
                        </section>

                        {/* <img className="imagen-secundaria rounded" src={cursoEncontrado.imgSecundaria} alt="imagen del curso"/> */}

                    {/* </section> */}

                    {/* <section className="contenedor-temario">
                        <h1 className="titulo-body w-100">Temario</h1>
                        <ul>
                            {cursoEncontrado.temario.map((item) =>{
                                return <li>{item}</li>
                            })}
                        </ul>
                    </section> */}
                    <section className="contenedor-body">
                        <p className="fw-bold mb-0 mt-2">{cursoEncontrado.modalidadYTurnos[0].modalidad[0] && cursoEncontrado.modalidadYTurnos[0].modalidad[0].titulo}</p>
                        <p className="fw-semibold mt-0 p-0 text-secondary">{cursoEncontrado.modalidadYTurnos[0].modalidad[0] && cursoEncontrado.modalidadYTurnos[0].modalidad[0].descripcion}</p>
                        <p className="fw-bold mb-0 mt-2">{cursoEncontrado.modalidadYTurnos[0].turnos[0] && cursoEncontrado.modalidadYTurnos[0].turnos[0].titulo}</p>
                        <p className="fw-semibold mt-0 p-0 text-secondary">{cursoEncontrado.modalidadYTurnos[0].turnos[0] && cursoEncontrado.modalidadYTurnos[0].turnos[0].descripcion}</p>
                    </section>


                    <div className="bg-black galeria-img" style={{display:"none"}}>
                        <section 
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                zIndex: 1,
                            }}
                        >
                            {/* Contenedor de la imagen de fondo con opacidad */}
                            <div 
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `url(${cursoEncontrado.imgHeader})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    opacity: 0.1, // Opacidad de la imagen de fondo (20%)
                                    zIndex: -1, // imagen de fondo detrás de las demás imágenes
                                }}
                            />

                            
                            {/* Muestra las imágenes dentro de la sección */}
                            <div className="container mt-4">
                                <div className="row ancho-galeria">
                                    {cursoEncontrado.imgGaleria.map((img, index) => (
                                        <div className="col-12 col-sm-6 col-lg-6 mb-4" key={index}>
                                            <img
                                                className="w-100"
                                                src={img}
                                                alt={`imagen ${index + 1} de galeria del curso`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        </section>



                    </div>
                        
                        
                        <div className="contenido-header mb-5">
                            <a 
                                className="btn"
                                href={`https://wa.me/${numero}?text=${mensaje}%20${cursoEncontrado.titulo}%20y%20el%20costo.%20Muchas%20gracias!`}
                                target="_blank"
                                rel="noopener noreferrer" 
                            >
                                QUIERO INSCRIBIRME
                            </a>
                        </div>
                </main>
        </div>
    </div>
  )
}
