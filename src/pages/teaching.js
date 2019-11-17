import React from 'react'
import Nav from '../components/Nav'

const Teaching = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
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
	            a great class about some very interesting topics (in Python). I'm also a TA for <a href="http://computational-linguistics-class.org/">CIS 530</a>, Penn's graduate computational linguistics course. <br /> <br /> I like to give technical talks about my work,
	            usually on natural language processing and software engineering: <br />
	          </p>
	          <br />
	          <p><strong>Machine Learning</strong></p>
	          <div class="panel list-group" style={{marginTop: "1rem", borderRadius: "0.2rem"}}>
	            <a class="panel-block list-group-item is-primary">P-Classic 2019 - NLP Survey Lecture </a>
	            <a class="panel-block list-group-item is-primary">WOCHAT 2019 - Neural Text Generation </a>
	            <a class="panel-block list-group-item is-primary">PennApps 2019 - ML and NLP Quickstart (Python)</a>
	          </div>
	          <p><strong>Web Development</strong></p>
	          <div class="panel list-group" style={{marginTop: "1rem", borderRadius: "0.2rem"}}>
	            <a class="panel-block list-group-item is-primary">PennApps 2018 - Django Framework (Python)</a>
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