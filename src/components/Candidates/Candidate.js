import React from 'react';
import CandidateAside from './CandidateAside';

const Candidate = (props) => {
	console.log('props from Candidate',props);
	let candidate = props.candidate;
	candidate = Object.assign({}, candidate, {
		address: {
			street: "PO Box 5113",
 			city: "Woodbridge",
			state: "VA",
			zip: "22194",
		},
		phone: "571-989-1713",
		fax: null,
		email: "jennifercarrollfoy@gmail.com",
		twitter: "JCarrollFoy",
		facebook: "JenniferCarrollFoy",
	});
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
    	<CandidateAside 
    		candidate={candidate}
    	/>
    </div>
  );
};

export default Candidate;
