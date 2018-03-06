import React from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const FooterCard = ({ cardTitle="title missing", cardSubtitle='', cardText='', imgSrc, insetImg='',}) => {
	const inset = insetImg 
	? { 
			margin: "1.5vw 1.5vw 0 1.5vw", 
			maxWidth: "calc(100% - 3vw)",
			minWidth: "calc(100% - 3vw)",
			width: "calc(100% - 3vw)",
		}
	: null
	return (
	  <Card
	  	className="FooterCard"
	  	containerStyle={{paddingBottom: "0"}}
	  >
	    <CardMedia>
				<img src={imgSrc} alt={cardTitle} style={inset} />
	    </CardMedia>
	    <CardTitle 
	    	title={cardTitle}
	    	titleStyle={{color: "rgba(0, 110, 237, 0.75)", fontSize: "1.17em"}}
	    	subtitle={cardSubtitle}
	    	subtitleStyle={{color: "rgba(0, 110, 237, 0.75)"}}
	    	style={{padding: "12px"}}
	    />
	    <CardText>{cardText}</CardText>
	  </Card>
	)
};

export default FooterCard;
