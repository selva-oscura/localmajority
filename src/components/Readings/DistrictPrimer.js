// import React from 'react';
import React, { Component } from 'react';

class DistrictPrimer extends Component {
  componentDidMount() {
    let { reading } = this.props;
    let districtDetails = ['knowTheDistrict', 'facts', 'summary'];
    let letContestDetails = ['howWeWin', 'aboutOpposition', 'bodyText'];

    let districtDetailsSpace = document.getElementById('district-details');
    districtDetails.forEach(detail => {
      if (reading[detail]) {
        let d = document.createElement('div');
        d.id = detail;
        d.innerHTML = reading[detail];
        districtDetailsSpace.appendChild(d);
      }
    });
    let contestDetailsSpace = document.getElementById('contest-details');
    letContestDetails.forEach(detail => {
      if (reading[detail]) {
        let d = document.createElement('div');
        d.id = detail;
        d.innerHTML = reading[detail];
        contestDetailsSpace.appendChild(d);
      }
    });
  }
  render() {
    let { candidate } = this.props;
    return (
      <div className="row">
        <article className="DistrictPrimer col">
          <h3>About the District</h3>
          <div id="district-details" />
          <img
            src={candidate.headshotSmUrl}
            className="hidden-md-up img-fluid"
            alt={`headhshot of ${candidate.title}`}
          />
          <h3>About the Candidate for {candidate.seatName}</h3>
          <div id="contest-details" />
        </article>
      </div>
    );
  }
}

export default DistrictPrimer;
