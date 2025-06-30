import './Home.css';
import Navbar from './Navbar';
import MovieRow from './MovieRow';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SeleccionarGeneros } from './SeleccionarGeneros'; // asegúrate que la ruta sea correcta
import { obtenerRecomendaciones } from '../utils/knn';
import DistanciaDebug from './DistanciaDebug'; // ruta relativa



export const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [porGenero, setPorGenero] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const [recomendadas, setRecomendadas] = useState([]);
  const [mostrarDebug, setMostrarDebug] = useState(false);



  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/getPeliculas');
        const data = await res.json();
        setPeliculas(data);

        const usadas = new Set();
        const agrupadas = {};

        const generosDeseados = [
          "Acción", "Comedia", "Crimen", "Drama", "Fantasía",
          "Terror", "Romance", "Ciencia ficción", "Misterio", "Aventura"
        ];

        for (let genero of generosDeseados) {
          const filtradas = data.filter(p =>
            p.generos.includes(genero) && !usadas.has(p.id)
          ).slice(0, 15);
          filtradas.forEach(p => usadas.add(p.id));
          if (filtradas.length > 0) agrupadas[genero] = filtradas;
        }

        setPorGenero(agrupadas);
      } catch (error) {
        console.error('Error al obtener películas:', error);
      }
    };

    fetchPeliculas();
  }, []);

  // 🔍 Filtrar películas cada vez que cambie el texto de búsqueda
  useEffect(() => {
    const term = busqueda.trim().toLowerCase();
    if (term === '') {
      setResultados([]);
    } else {
      const filtradas = peliculas.filter(p =>
        p.titulo.toLowerCase().includes(term)
      );
      setResultados(filtradas);
    }
  }, [busqueda, peliculas]);

  useEffect(() => {
  const cargarUsuario = async () => {
    const uid = localStorage.getItem('uid');
    if (!uid) return;

    try {
      const ref = doc(db, 'usuarios', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setUsuario(data);

        const vector = data.gustos_vector || [];
        const esNuevo = vector.length === 0 || vector.every(v => v === 0);
        setMostrarSelector(esNuevo);

        // ✅ Solo generamos recomendaciones si NO es nuevo y ya tenemos películas cargadas
        if (!esNuevo && peliculas.length > 0) {
          const vistas = data.peliculas_vistas || [];

          const candidatas = peliculas.filter(p => !vistas.includes(p.id));
          const sugeridas = obtenerRecomendaciones(vector, candidatas, 15);

          setRecomendadas(sugeridas);
        }
      }
    } catch (err) {
      console.error("Error al obtener usuario:", err);
    }
  };

  cargarUsuario();
}, [peliculas]); // 👈 importante: depende de que ya estén cargadas las películas


  if (mostrarSelector && usuario) {
  return <SeleccionarGeneros usuario={usuario} onListo={() => setMostrarSelector(false)} />;
  }

  return (
    <div className="home-container">
      <Navbar />
            {/* Botón para mostrar/ocultar el panel de distancias */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          className="btn-debug"
          onClick={() => setMostrarDebug(prev => !prev)}
        >
          {mostrarDebug ? "Ocultar cálculo de distancias" : "Mostrar cálculo de distancias"}
        </button>
      </div>

      {/* Panel de distancias (solo si se activa el botón) */}
      {mostrarDebug && usuario && peliculas.length > 0 && (
        <DistanciaDebug usuarioVector={usuario.gustos_vector} peliculas={peliculas} />
      )}

      {/* 🔍 Input de búsqueda */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '10px',
            width: '50%',
            fontSize: '16px',
            borderRadius: '10px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* 🎯 Mostrar resultados de búsqueda si hay */}
      {resultados.length > 0 ? (
        <MovieRow title={`Resultados para "${busqueda}"`} peliculas={resultados} />
        ) : (
        <>
          {recomendadas.length > 0 && (
            <MovieRow title="Recomendadas para ti" peliculas={recomendadas} />
          )}

          {Object.keys(porGenero).map((genero, idx) => (
            <MovieRow key={idx} title={genero} peliculas={porGenero[genero]} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
