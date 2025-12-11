// src/components/components-pages/Registro.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startRegisterEmailPasswordName } from "../../actions/auth";
import Swal from "sweetalert2";

export const Registro = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "",
  });

  const { email, password, confirm, name } = formValues;

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const register = (e) => {
    e.preventDefault();

    if (!validarCorreo(email)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    if (password !== confirm) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Debes ingresar la misma contraseña dos veces.",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña débil",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    dispatch(startRegisterEmailPasswordName(email, password, name));
  };

  return (
    <>
      <hr className="opacity-0 my-5" />

      <section
        className="bg-white my-5 p-3 rounded m-auto"
        style={{ maxWidth: "300px" }}
      >
        <h3 className="text-center text-black mb-4 fw-semibold">Registrarse</h3>

        <form onSubmit={register}>
          <label className="d-block mb-4">
            <p className="my-auto mx-2 text-black">Nombre</p>
            <input
              className="form-control p-1"
              type="text"
              name="name"
              placeholder="Tu nombre..."
              onChange={handleInputChange}
            />
          </label>

          <label className="d-block mb-4">
            <p className="my-auto mx-2 text-black">Mail</p>
            <input
              className="form-control p-1"
              type="email"
              name="email"
              placeholder="email@email.com..."
              onChange={handleInputChange}
            />
          </label>

          <label className="d-block mb-4">
            <p className="my-auto mx-2 text-black">Contraseña</p>
            <input
              className="form-control p-1"
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </label>

          <label className="d-block mb-4">
            <p className="my-auto mx-2 text-black">Confirmar contraseña</p>
            <input
              className="form-control p-1"
              type="password"
              name="confirm"
              onChange={handleInputChange}
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-4"
          >
            Registrarse
          </button>

          <Link to="/iniciar-sesion">iniciar sesión</Link>
        </form>
      </section>
    </>
  );
};
