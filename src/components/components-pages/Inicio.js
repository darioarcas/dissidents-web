
import React from 'react';
import './inicio/Inicio.css';
import logo from './inicio/img/dissident-logo-blanco.png';

export const Inicio = () => {
  return (
    <div className="app-wrapper position-relative">

      {/* Fondo con círculos animados */}
      <div className="background-gradient position-fixed w-100 h-100 top-0 start-0 z-n1"></div>

      <div className="content position-relative">

        <main style={{margin:"70px 0 0 0", display:"flex", justifyContent:"center"}}>

          <img 
            style={{height: '200px', width: 'auto'}} 
            src={logo}
            //className='inicio-logo'
            alt='Dissident Logo'
          />
        </main>
      </div>


    </div>
  )
}
