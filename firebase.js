import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FBASE_API_KEY,
  authDomain: process.env.FBASE_AUTH_DOMAIN,
  projectId: process.env.FBASE_PROJECT_ID,
  storageBucket: process.env.FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FBASE_messagingSenderId,
  appId: process.env.FBASE_appId,
  measurementId: process.env.FBASE_measurementId,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
