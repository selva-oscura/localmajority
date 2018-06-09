import React from "react";
import style from "./GridStyle";

const GridOneAcross = props => (
  <div className="col-12" style={style}>
    {props.children}
  </div>
);

export default GridOneAcross;
