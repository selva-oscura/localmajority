import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import SelectFilter from '../Filters/SelectFilter';
import Card from '../common/Card';

class Candidates extends Component {
  constructor(props, context) {
    super(props, context);
    let candidatesStatesSelected = {},
      candidatesSeatTypesSelected = {};
    this.props.statesMasterList.forEach(stateName => {
      candidatesStatesSelected[stateName] = true;
    });
    this.state = {
      candidatesStatesSelected,
      candidatesSeatTypesSelected,
      candidatesTextSelected: [],
    };
    this.updateFilter = this.updateFilter.bind(this);
  }
  updateFilter(filterCategory, selectedValues) {
    let state = this.state;
    state[filterCategory] = { ...selectedValues };
    this.setState(state);
  }
  componentDidMount() {
    document.title = 'Local Majority | Candidates';
  }
  render() {
    const { candidates, statesMasterList, seatTypesMasterList } = this.props;
    const {
      candidatesStatesSelected,
      candidatesSeatTypesSelected,
      candidatesTextSelected,
    } = this.state;
    let candidatesMeetingFilters = candidates.filter(
      candidate => candidatesStatesSelected[candidate.stateName]
    );
    return (
      <div className="Candidates">
        <Filters>
          <SelectFilter
            filterCategory="candidatesStatesSelected"
            hintText="select state"
            includeAll={true}
            masterList={statesMasterList}
            updateFilter={this.updateFilter}
          />
        </Filters>
        <div className="flex">
          {candidatesMeetingFilters.length ? (
            candidatesMeetingFilters.map((candidate, i) => {
              let headshotUrl;
              headshotUrl = candidate.headshotSmUrl
                ? candidate.headshotSmUrl
                : candidate.headshotLgUrl;
              return (
                <Card
                  key={i}
                  id={candidate.id}
                  cardTitle={candidate.title}
                  cardSubtitle={candidate.seatName}
                  cardText={candidate.introLinkText}
                  category="candidates"
                  imgSrc={headshotUrl}
                  friendlyId={candidate.friendlyId}
                  imgShape="square"
                />
              );
            })
          ) : (
            <h2>No Candidates Meet Your Criteria.</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Candidates;
