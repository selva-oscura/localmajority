import React, { Component } from 'react';
import CandidateTalkingPoints from '../Readings/CandidateTalkingPoints';
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
            <div className="brief-info">
              <h2>{candidate.title}</h2>
              <h3>{seat && seat.title ? seat.title : 'no district data'}</h3>
              {candidate.introLinkText && <p className="hidden-sm-down">{candidate.introLinkText}</p>}
            </div>
            <div className="headshot">
              <img src={candidate.headshotSm} alt={candidate.title} />
            </div>
            {candidate.introLinkText && <p className="hidden-md-up">{candidate.introLinkText}</p>}
            <div id="candidate-space" />
          </div>
          <div className="main-and-aside">
            <div className="Main">
              <div className="row">
              {candidateTP && <CandidateTalkingPoints reading={candidateTP} />}
              </div>
            </div>
            <CandidateAside candidate={candidate} />
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
