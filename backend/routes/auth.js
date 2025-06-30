import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getAllPeliculas } from '../controllers/authController.js';
import { marcarPeliculaVista } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getPeliculas', getAllPeliculas);
router.post('/marcarVista', marcarPeliculaVista);


export default router;
