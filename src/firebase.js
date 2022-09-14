import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZx5E0Qhr-ZB6L5aUxXFd8KM9XNwazVwo",
  authDomain: "signal-14.firebaseapp.com",
  projectId: "signal-14",
  storageBucket: "signal-14.appspot.com",
  messagingSenderId: "843731934069",
  appId: "1:843731934069:web:e149ab38221188eb56113c"
};

//to avoid initailizing app again and again 
let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };


