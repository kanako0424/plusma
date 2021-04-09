import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import PostDetailsPost from './PostDetailsPost';
import Header from './Header';


//firebaseからデータを取得&ユーザーのニックネームを表示&ユーザーが作成者だったら編集と削除ができるようにする
function PostDetails({ match, nickname }) {
  console.log(nickname)
  const { currentUser } = useAuth()
  const [posts, setPosts] = useState([]);
  // const [nickname, setNickname] = useState('');
  const [deleteButton, setDeleteButton] = useState('');

  const postId = match.params.id;
  
  useEffect(() => {
    db.collection('posts').where("postId", "==", postId).onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map(doc => {
        return [{
          postName: doc.postName,
          ...doc.data()
        }]
      });
  
      setPosts(postArray);
      console.log(posts)
      
      // const nickName = posts.map(post => {
      //   const authorId = post[0].authorId
      //   db.collection('users').doc().get(authorId).then(doc => {
      //     return (
      //       doc.nickname
      //     )
      //   })
      // });
      // setNickname(nickName);
      // console.log(nickname);
  
      const deleteButton = posts.map(post => {
        if (currentUser.uid === post[0].authorId) {
          
          return (
            <div>
              <button>この投稿を削除する</button>
          </div>
          )
        } else {
          return null;
        }
      });
      setDeleteButton(deleteButton);
    });
  }, []);

  console.log(nickname, deleteButton)
  const postListItems = posts.map(post => {

    return(
      <PostDetailsPost 
        key={post[0].postId}
        postName={post[0].postName}
        imageUrl={post[0].imageUrl}
        nickname={nickname}
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
        deleteButton={deleteButton}
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
