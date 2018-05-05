import React from 'react';

const GridXSmallIsOneSmallIsFour = (props) => (
  <div className="col-12 col-sm-3" style={style}>
  	{props.children}
  </div>
);

const style = {
	padding: "1vw inherit 0.75vw",
	margin: "1vw 0",
}

export default GridXSmallIsOneSmallIsFour;
