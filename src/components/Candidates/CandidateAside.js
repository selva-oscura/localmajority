import React from 'react';
import '../common/Aside.css';
import TwitterTimeline from '../common/TwitterTimeline';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';

const CandidateAside = props => {
  const candidate = props.candidate;
  return (
    <aside id="Aside">
      <div className="row">
        <div className="col-12 col-sm-6">
          {candidate.twitter && (
            <TwitterTimeline twitterHandle={candidate.twitter} />
          )}
        </div>
        <div className="col-12 col-sm-6 text-right">
          <h3>Contact the Candidate</h3>
          <div className="social-icons-space">
            {candidate.facebook && (
              <SocialIcon
                url={`https://www.facebook.com/${candidate.facebook}`}
              />
            )}
            {candidate.twitter && (
              <SocialIcon url={`https://twitter.com/${candidate.twitter}`} />
            )}
            {candidate.campaignEmail && (
              <SocialIcon
                url={`mailto:${candidate.campaignEmail}`}
                network="email"
                color="#E4002D"
              />
            )}
          </div>
          {candidate.homepageUrl && (
            <CandidateWebsiteButton candidate={props.candidate} />
          )}
          {candidate.donateUrl && (
            <CandidateDonateButton candidate={props.candidate} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default CandidateAside;
