import React, { Component } from 'react';
import NoSuchIssue from './NoSuchIssue';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import ArticleCard from '../common/Cards/ArticleCard';
import Aux from '../common/Aux';
import Section from '../common/Section/Section';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';


class Issue extends Component {
  state = {
    issueSelected: this.props.match.params.slug,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'All'
      ? this.props.history.push('/reports')
      : this.props.history.push(`/reports/${selectedValue}`);
  };

  componentDidMount() {
    this.props.issue && this.props.issue.title
      ? (document.title = `Local Majority | Reports | ${
          this.props.issue.title
        }`)
      : (document.title = 'Local Majority | Reports');
  }

  render() {
    const { issue, articles, issuesMasterList, statesMasterList } = this.props;
    const subIssues = issue ? issue.subIssues : [];
    console.log('subIssues', subIssues);
    console.log('this.props', this.props);
    return (
      <main className="Issue">
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
              {issuesMasterList && (
                <Aux>
                  <h3 className="text-center">Topics
                  </h3>
                  <Filters>
                    <ButtonlessFilters
                      filterCategory="issueSelected"
                      passedParam={this.state.issueSelected}
                      masterList={issuesMasterList}
                      updateFilter={this.updateFilter}
                    />
                  </Filters>
                </Aux>
              )}
            </div>
          </div>
        </Section>

        {issue ? (
          <Aux>
            <Section
              hasContainer={true}
              spacingAbove={3}
              spacingBelow={0}
              background=""
            >
              <h2 className="text-center">{issue.title}</h2>
              <div className="row">
                <div className="col">
                  {subIssues && subIssues.length && (
                    <Aux>
                      <h3>Subtopics:</h3>
                      <Filters>
                        <ButtonlessFilters
                          filterCategory="issueSelected"
                          passedParam={this.state.issueSelected}
                          masterList={subIssues.map(subIssue => (subIssue.slug))}
                          updateFilter={this.updateFilter}
                        />
                      </Filters>
                    </Aux>
                  )}
                </div>
              </div>
            </Section>

            {subIssues.map(subIssue => (
              <Section
                key={subIssue.title}
                hasContainer={true}
                spacingAbove={0}
                spacingBelow={0}
                background=""
              >
                <div className="row">
                  <h4 className="col-12">{subIssue.title}</h4>
                  {articles.map(article => {
                    let articleThumbnail = article.thumbnail
                      ? article.thumbnail
                      : 'https://placekitten.com/400/300';
                    let cardTags =
                      article && article.tags ? article.tags : [];
                    return article.tags.includes(subIssue.slug) ? (
                      <GridXSmallIsOneSmallIsThree key={article.slug}>
                        <ArticleCard
                          article={article}
                          slug={article.slug}
                          imageSrc={articleThumbnail}
                          title={article.title}
                          author={article.author}
                          articleType={article.articleType}
                          updatedAt={article.updatedAt}
                          tagRoute="reports"
                          tags={cardTags}
                        />
                      </GridXSmallIsOneSmallIsThree>
                    ) : null;
                  })}
                </div>
              </Section>
            ))}
          </Aux>
        ) : (
          <Section
            hasContainer={true}
            spacingAbove={0}
            spacingBelow={0}
            background=""
          >
            <h2 className="text-center">{this.props.match.params.slug}</h2>
            <div className="row">
              {articles.map((article, i) => {
                let articleThumbnail = article.thumbnail
                  ? article.thumbnail
                  : 'https://placekitten.com/400/300';
                let cardTags = article && article.tags ? article.tags : [];
                return (
                  <GridXSmallIsOneSmallIsThree key={article.slug}>
                    <ArticleCard
                      article={article}
                      slug={article.slug}
                      imageSrc={articleThumbnail}
                      title={article.title}
                      author={article.author}
                      articleType={article.articleType}
                      updatedAt={article.updatedAt}
                      tagRoute="reports"
                      tags={cardTags}
                    />
                  </GridXSmallIsOneSmallIsThree>
                );
              })}
            </div>
          </Section>
        )}
      </main>
    );
  }
}

export default Issue;
