import React from 'react';
import './VideoResponsive.css';

const VideoResponsive = ({title="", src="", width="640", height="360", frameBorder="0", allowFullScreen=""}) => (
  <div className="VideoResponsive">
    <iframe
      title={title}
      src={src}
      width={width}
      height={height}
      frameBorder={frameBorder}
      allowFullScreen={allowFullScreen}
      wmode="transparent"
    />
  </div>
);

export default VideoResponsive;
