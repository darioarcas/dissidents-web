import { useState, useRef, useEffect } from "react";
import ChevronDown from "./ChevronDown";

const DropdownUsuario = ({ auth, handleLogout2 }) => {
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

  return (
    <div onClick={() => setOpen(!open)} className="dropdown-react" ref={menuRef} style={{ position: "relative", listStyle: "none" }}>
      <button
        className="text-white bg-transparent border-0 accordion"
        
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
          }}
        >
          <li style={{ listStyle: "none" }}>
            <button onClick={()=>{return null}} className="btn btn-sm text-white">
              Configuración
            </button>
          </li>

          <li style={{ listStyle: "none" }}>
            <button onClick={handleLogout2} className="btn btn-sm text-white">
              Cerrar sesión
            </button>
          </li>

        </ul>
      )}
    </div>
  );
};

export default DropdownUsuario;
