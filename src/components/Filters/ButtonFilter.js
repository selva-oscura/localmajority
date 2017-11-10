import React from 'react';
import { RaisedButton } from 'material-ui';

const ButtonFilter = ({ filterCategory, currentItem, filterItems, updateFilter }) => {

  const handleClick = () => updateFilter(filterCategory, currentItem);
  const style = { margin: 4 };
  const [isPrimary, isDefault] = 
  	filterItems[currentItem] 
  	|| (currentItem === "none" && Object.entries(filterItems).reduce((sum, item) => (sum + item[1]), 0) === 0) 
  	|| (currentItem==="all" && Object.entries(filterItems).reduce((sum, item) => (sum + item[1]), 0) === Object.entries(filterItems).length) 
  	? [true, false] 
  	: [false, true];
  
  return (
    <RaisedButton
    	className='ButtonFilter'
    	primary={isPrimary}
    	default={isDefault}
    	label={currentItem}
    	style={style}
    	onClick={handleClick}
    />
  );
};

export default ButtonFilter;
