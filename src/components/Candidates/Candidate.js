import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { SocialIcon } from 'react-social-icons';
import graphQLAPI from '../../api/graphQLAPI';
import { strToSlug } from '../../utils/functions';
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
    console.log('this.props from Candidate', this.props);
    if (this.props.CandidateDetailBySlug.candidates) {
      const mostRecentUpdateToCandidateDetailBySlug = getMostRecentUpdateTimestamp(
        this.props.CandidateDetailBySlug.candidates[0]
      );
      // only update localStorage if no candidateDetail (freeze-dried record passed to component by App) or if the timestamp for CandidateDetailBySlug (grapql query) includes data newer than timestamp in candidateDetail(freeze-dried record)
      if (
        !this.props.candidateDetail ||
        this.props.candidateDetail.timestamp <
          mostRecentUpdateToCandidateDetailBySlug
      ) {
        let now = new Date().getTime();
        let details = this.props.CandidateDetailBySlug.candidates.map(
          candidate => {
            const stateData = { ...candidate.state };
            const imageSm =
              candidate.imageSm && candidate.imageSm.url
                ? candidate.imageSm.url
                : null;
            const imageMap =
              candidate.imageMap && candidate.imageMap.url
                ? candidate.imageMap.url
                : null;
            const imageMapInState =
              candidate.imageMapInState && candidate.imageMapInState.url
                ? candidate.imageMapInState.url
                : null;
            const seatLongTitle =
              candidate && candidate.office && candidate.office.title
                ? candidate.office.title
                : null;
            const chamberName =
              candidate.office &&
              candidate.office.chamber &&
              candidate.office.chamber.name
                ? candidate.office.chamber.name
                : null;
            const electionDate =
              candidate.office &&
              candidate.office.elections &&
              candidate.office.elections[0] &&
              candidate.office.elections[0].electionDate
                ? candidate.office.elections[0].electionDate
                : null;
            const seatShortTitle =
              candidate.office &&
              candidate.office.elections &&
              candidate.office.elections[0] &&
              candidate.office.elections[0].title
                ? candidate.office.elections[0].title
                : null;
            const party =
              candidate.party && candidate.party.title
                ? candidate.party.title
                : null;

            stateData.slug = strToSlug(stateData.title);
            return {
              title: candidate.title,
              firstName: candidate.firstName,
              lastName: candidate.lastName,
              slug: candidate.slug,
              summary_html: candidate.summary_html,
              bio_html: candidate.bio_html,
              homepageUrl: candidate.homepageUrl,
              donateUrl: candidate.donateUrl,
              volunteerUrl: candidate.volunteerUrl,
              campaignEmail: candidate.campaignEmail,
              lmEndorsed: candidate.lmEndorsed,
              twitter: candidate.twitter,
              facebook: candidate.facebook,
              tags: candidate.tags,
              state: stateData,
              imageSm,
              imageMap,
              imageMapInState,
              seatShortTitle,
              seatLongTitle,
              chamberName,
              electionDate,
              party,
            };
            // return { ...candidate, state: stateData };
          }
        )[0];
        // let details = { ...this.props.CandidateDetailBySlug.Candidate };
        details.timestamp = now;
        console.log('details', details);
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
    // (shouldn't be called if clicking on candidate on page, but if directly typing in url or following faulty link this will redirect to the default page)
    if (!candidate) {
      return this.props.history.push(
        `/candidates/${this.props.match.params.state}`
      );
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
    console.log('all data from props', this.props);
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
                imageSrc={candidate.imageSm}
                imageAlt={candidate.title}
              />
            </div>
            <div className="hidden-xs-down hidden-xl-up col-sm-4 col-md-2 col-lg-2">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={candidate.imageMap}
                imageAlt={`${candidate.title}'s district map`}
              />
              <ImageWithBackgroundPlaceholderImage
                imageSrc={candidate.imageMapInState}
                imageAlt={`location of ${candidate.title}'s district within ${
                  candidate.state.title
                }`}
              />
            </div>

            <div className="hidden-lg-down col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={candidate.imageMap}
                imageAlt={`${candidate.title}'s district map`}
              />
            </div>
            <div className="hidden-lg-down col-xl-3">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={candidate.imageMapInState}
                imageAlt={`location of ${candidate.title}'s district within ${
                  candidate.state.title
                }`}
              />
            </div>

            <div className="hidden-sm-up col-12">
              <div className="row">
                <div className="col-6">
                  <ImageWithBackgroundPlaceholderImage
                    imageSrc={candidate.imageMap}
                    imageAlt={`${candidate.title}'s district map`}
                  />
                </div>
                <div className="col-6">
                  <ImageWithBackgroundPlaceholderImage
                    imageSrc={candidate.imageMapInState}
                    imageAlt={`location of ${
                      candidate.title
                    }'s district within ${candidate.state.title}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-3 text-right">
              <h2>{candidate.title}</h2>
              <h3>
                {candidate.seatShortTitle
                  ? candidate.seatShortTitle
                  : 'No District Data Available'}
                {candidate.electionDate
                  ? ` on ${prettifyDate(candidate.electionDate)}`
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
              {candidate.volunteerUrl && (
                <div className="hidden-sm-down">
                  <CandidateDonateButton candidate={candidate.volunteerUrl} />
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
                {candidate.summary_html && (
                  <Aux>
                    <h3>Summary</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: candidate.summary_html,
                      }}
                    />
                  </Aux>
                )}
                {candidate.bio_html && (
                  <Aux>
                    <h3>About {candidate.firstName}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: candidate.bio_html }}
                    />
                  </Aux>
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

// {candidate.primers && (
//   <Aux>
//     {candidate.primers.map((primer, i) => (
//       <Primer primer={primer} i={i} key={i} />
//     ))}
//   </Aux>
// )}
// {seatPrimer && (
//   <div>
//     {!this.state.showDistrictDetail && (
//       <h2
//         className="tertiary-text-color"
//         onClick={this.showDistrictDetail}
//       >
//         &raquo; Learn More About the District
//       </h2>
//     )}

//     {this.state.showDistrictDetail && (
//       <Aux>
//         <h2
//           className="tertiary-text-color"
//           onClick={this.hideDistrictDetail}
//         >
//           <span
//             className={
//               this.state.hidingDistrictDetail
//                 ? 'rotate90to0'
//                 : 'rotate0to90'
//             }
//           >
//             &raquo;
//           </span>
//           &nbsp;About the District
//         </h2>
//         <div
//           className={
//             this.state.hidingDistrictDetail
//               ? 'slow-removal'
//               : 'slow-reveal'
//           }
//         >
//           <Primer primer={seatPrimer} />
//         </div>
//       </Aux>
//     )}
//   </div>
// )}
// {seatPrimer && (
//   <div>
//     {!this.state.showOpponentDetail && (
//       <h2
//         className="tertiary-text-color"
//         onClick={this.showOpponentDetail}
//       >
//         &raquo; Learn More About why We Must Defeat{' '}
//         {candidate.firstName}'s Opponent
//       </h2>
//     )}

//     {this.state.showOpponentDetail && (
//       <Aux>
//         <h2
//           className="tertiary-text-color"
//           onClick={this.hideOpponentDetail}
//         >
//           <span
//             className={
//               this.state.hidingOpponentDetail
//                 ? 'rotate90to0'
//                 : 'rotate0to90'
//             }
//           >
//             &raquo;
//           </span>
//           &nbsp;About {candidate.firstName}'s Opponent
//         </h2>
//         <div
//           className={
//             this.state.hidingOpponentDetail
//               ? 'slow-removal'
//               : 'slow-reveal'
//           }
//         >
//           {candidate &&
//           candidate.opponent &&
//           candidate.opponent.opponentPrimer ? (
//             <Primer
//               primer={candidate.opponent.opponentPrimer}
//             />
//           ) : (
//             <Aux>
//               <h2>Need data about the opponent HERE</h2>
//               <p>Oh, data, where art thou?</p>
//               <p>Go, database, go. </p>
//             </Aux>
//           )}
//         </div>
//       </Aux>
//     )}
//   </div>
// )}
