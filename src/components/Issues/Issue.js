import React, { Component } from 'react';
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
        <h2>{issue.title}</h2>
        {subIssues.map(subIssue => (
          <Aux key={subIssue.title}>
            <h4>{subIssue.title}</h4>
            {articles.map(article => {
              let articleThumbnail = article.thumbnail
                ? article.thumbnail
                : 'https://placekitten.com/400/300';
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
                  tagRoute="reports"
                  tags={article.tags}
                />
              ) : null;
            })}
          </Aux>
        ))}
      </div>
    ) : (
      <div className="Issue">
        <h2>{this.props.match.params.slug}</h2>
        {articles.map((article, i) => {
          let articleThumbnail = article.thumbnail
            ? article.thumbnail
            : 'https://placekitten.com/400/300';
          return (
            <ArticleLink
              key={`${article.slug}`}
              article={article}
              slug={article.slug}
              imageSrc={articleThumbnail}
              title={article.title}
              articleType={article.articleType}
              author={article.author}
              updatedAt={article.updatedAt}
              tagRoute="reports"
              tags={article.tags}
            />
          );
        })}
      </div>
    );
  }
}

export default Issue;
