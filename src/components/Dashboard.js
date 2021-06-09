import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import NavBar from './NavBar'
import Post from './Post'
import Header from "./Header"
import "react-bootstrap"

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .where("isDeleted", "==", false)
      .get().then((snapshot) => {
        const postArray = snapshot.docs.map(doc => {
          return {
            postName: doc.postName,
            ...doc.data()
          }
        });
        setPosts(postArray);

      })
      .catch(err => {console.log(err)})
  }, []);
  
  const postListItems = posts.map(post => {
    return(
      <Post 
        key={post.postId}
        images={post.images}
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