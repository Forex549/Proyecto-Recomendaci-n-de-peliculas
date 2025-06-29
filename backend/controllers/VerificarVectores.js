import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';

const verificarTamañoVectores = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'peliculas'));

    const resultados = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const vector = data.vector;

      if (!Array.isArray(vector)) {
        resultados.push({ id: doc.id, error: 'vector no es un array' });
      } else {
        resultados.push({ id: doc.id, longitud: vector.length });
      }
    });

    console.table(resultados);
  } catch (error) {
    console.error('Error al verificar vectores:', error.message);
  }
};

verificarTamañoVectores();
