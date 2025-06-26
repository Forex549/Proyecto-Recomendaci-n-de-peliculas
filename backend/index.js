// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // para permitir peticiones desde el frontend
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});