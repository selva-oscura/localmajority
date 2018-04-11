import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoSuchIssue from './NoSuchIssue';
import Aux from '../common/Aux';

class Issue extends Component {
  componentDidMount() {
    this.props.issue && this.props.issue.title
      ? (document.title = `Local Majority | Research | ${
          this.props.issue.title
        }`)
      : (document.title = 'Local Majority | Research');
  }

  render() {
    const { issue } = this.props;

    if (!issue) {
      return <NoSuchIssue issueParam={this.props.match.params.slug} />;
    }

    const { subIssues } = issue;

    return (
      <div className="Issue">
        <h2>{issue.title}</h2>
        {subIssues.map((subIssue, i) => (
          <Aux key={i}>
            <h4>{subIssue.title}</h4>
            {subIssue.articles.map((article, j) => (
              <Aux key={j}>
                <Link to={`/articles/${article.slug}`}>
                  <p className="row">
                    <span className="col-sm-4">{article.articleType}</span>
                    <span className="col-sm-8">{article.title}</span>
                  </p>
                </Link>
              </Aux>
            ))}
          </Aux>
        ))}
      </div>
    );
  }
}

export default Issue;
