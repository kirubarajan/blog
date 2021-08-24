import React from 'react'
import { Helmet } from "react-helmet"
import Nav from '../components/Nav'

const projects = [
  {
	  "name": "Catacomb",
	  "description": "Machine learning platform for deploying prototypes, conducting quality assurance, and tracking production model performance. Powered by Kubernetes, supports PyTorch, Tensorflow and other ML frameworks.",
	  "github": "https://github.com/catacomb",
  },
  {
	  "name": "crypt",
	  "description": "A powerful account manager that generates unique anonymous emails and passwords when signing up for new online accounts. PennApps XV Best Security and Encryption Awards. Functionality later implemented by Apple.",
	  "github": "https://github.com/eloreprojects/crypt"
  },
  {
    "name": "PennFace Book",
    "description": "A full-stack ES6 implementation of Facebook with a focus on mental health, including MapReduce jobs for sentiment analysis. Awarded NETS212 Hall of Fame Prize by Facebook."
  },
  {
	  "name": "PennSDK",
	  "description": "Public API that congregates Penn's organizational data (e.g. venues, ammenities, events, services). Worked on integrating dining service data in Python and implemented token security.",
	  "github": "https://github.com/pennlabs/penn-sdk-python",
  },
	{
	  "name": "Phrase Similarity Visualizer",
	  "description": "Visualization tool to compare various methods of phrase similarity (i.e. string, lexical, semantic). Trained Word2Vec model to use an average-of-vectors semantic implementation.",
	  "github": "https://github.com/kirubarajan/phraseviz",
	},
	{
	  "name": "crrntly",
	  "description": "A free minimalist kanban board for teams to use. Offers team updates on a member-by-member basis in real-time. Built using Node and MongoDB.",
	  "github": "https://github.com/kirubarajan/crrntly",
  },
  {
	  "name": "Penn Clubs",
	  "description": "A public directory of student-run organizations at Penn, used by tens of thousands of students. Written in React and Django.",
	  "github": "https://github.com/pennlabs/pennclubs",
  },
  {
    "name": "Price Tracker",
    "description": "An application to track the value of blue chip stocks over history, and compute potential returns on other commodities to maximize long-term gain.",
    "github": "https://github.com/ksjiaxian/price_tracker"
  },
	{
	  "name": "programjs",
	  "description": "A comprehensive and lightweight npm package of common data structures and algorithms to accelerate development in JavaScript.",
	  "github": "https://github.com/eloreprojects/programjs"
	},
	{
	  "name": "Voluntold",
	  "description": "A app displaying a realtime free directory of non-profit organizations to volunteer for. Made using Firebase and the Ionic Framework for Harvard's CS50 course.",
	  "github": "https://github.com/kirubarajan/voluntold"
	}
]

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
	            <img src={"/img/thinking.svg"}  />
	          </figure>
	          <h1 class="title"> some engineering </h1>
	          <p>           
	            I've been programming since I was a kid, when I built clones of 
              Super Smash Bros and other video games. Since then, I've gotten involved in full stack development (React, Rails, Django, SQL),
              machine learning (PyTorch, Tensorflow), distributed systems (Docker, MapReduce, Kubernetes) and anything else I can get my hands on!

              <br /> <br />
              
              I also work on open source projects at <a href="https://pennlabs.org">Penn Labs</a>, where I've been a founding team lead for different projects used by virtually every Penn student. 
      	    </p>
            <br />
            <p style={{color: 'grey', fontWeight: 600}}>Non-exhaustive list of projects:</p> 
	        </div>
	        <div className="column"></div>
	      </div>
        <div className="columns is-multiline">
            {projects.map(project => (
              <div className="column is-one-third">
                <div className="box">
                  <p style={{fontWeight: 600, marginBottom: '0.25rem'}}>{project.name}</p>
                  <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>
                    {project.description}
                  </p>
                  <p>
                    <a href={project.github}>Source</a>
                  </p>
                </div>
              </div>
            ))}
        </div>
	    </div>
	  </section>
  );
}

export default Consulting;