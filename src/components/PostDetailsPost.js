import React from 'react'
import UserInfo from './UserInfo';

function PostDetailsPost({ 
  imageUrl,
  postName,
  authorId,
  authorName,
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
    <div className="container justify-content-center post-details">
      <div className="row mb-2">
        <img src={imageUrl} alt="商品サムネイル"/>
      </div>
      <div className="row mb-4">
        <input 
          type="text" 
          id="postName" 
          className="col-12"
          value={postName}
          readOnly
        />
        </div>
        <div className="row mb-2">
          <label htmlFor="publishedDate" className="col-4">
            作成者
          </label>
          <UserInfo authorId={authorId}/>
        </div>
        <div className="row mb-2">
          <label htmlFor="publishedDate" className="col-4">
            出版年
          </label>
          <input 
            className="col-8" 
            id="publishedDate" 
            type="month" 
            value={publishedDate}
            readOnly
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="price" className="col-4">
            価格
          </label>
          <input 
            type="number" 
            id="price" 
            className="col-8" 
            value={price}
            readOnly
          />
        </div>
        <div className="row d-flex align-content-center mb-2">
          <span className="col-4">種類</span>
          <span className="col-8">
            <input 
              id="type" 
              type="text" 
              value={type}
              readOnly
            />
          </span>
          
        </div>
        <div className="row mb-2">
          <label htmlFor="category" className="col-4">
            カテゴリー
          </label>
          <input type="text" id="category" className="col-8" value={category} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="link" className="col-4">
            商品リンク
          </label>
          <input type="text" id="link" className="col-8" value={link} readOnly/>
        </div>
        <p>■参考資料</p>
        <div className="row mb-2">
          <label htmlFor="rating" className="col-4">
            評定
          </label>
          <input type="number" id="rating" className="col-8" value={rating} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="score" className="col-4">
            模試の点数
          </label>
          <input htmlFor="score" type="number" className="col-8" value={scoreOfPracticeExam} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="university" className="col-4">
            合格大学
          </label>
          <input type="text" id="university" className="col-8" value={universityName} readOnly/>
        </div>
        <div className="row mb-2">
          <p className="col-12">■推しポイント!</p>
          <textarea value={description} className="col-12" readOnly></textarea>
          <img src={imageUrl} alt="商品の画像" />
        </div>
      <p>{deleteButton}</p>
    </div>
  )
}

export default PostDetailsPost
