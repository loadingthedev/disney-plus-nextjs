import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeFrvY1R63rOQdmR-UTGBF4eE1wL_nr2E",
  authDomain: "disney-clone-auth.firebaseapp.com",
  projectId: "disney-clone-auth",
  storageBucket: "disney-clone-auth.appspot.com",
  messagingSenderId: "172636952665",
  appId: "1:172636952665:web:66aef0dc3684d5344a3948",
  measurementId: "G-C42EWQ5Y0H",
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export { db }
