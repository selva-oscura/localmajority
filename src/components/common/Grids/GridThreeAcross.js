import React from 'react';

const GridThreeAcross = (props) => (
  <div className="col-4" style={style}>
  	{props.children}
  </div>
);

const style = {
	padding: "1vw inherit 0.75vw",
	margin: "1vw 0",
}

export default GridThreeAcross;
