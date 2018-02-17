import React, { Component } from 'react';
import { MenuItem, SelectField } from 'material-ui';

/* Calling of this Component should resemble the following:
    <SelectFilter
      filterCategory="candidatesStatesSelected" // <- string representing the name of the variable used as the filter in the parent component
      hintText="select state"                   // <- string used as hint text when no value is selected
      includeAll={true}                         // <- boolean denoting whether all is an option for select
      passedParam                               // <- optional value, representing the selected item IF routing is being used to specify the selected item
      masterList={statesMasterList}             // <- sorted array with all possible values (excepting all/none)
      updateFilter={this.updateFilter}          // <- parent component's function for updating the filter that will be used to display parent component's candidates, articles, districts, etc.
    />
*/

class SelectFilter extends Component {
  constructor(props, context) {
    super(props, context);
    const selectedValues = {};
    if (this.props.includeAll) {
      if (this.props.passedParam) {
        this.props.masterList.forEach(item => {
          selectedValues[item] = false;
        });
        selectedValues[this.props.passedParam] = true;
      } else {
        this.props.masterList.forEach(item => {
          selectedValues[item] = true;
        });
      }
    }
    this.state = { selectedValues };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, i, clickedItem) {
    let selectedValue = clickedItem[0];
    this.props.updateFilter(this.props.filterCategory, selectedValue);
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
