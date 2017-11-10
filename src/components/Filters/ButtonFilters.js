import React from 'react';
import ButtonFilter from './ButtonFilter';

const ButtonFilters = ({
  filterCategory,
  masterList,
  filterItems,
  updateFilter,
}) => (
  <div className="ButtonFilters flex">
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
