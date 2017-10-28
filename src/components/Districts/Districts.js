import React from 'react';
// import districts from '../../data/districts.json';
import Card from '../common/Card';

const Districts = props => {
  const seats = props.seats;
  console.log('props for Districts', props);
  document.title = 'Local Majority | Districts';
  //  console.log('districts', districts);
  return (
    <div className="Districts flex">
      {seats.map((seat, i) => (
        <Card
          key={i}
          id={seat.uid}
          cardTitle={seat.title}
          cardText="need to add once we have data"
          imgSrc="need to add once we have data"
          category="districts"
          friendlyId={seat.friendlyId}
          imgShape="square"
        />
      ))}
    </div>
  );
};

export default Districts;
