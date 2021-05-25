import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

function UserInfo({authorId}) {
  const [authorName, setAuthorName] = useState()
  
  useEffect(() => {
    const unsubscribe = db.collection('users').doc(authorId).get()
      .then((snapshot) => {
        const nickname = snapshot.data().nickname;
        setAuthorName(nickname)
      })
      .catch(err => {
        console.log(err)
      });
    console.log(authorName);

    return unsubscribe
  }, [])

  if (authorId) {
    return (
      <Link 
        to={{
          pathname: `/users/${authorId}`
        }}
        target="_blank"
      >
        {authorName}
      </Link>
    )
  } else {
    return (<p>投稿者はわかりません</p>)
    
  }
}

export default UserInfo
