
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

   const firebaseConfig = {
    apiKey: "AIzaSyCYUuzuzZHJRX-23cyYoJbJM6OK99Q3LXM",
    authDomain: "complete-store-f8f36.firebaseapp.com",
    projectId: "complete-store-f8f36",
    storageBucket: "complete-store-f8f36.firebasestorage.app",
    messagingSenderId: "523751362773",
    appId: "1:523751362773:web:22d74c9d0df905160a925c",
    measurementId: "G-914GVMB7QM"
  };

  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
export  const db = getFirestore(app);