import React from 'react'
import { Helmet } from "react-helmet"
import Nav from '../components/Nav'

const projects = [
	{
		"name": "BIG-Bench",
		"description": "Benchmark for measuring and extrapolating the capabilities of language models. Collaborative dataset published in 2022 by Google, Penn, and dozens of other institutions.",
		"github": "https://github.com/google/BIG-bench",
		"paper": "https://arxiv.org/abs/2206.04615"
	},	
	{
		"name": "Real or Fake Text?",
		"description": "A tool for the crowd-sourced evaluation of large-scale neural language models. Published EMNLP 2020.",
		"demo": "https://www.roft.io/",
		"github": "https://github.com/kirubarajan/roft",
	},
	{
		"name": "ChatEval",
    	"description": "A scientific chatbot evaluation framework for automatic and human evaluation of dialogue. Published NAACL 2019.",
    	"demo": "https://chateval.org",
		"github": "https://github.com/chateval",
		"paper": "https://www.aclweb.org/anthology/N19-4011/"
  },
	{
		"name": "Predicting Orderliness Using Wikihow",
		"description": "Performing temporal event reasoning by fine-tuning BERT-based neural language models.",
		'paper': 'https://kirubarajan.nyc3.digitaloceanspaces.com/kirubarajan_kashyap_zhang.pdf' 
  },
  {
		"name": "Deep DNA (CRISPR) Lineage Tree Reconstruction",
		"description": "A simulation framework for the zygote development process to achieve a dataset size required by deep learning models, and various supervised and unsupervised approaches for cell mutation tree reconstruction.",
		"github": "https://github.com/mukund-v/learning-the-game-of-life",
		"paper": "https://kirubarajan.nyc3.digitaloceanspaces.com/learning_game_of_life.pdf"
	},
	{
		"name": "Cloud4ISR",
		"description": "Leveraging cloud architectures to perform intelligence, surveillance, and reconnaissance. Published SPIE Defense 2016.",
		"paper": "https://spie.org/conferences-and-exhibitions/past-conferences-and-exhibitions/defense--commercial-sensing-2016",
	},
  {
		"name": "Evaluation Criteria for Human and Computer Written Text",
		"description": "Human-annotated taxonomy of both errors made by large-scale neural language models, and characteristics of human-written text.",
		"paper": "https://kirubarajan.nyc3.digitaloceanspaces.com/learning_to_trick.pdf",
  },
	{
		"name": "GROVER: Generating Rap by Observing Verses",
		"description": "An LSTM-based with attention model written in PyTorch that uses the CMU pronounciation dictionary to generate rhyming lyrics with inflection and meter.",
		"paper": "https://kirubarajan.nyc3.digitaloceanspaces.com/530_Final_Project_1_.pdf",
	}
]

const Research = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
		  	<Helmet>
          <meta charSet="utf-8" />
          <title>Research</title>
        </Helmet>

	    <div className="container">
        <div className="columns" style={{marginBottom: 0}}>
          <div className="column is-one-fourth"> </div>
          <div className="column">  
          	<Nav />
	          <figure className="image is-128x128">
	            <img src={"/img/nips.svg"}  />
	          </figure>
			      <h1 class="title"> some research</h1>
	            I am an NLP researcher working in Professor <a href="http://www.cis.upenn.edu/~ccb/">Chris Callison-Burch's</a> lab. You can find my Google Scholar profile <a href="https://scholar.google.com/citations?user=9dZbMCsAAAAJ&hl=en&oi=ao">here</a>.  <br /> <br />

              <p style={{marginBottom: '0.5rem', color: 'grey', fontWeight: 600}}>Projects:</p> 
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
                  {project.demo && <a style={{marginRight: "0.75rem"}} href={project.demo}>Demo</a>}
                  {project.paper && <a style={{marginRight: "0.75rem"}} href={project.paper}>Paper</a>}
                  {project.github && <a style={{marginRight: "0.75rem"}} href={project.github}>Source</a>}
                  </p>
                </div>
              </div>
            ))}
        </div>
	    </div>
	  </section>
  );
}

export default Research;