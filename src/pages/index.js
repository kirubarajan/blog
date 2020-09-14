import React from 'react'
import { Helmet } from "react-helmet"
import Nav from '../components/Nav'

const Index = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
		    <Helmet>
          <meta charSet="utf-8" />
          <title>Arun Kirubarajan</title>
        </Helmet>

	    <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
          	<Nav />
	          <figure className="image is-128x128">
	            <img src={"/img/hello.svg"}  />
	          </figure>
	          <h1 className="title"> Hi! I'm Arun. 🙌 </h1>
	          <p>
	            I'm an undergraduate at the University of Pennsylvania studying computer science and minoring in linguistics. 
              I'm a <a href="/research">published</a> machine learning researcher in Penn's <a href="https://penn-nlp.github.io/">NLP Group</a> and I also <a href="https://cis192.github.io/">teach a course</a> in Penn's computer science department!
              
              <br /> <br />
              	Outside of school, I'm currently a Managing Partner at a venture capital firm named <a href="https://dormroomfund.com">Dorm Room Fund</a> and a Quantitative Researcher at an AI company named <a href="https://vise.com">Vise</a>.
			  	Previously I was an intern at a hedge fund named <a href="https://bridgewater.com"> Bridgewater</a>.
			   	I also do consulting and contract work with a variety of organizations, ranging from Y&#8209;Combinator backed startups to R&D/defense companies.

              <br /> <br />
              Other than that, I like brewing coffee, skateboarding, and birdwatching! 
              This website is where I write about the things that I am doing or stuff I find interesting.
	          </p>
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Index;