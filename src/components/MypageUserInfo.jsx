import React, {useState, useEffect, useCallback} from 'react'
import { auth, db } from '../firebase'
import firebase from 'firebase/app'
import { useAuth } from "../contexts/AuthContext"

function MypageUserInfo({ userId }) {
  const { currentUser } = useAuth();

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
  }, [])

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

    currentUser.updateProfile({
      displayName: nickname,
    })

    db.collection('users').doc(userId).set(data, {merge: true}).then(() => {
      window.alert("プロフィールを更新しました")
    }
    ).catch((err) => {
      console.log(err)
    })

  }
  return (
    <>
      <form className="container">
        <div className="row mb-3">
          <label htmlFor="nickname" className="col-6 col-sm-4">ユーザー名</label>
          <input
            id="nickname"
            onChange={inputNickname}
            value={nickname}
            className="col-12 col-sm-8"
          />
        </div>
        <div className="row mb-3">
          <label htmlFor="link" className="col-6 col-sm-4">メルカリへのリンク</label>
          <input
            id="link"
            onChange={inputLinkForMercari}
            value={linkForMercari} className="col-12 col-sm-8"/>
        </div>
        <div className="row mb-3">
          <label htmlFor="profileDesc" className="col-6 col-sm-4">プロフィール</label>
          <textarea id="profileDesc" onChange={inputProfileDesc} value={profileDesc} className="col-12 col-sm-8"></textarea>
        </div>
        <button
          type="submit"
          onClick={updateProfile}
          className="submit mb-4"
        >
          プロフィールを更新
        </button>
      </form>
    </>
  ) 
}

export default MypageUserInfo
