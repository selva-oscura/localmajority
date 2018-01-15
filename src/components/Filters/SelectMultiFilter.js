import React, { Component } from 'react';
import { MenuItem, SelectField } from 'material-ui';

/* Calling of this Component should resemble the following:
    <SelectMultiFilter
      filterCategory="candidatesStatesSelected" // <- this is the name of the variable used as the filter in the parent component
      hintText="select state"
      includeAllNone={true}                     // <- boolean denoting whether all and none are options for select
      masterList={statesMasterList}             // <- sorted array with all possible values (excepting all/none)
      updateFilter={this.updateFilter}          // <- parent component's function for updating updating the filter that will be used to display parent component's candidates, articles, districts, etc.
    />
*/

class SelectMultiFilter extends Component {
  constructor(props, context) {
    super(props, context);
    const selectedValues = {};
    this.props.masterList.forEach(item => {
      selectedValues[item] = true;
    });
    this.state = { selectedValues };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, i, clickedItem) {
    let selectedValues = this.state.selectedValues;
    if (clickedItem[0] === 'all') {
      Object.keys(selectedValues).map(key => (selectedValues[key] = true));
    } else if (clickedItem[0] === 'none') {
      Object.keys(selectedValues).map(key => (selectedValues[key] = false));
    } else {
      selectedValues[clickedItem]
        ? (selectedValues[clickedItem] = false)
        : (selectedValues[clickedItem] = true);
    }
    this.setState({ selectedValues });
    this.props.updateFilter(this.props.filterCategory, selectedValues);
  }
  render() {
    const { filterCategory, hintText, includeAllNone, masterList } = this.props;
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
        {includeAllNone && [
          <MenuItem
            key="all"
            insetChildren={true}
            checked={totalSelected === masterList.length}
            value="all"
            primaryText="All"
          />,
          <MenuItem
            key="none"
            insetChildren={true}
            checked={totalSelected === 0}
            value="none"
            primaryText="None"
          />,
        ]}
        {menuItems(masterList, this.state.selectedValues)}
      </SelectField>
    );
  }
}

export default SelectMultiFilter;
