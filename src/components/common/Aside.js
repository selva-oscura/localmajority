import React from 'react';
import './Aside.css';
import TwitterTimeline from './TwitterTimeline';

const Aside = props => {
  console.log('props', props);
  const twitterHandles = props.twitterHandles;
  return (
    <aside id="Aside">
      {twitterHandles.map((twitterHandle, i) => (
        <TwitterTimeline key={i} twitterHandle={twitterHandle} />
      ))}
    </aside>
  );
};

export default Aside;
