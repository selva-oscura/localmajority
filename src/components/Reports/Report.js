import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import RelatedReports from './RelatedReports';
import NoSuchReport from './NoSuchReport';
import Aux from '../common/Aux';
import ImageWithBackgroundPlaceholderImage from '../common/ImageWithBackgroundPlaceholderImage';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import Primer from '../common/Primers/Primer';
import Section from '../common/Section/Section';
import {
  getMostRecentUpdateTimestamp,
  prettifyDateAndTime,
} from '../../utils/functions';
import loremIpsum from '../../data/loremIpsum';

class Report extends Component {
  constructor(props) {
    super(props);
    console.log('this.props', this.props);
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
        this.props.articleDetail.timestamp <
          mostRecentUpdateToArticleDetailBySlug
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
    const formatLoremIpsum = (p, i) => {
      if (p.format === 'title') {
        return <h3 key={i}>{p.content}</h3>;
      } else if (p.format === 'subtitle') {
        return (
          <h4 key={i}>
            <i>{p.content}</i>
          </h4>
        );
      }
      return <p key={i}>{p.content}</p>;
    };
    const isOffline =
      this.props.ArticleDetailBySlug.error &&
      this.props.ArticleDetailBySlug.error.message.indexOf('Network error') > -1
        ? true
        : false;

    const article = this.props.articleDetail
      ? this.props.articleDetail
      : this.props.article;
    const hero = article.heroImg ? article.heroImg : '';
    const relatedReports = this.props.relatedArticles;

    if (!article) {
      return <NoSuchReport articleId={this.props.match.params.slug} />;
    }

    return (
      <Aux>
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background=""
        >
          <div className="Report row">
            <article className="col-12">
              <ImageWithBackgroundPlaceholderImage
                imageSrc={hero}
                imageAlt=""
                aspectRatioInPercent="25"
              />

              {isOffline && <Offline timestamp={article.timestamp} />}
              <h2>{article.title}</h2>
              <p>Last updated: {prettifyDateAndTime(article.updatedAt)}</p>
              <p>
                {`Article tags: `}
                {article.tags ? article.tags.join(', ') : 'No Tags'}
              </p>

              {article.content ? (
                <Primer primer={article} />
              ) : (
                loremIpsum.map((p, i) => formatLoremIpsum(p, i))
              )}
            </article>
          </div>
        </Section>
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="light"
        >
          {relatedReports && relatedReports.length ? (
            <RelatedReports articles={relatedReports} />
          ) : null}
        </Section>
      </Aux>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.ArticleDetailBySlug, {
    name: 'ArticleDetailBySlug',
    options: props => {
      return { variables: { slug: props.match.params.slug } };
    },
  })
)(Report);