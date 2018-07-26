import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import graphQLAPI from '../api/graphQLAPI';
import { graphql, compose } from 'react-apollo';
import Header from './Header/Header';
import ErrorBoundary from './common/ErrorBoundary';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Candidate from './Candidates/Candidate';
import Candidates from './Candidates/Candidates';
import States from './States/States';
import State from './States/State';
import Report from './Reports/Report';
import Reports from './Reports/Reports';
import AboutUs from './AboutUs/AboutUs';
import TakeAction from './TakeAction/TakeAction';
import Loading from './common/Loading';
import Section from './common/Section/Section';
import FourZeroFour from './FourZeroFour';
import './App.css';

// DEV ONLY -- fixtures -- SHOULD BE ELIMINATED ONCE THE DATABASE IS HAPPY
import {
  stateFakeData,
  issueTitles,
  issuesArticlesFakeData,
  socialMedia,
} from '../data/fixtures';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    // check if there is local storage capability and stored data from last time
    let localMajorityData =
      localStorage && localStorage.localMajorityData
        ? localStorage.localMajorityData
        : null;

    if (localMajorityData) {
      // if there is stored data from last time, use that to bootstrap state (this will be fallback data in case of no internet access)
      let state = JSON.parse(localMajorityData);
      state.errors = [];
      this.state = state;
    } else {
      // default state if no localStorage or no stored data in localStorage
      this.state = {
        articles: [],
        articlesDetails: {},
        candidates: [],
        candidatesDetails: {},
        issues: [],
        parties: {},
        states: [],
        statesDetails: {},
        statesMasterList: [],
        tags: {},
        timestamp: -Infinity,
      };
      if (localStorage) {
        // store data to localStorage if available
        localStorage.localMajorityData = JSON.stringify(this.state);
      }
    }
    this.updateStateDetail = this.updateStateDetail.bind(this);
  }

  updateStateAndLocalStorage(state) {
    state = { ...state };
    this.setState(state);
    if (localStorage) {
      localStorage.localMajorityData = JSON.stringify(state);
    }
    // console.log('updatingStateAndLocalStorage', state);
  }

  updateStateDetail(detail, key, value) {
    // this is for state.statesDetails and state.candidatesDetails
    // detail parameter specifies statesDetails or candidatesDetails
    // key is the slug that will be used in the route
    // value is the data returned from the detail query
    console.log('updatingStateDetail', detail, key, value);
    let state = { ...this.state };
    state[detail][key] = value;
    this.updateStateAndLocalStorage(state);
  }

  allQueriesConcluded() {
    let allQueriesConcluded = true;
    Object.keys(this.props).forEach(query => {
      if (this.props[query].loading || this.props[query].error) {
        // console.log(
        //   query,
        //   'loading?',
        //   this.props[query].loading,
        //   'error?',
        //   this.props[query].error && this.props[query].error.length > 0
        // );
        allQueriesConcluded = false;
      }
    });
    console.log('this.props for all of the queries', this.props);
    return allQueriesConcluded;
  }

  prepareGraphQLResultsForSavingToState() {
    let state = { ...this.state };
    Object.keys(this.props).forEach(query => {
      if (!this.props[query].error) {
        if (query === 'Articles') {
          state.articles = this.props[query].articles;
        } else if (query === 'Candidates') {
          let candidates = this.props[query].candidates;
          candidates = candidates.map(candidate => {
            let stateData = { ...candidate.state };
            stateData.slug = stateData.title.replace(' ', '-').toLowerCase();
            return { ...candidate, state: stateData };
          });
          console.log('candidates after adding state slug');
          state.candidates = candidates;
        } else if (query === 'States') {
          state.states = this.props[query].states
            .map(item => {
              let { title, abbrev } = item;
              let slug = title.replace(' ', '-').toLowerCase();
              let imageSm =
                item && item.imageSm && item.imageSm.url
                  ? item.imageSm.url
                  : null;
              let imageMap =
                item && item.imageMap && item.imageMap.url
                  ? item.imageMap.url
                  : null;
              return { title, slug, abbrev, imageSm, imageMap };
            })
            .sort((a, b) => (a.title > b.title ? 1 : -1));
          state.statesMasterList = state.states.map(state => state.title);
        } else if (query === 'Parties') {
          if (this.props.Parties && this.props.Parties.parties) {
            this.props[query].parties.forEach(
              party => (state.parties[`${party.slug}`] = party)
            );
          }
        } else if (query === 'Tags') {
          if (this.props.Tags && this.props.Tags.tags) {
            this.props[query].tags.forEach(
              tag => (state.tags[`${tag.slug}`] = tag)
            );
          }
        } else {
          console.log(
            `Successful query for ${query}, but nothing done with the data.\nReturned ${
              this.props[query]
            }`
          );
        }
      } else {
        console.log(
          `Huh....  Had an error on the query for ${query}.\nReturned ${
            this.props[query]
          }`
        );
      }
      // DEV ONLY -- hard-coded/imported data from fixtures to be replaced by queries once database is happy
      // state.issues = issuesArticlesFakeData.issues;
    });
    return state;
  }

  componentDidUpdate(prevProps, prevState) {
    // Freeze-dry updates to localStorage's copy of state IF all queries concluded and props !== prevProps

    const allQueriesConcluded = this.allQueriesConcluded();
    // console.log('allQueriesConcluded', allQueriesConcluded);

    if (allQueriesConcluded && prevProps !== this.props) {
      let state = this.prepareGraphQLResultsForSavingToState();
      state.timestamp = new Date().getTime();
      if (prevProps !== this.props) {
        this.updateStateAndLocalStorage(state);
      }
    }
  }

  renderPage() {
    // show Loading spinner if graphql queries are still being loaded
    Object.keys(this.props).forEach(query => {
      if (query.loading) {
        return <Loading />;
      }
    });

    // once queries are no longer being loaded, display content
    const {
      // articles,
      articlesDetails,
      candidates,
      candidatesDetails,
      statesMasterList,
      statesDetails,
    } = this.state;

    let { articles } = this.state;

    const hasElectionData = candidate =>
      candidate.office &&
      candidate.office.elections &&
      candidate.office.elections[0] &&
      candidate.office.elections[0].title &&
      candidate.office.elections[0].electionDate;

    const hasFutureElection = candidate => {
      const electionDate =
        candidate.office &&
        candidate.office.elections &&
        candidate.office.elections[0] &&
        candidate.office.elections[0].electionDate
          ? new Date(candidate.office.elections[0].electionDate).getTime()
          : null;
      const now = new Date().getTime();
      return electionDate && electionDate > now;
    };

    const hasPastElection = candidate => {
      const electionDate =
        candidate.office &&
        candidate.office.elections &&
        candidate.office.elections[0] &&
        candidate.office.elections[0].electionDate
          ? new Date(candidate.office.elections[0].electionDate).getTime()
          : null;
      const now = new Date().getTime();
      return electionDate && electionDate < now;
    };

    const isMissingCandidateData = candidate => {
      let missingData = false;
      if (!candidate.imageSm || !candidate.imageSm.url) {
        missingData = true;
        console.log(`${candidate.title} is missing headshot`);
      }
      if (!(candidate.office && candidate.office.elections)) {
        missingData = true;
        console.log(`${candidate.title} is missing election data`);
      }
      if (
        !(
          candidate.office &&
          candidate.office.elections &&
          candidate.office.elections[0].electionDate
        )
      ) {
        missingData = true;
        console.log(`${candidate.title} is missing election date`);
      }
      if (
        !(
          candidate.office &&
          candidate.office.elections &&
          candidate.office.elections[0].title
        )
      ) {
        missingData = true;
        console.log(`${candidate.title} is missing seat data`);
      }
      if (
        !candidate.state ||
        !candidate.state.title ||
        !candidate.state.abbrev
      ) {
        missingData = true;
        console.log(`${candidate.title} is missing state data`);
      }
      return missingData;
    };

    const candidateStatesArray = candidates => {
      let states = candidates.map(
        candidate =>
          candidate.state && candidate.state.title
            ? candidate.state.title
            : null
      );
      return [...new Set(states)].sort();
    };

    const validCandidates = candidates.filter(hasElectionData);
    // console.log('validCandidates', validCandidates);

    const validFutureCandidates = candidates
      .filter(hasElectionData)
      .filter(hasFutureElection);
    // console.log('validFutureCandidates', validFutureCandidates);

    const validFutureCandidatesStates = candidateStatesArray(
      validFutureCandidates
    );
    // console.log('validFutureCandidatesStates', validFutureCandidatesStates);

    const validPastCandidates = candidates
      .filter(hasElectionData)
      .filter(hasPastElection);
    // console.log('validPastCandidates', validPastCandidates);

    const candidatesWithProblematicData = candidates.filter(
      isMissingCandidateData
    );
    // console.log('candidatesWithProblematicData', candidatesWithProblematicData);

    // RETURN HERE
    // DEV ONLY -- delete next section once we have state data in database
    const { issues } = issuesArticlesFakeData;
    articles = articles.concat(issuesArticlesFakeData.articles);
    // RETURN HERE -- END
    // END -- delete previous section once we have real issues and articles

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Home
              articles={articles}
              pastCandidates={validPastCandidates}
              candidates={validFutureCandidates}
              // should be restored once we have a database that will support this
              // currentStateRaces={validFutureCandidatesStates}
              currentStateRaces={stateFakeData}
            />
          )}
        />

        <Route
          path="/reports/:slug"
          component={props => {
            const issue = issues.find(
              issue =>
                props.match.params.slug.toLowerCase() ===
                issue.slug.toLowerCase()
            );
            const filteredArticles = articles.filter(
              article =>
                (article.tags &&
                  article.tags.includes(props.match.params.slug)) ||
                (article.tags &&
                  article.tags.includes(
                    props.match.params.slug.slice(0, 1).toUpperCase() +
                      props.match.params.slug.slice(1).toLowerCase()
                  ))
            );
            return (
              <Reports
                {...props}
                issue={issue}
                articles={filteredArticles}
                issuesMasterList={issueTitles}
                statesMasterList={statesMasterList}
              />
            );
          }}
        />

        <Route
          path="/reports"
          component={props => (
            <ErrorBoundary>
              {issues && statesMasterList && statesMasterList.length ? (
                <Reports
                  {...props}
                  articles={articles}
                  issuesMasterList={issueTitles}
                  statesMasterList={statesMasterList}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />

        <Route
          path="/report/:slug"
          component={props => {
            const article = articles
              ? articles.find(
                  article => props.match.params.slug === article.slug
                )
              : null;
            const articleDetail = articlesDetails[props.match.params.slug]
              ? articlesDetails[props.match.params.slug]
              : null;
            let relatedArticles = [];
            if (article && article.tags) {
              const articleTags = article.tags;
              articles.forEach(possiblyRelatedArticle => {
                let relationshipDegree = 0;
                if (possiblyRelatedArticle.tags) {
                  possiblyRelatedArticle.tags.forEach(tag => {
                    if (
                      articleTags.includes(tag) &&
                      article.slug !== possiblyRelatedArticle.slug &&
                      !statesMasterList.includes(tag)
                    ) {
                      relationshipDegree++;
                    }
                  });
                }
                if (relationshipDegree) {
                  let relatedArticle = {
                    ...possiblyRelatedArticle,
                    relationshipDegree,
                  };
                  relatedArticles.push(relatedArticle);
                }
              });
              relatedArticles = relatedArticles
                .sort((a, b) => {
                  if (a.relationshipDegree < b.relationshipDegree) {
                    return 1;
                  } else if (a.relationshipDegree > b.relationshipDegree) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                .slice(0, 6);
            }
            return (
              <ErrorBoundary>
                <Report
                  {...props}
                  article={article}
                  articleDetail={articleDetail}
                  relatedArticles={relatedArticles}
                  updateStateDetail={this.updateStateDetail}
                />
              </ErrorBoundary>
            );
          }}
        />

        <Route
          path="/report"
          component={props => (
            <ErrorBoundary>
              {issues && statesMasterList && statesMasterList.length ? (
                <Report
                  {...props}
                  article={null}
                  articleDetail={null}
                  relatedArticles={[]}
                  updateStateDetail={this.updateStateDetail}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />

        <Route
          path="/candidates/:state/:slug"
          component={props => {
            const candidate = validFutureCandidates
              ? validFutureCandidates.find(
                  candidate => props.match.params.slug === candidate.slug
                )
              : null;
            const candidateDetail =
              candidatesDetails && candidatesDetails[props.match.params.slug]
                ? candidatesDetails[props.match.params.slug]
                : null;
            return (
              <ErrorBoundary>
                <Candidate
                  {...props}
                  candidate={candidate}
                  slug={props.match.params.slug}
                  candidateDetail={candidateDetail}
                  updateStateDetail={this.updateStateDetail}
                />
              </ErrorBoundary>
            );
          }}
        />

        <Route
          path="/candidates/:state"
          component={props => (
            <ErrorBoundary>
              {validFutureCandidates && validFutureCandidatesStates ? (
                <Candidates
                  {...props}
                  candidates={validFutureCandidates}
                  statesMasterList={validFutureCandidatesStates}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />

        <Route
          path="/candidates"
          component={props => (
            <ErrorBoundary>
              {validFutureCandidates &&
              validFutureCandidatesStates &&
              validFutureCandidatesStates.length ? (
                <Candidates
                  {...props}
                  candidates={validFutureCandidates}
                  statesMasterList={validFutureCandidatesStates}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />

        <Route
          path="/states/:slug"
          component={props => {
            const stateData = stateFakeData.find(
              // state => props.match.params.slug.toLowerCase() === state.title.toLowerCase()
              state => props.match.params.slug === state.slug
            );
            const stateDetail =
              statesDetails && statesDetails[props.match.params.slug]
                ? statesDetails[props.match.params.slug]
                : null;

            const stateCandidates = validFutureCandidates.filter(
              // candidate => props.match.params.slug.toLowerCase() === candidate.state.title.toLowerCase()
              candidate => props.match.params.slug === candidate.state.slug
            );
            const stateArticles = articles.filter(
              article =>
                article.tags && article.tags.includes(props.match.params.slug)
            );

            return (
              <ErrorBoundary>
                {validFutureCandidatesStates &&
                validFutureCandidatesStates.length ? (
                  <State
                    {...props}
                    state={stateData}
                    stateDetail={stateDetail}
                    candidates={stateCandidates}
                    articles={stateArticles}
                    statesMasterList={validFutureCandidatesStates}
                    updateStateDetail={this.updateStateDetail}
                  />
                ) : (
                  <Loading />
                )}
              </ErrorBoundary>
            );
          }}
        />

        <Route
          path="/states"
          component={props =>
            validFutureCandidatesStates &&
            validFutureCandidatesStates.length ? (
              <Section
                hasContainer={true}
                spacingAbove={3}
                spacingBelow={3}
                background=""
              >
                <States
                  // should be restored once we have a database that will support this
                  // currentStateRaces={validFutureCandidatesStates}
                  currentStateRaces={stateFakeData}
                />
              </Section>
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/take-action/:state"
          component={props =>
            validFutureCandidatesStates ? (
              <TakeAction
                {...props}
                statesMasterList={validFutureCandidatesStates}
              />
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/take-action"
          component={props =>
            validFutureCandidatesStates ? (
              <TakeAction
                {...props}
                statesMasterList={validFutureCandidatesStates}
              />
            ) : (
              <Loading />
            )
          }
        />

        <Route path="/about-us" component={AboutUs} />

        <Route component={FourZeroFour} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <Header props={this.props.children} />
        <ErrorBoundary>
          <main>{this.renderPage()}</main>
        </ErrorBoundary>
        <Footer socialMedia={socialMedia} />
      </div>
    );
  }
}
//          <h2>Check the Console!!!!</h2>

export default compose(
  graphql(graphQLAPI.queries.Articles, { name: 'Articles' }),
  graphql(graphQLAPI.queries.Candidates, { name: 'Candidates' }),
  graphql(graphQLAPI.queries.Parties, { name: 'Parties' }),
  graphql(graphQLAPI.queries.States, { name: 'States' }),
  graphql(graphQLAPI.queries.Tags, { name: 'Tags' })
)(App);
