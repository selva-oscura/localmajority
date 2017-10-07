import React from 'react';
import Item from './Item';
// import './Items.css';

const Items = ({ items, category }) => {
  console.log(items, category);
  return (
    <div className="Items">
      {items.map((item, i) => (
        <Item
          key={i}
          title={item.title}
          subtitle={item.summary}
          text={item.text || ''}
          imgSrc={item.imgSrc}
          category={category}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default Items;
