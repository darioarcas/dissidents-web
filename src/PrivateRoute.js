import { Navigate } from "react-router-dom";


export const PrivateRoute = ({isLoggedIn, children}) => {
  if (isLoggedIn === null) {
    // Mientras se verifica el estado de autenticación, podemos mostrar un mensaje de carga o un spinner
    return <div>Cargando...</div>;
  }
  return (isLoggedIn) ? children : <Navigate to='/iniciar-sesion'/>;
}