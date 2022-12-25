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
              I'm one of the founders of <a href="https://magna.so">Magna</a>, a crypto/fintech startup based in NYC and backed by Tiger Global, Y-Combinator as well as some other awesome investors. We're hiring!

              <br /> <br />

              I also research machine learning for natural language processing and I used to <a href="/teaching">teach computer science</a> at the University of Pennsylvania. <a href="/research">My research interests</a> are 
              evaluation methodology for generative language models.

              <br /> <br />
              Previously, I worked on algorithmic trading at <a href="https://mlp.com">Millennium</a>, portfolio optimization at <a href="https://vise.com">Vise</a>, and big data streaming at <a href='https://foursquare.com'>Foursquare</a>.
              I was also a managing partner at a venture capital fund named <a href='https://dormroomfund.com'>Dorm Room Fund</a>.

              <br /> <br />
              Other than that, I like to <a href="/blog">blog</a> about brewing coffee, skateboarding, and making/playing video games.
	          </p>
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Index;