

function similitudCoseno(vec1, vec2) {
  let dot = 0; //proucto punto
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vec1.length; i++) {
    dot = dot + vec1[i] * vec2[i];
    normA = normA + vec1[i] * vec1[i];
    normB = normB + vec2[i] * vec2[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Devuelve las N películas más cercanas según la distancia (1 - similitud)
export function obtenerRecomendaciones(usuarioVector, todasLasPeliculas, K = 15) {
  const recomendaciones = todasLasPeliculas.map(pelicula => {
    const similitud = similitudCoseno(usuarioVector, pelicula.vector);
    const distancia = 1 - similitud; // cuanto menor, más parecida
    return { ...pelicula, distancia };
  });

  // Ordenamos por menor distancia
  recomendaciones.sort((a, b) => a.distancia - b.distancia);

  // Retornamos las N más cercanas
  return recomendaciones.slice(0, K);
}
