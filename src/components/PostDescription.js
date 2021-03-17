import React from 'react'
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

//このfileはpostの詳細を記載するページ

function PostDescription({ authorId, postId }) {

  const { currentUser, logout } = useAuth()
  const userId = currentUser.uid
    //ここでauthorIdからnicknameを取得する
  const username = db.collection('users').doc(userId).nickname;

  return (
    <div>{username}
      ここにはpostの詳細が入ります
    </div>
  )
}

export default PostDescription
