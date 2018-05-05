import React from 'react';

const GridFourAcross = (props) => (
  <div className="col-3" style={style}>
  	{props.children}
  </div>
);

const style = {
	padding: "1vw inherit 0.75vw",
	margin: "1vw 0",
}

export default GridFourAcross;
