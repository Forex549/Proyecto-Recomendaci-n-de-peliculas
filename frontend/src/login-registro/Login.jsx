import './Login.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego puedes hacer validación o llamada a backend
    navigate('/home');
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1 className="login-title">CineMatch</h1>
        <h2>Bienvenido de vuelta</h2>
        <p>Ingresa tus datos para acceder</p>

        <label htmlFor="email">Correo</label>
        <input type="email" id="email" placeholder="correo@ejemplo.com" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="●●●●●●●" />

        <button type="submit" onClick={handleSubmit}>Ingresar</button>

        <p className="login-switch">
          ¿No tienes cuenta?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/registro'); }}>
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
