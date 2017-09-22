import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({link, kind='primary', label, handleClick}) => {
	// link -- string -- include http or https for offsite or relative link (omitting domain name) for onsite
	// kind -- string --
	//				 options -- primary, secondary, danger
	// label -- string -- text inside button
	let button;
	if (link) {
		button = link.slice(0,4)==="http" ? (
	    <a href={`${link}`}>
	      <button className={`Button ${kind}`}>{label}</button>
	    </a>	
		) : (
	    <Link 
	    	to={`${link}`}
	    >
	      <button className={`Button ${kind}`}>{label}</button>
	    </Link>
		);
	} else {
		button = (
			<button 
				className={`Button ${kind}`}
				onClick={handleClick}
			>
				{label}
			</button>
		);
	}
	return button;
}

export default Button;
