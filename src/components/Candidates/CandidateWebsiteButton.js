import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const CandidateWebsiteButton = ({ candidate }) => {
  const style = { margin: '1vw 1vw 1vw 0' };
  const text = candidate.firstName
    ? `${candidate.firstName}'s Campaign Website`
    : 'Campaign Website';
  return (
    <RaisedButton
      primary={true}
      label={text}
      href={candidate.homepageUrl}
      style={style}
      target="campaign"
    />
  );
};

export default CandidateWebsiteButton;
