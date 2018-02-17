import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const CandidateDonateButton = ({ candidate }) => {
  const style = { margin: '2vw 0'};
  const donate = candidate.firstName
    ? `Donate to ${candidate.firstName}`
    : 'Donate';
  return (
    <RaisedButton
      primary={true}
      label={donate}
      href={candidate.donateUrl}
      style={style}
      target="donate"
    />
  );
};

export default CandidateDonateButton;
