import React from "react"
import NavBar from "./NavBar"
function Header({title}) {

  return (
    <div className="header">
      <div className="d-flex align-items-center">
        <span className="title">{title}</span>
        <NavBar />
      </div>
    </div>
  )
}

export default Header
