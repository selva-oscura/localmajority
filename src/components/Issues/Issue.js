import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoSuchIssue from './NoSuchIssue';
import ArticleLink from '../common/ArticleLink';
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
    const { issue, articles } = this.props;
    const subIssues = issue ? issue.subIssues : [];

    return issue ? (
      <div className="Issue">
        <h2>{issue.title} -- HEY! COMPARE THIS WITH A NON-ISSUE TAG</h2>
        {subIssues.map(subIssue => (
          <Aux key={subIssue.title}>
            <h4>{subIssue.title}</h4>
            {articles.map(article => {
              let articleThumbnail = article.thumbnail
                ? article.thumbnail
                : '../images/economy.jpg';
              return article.tags.includes(subIssue.slug) ? (
                <ArticleLink
                  key={`${subIssue.title}-${article.slug}`}
                  article={article}
                  slug={article.slug}
                  imageSrc={articleThumbnail}
                  title={article.title}
                  articleType={article.articleType}
                  author={article.author}
                  updatedAt={article.updatedAt}
                  tagRoute="research"
                  tags={article.tags}
                />
              ) : null;
            })}
          </Aux>
        ))}
      </div>
    ) : (
      <div className="Issue">
        <h2>
          {this.props.match.params.slug} -- HEY! COMPARE THIS WITH AN ISSUE TAG
        </h2>
        {articles.map((article, i) => (
          <Aux key={i}>
            <Link to={`/articles/${article.slug}`}>
              <p className="row">
                <span className="col-sm-4">{article.articleType}</span>
                <span className="col-sm-8">
                  {article.title} -- {article.tags.join(', ')}}
                </span>
              </p>
            </Link>
          </Aux>
        ))}
      </div>
    );
  }
}

export default Issue;
