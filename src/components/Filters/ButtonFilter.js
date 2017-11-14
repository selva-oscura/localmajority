import React from 'react';
import { RaisedButton } from 'material-ui';

const ButtonFilter = ({
  filterCategory,
  currentItem,
  selectedValues,
  updateSelectedValues,
}) => {
  const handleClick = () => updateSelectedValues(filterCategory, currentItem);
  const style = { margin: '1vw' };
  const [isPrimary, isDefault] =
    selectedValues[currentItem] ||
    (currentItem === 'none' &&
      Object.values(selectedValues).reduce((sum, item) => sum + item, 0) ===
        0) ||
    (currentItem === 'all' &&
      Object.values(selectedValues).reduce((sum, item) => sum + item, 0) ===
        Object.values(selectedValues).length)
      ? [true, false]
      : [false, true];

  return (
    <RaisedButton
      className="ButtonFilter"
      primary={isPrimary}
      default={isDefault}
      label={currentItem}
      style={style}
      onClick={handleClick}
    />
  );
};

export default ButtonFilter;
