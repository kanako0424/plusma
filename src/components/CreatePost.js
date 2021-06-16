import React, {useState, useEffect, useCallback} from 'react'
import { useHistory } from "react-router-dom"
import { db } from '../firebase'
import firebase from 'firebase/app'
import '../App.css'
import Header from './Header';
import { useAuth } from "../contexts/AuthContext"
import ImageArea from './ImageArea'
import LoginStatement from './LoginStatement'

function CreatePost() {
  const history = useHistory();
  let postId = window.location.pathname.split('/create-post')[1];
  if (postId !== "") {
    postId = postId.split('/')[1];
  }

  const { currentUser } = useAuth();
  const authorId = currentUser.uid;

  const [images, setImages] = useState([]),
        [postName, setPostName] = useState(''),
        [publishedDate, setPublishedDate] = useState(''),
        [price, setPrice] = useState(''),
        [memo, setMemo] = useState(false),
        [answer, setAnswer] = useState(false),
        [category, setCategory] = useState(''),
        [link, setLink] = useState(''),
        [rating, setRating] = useState(''),
        [scoreOfPracticeExam, setScoreOfPracticeExam] = useState(''),
        [universityName, setUniversityName] = useState(''),
        [description, setDescription] = useState('');

  const inputPostName = useCallback(event => {
    setPostName(event.target.value)
  }, [setPostName]);
  const inputPublishedDate = useCallback(event => {
    setPublishedDate(event.target.value)
  }, [setPublishedDate]);
  const inputPrice = useCallback(event => {
    setPrice(event.target.value)
  }, [setPrice]);
  const inputMemo = useCallback(event => {
    setMemo(event.target.checked)
  }, [setMemo]);
  const inputAnswer = useCallback(event => {
    setAnswer(event.target.checked)
  }, [setAnswer]);
  const inputCategory = useCallback(event => {
    setCategory(event.target.value)
  }, [setCategory]);
  const inputLink = useCallback(event => {
    setLink(event.target.value)
  }, [setLink]);
  const inputRating = useCallback(event => {
    setRating(event.target.value)
  }, [setRating]);
  const inputScoreOfPracticeExam = useCallback(event => {
    setScoreOfPracticeExam(event.target.value)
  }, [setScoreOfPracticeExam]);
  const inputUniversityName = useCallback(event => {
    setUniversityName(event.target.value)
  }, [setUniversityName]);
  const inputDescripion = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription]);

  const addCreatedPost = (postId) => {
    const userRef = db.collection('users').doc(authorId);
    userRef.collection('createdPosts').doc(postId).set({
      postId: postId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge: true}).then(() => {
      console.log('createdPost is created')
      history.push('/mypage/posts/'+ postId)
      alert("投稿が作成されました")
    }).catch((err) => {
      window.alert(err)
    })
  }
  
  const addPost = (event) => {
    event.preventDefault();
    
    const data = {
      postId: postId,
      postName: postName,
      images: images,
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
      const postRef = db.collection('posts').doc();
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      postId = postRef.id;
      data.postId = postId;
    }
 
    if (images.length === 0 ) {
      const image = [{id: "noimage", path: "https://firebasestorage.googleapis.com/v0/b/plusma-1927f.appspot.com/o/images%2Fno_image.png?alt=media&token=1cfee308-7694-451e-8792-bf82be5d540a"}]
      data.images = image;
    }
    
    db.collection('posts').doc(postId).set(data, {merge: true}).then(
      console.log('post is created')
    ).catch((err) => {
      window.alert(err)
    })

    setImages([]);
    setPostName('');
    setDescription('');
    setPrice('');
    setLink('');
    setPublishedDate('');
    setRating('');
    setScoreOfPracticeExam('');
    setCategory('');
    setUniversityName('');
    setMemo(false);
    setAnswer(false);
    addCreatedPost(postId);
  }


  useEffect(() => {
    if (postId !== "") {
      db.collection('posts').doc(postId).get().then(snapshot => {
        const post = snapshot.data()
        console.log(post)
        setImages(post.images);
        setPostName(post.postName);
        setPublishedDate(post.publishedDate);
        setPrice(post.price);
        setMemo(post.memo);
        setAnswer(post.answer);
        setCategory(post.category);
        setLink(post.link);
        setRating(post.rating);
        setScoreOfPracticeExam(post.scoreOfPracticeExam);
        setUniversityName(post.universityName);
        setDescription(post.description);
      })
    }
  }, [postId])

  return (
    <>
    <Header title={"投稿・編集"}/>
    {currentUser.email ? (
      <div className="container justify-content-center">
        <ImageArea images={images} setImages={setImages} />
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
          <input 
            className="col-8"
            id="publishedDate"
            type="month"
            value={publishedDate}
            onChange={inputPublishedDate} 
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
            value={price}
            onChange={inputPrice} 
          />
        </div>
        <div className="row d-flex align-content-center mb-2">
          <span className="col-4">種類</span>
          <span className="col-1">
            <input
            id="memo" 
            type="checkbox" 
            checked={memo} 
            onChange={inputMemo} 
          />
          </span>
          <label htmlFor="memo" className="col-3">
            メモ
          </label>
          <span className="col-1">
            <input 
              id="answer" 
              type="checkbox"  
              checked={answer} 
              onChange={inputAnswer} 
            />
          </span>
          <label htmlFor="answer" className="col-3">
            解答
          </label>
        </div>
        <div className="row mb-2">
          <label htmlFor="category" className="col-4">
            カテゴリー
          </label>
          <select 
            id="category" 
            className="col-8" 
            value={category}
            onChange={inputCategory} 
          >
            <optgroup label="国語">
              <option value="現代文">現代文</option>
              <option value="古文">古文</option>
              <option value="漢文">漢文</option>
            </optgroup>
            <optgroup label="数学">
              <option value="数学1A">数学1A</option>
              <option value="数学2B">数学2B</option>
              <option value="数学3">数学3</option>
            </optgroup>
            <optgroup label="社会">
              <option value="現代社会">現代社会</option>
              <option value="政治経済">政治経済</option>
              <option value="倫理">倫理</option>
              <option value="日本史">日本史</option>
              <option value="世界史">世界史</option>
              <option value="地理">地理</option>
            </optgroup>
            <optgroup label="理科">
              <option value="物理">物理</option>
              <option value="化学">化学</option>
              <option value="生物">生物</option>
              <option value="地学">地学</option>
            </optgroup>
            <optgroup label="英語">
              <option value="英語">英語</option>
            </optgroup>
          </select>
        </div>
        <div className="row mb-2">
          <label htmlFor="link" className="col-4">
            商品リンク
          </label>
          <input 
            type="text" 
            id="link" 
            className="col-8" 
            value={link}
            onChange={inputLink} 
          />
        </div>
        <p>■参考資料</p>
        <div className="row mb-2">
          <label htmlFor="rating" className="col-4">
            評定
          </label>
          <input
            type="number"
            id="rating"
            className="col-8" 
            value={rating}
            onChange={inputRating}
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="scoreOfPracticeExam" className="col-4">
            模試の点数
          </label>
          <input
            id="scoreOfPracticeExam"
            type="number"
            className="col-8"
            value={scoreOfPracticeExam}
            onChange={inputScoreOfPracticeExam} />
        </div>
        <div className="row mb-2">
          <label htmlFor="universityName" className="col-4">
            合格大学
          </label>
          <input
            type="text"
            id="universityName"
            className="col-8"
            value={universityName}
            onChange={inputUniversityName}
          />
        </div>
        <div className="row mb-2">
        <p className="col-12">■推しポイント!</p>
          <textarea
            id="description"
            className="col-12"
            rows="5"
            placeholder="どんなところが役に立ちますか？"
            onChange={inputDescripion}
            value={description}
          ></textarea>
        </div>
        <div className="row mb-2 justify-content-center">
          <button 
            type="submit" 
            className=" submit col-4"
            disabled={!postName}
            style={{ maxWidth: "400px" }}
            onClick={addPost}
          >
            商品情報を保存する
          </button>
        </div>
      </div>
    ) : (<LoginStatement/>)}
    </>
  )
};

export default CreatePost
