import { useState, useRef, useEffect } from "react";
import ChevronDown from "./ChevronDown";

const DropdownUsuario = ({ auth, handleLogout2, suscripcionActiva, setModalSuscripcion, modalSuscripcion, setModalSoporte, modalSoporte }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModalSuscripcion = () => {
    console.log("MODAL SUSCRIPCION EN DROPDOWN USUARIO:", modalSuscripcion);
    setModalSuscripcion(ant=>!ant);
    console.log("MODAL SUSCRIPCION EN DROPDOWN USUARIO:", modalSuscripcion);
  };
  const handleModalSoporte = () => {
    console.log("MODAL SOPORTE EN DROPDOWN USUARIO:", modalSoporte);
    setModalSoporte(ant=>!ant);
    console.log("MODAL SOPORTE EN DROPDOWN USUARIO:", modalSoporte);
  };

  return (
    <div onClick={() => setOpen(!open)} className="dropdown-react" ref={menuRef} style={{ position: "relative", listStyle: "none", width:"max-content" }}>
      <button
        className="text-white bg-transparent border-0 accordion"
        style={{display:"flex", justifyContent:"space-between", flexDirection:"row", width:"100%"}}
        
      >
        {auth.name}
        {/* FLECHA APUNTANDO HACIA ABAJO DROPDOWN */}
        <ChevronDown />
      </button>

      {open && (
        <ul
          className="dropdown-menu-react"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "8px",
            padding: "10px",
            background: "rgba(105, 105, 105, 0.15)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            borderRadius: "8px",
            boxShadow: "0 0px 20px rgba(0, 0, 0, 1)",
            zIndex: 20,
            width:"max-content",
          }}
        >
          {/* <li style={{ listStyle: "none" }}>
            <button onClick={()=>{return null}} className="btn btn-sm text-white">
              Configuración
            </button>
          </li> */}
          
          { suscripcionActiva &&
            <li style={{ listStyle: "none" }}>
              <button type="button" onClick={()=>{handleModalSuscripcion()}} className="btn btn-sm text-white">
                Cancelar Suscripción
              </button>
            </li>
          }

          <li style={{ listStyle: "none" }}>
            <button onClick={()=>{handleModalSoporte()}} className="btn btn-sm text-white">
              Soporte Técnico
            </button>
          </li>
          <li style={{ listStyle: "none" }}>
            <button onClick={handleLogout2} className="btn btn-sm text-white">
              Cerrar sesión
            </button>
          </li>

        </ul>
      )}






      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button> */}


    </div>
  );
};

export default DropdownUsuario;
