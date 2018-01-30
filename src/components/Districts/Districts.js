import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import ButtonFilters from '../Filters/ButtonFilters';
import Card from '../common/Card';

class Districts extends Component {
  constructor(props, context) {
    super(props, context);
    let districtsStatesSelected = {},
      districtsSeatTypeSelected = {};
    if (this.props.statesMasterList) {
      this.props.statesMasterList.forEach(stateName => {
        districtsStatesSelected[stateName] = true;
      });
    }
    this.state = {
      districtsStatesSelected,
      districtsSeatTypeSelected,
    };
    this.updateFilter = this.updateFilter.bind(this);
  }
  updateFilter(filterCategory, selectedValues) {
    let state = this.state;
    state[filterCategory] = { ...selectedValues };
    this.setState(state);
  }
  componentDidMount() {
    document.title = 'Local Majority | Districts';
  }
  render() {
    const { seats, statesMasterList, regionTypesMasterList } = this.props;
    const { districtsStatesSelected, districtsSeatTypeSelected } = this.state;
    if (districtsStatesSelected) {
      console.log('districtsStatesSelected', districtsStatesSelected);
      console.log('seats', seats);
    }
    // let seatsMeetingFilters = seats.filter(
    //   seat => districtsStatesSelected[seat.state.title]
    // );

    let seatsMeetingFilters =
      districtsStatesSelected && seats
        ? seats.filter(seat => districtsStatesSelected[seat.state.title])
        : [];
    // console.log('--> districtsStatesSelected', districtsStatesSelected);
    // console.log('--> seats', seats);
    // console.log('--> seatsMeetingFilters', seatsMeetingFilters);
    return (
      <div className="Districts">
        { statesMasterList && 
          <Filters>
            <ButtonFilters
              filterCategory="districtsStatesSelected"
              includeAllNone={true}
              masterList={statesMasterList}
              updateFilter={this.updateFilter}
            />
          </Filters>
        }
        <div className="flex">
          {seatsMeetingFilters && seatsMeetingFilters.length ? (
            seatsMeetingFilters.map((seat, i) => (
              <Card
                key={i}
                id={seat.id}
                cardTitle={seat.title}
                imgSrc="missing"
                category="districts"
                slug={seat.slug}
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

