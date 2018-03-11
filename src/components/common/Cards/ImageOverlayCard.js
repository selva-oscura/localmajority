import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

const ImageOverlayCard = ({ cardTitle="title missing", imgSrc }) => (
  <Card>
    <CardMedia
      overlay={<CardTitle title={cardTitle} titleStyle={{marginLeft: "12px"}} />}
      overlayContentStyle={{
        height: "100%",
        background: "-webkit-linear-gradient(-45deg, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, 0.4) 100%)"
      }}
    >
			{imgSrc && <img src={imgSrc} alt={cardTitle} />}
    </CardMedia>
  </Card>
);

export default ImageOverlayCard;
