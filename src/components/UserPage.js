import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import '../App.css'
import Header from './Header';
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
    <div className="user-page">
      <div className="">
      <span id="user-icon" className=""><img src="https://firebasestorage.googleapis.com/v0/b/plusma-1927f.appspot.com/o/images%2Fuser-icon.png?alt=media&token=4e41d5e7-1b96-47b7-9e2e-ebc7586a1c5a" alt="ユーザーアイコン" width="50px"/></span>
      <span>{nickname}</span>
      <span className="" id="link"><a href={linkForMercari} target="_blank" rel="noopener noreferrer">メルカリ</a></span>
      </div>
      <div className="m-4">
        <div id="profileDesc">{profileDesc}</div>
      </div>
    </div>
    <button className="submit" onClick={fetchCreatedPosts}>投稿履歴を読み込む</button>
    <div className="d-flex conatiner">
      <div  className="row">
        {postListItems}
      </div>
    </div>
    </>
  )
}

export default UserPage