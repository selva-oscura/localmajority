import React from 'react';

const GridXSmallIsOneMedIsTwoLargeIsThree = (props) => (
  <div className="col-12 col-md-6 col-lg-4" style={style}>
  	{props.children}
  </div>
);

const style = {
	padding: "1vw 0.5vw 0.5vw 0.5vw",
	margin: "1vw 0",
}

export default GridXSmallIsOneMedIsTwoLargeIsThree;
