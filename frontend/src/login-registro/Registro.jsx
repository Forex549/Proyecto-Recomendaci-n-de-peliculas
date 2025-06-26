import './Registro.css';
import { useNavigate } from 'react-router-dom';

export const Registro = () => {
  const navigate = useNavigate();

  return (
    <div className="registro-container">
      <form className="registro-form">
        <h1 className="registro-title">CineMatch</h1>
        <h2>Crear cuenta</h2>
        <p>Completa tus datos para registrarte</p>

        <label htmlFor="nombre">Nombres</label>
        <input type="text" id="nombre" placeholder="Juan" />

        <label htmlFor="apellido">Apellidos</label>
        <input type="text" id="apellido" placeholder="Pérez" />

        <label htmlFor="fecha">Fecha de nacimiento</label>
        <input type="date" id="fecha" />

        <label htmlFor="email">Correo</label>
        <input type="email" id="email" placeholder="correo@ejemplo.com" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="●●●●●●●" />

        <label htmlFor="confirmPassword">Repetir contraseña</label>
        <input type="password" id="confirmPassword" placeholder="●●●●●●●" />

        <button type="submit">Registrarse</button>

        <p className="registro-switch">
          ¿Ya tienes una cuenta?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default Registro;
