import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'
import { db } from '../firebase'
import Post from './Post'

function Search() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');

  console.log(keyword)

  const fetchData = () => {
    db.collection("posts")
    .where("postName", "==", keyword)
    .where("isDeleted", "==", false)
    .get().then((snapshot) => {
      const postArray = snapshot.docs.map(doc => {
        return {
          postName: doc.postName,
          ...doc.data()
        }
      });
      setPosts(postArray);
    })
  }

  const postListItems = posts.map(post => {
    console.log(post);
    return(
      <Post 
        key={post.postId}
        images={post.images}
        postId={post.postId}
        postName={post.postName}
        price={post.price}
      />
    );
  });
    
  return (
    <>
      <Header title={"検索"} />
      <div
        className="search margin-auto"
      >
        <input 
          type="text" 
          name="name" 
          placeholder="投稿のタイトルで検索"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}/>
        <button 
          type="submit" 
          style={{ maxWidth: "400px" }}
          disabled={!keyword}
          onClick={() => fetchData()}
        >
          <FontAwesomeIcon icon={ faSearch } />
        </button>
      </div>
      <div className="container">
        <div className="row">
          {postListItems}
        </div>
      </div>
    </>
  )
}

export default Search
