import React from 'react';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import BasicCard from '../common/Cards/BasicCard';

const States = ({ currentStateRaces }) => (
  <div>
    <h2 className="text-center">
      Our <span className="tertiary-text-color">States</span>
    </h2>
    <p className="text-center">
      Local Majority is supporting progressive candidates in State House and
      State Senate races in purple states where flipping seats blue can make the
      biggest difference.
    </p>
    <div className="row">
      {currentStateRaces.map((state, i) => (
        <GridXSmallIsOneSmallIsThree key={i}>
          <BasicCard
            title={state.title}
            text={'Yep....  do not yet have text'}
            route="states"
            slug={state.slug}
            imageSrc={`../images/${state.imageSm}.jpg`}
            imageAlt={state.title}
          />
        </GridXSmallIsOneSmallIsThree>
      ))}
    </div>
  </div>
);

export default States;
