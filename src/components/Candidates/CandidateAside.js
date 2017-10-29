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
      <div className="row">
        <div className="col-12">
          <TwitterTimeline twitterHandle={[candidate.twitterId]} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Contact the Candidate</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {candidate.twitterId && (
            <SocialIcon url={`https://twitter.com/${candidate.twitterId}`} />
          )}
          {candidate.facebookId && (
            <SocialIcon
              url={`https://www.facebook.com/${candidate.facebookId}`}
            />
          )}
          {candidate.campaignEmail && (
            <SocialIcon
              url={`mailto:${candidate.campaignEmail}`}
              network="email"
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {candidate.donateUrl && (
            <RaisedButton
              secondary={true}
              label="Donate"
              href={candidate.donateUrl}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default CandidateAside;
