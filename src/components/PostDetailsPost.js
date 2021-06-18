import React, { useState } from 'react'
import PostDetailsModal from './PostDetailsModal';
import UserInfo from './UserInfo';

function PostDetailsPost({postName, authorId, images, publishedDate, price, memo, answer, category, link, rating, scoreOfPracticeExam, universityName, description }) {

  const [selectedImg, setSelectedImg] = useState(null)

  return(
    <>
    {images && (
    <div className="container mb-3">
      <div className="post-details_thumbnail mb-3">
        <img className="post-details_thumbnail-image" src={images[0].path} alt="商品サムネイル"/>
      </div>
      <p className="mb-1" id="postName">{postName}</p>
      <table className="mb-3" width="100%">
        <tbody>
          <tr>
            <th>作成者</th>
            <td><UserInfo id="author" authorId={authorId}/></td>
          </tr>
          <tr>
            <th scope="col-4">出版年</th>
            <td>{publishedDate}</td>
          </tr>
          <tr>
            <th scope="col-4">価格</th>
            <td>¥ {price}</td>
          </tr>
          <tr>
            <th>種類</th>
            <td>
              <div className="row">
                <input id="memo" type="checkbox" checked={memo}  readOnly/>
                <label 
              htmlFor="memo"
              className="pr-4 d-inline-flex justify-content-center"
            >
              メモ
            </label>
                <input id="answer" type="checkbox" checked={answer} readOnly/>
                <label
                  htmlFor="answer"
                  className="pr-4 d-inline-flex justify-content-center"
                >
                  解答
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>カテゴリー</th>
            <td>{category}</td>
          </tr>
          <tr>
            <th>商品リンク</th>
            <td>
              <a href={link} target="_blank" rel="noreferrer">販売サイトのリンク</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mb-1">■参考資料</p>
      <table className="mb-3" width="100%">
        <tbody>
          <tr className="">
            <th>学校の評定</th>
            <td>{rating} / 5</td>
          </tr>
          <tr>
            <th>模試の点数</th>
            <td>{scoreOfPracticeExam}</td>
          </tr>
          <tr>
            <th>合格大学</th>
            <td>{universityName}</td>
          </tr>
        </tbody>
      </table>
      <div className="">
        <p className="mb-1">■推しポイント!</p>
        <div className="mb-3">
        {description} 
        </div>
        <div className="row">
          {images.length !== 0 && (
            images.map(image => (
              <div className="col-4 col-sm-4" key={image.id}
                onClick={() => setSelectedImg(image.path)}
              >
                <div className="post-details-image-wrap">
                  <img className="post-details-image" src={image.path} alt="投稿画像"/>
                </div>
              </div>
            ))
          )}
        </div>
        {selectedImg && (
          <PostDetailsModal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>
        )}
      </div>
    </div>
    )}
    </>
  )
}

export default PostDetailsPost
