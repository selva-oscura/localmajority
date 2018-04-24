import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import BasicCard from '../common/Cards/BasicCard';

class State extends Component {

  render(){
    const { state, candidates, reports } = this.props;
    console.log('state', state);
    console.log('candidates', candidates);
    console.log('reports', reports);
    return (
      <section className="State">
        <div className="container">
          <div className="row">
            <h2 className="text-center col-12">
              {state.title} Info <span className="tertiary-text-color">Here</span>
            </h2>
          </div>
        </div>
      </section>
    )

  }
}

export default State;
