import React from 'react';
import Card from '../common/Card';

const Candidates = ({ candidates, statesMasterList, candidatesStatesSelected, candidateSeatTypesSelected, candidatesTextSelected }) => {
  document.title = 'Local Majority | Candidates';
  return (
    <div className="Candidates flex">
      {candidates.length ? (
        candidates.map((candidate, i) => {
          let headshotUrl;
          headshotUrl = candidate.headshotSmUrl
            ? candidate.headshotSmUrl
            : candidate.headshotLgUrl;
          return (
            <Card
              key={i}
              id={candidate.id}
              cardTitle={candidate.title}
              cardSubtitle={candidate.seatName}
              cardText={candidate.introLinkText}
              category="candidates"
              imgSrc={headshotUrl}
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
