import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import logo from './logo.svg';
import './App.css';

/*global App, _users*/
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
firebase.initializeApp(firebaseConfig);

const helloWorld = <p>hello world!</p>
function App() {
  return helloWorld;
}

export default App;
