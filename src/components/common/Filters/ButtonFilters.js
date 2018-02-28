import React, { Component } from 'react';
import ButtonFilter from './ButtonFilter';
import PropTypes from 'prop-types';
import './ButtonFilters.css';

/* Calling of this Component should resemble the following:
    <ButtonFilters
      filterCategory="districtsStatesSelected" // <- this is the name of the variable used as the filter in the parent component
      includeAllNone={true}                    // <- boolean denoting whether all and none buttons will be displayed
      masterList={statesMasterList}            // <- sorted array with all possible values (excepting all/none)
      updateFilter={this.updateFilter}         // <- parent component's function for updating updating the filter that will be used to display parent component's candidates, articles, districts, etc.
    />
*/

class ButtonFilters extends Component {
  constructor(props, context) {
    super(props, context);
    const selectedValues = {};
    this.props.masterList.forEach(item => (selectedValues[item] = true));
    this.state = { selectedValues };

    this.updateSelectedValues = this.updateSelectedValues.bind(this);
  }
  updateSelectedValues(filterCategory, currentItem) {
    let selectedValues = this.state.selectedValues;
    if (currentItem === 'all') {
      Object.keys(selectedValues).map(key => (selectedValues[key] = true));
    } else if (currentItem === 'none') {
      Object.keys(selectedValues).map(key => (selectedValues[key] = false));
    } else {
      selectedValues[currentItem]
        ? (selectedValues[currentItem] = false)
        : (selectedValues[currentItem] = true);
    }
    this.setState({ selectedValues });
    this.props.updateFilter(filterCategory, selectedValues);
  }
  render() {
    const { filterCategory, includeAllNone, masterList } = this.props;
    const { selectedValues } = this.state;
    return (
      <div className="ButtonFilters">
        {includeAllNone && [
          <ButtonFilter
            key="all"
            filterCategory={filterCategory}
            currentItem="all"
            selectedValues={selectedValues}
            updateSelectedValues={this.updateSelectedValues}
          />,
          <ButtonFilter
            key="none"
            filterCategory={filterCategory}
            currentItem="none"
            selectedValues={selectedValues}
            updateSelectedValues={this.updateSelectedValues}
          />,
        ]}
        {masterList.map((item, i) => (
          <ButtonFilter
            key={i}
            filterCategory={filterCategory}
            currentItem={item}
            selectedValues={selectedValues}
            updateSelectedValues={this.updateSelectedValues}
          />
        ))}
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

export default ButtonFilters;
