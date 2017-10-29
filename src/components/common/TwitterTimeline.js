import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './TwitterTimeline.css';

const TwitterTimeline = props => {
  const twitterHandle = props.twitterHandle;
  return (
    <div className="TwitterTimeline">
			<Timeline
			  dataSource={{
			    sourceType: 'profile',
			    screenName: twitterHandle
			  }}
			  options={{
			    height: '500',
			  }}
			/>
    </div>
  );
};

export default TwitterTimeline;

      // <p>Twitter Timeline will go here</p>
// <div className="mask"></div>
