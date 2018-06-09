import React from "react";
import style from "./GridStyle";

const GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour = props => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3" style={style}>
    {props.children}
  </div>
);

export default GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour;
