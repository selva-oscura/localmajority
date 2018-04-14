import React from 'react';

/*
	NOTE: AspectRatioInPercent
	Square is 100
	16 (width) by 9 (height) is 56.25
	4 (width) by 3(height) is 75
*/

const ImageWithBackgroundPlaceholderImage = ({
  imageURL,
  imageAlt,
  backgroundImageURL = '/images/placeholderImage.svg',
  AspectRatioInPercent = 100,
}) => (
  <div
    style={{
      paddingBottom: '0',
      width: '100%',
      paddingTop: `${AspectRatioInPercent}%`,
      background: `url(${backgroundImageURL}) no-repeat`,
      backgroundSize: `${AspectRatioInPercent}%`,
      backgroundPosition: 'center center',
      overflow: 'hidden'
    }}
  >
    <img
      src={imageURL}
      style={{ marginTop: `-${AspectRatioInPercent}%`, width: '100%', maxWidth: '100%', textIndent: '100%', whiteSpace: 'nowrap', overflow: 'hidden'}}
      alt={imageAlt}
      title={imageAlt}
    />
  </div>
);

export default ImageWithBackgroundPlaceholderImage;
