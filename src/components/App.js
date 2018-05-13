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
import Elements from './common/Elements';
import Loading from './common/Loading';
import Section from './common/Section/Section';
import FourZeroFour from './FourZeroFour';
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
    // this is for statesDetails and candidatesDetails
    // detail specifies whether it is statesDetails or candidatesDetails
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
    // delete next section once we have state data in database

    const stateFakeData = [
      {
        title: 'Florida',
        text:
          "Democrats make up nearly 50% in this heavily-gerrymandered state but have little representation in state government. Only 40% in the Senate and 33% in the House. It's time to turn the state Blue!",
      },
      {
        title: 'Michigan',
        text:
          "Democrats make up 49.8% of the electorate but are not represented in this heavily-gerrymandered and voter-suppressed state. The Dems only have 43% of the Senate and only 29% of the Senate! With all the term limits, it's time to turn this state back to BLUE!",
      },
      {
        title: 'Minnesota',
        text:
          'All 134 members of the State House are up for election in November 2018, and Democrats only need to flip 11 seats to regain control. In 2016 Hillary carried Minnesota by 1.4%, winning 12 of the districts that are currently occupied by nervous Republicans.',
      },
    ];

    // RETURN HERE -- END
    // END -- delete previous section once we have state info in the database

    // RETURN HERE
    // delete next next section once we have real issues and articles
    const issueTitles = [
      'Economy',
      'Justice',
      'Environment',
      'Health Care',
      'Foreign Policy & Defense',
      'Education',
      'Technology',
      'Governance',
    ];
    const statesForIssues = ['Michigan', 'Florida', 'Minnesota'];
    const issues = [];
    issueTitles.forEach((title, i) => {
      let subIssues = [];
      let date = new Date().toISOString();
      let author = 'somebody or other';
      for (let j = 1; j < 5; j++) {
        const sockPuppetArticles = [];
        for (let k = 1; k < 4; k++) {
          let type = '';
          if (k === 1) {
            type = 'Talking Points';
          } else {
            type = 'Research Article';
          }
          let articleTitle = `Fake Article title blah, blah, blah ${title} - ${j} - ${k}`;
          let numStates = Math.floor(Math.random() * 3);
          let stateChoice = Math.floor(Math.random() * 3);
          let statesForArticle = [];
          if (numStates === 1) {
            statesForArticle.push(statesForIssues[stateChoice]);
          } else if (numStates === 2) {
            statesForArticle = statesForIssues
              .slice(0, stateChoice)
              .concat(statesForIssues.slice(stateChoice + 1));
          }
          sockPuppetArticles.push({
            id: `${title}_${j}_${k}`,
            title: articleTitle,
            slug: articleTitle
              .split(' ')
              .join('-')
              .toLowerCase(),
            tags: [title, `sub-topic-${title}-${j}`].concat(statesForArticle),
            articleType: type,
            createdAt: date,
            updatedAt: date,
            author: author,
          });
        }

        subIssues.push({
          id: `${title}_${j}`,
          title: `Fake Subtopic ${title} - ${j}`,
          slug: `sub-topic-${title}-${j}`,
        });
        articles = articles.concat(sockPuppetArticles);
      }
      issues.push({
        id: i,
        title: title,
        slug: title
          .split(' ')
          .join('-')
          .toLowerCase(),
        subIssues: subIssues,
      });
    });
    // RETURN HERE -- END
    // END -- delete previous section once we have real issues and articles

    return (
      <Switch>
        <Route
          exact
          path="/"
          component={props => (
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
            const articleTags = article.tags;
            let relatedArticles = [];
            if (articleTags) {
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
            seats &&
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
