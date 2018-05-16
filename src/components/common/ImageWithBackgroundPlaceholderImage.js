import React from 'react';

/*
	NOTE: aspectRatioInPercent: (width/height)*100
	Square is 100
	16 (width) by 9 (height) is 56.25
	4 (width) by 3 (height) is 75
  quick tip for eyeballing it is right:
    horizontal < 100, vertical > 100
*/

const ImageWithBackgroundPlaceholderImage = ({
  imageSrc,
  imageAlt,
  backgroundImageURL = '/images/placeholderImage.svg',
  aspectRatioInPercent = 100,
}) => (
  <div style={{ backgroundColor: 'rgba(238,238,238, 0.5)' }}>
    <div
      style={{
        paddingBottom: '0',
        width: '100%',
        paddingTop: `${aspectRatioInPercent}%`,
        background: `url(${backgroundImageURL}) no-repeat`,
        backgroundSize: `${aspectRatioInPercent}%`,
        backgroundPosition: 'center center',
        overflow: 'hidden',
        lineHeight: 0,
      }}
    >
      <img
        src={imageSrc}
        style={{
          marginTop: `-${aspectRatioInPercent}%`,
          width: '100%',
          maxWidth: '100%',
          textIndent: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
        alt={imageAlt}
        title={imageAlt}
      />
    </div>
  </div>
);

export default ImageWithBackgroundPlaceholderImage;
