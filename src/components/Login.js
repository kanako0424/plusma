import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("ログインに失敗しました。")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="container justify-content-center">
        <h2 className="text-center mb-1 col-12">ログイン</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="email" className="col-4">メールアドレス</label>
            <input id="email" className="col-8" type="email" ref={emailRef} required />
          </div>
          <div className="row">
            <label htmlFor="password" className="col-4">パスワード</label>
            <input id="password" className="col-8" type="password" ref={passwordRef} required />
          </div>
          <div className="row">
            <button disabled={loading} className="submit col-4" type="submit">
              ログイン
            </button>
          </div>
        </form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">パスワードを忘れた方はこちら</Link>
        </div>
      </div>
    <div className="w-100 text-center mt-2">
      アカウントの作成 <Link to="/signup">サインアップ</Link>
    </div>
    </>
  )
}