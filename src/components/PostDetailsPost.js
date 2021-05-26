import React, {useState, useEffect} from 'react'
import UserInfo from './UserInfo';
import { useAuth } from "../contexts/AuthContext"
import { db, storage } from '../firebase'
import firebase from 'firebase/app'

function PostDetailsPost(props) {
  const { currentUser } = useAuth();
  const postRef = db.collection('posts').doc(props.postId);

  const [postName, setPostName] = useState(''),
        [description, setDescription] = useState(''),
        [price, setPrice] = useState(''),
        [link, setLink] = useState(''),
        [publishedDate, setPublishedDate] = useState(''),
        [rating, setRating] = useState(''),
        [scoreOfPracticeExam, setscoreOfPracticeExam] = useState(''),
        [memo, setMemo] = useState(false),
        [answer, setAnswer] = useState(false),
        [category, setCategory] = useState(''),
        [universityName, setUniversityName] = useState(''),
        [imageUrl, setImageUrl] = useState(null),
        [preview, setPreview] = useState([]),
        [memoChecked, setMemoChecked] = useState(false),
        [ansChecked, setAnsChecked] = useState(false);

  console.log(postName)


  useEffect(() => {
    if (props.memo) {
      setMemoChecked(true);
    } else {
      setMemoChecked(false);
    }
    if (props.answer) {
      setAnsChecked(true);
    } else {
      setAnsChecked(false);
    }
  }, [])

  const updatePost = (event) => {
    event.preventDefault();
    
    const postId = postRef.id;
    
    postRef.set({
      postId: postId,
      postName: postName,
      imageUrl: imageUrl,
      description: description,
      price: price,
      link: link,
      publishedDate: publishedDate,
      rating: rating,
      scoreOfPracticeExam: scoreOfPracticeExam,
      memo: memo,
      answer: answer,
      category: category,
      universityName: universityName,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge: true}).then(
      console.log('post is successfully updated.')
    ).catch((err) => {
      console.log(err)
    })
  }


  //ここからはreaturn関連
  const updateAndDeleteButton = 
    <>
    <div className="row justify-content-center">
      <button className="col-4 submit" onClick={() => updatePost()}>編集する</button>
    </div>
    <div className="row justify-content-center">
      <button className="col-4 submit">削除する</button>
    </div>
    </>;

  //ログインしているユーザーとpost投稿者が同じだったら編集できる
  if (currentUser.uid == props.authorId) {
    return(
      <div className="container justify-content-center post-details">
        {/* <img src={preview} alt="プレビュー画像"/> */}
        <div className="row mb-2">
          <img src={props.imageUrl} alt="商品サムネイル"/>
          {/* <label htmlFor="photo" className="col-4">
            <FontAwesomeIcon icon={faImages} size="lg" />
          </label>
          <input id="photo" className="inputPhoto col-8" type="file" name="image" accept="image/*" onChange={onImageChange}/> */}
        </div>
        <div className="row mb-4">
          <input 
            type="text" 
            id="postName" 
            className="col-12"
            value={props.postName}
            onChange={event => setPostName(event.target.value)}
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="author" className="col-4">
            作成者
          </label>
          <UserInfo id="author" authorId={props.authorId}/>
        </div>
        <div className="row mb-2">
          <label htmlFor="publishedDate" className="col-4">
            出版年
          </label>
          <input 
            className="col-8" 
            id="publishedDate" 
            type="month" 
            value={props.publishedDate}
            
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
            value={props.price}
            readOnly
          />
        </div>
        <div className="row d-flex align-content-center mb-2">
          <span className="col-4">種類</span>
          <span className="col-1">
            <input id="memo" type="checkbox" value={props.memo} onChange={event => setMemo(memo)} checked={memoChecked}/>
          </span>
          <label htmlFor="memo" className="col-3">
            メモ
          </label>
          <span className="col-1">
            <input id="answer" type="checkbox"  value={props.answer} onChange={event => setAnswer(answer)} checked={ansChecked}/>
          </span>
          <label htmlFor="answer" className="col-3">
            解答
          </label>
        </div>
        <div className="row mb-2">
          <label htmlFor="category" className="col-4">
            カテゴリー
          </label>
          <input type="text" id="category" className="col-8" value={props.category} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="link" className="col-4">
            商品リンク
          </label>
          <input className="col-8"  type="text" id="link" className="col-8" value={props.link} readOnly/>
        </div>
        <p>■参考資料</p>
        <div className="row mb-2">
          <label htmlFor="rating" className="col-4">
            評定
          </label>
          <input type="number" id="rating" className="col-8" value={props.rating} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="score" className="col-4">
            模試の点数
          </label>
          <input htmlFor="score" type="number" className="col-8" value={props.scoreOfPracticeExam} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="university" className="col-4">
            合格大学
          </label>
          <input type="text" id="university" className="col-8" value={props.universityName} readOnly/>
        </div>
        <div className="row mb-2">
          <p className="col-12">■推しポイント!</p>
          <textarea value={props.description} className="col-12" readOnly></textarea>
          <img src={props.imageUrl} alt="商品の画像" />
        </div>
        {updateAndDeleteButton}
      </div>
    )
  } else {
    return(
      <div className="container justify-content-center post-details">
        <div className="row mb-2">
          <img src={props.imageUrl} alt="商品サムネイル"/>
        </div>
        <div className="row mb-4">
          <input 
            type="text" 
            id="postName" 
            className="col-12"
            value={props.postName}
            readOnly
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="author" className="col-4">
            作成者
          </label>
          <UserInfo id="author" authorId={props.authorId}/>
        </div>
        <div className="row mb-2">
          <label htmlFor="publishedDate" className="col-4">
            出版年
          </label>
          <input 
            className="col-8" 
            id="publishedDate" 
            type="month" 
            value={props.publishedDate}
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
            value={props.price}
            readOnly
          />
        </div>
        <div className="row d-flex align-content-center mb-2">
          <span className="col-4">種類</span>
          <span className="col-1">
            <input id="memo" type="checkbox" value={props.memo} readOnly checked={memoChecked}/>
          </span>
          <label htmlFor="memo" className="col-3">
            メモ
          </label>
          <span className="col-1">
            <input id="answer" type="checkbox"  value={props.answer} readOnly checked={ansChecked}/>
          </span>
          <label htmlFor="answer" className="col-3">
            解答
          </label>
        </div>
        <div className="row mb-2">
          <label htmlFor="category" className="col-4">
            カテゴリー
          </label>
          <input type="text" id="category" className="col-8" value={props.category} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="link" className="col-4">
            商品リンク
          </label>
          <a className="col-8" href={props.link} target="_blank"><input type="text" id="link" className="col-8" value={props.link} readOnly/></a>
        </div>
        <p>■参考資料</p>
        <div className="row mb-2">
          <label htmlFor="rating" className="col-4">
            評定
          </label>
          <input type="number" id="rating" className="col-8" value={props.rating} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="score" className="col-4">
            模試の点数
          </label>
          <input htmlFor="score" type="number" className="col-8" value={props.scoreOfPracticeExam} readOnly/>
        </div>
        <div className="row mb-2">
          <label htmlFor="university" className="col-4">
            合格大学
          </label>
          <input type="text" id="university" className="col-8" value={props.universityName} readOnly/>
        </div>
        <div className="row mb-2">
          <p className="col-12">■推しポイント!</p>
          <textarea value={props.description} className="col-12" readOnly></textarea>
          <img src={props.imageUrl} alt="商品の画像" />
        </div>
      </div>
    )
  }
}

export default PostDetailsPost
