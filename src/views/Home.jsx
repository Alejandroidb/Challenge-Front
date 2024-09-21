import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    const irAlLogin = ()=> {
        navigate("/login")
    }

    const irAlRegistro = () =>{
        navigate("/registrarse")
    }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center mb-4">Bienvenido a <strong>TodoCompras</strong></h1>
      <div>
        <button className="btn btn-primary me-2" onClick={irAlRegistro}>Registrarse</button>
        <button className="btn btn-secondary" onClick={irAlLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Home;
