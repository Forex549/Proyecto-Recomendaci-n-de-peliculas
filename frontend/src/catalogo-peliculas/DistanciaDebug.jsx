// VerPelicula.jsx o Home.jsx (dependiendo de dónde lo quieras mostrar)
import { useState } from 'react';
import './DistanciaDebug.css';

const DistanciaDebug = ({ usuarioVector, peliculas }) => {
  const calcularDistancias = () => {
    return peliculas.map((p) => {
      const v = p.vector;
      const producto = usuarioVector.reduce((acc, val, i) => acc + val * v[i], 0);
      const normU = Math.sqrt(usuarioVector.reduce((sum, val) => sum + val * val, 0));
      const normP = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
      const coseno = normU === 0 || normP === 0 ? 0 : producto / (normU * normP);
      const distancia = 1 - coseno;
      return {
        titulo: p.titulo,
        distancia: distancia.toFixed(4),
      };
    }).sort((a, b) => a.distancia - b.distancia);
  };

  return (
    <div className="debug-panel">
      <h3>🧠 Vector del usuario</h3>
      <p>{usuarioVector.map(v => v.toFixed(2)).join(', ')}</p>

      <h3>📏 Distancias a cada película:</h3>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Distancia (1 - coseno)</th>
          </tr>
        </thead>
        <tbody>
          {calcularDistancias().map((p, i) => (
            <tr key={i}>
              <td>{p.titulo}</td>
              <td>{p.distancia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistanciaDebug;
