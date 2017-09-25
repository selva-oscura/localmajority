import React from 'react';
import './Home.css';
import Aside from '../common/Aside'
import VADistrictMap from '../Maps/VADistrictMap';

const Home = (props) => {
  document.title="Local Majority";
  return (
    <div className="Home">
      <div className="map-and-text">
        <div id="image">
          <VADistrictMap />
        </div>
        <div className="caption">
          <h2>
            November 7, 2017 .... It Starts with Virginia
          </h2>
          <h3>Electing a Congress <br />that Represents US</h3>
          <h3>
            Polls Open<br />
            22 Days 12 Hours 18 Minutes 5 Seconds
          </h3>
          </div>
      </div>
      <div className="flex">
        <article className="Main">
          <h2>WHAT CONTENT GOES HERE?</h2>
        </article>
        <Aside
          twitterHandles={['local_majority', 'flippable_org']}
        />
      </div>
    </div>
  );
};

export default Home;

