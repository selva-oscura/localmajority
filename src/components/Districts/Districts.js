import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../common/Filters/Filters';
import SelectFilter from '../common/Filters/SelectFilter';
// import Card from '../common/Cards/Card';
import GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour from '../common/Grids/GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';

class Districts extends Component {
  constructor(props, context) {
    super(props, context);
    let districtsStatesSelected = {},
      districtsSeatTypeSelected = {};
    if (this.props.statesMasterList) {
      if (
        this.props.match.params.state &&
        this.props.statesMasterList.includes(this.props.match.params.state)
      ) {
        this.props.statesMasterList.forEach(stateName => {
          districtsStatesSelected[stateName] = false;
        });
        districtsStatesSelected[this.props.match.params.state] = true;
      } else {
        this.props.statesMasterList.forEach(stateName => {
          districtsStatesSelected[stateName] = true;
        });
      }
    }
    this.state = {
      districtsStatesSelected,
      districtsSeatTypeSelected,
    };
    this.updateFilter = this.updateFilter.bind(this);
  }
  updateFilter(filterCategory, selectedValue) {
    selectedValue === 'all'
      ? this.props.history.push('/districts')
      : this.props.history.push(`/districts/${selectedValue}`);
  }
  componentDidMount() {
    this.props.match.params.state
      ? (document.title = `Local Majority | Districts | ${
          this.props.match.params.state
        }`)
      : (document.title = 'Local Majority | Districts');
  }
  render() {
    const { seats, statesMasterList } = this.props;
    const { districtsStatesSelected } = this.state;
    const seatsMeetingFilters =
      districtsStatesSelected && seats
        ? seats.filter(seat => districtsStatesSelected[seat.state.title])
        : [];

    return (
      <div className="Districts">
        {statesMasterList && (
          <Filters>
            <SelectFilter
              filterCategory="districtsStatesSelected"
              hintText="select state"
              includeAll={true}
              passedParam={this.props.match.params.state}
              masterList={statesMasterList}
              updateFilter={this.updateFilter}
            />
          </Filters>
        )}
        <div className="flex">
          {seatsMeetingFilters && seatsMeetingFilters.length ? (
            seatsMeetingFilters.map((seat, i) => (
              <GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour key={i}>
                <CardHover>
                  <Link to={`districts/${seat.state.title}/${seat.slug}`}>
                    <FooterCard cardTitle={seat.title} imgSrc="missing" />
                  </Link>
                </CardHover>
              </GridXSmallIsOneSmIsTwoMedIsThreeLargeIsFour>
            ))
          ) : (
            <h2>No Districts Meet Your Criteria.</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Districts;
