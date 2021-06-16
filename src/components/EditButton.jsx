import React from 'react'
import { Link } from 'react-router-dom';

function EditButton(props) {
  
  return (
    <div className="row justify-content-center">
      <Link className="col-4 submit" to={{pathname: `/create-post/${props.postId}`}}>
        編集する
      </Link>
    </div>
  )
}

export default EditButton
