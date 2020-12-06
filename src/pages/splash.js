import React from 'react'
import { Helmet } from "react-helmet"
import '../styles/styles.sass'

const Index = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Arun Kirubarajan</title>
      </Helmet>

	    <div className="container">
        <div className="columns">
          <div className="column is-half">  
	          <h1 style={{marginTop: '2rem', color: '#496B9E'}} className="title is-family-secondary is-size-2 has-text-info-dark">
              Hi, I'm Arun. 🙌
            </h1>
	          <p>
	            I'm a (Canadian! 🇨🇦) undergraduate at the University of Pennsylvania studying computer science and minoring in linguistics. 
              I'm also a <a href="/research">published</a> machine learning researcher in Penn's <a href="https://penn-nlp.github.io/">NLP Group</a> and I teach Penn's official <a href="https://cis192.github.io/"> Python course</a>.
              
              <br /> <br />
              Outside of school, I'm currently a Managing Partner at a venture capital firm named <a href="https://dormroomfund.com">Dorm Room Fund</a>.
              Previously, I've worked at a couple of interesting companies, such as <a href="https://vise.com">Vise</a>, <a href="https://foursquare.com">Foursquare</a>, and <a href="https://bridgewater.com">Bridgewater</a>.
			   	    I also consult with a variety of organizations, ranging from Y&#8209;Combinator backed startups to R&D/defense companies.

              <br /> <br />
              Other than that, I like brewing coffee, skateboarding, and birdwatching! 
              This website is where I write about the things that I am doing or stuff I find interesting.
	          </p>
	        </div>
	        <div className="column is-half">
          </div>
        </div>
	    </div>
	  </section>
  );
}

export default Index;