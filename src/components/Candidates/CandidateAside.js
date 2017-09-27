import React from 'react';
import '../common/Aside.css';
import TwitterTimeline from '../common/TwitterTimeline';
import { SocialIcon } from 'react-social-icons';

const CandidateAside = (props) => {
	const candidate=props.candidate;
	console.log('props', props)
	const twitterHandles = props.twitterHandles;
	return (
		<aside id="Aside">
			<TwitterTimeline 
				twitterHandle={[candidate.twitter]}
			/>
			<h3>Contact the Candidate</h3>
			<div className="row">
				{
					candidate.twitter ? (
						<SocialIcon 
							url={`https://twitter.com/${candidate.twitter}`}
						/>
					) : (
						null
					)						
				}
				{
					candidate.facebook ? (
						<SocialIcon 
							url={`https://www.facebook.com/${candidate.facebook}`}
						/>
					) : (
						null
					)
				}
				{
					candidate.email ? (
						<SocialIcon
							url={`mailto:${candidate.email}`}
							network="email"
						/>
					) : (
						null
					)
				}

			</div>
			<h4>
				{candidate.address.street}<br />
				{candidate.address.city}, {candidate.address.state} {candidate.address.zip}
			</h4>
			{ 
				candidate.phone ? (
					<h4>{candidate.phone}</h4>
				) : (
					null
				)
			}
		</aside>
	)
}

export default CandidateAside;
