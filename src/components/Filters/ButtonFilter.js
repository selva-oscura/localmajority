import React from 'react';
import { RaisedButton } from 'material-ui';

const ButtonFilter = ({ filterCategory, currentItem, filterItems, updateFilter }) => {

  const handleClick = () => updateFilter(filterCategory, currentItem);
  const style = { margin: 4 };
  const [isPrimary, isDefault] = filterItems[currentItem] 
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
