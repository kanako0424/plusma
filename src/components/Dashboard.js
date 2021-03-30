import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import { Link, useHistory } from "react-router-dom"
import NavBar from './NavBar'
import Post from './Post'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  /* これは、
  const currentUser = useAuth().currentUser
  const logout = useAuth().currentUserの２つを一度にやっているのと同じ。 */
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("ログアウトに失敗しました。")
    }
  }

  const letsLoginStatement = () => {
    const letsLogin = 'ログインして投稿しよう'
    if (!currentUser) {
      return (
        <Link to="/login">{letsLogin}</Link>
      )
    } 
  }

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const readData = db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const postArray = snapshot.docs.map(doc => {
          return {
            postName: doc.postName,
            ...doc.data()
          }
        });
        setPosts(postArray);
      });
      return () => {
        readData();
      }
  }, []);
  
  const postListItems = posts.map(post => {
    console.log(post);
    return(
      <Post 
        key={post.postId}
        imageUrl={post.imageUrl}
        postId={post.postId}
        authorId={post.authorId}
        postName={post.postName}
        price={post.price}
      />
    );
  });

  return (
    <>
    <h4>Plusma</h4>
    <div className="hamburger-menu">
      <Card  className="w-100 card-style" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-1">アカウント設定</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            アカウント設定の変更
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>
      <div className="w-100 text-center mt-2">
        <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSfi_VBq8nOqhkknxDfTCn3gUdzRD32rJtexpW9wjSzaIKQ3Pw/viewform?usp=sf_link">お問い合わせ</a>
      </div>
      {letsLoginStatement}
    </div>
    <div className="container">
      <ul className="row justify-content-center">{postListItems}</ul>
    </div>
    <NavBar />
    </>
  )
}