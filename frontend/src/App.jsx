import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Registro} from './login-registro/Registro';
import {Login} from './login-registro/Login'
import { Home } from './catalogo-peliculas/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
         <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
