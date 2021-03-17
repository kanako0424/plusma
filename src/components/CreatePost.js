import React, {useState} from 'react'
import { db, auth, storage } from '../firebase'
import firebase from 'firebase/app'
import '../App.css'
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import ImagePreview from './ImagePreview'

function CreatePost() {
  
  var user = auth.currentUser;
  const postsRef = db.collection('posts')

  const [postName, setPostName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [rating, setRating] = useState('');
  const [scoreOfExam, setScoreOfExam] = useState('');
  const [memo, setMemo] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [category, setCategory] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const addCreatedPost = (docId) => {
    const postId = docId;
    const authorId = user.uid;
    const userRef = db.collection('users').doc(authorId);
    userRef.collection('createdPosts').add({
      postId: postId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      console.log('succeeded!')
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleChange = event => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  
  const addPost = (event) => {
    event.preventDefault();
    
    const uploadTask = storage.ref('images').child(image.name).put(image);
    uploadTask.on("state_changed", snapshot => {
      //progress
    }, (err) => {
      console.log(err);
    }, () => {
      storage.ref("images").child(image.name).getDownloadURL().then((url) => {
        console.log(url);
        setImageUrl(url);
      });
    })

    console.log(imageUrl)

    
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

    console.log(image);
    postRef.set({
      postName: postName,
      imageUrl: imageUrl,
      authorId: user.uid,
      description: description,
      price: price,
      link: link,
      publishedDate: publishedDate,
      rating: rating,
      scoreOfExam: scoreOfExam,
      type: type,
      category: category,
      universityName: universityName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(
      console.log('success!')
    ).catch((err) => {
      console.log(err)
    })

    const postId = postRef.id;

    setPostName('');
    setDescription('');
    setPrice('');
    setLink('');
    setPublishedDate('');
    setRating('');
    setScoreOfExam('');
    setCategory('');
    setUniversityName('');
    setImage('');
    document.getElementById('answer').checked = false;
    document.getElementById('memo').checked = false;
    setMemo(false);
    setAnswer(false);
    addCreatedPost(postId);
  }

  return (
    <div className="">
      <h2 className="">投稿の登録・編集</h2>
      <label htmlFor="photo">
        <FontAwesomeIcon icon={faImages} size="lg" />
        <input id="photo" className="inputPhoto" type="file" name="image" accept="image/*" onChange={handleChange} />
      </label>
      <label className="d-flex justify-content-center">
        商品名
        <input type="text" value={postName} onChange={event => setPostName(event.target.value)} />
      </label>
      <label className="d-flex justify-content-center">
        出版年
        <input className="inputPhoto" type="month" value={publishedDate} onChange={event => setPublishedDate(event.target.value)} />
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
        <input type="number" value={scoreOfExam} onChange={event => setScoreOfExam(event.target.value)} />
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
