import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

function UserInfo(props) {
  const authorId = props.authorId;
  const [authorName, setAuthorName] = useState()
  
  useEffect(() => {
    db.collection('users').doc(authorId).get()
      .then((snapshot) => {
        const nickname = snapshot.data().nickname;
        setAuthorName(nickname)
      })
      .catch(err => {
        console.log(err)
      });
  }, [authorId, authorName])

  return (
    <>
    {authorId && (
      <Link 
        to={{
          pathname: `/users/${authorId}`
        }}
      >
        {authorName}
      </Link>
    )}
    </>
  )
}

export default UserInfo
