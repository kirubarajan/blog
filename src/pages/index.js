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
	          <h1 style={{marginTop: '1rem', color: '#496B9E'}} className="title is-family-secondary is-size-2 has-text-info-dark"> Hi, I'm Arun. 🙌 </h1>
	          <p>
              I research machine learning for natural language processing and teach computer science at the University of Pennsylvania. My research interests are 
              in generative language models and evaluation methodology.

              <br /> <br />
              Previously, I worked on algorithmic trading signals at <a href="https://mlp.com">Millennium</a>, customizable portfolio optimization at <a href="https://vise.com">Vise</a>, and big data streaming at <a href='https://foursquare.com'>Foursquare</a>.
              I was also a managing partner at a venture capital fund named <a href='https://dormroomfund.com'>Dorm Room Fund</a>.

              <br /> <br />
              Other than that, I like brewing coffee, skateboarding, birdwatching, and playing video games! This website is where I write about things I find interesting.
	          </p>
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Index;