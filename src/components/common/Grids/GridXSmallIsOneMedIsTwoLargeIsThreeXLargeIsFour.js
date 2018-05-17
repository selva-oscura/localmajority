import React from 'react';

const GridXSmallIsOneMedIsTwoLargeIsThreeXLargeIsFour = props => (
  <div className="col-12 col-md-6 col-lg-4 col-xl-lg-3" style={style}>
    {props.children}
  </div>
);

const style = {
  padding: '1vw inherit 0.75vw',
  margin: '1vw 0',
};

export default GridXSmallIsOneMedIsTwoLargeIsThreeXLargeIsFour;
