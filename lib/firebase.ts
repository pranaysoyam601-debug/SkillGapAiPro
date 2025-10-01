import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration with fallbacks for development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};

// Initialize Firebase only if we have valid configuration
let app;
let db;
let auth;
let storage;

try {
  // Check if we're in a development environment without Firebase config
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasValidConfig = firebaseConfig.apiKey !== "demo-api-key";
  
  if (isDevelopment && !hasValidConfig) {
    console.warn('Firebase configuration not found. Using demo mode for development.');
    // Create mock objects for development
    app = null;
    db = null;
    auth = null;
    storage = null;
  } else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback to null values
  app = null;
  db = null;
  auth = null;
  storage = null;
}

export { db, auth, storage };
export default app;