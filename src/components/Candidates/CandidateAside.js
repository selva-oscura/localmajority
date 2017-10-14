import React from 'react';
import '../common/Aside.css';
import TwitterTimeline from '../common/TwitterTimeline';
import { SocialIcon } from 'react-social-icons';
import RaisedButton from 'material-ui/RaisedButton';

const CandidateAside = props => {
  console.log('props from Aside', props);
  const candidate = props.candidate;
  const twitterHandles = props.twitterHandles;
  return (
    <aside id="Aside">
      <TwitterTimeline twitterHandle={[candidate.twitter]} />
      <h3>Contact the Candidate</h3>
      <div className="row">
        { candidate.twitter && <SocialIcon url={`https://twitter.com/${candidate.twitter}`} /> }
        { candidate.facebook && <SocialIcon url={`https://www.facebook.com/${candidate.facebook}`} /> }
        { candidate.campaignEmail && <SocialIcon url={`mailto:${candidate.campaignEmail}`} network="email" /> }
      </div>
      <div className="row">
        { candidate.donateUrl &&
          <RaisedButton
            secondary={true}
            label="Donate"
            href={candidate.donateUrl}
          >
          </RaisedButton>
        }
      </div>
    </aside>
  );
};

export default CandidateAside;
