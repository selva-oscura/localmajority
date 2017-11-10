import React from 'react';
// import districts from '../../data/districts.json';
import Filters from '../Filters/Filters';
import ButtonFilters from '../Filters/ButtonFilters';
import Card from '../common/Card';

const Districts = props => {
  const { seats, statesMasterList, districtsStatesSelected, districtsSeatTypeSelected, updateFilter } = props;
  document.title = 'Local Majority | Districts';
  let seatsInSelectedStates = seats.filter(seat => districtsStatesSelected[seat.stateName])
  //  console.log('districts', districts);
  return (
    <div className="Districts">
      <Filters>
        <ButtonFilters
          filterCategory="districtsStatesSelected"
          includeAllNone={true}
          masterList={statesMasterList}
          filterItems={districtsStatesSelected}
          updateFilter={updateFilter}
        />
      </Filters>
      <div className="flex">
        {seatsInSelectedStates.map((seat, i) => (
          <Card
            key={i}
            id={seat.uid}
            cardTitle={seat.title}
            cardText={seat.candidateName}
            imgSrc={seat.mapSmUrl}
            category="districts"
            friendlyId={seat.friendlyId}
            imgShape="square"
          />
        ))}
      </div>
    </div>
  );
};

export default Districts;
