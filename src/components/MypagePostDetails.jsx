import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import PostDetailsPost from './PostDetailsPost';
import Header from './Header';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

function MypagePostDetails() {
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

    const images = post.images;
    const isDeleted = post.isDeleted;

  //ここからはreaturn
  return (
    <>
    {images && ( !isDeleted && (
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

      <div width="container">
        <EditButton postId={postId} />
        <DeleteButton post={post} postId={postId}/>
      </div>
      </>
      ))} 
    </> 
  )
}

export default MypagePostDetails