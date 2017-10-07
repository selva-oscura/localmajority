import React from 'react';
import CandidateCard from './CandidateCard';

const Candidates = props => {
  console.log('props for Candidates', props);
  const candidates = props.candidates;
  document.title = 'Local Majority | Candidates';
  return (
    <div className="Candidates flex">
      {candidates.length ? (
        candidates.map((candidate, i) => {
          let headshot =
            candidate.headshotSm && candidate.headshotSm.url
              ? candidate.headshotSm.url
              : 'missing image';
          return (
            <CandidateCard
              key={i}
              title={candidate.title}
              imgSrc={headshot}
              category="candidates"
              friendlyId={candidate.friendlyId}
              imgShape="square"
            />
          );
        })
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default Candidates;
