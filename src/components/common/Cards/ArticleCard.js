import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBackgroundPlaceholderImage from '../ImageWithBackgroundPlaceholderImage';
import CardHover from './CardHover';
import { prettifyDate } from '../../../utils/functions';

const ArticleCard = ({slug, imageSrc, imageAlt="", title, author, updatedAt, tagRoute="", tags=[]}) => (
  <CardHover>
    <Link
      to={`articles/${slug}`}
    >
      <ImageWithBackgroundPlaceholderImage
        imageSrc={imageSrc}
        imageAlt=""
        aspectRatioInPercent="75"
      />
      <h2>
        <span className="title">{title}</span>
        <span className="author">{` by ${author}`}</span></h2>
      <h4 className="text">{prettifyDate(updatedAt)}</h4>
      <h4 className="tags">{tags.join(", ")}</h4>
    </Link>
  </CardHover>
);

export default ArticleCard;
