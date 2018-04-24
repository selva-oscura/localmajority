import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import BasicCard from '../common/Cards/BasicCard';

const State = ({ state, candidates, reports }) => {
  console.log('state', state);
  console.log('candidates', candidates);
  console.log('reports', reports);
  return (
    <section className="State">
      <div className="container">
        <div className="row">
          <h2 className="text-center col-12">
            Our State Info <span className="tertiary-text-color">Here</span>
          </h2>
        </div>
      </div>
    </section>
  )
};

export default State;
        // {currentStateRaces.map((state, i) => (
        //   <GridXSmallIsOneSmallIsThree key={i}>
        //     <BasicCard
        //       title={state}
        //       text=""
        //       route="states"
        //       slug={state}
        //       imageSrc={`../images/${state}.jpg`}
        //       imageAlt={state}
        //     />
        //   </GridXSmallIsOneSmallIsThree>
        // ))}
