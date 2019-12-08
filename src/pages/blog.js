import React from "react";
import { graphql, Link } from 'gatsby';
import Nav from '../components/Nav';

const Blog = ({data}) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <section className="section" style={{"paddingTop": "1rem"}}>
      <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
            <Nav />
            <figure className="image is-128x128">
              <img src={"/img/papers.svg"} />
            </figure>
            <h1 className="title"> my blog </h1>
            <p>I like writing about food, my work and (sometimes)
              my personal life. My views are entirely my own.</p>
            <p>
              <hr />
              <p style={{marginBottom: "0.5rem"}}><strong>Posts</strong></p>
              <ul style={{listStyleType: "none"}}>
                {edges.map(edge => {
                  const {frontmatter} = edge.node;
                  return (
                    <li key={frontmatter.path} style={{color: "grey", marginTop: "0.25rem"}}>
                      <span style={{fontSize: "0.75rem"}}>{frontmatter.date}: </span>
                      <Link to={frontmatter.path}>
                      {frontmatter.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </p>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </section>
  )
};

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark (
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            path
            date
          }
        }
      }
    }
  }
`

export default Blog;