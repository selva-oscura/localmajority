import React, { Component } from 'react';
import ButtonlessFilter from './ButtonlessFilter';
import PropTypes from 'prop-types';
import './ButtonlessFilters.css';

/* Calling of this Component should resemble the following:
    <ButtonFilters
      filterCategory="districtsStatesSelected" // <- this is the name of the variable used as the filter in the parent component
      includeAll            // <- Boolean showing whether all should be an option
      masterList={statesMasterList}            // <- sorted array with all possible values (excepting all/none)
      updateFilter={this.updateFilter}         // <- parent component's function for updating updating the filter that will be used to display parent component's candidates, articles, districts, etc.
    />
*/

class ButtonlessFilters extends Component {
  constructor(props, context) {
    super(props, context);
    let { includeAll } = this.props;
    let selectedValue = includeAll 
      ? "All"
      : "";
    this.state = {
      selectedValue
    }
    this.updateSelectedValues = this.updateSelectedValues.bind(this);
  }

  updateSelectedValues(filterCategory, currentItem) {
    this.setState({ selectedValue: currentItem });
    this.props.updateFilter(filterCategory, currentItem);
  }

  render() {
    const { filterCategory, includeAll, masterList } = this.props;
    const { selectedValue } = this.state;
    return (
      <div className="ButtonlessFilters">
        <p>
          {includeAll && 
            <ButtonlessFilter
              key="All"
              filterCategory={filterCategory}
              currentItem="All"
              selectedValue={selectedValue}
              updateSelectedValues={this.updateSelectedValues}
            />
          }
          {masterList.map((item, i) => (
            <ButtonlessFilter
              key={i}
              filterCategory={filterCategory}
              currentItem={item}
              selectedValue={selectedValue}
              updateSelectedValues={this.updateSelectedValues}
            />
          ))}
        </p>
      </div>
    );
  }
}

// ButtonFilters.propTypes = {
//   filterCategory: PropTypes.string.isRequired,
//   includeAllNone: PropTypes.boolean,
//   masterList: PropTypes.array.isRequired,
//   updateFilter: PropTypes.function.isRequired,
// };

export default ButtonlessFilters;
