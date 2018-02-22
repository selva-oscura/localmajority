import React from 'react';

const Styling = props => {
  if (props.styling === 'font-size: +2') {
    return <font size="+2">{props.children}</font>;
  }
  if (props.styling.length) {
    console.log('some wonky styling rule to add', props.styling);
  }
  return props.children;
};

export default Styling;
