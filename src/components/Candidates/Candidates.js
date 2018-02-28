import React, { Component } from 'react';
import Loading from '../common/Loading';
import Filters from '../common/Filters/Filters';
import SelectFilter from '../common/Filters/SelectFilter';
import HorizontalCards from '../common/Cards/HorizontalCards';
import HorizontalCard from '../common/Cards/HorizontalCard';

class Candidates extends Component {
  constructor(props, context) {
    super(props, context);
    let candidatesStatesSelected = {},
      candidatesRegionTypesSelected = {};
    if (this.props.statesMasterList) {
      if (
        this.props.match.params.state &&
        this.props.statesMasterList.includes(this.props.match.params.state)
      ) {
        this.props.statesMasterList.forEach(stateName => {
          candidatesStatesSelected[stateName] = false;
        });
        candidatesStatesSelected[this.props.match.params.state] = true;
      } else {
        this.props.statesMasterList.forEach(stateName => {
          candidatesStatesSelected[stateName] = true;
        });
      }
    }
    this.state = {
      candidatesStatesSelected,
      candidatesRegionTypesSelected,
      candidatesTextSelected: [],
    };
    this.updateFilter = this.updateFilter.bind(this);
  }
  updateFilter(filterCategory, selectedValue) {
    selectedValue === 'all'
      ? this.props.history.push('/candidates')
      : this.props.history.push(`/candidates/${selectedValue}`);
  }
  componentDidMount() {
    this.props.match.params.state
      ? (document.title = `Local Majority | Candidates | ${
          this.props.match.params.state
        }`)
      : (document.title = 'Local Majority | Candidates');
  }
  render() {
    const isLoading =
      !this.props.candidates ||
      !this.state.candidatesStatesSelected ||
      !Object.keys(this.state.candidatesStatesSelected).length ||
      !this.state.candidatesRegionTypesSelected;
    if (isLoading) {
      return <Loading />;
    }
    const { candidates, statesMasterList, regionTypesMasterList } = this.props;
    const {
      candidatesStatesSelected,
      candidatesRegionTypesSelected,
      candidatesTextSelected,
    } = this.state;
    let candidatesMeetingFilters = this.props.match.params.state
      ? candidates.filter(
          candidate => candidate.state.title === this.props.match.params.state
        )
      : candidates;
    return (
      <div className="Candidates">
        {statesMasterList && (
          <Filters>
            <SelectFilter
              filterCategory="candidatesStatesSelected"
              hintText="select state"
              includeAll={true}
              passedParam={this.props.match.params.state}
              masterList={statesMasterList}
              updateFilter={this.updateFilter}
            />
          </Filters>
        )}
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
                  slug={`${candidate.state.title}/${candidate.slug}`}
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
