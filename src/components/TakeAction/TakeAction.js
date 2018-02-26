import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import ButtonlessFilters from '../Filters/ButtonlessFilters';
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

    return (
      <article className="TakeAction">
        <div className="row">
          <div className="col-xs-12">
            <h1>Take Action</h1>
            <section>
              <h2>Choose Your State</h2>
              <Filters>              
                <ButtonlessFilters
                  filterCategory="stateSelected" // <- this is the name of the variable used as the filter in the parent component
                  masterList={statesMasterList}            // <- sorted array with all possible values (excepting all/none)
                  updateFilter={this.updateFilter}         // <- parent component's function for updating updating the filter that will be used to display parent component's candidates, articles, districts, etc.
                />
              </Filters>
              <p>Filter: {this.state.stateSelected}</p>
            </section>
          </div>
        </div>
      </article>
    );
  }
}

export default TakeAction;
