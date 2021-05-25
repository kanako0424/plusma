import React from 'react'
// import { db } from '../firebase'
import '../App.css'
import Header from './Header';
import NavBar from './NavBar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Link } from "react-router-dom"
import GetProfile from './GetProfile';
//import CreatedPosts from './CreatedPosts';

function Mypage() {
  const userId = window.location.href.slice(-28);
  return (
    <>
    <Header title={"My Page"}/>
    <GetProfile userId={userId}/>
    {/* <CreatedPosts userId={userId}/> */}
    <NavBar />
    </>
  )
}

export default Mypage