import React from 'react';
import '../common/Aside.css';
import TwitterTimeline from '../common/TwitterTimeline';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';

const CandidateAside = props => {
  console.log('props from Aside', props);
  const candidate = props.candidate;
  const twitterHandles = props.twitterHandles;
  return (
    <aside id="Aside">
      <div className="row">
        <div className="col-12">
          {candidate.twitter && (
            <TwitterTimeline twitterHandle={[candidate.twitter]} />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Contact the Candidate</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {candidate.twitter && (
            <SocialIcon url={`https://twitter.com/${candidate.twitter}`} />
          )}
          {candidate.facebook && (
            <SocialIcon
              url={`https://www.facebook.com/${candidate.facebook}`}
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
      {candidate.homepageUrl && (
        <div className="row">
          <div className="col-12">
            <CandidateWebsiteButton candidate={props.candidate} />
          </div>
        </div>
      )}
      {candidate.donateUrl && (
        <div className="row">
          <div className="col-12">
            <CandidateDonateButton candidate={props.candidate} />
          </div>
        </div>
      )}
    </aside>
  );
};

export default CandidateAside;
