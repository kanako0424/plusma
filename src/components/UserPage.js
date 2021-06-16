import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import '../App.css'
import Header from './Header';
import NavBar from './NavBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Post from './Post'

function UserPage() {
  const userId = window.location.href.slice(-28);
  const [posts, setPosts] = useState([])
  const [linkForMercari, setLinkForMercari] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileDesc, setProfileDesc] = useState('');
  
  useEffect(() => {
    const userRef = db.collection('users').doc(userId);
    userRef.get().then((snapshot) => {
      const userData = snapshot.data();
      setLinkForMercari(userData.linkForMercari);
      setNickname(userData.nickname);
      setProfileDesc(userData.profileDesc);
    }).catch((err) => {
      console.log(err)
    })
  }, [userId])

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
    <Header title={"User Page"}/>
      <>
      <div className="d-flex">
        <form className="container">
          <label htmlFor="nickname">ニックネーム</label>
          <input id="nickname" readOnly value={nickname} className="row col-12"/>
          <label htmlFor="link">メルカリへのリンク</label>
          <input id="link" readOnly value={linkForMercari} className="row col-12"/>
          <label htmlFor="profileDesc">プロフィール蘭</label>
          <textarea id="profileDesc" readOnly value={profileDesc} className="row col-12"></textarea>
        </form>
      </div>
      <button className="submit" onClick={fetchCreatedPosts}>投稿履歴を読み込む</button>
      <div className="d-flex conatiner">
        <div  className="row">
          {postListItems}
        </div>
      </div>
      </>
    <NavBar/>
    </>
  )
}

export default UserPage