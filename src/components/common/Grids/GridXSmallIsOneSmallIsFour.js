import React from "react";
import style from "./GridStyle";

const GridXSmallIsOneSmallIsFour = props => (
  <div className="col-12 col-sm-3" style={style}>
    {props.children}
  </div>
);

export default GridXSmallIsOneSmallIsFour;
