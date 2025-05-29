import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Google Provider
const auth = getAuth(app);
auth.languageCode = "fr"; // Définit la langue pour les interfaces Firebase

const provider = new GoogleAuthProvider();

// Initialize Firestore Database
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, provider, db, storage };
