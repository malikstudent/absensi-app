// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Config dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCS4wHxEGpbXzQzxZu9eGTP8qscXUJFrS8",
  authDomain: "absensi-app-1d155.firebaseapp.com",
  projectId: "absensi-app-1d155",
  storageBucket: "absensi-app-1d155.appspot.com", // ✅ diperbaiki
  messagingSenderId: "997576291658",
  appId: "1:997576291658:web:b439815db155dd43de3db3",
  measurementId: "G-VZYPM1G6L2"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);