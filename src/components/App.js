import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
import axios from 'axios';
import cmsQueries from '../api/cmsQueries';
import queryFields from '../api/queryFields';
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
        candidates: [],
        contests: [],
        issues: [],
        parties: [],
        seats: [],
        statesMasterList: [],
        seatTypesMasterList: [],
        errors: [],
      };
      if (localStorage) {
        // store data to localStorage if available
        localStorage.localMajorityData = JSON.stringify(this.state);
      }
    }
  }

  setStateAndLocalStorage(state) {
    state = Object.assign({}, state);
    this.setState(state);
    if (localStorage) {
      localStorage.localMajorityData = JSON.stringify(state);
    }
  }

  fetchData() {
    queryFields.forEach(queryField => {
      let query = cmsQueries.getAll(queryField.all);
      axios(query)
        .then(res => {
          if (res.status === 200 && res.data) {
            let state = this.state;
            if (queryField.stateName === 'states') {
              res.data.sort((a, b) => {
                if (a.title > b.title) {
                  return 1;
                } else if (a.title < b.title) {
                  return -1;
                } else {
                  return 0;
                }
              });
              let statesMasterList = res.data.map(item => item.title);
              state.statesMasterList = statesMasterList;
            }
            state[queryField.stateName] = res.data;
            console.log('query results for', queryField.stateName, res.data)
            this.setStateAndLocalStorage(state);
          } else {
            console.log('error fetching', query, res);
            throw Error('error on', queryField.stateName, res);
          }
        })
        .catch(err => {
          console.log(
            `error acessing data for ${queryField.tableName} table`,
            JSON.stringify(err)
          );
        });
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const {
      articles,
      candidates,
      contests,
      issues,
      parties,
      seats,
      statesMasterList,
      seatTypesMasterList,
      districtsStatesSelected,
      districtsSeatTypeSelected,
      candidatesStatesSelected,
      candidateSeatTypesSelected,
      candidatesTextSelected,
    } = this.state;
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
              path="/districts/:id"
              component={props => {
                const seat = seats.find(
                  seat => props.match.params.id === seat.friendlyId
                );
                let contest, candidate, districtPrimer, districtTP, candidateTP;
                if (seat) {
                  districtPrimer = articles.find(
                    a =>
                      a.type === 'DistrictPrimer' &&
                      a.appliesTo.includes(seat.uid)
                  );
                  districtTP = articles.find(
                    a =>
                      a.type === 'TalkingPoints' &&
                      a.appliesTo.includes(seat.uid)
                  );
                  contest = contests.find(c => c.seatId === seat.uid);
                  if (contest) {
                    candidate = candidates.find(
                      c => contest.uid === c.inContest
                    );
                  }
                  if (candidate) {
                    candidateTP = articles.find(
                      a =>
                        a.type === 'TalkingPoints' &&
                        a.appliesTo.includes(candidate.uid)
                    );
                  }
                }
                // console.log(`seat and related candidate`, seat, candidate)
                return (
                  <DistrictHolder
                    {...props}
                    seat={seat}
                    candidate={candidate}
                    districtPrimer={districtPrimer}
                    districtTP={districtTP}
                    candidateTP={candidateTP}
                  />
                );
              }}
            />
            <Route
              path="/districts"
              component={props => (
                <Districts
                  {...props}
                  seats={seats}
                  statesMasterList={statesMasterList}
                  seatTypesMasterList={seatTypesMasterList}
                />
              )}
            />
            <Route
              path="/candidates/:id"
              component={props => {
                const candidate = candidates.find(
                  candidate => props.match.params.id === candidate.friendlyId
                );
                let contest, seat, candidateTP;
                if (candidate) {
                  candidateTP = articles.find(
                    a =>
                      a.type === 'TalkingPoints' &&
                      a.appliesTo.includes(candidate.uid)
                  );
                  contest = contests.find(c => c.uid === candidate.inContest);
                  if (contest) {
                    seat = seats.find(s => s.uid === contest.seatId);
                  }
                }
                return (
                  <CandidateHolder
                    candidate={candidate}
                    candidateTP={candidateTP}
                    seat={seat}
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
                  seatTypesMasterList={seatTypesMasterList}
                />
              )}
            />
            <Route
              path="/issues/:id"
              component={props => {
                console.log(
                  'logging from routing for /issues/:id -- issues are',
                  issues,
                  'param is',
                  props.match.params.id
                );
                const issue = issues.find(
                  issue => props.match.params.id === issue.id
                );
                return <IssuePrimer {...props} issue={issue} />;
              }}
            />
            <Route
              path="/issues"
              component={props => <Issues {...props} issues={issues} />}
            />
            <Route
              path="/article/:id"
              component={props => {
                const reading = articles.find(
                  reading => props.match.params.id === reading.friendlyId
                );
                return <ReadingHolder reading={reading} {...props} />;
              }}
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

export default App;

// <Route exact path="/" component={Home} />
