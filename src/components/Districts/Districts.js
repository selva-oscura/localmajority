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
          title={district.title}
          text={district.summary}
          imgSrc={district.imgSrc}
          category="districts"
          id={district.title.slice('District '.length)}
          imgShape="landscape"
        />
      ))}
    </div>
  );
};

export default Districts;
