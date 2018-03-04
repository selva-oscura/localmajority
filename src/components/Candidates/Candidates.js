import React, { Component } from 'react';
import Loading from '../common/Loading';
import Aux from '../common/Aux';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';
import HorizontalCards from '../common/Cards/HorizontalCards';
import HorizontalCard from '../common/Cards/HorizontalCard';

class Candidates extends Component {
  state = {
    stateSelected: this.props.match.params.state,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'all'
      ? this.props.history.push('/candidates')
      : this.props.history.push(`/candidates/${selectedValue}`);
  };

  componentDidMount() {
    this.props.match.params.state
      ? (document.title = `Local Majority | Candidates | ${
          this.props.match.params.state
        }`)
      : (document.title = 'Local Majority | Candidates');
  }

  render() {
    const { candidates, statesMasterList } = this.props;

    const candidatesMeetingFilters = this.props.match.params.state
      ? candidates.filter(
          candidate => candidate.state.title === this.props.match.params.state
        )
      : candidates;

    if (!candidates) {
      return <Loading />;
    }

    return (
      <div className="Candidates">
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
