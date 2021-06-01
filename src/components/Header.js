import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

function Header({title}) {
  const history = useHistory();

  const [error, setError] = useState("")
  const [display, setDisplay] = useState(false)
  const { currentUser, logout } = useAuth()
  
  const toggleSetting = () => {
    setDisplay(!display)
  }

  const handleLogout = async (e) => {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("ログアウトに失敗しました。")
    }
  }

  const loginStatement = <Link to="/login">ログインして投稿しよう</Link>

  
  return (
    <div className="header">
      <div className="d-flex align-items-center">
        <button onClick={() => toggleSetting()}><FontAwesomeIcon icon={faBars} /></button>
        <span className="title">{title}</span>
      </div>
      <div className={display ? null : 'display_none'} >
        <div>
          <h5>アカウント設定</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser ? (
            <div>
              <p>Email:{currentUser.email}</p>
              <div>
                <Link to="/update-profile">
                  アカウント設定の変更
                </Link>
              </div>
              <div>
                <button variant="link" onClick={handleLogout}>
                  ログアウト
                </button>
              </div>
            </div> 
          ) : (
            <div>{loginStatement}</div>
          )}
          <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSfi_VBq8nOqhkknxDfTCn3gUdzRD32rJtexpW9wjSzaIKQ3Pw/viewform?usp=sf_link">お問い合わせ</a>
        </div>
      </div>
    </div>
  )
}

export default Header
