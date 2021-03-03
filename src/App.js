import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// import logo from './logo.svg';
import './App.css';


/*eslint no-undef: "error"*/

const firebaseConfig = {
  apiKey: "AIzaSyAhBE0EfVjaL4NypnSJnOwLr9CneSpZfiY",
  authDomain: "plusma-1927f.firebaseapp.com",
  projectId: "plusma-1927f",
  storageBucket: "plusma-1927f.appspot.com",
  messagingSenderId: "929406529962",
  appId: "1:929406529962:web:5992c2c773ad8b672c7bd3",
  measurementId: "G-DSN26WMK72"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
 
  return (
    <div></div>
  );
}

export default App;
