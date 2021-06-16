import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import PostDetailsPost from './PostDetailsPost';
import Header from './Header';
import NotFound from './404'

function PostDetails() {
  const [post, setPost] = useState([]);
  const postId = window.location.href.slice(-20);
    
  useEffect(() => {
    db.collection('posts').doc(postId).get().then(doc => {
      const post = doc.data()
      setPost(post)
    }).catch(err => {
      console.log(err);
    })
  }, [postId])

  const isDeleted = post.isDeleted;

  //ここからはreaturn
  return (
    <>
    {post.images && ( !isDeleted ? (
      <>
      <Header title={"商品詳細"}/>
      <PostDetailsPost 
        key={postId}
        postId={postId}
        authorId={post.authorId}
        postName={post.postName}
        images={post.images}
        publishedDate={post.publishedDate}
        price={post.price}
        memo={post.memo}
        answer={post.answer}
        category={post.category}
        link={post.link}
        rating={post.rating}
        scoreOfPracticeExam={post.scoreOfPracticeExam}
        universityName={post.universityName}
        description={post.description}
      />
      </>
      ) : (
        <NotFound />
      ))} 
    </>
  )
}

export default PostDetails