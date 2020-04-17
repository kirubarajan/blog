import React from 'react'
import { Helmet } from "react-helmet"
import Nav from '../components/Nav'

const Research = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
		  	<Helmet>
          <meta charSet="utf-8" />
          <title>Research</title>
        </Helmet>

	    <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
          	<Nav />
	          <figure className="image is-128x128">
	            <img src={"/img/thinking.svg"}  />
	          </figure>
			  <h1 class="title"> my research</h1>
              <p><strong>Papers</strong></p>
              <div class="panel list-group" style={{marginTop: "1rem", borderRadius: "0.2rem"}}>
                <a class="panel-block list-group-item is-primary" href="https://www.aclweb.org/anthology/N19-4011/">ChatEval: A Tool for Chatbot Evaluation [NAACL 2019]</a>
                <a class="panel-block list-group-item is-primary" href="https://spie.org/conferences-and-exhibitions/past-conferences-and-exhibitions/defense--commercial-sensing-2016">Cloud4ISR: Large-scale intelligence, surveillance, and reconnaissance [SPIE 2016]</a>
              </div>
              <p><strong>Projects</strong></p>
              <div class="panel list-group" style={{marginTop: "1rem", borderRadius: "0.2rem"}}>
				<a class="panel-block list-group-item is-primary" href="https://github.com/kirubarajan/trick">Learning to Trick Humans: Evaluation Criteria for Human and Computer Written Text</a>
				<a class="panel-block list-group-item is-primary" href="https://github.com/kirubarajan/trick">Learning Temporal Event Reasoning Using Wiki-How</a>
				<a class="panel-block list-group-item is-primary" href="https://kirubarajan.nyc3.digitaloceanspaces.com/ESE546_fp_learning_game_of_life.pdf">Deep DNA (CRISPR) Lineage Tree Reconstruction</a>
				<a class="panel-block list-group-item is-primary" href="https://kirubarajan.nyc3.digitaloceanspaces.com/530_Final_Project_1_.pdf">GROVER: Generating Rap by Observing Verses</a>
              </div>
	            <p style={{marginBottom: "0.5rem"}}> <strong>Natural Language Processing</strong> </p>
	            I am an undergraduate researcher working in Professor <a href="http://www.cis.upenn.edu/~ccb/">Chris Callison-Burch's</a> lab. My research interests
	            include applying deep learning techniques to natural language processing problems, specifically in the domain of information extraction and dialogue systems. 
	            I have publications in the ACL anthology and NAACL for the area of dialogue systems. <br /> <br />

	            My current research includes optimization techniques for natural language processing systems, primarily those involving attention mechanisms. 
	            
	            <br /> <br />
	            <p style={{marginBottom: "0.5rem"}}> <strong>Software Architecture</strong> </p>
	            I published a conference paper in the 2016 SPIE Defense journal and presented a talk on the cloud architecture I helped design (online
	            processing of autonomous vehicle sensor data). This architecture was later developed at Trackgen and deployed into production.<br /> <br />

	            I've previously volunteered at McMaster University under Professor Jamal Deen and Dr. Thamarasa, assisting
	            in data analysis using D3.js and Javascript. In addition, I helped write scripts to speed up instantiation of EC2 instances
	            for analyzing tracker data. <br /> <br />     
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Research;