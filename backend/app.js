import express from 'express';
import cors from 'cors';
import peliculasRoutes from './routes/peliculas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/peliculas', peliculasRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
