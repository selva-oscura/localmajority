import React from 'react';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import BasicCard from '../common/Cards/BasicCard';

const States = ({ currentStateRaces }) => (
  <div className="row">
    <h2 className="text-center col-12">
      Our <span className="tertiary-text-color">States</span>
    </h2>
    <p className="text-center">
      We are supporting states where we can make a big difference and help
      flip seats blue in State Houses and Senate races.
    </p>
    {currentStateRaces.map((state, i) => (
      <GridXSmallIsOneSmallIsThree key={i}>
        <BasicCard
          title={state.title}
          text={state.text}
          route="states"
          slug={state.title}
          imageSrc={`../images/${state.title}.jpg`}
          imageAlt={state.title}
        />
      </GridXSmallIsOneSmallIsThree>
    ))}
  </div>
);

export default States;
