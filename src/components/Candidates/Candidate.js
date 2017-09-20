import React from 'react';
import Aside from '../common/Aside';

const Candidate = ({candidateId, candidate}) => {
	console.log('props from Candidate', candidateId, candidate);
  return (
    <div className="Candidate flex">
    	<article className="Main">
	    	<h2>{candidate.title}</h2>
	    	<h3>{candidate.district}</h3>
	    	<img 
	    		src={`../${candidate.imgSrc}`}
	    		alt={candidate.title} 
	    	/>
	    	<p>{candidate.summary}</p>
    	</article>
    	<Aside 
    		twitterHandles={['JCarrollFoy']}
    	/>
    </div>
  );
};

export default Candidate;
