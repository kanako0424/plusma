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
      <div className="container justify-content-center login">
        <h2 className="text-center m-4">ログイン</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form>
          <div className="row mb-4">
            <label htmlFor="email" className="col-6 col-sm-4">メールアドレス</label>
            <input id="email" className="col-12 col-sm-8" type="email" ref={emailRef}  placeholder="user@exmaple.com" required />
          </div>
          <div className="row mb-4">
            <label htmlFor="password" className="col-6 col-sm-4">パスワード</label>
            <input id="password" className="col-12 col-sm-8" type="password" ref={passwordRef} placeholder="password" required />
          </div>
          <div className="row mb-3">
            <button
              disabled={loading}
              className="submit"
              type="submit"
              onClick={handleSubmit}
            >
              ログイン
            </button>
          </div>
        </form>
        <div className="w-100 text-center mt-4">
          <Link to="/forgot-password">パスワードを忘れた方はこちら</Link>
        </div>
      </div>
    <div className="w-100 text-center mt-2">
      <Link to="/signup">アカウントの作成</Link>
    </div>
    </>
  )
}