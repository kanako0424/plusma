import React from 'react'
import { useHistory } from "react-router-dom"
import { db } from "../firebase"

function DeleteButton(props) {
  const history = useHistory();


  const deletePost = () => {
    //削除ボタンが押された時の挙動を記入する
    if (window.confirm("本当に削除しますか？")) {

      db.collection('posts').doc(props.postId).set({isDeleted: true}, {merge: true})
      .then(() => {
        return
      })
      .catch(err => {console.log(err)});

      db.collection('users').doc(props.post.authorId).collection('createdPosts').doc(props.postId).set({isDeleted: true}, {merge: true})
      .then(() => {
        alert('投稿は正常に削除されました')
        history.push('/mypage/')
      })
      .catch(err => {
        alert(err,'投稿は削除できませんでした')
      });
    } else {
      return;
    }
  }

  return (
    <div className="row justify-content-center mb-3">
      <button className="col-2 submit" onClick={() => deletePost()}>
        削除する
      </button>
    </div>
  )
}

export default DeleteButton
