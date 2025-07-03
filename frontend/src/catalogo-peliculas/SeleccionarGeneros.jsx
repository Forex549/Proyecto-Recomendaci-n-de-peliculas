import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // ajusta la ruta si es diferente
import './SeleccionarGeneros.css';

const generosBase = [
  "Acción", "Aventura", "Animación", "Comedia", "Crimen",
  "Documental", "Drama", "Familia", "Fantasía", "Historia",
  "Terror", "Música", "Misterio", "Romance", "Ciencia ficción",
  "Película de TV", "Suspenso", "Bélica", "Western"
];

export const SeleccionarGeneros = ({ usuario, onListo }) => {
  const [seleccionados, setSeleccionados] = useState([]);

  const toggleGenero = (genero) => {
    if (seleccionados.includes(genero)) {
      setSeleccionados(seleccionados.filter(g => g !== genero));
    } else {
      if (seleccionados.length < 7) {
        setSeleccionados([...seleccionados, genero]);
      }
    }
  };

  const generarVector = () => {
  const vectores = seleccionados.map(nombre =>
    generosBase.map(g => g === nombre ? 1 : 0)
  );

  const suma = vectores.reduce((acc, curr) =>
    acc.map((val, i) => val + curr[i])
  );

  const promedio = suma.map(val => val / seleccionados.length);

  // Valores neutros
  const popularidad = 0.5;
  const voto = 0.5;
  const duracion = 0.5;

  
  const año = [0, 0, 0, 1];

  return [...promedio, popularidad, voto, duracion, ...año]; 
};

  const guardarPreferencias = async () => {
    if (seleccionados.length < 3) {
      alert("Selecciona al menos 3 géneros");
      return;
    }

    const vector = generarVector();

    try {
      const ref = doc(db, 'usuarios', usuario.uid);
      await updateDoc(ref, { gustos_vector: vector });

      if (onListo) onListo();
    } catch (err) {
      alert("Error al guardar preferencias: " + err.message);
    }
  };

  return (
    <div className="selector-container">
      <h2>¿Qué géneros te gustan?</h2>
      <p>Elige entre 3 y 7 para crear tus recomendaciones</p>

      <div className="genero-lista">
        {generosBase.map((g, idx) => (
          <button
            key={idx}
            className={seleccionados.includes(g) ? 'seleccionado' : ''}
            onClick={() => toggleGenero(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <button className="btn-confirmar" onClick={guardarPreferencias}>
        Confirmar preferencias
      </button>
    </div>
  );
};
