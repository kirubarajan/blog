import React from 'react'
import Nav from '../components/Nav'

const Consulting = () => {
  return (
	  <section className="section" style={{"paddingTop": "1rem"}}>
	    <div className="container">
        <div className="columns">
          <div className="column is-one-fourth"> </div>
          <div className="column">  
          	<Nav />
	          <figure className="image is-128x128">
	            <img src={"/img/site.svg"}  />
	          </figure>
	          <h1 class="title"> some consulting </h1>
	          <p>           
	            In 2014, I started an education startup named Notebulb with my friends in high school (it didn't work out). Then, in 2016, I founded a startup named <a href="https://eloreprojects.com">elore</a> that used NLP to match software engineering applicants to technical companies. We were able
	            to grow to 30 teams using our product and were named Most Progressive Startup of our batch at an MIT residential incubator. 
				
				<br /> <br />
				Previously, I was also named one of Wharton's Experts in Residence, helping incubated startups mature and scale. 
                Now, I consult with a variety of cloud companies for deep learning infrastructure solutions. 
                Some of my clients include <a href="https://digitalocean.com">Digital Ocean</a>, <a href="https://www.alibabacloud.com">Alibaba Cloud</a> and
                <a href="https://www.trackgen.com"> TrackGen</a>. <br /> <br />
                I'm also currently a partner at <a href="https://dormroomfund.com">Dorm Room Fund</a> - feel free to send me any interesting startups or ideas at <a href="mailto:arun@dormroomfund.com">arun@dormroomfund.com</a>!

	          </p> 
	        </div>
	        <div className="column"></div>
	      </div>
	    </div>
	  </section>
  );
}

export default Consulting;