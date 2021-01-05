import React from 'react'
import anime from 'animejs/lib/anime.es.js'
import { Helmet } from "react-helmet"
import { Stage, Layer, Circle, Line } from 'react-konva';
import '../styles/styles.sass'

const Index = () => {
  const animationRef = React.useRef(null);
  
  React.useEffect(() => {
    animationRef.current = anime.timeline({
      easing: 'linear',
      direction: 'alternate',
      duration: 1000
    })
    .add({ targets: '.neuron1',  background: ['#F4F4F4', '#BFD5F6'], delay: 200}, 0)
    .add({ targets: '.neuron6',  background: ['#F4F4F4', '#BFD5F6'], delay: 400}, 0)
    .add({ targets: '.neuron8',  background: ['#F4F4F4', '#BFD5F6'], delay: 600}, 0)
    .add({ targets: '.neuron10',  background: ['#F4F4F4', '#BFD5F6'], delay: 800 }, 0)

  }, [])

  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Arun Kirubarajan</title>
      </Helmet>

	    <div className="container">
        <div className="columns is-multiline is-variable is-8 is-vcentered" style={{height: '90vh'}}>
          <div className="column is-half">  
	          <h1 style={{marginTop: '2rem', color: '#496B9E'}} className="title is-family-secondary is-size-2 has-text-info-dark">
              Hi, I'm Arun. 🙌
            </h1>
	          <p>
	            I'm a (Canadian! 🇨🇦) undergraduate at the University of Pennsylvania studying computer science and minoring in linguistics. 
              I'm also a <a href="/research">published</a> machine learning researcher in Penn's <a href="https://penn-nlp.github.io/">NLP Group</a> and I teach Penn's official <a href="https://cis192.github.io/"> Python course</a>.
              
              <br /> <br />
              Outside of school, I'm currently a Managing Partner at a venture capital firm named <a href="https://dormroomfund.com">Dorm Room Fund</a>.
              Previously, I've worked at a couple of interesting companies, such as <a href="https://vise.com">Vise</a>, <a href="https://foursquare.com">Foursquare</a>, and <a href="https://bridgewater.com">Bridgewater</a>.
			   	    I also consult with a variety of organizations, ranging from Y&#8209;Combinator backed startups to R&D/defense companies.

              <br /> <br />
              Other than that, I like brewing coffee, skateboarding, and birdwatching! 
              This website is where I write about the things that I am doing or stuff I find interesting.
	          </p>
	        </div>
          <div className="column is-half">
            <Stage width={'100%'} height={'100%'}>
              <Layer>
                <Circle x={200} y={200} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={325} y={200} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={450} y={200} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={575} y={200} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={260} y={325} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={385} y={325} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={510} y={325} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={325} y={450} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={450} y={450} fill="#F4F4F4" radius={50} />
              </Layer>
              <Layer>
                <Circle x={385} y={325} fill="#F4F4F4" radius={50} />
              </Layer>
            </Stage>
          </div>
	        <div className="column is-half">
            <div>
              <span className="neuron1" style={{
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />

              <span className="neuron2" style={{
                marginLeft: "30px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />

              <span className="neuron3" style={{
                marginLeft: "30px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              
              <span className="neuron4" style={{
                marginLeft: "30px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
            </div>

            <div style={{marginTop: '1rem'}}>
              <span className="neuron5" style={{
                marginLeft: "65px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              <span className="neuron6" style={{
                marginLeft: "30px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />

              <span className="neuron7" style={{
                marginLeft: "30px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />   
            </div>

            <div style={{marginTop: '1rem'}}>
              <span className="neuron8" style={{
                marginLeft: "130px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              <span className="neuron9" style={{
                marginLeft: "30px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
            </div>
            <div style={{marginTop: '1rem'}}>
              <span className="neuron10" style={{
                marginLeft: "200px",
                height: '100px',
                width: '100px',
                backgroundColor: '#F4F4F4',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
            </div>
          </div>
        </div>
	    </div>
	  </section>
  );
}

export default Index;