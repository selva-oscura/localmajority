import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import Primer from '../common/Primers/Primer';
import Aux from '../common/Aux';
import ImageWithBackgroundPlaceholderImage from '../common/ImageWithBackgroundPlaceholderImage';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import NoSuchCandidate from './NoSuchCandidate';
import { SocialIcon } from 'react-social-icons';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';
import CandidateAside from './CandidateAside';
import {
  prettifyDate,
  getMostRecentUpdateTimestamp,
} from '../../utils/functions';
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
    // only consider updating localStorage if query is resolved and successful
    if (this.props.CandidateDetailBySlug.Candidate) {
      const mostRecentUpdateToCandidateDetailBySlug = getMostRecentUpdateTimestamp(
        this.props.CandidateDetailBySlug.Candidate
      );
      // only update localStorage if no candidateDetail (freeze-dried record passed to component by App) or if the timestamp for CandidateDetailBySlug (grapql query) includes data newer than timestamp in candidateDetail(freeze-dried record)
      if (
        !this.props.candidateDetail ||
        this.props.candidateDetail.timestamp <
          mostRecentUpdateToCandidateDetailBySlug
      ) {
        let now = new Date().getTime();
        let details = { ...this.props.CandidateDetailBySlug.Candidate };
        details.timestamp = now;
        this.props.updateStateDetail(
          'candidatesDetails',
          this.props.match.params.slug,
          details
        );
      }
    }
  }

  render() {
    const isLoading = this.props.CandidateDetailBySlug.loading;

    if (isLoading) {
      return <Loading />;
    }

    const isOffline =
      this.props.CandidateDetailBySlug.error &&
      this.props.CandidateDetailBySlug.error.message.indexOf('Network error') >
        -1
        ? true
        : false;

    const candidate = this.props.candidateDetail
      ? this.props.candidateDetail
      : this.props.candidate;

    if (!candidate) {
      return <NoSuchCandidate candidateId={this.props.match.params.slug} />;
    }

    const candidateHeadshot =
      candidate.headshotId && candidate.headshotId.url
        ? candidate.headshotId.url
        : null;
    const districtTitle =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.title
        ? candidate.contestId.seatId.title
        : 'No District Data Available';
    const districtImg =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.seatImg &&
      candidate.contestId.seatId.seatImg.url
        ? candidate.contestId.seatId.seatImg.url
        : 'Need image of district';
    const districtInStateImg =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.seatInStateImg &&
      candidate.contestId.seatId.seatInStateImg.url
        ? candidate.contestId.seatId.seatInStateImg.url
        : 'Need image of district in state';

    const electionDate =
      candidate.contestId && candidate.contestId.electionDate
        ? prettifyDate(candidate.contestId.electionDate)
        : null;

    return (
      <div className="Candidate">
        {isOffline && <Offline timestamp={candidate.timestamp} />}
        <article>
          <div className="row">
            <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageURL={candidateHeadshot}
                imageAlt={candidate.title}
              />
            </div>
            <div
              className="hidden-xs-down hidden-xl-up col-sm-4 col-md-2 col-lg-2"
            >
              <ImageWithBackgroundPlaceholderImage
                imageURL={districtImg}
                imageAlt={`${candidate.title}'s district map`}
              />
              <ImageWithBackgroundPlaceholderImage
                imageURL={districtInStateImg}
                imageAlt={`location of ${candidate.title}'s district within ${
                    candidate.state.title}`}
              />
            </div>

            <div className="hidden-lg-down col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageURL={districtImg}
                imageAlt={`${candidate.title}'s district map`}
              />
            </div>
            <div className="hidden-lg-down col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageURL={districtInStateImg}
                imageAlt={`location of ${candidate.title}'s district within ${
                    candidate.state.title}`}
              />
            </div>

            <div className="hidden-sm-up col-12">
              <div className="row">
                <div className="col-6">
                  <ImageWithBackgroundPlaceholderImage
                    imageURL={districtImg}
                    imageAlt={`${candidate.title}'s district map`}
                  />
                </div>
                <div className="col-6">
                  <ImageWithBackgroundPlaceholderImage
                    imageURL={districtInStateImg}
                    imageAlt={`location of ${candidate.title}'s district within ${
                        candidate.state.title}`}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 col-xl-3 text-right">
              <h2>{candidate.title}</h2>
              <h3>
                {districtTitle ? districtTitle : 'No District Data Available'}
                {electionDate ? ` on ${electionDate}` : null}
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
          <div className="row">
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
