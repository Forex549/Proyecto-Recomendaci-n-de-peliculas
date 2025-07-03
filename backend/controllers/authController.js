import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app, db } from '../firebase/config.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';


const auth = getAuth(app);


export const registerUser = async (req, res) => {
  const { email, password, nombre, fechaNacimiento } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

   
    await setDoc(doc(db, 'usuarios', uid), {
      nombre,
      correo: email,
      'Fecha de nacimiento': fechaNacimiento,
      creada_en: new Date().toISOString(),
      peliculas_vistas: [],
      gustos_vector: Array(26).fill(0), // vector de gustos vacío
      uid,
    });

    res.status(201).json({ uid, email, nombre });
  } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return res.status(400).json({ error: 'Este correo ya está registrado' });
      }
      if (error.code === 'auth/invalid-email') {
        return res.status(400).json({ error: 'Correo inválido' });
      }
      if (error.code === 'auth/weak-password') {
        return res.status(400).json({ error: 'La contraseña es muy débil' });
      }

      res.status(400).json({ error: error.message });
  }
  }
;

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, 'usuarios', uid));
    if (!userDoc.exists()) {
      return res.status(404).json({ error: 'Usuario no registrado en la base de datos' });
    }

    const userData = userDoc.data();
    res.status(200).json(userData);
  } catch (error) {
    
    switch (error.code) {
      case 'auth/invalid-email':
        return res.status(400).json({ error: 'Correo inválido' });
      case 'auth/user-not-found':
        return res.status(400).json({ error: 'Usuario no encontrado' });
      case 'auth/wrong-password':
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      case 'auth/invalid-credential':
        return res.status(400).json({ error: 'Credenciales inválidas' });
      default:
        return res.status(400).json({ error: error.message });
    }
  }
};


export const getAllPeliculas = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'peliculas'));

    const peliculas = [];
    querySnapshot.forEach((doc) => {
      peliculas.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas', detalle: error.message });
  }
};

export const marcarPeliculaVista = async (req, res) => {
  const { uid, pelicula } = req.body;

  try {
    const userRef = doc(db, 'usuarios', uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return res.status(404).json({ error: 'Usuario no encontrado' });

    const user = snap.data();
    const vistas = user.peliculas_vistas || [];

    if (vistas.includes(pelicula.id)) {
      return res.status(200).json({ message: 'Película ya marcada como vista' });
    }

    const nuevoVector = pelicula.vector;
    const anterior = user.gustos_vector || Array(nuevoVector.length).fill(0);

    const actualizado = anterior.map((v, i) => (v + nuevoVector[i]) / 2);

    await updateDoc(userRef, {
      peliculas_vistas: [...vistas, pelicula.id],
      gustos_vector: actualizado,
    });

    res.status(200).json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar gustos', detalle: err.message });
  }
};

