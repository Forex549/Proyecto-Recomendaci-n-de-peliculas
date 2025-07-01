import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './GrafoPeliculas.css';

const GrafoPeliculas = () => {
  const [datos, setDatos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      const uid = localStorage.getItem('uid');
      if (!uid) return;

      const snap = await getDoc(doc(db, 'usuarios', uid));
      if (!snap.exists()) return;

      const usuario = snap.data();

      const res = await fetch('http://localhost:5000/api/auth/getPeliculas');
      const todas = await res.json();

      const vistas = usuario.peliculas_vistas || [];
      const vector = usuario.gustos_vector || [];

      const calcularDistancia = (v) => {
        const prod = vector.reduce((acc, val, i) => acc + val * v[i], 0);
        const normU = Math.sqrt(vector.reduce((s, v) => s + v * v, 0));
        const normP = Math.sqrt(v.reduce((s, v) => s + v * v, 0));
        return 1 - (normU && normP ? prod / (normU * normP) : 0);
      };

      const candidatas = todas.filter(p => !vistas.includes(p.id));
      const recomendadas = candidatas.map(p => ({ ...p, distancia: calcularDistancia(p.vector) }))
                                    .sort((a, b) => a.distancia - b.distancia)
                                    .slice(0, 10);

      const nodes = [
        { id: 'Usuario', grupo: 'usuario' },
        ...recomendadas.map(p => ({ id: p.titulo, grupo: 'recomendada' })),
        ...todas.filter(p => vistas.includes(p.id)).map(p => ({ id: p.titulo, grupo: 'vista' }))
      ];

      const links = [
        ...recomendadas.map(p => ({ source: 'Usuario', target: p.titulo, color: 'blue' })),
        ...todas.filter(p => vistas.includes(p.id)).map(p => ({ source: 'Usuario', target: p.titulo, color: 'green' }))
      ];

      setDatos({ nodes, links });
    };

    cargarDatos();
  }, []);

  return (
    <div className="grafo-container">
      <button onClick={() => navigate('/home')} className="btn-volver">Volver</button>
      <h2>Visualización de Películas y Usuario</h2>
      {datos && (
        <ForceGraph2D
          graphData={datos}
          nodeLabel="id"
          nodeAutoColorBy="grupo"
          linkColor={link => link.color}
          width={window.innerWidth - 50}
          height={window.innerHeight - 150}
          nodeCanvasObjectMode={() => 'before'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 10 / globalScale;
            const radius = 8;

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || (node.grupo === 'usuario' ? 'red' : node.grupo === 'recomendada' ? 'blue' : 'green');
            ctx.fill();

            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = 'white';
            ctx.fillText(label, node.x, node.y + radius + 2);
          }}
        />
      )}
    </div>
  );
};

export default GrafoPeliculas;
