import React from 'react';
import { Link } from 'react-router-dom';
// import './NoSuchCandidate.css';

const NoSuchCandidate = ({ candidateId }) => {
  return (
    <div className="NoSuchCandidate">
      <h2>Error fetching Candidate {candidateId}</h2>
      <Link to="/candidates">Return to List of Candidates</Link>
    </div>
  );
};

export default NoSuchCandidate;
