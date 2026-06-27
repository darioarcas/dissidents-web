// src/components/helpers/CrearCursosPrivados.js

import { db } from "../../firebase/firebase";

export const CrearConsejos = () => {


  // PARA CREAR UN CONSEJO, SOLO CAMBIA EL NOMBRE Y EJECUTALO UNA VEZ
  const agregarConsejo = [
    "Un sonido más Solido",
  ];


  const crearCursosEnFirestore = async (cursos = []) => {
    if(cursos.length === 0){
    // if(true){
      alert(`No existen cursos que agregar: ${cursos}`)
      return
    }
    try {
      for (const nombreConsejo of cursos) {
        // Usamos add() para generar ID automático
        await db.collection("consejos").add({
          nombre: nombreConsejo,
          nota: "",
          img: "https://ferozo.host/hosting/filemanager/item/download?mode=download&preview=true&path=%2Fpublic_html%2Fconsejos%2Fun-sonido-mas-solido.jpg",
          url:"https://drive.google.com/file/d/1bSLsm1essGrpK7VWlj8_5xxgSKl__5T5/view?usp=sharing",
          promocion: false,
          tags: ["mezcla","avanzado", "envio","retorno", "plugins","sends", "return", "", "", "", ""],
          inicio: false,
          nuevo: true,
        });
        console.log(`Consejo creado: ${nombreConsejo}`);
      }

      alert("✅ Consejo creado correctamente en Firestore.");
    } catch (error) {
      console.error("❌ Error al crear consejo:", error);
    }
  };

  return (
    <div style={{ paddingTop: "90px", margin:"0 auto", width:"100%", display:"flex", justifyContent:"center", flexDirection:"column" }}>
      
      <h1 style={{textAlign:"center", marginBottom:"50px"}}>CONSEJOS</h1>
      <h6 style={{textAlign:"center", marginBottom:"50px"}}>
        Para crear un consejo, solo debes cambiar el nombre desde el codigo y darle al boton agregar consejo. Luego, para agregar la imagen en la base de datos (lo hice para no tener que resubir el codigo), debes subir la imagen al hosting de donweb, abrir la imagen, copiar la url (preview de ferozo) y agregar esa url al parametro "img" del consejo en firebase.
      </h6>


      <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>
        <h2 style={{textAlign:"center"}}>Agregar un consejo único</h2>
        <p className="p-0 m-0">Esto agregará automaticamente un consejo con el nombre: </p>
        <p className="text-success">{agregarConsejo[0]}</p>
        <h6 className="mb-5">Recuerda hacer esto en localhost</h6>
        <button className="btn btn-light mx-auto" onClick={()=>{crearCursosEnFirestore(agregarConsejo)}}>
          Agregar Consejo
        </button>
      </section>
      
      {/* <section style={{border:"solid 1px white", display:"flex", justifyContent:"center", flexDirection:"column", padding:"30px", width:"70%", margin:"0 auto 50px auto", borderRadius:"15px", backgroundColor:"#3b3b3b"}}>

        <h2 style={{textAlign:"center"}}>Crea una estructura con en array cursos</h2>
        <button className="btn btn-light mx-auto" onClick={()=>{crearCursosEnFirestore(cursos)}}>
          Crear Estructura
        </button>
      </section> */}
    </div>
  );
};

export default CrearConsejos;
