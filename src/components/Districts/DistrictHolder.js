import React from 'react';
import District from './District';
import NoSuchDistrict from './NoSuchDistrict';

const DistrictHolder = props => {
  const { seat } = props;
  if (seat && seat.title) {
    document.title = `Local Majority | ${seat.title}`;
  } else {
    document.title = 'Local Majority | Unrecognized District';
  }
  return (
    <div className="DistrictHolder">
      {seat ? (
        <District seatId={props.match.params.id} seat={seat} {...props} />
      ) : (
        <NoSuchDistrict seatId={props.match.params.id} />
      )}
    </div>
  );
};

export default DistrictHolder;
