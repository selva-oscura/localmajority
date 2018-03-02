import React, { Component } from 'react';
import Aux from '../common/Aux';
import Loading from '../common/Loading';
import NoSuchArticle from './NoSuchArticle';

class Article extends Component {
  constructor(props) {
    super(props);
    const { article } = this.props;
    console.log('article from Article', article);
    document.title = article
      ? `Local Majority | ${article.articleType} | ${article.title}`
      : 'Local Majority | Unrecognized Article';
  }

  render() {
    const { article } = this.props;
    console.log('article from Article', article);

    if (!article) {
      return <NoSuchArticle articleId={this.props.match.params.slug} />;
    }
    return (
      <div className="Article">
        <article>
          <h2>{article.title}</h2>
          <p>Its type is {article.articleType}</p>
          <p>Its slug is {article.slug}</p>
          <p>We really need some data in the database....</p>
        </article>
      </div>
    );
  }
}

export default Article;
