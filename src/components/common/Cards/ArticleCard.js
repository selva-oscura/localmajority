import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBackgroundPlaceholderImage from '../ImageWithBackgroundPlaceholderImage';
import CardHover from './CardHover';
import { prettifyDate } from '../../../utils/functions';
import './ArticleCard.css';

const ArticleCard = ({slug, imageSrc, imageAlt="", title, author, updatedAt, tagRoute="", tags=[]}) => (
  <CardHover>
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
		      <h2 className="title">{title}</h2>
		      <p className="details">{author}</p>
		      <p className="details text-right">updated {prettifyDate(updatedAt)}</p>
	      </div>
	    </Link>
	    {tags && tags.length
				? (
						<div className="tags flex-container flex-wrap flex-start">
							{tags.map(tag => (
								<Link key={tag} to={`/${tagRoute}/${tag}`} className="tag">{tag}
								</Link>
							))}
						</div>
				)
	    	: null
	    }
	   </div>
  </CardHover>
);

export default ArticleCard;
