import React from 'react';
import './HomeAside.css';
import TwitterTimeline from './TwitterTimeline';

const HomeAside = props => {
  const twitterHandles = props.twitterHandles;
  return (
    <aside id="HomeAside">
      {twitterHandles && twitterHandles.length
        ? twitterHandles.map((twitterHandle, i) => (
            <TwitterTimeline key={i} twitterHandle={twitterHandle} />
          ))
        : null}
    </aside>
  );
};

export default HomeAside;
