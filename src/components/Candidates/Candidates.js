import React, { Component } from 'react';
import Loading from '../common/Loading';
import Aux from '../common/Aux';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';
import HorizontalCards from '../common/Cards/HorizontalCards';
import HorizontalCard from '../common/Cards/HorizontalCard';
import Section from '../common/Section/Section';

class Candidates extends Component {
  state = {
    stateSelected: this.props.match.params.state,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'All'
      ? this.props.history.push('/candidates')
      : this.props.history.push(`/candidates/${selectedValue}`);
  };

  componentDidMount() {
    const { statesMasterList } = this.props;
    if (
      !statesMasterList.includes(this.props.match.params.state) &&
      this.props.match.params.state
    ) {
      return this.props.history.push('/candidates');
    }
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
      <article className="Candidates">
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background=""
        >
          <h2 className="text-center">
            Our <span className="tertiary-text-color">Candidates</span>
          </h2>
          <p className="text-center">
            Local Majority is supporting progressive Democratic candidates in
            State House and State Senate races where we can make a difference
            and flip seats blue.
          </p>
        </Section>

        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="light"
        >
          <div className="row">
            <div className="col">
              {statesMasterList && (
                <Aux>
                  <h3 className="text-center">Select Your State</h3>
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
        </Section>

        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background=""
        >
          <div className="row">
            <div className="col">
              {candidatesMeetingFilters && candidatesMeetingFilters.length ? (
                <HorizontalCards>
                  {candidatesMeetingFilters.map((candidate, i) => {
                    const headshotUrl =
                      candidate.headshotId && candidate.headshotId.url
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
          </div>
        </Section>
      </article>
    );
  }
}

export default Candidates;
