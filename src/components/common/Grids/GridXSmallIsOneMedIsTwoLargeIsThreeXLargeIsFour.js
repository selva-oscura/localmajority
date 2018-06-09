import React from "react";
import style from "./GridStyle";

const GridXSmallIsOneMedIsTwoLargeIsThreeXLargeIsFour = props => (
  <div className="col-12 col-md-6 col-lg-4 col-xl-lg-3" style={style}>
    {props.children}
  </div>
);

export default GridXSmallIsOneMedIsTwoLargeIsThreeXLargeIsFour;
