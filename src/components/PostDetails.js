import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import PostDetailsPost from './PostDetailsPost';
import Header from './Header';


//firebaseからデータを取得&ユーザーのニックネームを表示&ユーザーが作成者だったら編集と削除ができるようにする
function PostDetails({ match }) {
  const [posts, setPosts] = useState([]);
  const [authorName, setAuthorName] = useState();

  const postId = match.params.id;
  
  useEffect(() => {
    db.collection('posts').where("postId", "==", postId).get().then((snapshot) => {
      const postArray = snapshot.docs.map(doc => {
        return [{
          postName: doc.postName,
          ...doc.data()
        }]
      });
  
      setPosts(postArray);
      console.log(posts);
    });
  }, []);

  const postListItems = posts.map(post => {

    const authorId = post[0].authorId;
    db.collection("users").doc(authorId).get()
      .then((snapshot) => {
        const author = snapshot.data().nickname;
        setAuthorName(author)
      });
      console.log(authorName);

    return(
      <PostDetailsPost 
        key={post[0].postId}
        postName={post[0].postName}
        nickname={authorName}
        imageUrl={post[0].imageUrl}
        publishedDate={post[0].publishedDate}
        price={post[0].price}
        type={post[0].type}
        category={post[0].category}
        link={post[0].link}
        rating={post[0].rating}
        scoreOfPracticeExam={post[0].scoreOfPracticeExam}
        universityName={post[0].universityName}
        description={post[0].description}
        postId={post[0].postId}
      />
    )
  })

  
  
  return(
    <>
    <Header title={"商品詳細"}/>
    {postListItems}
    </>
  )
}

export default PostDetails
