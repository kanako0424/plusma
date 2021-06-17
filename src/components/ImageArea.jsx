// import {showLoadingAction, hideLoadingAction} from "../../reducks/loading/actions";
import React, {useCallback} from 'react'
import { storage } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
function ImageArea(props) {

  //const dispatch = useDispatch();
  const images = props.images;

  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm('この画像を削除しますか？')
    if (!ret) {
      return false
    } else {
      const newImages = images.filter(image => image.id !== id)
      props.setImages(newImages);
      return storage.ref('images').child(id).delete()
    }
  }, [props, images])

  const uploadImage = useCallback((event) => {
    //dispatch(showLoadingAction("uploading..."))
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg" });

    // Generate random 16 digits strings
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N=16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

    const uploadRef = storage.ref('images').child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = {id: fileName, path: downloadURL};
        props.setImages((prevState => [...prevState, newImage]))
        //dispatch(hideLoadingAction())
      });
    }).catch((err) => {
      console.log(err)
      //dispatch(hideLoadingAction())
    });
  }, [props])

  return (
    <div>
      <div className="row">
        {images.length > 0 && (
          images.map(image => 
          <span className="" key={image.id} onClick={() => deleteImage(image.id)}>
            <img alt="アイキャッチ画像" src={image.path} className="eye-catch-img"/>
          </span>)
        )}
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="image">
          <span>商品画像を登録する </span>
          <FontAwesomeIcon height="48px" wight="48px" icon={faImages} size="lg"/>
        </label>
        <input className="display-none" type="file" id="image" onChange={e => uploadImage(e)}/>
      </div>
    </div>
  )
}

export default ImageArea
