import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () =>(
  <>
  <h1>404 Not Found</h1>
  <Link to="/">ホームへ戻る</Link>
  </>
)

export default NotFound