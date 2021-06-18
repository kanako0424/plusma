import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function UserInfo(props) {
  const {currentUser} = useAuth()
  const authorId = props.authorId;

  return (
  <>
    {authorId ? (
      <Link 
        to={{
          pathname: `/users/${authorId}`
        }}
      >
        {currentUser.displayName}
      </Link>
    ): (<p>投稿者不明</p>)}
  </>
  )
}

export default UserInfo
