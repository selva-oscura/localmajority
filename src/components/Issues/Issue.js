import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../common/Aux';

class Issue extends Component {
  render() {
    const { issue } = this.props;
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
