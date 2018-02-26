import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import ButtonlessFilters from '../Filters/ButtonlessFilters';
import Aux from '../common/Aux';
// import './TakeAction.css';

class TakeAction extends Component {
  state = {
    stateSelected: "All",
  }

  updateFilter = (filterCategory, selectedValues) => {
    this.setState({stateSelected: selectedValues});
  };

  render(){
    const { statesMasterList } = this.props;
    const regionText = this.state.stateSelected === "All" 
      ? "America" 
      : this.state.stateSelected;
    return (
      <article className="TakeAction">
        <div className="row">
          <div className="col-xs-12">
            <section>
              <h2 className="text-right secondary-text-color">Your Vote is Your Voice</h2>
              <h1>Take Action!</h1>
              <h3>Choose Your State</h3>
              <Filters>              
                <ButtonlessFilters
                  filterCategory="stateSelected"
                  masterList={statesMasterList}
                  updateFilter={this.updateFilter}
                />
              </Filters>
              <h2 className="tertiary-text-color">NOTE: content in red on this page is currently being used to specify content that will need to be changed in response to the individual state.  In the long-run we may want to use red for deadlines and other particularly emphasized issues....</h2>
              <p>Filter: {this.state.stateSelected}</p>
            </section>
            <hr />
            <section>
              <h2 className="text-right secondary-text-color">Voting is not a Spectator Sport</h2>
              <h2>Voter Registration</h2>
            </section>
            <hr />
            <section>
              <h2 className="text-right secondary-text-color">Your Vote Counts More than Ever!<br />
                &amp; it is the Only Way to turn {regionText} Blue Again</h2>
              <h2>Vote By Mail</h2>
            </section>
            <hr />
            <section>
              <h2 className="text-right secondary-text-color">TIME TO GET OUT THE VOTE!!</h2>
              <h2>Volunteer</h2>
            </section>
            <hr />
            <h2 className="text-right secondary-text-color">DEMOCRACY’S ONLY HOPE!</h2>

          </div>
        </div>
      </article>
    );
  }
}

export default TakeAction;
