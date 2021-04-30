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
    <div className="">
      <Header title={"投稿"}/>
      <label htmlFor="photo">
        <FontAwesomeIcon icon={faImages} size="lg" />
        <input id="photo" className="inputPhoto" type="file" name="image" accept="image/*" onChange={onImageChange}/>
      </label>
      <label className="d-flex justify-content-center">
        商品名
        <input type="text" value={postName} onChange={event => setPostName(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        出版年
        <input className="" type="month" value={publishedDate} onChange={event => setPublishedDate(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        価格
        <input type="number" value={price} onChange={event => setPrice(event.target.value)} />
      </label>
      <div className="checkbox-container d-flex">
        種類
        <input id="memo" type="checkbox" value={memo} onChange={event => setMemo(!memo)} />
        <label htmlFor="memo" className="d-flex justify-content-center">
        メモ
        </label>
        <input id="answer" type="checkbox" value={answer} onChange={event => setAnswer(!answer)} />
        <label htmlFor="answer" className="d-flex justify-content-center">
          解答
        </label>
      </div>
      <label className="d-flex justify-content-center">
        カテゴリー
        <input type="text" value={category} onChange={event => setCategory(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        商品リンク
        <input type="text" value={link} onChange={event => setLink(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        評定
        <input type="number" value={rating} onChange={event => setRating(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        模試の点数
        <input type="number" value={scoreOfPracticeExam} onChange={event => scoreOfPracticeExam(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        合格大学
        <input type="text" value={universityName} onChange={event => setUniversityName(event.target.value)} />
      </label>
      <p>推しポイント!</p>
      <label className="d-flex justify-content-center">
        <textarea value={description} onChange={event => setDescription(event.target.value)}></textarea>
      </label>
      <button 
        type="submit" 
        style={{ maxWidth: "400px" }}
        disabled={!postName}
        onClick={addPost}
      >投稿する</button>
      <NavBar />
    </div>
  )
};

export default CreatePost
