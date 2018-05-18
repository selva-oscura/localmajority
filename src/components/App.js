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
    console.log('updatingStateAndLocalStorage', state);
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

  componentDidUpdate(prevProps, prevState) {
    let state = { ...this.state };

    let allQueriesConcluded = true;
    Object.keys(this.props).forEach(query => {
      if (this.props[query].loading || this.props[query].error) {
        console.log(
          query,
          'loading?',
          this.props[query].loading,
          'error?',
          this.props[query].error && this.props[query].error.length > 0
        );
        allQueriesConcluded = false;
      }
    });
    // console.log('allQueriesConcluded', allQueriesConcluded);

    // Freeze-dry updates to localStorage's copy of state
    if (allQueriesConcluded && prevProps !== this.props) {
      Object.keys(this.props).forEach(query => {
        if (!this.props[query].error) {
          if (query === 'ArticlesBasics') {
            state.articles = this.props[query].allArticles;
          } else if (query === 'CandidatesBasics') {
            state.candidates = this.props[query].allCandidates;
          } else if (query === 'States') {
            state.states = this.props[query].allStates
              .map(item => {
                let { title, abbrev } = item;
                return { title, abbrev };
              })
              .sort((a, b) => (a.title > b.title ? 1 : -1));
            state.statesMasterList = state.states.map(state => state.title);
          } else if (query === 'Parties') {
            if (this.props.Parties && this.props.Parties.allParties) {
              this.props[query].allParties.forEach(
                party => (state.parties[`${party.id}`] = party)
              );
            }
          } else {
            console.log(
              `Huh....  Had a successful query for ${query} amd nothing was done with the data.\nReturned ${
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
        state.issues = issuesArticlesFakeData.issues;
      });
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
      candidate.contestId &&
      candidate.contestId.seatId &&
      candidate.contestId.seatId.title;

    const hasFutureElection = candidate => {
      const electionDate =
        candidate.contestId && candidate.contestId.electionDate
          ? new Date(candidate.contestId.electionDate).getTime()
          : null;
      const now = new Date().getTime();
      return electionDate && electionDate > now;
    };

    const hasPastElection = candidate => {
      const electionDate =
        candidate.contestId && candidate.contestId.electionDate
          ? new Date(candidate.contestId.electionDate).getTime()
          : null;
      const now = new Date().getTime();
      return electionDate && electionDate < now;
    };

    const isMissingCandidateData = candidate => {
      if (!candidate.headshotId || !candidate.headshotId.url) {
        console.log(`${candidate.title} is missing headshot`);
      }
      if (!candidate.contestId) {
        console.log(`${candidate.title} is missing contest data`);
      }
      if (!candidate.contestId || !candidate.contestId.electionDate) {
        console.log(`${candidate.title} is missing election date`);
      }
      if (
        !candidate.contestId ||
        !candidate.contestId.seatId ||
        !candidate.contestId.seatId.title
      ) {
        console.log(`${candidate.title} is missing seat data`);
      }
      if (!candidate.state || !candidate.state.title) {
        console.log(`${candidate.title} is missing state data`);
      }
      if (
        !candidate.headshotId ||
        !candidate.headshotId.url ||
        !candidate.contestId ||
        !candidate.contestId.electionDate ||
        !candidate.contestId.seatId ||
        !candidate.state
      ) {
        return true;
      }
      return false;
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
              state =>
                props.match.params.slug.toLowerCase() ===
                state.title.toLowerCase()
            );
            const stateDetail =
              statesDetails && statesDetails[props.match.params.slug]
                ? statesDetails[props.match.params.slug]
                : null;

            const stateCandidates = validFutureCandidates.filter(
              candidate =>
                props.match.params.slug.toLowerCase() ===
                candidate.state.title.toLowerCase()
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
        <Footer />
      </div>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.ArticlesBasics, { name: 'ArticlesBasics' }),
  graphql(graphQLAPI.queries.CandidatesBasics, { name: 'CandidatesBasics' }),
  graphql(graphQLAPI.queries.Parties, { name: 'Parties' }),
  graphql(graphQLAPI.queries.States, { name: 'States' })
)(App);
