import React from 'react'
import { Link } from "react-router-dom"
import '../App.css';

function Post({ postId, postName, nickname, price, images }) {
  console.log(images)
  return (
    // react-bootstrapでメディアクエリを実装する
    <>
    {images && (
      <figure className="post col-6 col-md-4 col-lg-3">
        <Link
          target="_blank" 
          to={{
            pathname: `/posts/${postId}`,
            state: {nickname: nickname}
          }}
        >
          <div className="thumbnail">
            <img className="thumbnail-img" src={images[0].path} alt="サムネイル写真"/>
            <span className="price-tag">¥{price}</span>
          </div>
          <figcaption>{postName}</figcaption>
        </Link>
      </figure>
    )}
    </>
  )
}

export default Post
