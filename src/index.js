import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Home from './components/Home/Home';
import CandidateHolder from './components/Candidates/CandidateHolder';
import Candidates from './components/Candidates/Candidates';
import DistrictHolder from './components/Districts/DistrictHolder';
import Districts from './components/Districts/Districts';
import Issue from './components/Issues/Issue';
import Issues from './components/Issues/Issues';
import ArticleHolder from './components/Articles/ArticleHolder';
import Elements from './components/common/Elements';
import FourZeroFour from './components/FourZeroFour';
import articles from './data/list-home.json';
import candidates from './data/candidates.json';
import districts from './data/districts.json';
import issues from './data/issues.json';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<App>
			<Switch>			
				<Route exact path="/" 
					component={Home}
				/>
				<Route path="/districts/:id"
					component={(props) => {
						const district = districts.find(district => props.match.params.id === district.id.slice('district-'.length));
						const candidate = candidates.find(candidate => candidate.district.slice("District ".length) === props.match.params.id);
						return <DistrictHolder {...props} district={district} candidate={candidate} />;
					}}
				/>
				<Route path="/districts" 
					component={(props) => <Districts {...props} districts={districts}/>}
				/>
				<Route path="/candidates/:id"
					component={(props) => {
						const candidate = candidates.find(candidate => props.match.params.id === candidate.id);
						return <CandidateHolder candidate={candidate} {...props} />;
					}}
				/>
				<Route path="/candidates"
					component={(props) => <Candidates {...props} candidates={candidates} />}
				/>
				<Route path="/issues/:id" 
					component={(props) => {
						const issue = issues.find(issue => props.match.params.id === issue.id);
						return <Issue {...props} issue={issue} />
					}}
				/>
				<Route path="/issues" 
					component={(props) => <Issues {...props} issues={issues} />}
				/>
				<Route path="/article/:id"
					component={(props) => <ArticleHolder {...props} />}
				/>
				<Route path="/elements"
					component={Elements}
				/>
				<Route component={FourZeroFour}/>
			</Switch>
		</App>
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();
