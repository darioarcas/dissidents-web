
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // tu configuración de Firestore
import './inicio/Inicio.css';
import logo from './inicio/img/dissidents-school-logo.png';
import fondo1 from './inicio/img/fondo1.jpg';
import whatsapp from './inicio/img/fondo-baner-whatsapp.jpg';
import imagenInicio from './inicio/img/inicio.jpg';
import Live from './inicio/img/live.png';
// import AnimatedBackground from './videocursos-on-deman/AnimateBackground';
import AnimatedBackground2 from "./videocursos-on-deman/AnimateBackground2";
import { ArrayCursos } from './dj/ArraysCursosOnDemand';
import Carrusel from './inicio/CarruselSlider';
import { useEffect, useState } from "react";
import Slider from "react-slick";
import YouTubePlaylist from "./tutoriales/img/YoutubePlaylist";
import SeccionFondo from "./inicio/SeccionFondo";
import { Link } from "react-router-dom";


export const Inicio = () => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  script.onload = () => {
    window.instgrm.Embeds.process();
  };
  document.body.appendChild(script);

  // Limpiar el script cuando el componente se desmonte
  return () => {
    document.body.removeChild(script);
  };
}, []);


  useEffect(() => {
    const unsubscribe = db.collection("instagramPosts")
      .doc("instagramEmbeds")
      .onSnapshot(
        async (snapshot) => {
          try {
            if (snapshot.exists) {
              
              const data = snapshot.data();
              // const urls = Object.values(data);
              const urls = Object.keys(data)  // obtener las claves del objeto
                .map(key => data[key].url);  // acceder al campo "url" de cada objeto
              console.log("Urls:", urls);
              setPosts(urls);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        },
        (error) => {
          console.error("Error getting document: ", error);
        }
      );

      console.log("posts cargados:", posts);

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, []);


    // Ejecutar el script de Instagram cuando cambien los posts
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [posts]);



  // Configuración del carrusel
  const settings = {
    dots: true, // Muestra los puntos para navegar
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Número de elementos visibles por slide
    slidesToScroll: 1, // Número de elementos a desplazar por vez
    autoplay: true, // Autoplay activado
    autoplaySpeed: 4000, // Velocidad del autoplay
    // arrowPrev: <button className="carrusel-button prev">❮</button>, // Personaliza la flecha previa
    // nextArrow: <button className="carrusel-button next">❯</button>, // Personaliza la flecha siguiente
    // arrows: true, // Muestra las flechas de navegación
  };

  return (
    <div className="app-wrapper position-relative">

      {/* Fondo con círculos animados */}
      {/* <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div> */}
      <AnimatedBackground2/>

      <div className="content position-relative">

        {/* <img style={{width:"100%", margin:"80px 0 0 0"}} alt="Dissidents School: Escuela Online de Producción Musical Electrónica" src={imagenInicio}></img> */}

        <header
          // inicio.css
          className="div-container"
        >

          {/* Imagen de fondo en Header */}
          <div
              // className="background-img"
              // style={
              //   {  
              //     backgroundImage: `url(${fondo1})`, 
              //     filter:"saturate(0)", 
              //     opacity:"0.9",
              //     zIndex:"-1",
              //   }
              // }
          ></div>

          {/* Overlay oscuro con opacidad al 10% */}
          <div className='overlay-img' style={{ backgroundColor:"rgba(0, 0, 0, 0.35)", zIndex:"-1", margin:"40px 0px"}}>
            <div style={{
              zIndex: "-1", // Coloca el overlay detrás del contenido
              backdropFilter: "blur(5px)", // Desenfoque de lo que está debajo de este div
              position: "absolute", // Asegúrate de que esté posicionado correctamente
              top: 0, bottom: 0, left: 0, right: 0 // Asegúrate de cubrir todo el área
            }}></div>
          </div>
          
          <div style={{padding:"30px 40px", position:"relative", zIndex:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            
            {/* <div style={{margin:"0 0 0 25px"}}>

              <img
                className="animate__animated animate__fadeInDown animate__slow"
                style={{maxHeight: '80px', width: '40%', objectFit: 'contain', padding:"0 auto", margin:"50px auto 20px auto", display:"flex", position:"relative"}}
                src={logo}
                //className='inicio-logo'
                alt='Dissident Logo'
              />
            </div> */}

            <h1 
              className="animate__animated animate__fadeInDown animate__slow h1-font-size-pc-responsive" 
              style={{fontWeight:"600", margin:"70px 0 5px 0", textAlign:"center"}}
            >
              Escuela Online de <strong>Producción Musical Electrónica</strong> con <em>Ableton Live</em>.
            </h1>

            <h2 className="animate__animated animate__fadeInDown animate__slow h2-font-size-pc-responsive" style={{fontWeight:"100", margin:"0 auto 50px auto", textAlign:"center", maxWidth:"800px"}}>Contamos con cursos de producción musical online para Ableton Live, diseñados para adaptarse a tu nivel y ayudarte a alcanzar tus objetivos musicales. Aprende a producir desde géneros como house, techno y progressive, con profesores expertos.</h2>
          </div>

        </header>

        <main style={{margin:"0px 0 0 0", padding:"0", display:"flex", flexDirection:"column", justifyContent:"center"}} >

          
        
          
          <SeccionFondo titulo={"Conoce todos nuestros cursos."} contenido={<Carrusel cursos={ArrayCursos} />}/>
          



          {/* <h2 style={{fontWeight:"600", fontSize:"16px", margin:"20px auto", textAlign:"center"}} className="animate__animated animate__fadeInDown">Conoce todos nuestros cursos.</h2>
          <div className="carrusel-cursos-inicio">
            <Carrusel cursos={ArrayCursos} />
          </div> */}
         




          
          <ul className="animate__animated animate__fadeInDown animate__slow" style={{fontWeight:"300", fontSize:"12px", margin:"0px auto 0 auto", textAlign:"initial", color:"#ffffff"}}>
            <li>Curso completo de producción musical online</li>
            <li>Aprende a producir música electrónica con Ableton Live</li>
            <li>Acceso a clases en video, ejercicios prácticos y proyectos de clases</li>
            <li>Cursos para todos los niveles: desde principiantes hasta avanzados</li>
          </ul>


          








          <Link
            to="https://chat.whatsapp.com/G8LviMAmJAx5eq2ciZvEcV" 
            target="_blank" rel="noopener noreferrer"
            style={{textDecoration:"none"}}>
          <SeccionFondo titulo={"Tenemos una comunidad en WhatsApp ¡Únete aquí!"} contenido={<div style={{width:"100%", margin:"0 auto", display:"flex", justifyContent:"center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 80 80" width="40px" height="40px"><path fill="#f2faff" d="M7.904,58.665L7.8,58.484c-3.263-5.649-4.986-12.102-4.983-18.66 C2.826,19.244,19.577,2.5,40.157,2.5C50.14,2.503,59.521,6.391,66.57,13.446C73.618,20.5,77.5,29.879,77.5,39.855 c-0.01,20.583-16.76,37.328-37.34,37.328c-6.247-0.003-12.418-1.574-17.861-4.543l-0.174-0.096L2.711,77.636L7.904,58.665z"/><path fill="#788b9c" d="M40.157,3L40.157,3c9.85,0.003,19.105,3.838,26.059,10.799C73.17,20.76,77,30.013,77,39.855 c-0.009,20.307-16.536,36.828-36.855,36.828c-6.149-0.003-12.237-1.553-17.606-4.482l-0.349-0.19l-0.384,0.101l-18.384,4.82 l4.91-17.933l0.11-0.403l-0.209-0.362c-3.22-5.574-4.92-11.94-4.917-18.41C3.326,19.52,19.852,3,40.157,3 M40.157,2 C19.302,2,2.326,18.969,2.317,39.824C2.313,46.49,4.055,53,7.367,58.735L2,78.339l20.06-5.26 c5.526,3.015,11.751,4.601,18.084,4.604h0.016c20.855,0,37.831-16.969,37.84-37.827c0-10.108-3.933-19.613-11.077-26.764 C59.78,5.942,50.28,2.003,40.157,2L40.157,2z"/><path fill="#40c351" d="M39.99,70c-5.009-0.003-9.965-1.263-14.332-3.646l-2.867-1.564l-3.159,0.828l-6.482,1.699	l1.659-6.061l0.907-3.312l-1.718-2.974C11.38,50.437,9.997,45.255,10,39.986C10.007,23.453,23.464,10.002,39.997,10	c8.022,0.003,15.558,3.126,21.221,8.793C66.881,24.461,70,31.998,70,40.011C69.992,56.547,56.535,70,39.99,70z"/><path fill="#fff" d="M56.561,47.376c-0.9-0.449-5.321-2.626-6.143-2.924c-0.825-0.301-1.424-0.449-2.023,0.449	c-0.599,0.9-2.322,2.924-2.845,3.523c-0.524,0.599-1.048,0.674-1.948,0.226c-0.9-0.449-3.797-1.4-7.23-4.462	c-2.674-2.382-4.478-5.327-5.001-6.227c-0.524-0.9-0.057-1.385,0.394-1.834c0.403-0.403,0.9-1.051,1.349-1.575	c0.449-0.524,0.599-0.9,0.9-1.5c0.301-0.599,0.151-1.126-0.075-1.575c-0.226-0.449-2.023-4.875-2.773-6.673	c-0.729-1.752-1.472-1.515-2.023-1.542c-0.524-0.027-1.123-0.03-1.722-0.03c-0.599,0-1.575,0.226-2.397,1.126	c-0.822,0.9-3.147,3.074-3.147,7.498s3.222,8.699,3.671,9.298c0.449,0.599,6.338,9.678,15.36,13.571	c2.144,0.924,3.821,1.478,5.125,1.894c2.153,0.684,4.113,0.587,5.664,0.355c1.728-0.259,5.321-2.174,6.067-4.273	c0.75-2.099,0.75-3.899,0.524-4.273C58.06,48.051,57.461,47.825,56.561,47.376z"/></svg>
                    </div>} imagenFondo={whatsapp}/>
          </Link>







          {/* WhatsApp Link */}

          {/* <a 
            className="curso-wrapper-inicio" 
            href="https://chat.whatsapp.com/G8LviMAmJAx5eq2ciZvEcV" 
            target="_blank" rel="noopener noreferrer"> */}
            {/* Imagen de fondo */}
            {/* <div
              className="curso-fondo-inicio"
              style={{ backgroundImage: `url(${whatsapp})` }}
            ></div> */}

            {/* Capa negra tipo viñeta */}
            {/* <div className="curso-vignettee-inicio"></div> */}

            {/* Nueva capa glassmorphism */}
            {/* <div className="glass-efecto-inicio"></div> */}

            {/* Contenido encima */}
            {/* <div className="curso-contenido">
              <h5 className="curso-titulo" style={{fontSize:"16px", margin:"0 20px"}}>Tenemos una comunidad en WhatsApp ¡Únete aquí!</h5>

              {
                    <div style={{width:"100%"}}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 80 80" width="40px" height="40px"><path fill="#f2faff" d="M7.904,58.665L7.8,58.484c-3.263-5.649-4.986-12.102-4.983-18.66 C2.826,19.244,19.577,2.5,40.157,2.5C50.14,2.503,59.521,6.391,66.57,13.446C73.618,20.5,77.5,29.879,77.5,39.855 c-0.01,20.583-16.76,37.328-37.34,37.328c-6.247-0.003-12.418-1.574-17.861-4.543l-0.174-0.096L2.711,77.636L7.904,58.665z"/><path fill="#788b9c" d="M40.157,3L40.157,3c9.85,0.003,19.105,3.838,26.059,10.799C73.17,20.76,77,30.013,77,39.855 c-0.009,20.307-16.536,36.828-36.855,36.828c-6.149-0.003-12.237-1.553-17.606-4.482l-0.349-0.19l-0.384,0.101l-18.384,4.82 l4.91-17.933l0.11-0.403l-0.209-0.362c-3.22-5.574-4.92-11.94-4.917-18.41C3.326,19.52,19.852,3,40.157,3 M40.157,2 C19.302,2,2.326,18.969,2.317,39.824C2.313,46.49,4.055,53,7.367,58.735L2,78.339l20.06-5.26 c5.526,3.015,11.751,4.601,18.084,4.604h0.016c20.855,0,37.831-16.969,37.84-37.827c0-10.108-3.933-19.613-11.077-26.764 C59.78,5.942,50.28,2.003,40.157,2L40.157,2z"/><path fill="#40c351" d="M39.99,70c-5.009-0.003-9.965-1.263-14.332-3.646l-2.867-1.564l-3.159,0.828l-6.482,1.699	l1.659-6.061l0.907-3.312l-1.718-2.974C11.38,50.437,9.997,45.255,10,39.986C10.007,23.453,23.464,10.002,39.997,10	c8.022,0.003,15.558,3.126,21.221,8.793C66.881,24.461,70,31.998,70,40.011C69.992,56.547,56.535,70,39.99,70z"/><path fill="#fff" d="M56.561,47.376c-0.9-0.449-5.321-2.626-6.143-2.924c-0.825-0.301-1.424-0.449-2.023,0.449	c-0.599,0.9-2.322,2.924-2.845,3.523c-0.524,0.599-1.048,0.674-1.948,0.226c-0.9-0.449-3.797-1.4-7.23-4.462	c-2.674-2.382-4.478-5.327-5.001-6.227c-0.524-0.9-0.057-1.385,0.394-1.834c0.403-0.403,0.9-1.051,1.349-1.575	c0.449-0.524,0.599-0.9,0.9-1.5c0.301-0.599,0.151-1.126-0.075-1.575c-0.226-0.449-2.023-4.875-2.773-6.673	c-0.729-1.752-1.472-1.515-2.023-1.542c-0.524-0.027-1.123-0.03-1.722-0.03c-0.599,0-1.575,0.226-2.397,1.126	c-0.822,0.9-3.147,3.074-3.147,7.498s3.222,8.699,3.671,9.298c0.449,0.599,6.338,9.678,15.36,13.571	c2.144,0.924,3.821,1.478,5.125,1.894c2.153,0.684,4.113,0.587,5.664,0.355c1.728-0.259,5.321-2.174,6.067-4.273	c0.75-2.099,0.75-3.899,0.524-4.273C58.06,48.051,57.461,47.825,56.561,47.376z"/></svg>
                    </div>
                }
            </div>
          </a> */}





          {/* YouTube Playlist de Novedades */}
          {/* <div style={{margin:"0px auto 60px auto", width:"100%"}}>
            <h2 style={{fontWeight:"600", fontSize:"16px", margin:"20px auto", textAlign:"center"}} className="animate__animated animate__fadeInDown">Novedades de Dissidents Records</h2>
            
            <YouTubePlaylist playlistId={'PLYafYnQmAYrvGshkeZpJdCD3ntI0fzUkX'} resultados={1} inicio={true}/>

          </div> */}



          <div style={{margin:"0 0 80px 0"}}>
            <SeccionFondo titulo={"Novedades de Dissidents Records"} contenido={<YouTubePlaylist playlistId={'PLYafYnQmAYrvGshkeZpJdCD3ntI0fzUkX'} resultados={1} inicio={true}/>}/>
          </div>

{/* 
          <div 
            className="curso-wrapper-inicio"
            style={{padding:"250px 0"}}>
            <div
              className="curso-fondo-inicio"
              style={{ backgroundImage: `url(${whatsapp})` }}
            ></div>

            <div className="curso-vignettee-inicio"></div>

            <div className="curso-contenido">
              <div style={{margin:"0px auto 60px auto", width:"100%"}}>
                <h2 style={{fontWeight:"600", fontSize:"16px", margin:"20px auto", textAlign:"center"}} className="animate__animated animate__fadeInDown">Novedades de Dissidents Records</h2>
                
                <YouTubePlaylist playlistId={'PLYafYnQmAYrvGshkeZpJdCD3ntI0fzUkX'} resultados={1} inicio={true}/>

              </div>
            </div>
          </div> */}

          
          
          
          {/* <SeccionFondo 
            titulo={"Unete a nuestra cuenta de Instagram"}          
            contenido={
              <div className="instagram-carousel"style={{position:"relative", top:"-100px", maxWidth:"380px", margin:"0 auto"}}>
                <Slider {...settings}>
                  {posts.map(url => (
                    <div key={url}>
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={url}
                        data-instgrm-version="14"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            }
          /> */}
          
          
          
          
          {/* Instagram Posts en un Carrusel */}
          {/* <div className="" style={{width:"90%", maxWidth:"335px", height:"450px", margin:"0px auto 60px auto", overflow:"hidden"}}>

            <h2 style={{fontWeight:"600", fontSize:"16px", margin:"20px auto", textAlign:"center"}} className="animate__animated animate__fadeInDown">Unete a nuestra cuenta de Instagram</h2>

            <div className="instagram-carousel"style={{position:"relative", top:"-80px"}}>
              <Slider {...settings}>
                {posts.map(url => (
                  <div key={url}>
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div> */}



        </main>
      </div>


    </div>
  )
}
