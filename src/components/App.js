import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header';
import Home from './Home/Home';
import CandidateHolder from './Candidates/CandidateHolder';
import Candidates from './Candidates/Candidates';
import DistrictHolder from './Districts/DistrictHolder';
import Districts from './Districts/Districts';
import Issue from './Issues/Issue';
import Issues from './Issues/Issues';
import ArticleHolder from './Articles/ArticleHolder';
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
        districts: [],
        issues: [],
        issuePrimers: [],
        parties: [],
        seats: [],
        states: [],
        talkingPoints: [],
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
            if (queryField.all === 'candidates') {
              res.data.map(candidate => {
                candidate.friendlyId = candidate.urlPath.slice(
                  '/candidate/'.length
                );
                return candidate;
              });
            } else if (queryField.all === 'articles') {
              res.data.map(article => {
                article.friendlyId = article.urlPath.slice(
                  '/article/'.length
                );
                return article;
              });
            }
            let state = this.state;
            state[queryField.stateName] = res.data;
            this.setStateAndLocalStorage(state);
          } else {
            throw Error('error on', queryField.stateName, res);
          }
        })
        .catch(err => {
          console.log(
            `error acessing data for ${queryField.tableName} table`,
            JSON.stringify(err)
          );
          let state = this.state;
          state.errors = err;
          this.setStateAndLocalStorage(state);
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
      districts,
      issues,
      issuePrimers,
      parties,
      seats,
      states,
      talkingPoints,
    } = this.state;
    // console.log('candidates before declaration', candidates)
    // const { articles, candidates, contests, districts, issues, issuePrimers, parties, seats, states, talkingPoints } = this.state.fixtures;
    // console.log('candidates after declaration', candidates)
    return (
      <div className="App">
        <Header props={this.props.children} />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              component={props => {
                return (
                  <Home
                    candidates={candidates}
                    articles={articles}
                    talkingPoints={talkingPoints}
                  />
                );
              }}
            />
            <Route
              path="/districts/:id"
              component={props => {
                const district = districts.find(
                  district =>
                    props.match.params.id ===
                    district.id.slice('district-'.length)
                );
                const candidate = candidates.find(
                  candidate =>
                    candidate.district.slice('District '.length) ===
                    props.match.params.id
                );
                return (
                  <DistrictHolder
                    {...props}
                    district={district}
                    candidate={candidate}
                  />
                );
              }}
            />
            <Route
              path="/districts"
              component={props => (
                <Districts {...props} districts={districts} />
              )}
            />
            <Route
              path="/candidates/:id"
              component={props => {
                const candidate = candidates.find(
                  candidate => props.match.params.id === candidate.friendlyId
                );
                return <CandidateHolder candidate={candidate} {...props} />;
              }}
            />
            <Route
              path="/candidates"
              component={props => (
                <Candidates {...props} candidates={candidates} />
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
                return <Issue {...props} issue={issue} />;
              }}
            />
            <Route
              path="/issues"
              component={props => <Issues {...props} issues={issues} />}
            />
            <Route
              path="/article/:id"
              component={props => {
                const article = articles.find(
                  article => props.match.params.id === article.friendlyId
                );
                return <ArticleHolder article={article} {...props} />;
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
