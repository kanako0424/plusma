import React from 'react'
import UserInfo from './UserInfo';

function PostDetailsPost(props) {

  return(
    <div className="container justify-content-center post-details">
      <div>
        <img src={props.imageUrl} alt="商品サムネイル"/>
      </div>
      <p className="mb-1">{props.postName}</p>
      <table className="mb-3" width="100%">
        <tbody>
          <tr>
            <th>作成者</th>
            <td><UserInfo id="author" authorId={props.authorId}/></td>
          </tr>
          <tr>
            <th scope="col-4">出版年</th>
            <td>{props.publishedDate}</td>
          </tr>
          <tr>
            <th scope="col-4">価格</th>
            <td>¥ {props.price}</td>
          </tr>
          <tr>
            <th>種類</th>
            <td>
              <span>
                <input id="memo" type="checkbox" checked={props.memo}  readOnly/>
              </span>
              <label htmlFor="memo">
                メモ
              </label>
              <span>
                <input id="answer" type="checkbox" checked={props.answer} readOnly/>
              </span>
              <label htmlFor="answer">
                解答
              </label>
            </td>
          </tr>
          <tr>
            <th>カテゴリー</th>
            <td>{props.category}</td>
          </tr>
          <tr>
            <th>商品リンク</th>
            <td>
              <a href={props.link} target="_blank" rel="noreferrer">外部サイトへ飛びます</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mb-1">■参考資料</p>
      <table className="mb-3" width="100%">
        <tbody>
          <tr className="">
            <th>学校の評定</th>
            <td>{props.rating} / 5</td>
          </tr>
          <tr>
            <th>模試の点数</th>
            <td>{props.scoreOfPracticeExam}</td>
          </tr>
          <tr>
            <th>合格大学</th>
            <td>{props.universityName}</td>
          </tr>
        </tbody>
      </table>
      <div className="">
        <p className="mb-1">■推しポイント!</p>
        <div className="mb-3">
        {props.description} 
        </div>
        <div>
          <img src={props.imageUrl} alt="商品の画像"/>
        </div>
      </div>
    </div>
  )
}

export default PostDetailsPost
