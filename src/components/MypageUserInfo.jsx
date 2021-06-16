import React, {useState, useEffect, useCallback} from 'react'
import { db } from '../firebase'
import firebase from 'firebase/app'
import { Alert } from "react-bootstrap"

function MypageUserInfo({ userId }) {
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
    }).catch((err) => {
      console.log(err)
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
  return (
    <div className="">
      <form className="container">
      {error && <Alert variant="primary">{error}</Alert>}
      <span id="user-icon"><img src="https://firebasestorage.googleapis.com/v0/b/plusma-1927f.appspot.com/o/images%2Fuser-icon.png?alt=media&token=4e41d5e7-1b96-47b7-9e2e-ebc7586a1c5a" alt="ユーザーアイコン" width="50px"/></span>
        <label htmlFor="nickname">ニックネーム</label>
        <input id="nickname" onChange={inputNickname} value={nickname} className=" col-12"/>
        <label htmlFor="link">メルカリへのリンク</label>
        <input id="link" onChange={inputLinkForMercari} value={linkForMercari} className="col-12"/>
        <label htmlFor="profileDesc">プロフィール</label>
        <textarea id="profileDesc" onChange={inputProfileDesc} value={profileDesc} className=" col-12"></textarea>
      <button type="submit" onClick={updateProfile} className="submit">プロフィールを更新</button>
      </form>
    </div>
  ) 
}

export default MypageUserInfo
