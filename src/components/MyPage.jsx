import React, {useState} from 'react'
import { db } from '../firebase'
import '../App.css'
import Header from './Header';
import MypageUserInfo from './MypageUserInfo';
import MyPagePost from './MyPagePost'
import { useAuth } from "../contexts/AuthContext"
import LoginStatement from './LoginStatement';
import Settings from './Settings';

function MyPage() {
  const {currentUser} = useAuth()
  const userId = currentUser.uid;
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
      <MyPagePost 
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
    <Settings />
    {currentUser.uid ? (
      <>
      <MypageUserInfo userId={userId}/>
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
    </>
  )
}

export default MyPage