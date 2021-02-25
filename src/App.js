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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [posts, setPosts] = useState([]);
  const handleFetchButton = async () => {
    const db = firebase.firestore();
    const snapshot = await db
      .collection('posts')
      .get();
    const _posts = [];
    snapshot.forEach(doc => {
      _posts.push({
        postId: doc.id,
        ...doc.data()
      });
    });
    setPosts(_posts);
  };

  const postListItems = posts.map(post => {
    return (
      <li key={post.postId}>
        {post.postName} : {post.price}: {post.imageUrl} 
      </li>
    );
  });

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <button onClick={handleFetchButton}>取得</button>
      <ul>{postListItems}</ul>
    </div>
  );
}

//this is a test for git pull origin main


export default App;
