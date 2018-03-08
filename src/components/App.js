import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import graphQLAPI from '../api/graphQLAPI';
import { graphql, compose } from 'react-apollo';
import Header from './Header/Header';
import ErrorBoundary from './common/ErrorBoundary';
import Home from './Home/Home';
import Article from './Articles/Article';
import Candidate from './Candidates/Candidate';
import Candidates from './Candidates/Candidates';
import District from './Districts/District';
import Districts from './Districts/Districts';
import Issue from './Issues/Issue';
import Issues from './Issues/Issues';
import AboutUs from './AboutUs/AboutUs';
import TakeAction from './TakeAction/TakeAction';
import Elements from './common/Elements';
import FourZeroFour from './FourZeroFour';
import Loading from './common/Loading';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props, context) {
    super(props, context);

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
        seats: [],
        seatsDetails: {},
        parties: {},
        states: [],
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
    // this is for seatsDetails and candidatesDetails
    // detail specifies whether it is seatsDetails or candidatesDetails
    // key is the slug that is used in routing
    // value is the data returned from the detailed query
    console.log('updatingStateDetail', detail, key, value);
    let state = { ...this.state };
    state[detail][key] = value;
    this.updateStateAndLocalStorage(state);
  }

  componentDidUpdate(prevProps, prevState) {
    let state = { ...this.state };
    // let allQueriesSuccessful = true;
    let allQueriesConcluded = true;
    Object.keys(this.props).forEach(query => {
      // if (this.props[query].loading || this.props[query].error) {
      //   allQueriesSuccessful = false;
      // }
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
    // Freeze-dry updates to state in localStorage
    if (allQueriesConcluded && prevProps !== this.props) {
      Object.keys(this.props).forEach(query => {
        if (!this.props[query].error) {
          if (query === 'ArticlesBasics') {
            state.articles = this.props[query].allArticles;
          } else if (query === 'CandidatesBasics') {
            state.candidates = this.props[query].allCandidates;
          } else if (query === 'SeatsBasics') {
            state.seats = this.props[query].allSeats;
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
      seats,
      seatsDetails,
      candidatesDetails,
      statesMasterList,
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

    const validCandidates = candidates.filter(hasElectionData);
    console.log('validCandidates', validCandidates);

    const validFutureCandidates = candidates
      .filter(hasElectionData)
      .filter(hasFutureElection);
    console.log('validFutureCandidates', validFutureCandidates);

    const validPastCandidates = candidates
      .filter(hasElectionData)
      .filter(hasPastElection);
    console.log('validPastCandidates', validPastCandidates);

    const candidatesWithProblematicData = candidates.filter(
      isMissingCandidateData
    );
    console.log('candidatesWithProblematicData', candidatesWithProblematicData);

    console.log('article', articles);

    // RETURN HERE
    // delete next next section once we have real issues and articles
    const issues = [];
    for (let i = 1; i < 10; i++) {
      let subIssues = [];
      let date = new Date().toISOString();
      let author = 'somebody or other';
      for (let j = 1; j < 5; j++) {
        const sockPuppetArticles = [];
        for (let k = 1; k < 4; k++) {
          let type = '';
          if (k === 1) {
            type = 'TalkingPoints';
          } else {
            type = 'Research Article';
          }
          sockPuppetArticles.push({
            id: `${i}_${j}_${k}`,
            title: `Article blah, blah, blah ${i} - ${j} - ${k}`,
            slug: `filler-article-${i}-${j}-${k}`,
            articleType: type,
            createdAt: date,
            updatedAt: date,
            author: author,
          });
        }
        subIssues.push({
          id: `${i}_${j}`,
          title: `Sock Puppet ${i} - ${j}`,
          slug: `sock-puppet-${i}-${j}`,
          articles: sockPuppetArticles,
        });
        articles = articles.concat(sockPuppetArticles);
        // sockPuppetArticles.forEach((article => {
        //   articles.push(article);
        // }))
      }
      issues.push({
        id: i,
        title: `Sock Puppet ${i}`,
        slug: `sock-puppet-${i}`,
        subIssues: subIssues,
      });
    }
    // RETURN HERE -- END
    // END -- delete next next section once we have real issues and articles

    return (
      <Switch>
        <Route
          exact
          path="/"
          component={props => (
            <Home articles={articles} candidates={validCandidates} />
          )}
        />
        <Route
          path="/candidates/:state/:slug"
          component={props => {
            const candidate = validCandidates
              ? validCandidates.find(
                  candidate => props.match.params.slug === candidate.slug
                )
              : { id: 'no-cached-data', headshotId: { url: null } };
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
              {validCandidates &&
              statesMasterList &&
              statesMasterList.length ? (
                <Candidates
                  {...props}
                  candidates={validCandidates}
                  statesMasterList={statesMasterList}
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
              {validCandidates &&
              statesMasterList &&
              statesMasterList.length ? (
                <Candidates
                  {...props}
                  candidates={validCandidates}
                  statesMasterList={statesMasterList}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />
        <Route
          path="/districts/:state/:slug"
          component={props => {
            const seat = seats
              ? seats.find(seat => props.match.params.slug === seat.slug)
              : { id: 'no-cached-data', mapSmUrl: { url: null } };
            const seatDetail =
              seatsDetails && seatsDetails[props.match.params.slug]
                ? seatsDetails[props.match.params.slug]
                : null;
            return (
              <ErrorBoundary>
                <District
                  {...props}
                  seat={seat}
                  seatDetail={seatDetail}
                  updateStateDetail={this.updateStateDetail}
                />
              </ErrorBoundary>
            );
          }}
        />
        <Route
          path="/districts/:state"
          component={props => (
            <ErrorBoundary>
              {seats && statesMasterList && statesMasterList.length ? (
                <Districts
                  {...props}
                  seats={seats}
                  statesMasterList={statesMasterList}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />

        <Route
          path="/districts"
          component={props =>
            seats && statesMasterList && statesMasterList.length ? (
              <Districts
                {...props}
                seats={seats}
                statesMasterList={statesMasterList}
              />
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/articles/:slug"
          component={props => {
            const article = articles
              ? articles.find(
                  article => props.match.params.slug === article.slug
                )
              : null;
            const articleDetail = articlesDetails[props.match.params.slug]
              ? articlesDetails[props.match.params.slug]
              : null;
            return (
              <Article
                {...props}
                article={article}
                articleDetail={articleDetail}
              />
            );
          }}
        />

        <Route
          path="/issues/:slug"
          component={props => {
            console.log(
              'logging from routing for /issues/:slug -- issues are',
              issues,
              'param is',
              props.match.params.slug
            );
            const issue = issues.find(
              issue => props.match.params.slug === issue.slug
            );
            return <Issue {...props} issue={issue} />;
          }}
        />

        <Route
          path="/issues"
          component={props => (
            <ErrorBoundary>
              {issues && statesMasterList && statesMasterList.length ? (
                <Issues
                  {...props}
                  issues={issues}
                  statesMasterList={statesMasterList}
                />
              ) : (
                <Loading />
              )}
            </ErrorBoundary>
          )}
        />

        <Route
          path="/take-action/:state"
          component={props =>
            statesMasterList ? (
              <TakeAction {...props} statesMasterList={statesMasterList} />
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/take-action"
          component={props =>
            statesMasterList ? (
              <TakeAction {...props} statesMasterList={statesMasterList} />
            ) : (
              <Loading />
            )
          }
        />

        <Route path="/about-us" component={AboutUs} />

        <Route path="/elements" component={Elements} />

        <Route component={FourZeroFour} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <Header props={this.props.children} />
        <ErrorBoundary>
          <div className="container">{this.renderPage()}</div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.ArticlesBasics, { name: 'ArticlesBasics' }),
  graphql(graphQLAPI.queries.CandidatesBasics, { name: 'CandidatesBasics' }),
  graphql(graphQLAPI.queries.SeatsBasics, { name: 'SeatsBasics' }),
  graphql(graphQLAPI.queries.Parties, { name: 'Parties' }),
  graphql(graphQLAPI.queries.States, { name: 'States' })
)(App);
