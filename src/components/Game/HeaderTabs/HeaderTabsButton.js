import React from 'react';

const HeaderTabsButton = ({ item, handleClick, getClass }) => {
  return (
    <li>
      <button name={item} onClick={handleClick} className={getClass(item)}>
        {item[0].toUpperCase()}
        {item.slice(1)}
      </button>
    </li>
  );
};

export default HeaderTabsButton;
