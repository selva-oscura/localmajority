import React from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const FooterCard = ({
  cardTitle = 'title missing',
  cardSubtitle = '',
  cardText = '',
  imgSrc,
  insetImg = '',
}) => {
  const inset = insetImg
    ? {
        margin: 'calc(-100% + 1.5vw) 1.5vw 0 1.5vw',
        maxWidth: 'calc(100% - 3vw)',
        minWidth: 'calc(100% - 3vw)',
        width: 'calc(100% - 3vw)',
      }
    : {
        marginTop: '-100%',
      };
  return (
    <Card
      className="FooterCard"
      containerStyle={{
        paddingBottom: '0',
        width: '100%',
        paddingTop: '100%',
        background: "url('/images/placeholderImage.svg') no-repeat",
        backgroundSize: '100%',
        backgroundPosition: 'center 0',
      }}
    >
      <CardMedia>
        <img src={imgSrc} alt={cardTitle} style={inset} />
      </CardMedia>
      {cardSubtitle ? (
        <CardTitle
          title={cardTitle}
          titleStyle={{ color: 'rgba(0, 110, 237, 0.75)', fontSize: '1.17em' }}
          subtitle={cardSubtitle}
          subtitleStyle={{ color: 'rgba(0, 110, 237, 0.75)' }}
          style={{ padding: '0 12px 12px 12px', marginTop: '-12px' }}
        />
      ) : (
        <CardTitle
          title={cardTitle}
          titleStyle={{ color: 'rgba(0, 110, 237, 0.75)', fontSize: '1.17em' }}
          style={{ padding: '0 12px 12px 12px', marginTop: '-12px' }}
        />
      )}
      {cardText && <CardText>{cardText}</CardText>}
    </Card>
  );
};

export default FooterCard;
