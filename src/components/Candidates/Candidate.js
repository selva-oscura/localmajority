import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import Aux from '../common/Aux';
import Loading from '../common/Loading';
import NoSuchCandidate from './NoSuchCandidate';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';
import CandidateAside from './CandidateAside';
import { standardizeDate } from '../../utils/functions';
import './Candidate.css';

class Candidate extends Component {
  constructor(props, context) {
    super(props, context);
    const { candidate } = this.props;
    if (candidate) {
      document.title = `Local Majority | ${candidate.title}`;
    } else {
      document.title = 'Local Majority | Unrecognized Candidate';
    }
  }

  render() {

    const isLoading = this.props.CandidateDetailBySlug.loading;

    if(isLoading){
      return <Loading />
    }

    const candidate = this.props.CandidateDetailBySlug.Candidate
      ? this.props.CandidateDetailBySlug.Candidate
      : this.props.candidate;

    if(!candidate){
      return <NoSuchCandidate candidateId={this.props.match.params.slug} />;
    }
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
                {candidate.contestId && candidate.contestId.seatId
                  ? candidate.contestId.seatId.title
                  : 'no district data'}
                {candidate.contestId && candidate.contestId.electionDate
                  ? ` on ${standardizeDate(candidate.contestId.electionDate)}`
                  : null}
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
                {candidate.summaryText && (
                  <Aux>
                    <h3>Summary</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: candidate.summaryText,
                      }}
                    />
                  </Aux>
                )}
                {candidate.bioText && (
                  <Aux>
                    <h3>About {candidate.firstName}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: candidate.bioText }}
                    />
                  </Aux>
                )}
                {candidate.primers && (
                  <Aux>
                    {candidate.primers.map((primer, i) => (
                      <Aux key={`primer-${i}`}>
                        <h3>{primer.title}</h3>
                        {primer.sections.map((section, s) => {
                          const title = section.heading && section.heading.title 
                            ? section.heading.title
                            : null;
                          const body = section.body;
                          const btype = body && body.type;
                          if (!body && !title) { return null;}
                          return (
                            <Aux key={`primer-${i}-section-${s}`}>
                              <div className={section.tag} key={section.tag}>
                                { title && <div className="section-head" style={articleStyles.sectionHead}>{title}</div> }

                                { btype === 'RichText' &&
                                    <div className="section-body"  dangerouslySetInnerHTML={{__html: body.text}} /> }
                                { btype === 'Image' &&
                                    <img src={body.url} alt="alt text FIXME"/>  }
                                { btype === 'PlainText' &&
                                    <div className="section-body">{body.text}</div> }
                              </div>

                            </Aux>
                          )})}
                        </Aux>
                    ))}
                  </Aux>
                )}
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

const articleStyles = {
    title: {
    fontSize: "3em",
    fontWeight: 700
  },
  sectionHead: {
      fontSize: "2em",
      fontWeight: 400
  },
};

export default compose(
  graphql(graphQLAPI.queries.CandidateDetailBySlug, {
    name: 'CandidateDetailBySlug',
    options: props => {
      return { variables: { slug: props.match.params.slug } };
    },
  })
)(Candidate);
