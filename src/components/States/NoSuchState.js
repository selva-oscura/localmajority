import React from 'react';
import { Link } from 'react-router-dom';

const NoSuchState = ({ state }) => {
  return (
    <div className="NoSuchState container">
      <h2>Data for {state} not found </h2>
      <Link to="/states">Return to List of States</Link>
    </div>
  );
};

export default NoSuchState;
