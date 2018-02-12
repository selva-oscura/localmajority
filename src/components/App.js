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
// import IssuePrimer from './Readings/IssuePrimer';
// import ReadingHolder from './Readings/ReadingHolder';
import AboutUs from './AboutUs/AboutUs';
import Elements from './common/Elements';
import FourZeroFour from './FourZeroFour';
import Loading from './common/Loading';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  // constructor(props, context) {
  //   super(props, context);

  // // check if there is local storage capability and stored data from last time
  // let localMajorityData =
  //   localStorage && localStorage.localMajorityData
  //     ? localStorage.localMajorityData
  //     : null;
  // if (localMajorityData) {
  //   // if there is stored data from last time, use that to bootstrap state (this will be fallback data in case of no internet access)
  //   let state = JSON.parse(localMajorityData);
  //   state.errors = [];
  //   this.state = state;
  // } else {
  //   // default state if no localStorage or no stored data in localStorage
  //   this.state = {
  //     articles: [],
  //     candidates: [],
  //     contests: [],
  //     issues: [],
  //     parties: [],
  //     seats: [],
  //     statesMasterList: [],
  //     regionTypesMasterList: [],
  //     errors: [],
  //   };
  //   if (localStorage) {
  //     // store data to localStorage if available
  //     localStorage.localMajorityData = JSON.stringify(this.state);
  //   }
  // }
  // console.log(
  //   'this props from App....anything coming from graphql?',
  //   '\n',
  //   this.props
  // );
  // }

  // setStateAndLocalStorage(state) {
  //   state = Object.assign({}, state);
  //   this.setState(state);
  //   if (localStorage) {
  //     localStorage.localMajorityData = JSON.stringify(state);
  //   }
  // }
  // componentDidMount(){
  //   console.log(
  //     'this props from App componentDidMount....anything coming from graphql?',
  //     '\n',
  //     this.props
  //   );
  // }
  renderPage() {
    // show Loading spinner if graphql queries are still being loaded
    Object.keys(this.props).forEach(query => {
      if (query.loading) {
        return <Loading />;
      }
    });

    // once queries are no longer being loaded, display content
    const candidates = this.props.CandidatesBasics.allCandidates;
    const seats = this.props.SeatsBasics.allSeats;
    const statesMasterList =
      this.props.States && this.props.States.allStates
        ? this.props.States.allStates.map(state => state.title).sort()
        : null;
    const regionTypesMasterList = [
      'Federal District',
      'State',
      'State District',
    ];
    const parties = {};
    if (this.props.Parties && this.props.Parties.allParties) {
      this.props.Parties.allParties.forEach(
        party => (parties[`${party.id}`] = party)
      );
    }
    // const articles = [],
    //   contests = [];
    // if (candidates && seats) {
    //   console.log('candidates', candidates);
    //   console.log('seats', seats);
    //   console.log('parties', parties);
    //   console.log('statesMasterList', statesMasterList);
    // }

    return (
      <Switch>
        <Route
          exact
          path="/"
          component={props => <Home candidates={candidates} />}
        />
        <Route
          path="/candidates/:slug"
          component={props => {
            const candidate = candidates
              ? candidates.find(
                  candidate => props.match.params.slug === candidate.slug
                )
              : { id: 'no-cached-data', headshotId: { url: null } };
            return <Candidate candidate={candidate} {...props} />;
          }}
        />
        <Route
          path="/candidates"
          component={props => (
            <Candidates
              {...props}
              candidates={candidates}
              statesMasterList={statesMasterList}
              regionTypesMasterList={regionTypesMasterList}
            />
          )}
        />
        <Route
          path="/districts/:slug"
          component={props => {
            const seat = seats
              ? seats.find(seat => props.match.params.slug === seat.slug)
              : { id: 'no-cached-data', mapSmUrl: { url: null } };
            return (
              <ErrorBoundary>
                <District {...props} seat={seat} />
              </ErrorBoundary>
            );
          }}
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
