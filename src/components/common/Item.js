import React from 'react';
import { Link } from 'react-router-dom';
// import './Item.css';

const Item = ({title, subtitle, text, imgSrc, category, id}) => {
  console.log(title, subtitle, text, category, id);
  return (
    <div className="Item">
    	<Link
    		to={`/${category}/${id}`}
    	>
	    	<img src={imgSrc} alt={`img for ${title}`} />
	    	<h3>{title}</h3>
	    	<p>{subtitle}</p>
	    	<p>{text}</p>
    	</Link>
    </div>
  );
};

export default Item;
