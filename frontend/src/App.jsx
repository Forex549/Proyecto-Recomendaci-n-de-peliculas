import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Registro} from './login-registro/Registro';
import {Login} from './login-registro/Login'
import { Home } from './catalogo-peliculas/Home';
import VerPelicula from './catalogo-peliculas/VerPelicula';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GrafoPeliculas from './catalogo-peliculas/GrafoPeliculas';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ver/:id" element={<VerPelicula />} />
        <Route path="/grafo" element={<GrafoPeliculas />} />
      </Routes>

      {/* Toast container global */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App
