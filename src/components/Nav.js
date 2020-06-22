import React from 'react'

import '../styles/styles.sass'

const Nav = () => {
  return (
    <div style={{marginTop: "1rem", marginBottom: "2rem"}}>
      <nav>
        <a href="/"> <span className="tag is-light"> Home </span> </a>
        <a href="/research"> <span className="tag is-light"> Research </span> </a>
        <a href="/engineering"> <span className="tag is-light"> Engineering </span> </a>
        <a href="/consulting"> <span className="tag is-light"> Consulting </span> </a>
        <a href="/teaching"> <span className="tag is-light"> Teaching </span> </a>
        <a href="/blog"> <span style={{marginTop: "0.3rem"}} className="tag is-light"> Blog </span> </a>
      </nav>
    </div>
  )
}

export default Nav