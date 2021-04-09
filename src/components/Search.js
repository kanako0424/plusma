import React from 'react'
import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'

function Search() {
  return (
    <div className="container">
      <Header title={"検索"} />
      <input type="text" />
      <button><FontAwesomeIcon icon={ faSearch } /></button>
      <NavBar />
    </div>
  )
}

export default Search
