import React, {useState, useEffect, useCallback} from 'react'
import { db, storage } from '../firebase'
import firebase from 'firebase/app'
import '../App.css'
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import Header from './Header';
import { useAuth } from "../contexts/AuthContext"

function CreatePost() {
  const [preview, setPreview] = useState([]),
        [imageUrl, setImageUrl] = useState(''),
        [postName, setPostName] = useState(''),
        [publishedDate, setPublishedDate] = useState(''),
        [price, setPrice] = useState(''),
        [memo, setMemo] = useState(false),
        [answer, setAnswer] = useState(false),
        [category, setCategory] = useState(''),
        [link, setLink] = useState(''),
        [rating, setRating] = useState(''),
        [scoreOfPracticeExam, setscoreOfPracticeExam] = useState(''),
        [universityName, setUniversityName] = useState(''),
        [description, setDescription] = useState('');
  
  const { currentUser } = useAuth();
  const authorId = currentUser.uid;

  let postId = window.location.pathname.split("/create-post")[1];
  if (postId !== "") {
    postId = postId.split("/")[1];
  }
  
  useEffect(() => {
    if (postId !== "") {
      db.collection("posts").doc(postId).get().then(snapshot => {
        const post = snapshot.data();
        setPostName(post.name);
        setDescription(post.description);
        setPublishedDate(post.publishedDate);
        setPrice(post.price);
        setMemo(post.memo);
        setAnswer(post.answer);
        setCategory(post.category);
        setLink(post.link);
        setRating(post.rating);
        setscoreOfPracticeExam(post.scoreOfPracticeExam);
        setUniversityName(post.universityName);
        setImageUrl(post.imageUrl);
      })
    }
  }, [postId])

  const addCreatedPost = (postId) => {
    const userRef = db.collection('users').doc(authorId);
    userRef.collection('createdPosts').doc(postId).set({
      postId: postId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge: true}).then(() => {
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
    
    const data = {
      postId: postId,
      postName: postName,
      imageUrl: imageUrl,
      authorId: authorId,
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
      isDeleted: false,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    if (postId === "") {
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    
    db.collection("psots").doc(postId).set(data, {merge: true}).then(
      console.log('post is created')
    ).catch((err) => {
      console.log(err)
    })

    setImageUrl('');
    setPreview('');
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

  const inputPostName = useCallback(event => setPostName(event.target.value), [setPostName]);
  const inputPublishedDate = useCallback(event => setPublishedDate(event.target.value), [setPublishedDate]);
  const inputPrice = useCallback(event => setPrice(event.target.value), [setPrice]);
  const inputMemo = useCallback(setMemo(memo), [setMemo]);
  const inputAnswer = useCallback(setAnswer(answer), [setAnswer]);
  const inputCategory = useCallback(event => setCategory(event.target.value), [setCategory]);
  const inputLink = useCallback(event => setLink(event.target.value), [setLink]);
  const inputRating = useCallback(event => setRating(event.target.value), [setRating]);
  const inputScoreOfPracticeExam = useCallback(event => scoreOfPracticeExam(event.target.value), [setscoreOfPracticeExam]);
  const inputUniversityName = useCallback(event => setUniversityName(event.target.value), [setUniversityName]);
  const inputDescripion = useCallback(event => setDescription(event.target.value), [setDescription]);

  return (
    <>
      <Header title={"投稿・編集"}/>
      <div className="container justify-content-center">
        <img src={preview} alt="プレビュー画像"/>
        <div className="row mb-2">
          <label htmlFor="photo" className="col-4">
            <FontAwesomeIcon icon={faImages} size="lg" />
          </label>
          <input id="photo" className="inputPhoto col-8" type="file" name="image" accept="image/*" 
          onChange={onImageChange}/>
        </div>
        <div className="row mb-4 mt-4">
          <input 
            type="text" 
            id="postName" 
            className="col-12"
            placeholder="商品名を入れてください"
            value={postName} 
            onChange={inputPostName}
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="publishedDate" className="col-4">
            出版年
          </label>
          <input className="col-8" id="publishedDate" type="month" value={publishedDate} onChange={inputPublishedDate} />
        </div>
        <div className="row mb-2">
          <label htmlFor="price" className="col-4">
            価格
          </label>
          <input type="number" id="price" className="col-8" value={price} onChange={inputPrice} />
        </div>
        <div className="row d-flex align-content-center mb-2">
          <span className="col-4">種類</span>
          <span className="col-1">
            <input id="memo" type="checkbox" checked={memo} onChange={inputMemo} />
          </span>
          <label htmlFor="memo" className="col-3">
            メモ
          </label>
          <span className="col-1">
            <input id="answer" type="checkbox"  checked={answer} onChange={inputAnswer} />
          </span>
          <label htmlFor="answer" className="col-3">
            解答
          </label>
        </div>
        <div className="row mb-2">
          <label htmlFor="category" className="col-4">
            カテゴリー
          </label>
          <input type="text" id="category" className="col-8" value={category} onChange={inputCategory} />
        </div>
        <div className="row mb-2">
          <label htmlFor="link" className="col-4">
            商品リンク
          </label>
          <input type="text" id="link" className="col-8" value={link} onChange={inputLink} />
        </div>
        <p>■参考資料</p>
        <div className="row mb-2">
          <label htmlFor="rating" className="col-4">
            評定
          </label>
          <input type="number" id="rating" className="col-8" value={rating} onChange={inputRating} />
        </div>
        <div className="row mb-2">
          <label htmlFor="score" className="col-4">
            模試の点数
          </label>
          <input htmlFor="score" type="number" className="col-8" value={scoreOfPracticeExam} onChange={inputScoreOfPracticeExam} />
        </div>
        <div className="row mb-2">
          <label htmlFor="university" className="col-4">
            合格大学
          </label>
          <input type="text" id="university" className="col-8" value={universityName} onChange={inputUniversityName} />
        </div>
        <div className="row mb-2">
        <p className="col-12">■推しポイント!</p>
          <textarea value={description} className="col-12" onChange={inputDescripion}></textarea>
        </div>
        <div className="row mb-2 justify-content-center">
          <button 
            type="submit" 
            className=" submit col-4"
            style={{ maxWidth: "400px" }}
            disabled={!postName}
            onClick={addPost}
          >
            商品情報を保存する
          </button>
        </div>
      </div>
      <NavBar />
    </>
  )
};

export default CreatePost
