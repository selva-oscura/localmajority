import React from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';

const States = ({ currentStateRaces }) => (
  <section className="col-12">
    <h2 className="text-center">Our States</h2>
    <div className="flex">
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
    </div>
  </section>
);

export default States;
