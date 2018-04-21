import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';

const States = ({ currentStateRaces }) => (
  <section className="row">
    <h2 className="text-center col-12">Our States</h2>
    {currentStateRaces.map((state, i) => (
      <GridXSmallIsOneSmallIsThree key={i}>
        <CardHover>
          <Link to={`./districts/${state}`}>
            <FooterCard
              cardTitle={state}
              imgSrc={`../images/${state}.jpg`}
              insetImg="insetImg"
            />
          </Link>
        </CardHover>
      </GridXSmallIsOneSmallIsThree>
    ))}
  </section>
);

export default States;
