import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function NavBar() {
  const home = <FontAwesomeIcon icon={faHome} />
  const search = <FontAwesomeIcon icon={faSearch} />
  const plus = <FontAwesomeIcon icon={faPlus} />
  const user = <FontAwesomeIcon icon={faUser} />
  return (
    <div className="nav_bar">
      <Link to="/">{home}</Link>
      <Link to="/search">{search}</Link>
      <Link to="/create-post">{plus}</Link>
      
      <Link to="/mypage">{user}</Link>
    </div>
  )
}

export default NavBar
