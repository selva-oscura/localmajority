import React from 'react';
import Card from '../common/Card';

const Candidates = props => {
  console.log('props for Candidates', props);
  const candidates = props.candidates;
  document.title = 'Local Majority | Candidates';
  return (
    <div className="Candidates flex">
      {candidates.length ? (
        candidates.map((candidate, i) => {
          return (
            <Card
              key={i}
              id={candidate.id}
              cardTitle={candidate.title}
              cardSubtitle={candidate.district}
              cardText="need short text?"
              category="candidates"
              imgSrc={candidate.headshotSm}
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
