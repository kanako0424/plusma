import React from 'react'
import { Link } from 'react-router-dom';

function LoginStatement() {
  return (
    <div>
      <div>メールアドレスでログインしてください</div>
        <Link to="/login">ログイン</Link>
        <Link to="/signup">アカウント登録</Link>
    </div>
  )
}

export default LoginStatement
