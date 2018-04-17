import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBackgroundPlaceholderImage from './ImageWithBackgroundPlaceholderImage';
import { prettifyDate } from '../../utils/functions';
import './ArticleLink.css';

const ArticleLink = ({
  slug,
  imageSrc,
  imageAlt = '',
  title,
  articleType,
  author,
  updatedAt,
  tagRoute = '',
  tags = [],
}) => (
  <div className="ArticleLink flex-container flex-space-between">
    <Link to={`articles/${slug}`}>
      <div className="thumbnail">
        <ImageWithBackgroundPlaceholderImage
          imageSrc={imageSrc}
          imageAlt=""
          aspectRatioInPercent="75"
        />
      </div>
    </Link>
    <div className="text">
      <Link to={`/articles/${slug}`}>
        <div className="contents">
          <h2 className="title flex-container flex-wrap flex-space-between">
            <strong>{title}</strong>
            <span>{articleType}</span>
          </h2>
          <p className="details flex-container flex-wrap flex-space-between">
            <span>{author}</span>
            <span>updated {prettifyDate(updatedAt)}</span>
          </p>
        </div>
      </Link>
      <div className="tags flex-container flex-wrap flex-end">
        {tags.map(tag => (
          <Link key={tag} to={`/${tagRoute}/${tag}`} className="tag">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default ArticleLink;
