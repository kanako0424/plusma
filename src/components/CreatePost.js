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
    let image = event.target.files[0];
    const imageRef = storage.ref('images').child(image.name);
    await imageRef.put(image);
    setImageUrl(await imageRef.getDownloadURL())
    image = '';
  };
  
  const addPost = (event) => {
    event.preventDefault();

    let type = ''
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
      <div className="d-flex container row">
        <label htmlFor="photo" className="col-4">
          <FontAwesomeIcon icon={faImages} size="lg" />
        </label>
        <input id="photo" className="inputPhoto col-8" type="file" name="image" accept="image/*" onChange={onImageChange}/>
        <label htmlFor="postName" className="col-4">
          商品名
        </label>
        <input type="text" id="postName" value={postName} onChange={event => setPostName(event.target.value)} className="col-8"/>
        <label htmlFor="publishedDate" className="col-4">
          出版年
        </label>
        <input className="col-8" id="publishedDate" type="month" value={publishedDate} onChange={event => setPublishedDate(event.target.value)} />
        <label htmlFor="price" className="col-4">
          価格
        </label>
        <input type="number" id="price" className="col-8" value={price} onChange={event => setPrice(event.target.value)} />
        <div className="checkbox-container col-12">
          <span className="col-4">種類</span>
          <input id="memo" type="checkbox" className="col-1" value={memo} onChange={event => setMemo(!memo)} />
          <label htmlFor="memo" className="col-3">
          メモ
          </label>
          <input id="answer" type="checkbox" className="col-1" value={answer} onChange={event => setAnswer(!answer)} />
          <label htmlFor="answer" className="col-3">
            解答
          </label>
        </div>
        <label htmlFor="category" className="col-4">
          カテゴリー
        </label>
        <input type="text" id="category" className="col-8" value={category} onChange={event => setCategory(event.target.value)} />
        <label htmlFor="link" className="col-4">
          商品リンク
        </label>
        <input type="text" id="link" className="col-8" value={link} onChange={event => setLink(event.target.value)} />
        <label htmlFor="rating" className="col-4">
          評定
        </label>
        <input type="number" id="rating" className="col-8" value={rating} onChange={event => setRating(event.target.value)} />
        <label htmlFor="score" className="col-4">
          模試の点数
        </label>
        <input htmlFor="score" type="number" className="col-8" value={scoreOfPracticeExam} onChange={event => scoreOfPracticeExam(event.target.value)} />
        <label htmlFor="university" className="col-4">
          合格大学
        </label>
        <input type="text" id="university" className="col-8" value={universityName} onChange={event => setUniversityName(event.target.value)} />
        <p>推しポイント!</p>
        <textarea value={description} className="col-12" onChange={event => setDescription(event.target.value)}></textarea>
        <button 
          type="submit" 
          className="col-6 margin-center"
          style={{ maxWidth: "400px" }}
          disabled={!postName}
          onClick={addPost}
          >投稿する</button>
      </div>
      <NavBar />
    </>
  )
};

export default CreatePost
