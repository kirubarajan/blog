import React from "react";
import { Link } from 'gatsby';

const SingleTagTemplate = ({data, pageContext}) => {
  const { posts, tagName } = pageContext;

  return (
    <div className="container">
      <br />
      <div style={{marginBottom: "0.5rem"}}>
        All posts about <strong className="has-text-grey">{`${tagName}`}</strong>:
      </div>
      <div>
        <ul>
          {posts.map((post, index) => {
            return (<li key={index}> <Link to={post.frontmatter.path}> {post.frontmatter.title} </Link> </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default SingleTagTemplate;