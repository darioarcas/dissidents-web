// src/components/components-pages/respuesta-pagos/SuscripcionEstado.js

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import Dashboard from '../perfil-usuario/Dashboard.js';
import DropdownUsuario from "../../helpers/DropDownUsuario.js";

export const SuscripcionEstado = ({ handleLogout , checking }) => {
    
    const auth = useSelector(store => store.auth);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [status, setStatus] = useState("loading"); 
    // loading | authorized | pending | cancelled | error
    
    const preapprovalId = searchParams.get("preapproval_id");
    
    useEffect(() => {
        if (!auth?.uid || !preapprovalId) return;


        let intentos = 0;
        const maxIntentos = 10; // 10 intentos (~20s máximo)

        const verificar = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/subscription/${preapprovalId}/verify`
                );
                const data = await res.json();
                console.log("🔍 verify:", data);

                // Caso success
                if (data.activated === true) {
                    setStatus("authorized");
                    setTimeout(() => {
                        if (auth?.slug) {
                            navigate(`/perfil/videocursos/${auth.slug}`);
                        }else {
                            navigate("/perfil");
                        }
                    }, 1500);
                    return;
                }

                // Caso cancelado
                if (data.status === "cancelled") {
                    setStatus("cancelled");
                    return;
                }

                // Caso pending -> reintentar
                if (data.status === "pending" || data.status === "authorized") {
                    setStatus("pending");
                }

                intentos++;
                if (intentos < maxIntentos) {
                    setTimeout(verificar, 2000); // retry cada 2s
                } else {
                    setStatus("error"); // timeout
                }

            } catch (e) {
                console.error("verify error:", e);
                setStatus("error");
            }
        };

        verificar();
    
    }  , [preapprovalId, auth]);


const handleLogout2 = () => handleLogout();

if (!auth || !auth.uid) {
return <h2>Iniciando sesión...</h2>;
}

if (!checking || status === "loading") {
    return <h1 style={{textAlign:"center", marginTop:"160px"}}>Procesando pago...</h1>;
}

  return (
    <div className="app-wrapper position-relative">
      <div className="content position-relative">
        <div>
          <header
            style={{
              width: "50%",
              maxWidth:"350px",
              minWidth:"250px",
              margin: "100px auto 20px auto",
              boxShadow: "0 0px 15px rgba(255, 255, 255, 0.7)",
              borderRadius: "15px",
            }}
          >    
            <div style={{minWidth:"300px"}}>
              <div className="d-flex flex-row justify-content-start w-75 my-3 mx-0">
                <img 
                  className="foto-perfil rounded-circle me-3" 
                  src={auth.photoURL} 
                  alt="Foto"
                  style={{ width: '60px', height: '60px', margin:"10px", zIndex:2 }}
                />

                <DropdownUsuario auth={auth} handleLogout2={handleLogout2} />
              </div>
            </div>
          </header>
        </div>

        <main className='pt-5 d-flex flex-column justify-content-center w-75 mx-auto'>
          
          {status === "authorized" && (
            <h2 className="text-center text-success">
              ✔ Suscripción activada exitosamente!<br/>
              Redirigiendo a tu perfil...
            </h2>
          )}

          {status === "pending" && (
            <h2 className="text-center">
              ⏳ Tu pago está en proceso...
            </h2>
          )}

          {status === "cancelled" && (
            <h2 className="text-center text-warning">
              ❗ Suscripción cancelada
            </h2>
          )}

          {status === "error" && (
            <h2 className="text-center text-danger">
              ❌ Hubo un problema verificando el pago
            </h2>
          )}

          <Dashboard/>
        </main>
      </div>
    </div>
  );
};
