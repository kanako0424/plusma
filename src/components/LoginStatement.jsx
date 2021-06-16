import React from 'react'
import { Link } from 'react-router-dom';
// import Header from './Header';
// import NavBar from './NavBar';

function LoginStatement() {
  return (
    <div className="container justify-content-center">
      <div>ログインしてください</div>
      <Link to="/login">ログイン</Link>
      <span> または </span>
      <Link to="/signup">アカウント登録</Link>
    </div>
  )
}

export default LoginStatement
