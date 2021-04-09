import React from 'react'
import { Link } from "react-router-dom"
import '../App.css';

function Post({ postId, postName, nickname, price, imageUrl }) {

  return (
    <figure className="post">
      <Link 
        target="_blank" 
        to={{
          pathname: `posts/${postId}`,
          state: {nickname: nickname}
        }}
        className=""
      >
        <div className="thumbnail">
          <img src={imageUrl} alt="アップロード写真"/>
          <span className="price-tag">¥{price}</span>
        </div>
        <figcaption>{postName}</figcaption>
      </Link>
    </figure>
  )
}

export default Post
