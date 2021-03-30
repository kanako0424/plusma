import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import PostDetailsPost from './PostDetailsPost';


//このfileはpostの詳細を記載するページ

function PostDetails({ match }) {
  
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postId = match.params.id;
    const readData = db.collection('posts').where("postId", "==", postId).onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map(doc => {
        return [{
          postName: doc.postName,
          ...doc.data()
        }]
      });

      setPosts(postArray);
    });
      return () => {
        readData();
      }
  },[]);

  const postListItems = posts.map(post => {

      return(
        <PostDetailsPost 
          key={post[0].postId}
          postName={post[0].postName}
          imageUrl={post[0].imageUrl}
          authorId={post[0].authorId}
          publishedDate={post[0].publishedDate}
          price={post[0].price}
          type={post[0].type}
          category={post[0].category}
          link={post[0].link}
          rating={post[0].rating}
          scoreOfPracticeExam={post[0].scoreOfPracticeExam}
          universityName={post[0].universityName}
          description={post[0].description}
          postId={post[0].postId}
        />
        )
  })
  
  return(
    <div>{postListItems}</div>
  )
}

export default PostDetails
