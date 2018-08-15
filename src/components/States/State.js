import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import ArticleCard from '../common/Cards/ArticleCard';
import BasicCard from '../common/Cards/BasicCard';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import Section from '../common/Section/Section';
import { getMostRecentUpdateTimestamp } from '../../utils/functions';
import loremIpsum from '../../data/loremIpsum';

class State extends Component {
  // redirect to /states if /states/:slug is not a state for which we have information
  // (shouldn't be called if picking state from selector on page, but if directly typing in url or following faulty link this will redirect to the default page)\
  componentDidMount() {
    // console.log('this.props for STATE!', this.props);
    const state = this.props.stateDetail
      ? this.props.stateDetail
      : this.props.state;

    if (!state) {
      return this.props.history.push('/states');
    }

    this.props.match.params.slug
      ? (document.title = `Local Majority | States | ${
          this.props.match.params.slug
        }`)
      : (document.title = 'Local Majority | States');
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('this.props for STATE from componentDidUpdate!', this.props);
    // only consider updating localStorage if query is resolved and successful
    if (this.props.StateDetailBySlug.states) {
      const mostRecentUpdateToStateDetailBySlug = getMostRecentUpdateTimestamp(
        this.props.StateDetailBySlug.states[0]
      );
      // only update localStorage if no seatDetail (freeze-dried record passed to component by App) or if the timestamp for SeatDetailBySlug (grapql query) includes data newer than timestamp in seatDetail(freeze-dried record)
      if (
        !this.props.stateDetail ||
        this.props.stateDetail.timestamp < mostRecentUpdateToStateDetailBySlug
      ) {
        const now = new Date().getTime();
        const details = this.props.StateDetailBySlug.states.map(state => {
          const imageHero =
            state.imageHero && state.imageHero.url ? state.imageHero.url : null;
          const imageMap =
            state.imageMap && state.imageMap.url ? state.imageMap.url : null;
          return { ...state, imageHero, imageMap };
        })[0];
        details.timestamp = now;
        this.props.updateStateDetail(
          'statesDetails',
          this.props.match.params.slug,
          details
        );
      }
    }
  }

  render() {
    // isLoading and isOffline are checking on the data coming from Apollo (graphql)
    // when the query resolves, it is intercepted in componentDidUpdate and used to
    // update state in App
    const isLoading = this.props.StateDetailBySlug.loading;
    if (isLoading) {
      return <Loading />;
    }
    const isOffline =
      this.props.StateDetailBySlug.error &&
      this.props.StateDetailBySlug.error.message.indexOf('Network error') > -1
        ? true
        : false;

    const { candidates, articles } = this.props;

    // stateDetail and state (federal state, not app's state) are params passed by router
    // in App -- stateDetail gets populated / updated when this.props.StateDetailBySlug
    // is provided by Apollo and updates this.state (app's state) when it is intercepted
    // by componentDidUpdate
    const state = this.props.stateDetail
      ? this.props.stateDetail
      : this.props.state;

    const formatLoremIpsum = (p, i) => {
      if (p.format === 'title') {
        return (
          <h3 key={i} className="col-12">
            {p.content}
          </h3>
        );
      } else if (p.format === 'subtitle') {
        return (
          <h4 key={i} className="col-12">
            <i>{p.content}</i>
          </h4>
        );
      }
      return (
        <p key={i} className="col-12">
          {p.content}
        </p>
      );
    };

    return (
      <article>
        {isOffline && <Offline timestamp={state.timestamp} />}
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={0}
          background=""
          className="State"
        >
          <div className="row">
            <h2 className="text-center col-12">{state.title}</h2>
            {state.summary_html ? (
              <div dangerouslySetInnerHTML={{ __html: state.summary_html }} />
            ) : (
              [
                <h2 className="col-12">Summary</h2>,
                <p className="col-12">A Summary should go here</p>,
              ]
            )}
            {state.content_html ? (
              <div dangerouslySetInnerHTML={{ __html: state.content_html }} />
            ) : (
              [
                <h2 className="col-12">Content</h2>,
                <p className="col-12 tertiary-text-color">
                  Content Really should be here, but it looks like the database
                  needs to be flushed out for {state.title}, so here is some
                  filler
                </p>,
                loremIpsum.map((p, i) => formatLoremIpsum(p, i)),
              ]
            )}
          </div>
        </Section>
        <Section
          hasContainer={true}
          spacingAbove={2}
          spacingBelow={2}
          background=""
          className="State"
        >
          <div className="row">
            <h2 className="text-center col-12">
              Our Latest {state.title} Research{' '}
              <span className="tertiary-text-color">Reports</span>
            </h2>
            <p className="text-center col-12">
              See <Link to="/reports">here</Link> for our latest in-depth
              research reports supporting progressive state district campaigns.
            </p>
            {articles && articles.length
              ? articles.slice(0, 3).map(article => {
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
                })
              : null}
          </div>
        </Section>
        <Section
          hasContainer={true}
          spacingAbove={2}
          spacingBelow={2}
          background=""
          className="State"
        >
          <div className="row">
            <h2 className="text-center col-12">
              Our {state.title}{' '}
              <span className="tertiary-text-color">Candidates</span>
            </h2>
            <p className="text-center col-12">
              We are supporting candidates where we can make a big difference
              and help flip seats blue in State Houses and Senates.
            </p>
            {candidates &&
              candidates.map((candidate, i) => (
                <GridXSmallIsOneSmallIsThree key={i}>
                  <BasicCard
                    title={candidate.title}
                    subtitle={candidate.seatShortTitle}
                    route={`candidates/${candidate.state.slug}`}
                    slug={candidate.slug}
                    imageSrc={candidate.imageSm}
                  />
                </GridXSmallIsOneSmallIsThree>
              ))}
          </div>
        </Section>
      </article>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.StateDetailBySlug, {
    name: 'StateDetailBySlug',
    options: props => {
      // console.log('props.match', props.match);
      let slug = props.match.params.slug;
      return { variables: { slug } };
    },
  })
)(State);
