import React, { Component } from 'react';
import FeaturedReport from '../Reports/FeaturedReport';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import ArticleCard from '../common/Cards/ArticleCard';
import Aux from '../common/Aux';
import Section from '../common/Section/Section';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';
import { slugToTitleCase } from '../../utils/functions';

class Reports extends Component {
  state = {
    tagSelected: this.props.match.params.slug,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'All'
      ? this.props.history.push('/reports')
      : this.props.history.push(`/reports/${selectedValue}`);
  };

  componentDidMount() {
    console.log('this.props', this.props, 'this.state', this.state);
    let { articles } = this.props;
    const tagSelected = this.state.tagSelected;
    articles = tagSelected
      ? articles.filter(article =>
          article.tags.some(tag => tag.slug === tagSelected)
        )
      : articles;

    if (!articles.length) {
      return this.props.history.push('/reports');
    }
    this.props.tag
      ? (document.title = `Local Majority | Reports | ${slugToTitleCase(
          this.props.tag
        )}`)
      : (document.title = 'Local Majority | Reports');
  }

  render() {
    const { tagsMasterList, statesMasterList } = this.props;
    let { articles } = this.props;
    const tagSelected = this.state.tagSelected;
    articles = tagSelected
      ? articles.filter(article =>
          article.tags.some(tag => tag.slug === tagSelected)
        )
      : articles;
    const featuredArticle = articles.length && articles[0] ? articles[0] : [];
    const otherArticles =
      articles.length && articles.slice(1) ? articles.slice(1) : [];
    const allTags = tagsMasterList ? tagsMasterList.map(tag => tag.slug) : [];
    return (
      <article className="Reports">
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background=""
        >
          <h2 className="text-center">
            Our Latest <span className="tertiary-text-color">Reports</span>
          </h2>
          <p>
            Local Majority provides research that is practical and accessible
            for state district campaigns. Acting as their personal research
            department, we distill national research studies and put together
            packets with specific and targeted information for candidates’
            campaigns to support their efforts.
          </p>
        </Section>

        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="medium"
        >
          <div className="row">
            <div className="col">
              {allTags && (
                <Aux>
                  <h3 className="text-center">Topics</h3>
                  <Filters>
                    <ButtonlessFilters
                      filterCategory="tagSelected"
                      passedParam={this.state.tagSelected}
                      masterList={allTags}
                      updateFilter={this.updateFilter}
                    />
                  </Filters>
                </Aux>
              )}
            </div>
          </div>
        </Section>
        <Section
          hasContainer={true}
          spacingAbove={0}
          spacingBelow={0}
          background=""
        >
          <h2 className="text-center">{this.props.match.params.slug}</h2>

          <FeaturedReport article={featuredArticle} tagRoute="reports" />

          <div className="row">
            {otherArticles.map((article, i) => {
              let cardTags = article && article.tags ? article.tags : [];
              return (
                <GridXSmallIsOneSmallIsThree key={article.slug}>
                  <ArticleCard
                    article={article}
                    slug={article.slug}
                    imageSrc={article.imageSm}
                    title={article.title}
                    author={article.author}
                    updatedAt={article.updatedAt}
                    tagRoute="reports"
                    tags={cardTags}
                  />
                </GridXSmallIsOneSmallIsThree>
              );
            })}
          </div>
        </Section>
      </article>
    );
  }
}

export default Reports;
