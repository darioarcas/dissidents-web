import '../dj/DJ.css';
// import '../alquiler-equipos/Alquileres.css';


const SeccionFondo = ({titulo="Titulo", contenido="Contenido", imagenFondo=""}) => {
    return  <div className="inicio-seccion-ancho" style={{width:"95%", margin:"130px auto 0 auto"}}>
        {/* <img src={alquiler.img} className="card-img opacity-50" alt={`${alquiler.img} ${index}`}/> */}
        <div 
            className="mx-auto m-3 color-fondo" 
            style={{
                // backgroundImage:`url(${imagenFondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "auto",
                width: "100%",
                maxWidth: "1200px",
                padding: "20px 0",
                backgroundColor:"rgba(0, 0, 0, 0.37)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(5px)",
                borderRadius: "10px",
                boxShadow: "0 0px 10px rgba(255, 255, 255, 0.27)",
            }}
        >
            {/* <div className='overlay-img3'> */}
            <div  style={{overflow:"hidden", padding:"0 10px"}}>

                <h2 className="text-center h1-font-size-pc-responsive" style={{padding:"10px 3px"}}>{titulo}</h2>
                <p className="z-4 lista">
                {contenido}
                </p>
            </div>
            {/* </div> */}
        </div>
    </div>
}

export default SeccionFondo
