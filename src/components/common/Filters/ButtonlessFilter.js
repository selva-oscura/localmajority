import React from 'react';
import { slugToTitleCase } from '../../../utils/functions';

const ButtonlessFilter = ({
  filterCategory,
  currentItem,
  selectedValue,
  updateSelectedValues,
}) => {
  const handleClick = () => updateSelectedValues(filterCategory, currentItem);
  const selectedClassName = currentItem => {
    return selectedValue === currentItem ||
      (currentItem === 'All' && selectedValue === '')
      ? 'primary-text-color selected'
      : 'secondary-text-color';
  };
  return (
    <li onClick={handleClick} className={selectedClassName(currentItem)}>
      {slugToTitleCase(currentItem)}
    </li>
  );
};

export default ButtonlessFilter;
