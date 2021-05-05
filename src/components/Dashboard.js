import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import NavBar from './NavBar'
import Post from './Post'
import Header from "./Header"
import "react-bootstrap"


export default function Dashboard({keyword}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const readData = db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const postArray = snapshot.docs.map(doc => {
          return {
            postName: doc.postName,
            ...doc.data()
          }
        });
        setPosts(postArray);
      })
      return () => {
        readData();
      }
  }, []);
  
  const postListItems = posts.map(post => {
    console.log(post);
    return(
      <Post 
        key={post.postId}
        imageUrl={post.imageUrl}
        postId={post.postId}
        postName={post.postName}
        price={post.price}
      />
    );
  });

  return (
    <>
      <Header title={"Plusma"}/>
      <div className="d-flex container">
        <div className="row">
          {postListItems}
        </div>
      </div>
      <NavBar />
    </>
  )
}