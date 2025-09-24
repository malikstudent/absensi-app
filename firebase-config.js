// Ganti dengan config project Firebase kamu
const firebaseConfig = {

    apiKey: "AIzaSyCS4wHxEGpbXzQzxZu9eGTP8qscXUJFrS8",

    authDomain: "absensi-app-1d155.firebaseapp.com",

    projectId: "absensi-app-1d155",

    storageBucket: "absensi-app-1d155.firebasestorage.app",

    messagingSenderId: "997576291658",

    appId: "1:997576291658:web:b439815db155dd43de3db3",

    measurementId: "G-VZYPM1G6L2"

};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
