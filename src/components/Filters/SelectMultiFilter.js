import React from 'react';
import { MenuItem, SelectField } from 'material-ui';

const SelectMultiFilter = ({
  filterCategory,
  hintText,
  includeAllNone,
  masterList,
  filterItems,
  updateFilter,
}) => {
  const handleChange = (e, i, clickedItem) =>
    updateFilter(filterCategory, clickedItem[0]);
  const selectionRenderer = () => {
    const selectionArr = Object.entries(filterItems)
      .filter(filterItem => filterItem[1])
      .map(filterItem => filterItem[[0]]);
    return selectionArr.length ? (
      selectionArr.join(', ')
    ) : (
      <span style={{ color: '#007bff' }}>{hintText}</span>
    );
  };
  const menuItems = (masterList, filterItems) => {
    return masterList.map(item => (
      <MenuItem
        key={item}
        insetChildren={true}
        checked={filterItems && filterItems[item]}
        value={item}
        primaryText={item}
      />
    ));
  };
  const totalSelected = Object.entries(filterItems).reduce(
    (sum, item) => sum + item[1],
    0
  );
  return (
    <SelectField
      multiple={true}
      selectionRenderer={selectionRenderer}
      onChange={handleChange}
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
      {menuItems(masterList, filterItems)}
    </SelectField>
  );
};

export default SelectMultiFilter;
