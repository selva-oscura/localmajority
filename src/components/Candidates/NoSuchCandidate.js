import React from 'react';
import { Link } from 'react-router-dom';
// import './NoSuchCandidate.css';

const NoSuchCandidate = ({candidateId}) => {
  return (
    <div className="NoSuchCandidate">
    	<h2>Candidate {candidateId} does not have a race this year</h2>
    	<Link to="/candidates">Return to List of Candidates</Link>
    </div>
  );
};

export default NoSuchCandidate;
