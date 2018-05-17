import React, { Component } from 'react';
import Button from './Button';
import TwitterTimeline from './TwitterTimeline';
import { SocialIcon, SocialIcons } from 'react-social-icons';
// import axios from 'axios';

let urls = [
  'http://jaketrent.com',
  'http://twitter.com/jaketrent',
  'http://linkedin.com/in/jaketrent',
  'http://www.pinterest.com/jaketrent/artsy-fartsy/',
];

class Elements extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 0,
      errors: {},
      articles: {},
      candidates: {},
      contests: {},
      districts: {},
      issues: {},
      issuePrimers: {},
      parties: {},
      seats: {},
      states: {},
      talkingPoints: {},
    };
    this.decrementCounter = this.decrementCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  // fetchData() {
  //   // var fields = ["parties", "issues", "candidates", "articles", "districts", "races"];
  //   // var queries = ["Party", "Issue", "Candidate", "Article", "District", "Race"];
  //   // const fields = ["parties", "issues"];
  //   const queries = [
  //     // {tableName:"Article", propsName:"articles"},
  //     // {tableName:"Candidate", propsName:"candidates"},
  //     // {tableName:"Contest", propsName:"contests"},
  //     // {tableName:"District", propsName:"districts"},
  //     // {tableName:"Issue", propsName:"issues"},
  //     // {tableName:"IssuePrimer", propsName:"issuePrimers"},
  //     // {tableName:"Party", propsName:"parties"},
  //     // {tableName:"Seat", propsName:"seats"},
  //     // {tableName:"State", propsName:"states"},
  //     // {tableName:"TalkingPoints", propsName:"talkingPoints"},
  //   ];
  //   queries.forEach(query => {
  //     const apiOptions = {
  //       url: `https://cmsdev.localmajority.net/nuxeo/api/v1/search/lang/NXQL/execute?query=select%20*%20from%20${
  //         query.tableName
  //       }`,
  //       headers: {
  //         Authorization: 'Basic anNvbjpjc3d4V2xSdk5XTnBHN0FKTzhIeg==',
  //         'X-NXproperties': '*',
  //         'content-type': 'application/json; charset=utf-8',
  //       },
  //     };
  //     // 'X-NXRepository': 'default',
  //     // 'Accept': 'application/json'
  //     console.log('query', apiOptions.url);
  //     axios(apiOptions)
  //       .then(res => {
  //         if (res.status === 200 && res.data && res.data.entries) {
  //           // console.log('data entries', res.data.entries);
  //           let state = Object.assign({}, this.state);
  //           state[query['propsName']] = res.data.entries;
  //           this.setState(state);
  //           // if(query.propsName==="articles"){
  //           // 	// let articleSpace = document.getElementById('article-space');
  //           // 	res.data.entries.forEach(article => {
  //           // 		console.log('should be appending...', JSON.stringify(article.properties['article:body']));
  //           // 		document.getElementById('article-space').innerHTML = article.properties['article:body'];
  //           // 	})
  //           // }
  //         }
  //       })
  //       .catch(err => {
  //         console.log(
  //           `error acessing data for ${query.tableName} table`,
  //           JSON.stringify(err)
  //         );
  //         this.setState({ errors: err });
  //       });
  //   });
  // }

  decrementCounter() {
    let count = this.state.count;
    this.setState({ count: count - 1 });
  }
  incrementCounter() {
    let count = this.state.count;
    this.setState({ count: count + 1 });
  }
  // componentWillMount(){
  // }
  componentDidMount() {
    this.fetchData();
    // let articles = this.state.articles;
    let articles = [
      '<p>On 0</p>\r\n<p>with <strong>different</strong> text styles</p>\r\n<p>&nbsp;</p>\r\n<table style="height: 61px;" width="314">\r\n<tbody>\r\n<tr>\r\n<td>cellone</td>\r\n<td>1b</td>\r\n<td>1c</td>\r\n<td>1d</td>\r\n</tr>\r\n<tr>\r\n<td>asdfsda</td>\r\n<td>dsaf</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>faslkdjflskadjf</p>\r\n<p>&nbsp;</p>',
      '<p>On 1</p>\r\n<p>with <strong>different</strong> text styles</p>\r\n<p>&nbsp;</p>\r\n<table style="height: 61px;" width="314">\r\n<tbody>\r\n<tr>\r\n<td>cellone</td>\r\n<td>1b</td>\r\n<td>1c</td>\r\n<td>1d</td>\r\n</tr>\r\n<tr>\r\n<td>asdfsda</td>\r\n<td>dsaf</td>\r\n<td>&nbsp;</td>\r\n<td>&nbsp;</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>faslkdjflskadjf</p>\r\n<p>&nbsp;</p>',
    ];
    console.log('this.state.articles', articles);
    if (articles.length) {
      let articleSpace = document.getElementById('article-space');
      articles.forEach((article, i) => {
        console.log('count', i);
        let d = document.createElement('div');
        d.id = `article-{$i}`;
        d.innerHTML = article;
        articleSpace.appendChild(d);
      });
    }
  }
  render() {
    console.log('STATE:', this.state);
    return (
      <article>
        <h1>Elements: this page at ./src/components/common/Elements</h1>

        <hr />

        <h2>Button: file at ./src/components/common/Button</h2>
        <h3>
          can be used with link parameter to make a linked button (http or https
          should start link for offsite, relative links starting with / for
          onsite)
        </h3>
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
            link="/states/2"
            kind="tertiary"
            label="Tertiary Button onsite"
          />
        </div>
        <div>
          <h3>
            can be used to submit form, update state, or similar non-link
            purposes when paired with a handleClick function
          </h3>
          <Button
            kind="tertiary"
            label="decrement counter"
            handleClick={this.decrementCounter}
          />
          <span style={{ width: '100px', display: 'inline-block' }}>
            <b>Counter:</b> {this.state.count}{' '}
          </span>
          <Button
            kind="secondary"
            label="increment counter"
            handleClick={this.incrementCounter}
          />
        </div>

        <hr />

        <h2>
          SocialIcon: documentation for SocialIcon (react-social-icons) can be
          found at{' '}
          <a href="http://jaketrent.github.io/react-social-icons/" target="new">
            http://jaketrent.github.io/react-social-icons/
          </a>
        </h2>
        <h3>
          SocialIcon&rsquo;s css defaults are imported from the npm'd component,
          but <code>margin-right: 8px</code> was set in the global scope in
          index.css
        </h3>
        <h3>
          <code>url</code> parameter generally used to determine which icon
          displayed
        </h3>
        <div className="row">
          <SocialIcon url={`https://www.facebook.com/${'localmajority'}`} />
          <SocialIcon url={`https://www.twitter.com/${'localmajority'}`} />
          <h3>
            <code>network</code> parameter can also be used to denote network if
            url doesn't make it clear
          </h3>
          <SocialIcon url="http://jaketrent.com" network="tumblr" />
          <h3>
            <code>color</code> parameter can be used to override default color
            associated with network
          </h3>
          <SocialIcon network="twitter" color="#ff5a01" />
          <h3>
            multiple icons can be set using <code>SocialIcons</code> API and an
            array
          </h3>
          <SocialIcons urls={urls} />
          <h3>
            color for multiple icons can be set using <code>SocialIcons</code>{' '}
            API, an array, and <code>color</code> parameter
          </h3>
          <SocialIcons urls={urls} color="black" />
        </div>

        <hr />

        <h2>
          TwitterTimeline: file at ./src/components/common/TwitterTimeline
        </h2>
        <div className="row">
          <TwitterTimeline twitterHandle="local_majority" />
        </div>
        <hr />
        <h2>Article text</h2>
        <div id="article-space" />
      </article>
    );
  }
}

export default Elements;

//							<div dangerouslySetInnerHtml=>{article.properties['article:body']}</div>
