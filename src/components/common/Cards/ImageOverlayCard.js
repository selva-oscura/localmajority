import React, { Component } from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

class ImageOverlayCard extends Component {
	render(){
		return (
		  <Card>
		    <CardMedia
		      overlay={<CardTitle title="Overlay title" />}
		      overlayContentStyle={{height: "100%"}}
		    >
		      <img src="../images/District_1_map.png" alt="" />
		    </CardMedia>
		  </Card>
		)
	}
}

export default ImageOverlayCard;
