import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOWXJUHzRODt5PCVESMVMLNytCK4C3LyM", // change APIKey as per your configuration in firebase console
  authDomain: "multi-boards-note-app.firebaseapp.com",
  projectId: "multi-boards-note-app",
  storageBucket: "multi-boards-note-app.appspot.com",
  messagingSenderId: "707428769064",
  appId: "1:707428769064:web:cb9fd32826c427cee0441d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

