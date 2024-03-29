import React from "react";
import { graphql, Link } from 'gatsby';
import { Helmet } from "react-helmet"
import Nav from '../components/Nav';
import Tag from '../components/Tag';

const Blog = ({data}) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <section className="section" style={{"paddingTop": "1rem"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog</title>
      </Helmet>
      
      <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
            <Nav />
            <figure className="image is-128x128">
              <img src={"/img/papers.svg"} />
            </figure>
            <h1 className="title"> blog </h1>
            <p>
              <p style={{fontSize: "0.85rem"}} className="has-text-grey mb-3">Featured</p>
              {edges.map(edge => {
                const {frontmatter} = edge.node;
                if (frontmatter.favourite && !frontmatter.hidden) {
                  return (
                    <div className="box" key={frontmatter.path} style={{color: "grey", marginBottom: "1rem"}}>
                      <span style={{fontSize: "0.75rem"}}>{frontmatter.date} </span> <br />
                      <Link to={frontmatter.path}>
                      <p>{frontmatter.title}</p>
                      </Link>
                      <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>{frontmatter.excerpt}</p>
                      {frontmatter.tags.map(tag => <Tag name={tag} />)} 
                    </div>
                  )
                }
              })}

              <p style={{fontSize: "0.85rem"}} className="has-text-grey mb-3 mt-5">All Posts</p>
              {edges.map(edge => {
                const {frontmatter} = edge.node;
                
                if (!frontmatter.favourite && !frontmatter.hidden) {
                  return (
                    <div className="box" key={frontmatter.path} style={{color: "grey", marginBottom: "1rem"}}>
                      <span style={{fontSize: "0.75rem"}}>{frontmatter.date} </span> <br />
                      <Link to={frontmatter.path}>
                      <p>{frontmatter.title}</p>
                      </Link>
                      <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>{frontmatter.excerpt}</p>
                      {frontmatter.tags.map(tag => <Tag name={tag} />)} 
                    </div>
                  )
                }
              })}
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
            tags
            favourite
            hidden
          }
        }
      }
    }
  }
`

export default Blog;