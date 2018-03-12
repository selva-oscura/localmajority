import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import Primer from '../common/Primers/Primer';
import Aux from '../common/Aux';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import NoSuchArticle from './NoSuchArticle';
import { getMostRecentUpdateTimestamp, prettifyDateAndTime } from '../../utils/functions';

class Article extends Component {
  constructor(props) {
    super(props);
    const { article } = this.props;
    console.log('article from Article', article);
    document.title = article
      ? `Local Majority | ${article.articleType} | ${article.title}`
      : 'Local Majority | Unrecognized Article';
  }

  componentDidUpdate(prevProps, prevState) {
    // only consider updating localStorage if query is resolved and successful
    if (this.props.ArticleDetailBySlug.Article) {
      const mostRecentUpdateToArticleDetailBySlug = getMostRecentUpdateTimestamp(
        this.props.ArticleDetailBySlug.Article
      );
      // only update localStorage if no articleDetail (freeze-dried record passed to component by App) or if the timestamp for ArticleDetailBySlug (grapql query) includes data newer than timestamp in articleDetail(freeze-dried record)
      if (
        !this.props.articleDetail ||
        this.props.articleDetail.timestamp < mostRecentUpdateToArticleDetailBySlug
      ) {
        let now = new Date().getTime();
        let details = { ...this.props.ArticleDetailBySlug.Article };
        details.timestamp = now;
        this.props.updateStateDetail(
          'articlesDetails',
          this.props.match.params.slug,
          details
        );
      }
    }
  }

  render() {
    const isLoading = this.props.ArticleDetailBySlug.loading;
    if (isLoading) {
      return <Loading />;
    }

    const isOffline =
      this.props.ArticleDetailBySlug.error &&
      this.props.ArticleDetailBySlug.error.message.indexOf('Network error') > -1
        ? true
        : false;

    const article = this.props.articleDetail
      ? this.props.articleDetail
      : this.props.article;
    console.log('article at this point', article);
    console.log('article content at this point', article.content);

    if (!article) {
      return <NoSuchArticle articleId={this.props.match.params.slug} />;
    }
    return (
      <div className="Article">
        <article>
          <h2>{article.title}</h2>
          <p>Last updated: {prettifyDateAndTime(article.updatedAt)}</p>
          <p>Its type is {article.articleType}</p>
          <p>Its slug is {article.slug}</p>
          {article.content && <Primer primer={article} />}
        </article>
      </div>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.ArticleDetailBySlug, {
    name: 'ArticleDetailBySlug',
    options: props => {
      return { variables: {slug: props.match.params.slug } };
    },
  })
)(Article);
