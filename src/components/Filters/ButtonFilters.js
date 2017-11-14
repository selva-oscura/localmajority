import React, { Component } from 'react';
import ButtonFilter from './ButtonFilter';

class ButtonFilters extends Component {
  constructor(props, context) {
    super(props, context);
    const selectedValues = {};
    this.props.masterList.forEach(item => {
      selectedValues[item] = true;
    });
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
    const {
      filterCategory,
      includeAllNone,
      masterList,
      filterItems,
      updateFilter,
    } = this.props;
    const { selectedValues } = this.state;
    return (
      <div className="ButtonFilters flex">
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

export default ButtonFilters;
