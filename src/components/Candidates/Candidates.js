import React from 'react';
import Card from '../common/Card';

const Candidates = (props) => {
	console.log('props for Candidates', props);
  const candidates = props.candidates;
  document.title = "Local Majority | Candidates";
  return (
    <div className="Candidates flex">
    	{candidates.map((candidate, i) => (
	    	<Card
	    		key={i}
	    		title={candidate.title}
	    		subtitle={candidate.district}
	    		text={candidate.summary}
	    		imgSrc={candidate.imgSrc}
	    		category="candidates"
	    		id={candidate.id}
	    		imgShape="square"
	    	/>
    	))}
    </div>
  );
};

export default Candidates;
