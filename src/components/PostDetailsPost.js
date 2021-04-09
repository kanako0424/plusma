import React from 'react'
//import { db } from '../firebase'
import NavBar from './NavBar'

function PostDetailsPost({ 
  imageUrl, 
  postName, 
  nickname, 
  publishedDate, 
  price, 
  type, 
  category, 
  link, 
  rating, 
  scoreOfPracticeExam, 
  universityName, 
  description, 
  deleteButton
}) {
  
  return(
    <div className="post-details">
      <img src={imageUrl} alt="商品サムネイル"/>
      <h6>{postName}</h6>
      <p>作成者:{nickname}</p>
      <table>
        <tbody className="container">
          <tr className="row">
            <td className="col-4">出版年</td>
            <td className="col-8">{publishedDate}</td>
          </tr>
          <tr className="row">
            <td className="col-4">価格</td>
            <td className="col-8">{price} 円</td>
          </tr>
          <tr className="row">
            <td className="col-4">種類</td>
            <td className="col-8">{type}</td>
          </tr>
          <tr className="row">
            <td className="col-4">カテゴリー</td>
            <td className="col-8">{category}</td>
          </tr>
          <tr className="row">
            <td className="col-4">商品リンク</td>
            <td className="col-8"><a target="_blank" href={link}>{link}</a></td>
          </tr>
        </tbody>
      </table>
      <p>■参考資料</p>
      <table>
        <tbody className="container">
          <tr className="row">
            <td className="col-4">評定</td>
            <td className="col-8">{rating} / 5</td>
          </tr>
          <tr className="row">
            <td className="col-4">模試の点数</td>
            <td className="col-8">{scoreOfPracticeExam}</td>
          </tr>
          <tr className="row">
            <td className="col-4">合格大学</td>
            <td className="col-8">{universityName}</td>
          </tr>
        </tbody>
      </table>
      <p>■推しポイント!</p>
      <img src={imageUrl} width="33%" alt="商品の画像"/>
      <p>{description}</p>
      <p>{deleteButton}</p>
      <NavBar />
    </div>
  )
}

export default PostDetailsPost
