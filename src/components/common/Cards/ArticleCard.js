import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBackgroundPlaceholderImage from '../ImageWithBackgroundPlaceholderImage';
import Tags from '../Tags/Tags';
import { prettifyDate } from '../../../utils/functions';
import './ArticleCard.css';

const ArticleCard = ({slug, imageSrc, imageAlt="", title, author, updatedAt, tagRoute="", tags=[]}) => (
	<div className="ArticleCard">
    <Link
      to={`/articles/${slug}`}
    >
      <ImageWithBackgroundPlaceholderImage
        imageSrc={imageSrc}
        imageAlt=""
        aspectRatioInPercent="75"
      />
      <div className="contents">
	      <h3 className="title">{title}</h3>
	      <p className="details">{author}</p>
	      <p className="details text-right">updated {prettifyDate(updatedAt)}</p>
      </div>
    </Link>
    {tags && tags.length
			? <Tags tags={tags} tagRoute={tagRoute}/>
      : null
    }
   </div>
);

export default ArticleCard;
