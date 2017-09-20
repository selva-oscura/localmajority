import React from 'react';
import Article from './Article';
import NoSuchArticle from './NoSuchArticle';

const ArticleHolder = (props) => {
	const article = props.article;
  return (
    <div className="ArticleHolder">
    	{ article ? (
    			<Article articleId={props.match.params.id} />
    		) : (
    			<NoSuchArticle articleId={props.match.params.id} />
    		)}
    </div>
  );
};

export default ArticleHolder;
