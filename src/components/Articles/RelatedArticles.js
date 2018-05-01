import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import ArticleCard from '../common/Cards/ArticleCard';

const RelatedArticles = ({ articles }) => (
  <aside className="row">
    <h3 className="col-12">Related Reports</h3>
    {articles &&
      articles.map(article => {
        let cardTags = article && article.tags ? article.tags : [];
        let articleThumbnail = article.thumbnail
          ? article.thumbnail
          : 'https://placekitten.com/g/200/150';
        return (
          <GridXSmallIsOneSmallIsThree key={article.slug}>
            <ArticleCard
              slug={article.slug}
              imageSrc={articleThumbnail}
              title={article.title}
              author={article.author}
              updatedAt={article.updatedAt}
              tagRoute="reports"
              tags={cardTags}
            />
          </GridXSmallIsOneSmallIsThree>
        );
      })}
  </aside>
);

export default RelatedArticles;
