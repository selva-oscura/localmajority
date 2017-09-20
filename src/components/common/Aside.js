import React from 'react';
import TwitterTimeline from './TwitterTimeline';

const Aside = (props) => {
	console.log('props', props)
	const twitterHandles = props.twitterHandles;
	return (
		<aside>
			{
				twitterHandles.map((twitterHandle, i) => (
					<TwitterTimeline 
						key={i}
						twitterHandle={twitterHandle} 
					/>
				))
			}
		</aside>
	)
}

export default Aside;
