import React from 'react';
import { Parallax } from 'react-parallax';

const TextlessParallax = ({
  imgSrc = '/images/constitution.jpg',
  strength = '500',
  height = '500',
}) => (
  <Parallax bgImage={imgSrc} strength={Number(strength)}>
    <div style={{ height: Number(height) }} />
  </Parallax>
);

export default TextlessParallax;
