import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // 👈 asegúrate que la ruta sea correcta

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // 👈 esto es lo que define la ruta base

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
