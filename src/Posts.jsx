import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import './App.css';
import {TextInput} from "./textinput";

export const PostEdit = () => {

  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState("")
  



  return (
    <section>
      <h2 className="">登録・編集</h2>
      <div className="">

      </div>
    </section>
  )
}


export const Posts = () => {

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