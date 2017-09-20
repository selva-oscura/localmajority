import React from 'react';
import Candidate from './Candidate';
import NoSuchCandidate from './NoSuchCandidate';
import candidates from '../../data/candidates.json';
// import './CandidateHolder.css';
// console.log('candidates from CandidateHolder', candidates);

const CandidateHolder = (props) => {
	const validCandidate = (candidate) => (candidate.id === props.match.params.id);
	const candidate = candidates.filter(validCandidate);
  return (
    <div className="CandidateHolder">
    	{ candidate.length===0 && <NoSuchCandidate candidateId={props.match.params.id} />}
    	{ candidate.length===1 && <Candidate candidateId={props.match.params.id} candidate={candidate[0]} />}
    </div>
  );
};

export default CandidateHolder;
