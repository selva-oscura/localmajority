import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import RelatedReports from './RelatedReports';
import Aux from '../common/Aux';
import ImageWithBackgroundPlaceholderImage from '../common/ImageWithBackgroundPlaceholderImage';
import Loading from '../common/Loading';
import Offline from '../common/Offline';
import Section from '../common/Section/Section';
import Tags from '../common/Tags/Tags';
import {
  getMostRecentUpdateTimestamp,
  prettifyDateAndTime,
} from '../../utils/functions';
import loremIpsum from '../../data/loremIpsum';

class Report extends Component {
  componentDidMount() {
    const article = this.props.articleDetail
      ? this.props.articleDetail
      : this.props.article;
    if (!article) {
      return this.props.history.push('/reports');
    }
    document.title = `Local Majority | ${article.articleType} | ${
      article.title
    }`;
  }

  componentDidUpdate(prevProps, prevState) {
    // only consider updating localStorage if query is resolved and successful
    if (this.props.ArticleDetailBySlug.articles) {
      const mostRecentUpdateToArticleDetailBySlug = getMostRecentUpdateTimestamp(
        this.props.ArticleDetailBySlug.articles[0]
      );
      // only update localStorage if no articleDetail (freeze-dried record passed to component by App) or if the timestamp for ArticleDetailBySlug (grapql query) includes data newer than timestamp in articleDetail (freeze-dried record)
      if (
        !this.props.articleDetail ||
        this.props.articleDetail.timestamp <
          mostRecentUpdateToArticleDetailBySlug
      ) {
        let now = new Date().getTime();
        let details = this.props.ArticleDetailBySlug.articles.map(article => {
          const imageSm =
            article.imageSm && article.imageSm.url ? article.imageSm.url : null;
          const imageHero =
            article.imageHero && article.imageHero.url
              ? article.imageHero.url
              : null;
          return {
            ...article,
            imageSm,
            imageHero,
          };
        })[0];
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
    // console.log('this.props', this.props);
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
    const tags = article.tags ? article.tags.map(tag => tag.slug) : [];
    const relatedReports = this.props.relatedArticles;

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
                imageSrc={article.imageHero}
                imageAlt=""
                aspectRatioInPercent="25"
              />

              {isOffline && <Offline timestamp={article.timestamp} />}
              <h2>{article.title}</h2>
              {article.author && <h3>by {article.author}</h3>}
              <p>Last updated: {prettifyDateAndTime(article.updatedAt)}</p>
              {/*<p>
                {`Article tags: `}
                {tags ? tags.join(', ') : 'No Tags'}
              </p>*/}
              <Tags tags={article.tags} tagRoute="reports" />

              {article.content_html ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.content_html,
                  }}
                />
              ) : (
                loremIpsum.map((p, i) => formatLoremIpsum(p, i))
              )}
            </article>
          </div>
        </Section>
        {relatedReports && relatedReports.length ? (
          <Section
            hasContainer={true}
            spacingAbove={3}
            spacingBelow={3}
            background="light"
          >
            <RelatedReports articles={relatedReports} />
          </Section>
        ) : null}
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
