import React from 'react'
import { Helmet } from "react-helmet"
import Nav from '../components/Nav'

const Teaching = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Teaching</title>
      </Helmet>

	    <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
          	<Nav />
	          <figure className="image is-128x128">
	            <img src={"/img/philly.svg"}  />
	          </figure>
						<h1 class="title"> some teaching </h1>
	          <p>
	            I am the instructor for <a href="https://www.cis.upenn.edu/~cis192/">CIS 192</a> at Penn, which is 
	            a great class about some very interesting topics (in Python). Previously, I was a teaching assistant for <a href="http://computational-linguistics-class.org/">CIS 530</a> - Penn's graduate computational linguistics course. <br />
	          </p>
	          <br />
	          <p><strong>Machine Learning</strong></p>
	          <div class="panel list-group" style={{marginTop: "1rem", borderRadius: "0.2rem"}}>
	            <a class="panel-block list-group-item is-primary">P-Classic 2019 - Natural Language Processing (Python) </a>
	            <a class="panel-block list-group-item is-primary">PennApps 2019 - Machine Learning (Python) </a>
	          </div>
	          <p><strong>Web Development</strong></p>
	          <div class="panel list-group" style={{marginTop: "1rem", borderRadius: "0.2rem"}}>
	            <a class="panel-block list-group-item is-primary">PennApps 2018 - Django Rest Framework (Python)</a>
	            <a class="panel-block list-group-item is-primary">PennApps 2018 - Express REST APIs (Node.js)</a>
	          </div>
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Teaching;