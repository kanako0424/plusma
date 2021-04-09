import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import NavBar from './NavBar'
import Post from './Post'
import Header from "./Header"

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const readData = db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const postArray = snapshot.docs.map(doc => {
          return {
            postName: doc.postName,
            ...doc.data()
          }
        });
        setPosts(postArray);
      });
      return () => {
        readData();
      }
  }, []);
  
  const [nickname, setNickname] = useState('');
  const postListItems = posts.map(post => {
    console.log(post);
    db.collection('users').doc(post.authorId).get().then((snapshot) => {
      const nickname = snapshot.data().nickname;
      setNickname(nickname);
    })
    return(
      <Post 
        key={post.postId}
        imageUrl={post.imageUrl}
        postId={post.postId}
        postName={post.postName}
        nickname={nickname}
        price={post.price}
      />
    );
  });

  return (
    <>
      <Header title={"Plusma"}/>
      <div className="posts">
        {postListItems}
      </div>
      <NavBar />
    </>
  )
}