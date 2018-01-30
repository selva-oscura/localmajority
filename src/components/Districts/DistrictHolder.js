import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import graphQLAPI from '../../api/graphQLAPI';
import District from './District';
import NoSuchDistrict from './NoSuchDistrict';

class DistrictHolder extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const seat = this.props.SeatDetail.Seat
      ? this.props.SeatDetail.Seat
      : this.props.seat;
    console.log('props', this.props);
    if (seat && seat.title) {
      document.title = `Local Majority | ${seat.title}`;
    } else {
      document.title = 'Local Majority | Unrecognized District';
    }
    return (
      <div className="DistrictHolder">
        {seat ? (
          <District seat={seat} {...this.props} />
        ) : (
          <NoSuchDistrict seatId={this.props.match.params.slug} />
        )}
      </div>
    );
  }
}

export default compose(
  graphql(graphQLAPI.queries.SeatDetail, {
    name: 'SeatDetail',
    options: props => {
      return { variables: { id: props.seat.id } };
    },
  })
)(DistrictHolder);
