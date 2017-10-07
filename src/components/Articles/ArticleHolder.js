import React from 'react';
import Article from './Article';
import NoSuchArticle from './NoSuchArticle';

const ArticleHolder = props => {
  const article = props.article;
  if (article && article.title) {
    document.title = `Local Majority | ${article.title}`;
  } else {
    document.title = 'Local Majority | Unrecognized Article';
  }
  return (
    <div className="ArticleHolder">
      {article ? (
        <Article article={props.article} />
      ) : (
        <NoSuchArticle articleId={props.match.params.id} />
      )}
    </div>
  );
};

export default ArticleHolder;
