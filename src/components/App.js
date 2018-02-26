import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import graphQLAPI from '../api/graphQLAPI';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import ErrorBoundary from './common/ErrorBoundary';
import Home from './Home/Home';
import Candidate from './Candidates/Candidate';
import Candidates from './Candidates/Candidates';
import District from './Districts/District';
import Districts from './Districts/Districts';
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
        seats: [],
        seatsDetails: {},
        parties: {},
        states: [],
        // contests: [],
        // issues: [],
        statesMasterList: [],
        regionTypesMasterList: [],
        // errors: [],
        timestamp: -Infinity,
      };
      if (localStorage) {
        // store data to localStorage if available
        localStorage.localMajorityData = JSON.stringify(this.state);
      }
    }
    // this.setStateAndLocalStorage = this.setStateAndLocalStorage.bind(this);
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
    console.log('allQueriesConcluded', allQueriesConcluded);
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
              .sort((a, b) => {
                if (a.title > b.title) {
                  return 1;
                } else {
                  return -1;
                }
              });
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
      articles,
      articlesDetails,
      candidates,
      seats,
      seatsDetails,
      candidatesDetails,
      statesMasterList,
    } = this.state;

    const regionTypesMasterList = [
      { title: 'Federal District', abbrev: 'FD_US' },
      { title: 'State', abbrev: 'State_US' },
      { title: 'State District', abbrev: 'SD_US' },
    ];

    return (
      <Switch>
        <Route
          exact
          path="/"
          component={props => <Home
            articles={articles}
            candidates={candidates}
          />}
        />
        <Route
          path="/candidates/:state/:slug"
          component={props => {
            const candidate = candidates
              ? candidates.find(
                  candidate => props.match.params.slug === candidate.slug
                )
              : { id: 'no-cached-data', headshotId: { url: null } };
            return (
              <ErrorBoundary>
                <Candidate
                  {...props}
                  candidate={candidate}
                  slug={props.match.params.slug}
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
              {candidates &&
              statesMasterList &&
              statesMasterList.length &&
              regionTypesMasterList ? (
                <Candidates
                  {...props}
                  candidates={candidates}
                  statesMasterList={statesMasterList}
                  regionTypesMasterList={regionTypesMasterList}
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
              {candidates &&
              statesMasterList &&
              statesMasterList.length &&
              regionTypesMasterList ? (
                <Candidates
                  {...props}
                  candidates={candidates}
                  statesMasterList={statesMasterList}
                  regionTypesMasterList={regionTypesMasterList}
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
            const seatDetail = seatsDetails[props.match.params.slug]
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
              {seats &&
              statesMasterList &&
              statesMasterList.length &&
              regionTypesMasterList ? (
                <Districts
                  {...props}
                  seats={seats}
                  statesMasterList={statesMasterList}
                  regionTypesMasterList={regionTypesMasterList}
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
            seats &&
            statesMasterList &&
            statesMasterList.length &&
            regionTypesMasterList ? (
              <Districts
                {...props}
                seats={seats}
                statesMasterList={statesMasterList}
                regionTypesMasterList={regionTypesMasterList}
              />
            ) : (
              <Loading />
            )
          }
        />

        <Route
          path="/take-action"
          component={props =>
            statesMasterList
            ? (
              <TakeAction
                {...props}
                statesMasterList={statesMasterList}
              />
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
    // const {
    //   articles,
    //   candidates,
    //   contests,
    //   issues,
    //   parties,
    //   seats,
    //   statesMasterList,
    //   regionTypesMasterList,
    //   districtsStatesSelected,
    //   districtsSeatTypeSelected,
    //   candidatesStatesSelected,
    //   candidateSeatTypesSelected,
    //   candidatesTextSelected,
    // } = this.state;

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

/*
           <Route
              path="/article/:id"
              component={props => {
                const reading = articles.find(
                  reading => props.match.params.id === reading.slug
                );
                return <ReadingHolder reading={reading} {...props} />;
              }}
           />
*/

// <Route
//   path="/issues/:id"
//   component={props => {
//     console.log(
//       'logging from routing for /issues/:id -- issues are',
//       issues,
//       'param is',
//       props.match.params.id
//     );
//     const issue = issues.find(
//       issue => props.match.params.id === issue.id
//     );
//     return <IssuePrimer {...props} issue={issue} />;
//   }}
// />
// <Route
//   path="/issues"
//   component={props => <Issues {...props} issues={issues} />}
// />
