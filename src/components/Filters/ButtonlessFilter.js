import React from 'react';
import { RaisedButton } from 'material-ui';

const ButtonlessFilter = ({
  filterCategory,
  currentItem,
  selectedValue,
  updateSelectedValues,
}) => {

  const handleClick = () => updateSelectedValues(filterCategory, currentItem);
  const selectedClassName = (currentItem) => {
    return selectedValue === currentItem
      ? "primary-text-color"
      : "default-text-color";
  }
  return (
    <span
      onClick={handleClick}
      className={selectedClassName(currentItem)}
    >
      {currentItem}
    </span>
  );
};

export default ButtonlessFilter;
