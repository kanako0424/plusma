import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

function Header({title}) {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  
  const history = useHistory();

  const handleLogout = async (e) => {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("ログアウトに失敗しました。")
    }
  }

  const loginStatement = (e) => {
    if (!currentUser) {
      return (
        <Link to="/login">ログインして投稿しよう</Link>
      )
    } 
  }
  
  return (
    <div className="header">
      <span className="title">{title}</span>
      <button><FontAwesomeIcon icon={faBars} /></button>
      <div className="container text-center">
        <div className="row">
          <p className="col-12">アカウント設定</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <p className="col-12">Email:{currentUser.email}</p>
          <Link to="/update-profile" className="col-12">
            アカウント設定の変更
          </Link>
          <button className="submit" variant="link" onClick={handleLogout}>
            ログアウト
          </button>
          <a className="col-12" target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSfi_VBq8nOqhkknxDfTCn3gUdzRD32rJtexpW9wjSzaIKQ3Pw/viewform?usp=sf_link">お問い合わせ</a>
        </div>
        <div>{loginStatement()}</div>
      </div>
    </div>
  )
}

export default Header
