import React from 'react';
import DistrictMap from './DistrictMap';
import districtData from '../../data/va-house.json'

const VADistrictMap = () => {
	return (
		<DistrictMap
			districtData={districtData}
		/>
	);
};

export default VADistrictMap;
