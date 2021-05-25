import React, {useState} from 'react'
import { db, auth, storage } from '../firebase'
import firebase from 'firebase/app'
import '../App.css'
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import Header from './Header';

function CreatePost() {
  
  var user = auth.currentUser;
  const postsRef = db.collection('posts')

  const [postName, setPostName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [rating, setRating] = useState('');
  const [scoreOfPracticeExam, setscoreOfPracticeExam] = useState('');
  const [memo, setMemo] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [category, setCategory] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [preview, setPreview] = useState([])

  const addCreatedPost = (docId) => {
    const postId = docId;
    const authorId = user.uid;
    const userRef = db.collection('users').doc(authorId);
    userRef.collection('createdPosts').doc(postId).set({
      postId: postId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      console.log('createdPost is created')
    }).catch((err) => {
      console.log(err)
    })
  }


  const onImageChange = async event => {
    let image = event.target;
    setPreview(window.URL.createObjectURL(image.files[0]));
    for (let i = 0; i < image.files.length; i++) {
      const imageRef = storage.ref('images').child(image.files[i].name);
      await imageRef.put(image.files[i]);
      setImageUrl(await imageRef.getDownloadURL())
    }
    image = '';
  };
  
  const addPost = (event) => {
    event.preventDefault();

    let type = '';
    if (memo) {
      if (answer) {
        type = "メモと解答"
      } else if (!answer) {
        type = "メモ"
      }
    } else if (!memo) { 
      if (answer) {
        type = "解答"
      } else if (!answer) {
        type = null
      }
    } 
    
    const postRef = postsRef.doc();
    const postId = postRef.id;
    
    postRef.set({
      postId: postId,
      postName: postName,
      imageUrl: imageUrl,
      authorId: user.uid,
      description: description,
      price: price,
      link: link,
      publishedDate: publishedDate,
      rating: rating,
      scoreOfPracticeExam: scoreOfPracticeExam,
      type: type,
      category: category,
      universityName: universityName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(
      console.log('post is created')
    ).catch((err) => {
      console.log(err)
    })


    setPostName('');
    setDescription('');
    setPrice('');
    setLink('');
    setPublishedDate('');
    setRating('');
    setscoreOfPracticeExam('');
    setCategory('');
    setUniversityName('');
    document.getElementById('answer').checked = false;
    document.getElementById('memo').checked = false;
    setMemo(false);
    setAnswer(false);
    addCreatedPost(postId);
  }

  return (
    <>
      <Header title={"投稿"}/>
      <div className="container justify-content-center">
        <img src={preview} alt="プレビュー画像"/>
        <div className="row mb-2">
          <label htmlFor="photo" className="col-4">
            <FontAwesomeIcon icon={faImages} size="lg" />
          </label>
          <input id="photo" className="inputPhoto col-8" type="file" name="image" accept="image/*" onChange={onImageChange}/>
        </div>
        <div className="row mb-4 mt-4">
          <input 
            type="text" 
            id="postName" 
            className="col-12"
            placeholder="商品名を入れてください"
            value={postName} 
            onChange={event => setPostName(event.target.value)}
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="publishedDate" className="col-4">
            出版年
          </label>
          <input className="col-8" id="publishedDate" type="month" value={publishedDate} onChange={event => setPublishedDate(event.target.value)} />
        </div>
        <div className="row mb-2">
          <label htmlFor="price" className="col-4">
            価格
          </label>
          <input type="number" id="price" className="col-8" value={price} onChange={event => setPrice(event.target.value)} />
        </div>
        <div className="row d-flex align-content-center mb-2">
          <span className="col-4">種類</span>
          <span className="col-1">
            <input id="memo" type="checkbox" value={memo} onChange={event => setMemo(!memo)} />
          </span>
          <label htmlFor="memo" className="col-3">
            メモ
          </label>
          <span className="col-1">
            <input id="answer" type="checkbox"  value={answer} onChange={event => setAnswer(!answer)} />
          </span>
          <label htmlFor="answer" className="col-3">
            解答
          </label>
        </div>
        <div className="row mb-2">
          <label htmlFor="category" className="col-4">
            カテゴリー
          </label>
          <input type="text" id="category" className="col-8" value={category} onChange={event => setCategory(event.target.value)} />
        </div>
        <div className="row mb-2">
          <label htmlFor="link" className="col-4">
            商品リンク
          </label>
          <input type="text" id="link" className="col-8" value={link} onChange={event => setLink(event.target.value)} />
        </div>
        <p>■参考資料</p>
        <div className="row mb-2">
          <label htmlFor="rating" className="col-4">
            評定
          </label>
          <input type="number" id="rating" className="col-8" value={rating} onChange={event => setRating(event.target.value)} />
        </div>
        <div className="row mb-2">
          <label htmlFor="score" className="col-4">
            模試の点数
          </label>
          <input htmlFor="score" type="number" className="col-8" value={scoreOfPracticeExam} onChange={event => scoreOfPracticeExam(event.target.value)} />
        </div>
        <div className="row mb-2">
          <label htmlFor="university" className="col-4">
            合格大学
          </label>
          <input type="text" id="university" className="col-8" value={universityName} onChange={event => setUniversityName(event.target.value)} />
        </div>
        <div className="row mb-2">
        <p className="col-12">■推しポイント!</p>
          <textarea value={description} className="col-12" onChange={event => setDescription(event.target.value)}></textarea>
        </div>
        <div className="row mb-2 justify-content-center">
          <button 
            type="submit" 
            className=" submit col-4"
            style={{ maxWidth: "400px" }}
            disabled={!postName}
            onClick={addPost}
            >投稿する</button>
        </div>
      </div>
      <NavBar />
    </>
  )
};

export default CreatePost
