import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app, db } from '../firebase/config.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';


const auth = getAuth(app);

// Registro de usuario
export const registerUser = async (req, res) => {
  const { email, password, nombre, fechaNacimiento } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Crear documento del usuario en Firestore
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
    // 🔽 Manejo claro de errores
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
