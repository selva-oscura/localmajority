import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBackgroundPlaceholderImage from '../ImageWithBackgroundPlaceholderImage';
import CardHover from './CardHover';

const BasicCard = ({title="", text="", route="", slug="", imageSrc="", aspectRatio="100", imageAlt="",}) => (
  <Link
    to={`/${route}/${slug}`}
  >
	  <CardHover>
  		<div className="BasicCard">
	      <ImageWithBackgroundPlaceholderImage
	        imageSrc={imageSrc}
	        imageAlt={title}
	        aspectRatioInPercent={aspectRatio}
	      />
	      <div className="contents">
		      <h3 className="title">{title}</h3>
		      <p>{text}</p>
	      </div>
	   </div>
  	</CardHover>
	</Link>
);

export default BasicCard;
