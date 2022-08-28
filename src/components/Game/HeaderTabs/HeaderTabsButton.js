import React from 'react';
import { capitalizeFirstLetter } from 'utils';

const HeaderTabsButton = ({ item, handleClick, getClass }) => {
  return (
    <li>
      <button name={item} onClick={handleClick} className={getClass(item)}>
				{capitalizeFirstLetter(item)}
        {/* {item[0].toUpperCase()}
        {item.slice(1)} */}
      </button>
    </li>
  );
};

export default HeaderTabsButton;
