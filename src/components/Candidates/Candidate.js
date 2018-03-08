import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import Primer from '../common/Primers/Primer';
import Aux from '../common/Aux';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import NoSuchCandidate from './NoSuchCandidate';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';
import CandidateAside from './CandidateAside';
import { prettifyDate } from '../../utils/functions';
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

  componentDidUpdate(prevProps, prevState) {
    console.log('this.props', this.props);
    let now = new Date().getTime();
    // only update if no candidateDetail information or if the timestamp for it is more than a day old
    if (
      !this.props.candidateDetail ||
      now - this.props.candidateDetail.timestamp > 1000 * 60 * 60 * 24
    ) {
      // only update if props have changed and if CandidateDetailBySlug just changed from loading to resolved
      if (
        prevProps !== this.props &&
        prevProps.CandidateDetailBySlug &&
        !this.props.CandidateDetailBySlug.loading
      ) {
        let details = { ...this.props.CandidateDetailBySlug.Candidate };
        details.timestamp = now;
        this.props.updateStateDetail(
          'candidatesDetails',
          this.props.candidate.slug,
          details
        );
      }
    }
  }

  render() {
    const isLoading = this.props.CandidateDetailBySlug.loading;
    console.log('this.props.CandidateDetailBySlug', this.props.CandidateDetailBySlug);
    if (isLoading) {
      return <Loading />;
    }

    const isOffline =
      this.props.CandidateDetailBySlug.error &&
      this.props.CandidateDetailBySlug.error.message.indexOf('Network error') > -1
        ? true
        : false;

    const candidate = this.props.candidateDetail
      ? this.props.candidateDetail
      : this.props.candidate;

    if (!candidate) {
      return <NoSuchCandidate candidateId={this.props.match.params.slug} />;
    }
    return (
      <div className="Candidate">
        {isOffline && <Offline timestamp={candidate.timestamp} />}
        <article>
          <div className="row">
            <div className="col-12 col-md-6 lg-4 xl-3">
              <img
                src={candidate.headshotId.url}
                className="img-fluid"
                alt={candidate.title}
              />
            </div>
            <div className="col-12 col-md-6 lg-8 xl-9 text-right">
              <h2>{candidate.title}</h2>
              <h3>
                {candidate.contestId && candidate.contestId.seatId
                  ? candidate.contestId.seatId.title
                  : 'no district data'}
                {candidate.contestId && candidate.contestId.electionDate
                  ? ` on ${prettifyDate(candidate.contestId.electionDate)}`
                  : null}
              </h3>
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
                      <Primer primer={primer} i={i} key={i} />
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

export default compose(
  graphql(graphQLAPI.queries.CandidateDetailBySlug, {
    name: 'CandidateDetailBySlug',
    options: props => {
      return { variables: { slug: props.match.params.slug } };
    },
  })
)(Candidate);
