// import headerTutoriales from './tutoriales/img/headerTutoriales.jpg';
import './dj/DJ.css';
import YouTubePlaylist from './tutoriales/img/YoutubePlaylist';
import AnimatedBackground2 from './videocursos-on-deman/AnimateBackground2';

export const Tutoriales = () => {
  return (
    <div className="app-wrapper position-relative">

        {/* Fondo con círculos animados */}
        {/* <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div> */}
        <AnimatedBackground2/>


        <div className="content position-relative">
            <header  
                // className='imagen' 
                // style={{ 
                //     backgroundImage: `url(${headerTutoriales})`,
                //     backgroundSize: "cover", 
                //     backgroundPosition: "center",
                //     width:"100%",
                //     height:"600px",
                //     position:"relative",
                // }}
            >

                {/* Overlay oscuro con opacidad al 10% */}
                {/* <div className='overlay-img'></div> */}

                <div className='texto-header w-100 text-center text-white d-flex flex-column justify-content-center align-items-center h-100' style={{padding:"0", paddingTop:"90px"}}>
                    <h1 className='text-white text-center fs-2'>Novedades</h1>
                    <h6 style={{textAlign:"center", fontSize:"12px", fontWeight:"300", margin:"10px 0"}}>
                        Te ofrecemos una gran variedad de videos, desde tutoriales para mejorar tus habilidades como productor musical hasta nuestras últimas novedades.

                    </h6>
                </div>
            </header>

            <main>
                <YouTubePlaylist playlistId={'PLYafYnQmAYrvGshkeZpJdCD3ntI0fzUkX'} YouTubePlaylist={1} inicio={false}/>
                {/* <TarjetasCursos ArrayCursos={ArrayCursos} /> */}
            </main>
        </div>
    </div>
  )
}
