import React, {useState, useEffect, useCallback} from 'react'
import { db } from '../firebase'
import firebase from 'firebase/app'
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"

function Profile({ userId }) {
  const {currentUser} = useAuth();

  const [linkForMercari, setLinkForMercari] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileDesc, setProfileDesc] = useState('');
  const [error, setError] = useState("")
  
  useEffect(() => {
    setError("")
    const userRef = db.collection('users').doc(userId);
    userRef.get().then((snapshot) => {
      const userData = snapshot.data();
      setLinkForMercari(userData.linkForMercari);
      setNickname(userData.nickname);
      setProfileDesc(userData.profileDesc);
    })
  }, [userId])

  const inputNickname = useCallback(event => {setNickname(event.target.value)}, [setNickname]);

  const inputLinkForMercari = useCallback(event => {setLinkForMercari(event.target.value)}, [setLinkForMercari]);

  const inputProfileDesc = useCallback(event => {setProfileDesc(event.target.value)}, [setProfileDesc]);

  const updateProfile = (event) => {
    event.preventDefault();

    const data = {
      userId: userId,
      nickname: nickname,
      linkForMercari: linkForMercari,
      profileDesc: profileDesc,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    db.collection('users').doc(userId).set(data, {merge: true}).then(() => {
      console.log('profile is updated');
      setError("プロフィールを更新しました");
    }
    ).catch((err) => {
      console.log(err)
    })

  }

  if (currentUser.uid === userId) {
    return (
      <div className="d-flex">
        <form className="container">
        {error && <Alert variant="primary">{error}</Alert>}
          <label htmlFor="nickname">ニックネーム</label>
          <input id="nickname" onChange={inputNickname} value={nickname} className="row col-12"/>
          <label htmlFor="link">メルカリへのリンク</label>
          <input id="link" onChange={inputLinkForMercari} value={linkForMercari} className="row col-12"/>
          <label htmlFor="profileDesc">プロフィール蘭</label>
          <textarea id="profileDesc" onChange={inputProfileDesc} value={profileDesc} className="row col-12"></textarea>
        <button type="submit" onClick={updateProfile} className="row col-8 justify-content-center">プロフィールを更新</button>
        </form>
      </div>
    ) 
  } else {
    return (
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
    )
  }
}

export default Profile
