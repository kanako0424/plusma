import React from 'react'

const ImagePreview = (props) => {
  return (
    <div>
      <img alt="プレビュー画像" src={props.path}/>
    </div>
  )
}

export default ImagePreview
