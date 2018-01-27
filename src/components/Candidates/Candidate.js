import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import Aux from '../common/Aux';
import CandidateTalkingPoints from '../Readings/CandidateTalkingPoints';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';
import CandidateAside from './CandidateAside';
import './Candidate.css';



class Candidate extends Component {
  componentDidMount() {
  }
  standardizeDate(dateString) {
    return `${dateString.slice(5,7)}/${dateString.slice(8,10)}/${dateString.slice(0,4)}`;
  }
  componentDidUpdate(){
    console.log('updated and at this point, the data looks like this: this.props.candidate', this.props.candidate, 'and this.props.CandidateDetail', this.props.CandidateDetail && this.props.CandidateDetail.Candidate);
  }
  render() {
    let candidate = this.props.CandidateDetail.Candidate
      ? this.props.CandidateDetail.Candidate 
      : this.props.candidate;
    return (
      <div className="Candidate">
        <article>
          <div className="row">
            <div className="col-12 col-md-6 lg-4 xl-3">
              <img
                src={candidate.headshotId.url}
                className="img-fluid"
                alt={candidate.title}
              />
            </div>
            <div className="col-12 col-md-6 lg-8 xl-9">
              <h2>{candidate.title}</h2>
              <h3>
                { candidate.contestId && candidate.contestId.seatId ? candidate.contestId.seatId.title : 'no district data' }
                { candidate.contestId && candidate.contestId.electionDate ? ` on ${this.standardizeDate(candidate.contestId.electionDate)}` : null }
              </h3>
              <div>
                {candidate.twitter && (
                  <SocialIcon
                    url={`https://twitter.com/${candidate.twitter}`}
                  />
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
              {candidate.homepageUrl && (
                <div className="hidden-sm-down">
                  <CandidateWebsiteButton candidate={candidate} />
                </div>
              )}
              {candidate.donateUrl && (
                <div className="hidden-sm-down">
                  <CandidateDonateButton candidate={candidate} />
                </div>
              )}
            </div>
          </div>
          <div className="main-and-aside row">
            <div className="col-12 col-lg-8 col-xl-9">
              <div className="Main">
                { candidate.summaryText && 
                  <Aux>
                    <h3>Summary</h3>
                    <div dangerouslySetInnerHTML={{ __html: candidate.summaryText }} />
                  </Aux>
                }
                { candidate.bioText && 
                  <Aux>
                    <h3>About {candidate.firstName}</h3>
                    <div dangerouslySetInnerHTML={{ __html: candidate.bioText }} />
                  </Aux>
                }
                { candidate.primers && 
                  <Aux>
                    <h3>NOTE: data params rather than just the content are being shown here until we narrow down what should be shown on the page</h3>
                    {candidate.primers.map((primer, i) => (
                      <Aux key={`primer-${i}`}>
                        <h3>{primer.title}</h3>
                        { primer.sections.map((section, s) => (
                          <Aux key={`primer-${i}-section-${s}`}>
                            <h4>Section Tag from Section {i}:<br />{section.tag}</h4>
                            <h4>Section Body Heading from Section {i}:<br />{ section.body && section.body.heading ? section.body.heading : null}
                            </h4>
                            <h4>Section Body Label from Section {i}:<br />{ section.body && section.body.label ? section.body.label : null}
                            </h4>
                            <h4>Section Body Description from Section {i}:<br />{ section.body && section.body.description ? section.body.description : null}
                            </h4>
                            <h4>Section Body Text  from Section {i}</h4>
                            { section.body.text && <div dangerouslySetInnerHTML={{ __html: section.body.text }} /> }
                          </Aux>
                        ))}
                      </Aux>
                    ))}
                  </Aux>
                }
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
                  // {candidate.introLinkText && <p>{candidate.introLinkText}</p>}
                  // {candidateTP && (
                  //   <CandidateTalkingPoints reading={candidateTP} />
                  // )}

export default compose(
  graphql(graphQLAPI.queries.CandidateDetail, { name: 'CandidateDetail',
    options: (props) => {
      return { variables: { id: props.candidate.id } }
    }
  })
)(Candidate);


// export default compose(
//   graphql(graphQLAPI.queries.CandidatesBasics, { name: 'CandidatesBasics' }),
//   graphql(graphQLAPI.queries.SeatsBasics, { name: 'SeatsBasics' }),
//   graphql(graphQLAPI.queries.Parties, { name: 'Parties' }),
//   graphql(graphQLAPI.queries.States, { name: 'States' })
// )(App);


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
