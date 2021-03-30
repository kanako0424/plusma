import React from 'react'
import { db } from '../firebase'
import NavBar from './NavBar'

function PostDetailsPost({key, postName, imageUrl, authorId, publishedDate, price, type, category, link, rating, scoreOfPracticeExam, universityName, description}) {

  const fetchNickname = () => {
    db.collection('users').doc(authorId).get().then(doc => {
      const nickname = doc.data().nickname;
      console.log(doc.data())
      return (
        {nickname}
      )
    })
  }
  return(
    <div key={key}>
      <h4>商品詳細</h4>
      <img src={imageUrl} width="80%" alt="商品サムネイル"/>
      <h5>{postName}</h5>
      <p className={authorId}>作成者:{() => fetchNickname()}</p>
      <table>
        <tbody>
          <tr>
            <td>出版年</td>
            <td>{publishedDate}</td>
          </tr>
          <tr>
            <td>価格</td>
            <td>{price}</td>
          </tr>
          <tr>
            <td>種類</td>
            <td>{type}</td>
          </tr>
          <tr>
            <td>カテゴリー</td>
            <td>{category}</td>
          </tr>
          <tr>
            <td>商品リンク</td>
            <td><a target="_blank" href={link}>{link}</a></td>
          </tr>
        </tbody>
      </table>
      <p>■参考資料</p>
      <table>
        <tbody>
          <tr>
            <td>評定</td>
            <td>{rating}/5</td>
          </tr>
          <tr>
            <td>模試の点数</td>
            <td>{scoreOfPracticeExam}</td>
          </tr>
          <tr>
            <td>合格大学</td>
            <td>{universityName}</td>
          </tr>
        </tbody>
      </table>
      <p>■推しポイント!</p>
      <img src={imageUrl} width="80%" alt="商品の画像"/>
      <p>{description}</p>
      <NavBar />
    </div>
  )
}

export default PostDetailsPost
