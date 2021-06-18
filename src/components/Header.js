import React from "react"
import NavBar from "./NavBar"
function Header({title}) {

  return (
    <div className="header d-flex">
      <div className="title">{title}</div>
      <NavBar/>
    </div>
  )
}

export default Header
