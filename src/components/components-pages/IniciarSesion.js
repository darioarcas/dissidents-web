//src/components/components-pages/IniciarSesion.js

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import AnimatedBackground from './videocursos-on-deman/AnimateBackground';

export const IniciarSesion = () => {

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formValues;


  const handleLogin = (e)=>{
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  }

  const handleInputChange = (e)=>{
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }
  const googleLogin = ()=>{
     dispatch(startGoogleLogin());
  }


    const MailIcon = (fill="none") => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="47"
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-mail"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );


  return (
    <div className="app-wrapper position-relative">

        {/* Fondo con círculos animados */}
        <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div>
        {/* <AnimatedBackground/> */}

        <div className="content position-relative">
          <hr className='opacity-0 my-5' />

          <section  
            style={{
              maxWidth:"300px",
              margin:"150px auto",
              borderRadius:"15px",
              padding:"30px",
              backgroundColor:"rgba(255, 255, 255, 0.07)",
              boxShadow: "0 0px 10px rgba(255, 255, 255, 0.53)"
            }}
          >

            <h3 className='text-center text-white mb-4 fw-semibold'>Iniciar sesión</h3>



            {/* <p className='text-black'>Ingresar con Google</p> */}

            <button type="button" style={{backgroundColor:"rgba(51, 51, 51, 0.41)", boxShadow:"0 0 10px rgba(0, 0, 0, 1)"}} className='btn btn-dark w-100 d-flex mb-3' onClick={googleLogin}>

              <svg className="d-block" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              <p className='my-auto mx-auto'>Ingresar con Google</p>
            </button>






            <div class="card w-100 p-2" style={{backgroundColor:"rgba(51, 51, 51, 0.41)", boxShadow:"0 0 10px rgba(0, 0, 0, 1)"}} id="accordionPanelsStayOpenExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    <span style={{paddingRight:"20px"}}>{MailIcon("#0d6efd")}</span> Mail y Contraseña
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <form onSubmit={handleLogin}>
                      <label className='d-block mb-4'>

                        <p className='my-auto mx-2 text-white'>Mail</p>            

                        <input
                          className='form-control p-1'
                          type='email'
                          name='email'
                          placeholder='email@email.com...'
                          onChange={handleInputChange}
                        />
                      </label>

                      <label className='d-block mb-4'>

                        <p className='my-auto mx-2 text-white'>Contraseña</p>            

                        <input
                          className='form-control p-1'
                          type='password'
                          name='password'
                          placeholder=''
                          onChange={handleInputChange}
                        />
                      </label>



                      <button type='submit' className='btn btn-primary w-100'>Ingresar</button>



                    </form>
                  </div>
                </div>
              </div>
            </div>

            <hr/>


            <Link to="/registro">
              registrarse
            </Link>




          </section>
        </div>
    </div>
  )
}
