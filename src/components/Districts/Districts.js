import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import SelectFilter from '../Filters/SelectFilter';
import Card from '../common/Cards/Card';

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
    const { seats, statesMasterList, regionTypesMasterList } = this.props;
    const { districtsStatesSelected, districtsSeatTypeSelected } = this.state;
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
              <Card
                key={i}
                id={seat.id}
                cardTitle={seat.title}
                imgSrc="missing"
                category="districts"
                slug={`${seat.state.title}/${seat.slug}`}
                imgShape="square"
              />
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
