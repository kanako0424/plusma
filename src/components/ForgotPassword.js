import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("パスワードの再設定に失敗しました。")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="container justify-content-center login">
        <h2 className="text-center mb-4">パスワード再設定</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <form>
          <div className="row mb-4">
            <label className="col-6 col-sm-4">メールアドレス</label>
            <input type="email" ref={emailRef} id="email" className="col-12 col-sm-8" required />
          </div>
          <div className="row mb-3">
            <button
              disabled={loading}
              className="submit"
              type="submit"
              onClick={handleSubmit}
              >
              パスワードを再設定する
            </button>
          </div>
        </form>
        <div className="w-100 text-center mt-3">
          <Link to="/login">ログイン</Link>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        アカウントの作成 <Link to="/signup">サインアップ</Link>
      </div>
    </>
  )
}