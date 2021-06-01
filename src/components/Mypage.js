import React, {useState} from 'react'
import { db } from '../firebase'
import '../App.css'
import Header from './Header';
import NavBar from './NavBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from './Profile';
import Post from './Post'
import { useAuth } from "../contexts/AuthContext"
import LoginStatement from './LoginStatement';

function Mypage() {
  const {currentUser} = useAuth()
  const userId = window.location.href.slice(-28);
  const [posts, setPosts] = useState([])

  const fetchCreatedPosts = () => {
    db.collection('posts')
      .where('authorId', '==', userId)
      .where("isDeleted", "==", false)
      .get().then(snapshot => {
      const postArray = snapshot.docs.map(doc => {
        return {
          postName: doc.postName,
          ...doc.data()
        }
      });
      setPosts(postArray);
    })
  }

  //return関連
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
    <Header title={"My Page"}/>
    {currentUser.email ? (
      <>
      <Profile userId={userId}/>
      <button className="submit" onClick={fetchCreatedPosts}>投稿履歴を読み込む</button>
      <div className="d-flex conatiner">
        <div  className="row">
          {postListItems}
        </div>
      </div>
      </>
     ) : (
      <LoginStatement />
     )}
    <NavBar/>
    </>
  )
}

export default Mypage