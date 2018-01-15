import React from 'react';
import './BaseballCards.css';

const BaseballCards = (props) => {
	return (
		<div className="BaseballCards">
			{props.children}
		</div>
	);
}

export default BaseballCards;