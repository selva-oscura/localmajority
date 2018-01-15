import React, { Component } from 'react';
import { MenuItem, SelectField } from 'material-ui';

/* Calling of this Component should resemble the following:
    <SelectFilter
      filterCategory="candidatesStatesSelected" // <- this is the name of the variable used as the filter in the parent component
      hintText="select state"
      includeAll={true}                         // <- boolean denoting whether all is an option for select
      masterList={statesMasterList}             // <- sorted array with all possible values (excepting all/none)
      updateFilter={this.updateFilter}          // <- parent component's function for updating updating the filter that will be used to display parent component's candidates, articles, districts, etc.
    />
*/

class SelectFilter extends Component {
  constructor(props, context) {
    super(props, context);
    const selectedValues = {};
    if (this.props.includeAll) {
      this.props.masterList.forEach(item => {
        selectedValues[item] = true;
      });
    }
    this.state = { selectedValues };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, i, clickedItem) {
    let selectedValues = this.state.selectedValues;
    this.setState({ selectedValues: clickedItem[0] });
    if (clickedItem[0] === 'all') {
      Object.keys(selectedValues).map(key => (selectedValues[key] = true));
    } else {
      Object.keys(selectedValues).map(key => (selectedValues[key] = false));
      selectedValues[clickedItem[0]] = true;
    }
    this.setState({ selectedValues });
    this.props.updateFilter(this.props.filterCategory, selectedValues);
  }
  render() {
    const { filterCategory, hintText, includeAll, masterList } = this.props;
    const menuItems = (masterList, selectedValues) =>
      masterList.map(item => (
        <MenuItem
          key={item}
          insetChildren={true}
          checked={selectedValues && selectedValues[item]}
          value={item}
          primaryText={item}
        />
      ));
    const selectionRenderer = () => {
      const selectionArr = Object.entries(this.state.selectedValues)
        .filter(filterItem => filterItem[1])
        .map(filterItem => filterItem[[0]]);
      return selectionArr.length ? (
        selectionArr.join(', ')
      ) : (
        <span style={{ color: '#007bff' }}>{hintText}</span>
      );
    };
    const totalSelected = Object.values(this.state.selectedValues).reduce(
      (sum, item) => sum + item,
      0
    );
    return (
      <SelectField
        multiple={true}
        selectionRenderer={selectionRenderer}
        onChange={this.handleChange}
      >
        {includeAll && (
          <MenuItem
            key="all"
            insetChildren={true}
            checked={totalSelected === masterList.length}
            value="all"
            primaryText="All"
          />
        )}
        {menuItems(masterList, this.state.selectedValues)}
      </SelectField>
    );
  }
}

export default SelectFilter;
