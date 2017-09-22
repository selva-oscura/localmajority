import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.css';

const ButtonLink = ({link, kind='primary', label}) => {
	// link -- string -- include http or https for offsite or relative link (omitting domain name) for onsite
	// kind -- string --
	//				 options -- primary, secondary, danger
	// label -- string -- text inside button
	
	const buttonLink = link.slice(0,4)==="http" ? (
	    <a href={`${link}`}>
	      <button className={`ButtonLink ${kind}`}>{label}</button>
	    </a>	
		) : (
	    <Link 
	    	to={`${link}`}
	    >
	      <button className={`ButtonLink ${kind}`}>{label}</button>
	    </Link>
		);
	return buttonLink;
}

export default ButtonLink;
