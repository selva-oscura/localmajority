import React from 'react';
import Candidate from './Candidate';
import NoSuchCandidate from './NoSuchCandidate';

const CandidateHolder = props => {
  console.log('props from CandidateHolder', props.match.params, props.params);
  const { candidate } = props;
  if (candidate) {
    document.title = `Local Majority | ${candidate.title}`;
  } else {
    document.title = 'Local Majority | Unrecognized Candidate';
  }
  return (
    <div className="CandidateHolder">
      {candidate ? (
        <Candidate
          candidateId={props.match.params.slug}
          candidate={candidate}
          {...props}
        />
      ) : (
        <NoSuchCandidate candidateId={props.match.params.slug} />
      )}
    </div>
  );
};

export default CandidateHolder;
