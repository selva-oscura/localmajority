import React from 'react';
import { Link } from 'react-router-dom';
// import './District.css';

const NoSuchDistrict = ({districtId}) => {
	// console.log("props from District", props.match.params.id);
  return (
    <div className="NoSuchDistrict">
    	<h2>District {districtId} does not have a race this year</h2>
    	<Link to="/districts">Return to List of Districts</Link>
    </div>
  );
};

export default NoSuchDistrict;
