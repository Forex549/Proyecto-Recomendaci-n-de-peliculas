import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VerPelicula.css';
import { toast } from 'react-toastify';



export const VerPelicula = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelicula = async () => {
      const res = await fetch('http://localhost:5000/api/auth/getPeliculas');
      const data = await res.json();
      const encontrada = data.find(p => p.id === id);
      setPelicula(encontrada);
    };
    fetchPelicula();
  }, [id]);

  const marcarComoVista = async () => {
    try {
      const uid = localStorage.getItem('uid');
      if (!uid) return alert("Usuario no identificado");

      const res = await fetch('http://localhost:5000/api/auth/marcarVista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, pelicula })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("¡Película marcada como vista!");
      } else {
        toast.error(data.error || "No se pudo marcar como vista");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };


  if (!pelicula) return <p>Cargando...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{pelicula.titulo}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.titulo} style={{ width: '200px' }} />
      <p><strong>Géneros:</strong> {pelicula.generos.join(', ')}</p>
      <p><strong>Año:</strong> {pelicula.año}</p>
      <p><strong>Duración:</strong> {pelicula.duracion} min</p>
      <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
      <button onClick={marcarComoVista}>Marcar como vista</button>
    </div>
  );
};

export default VerPelicula;
