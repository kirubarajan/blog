import React from 'react'
import Nav from '../components/Nav'

const Index = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
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
	            I'm a Canadian (🇨🇦) undergraduate at the University of Pennsylvania studying computer science, and minoring in linguistics. 
              I research machine learning in Penn's <a href="https://penn-nlp.github.io/">NLP Group</a> and I also <a href="https://cis192.github.io/">teach</a> one of the computer science courses at Penn.
              I'm currently a partner at <a href="https://dormroomfund.com">Dorm Room Fund</a> and an incoming intern at <a href="https://bridgewater.com"> Bridgewater Associates</a>.

              <br /> <br />
              Outside of computer science, I like brewing coffee, skateboarding, and playing Super Smash Brothers!
	            This website is where I write the things that I am doing or stuff I find interesting.
	          </p>
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Index;