
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFmnza9JqKIvSydkVMTDPY1Is3P4siA8A",
  authDomain: "bd-peliculas-a50db.firebaseapp.com",
  projectId: "bd-peliculas-a50db",
  storageBucket: "bd-peliculas-a50db.firebasestorage.app",
  messagingSenderId: "777996529039",
  appId: "1:777996529039:web:f2650829710c0b4594affa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app,db };
