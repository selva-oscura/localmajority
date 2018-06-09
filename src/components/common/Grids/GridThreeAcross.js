import React from "react";
import style from "./GridStyle";

const GridThreeAcross = props => (
  <div className="col-4" style={style}>
    {props.children}
  </div>
);

export default GridThreeAcross;
