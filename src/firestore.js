import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMOUBwIo7-2J1Q_GAwLJeNaO5ocixogGk",
  authDomain: "curtiphotos-website.firebaseapp.com",
  projectId: "curtiphotos-website",
  storageBucket: "curtiphotos-website.firebasestorage.app",
  messagingSenderId: "758029073029",
  appId: "1:758029073029:web:69c5505c415cf5128ec7ec"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db, app };