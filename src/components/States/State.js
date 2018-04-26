import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import { Link } from 'react-router-dom';
import ArticleCard from '../common/Cards/ArticleCard';
import BasicCard from '../common/Cards/BasicCard';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import Primer from '../common/Primers/Primer';
import { getMostRecentUpdateTimestamp } from '../../utils/functions';
import loremIpsum from '../../data/loremIpsum';

class State extends Component {

  componentDidMount() {
    this.props.match.params.slug
      ? (document.title = `Local Majority | States | ${
          this.props.match.params.slug
        }`)
      : (document.title = 'Local Majority | States');
  }

  componentDidUpdate(prevProps, prevState) {
    // only consider updating localStorage if query is resolved and successful
    if (this.props.StateDetailBySlug.State) {
      const mostRecentUpdateToStateDetailBySlug = getMostRecentUpdateTimestamp(
        this.props.StateDetailBySlug.State
      );
      // only update localStorage if no seatDetail (freeze-dried record passed to component by App) or if the timestamp for SeatDetailBySlug (grapql query) includes data newer than timestamp in seatDetail(freeze-dried record)
      if (
        !this.props.stateDetail ||
        this.props.stateDetail.timestamp < mostRecentUpdateToStateDetailBySlug
      ) {
        let now = new Date().getTime();
        let details = { ...this.props.StateDetailBySlug.State };
        details.timestamp = now;
        this.props.updateStateDetail(
          'statesDetails',
          this.props.match.params.slug,
          details
        );
      }
    }
  }

  render(){
    const { candidates, articles } = this.props;
    const state = this.props.stateDetail
      ? this.props.stateDetail
      : this.props.state;

    const formatLoremIpsum = (p, i) => {
      if (p.format === 'title') {
        return <h3 key={i}>{p.content}</h3>;
      } else if (p.format === 'subtitle') {
        return <h4 key={i}><i>{p.content}</i></h4>;
      }
      return <p key={i}>{p.content}</p>;
    };
    return (
      <section className="State">
        <div className="container">
          <div className="row">
            <h2 className="text-center col-12">
              {state.title}
            </h2>
            {state.content ? (
              <Primer primer={state} />
            ) : (
              loremIpsum.map((p, i) => formatLoremIpsum(p, i))
            )}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <h2 className="text-center col-12">
              Our Latest {state.title} Research <span className="tertiary-text-color">Reports</span>
            </h2>
            <p className="text-center">
              See <Link to="/reports">here</Link> for our latest in-depth research reports supporting progressive state district campaigns.
            </p>
            {articles && articles.length && articles.slice(0, 3).map(article => {
              let cardTags = article && article.tags ? article.tags : [];
              let articleThumbnail = article.thumbnail
                ? article.thumbnail
                : 'https://placekitten.com/200/150';

              return (
                <GridXSmallIsOneSmallIsThree key={article.slug}>
                  <ArticleCard
                    slug={article.slug}
                    imageSrc={articleThumbnail}
                    title={article.title}
                    author={article.author}
                    updatedAt={article.updatedAt}
                    tagRoute="reports"
                    tags={cardTags}
                  />
                </GridXSmallIsOneSmallIsThree>
              );
            })}

          </div>
        </div>
        <div className="container">
          <div className="row">
            <h2 className="text-center col-12">
              Our {state.title} <span className="tertiary-text-color">Candidates</span>
            </h2>
            <p className="text-center">We are supporting candidates where we can make a big difference and help flip seats blue in State Houses and Senates.</p>
          </div>
          {candidates && candidates.map((candidate, i) => {
            const headshotUrl =
              candidate.headshotId && candidate.headshotId.url
                ? candidate.headshotId.url
                : null;
            const seatTitle =
              candidate &&
              candidate.contestId &&
              candidate.contestId.seatId &&
              candidate.contestId.seatId.title
                ? candidate.contestId.seatId.title
                : null;

            return (
              <GridXSmallIsOneSmallIsThree key={i}>
                <BasicCard
                  title={candidate.title}
                  subtitle={seatTitle}
                  route={`candidates/${candidate.state.title}`}
                  slug={candidate.slug}
                  imageSrc={headshotUrl}
                />
              </GridXSmallIsOneSmallIsThree>
            );
          })}
        </div>
      </section>
    )
  }
}

export default compose(
  graphql(graphQLAPI.queries.StateDetailBySlug, {
    name: 'StateDetailBySlug',
    options: props => {
      let slug = props.match.params.slug.toLowerCase();
      return { variables: { slug } }
    }
  })
)(State);
