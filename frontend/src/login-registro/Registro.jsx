import './Registro.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';


export const Registro = () => {

  const nombreRef = useRef();
  const apellidoRef = useRef();
  const fechaRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  

  const handleRegistro = async (e) => {
    e.preventDefault(); // para que no recargue la página

    const nombre = nombreRef.current.value.trim();
    const apellido = apellidoRef.current.value.trim();
    const fechaNacimiento = fechaRef.current.value;
    const email = emailRef.current.value.trim();;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (!nombre || !apellido || !email || !password || !confirmPassword || !fechaNacimiento) {
      toast.warning("Por favor complete todos los campos");
      return;
    }

   
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email : email ,
          password : password,
          nombre: `${nombre} ${apellido}`,
          fechaNacimiento : fechaNacimiento
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Usuario registrado con éxito, ya puede iniciar sesión");
      } else {
        alert(data.error || 'Error al registrar usuario');
      }

    } catch (err) {
      toast.error(data.error || 'Error al registrar usuario');
    }
  };

  const navigate = useNavigate();

  return (
    <div className="registro-container">
      <form className="registro-form">
        <h1 className="registro-title">CineMatch</h1>
        <h2>Crear cuenta</h2>
        <p>Completa tus datos para registrarte</p>

        <label htmlFor="nombre">Nombres</label>
        <input type="text" id="nombre" placeholder="Juan" ref ={nombreRef} />

        <label htmlFor="apellido">Apellidos</label>
        <input type="text" id="apellido" placeholder="Pérez" ref ={apellidoRef}/>

        <label htmlFor="fecha" >Fecha de nacimiento</label>
        <input type="date" id="fecha" ref ={fechaRef} />

        <label htmlFor="email">Correo</label>
        <input type="email" id="email" placeholder="correo@ejemplo.com" ref ={emailRef} />

        <label htmlFor="password" >Contraseña</label>
        <input type="password" id="password" placeholder="●●●●●●●"  ref={passwordRef}/>

        <label htmlFor="confirmPassword" >Repetir contraseña</label>
        <input type="password" id="confirmPassword" placeholder="●●●●●●●" ref={confirmPasswordRef} />

        <button type="submit" onClick={handleRegistro}>Registrarse</button>

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
