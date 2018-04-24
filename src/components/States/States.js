import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import BasicCard from '../common/Cards/BasicCard';

const States = ({ currentStateRaces }) => (
  <section className="States">
    <div className="container">
      <div className="row">
        <h2 className="text-center col-12">
          Our <span className="tertiary-text-color">States</span>
        </h2>
        {currentStateRaces.map((state, i) => (
          <GridXSmallIsOneSmallIsThree key={i}>
            <BasicCard
              title={state}
              text=""
              route="states"
              slug={state}
              imageSrc={`../images/${state}.jpg`}
              imageAlt={state}
            />
          </GridXSmallIsOneSmallIsThree>
        ))}
      </div>
    </div>
  </section>
);

export default States;
