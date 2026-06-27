// src/components/components-pages/perfil-usuario/MasCursos.js

import "../videocursos-on-deman/CursosDinamicos.css";
import '../dj/DJ.css';
import { ArrayCursos } from '../dj/ArraysCursosOnDemand';
import { TarjetasCursosImagen } from '../dj/TarjetasCursosImagen';

const MasCursos = () => {

  return (
    <div style={{boxShadow: "0 0px 12px rgba(255, 255, 255, 0.59)", backgroundColor:"#00000050", padding:"50px 0", marginTop:"250px"}}>


        <h2 style={{fontWeight:"400", fontSize:"18px", textAlign:"center", marginBottom:"20px"}}>Más cursos</h2>
        
        <TarjetasCursosImagen ArrayCursos={ArrayCursos} onDemand={true} inicio={true} />




    </div>
  )
};

export default MasCursos;
