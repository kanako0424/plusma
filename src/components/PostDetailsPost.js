import React from 'react'
import UserInfo from './UserInfo';
import NoImage from '../images/no_image.png'

function PostDetailsPost({postName, authorId, images, publishedDate, price, memo, answer, category, link, rating, scoreOfPracticeExam, universityName, description }) {

  return(
    <div className="container justify-content-center post-details">
      <div>
        <img className="post-details_thumbnail" src={images[0].path} alt="商品サムネイル"/>
      </div>
      <p className="mb-1">{postName}</p>
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
              <span>
                <input id="memo" type="checkbox" checked={memo}  readOnly/>
              </span>
              <label htmlFor="memo">
                メモ
              </label>
              <span>
                <input id="answer" type="checkbox" checked={answer} readOnly/>
              </span>
              <label htmlFor="answer">
                解答
              </label>
            </td>
          </tr>
          <tr>
            <th>カテゴリー</th>
            <td>{category}</td>
          </tr>
          <tr>
            <th>商品リンク</th>
            <td>
              <a href={link} target="_blank" rel="noreferrer">外部サイトへ飛びます</a>
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
        <div className="d-flex container">
          <div className="row post-details_container">
            {images.length === 0 ? (
              <div>
                <img src={NoImage} alt="画像なし"/>
              </div>
            ) : (
              images.map(image => (
                <div className="col-6 col-md-4 col-lg-3 post-details_img-div" key={image.id}>
                  <img className="post-details_img" src={image.path} alt="投稿画像"/>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetailsPost
