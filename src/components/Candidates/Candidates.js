import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import SelectFilter from '../Filters/SelectFilter';
import HorizontalCards from '../common/Cards/HorizontalCards';
import HorizontalCard from '../common/Cards/HorizontalCard';

class Candidates extends Component {
  constructor(props, context) {
    super(props, context);
    let candidatesStatesSelected = {},
      candidatesRegionTypesSelected = {};
    if (this.props.statesMasterList) {
      this.props.statesMasterList.forEach(stateName => {
        candidatesStatesSelected[stateName] = true;
      });
    }
    this.state = {
      candidatesStatesSelected,
      candidatesRegionTypesSelected,
      candidatesTextSelected: [],
    };
    console.log('this.props from constructor', this.props);
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
    console.log('this.props from Candidates page', this.props);
    const { candidates, statesMasterList, regionTypesMasterList } = this.props;
    const {
      candidatesStatesSelected,
      candidatesRegionTypesSelected,
      candidatesTextSelected,
    } = this.state;
    let candidatesMeetingFilters =
      candidates &&
      candidates.filter(
        candidate => candidatesStatesSelected[candidate.state.title]
      );
    return (
      <div className="Candidates">
        {candidatesMeetingFilters && candidatesMeetingFilters.length ? (
          <HorizontalCards>
            {candidatesMeetingFilters.map((candidate, i) => {
              const headshotUrl = candidate.headshotId.url
                ? candidate.headshotId.url
                : null;
              const seatTitle =
                candidate &&
                candidate.contestId &&
                candidate.contestId.seatId &&
                candidate.contestId.seatId.title
                  ? candidate.contestId.seatId.title
                  : null;
              return (
                <HorizontalCard
                  key={i}
                  id={candidate.id}
                  cardTitle={candidate.title}
                  cardSubtitle={seatTitle}
                  cardTextHtml={candidate.summaryText}
                  category="candidates"
                  imgSrc={headshotUrl}
                  slug={candidate.slug}
                  imgShape="square"
                />
              );
            })}
          </HorizontalCards>
        ) : (
          <h2>No Candidates Meet Your Criteria.</h2>
        )}
      </div>
    );
  }
}

export default Candidates;
// <Filters>
//   <SelectFilter
//     filterCategory="candidatesStatesSelected"
//     hintText="select state"
//     includeAll={true}
//     masterList={statesMasterList}
//     updateFilter={this.updateFilter}
//   />
// </Filters>
