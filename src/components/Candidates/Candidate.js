import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { SocialIcon } from 'react-social-icons';
import graphQLAPI from '../../api/graphQLAPI';
import CandidateDonateButton from './CandidateDonateButton';
import CandidateWebsiteButton from './CandidateWebsiteButton';
import CandidateAside from './CandidateAside';
import Aux from '../common/Aux';
import ImageWithBackgroundPlaceholderImage from '../common/ImageWithBackgroundPlaceholderImage';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import Primer from '../common/Primers/Primer';
import Section from '../common/Section/Section';
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
    this.state = {
      showDistrictDetail: false,
      hidingDistrictDetail: false,
      showOpponentDetail: false,
      hidingOpponentDetail: false,
    };
    this.showDistrictDetail = this.showDistrictDetail.bind(this);
    this.hideDistrictDetail = this.hideDistrictDetail.bind(this);
    this.showOpponentDetail = this.showOpponentDetail.bind(this);
    this.hideOpponentDetail = this.hideOpponentDetail.bind(this);

  }

  showDistrictDetail() {
    this.setState({ showDistrictDetail: true });
  }
  hideDistrictDetail() {
    this.setState({ hidingDistrictDetail: true });
    setTimeout(() => {
      this.setState({ showDistrictDetail: false, hidingDistrictDetail: false });
    }, 500);
  }

  showOpponentDetail() {
    this.setState({ showOpponentDetail: true });
  }
  hideOpponentDetail() {
    this.setState({ hidingOpponentDetail: true });
    setTimeout(() => {
      this.setState({ showOpponentDetail: false, hidingOpponentDetail: false });
    }, 500);
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

  componentDidMount() {
    const candidate = this.props.candidateDetail
      ? this.props.candidateDetail
      : this.props.candidate;

    // redirect to /candidates/:state if /candidates/:state/:slug is not a candidate for which we have information
    // (shouldn't be called if clicking on candidate on page, but if directly typing in url or following faulty link this will redirect to the default page)\
    if (!candidate) {
      return this.props.history.push(`/candidates/${this.props.match.params.state}`);
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

    const candidateHeadshot =
      candidate.headshotId && candidate.headshotId.url
        ? candidate.headshotId.url
        : null;
    const stateName =
      candidate.state && candidate.state.title
        ? candidate.state.title
        : 'State Name Missing';
    const seatTitle =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.title
        ? candidate.contestId.seatId.title
        : 'No District Data Available';
    const seatMap =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.seatImg &&
      candidate.contestId.seatId.seatImg.url
        ? candidate.contestId.seatId.seatImg.url
        : 'Need image of district';
    const seatInStateMap =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.seatInStateImg &&
      candidate.contestId.seatId.seatInStateImg.url
        ? candidate.contestId.seatId.seatInStateImg.url
        : 'Need image of district in state';
    const seatPrimer =
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.primers &&
      candidate.contestId.seatId.primers.length
        ? candidate.contestId.seatId.primers[0]
        : null;
    const electionDate =
      candidate.contestId && candidate.contestId.electionDate
        ? prettifyDate(candidate.contestId.electionDate)
        : null;
    console.log('all data from CandidateDetail', candidate);

    return (
      <article className="Candidate">
        {isOffline && <Offline timestamp={candidate.timestamp} />}
        <Section
          hasContainer={true}
          spacingAbove={0}
          spacingBelow={3}
          background=""
        >
          <div className="row">
            <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={candidateHeadshot}
                imageAlt={candidate.title}
              />
            </div>
            <div className="hidden-xs-down hidden-xl-up col-sm-4 col-md-2 col-lg-2">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={seatMap}
                imageAlt={`${candidate.title}'s district map`}
              />
              <ImageWithBackgroundPlaceholderImage
                imageSrc={seatInStateMap}
                imageAlt={`location of ${candidate.title}'s district within ${
                  stateName
                }`}
              />
            </div>

            <div className="hidden-lg-down col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={seatMap}
                imageAlt={`${candidate.title}'s district map`}
              />
            </div>
            <div className="hidden-lg-down col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={seatInStateMap}
                imageAlt={`location of ${candidate.title}'s district within ${
                  stateName
                }`}
              />
            </div>

            <div className="hidden-sm-up col-12">
              <div className="row">
                <div className="col-6">
                  <ImageWithBackgroundPlaceholderImage
                    imageSrc={seatMap}
                    imageAlt={`${candidate.title}'s district map`}
                  />
                </div>
                <div className="col-6">
                  <ImageWithBackgroundPlaceholderImage
                    imageSrc={seatInStateMap}
                    imageAlt={`location of ${
                      candidate.title
                    }'s district within ${stateName}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-3 text-right">
              <h2>{candidate.title}</h2>
              <h3>
                {seatTitle ? seatTitle : 'No District Data Available'}
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
        </Section>
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background=""
        >
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-9">
              <div className="Main">
                <h2>{candidate.title}</h2>
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
                {seatPrimer && (
                  <div>
                    {!this.state.showDistrictDetail && (
                      <h2
                        className="tertiary-text-color"
                        onClick={this.showDistrictDetail}
                      >
                        &raquo; Learn More About the District
                      </h2>
                    )}

                    {this.state.showDistrictDetail && (
                      <Aux>
                        <h2
                          className="tertiary-text-color"
                          onClick={this.hideDistrictDetail}
                        >
                          <span
                            className={
                              this.state.hidingDistrictDetail
                                ? 'rotate90to0'
                                : 'rotate0to90'
                            }
                          >
                            &raquo;
                          </span>
                          &nbsp;About the District
                        </h2>
                        <div
                          className={
                            this.state.hidingDistrictDetail
                              ? 'slow-removal'
                              : 'slow-reveal'
                          }
                        >
                          <Primer primer={seatPrimer} />
                        </div>
                      </Aux>
                    )}
                  </div>
                )}
                {seatPrimer && (
                  <div>
                    {!this.state.showOpponentDetail && (
                      <h2
                        className="tertiary-text-color"
                        onClick={this.showOpponentDetail}
                      >
                        &raquo; Learn More About why We Must Defeat {candidate.firstName}'s Opponent
                      </h2>
                    )}

                    {this.state.showOpponentDetail && (
                      <Aux>
                        <h2
                          className="tertiary-text-color"
                          onClick={this.hideOpponentDetail}
                        >
                          <span
                            className={
                              this.state.hidingOpponentDetail
                                ? 'rotate90to0'
                                : 'rotate0to90'
                            }
                          >
                            &raquo;
                          </span>
                          &nbsp;About {candidate.firstName}'s Opponent
                        </h2>
                        <div
                          className={
                            this.state.hidingOpponentDetail
                              ? 'slow-removal'
                              : 'slow-reveal'
                          }
                        >
                          {
                            candidate && candidate.opponent && candidate.opponent.opponentPrimer
                              ? <Primer primer={candidate.opponent.opponentPrimer} />
                              : (<Aux>
                                  <h2>Need data about the opponent HERE</h2>
                                  <p>Oh, data, where art thou?</p>
                                  <p>Go, database, go.  </p>
                                </Aux>)
                          }
                        </div>
                      </Aux>
                    )}
                  </div>
                )}

              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-3">
              <CandidateAside candidate={candidate} />
            </div>
          </div>
        </Section>
      </article>
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
