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

function App() {
  const [users, setUsers] = useState([]);
  const handleFetchButton = async () => {
    const db = firebase.firestore();
    const snapshot = await db
      .collection('users')
      .get();
    const _users = [];
    snapshot.forEach(doc => {
      _users.push({
        userId: doc.id,
        ...doc.data()
      });
    });
    setUsers(_users);
  };

  const userListItems = users.map(user => {
    return (
      <li key={user.userId}>
        {user.name} : {user.age}: {user.location} 
      </li>
    );
  });

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <button onClick={handleFetchButton}>取得</button>
      <ul>{userListItems}</ul>
    </div>
  );
}

export default App;
