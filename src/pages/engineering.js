import React from 'react'
import { Helmet } from "react-helmet"
import Nav from '../components/Nav'

const Consulting = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Engineering</title>
      </Helmet>

	    <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
          	<Nav />
	          <figure className="image is-128x128">
	            <img src={"/img/nips.svg"}  />
	          </figure>
	          <h1 class="title"> some engineering </h1>
	          <p>           
	            I've been programming since I was 9 years old, when I developed clones of 
              Super Smash Bros and other video games. Since then, I've gotten involved in full stack development (React, Rails, Django, SQL),
              machine learning (PyTorch, Tensorflow), distributed systems (Docker, MapReduce, Kubernetes) and anything else I can get my hands on!

              <br /> <br />
              
              Professionally, I've built systems for intelligence at Foursquare, Bridgewater, and Dorm Room Fund. I'm currently working on a 
              new project named <a href="https://catacomb.ai/">Catacomb</a>.
			  
      				<br /> <br />
              I'm always looking for contract work - feel free to reach out to me at <a>arun@dormroomfund.com</a>!
	          </p> 
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Consulting;