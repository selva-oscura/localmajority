import React from "react";
import style from "./GridStyle";

const GridXSmallIsOneMedIsTwoLargeIsThree = props => (
  <div className="col-12 col-md-6 col-lg-4" style={style}>
    {props.children}
  </div>
);

export default GridXSmallIsOneMedIsTwoLargeIsThree;
