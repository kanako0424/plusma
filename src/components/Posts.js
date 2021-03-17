import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import Post from './Post'
import '../App.css';

function Posts() {
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
    });
    return () => {
      readData();
    }
  }, []);

  const postListItems = posts.map(post => {
    return(
      <Post 
        key={post.id}
        authorId={post.authorId}
        postName={post.postName}
        price={post.price}
        imageUrl={post.imageUrl}
      />
    );
  });

  return (
    <div className="container">
      <ul className="row justify-content-center">{postListItems}</ul>
    </div>
  )
}

export default Posts



