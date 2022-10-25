import React from 'react';
import { capitalizeFirstLetter } from 'utils';

const HeaderTabsButton = ({ item, handleClick, getClass }) => {
  const itemName = item === 'hit' ? 'hitting' : item === 'run' ? 'running' : item;

  return (
    <li>
      <button name={itemName} onClick={handleClick} className={getClass(itemName)}>
        {capitalizeFirstLetter(item)}
      </button>
    </li>
  );
};

export default HeaderTabsButton;
