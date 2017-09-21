import React from 'react';
import { Timeline } from 'react-twitter-widgets'

const TwitterTimeline = (props) => {
	const twitterHandle = props.twitterHandle;
	return (
		<Timeline
		  dataSource={{
		    sourceType: 'profile',
		    screenName: twitterHandle
		  }}
		  options={{
		    height: '500',
		  }}
		/>
	)
}

export default TwitterTimeline;
