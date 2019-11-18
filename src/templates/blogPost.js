import React from 'react';
import { graphql } from 'gatsby';

require(`katex/dist/katex.min.css`)
require("../styles/prism-base16-ateliersulphurpool.light.css")

const Template = ({data}) => {
  const {markdownRemark} = data
  const html = markdownRemark.html
  const date = markdownRemark.frontmatter.date
  const tags = markdownRemark.frontmatter.tags
  
  return (
    <section>
      <div className="container">
        <div className="columns">
          <div className="column" />
          <div className="column is-half" style={{padding: "2rem"}}>
            <br />
            <div className="generated">
              <p className="is-size-7" style={{marginBottom: "0.5rem"}}>
                Tags: {tags.map(tag => <span style={{marginRight: "0.2rem"}} class="tag is-light is-link"> {tag} </span>)} 
                <a href="/blog"> <span style={{marginRight: "0.2rem"}} class="tag is-light is-link"> all </span> </a>
              </p>
              <p className="is-size-7" style={{marginBottom: "0.5rem"}}>Last Edit: {date}</p>
              <div style={{marginTop: "1rem"}} dangerouslySetInnerHTML={{__html: html}}/>
            </div>
            <hr style={{marginTop: "2.5rem"}}/>
            <div className="level">
              <p className="is-size-7" style={{marginBottom: "0.5rem"}}>Thanks for reading!</p>
              <a href="/blog"><span class="tag is-link is-light is-medium">More Posts</span></a>
            </div>
          </div>
          <div className="column" />
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug }}) {
      rawMarkdownBody
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`

export default Template;