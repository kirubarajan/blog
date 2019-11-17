import React from 'react';
import { graphql } from 'gatsby';

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-solarizedlight.css")

const Template = ({data}) => {
  const {markdownRemark} = data;
  const html = markdownRemark.html
  
  return (
    <section>
      <div className="container">
        <div className="columns">
          <div className="column" />
          <div className="column is-half" style={{padding: "2rem"}}>
            <br />
            <div className="generated" dangerouslySetInnerHTML={{__html: html}} /> 
            <hr />
            <p>Read more posts <a href="/blog">here</a>.</p>
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
      }
    }
  }
`

export default Template;