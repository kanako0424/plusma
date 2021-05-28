import React, {useState, useEffect} from 'react'
// import { useAuth } from "../contexts/AuthContext"
import { db } from '../firebase'

function GetProfile({ userId }) {
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
    })
  }, [userId])

  const updateNickname = () => {
    //デプロイできるかどうか試す。できなかったらもう一度コンソールを作る。もう知らん。。
    //プロフィールの更新機能を実装する
    //そのあとにpostの更新、削除機能も実装する
    //createdPostsはボタンを押して更新してもらう
    //これらの手順をnotionに書く
  }

  const updateLinkForMercari = () => {
    //nicknameとおなじ
    //これはhref.ここを更新すると、他のユーザーから見たページではアイコンで表示される
  }

  const updateProfileDesc = () => {
    //nicknameと同じ
  }
  const updateProfile = () => {
    //ボタンを押した時のを書く
  }

  return (
    <div className="d-flex">
      <form className="container">
        <input onChange={updateNickname} value={nickname} className="row col-12"/>
        <input onChange={updateLinkForMercari} value={linkForMercari} className="row col-12"/>
        <textarea onChange={updateProfileDesc} value={profileDesc} className="row col-12"></textarea>
      <button type="submit" onClick={updateProfile} className="row col-8 justify-content-center">情報をアップデート</button>
      </form>
    </div>
)
  
}

export default GetProfile
