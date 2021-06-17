import React, {useState, useEffect, useCallback} from 'react'
import { db } from '../firebase'
import firebase from 'firebase/app'

function MypageUserInfo({ userId }) {
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
          <span className="user-icon col-2">
            <img src="https://firebasestorage.googleapis.com/v0/b/plusma-1927f.appspot.com/o/images%2Fuser-icon.png?alt=media&token=4e41d5e7-1b96-47b7-9e2e-ebc7586a1c5a" alt="ユーザーアイコン"/>
          </span>
          <label htmlFor="nickname"></label>
          <input
            id="nickname"
            onChange={inputNickname}
            value={nickname}
            className="col-10"
          />
        </div>
        <div className="row mb-3">
          <label htmlFor="link" className="col-12 col-md-4 col-md-3">メルカリへのリンク</label>
          <input
            id="link"
            onChange={inputLinkForMercari}
            value={linkForMercari} className="col-12 col-md-8"/>
        </div>
        <div className="row mb-3">
          <label htmlFor="profileDesc" className="col-12">プロフィール</label>
          <textarea id="profileDesc" onChange={inputProfileDesc} value={profileDesc} className="col-12"></textarea>
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
