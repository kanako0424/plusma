import React from "react"
import NavBar from "./NavBar"
import Settings from './Settings'
function Header({title}) {

  return (
    <div className="header d-flex">
      <div className="title">{title}</div>
      <NavBar/>
      {title==="My Page" && (<Settings />)}
    </div>
  )
}

export default Header
