import React, { Component } from 'react';
import CandidateTalkingPoints from '../Readings/CandidateTalkingPoints';
import { SocialIcon } from 'react-social-icons';

import CandidateAside from './CandidateAside';
import './Candidate.css';

class Candidate extends Component {
  componentDidMount() {
    let { candidate } = this.props;
    let details = [
      'bioText',
    ]
    let candidateSpace = document.getElementById('candidate-space');
    details.forEach(detail => {
      if (candidate[detail]) {
        let d = document.createElement('div');
        d.id=detail
        d.innerHTML = candidate[detail];
        candidateSpace.appendChild(d);
      }
    });
  }
  render() {
    let { candidate, seat, candidateTP } = this.props;
    console.log('seat', seat);
    return (
      <div className="Candidate">
        <article>
          <div className="row">
            <div className="col-12 col-md-6 lg-4 xl-3">
              <img
                src={candidate.headshotSmUrl}
                className="img-fluid"
                alt={candidate.title}
              />
            </div>
            <div className="col-12 col-md-6 lg-8 xl-9">
              <h2>{candidate.title}</h2>
              <h3>{seat && seat.title ? seat.title : 'no district data'}</h3>
              <div>
                {candidate.twitterId && (
                  <SocialIcon url={`https://twitter.com/${candidate.twitterId}`} />
                )}
                {candidate.facebookId && (
                  <SocialIcon url={`https://www.facebook.com/${candidate.facebookId}`} />
                )}
                {candidate.campaignEmail && (
                  <SocialIcon
                    url={`mailto:${candidate.campaignEmail}`}
                    network="email"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="main-and-aside row">
            <div className="col-12 col-lg-8 col-xl-9">
              <div id="candidate-space" />
              <div className="Main">
                <div className="row">
                {candidate.introLinkText && <p>{candidate.introLinkText}</p>}
                {candidateTP && <CandidateTalkingPoints reading={candidateTP} />}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-3">
              <CandidateAside candidate={candidate} />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Candidate;


              //   <h2>Why this Race Matters</h2>
              //   <p>
              //     Lorem Ipsum is simply dummy text of the printing and
              //     typesetting industry. Lorem Ipsum has been the industry's
              //     standard dummy text ever since the 1500s, when an unknown
              //     printer took a galley of type and scrambled it to make a type
              //     specimen book. It has survived not only five centuries, but
              //     also the leap into electronic typesetting, remaining
              //     essentially unchanged. It was popularised in the 1960s with
              //     the release of Letraset sheets containing Lorem Ipsum
              //     passages, and more recently with desktop publishing software
              //     like Aldus PageMaker including versions of Lorem Ipsum
              //   </p>
              // </div>
              // <div className="row">
              //   <h2>Comparing Candidates</h2>
              //   <div className="half">
              //     <p>
              //       Lorem Ipsum is simply dummy text of the printing and
              //       typesetting industry. Lorem Ipsum has been the industry's
              //       standard dummy text ever since the 1500s, when an unknown
              //       printer took a galley of type and scrambled it to make a
              //       type specimen book. It has survived not only five centuries,
              //       but also the leap into electronic typesetting, remaining
              //       essentially unchanged. It was popularised in the 1960s with
              //       the release of Letraset sheets containing Lorem Ipsum
              //       passages, and more recently with desktop publishing software
              //       like Aldus PageMaker including versions of Lorem Ipsum
              //     </p>
              //   </div>
              //   <div className="half">
              //     <p>
              //       Lorem Ipsum is simply dummy text of the printing and
              //       typesetting industry. Lorem Ipsum has been the industry's
              //       standard dummy text ever since the 1500s, when an unknown
              //       printer took a galley of type and scrambled it to make a
              //       type specimen book. It has survived not only five centuries,
              //       but also the leap into electronic typesetting, remaining
              //       essentially unchanged. It was popularised in the 1960s with
              //       the release of Letraset sheets containing Lorem Ipsum
              //       passages, and more recently with desktop publishing software
              //       like Aldus PageMaker including versions of Lorem Ipsum
              //     </p>
              //   </div>
              // </div>
              // <div className="row">
              //   <h2>Why &amp; Why Not</h2>
              //   <p>
              //     Lorem Ipsum is simply dummy text of the printing and
              //     typesetting industry. Lorem Ipsum has been the industry's
              //     standard dummy text ever since the 1500s, when an unknown
              //     printer took a galley of type and scrambled it to make a type
              //     specimen book. It has survived not only five centuries, but
              //     also the leap into electronic typesetting, remaining
              //     essentially unchanged. It was popularised in the 1960s with
              //     the release of Letraset sheets containing Lorem Ipsum
              //     passages, and more recently with desktop publishing software
              //     like Aldus PageMaker including versions of Lorem Ipsum
              //   </p>
