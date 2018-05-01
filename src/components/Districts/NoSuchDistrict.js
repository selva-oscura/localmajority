import React from 'react';
import { Link } from 'react-router-dom';
// import './District.css';

const NoSuchDistrict = ({ seatId }) => {
  return (
    <div className="NoSuchDistrict">
      <h2>District {seatId} does not have a race this year</h2>
      <Link to="/states">Return to List of Districts</Link>
    </div>
  );
};

export default NoSuchDistrict;
