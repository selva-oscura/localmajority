import React from "react";
import style from "./GridStyle";

const GridXSmallIsOneSmallIsThree = props => (
  <div className="col-12 col-sm-4" style={style}>
    {props.children}
  </div>
);

export default GridXSmallIsOneSmallIsThree;
