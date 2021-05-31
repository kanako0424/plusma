import React, {useState} from 'react'
import { db } from '../firebase'
import '../App.css'
import Header from './Header';
import NavBar from './NavBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profile from './Profile';
import Post from './Post'

function Mypage() {
  const userId = window.location.href.slice(-28);

  const [posts, setPosts] = useState([])

  const fetchCreatedPosts = () => {
    db.collection('posts').where('authorId', '==', userId).get().then(snapshot => {
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

  console.log(posts)

  return (
    <>
    <Header title={"My Page"}/>
    <Profile userId={userId}/>
    <button className="submit" onClick={fetchCreatedPosts}>投稿履歴を読み込む</button>
    <div className="d-flex conatiner">
      <div  className="row">
        {postListItems}
      </div>
    </div>
    <NavBar />
    </>
  )
}

export default Mypage