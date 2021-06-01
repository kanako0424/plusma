import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom';

function NavBar() {
  const {currentUser} = useAuth()
  const home = <FontAwesomeIcon icon={faHome} />
  const search = <FontAwesomeIcon icon={faSearch} />
  const plus = <FontAwesomeIcon icon={faPlus} />
  const user = <FontAwesomeIcon icon={faUser} />

  return (
    <div className="nav_bar">
      <a href="/">{home}</a>
      <a href="/search">{search}</a>
      <a href="/create-post">{plus}</a>
      <Link to={{pathname: `/users/${currentUser.uid}`}}>
        {user}
      </Link>
    </div>

  )
}

export default NavBar
