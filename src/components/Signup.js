import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("パスワードが正しくありません。")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("アカウントの作成に失敗しました。")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="signup container">
        <h2 className="text-center m-4">サインアップ</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form>
        <div className="row mb-4">
          <label htmlFor="email" className="col-6 col-sm-4">メールアドレス</label>
          <input id="email" type="email" ref={emailRef}  className="col-12 col-sm-8"  placeholder="user@example.com" required />
        </div>
        <div className="row mb-4">
          <label htmlFor="password" className="col-6 col-sm-4">パスワード</label>
          <input id="password" type="password" ref={passwordRef}   placeholder="password" className="col-12 col-sm-8" required />
        </div>
        <div className="row mb-4">
          <label htmlFor="password-confirm" className="col-6 col-sm-4">パスワードの確認</label>
          <input id="password-confirm" type="password" ref={passwordConfirmRef}   placeholder="password" className="col-12 col-sm-8" required/>
        </div>
        <div className="row mb-3">
          <button
            disabled={loading}
            className="submit"
            type="submit"
            onClick={handleSubmit}
          >
            サインアップ
          </button>
        </div>
        </form>
      </div>
      <div className="w-100 text-center mt-2">
        既にアカウントをお持ちの方→ <Link to="/login">ログイン</Link>
      </div>
    </>
  )
}