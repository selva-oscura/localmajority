// import React from 'react';
import React, { Component } from 'react';

class CandidateTalkingPoints extends Component {
  componentDidMount() {
    let { reading } = this.props;
    let details = [
      'bodyText',
    ];
    let candidateTalkingPointsSpace = document.getElementById('candidate-talking-points-space');
    details.forEach(detail => {
      if (reading[detail]) {
        let d = document.createElement('div');
        d.id=detail;
        d.innerHTML = reading[detail];
        candidateTalkingPointsSpace.appendChild(d);
      }
    })
  }
  render() {
    return (
      <article className="CandidateTalkingPoints">
        <h3>About the Candidate</h3>
        <div id="candidate-talking-points-space" />
      </article>
    );
  }
}

export default CandidateTalkingPoints;
