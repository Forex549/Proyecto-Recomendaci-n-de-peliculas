import './Navbar.css';
import { FiLogOut } from 'react-icons/fi';
import { FaProjectDiagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const userName = localStorage.getItem('nombreUsuario') || 'Usuario';
    setNombre(userName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Cine<span>Match</span></h1>
        <p className="bienvenida">Bienvenido, {nombre}</p>
      </div>

      <div className="nav-buttons">
        <FaProjectDiagram className="icon" title="Grafo" />
        <FiLogOut className="icon" title="Salir" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
