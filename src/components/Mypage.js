import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import '../App.css'
import Header from './Header';
import NavBar from './NavBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import CreatedPosts from './CreatedPosts';
import Post from './Post'


function Mypage() {
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  console.log(uid)
  const userRef = db.collection('users').doc(uid);
  const createdPostsRef = userRef.collection('createdPosts');
  const [linkForMercari, setLinkForMercari] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileDesc, setProfileDesc] = useState('');
  const postIds = [];

  useEffect(() => {
    userRef
    .get()
    .then((snapshot) => {
      const userData = snapshot.data();
      setLinkForMercari(userData.linkForMercari);
      setNickname(userData.nickname);
      setProfileDesc(userData.profileDesc);
      console.log(snapshot.data());
    })
  }, [])

  const list = createdPostsRef.get().then((querysnapshot) => {
    querysnapshot.docs.forEach(doc => {
      console.log(doc.data())
      const post = doc.data()
      return([
        <Post 
          key={post.postId}
          imageUrl={post.imageUrl}
          postId={post.postId}
          postName={post.postName}
          price={post.price}
        />
      ]);
    })
  })
  
  return (
    <>
    <Header title={"My Page"}/>
      <div className="d-flex container">
        <div className="row">
          <li>{nickname}</li>
          <li>{linkForMercari}</li>
          <li>{profileDesc}</li>
        </div>
      </div>
    {/* <CreatedPosts postIds={postIds}/> */}
    {list}
    <NavBar />
    </>
  )
}

export default Mypage