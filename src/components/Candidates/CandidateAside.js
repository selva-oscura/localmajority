import React from 'react';
import './CandidateAside.css';
import Aux from '../common/Aux';
import TwitterTimeline from '../common/TwitterTimeline';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';

const CandidateAside = props => {
  const candidate = props.candidate;
  const anyContactInfo =
    candidate.facebook ||
    candidate.twitter ||
    candidate.campaignEmail ||
    candidate.homepageUrl ||
    candidate.donateUrl
      ? true
      : false;
  return (
    <aside id="Aside">
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-12">
          {candidate.twitter && (
            <TwitterTimeline twitterHandle={candidate.twitter} />
          )}
        </div>
        <div className="col-12 col-sm-6 hidden-lg-up text-right">
          {anyContactInfo && (
            <Aux>
              <h3>Contact the Candidate</h3>
              <div className="social-icons-space">
                {candidate.facebook && (
                  <SocialIcon
                    url={`https://www.facebook.com/${candidate.facebook}`}
                  />
                )}
                {candidate.twitter && (
                  <SocialIcon
                    url={`https://twitter.com/${candidate.twitter}`}
                  />
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
            </Aux>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CandidateAside;
