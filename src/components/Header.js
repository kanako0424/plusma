import React from "react"
function Header({title}) {

  return (
    <div className="header">
      <div className="d-flex align-items-center">
        <span className="title">{title}</span>
      </div>
    </div>
  )
}

export default Header
