import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("パスワードが一致しません。")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("アカウントの更新に失敗しました。")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="signup container">
        <h2 className="text-center m-4">プロフィールの更新</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form>
            <div className="row mb-4">
              <label htmlFor="email" className="col-6 col-sm-4">メールアドレス</label>
              <input
                id="email"
                type="email"
                ref={emailRef}
                className="col-12 col-sm-8" 
                placeholder="user@example.com"
                required
                defaultValue={currentUser.email}
              />
            </div>
            <div className="row mb-4">
              <label htmlFor="password" className="col-6 col-sm-4">パスワード</label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="変更しない場合は空欄"
                className="col-12 col-sm-8" required
              />
            </div>
            <div className="row mb-4">
              <label htmlFor="password-confirm" className="col-6 col-sm-4">パスワードの確認</label>
              <input
                id="password-confirm"
                type="password"
                ref={passwordConfirmRef}
                placeholder="変更しない場合は空欄"
                className="col-12 col-sm-8"
                require
              />
            </div>
            <div className="row mb-3">
            <button
              disabled={loading}
              className="submit col-2"
              type="submit"
              onClick={handleSubmit}
            >
              更新
            </button>
          </div>
        </form>
      </div>
      <div className="w-100 text-center mt-2">
        <Link to="/mypage">キャンセル</Link>
      </div>
    </>
  )
}