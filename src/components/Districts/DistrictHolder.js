import React from 'react';
import District from './District';
import NoSuchDistrict from './NoSuchDistrict';
import districts from '../../data/districts.json';
// import './DistrictHolder.css';

const DistrictHolder = (props) => {
	// const districtCheck = districts.map((district) => district.title.slice("District ".length));
	const validDistrict = (district) => (district.title.slice("District ".length) === props.match.params.id);
	const districtData = districts.filter(validDistrict);
  return (
    <div className="DistrictHolder">
    	{ districtData.length===0 && <NoSuchDistrict districtId={props.match.params.id} />}
    	{ districtData.length===1 && <District districtId={props.match.params.id} district={districtData[0]} />}
    </div>
  );
};

export default DistrictHolder;
