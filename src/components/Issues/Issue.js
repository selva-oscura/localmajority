import React, { Component } from 'react';
import axios from 'axios';
import issues from '../../data/issues.json';

class Issue extends Component {
  componentDidMount() {
    const url = 'http://selva-oscura.net/projects/localMajority/articles/';
    const param = this.props.match.params.id;
    axios
      .get(url + param + '.html')
      .then(res => {
        if (res.status === 200) {
          document.getElementById('article-space').innerHTML = res.data;
        } else {
          console.log('error fetching', param, 'status', res.status, '\n', res);
          document.getElementById('article-space').innerHTML =
            "<p>We're sorry, but there was an error fetching your article.</p>";
        }
      })
      .catch(err => {
        console.log('error fetching', param, err);
        document.getElementById('article-space').innerHTML =
          "<p>We're sorry, but there was an error fetching your article.</p>";
      });

    // const candidateQuery = "https://cmsdev.localmajority.net/nuxeo/nxfile/default/851d847b-0cb1-4767-9d30-bfbfe34e0beb/files:files/0/file/lorem.txt"
    // const apiOptions = {
    //   url: "https://cmsdev.localmajority.net/nuxeo/nxfile/default/851d847b-0cb1-4767-9d30-bfbfe34e0beb/files:files/0/file/lorem.txt",
    //   headers: {
    //     "Authorization": "Basic anNvbjpjc3d4V2xSdk5XTnBHN0FKTzhIeg==",
    //     'X-NXproperties': '*',
    //     "content-type": "application/json; charset=utf-8",
    //   },
    // }
    //     // 'X-NXRepository': 'default',
    //     // 'Accept': 'application/json'
    //   console.log('query', apiOptions.url);
    // axios(apiOptions)
    // .then(res => {
    //   if (res.status === 200) {
    //     document.getElementById('candidate-space').innerHTML = res.data;
    //   } else {
    //     console.log('error fetching candidate bio', 'status', res.status, '\n', res);
    //     document.getElementById('article-space').innerHTML = "<p>We\'re sorry, but there was an error fetching your article.</p>";
    //   }
    // }).catch(err => {
    //   console.log('error fetching candidate bio', err);
    //   document.getElementById('article-space').innerHTML = "<p>Bio didn't arrive.</p>";
    // });
  }
  render() {
    console.log('this.props', this.props);
    const issue = this.props.issue;
    // console.log('props from Issue', this.props);
    // console.log('issue from Issue', issue);
    return (
      <div className="Issue">
        <h2>{issue.title}</h2>
        <h3>by {issue.author}</h3>
        <h6>
          {issue.time.slice(0, issue.time.length - 15)} --{' '}
          {Math.floor(issue.contentLength / 400)} minute read
        </h6>
        <p>
          <b>Summary:</b> {issue.summary}
        </p>
        <div id="article-space" />
        <div id="candidate-space" />
      </div>
    );
  }
}

export default Issue;
