import React from 'react'
import { Link } from "react-router-dom"
import '../App.css';

function Post({postId, postName, price, imageUrl}) {

  return (
    <li 
      key={postId} 
      className="list-styles col-md-2 w-100"
      style={{maxWidth: "300px"}}
    >
      <a target="_blank" href={`posts/${postId}`} className="">
        <figure>
          <div className="thumbnail">
            <img width="200px" src={imageUrl} alt="アップロード写真"/>
            <span className="price-tag">¥{price}</span>
          </div>
          <figcaption>{postName}</figcaption>
        </figure>
      </a>
    </li>
  )
}

export default Post