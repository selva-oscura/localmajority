import React from 'react';

const GridXSmallIsOneMedIsTwoLargeIsThree = (props) => (
  <div className="col-12 col-md-6 col-lg-4" style={style}>
  	{props.children}
  </div>
);

const style = {
	padding: "20px 8px 0px 8px",
}

export default GridXSmallIsOneMedIsTwoLargeIsThree;
