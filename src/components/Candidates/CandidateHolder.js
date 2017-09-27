import React from 'react';
import Candidate from './Candidate';
import NoSuchCandidate from './NoSuchCandidate';

const CandidateHolder = (props) => {
	const candidate = props.candidate;
  if (candidate) {
    document.title = `Local Majority | ${candidate.title}`;
  } else {
    document.title = "Local Majority | Unrecognized Candidate";
  }
  return (
    <div className="CandidateHolder">
    	{ candidate ? (
    			<Candidate candidateId={props.match.params.id} candidate={candidate} {...props} />
    		) : (
    			<NoSuchCandidate candidateId={props.match.params.id} />
    		)}
    </div>
  );
};

export default CandidateHolder;
