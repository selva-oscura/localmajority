import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import SelectFilter from '../Filters/SelectFilter';
import HorizontalCards from '../common/Cards/HorizontalCards';
import HorizontalCard from '../common/Cards/HorizontalCard';

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
  // updateFilter(filterCategory, selectedValues) {
  //   let state = this.state;
  //   state[filterCategory] = { ...selectedValues };
  //   this.setState(state);
  // }
  componentDidMount() {
    document.title = 'Local Majority | Candidates';
  }
  render() {
    console.log('this.props from Candidates page', this.props)
    const { candidates, statesMasterList, regionTypesMasterList } = this.props;
    const {
      candidatesStatesSelected,
      candidatesSeatTypesSelected,
      candidatesTextSelected,
    } = this.state;
    let candidatesMeetingFilters = candidates.filter(
      candidate => candidatesStatesSelected[candidate.stateName]
    );
    return (<div><h2>Candidates page</h2></div>);
    // return (
    //   <div className="Candidates">
    //     <Filters>
    //       <SelectFilter
    //         filterCategory="candidatesStatesSelected"
    //         hintText="select state"
    //         includeAll={true}
    //         masterList={statesMasterList}
    //         updateFilter={this.updateFilter}
    //       />
    //     </Filters>
    //     {candidatesMeetingFilters.length ? (
    //       <HorizontalCards>
    //         {candidatesMeetingFilters.map((candidate, i) => {
    //           let headshotUrl;
    //           headshotUrl = candidate.headshotSmUrl
    //             ? candidate.headshotSmUrl
    //             : candidate.headshotLgUrl;
    //           return (
    //             <HorizontalCard
    //               key={i}
    //               id={candidate.id}
    //               cardTitle={candidate.title}
    //               cardSubtitle={candidate.seatName}
    //               cardText={candidate.introLinkText}
    //               category="candidates"
    //               imgSrc={headshotUrl}
    //               slug={candidate.slug}
    //               imgShape="square"
    //             />
    //           );
    //         })}
    //       </HorizontalCards>
    //     ) : (
    //       <h2>No Candidates Meet Your Criteria.</h2>
    //     )}
    //   </div>
    // );
  }
}

export default Candidates;
