import React from 'react';
import ButtonFilter from './ButtonFilter';

const ButtonFilters = ({
  filterCategory,
  includeAllNone,
  masterList,
  filterItems,
  updateFilter,
}) => (
  <div className="ButtonFilters flex">
    {includeAllNone && [
      <ButtonFilter
        key="all"
        filterCategory={filterCategory}
        currentItem="all"
        filterItems={filterItems}
        updateFilter={updateFilter}
      />,
      <ButtonFilter
        key="none"
        filterCategory={filterCategory}
        currentItem="none"
        filterItems={filterItems}
        updateFilter={updateFilter}
      />,
    ]}
    {masterList.map((item, i) => (
      <ButtonFilter
        key={i}
        filterCategory={filterCategory}
        currentItem={item}
        filterItems={filterItems}
        updateFilter={updateFilter}
      />
    ))}
  </div>
);

export default ButtonFilters;
