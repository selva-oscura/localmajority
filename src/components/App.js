import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import graphQLAPI from '../api/graphQLAPI';
import { graphql, compose } from 'react-apollo';
import Header from './Header';
import Home from './Home/Home';
import CandidateHolder from './Candidates/CandidateHolder';
import Candidates from './Candidates/Candidates';
import DistrictHolder from './Districts/DistrictHolder';
import Districts from './Districts/Districts';
import IssuePrimer from './Readings/IssuePrimer';
import Issues from './Issues/Issues';
import ReadingHolder from './Readings/ReadingHolder';
import AboutUs from './AboutUs/AboutUs';
import Elements from './common/Elements';
import FourZeroFour from './FourZeroFour';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props, context) {
    super(props, context);

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
  }

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
    const candidates = this.props.CandidatesBasics.allCandidates;
    const seats = this.props.SeatsBasics.allSeats;
    const statesMasterList = this.props.States && this.props.States.allStates ? this.props.States.allStates
      .map(state => state.title)
      .sort()
      : null;
      const regionTypesMasterList = ["Federal District", "State", "State District"]
    const parties = {};
    if(this.props.Parties && this.props.Parties.allParties){
      this.props.Parties.allParties.forEach((party) => parties[`${party.id}`] = party);
    }
    const articles = [], contests = [];
    // console.log('this from App', this);
    // console.log('this.props from App', this.props);
    console.log('candidates', candidates);
    console.log('seats', seats);
    console.log('parties', parties);
    console.log('statesMasterList', statesMasterList);
    // return null;
    return (
      <div className="App">
        <Header props={this.props.children} />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              component={props => {
                return <Home candidates={candidates} articles={articles} />;
              }}
            />
            <Route
              path="/candidates/:slug"
              component={props => {
                const candidate = candidates 
                  ? (candidates.find(
                      candidate => props.match.params.slug === candidate.slug))
                  : null;
                return (
                  <CandidateHolder
                    candidate={candidate}
                    {...props}
                  />
                );
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
            <Route path="/about-us" component={AboutUs} />
            <Route path="/elements" component={Elements} />
            <Route component={FourZeroFour} />
          </Switch>
        </div>
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



//            <Route
              // path="/districts/:id"
              // component={props => {
              //   const seat = seats.find(
              //     seat => props.match.params.id === seat.slug
              //   );
              //   let contest, candidate, districtPrimer, districtTP, candidateTP;
              //   if (seat) {
              //     districtPrimer = articles.find(
              //       a =>
              //         a.type === 'DistrictPrimer' &&
              //         a.appliesTo.includes(seat.id)
              //     );
              //     districtTP = articles.find(
              //       a =>
              //         a.type === 'TalkingPoints' &&
              //         a.appliesTo.includes(seat.id)
              //     );
              //     contest = contests.find(c => c.seatId === seat.id);
              //     if (contest) {
              //       candidate = candidates.find(
              //         c => contest.id === c.inContest
              //       );
              //     }
              //     if (candidate) {
              //       candidateTP = articles.find(
              //         a =>
              //           a.type === 'TalkingPoints' &&
              //           a.appliesTo.includes(candidate.id)
              //       );
              //     }
              //   }
              //   return (
              //     <DistrictHolder
              //       {...props}
              //       seat={seat}
              //       candidate={candidate}
              //       districtPrimer={districtPrimer}
              //       districtTP={districtTP}
              //       candidateTP={candidateTP}
              //     />
              //   );
              // }}
//            />
//            <Route
//              path="/districts"
//              component={props => (
//                <Districts
//                  {...props}
//                  seats={seats}
//                  statesMasterList={statesMasterList}
//                  regionTypesMasterList={regionTypesMasterList}
//                />
//              )}
//            />
//            <Route
              // path="/article/:id"
              // component={props => {
              //   const reading = articles.find(
              //     reading => props.match.params.id === reading.slug
              //   );
              //   return <ReadingHolder reading={reading} {...props} />;
              // }}
//            />

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
