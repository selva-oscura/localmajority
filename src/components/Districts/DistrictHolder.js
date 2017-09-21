import React from 'react';
import District from './District';
import NoSuchDistrict from './NoSuchDistrict';

const DistrictHolder = (props) => {
	const district = props.district;
  return (
    <div className="DistrictHolder">
			{ district ? (
					<District districtId={props.match.params.id} district={district} {...props} />
				) : (
					<NoSuchDistrict districtId={props.match.params.id} />
				)
			}
    </div>
  );
};

export default DistrictHolder;
