import React from 'react'
import anime from 'animejs/lib/anime.es.js';

const Index = () => {
  const animationRef = React.useRef(null);
  
  React.useEffect(() => {
    animationRef.current = anime.timeline({
      easing: 'linear',
      autoplay: false,
      duration: 100
    })
    .add({ targets: '.neuron1',  background: ['#F4F4F4', '#BFD5F6'], delay: 0}, 0)
    .add({ targets: '.neuron6',  background: ['#F4F4F4', '#BFD5F6'], delay: 50}, 0)
    .add({ targets: '.neuron8',  background: ['#F4F4F4', '#BFD5F6'], delay: 100}, 0)
    .add({ targets: '.neuron10',  background: ['#F4F4F4', '#BFD5F6'], delay: 150 }, 0)

  }, [])

  return (
    <div className="container" style={{marginTop: '12.5rem'}}>
      <div className="columns is-multiline">
        <div className="column is-full">
          <button className="button" onClick={() => animationRef.current.restart()}>Think about it →</button>
        </div>
        <div className="column is-full">
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
  )
}

export default Index