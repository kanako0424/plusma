import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'


function NavBar() {
  const home = <FontAwesomeIcon icon={faHome} />
  const search = <FontAwesomeIcon icon={faSearch} />
  const plus = <FontAwesomeIcon icon={faPlus} />
  const user = <FontAwesomeIcon icon={faUser} />
  return (
    <div className="nav_bar">
      <a href="/">{home}</a>
      <a href="/serch">{search}</a>
      <a href="/create-post">{plus}</a>
      <a href="/my-page">{user}</a>
    </div>
  )
}

export default NavBar
