import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import PostDetailsPost from './PostDetailsPost';
import Header from './Header';
import NavBar from './NavBar'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';
import NotFound from './404'

function PostDetails() {
  const { currentUser } = useAuth();
  const [post, setPost] = useState([]);
  const postId = window.location.href.slice(-20);
  const history = useHistory();
  
  useEffect(() => {
    db.collection('posts').doc(postId).get().then((doc) => {
      if (doc.exists) {
        setPost(doc.data());
      } else {
        console.log('no such document!');
      }
    }).catch(err => {
      console.log("error: ", err);
    });
  }, [postId, post.authorId]);
  
  const deletePost = () => {
    //削除ボタンが押された時の挙動を記入する
    if (window.confirm("本当に削除しますか？")) {

      db.collection('posts').doc(postId).set({isDeleted: true}, {merge: true})
      .then(
        console.log('deleted!')
        )
      .catch(err => {console.log(err)});

      db.collection('users').doc(post.authorId).collection('createdPosts').doc(postId).set({isDeleted: true}, {merge: true})
      .then(
        console.log('deleted from createdposts, too.'),
        alert('投稿は正常に削除されました')
      )
      .catch(err => {
        alert(err,'投稿は削除できませんでした')
      });
      } else {
        return;
      }
    }
        
    //ここからはreaturn
    if (currentUser.uid !== post.authorId) {
      return(
        <>
      <Header title={"商品詳細"}/>
      <PostDetailsPost 
        key={postId}
        postId={postId}
        authorId={post.authorId}
        postName={post.postName}
        imageUrl={post.imageUrl}
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
      {/* <UserInfo authorId={post.authorId}/> */}
      <NavBar />
      </>
    )
    } else {
      if (!post.isDeleted) {
        return(
        <>
        <Header title={"商品詳細"}/>
        <PostDetailsPost 
          key={postId}
          postId={postId}
          authorId={post.authorId}
          postName={post.postName}
          imageUrl={post.imageUrl}
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
        {/* <UserInfo authorId={post.authorId}/> */}
        <div width="100%">
          <div className="row justify-content-center">
            <Link className="col-4 submit" to={{pathname: `/create-post/${postId}`}}>
              編集する
            </Link>
          </div>
          <div className="row justify-content-center">
            <button className="col-4 submit" onClick={() => deletePost()}>
              削除する
            </button>
          </div>
        </div>
        <NavBar />
        </>
        )
      } else {
        return (
          <NotFound />
        );
      }
    } 
}

export default PostDetails
