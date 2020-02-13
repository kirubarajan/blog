import React from 'react'

import '../styles/styles.sass'

function getColour(name) {
  if (name == "machine learning") return "is-light is-info";
  if (name == "personal") return "is-light is-danger";
  if (name == "natural language processing") return "is-light is-success";
  if (name == "notes") return "is-light is-warning";
  if (name == "programming") return "is-light is-primary";
  if (name == "research") return "is-light is-primary";
}

const Tag = (props) => {
  return (
    <a href={"/tags/" + props.name}> <span style={{marginTop: "0.3rem"}} class={"tag " + getColour(props.name)}> {props.name} </span> </a>
  )
}

export default Tag;