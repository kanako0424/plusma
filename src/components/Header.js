import React from "react"
import NavBar from "./NavBar"
import Settings from './Settings'
function Header({title}) {

  return (
    <div className="header container">
      <div className="row mb-3">
        <div className="title col-4">{title}</div>
        <NavBar/>
      </div>
      {title==="My Page" && (<Settings />)}
    </div>
  )
}

export default Header
