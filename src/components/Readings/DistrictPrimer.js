// import React from 'react';
import React, { Component } from 'react';

class DistrictPrimer extends Component {
  componentDidMount() {
    let { reading } = this.props;
    let details = [
      'knowTheDistrict',
      'facts',
      'summary',
      'howWeWin',
      'aboutOpposition',
      'bodyText',
    ];
    let districtPrimerSpace = document.getElementById('district-primer-space');
    details.forEach(detail => {
      if (reading[detail]) {
        let d = document.createElement('div');
        d.id=detail;
        d.innerHTML = reading[detail];
        districtPrimerSpace.appendChild(d);
      }
    })
  }
  render() {
    return (
      <article className="DistrictPrimer">
        <h3>About the District</h3>
        <div id="district-primer-space" />
      </article>
    );
  }
}

export default DistrictPrimer;
