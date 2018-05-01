import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import ArticleCard from '../common/Cards/ArticleCard';

const FeaturedArticles = ({articles}) => (
	<div className="row">
	  <div className="col-12">
	    <h2 className="text-center">
	      Our Latest <span className="tertiary-text-color">Reports</span>
	    </h2>
	    <p className="text-center">
	      Read <Link to="./reports">here</Link> for our latest in-depth
	      research reports supporting progressive state district campaigns.
	    </p>
	  </div>
	  {articles && articles.length ? (
	    articles.map(article => {
	      let cardTags = article && article.tags ? article.tags : [];
	      let articleThumbnail = article.thumbnail
	        ? article.thumbnail
	        : 'https://placekitten.com/200/150';

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
	    })
	  ) : (
	    <h2 className="col-12">Loading</h2>
	  )}
	</div>
);

export default FeaturedArticles;
