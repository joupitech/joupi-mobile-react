import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration 
// Replace these values with those provided by Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5gVwvbXcfefoRI0AZLSF23dZZwvwPmWU",
  authDomain: "joupitech.firebaseapp.com",
  projectId: "joupitech",
  storageBucket: "joupitech.firebasestorage.app",
  messagingSenderId: "840532801180",
  appId: "1:840532801180:web:2da2c1b4ac5593da1e5f59",
  measurementId: "G-98CYKB4TCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export default app; 