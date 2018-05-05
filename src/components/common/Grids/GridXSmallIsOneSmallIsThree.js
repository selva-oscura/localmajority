import React from 'react';

const GridXSmallIsOneSmallIsThree = (props) => (
  <div className="col-12 col-sm-4" style={style}>
  	{props.children}
  </div>
);

const style = {
	padding: "1vw inherit 0.75vw",
	margin: "1vw 0",
}

export default GridXSmallIsOneSmallIsThree;
