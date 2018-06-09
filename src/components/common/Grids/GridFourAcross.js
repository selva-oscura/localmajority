import React from "react";
import style from "./GridStyle";

const GridFourAcross = props => (
  <div className="col-3" style={style}>
    {props.children}
  </div>
);

export default GridFourAcross;
