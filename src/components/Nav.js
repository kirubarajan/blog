import React from 'react'

import '../styles/styles.sass'

const Nav = () => {
  return (
    <div>
      <nav>
        <a href="/"> <span style={{"marginTop": "2rem"}} className="tag is-light"> Home </span> </a>
        <a href="/research"> <span className="tag is-light"> Research </span> </a>
        <a href="/consulting"> <span className="tag is-light"> Consulting </span> </a>
        <a href="/teaching"> <span style={{"marginTop": "0.25rem"}} className="tag is-light"> Teaching </span> </a>
        <a href="/blog"> <span style={{"marginBottom": "2rem"}} className="tag is-light"> Blog </span> </a>
      </nav>
    </div>
  )
}

export default Nav