import React from 'react';
import { Parallax } from 'react-parallax';

const TextParallax = ({
  imgSrc = '/images/constitution.jpg',
  strength = '500',
  height = '500',
  fontFamily = 'Open Sans',
  fontSize = '3em',
  fontWeight = 'bold',
  color = 'white',
  textShadow = '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
  textAlign = 'center',
  background = 'transparent',
  padding = '20',
  top = '50%',
  left = '50%',
  transform = 'translate(-50%,-50%)',
  content = "Didn't you want some content here?",
}) => {
  let insideStyles = {
    background,
    padding: Number(padding),
    position: 'absolute',
    top,
    left,
    transform,
  };
  let styles = {
    fontFamily,
    fontSize,
    fontWeight,
    color,
    textAlign,
    textShadow,
    lineHeight: '1em',
  };
  return (
    <div>
      <Parallax bgImage={imgSrc} strength={Number(strength)}>
        <div style={{ height: Number(height) }}>
          <div style={insideStyles}>
            <p style={styles}>{content}</p>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default TextParallax;
