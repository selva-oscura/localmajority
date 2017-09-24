import React, { Component } from 'react';
import Button from './Button';
import TwitterTimeline from './TwitterTimeline';
import { SocialIcon, SocialIcons } from 'react-social-icons';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import markdownExample from '../../data/sampleFilesForImport/sample.md';
// import htmlExample from '../public/articles/4-ways-to-keep-your-nonprofit-safe.html'

console.log('markdownExample', markdownExample)

var input = '# This is a header\n\nAnd this is a paragraph';
let urls = [
  'http://jaketrent.com',
  'http://twitter.com/jaketrent',
  'http://linkedin.com/in/jaketrent',
  'http://www.pinterest.com/jaketrent/artsy-fartsy/'
];


class Elements extends Component {
  constructor(props, context) {
	  super(props, context);
	  this.state = {
			count: 0,
			errors: {},
			articles: {},
			candidates: {},
			districts: {},
			issues: {},
			parties: {},
			races: {},
		}
	  this.decrementCounter=this.decrementCounter.bind(this);
	  this.incrementCounter=this.incrementCounter.bind(this);
  }

  fetchData(){
  	var fields = ["parties", "issues", "candidates", "articles", "districts", "races"];
  	var queries = ["Party", "Issue", "Candidate", "Article", "District", "Race"];
  	queries.forEach((query, i) => {
	  	var apiOptions = {
	  		url: `https://cmsdev.localmajority.net/nuxeo/api/v1/search/lang/NXQL/execute?query=select%20*%20from%20${query}`,
	  		headers: {
					"Authorization": "Basic anNvbjpjc3d4V2xSdk5XTnBHN0FKTzhIeg==",
			    'accept': 'application/json'
	  		},
	  	}
	  	axios(apiOptions)
	   		.then(res => {
	   			console.log(`${query} response`, res);
	   			if(res.data && res.data.entries){
	   				// console.log('data entries', res.data.entries);
	   				res.data.entries.forEach((entry) => {
	   					console.log('entry', entry);
	   				})
	   			// 	let parties = res.data.entries.map(entry => (
	   			// 			entry['title'],
	   			// 			entry.properties['party:abbrev'],
	   			// 			entry.properties['party:color'],
	   			// 			entry.properties['party:order'],
	   			// 			entry.properties['party:homepageUrl'],
	   			// 			entry.properties['party:iconUrl'],
	   			// 			entry.title
	   			// 		)
	   			// 	);
	   				let state = Object.assign({},this.state);
	   				state[fields[i]] = res.data.entries;
	   				this.setState(state);
	   				// console.log('parties are res.data.entries')
	   			}
	   		})
	   		.catch(err => {
	   			console.log('aaaaccckkkk from axios',err);
	   			this.setState({errors: err});
	   		})  		
  	})
	}

  decrementCounter(){
  	let count = this.state.count;
  	this.setState({ count: count-1 });
  }
  incrementCounter(){
  	let count = this.state.count;
  	this.setState({ count: count+1 });
  }
  componentWillMount(){
  	this.fetchData();
  }
	render(){
		return (
			<article>
				
				<h1>Elements: this page at ./src/components/common/Elements</h1>
				
				<hr />
				
				<h2>Button: file at ./src/components/common/Button</h2>
				<h3>can be used with link parameter to make a linked button (http or https should start link for offsite, relative links starting with / for onsite)</h3>
				<div className="row">
					<Button
						link="https://blah.com"
						kind="primary"
						label="Primary Button offsite"
					/>
					<Button
						link="/issues"
						kind="secondary"
						label="Secondary Button onsite"
					/>
					<Button
						link="/districts/2"
						kind="tertiary"
						label="Tertiary Button onsite"
					/>
				</div>
				<div>			
				<h3>can be used to submit form, update state, or similar non-link purposes when paired with a handleClick function</h3>
					<Button
						kind="tertiary"
						label="decrement counter"
						handleClick={this.decrementCounter}
					/>
					<span style={{width: '100px', display: 'inline-block'}}><b>Counter:</b> {this.state.count} </span>
					<Button
						kind="secondary"
						label="increment counter"
						handleClick={this.incrementCounter}
					/>
				</div>

				<hr />

				<h2>SocialIcon: documentation for SocialIcon (react-social-icons) can be found at <a href="http://jaketrent.github.io/react-social-icons/" target="new">http://jaketrent.github.io/react-social-icons/</a></h2>
				<h3>SocialIcon&rsquo;s css defaults are imported from the npm'd component, but <code>margin-right: 8px</code> was set in the global scope in index.css</h3>
				<h3><code>url</code> parameter generally used to determine which icon displayed</h3>
				<div className="row">
					<SocialIcon 
						url={`https://www.facebook.com/${"localmajority"}`}
					/>
					<SocialIcon 
						url={`https://www.twitter.com/${"localmajority"}`}
					/>
					<h3><code>network</code> parameter can also be used to denote network if url doesn't make it clear</h3>
					<SocialIcon 
						url="http://jaketrent.com"
						network="tumblr"
					/>
					<h3><code>color</code> parameter can be used to override default color associated with network</h3>
					<SocialIcon 
						network="twitter"
						color="#ff5a01"
					/>
					<h3>multiple icons can be set using <code>SocialIcons</code> API and an array</h3>
					<SocialIcons urls={urls} />
					<h3>color for multiple icons can be set using <code>SocialIcons</code> API, an array, and <code>color</code> parameter</h3>
					<SocialIcons urls={urls} color="black" />
				</div>

				<hr />

				<h2>TwitterTimeline: file at ./src/components/common/TwitterTimeline</h2>
				<div className="row">
					<TwitterTimeline
						twitterHandle="1_selva_oscura"
					/>
				</div>
				<hr />
				<h2>Markdown: </h2>

			</article>	
		)
	}
};

export default Elements;
				// <div className="row">
				// 	<ReactMarkdown source={input} />
				// 	<iframe src="../../../public/articles/4-ways-to-keep-your-nonprofit-safe.html"></iframe>
				// </div>
