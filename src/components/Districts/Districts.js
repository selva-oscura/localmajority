import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';
import GridXSmallIsOneSmallIsThree from '../common/Grids/GridXSmallIsOneSmallIsThree';
import CardHover from '../common/Cards/CardHover';
import FooterCard from '../common/Cards/FooterCard';
import Aux from '../common/Aux';

class Districts extends Component {
  state = {
    stateSelected: this.props.match.params.state,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'All'
      ? this.props.history.push('/states')
      : this.props.history.push(`/states/${selectedValue}`);
  };

  componentDidMount() {
    this.props.match.params.state
      ? (document.title = `Local Majority | Districts | ${
          this.props.match.params.state
        }`)
      : (document.title = 'Local Majority | Districts');
  }
  render() {
    const { seats, statesMasterList } = this.props;
    const seatsMeetingFilters = this.props.match.params.state
      ? seats.filter(seat => seat.state.title === this.props.match.params.state)
      : seats;

    return (
      <div className="Districts">
        <div className="row">
          <div className="col">
            {statesMasterList && (
              <Aux>
                <h3>Select Your State</h3>
                <Filters>
                  <ButtonlessFilters
                    filterCategory="stateSelected"
                    passedParam={this.state.stateSelected}
                    masterList={statesMasterList}
                    updateFilter={this.updateFilter}
                  />
                </Filters>
              </Aux>
            )}
          </div>
        </div>
        <div className="row">
          {seatsMeetingFilters && seatsMeetingFilters.length ? (
            seatsMeetingFilters.map((seat, i) => (
              <GridXSmallIsOneSmallIsThree key={i}>
                <CardHover>
                  <Link to={`/states/${seat.state.title}/${seat.slug}`}>
                    <FooterCard cardTitle={seat.title} imgSrc="missing" />
                  </Link>
                </CardHover>
              </GridXSmallIsOneSmallIsThree>
            ))
          ) : (
            <h2 className="col">No Districts Meet Your Criteria.</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Districts;
