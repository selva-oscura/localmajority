import React from 'react';
// import districts from '../../data/districts.json';
import Card from '../common/Card';

const Districts = props => {
  const districts = props.districts;
  console.log('props for Districts', props);
  document.title = 'Local Majority | Districts';
  //  console.log('districts', districts);
  return (
    <div className="Districts flex">
      {districts.map((district, i) => (
        <Card
          key={i}
          id={district.id}
          cardTitle={district.title}
          cardText="need to add once we have data"
          imgSrc="need to add once we have data"
          category="districts"
          friendlyId="need to add once we have data"
          imgShape="landscape"
        />
      ))}
    </div>
  );
};

export default Districts;
