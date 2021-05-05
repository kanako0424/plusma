import React from 'react'
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
      <h6><strong>{postName}</strong></h6>
      <table>
        <tbody className="container">
          <tr className="row">
            <td className="col-5">作成者</td>
            <td className="col-7">{nickname}</td>
          </tr>
          <tr className="row">
            <td className="col-5">出版年</td>
            <td className="col-7">{publishedDate}</td>
          </tr>
          <tr className="row">
            <td className="col-5">価格</td>
            <td className="col-7">{price} 円</td>
          </tr>
          <tr className="row">
            <td className="col-5">種類</td>
            <td className="col-7">{type}</td>
          </tr>
          <tr className="row">
            <td className="col-5">カテゴリ</td>
            <td className="col-7">{category}</td>
          </tr>
          <tr className="row">
            <td className="col-5">商品リンク</td>
            <td className="col-7"><a target="_blank" rel="noreferrer" href={link}>{link}</a></td>
          </tr>
        </tbody>
      </table>
      <p>■参考資料</p>
      <table>
        <tbody className="container">
          <tr className="row">
            <td className="col-5">評定</td>
            <td className="col-7">{rating} / 5</td>
          </tr>
          <tr className="row">
            <td className="col-5">模試の点数</td>
            <td className="col-7">{scoreOfPracticeExam}</td>
          </tr>
          <tr className="row">
            <td className="col-5">合格大学</td>
            <td className="col-7">{universityName}</td>
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
