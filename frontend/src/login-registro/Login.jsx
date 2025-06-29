import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';


export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.warning("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email, password :password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("nombreUsuario", data.nombre);
        toast.success("Inicio de sesión exitoso");
        navigate("/home");
      } else {
        toast.error(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      toast.error("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1 className="login-title">CineMatch</h1>
        <h2>Bienvenido de vuelta</h2>
        <p>Ingresa tus datos para acceder</p>

        <label htmlFor="email">Correo</label>
        <input type="email" id="email" placeholder="correo@ejemplo.com" ref={emailRef} />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="●●●●●●●" ref={passwordRef}/>

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
