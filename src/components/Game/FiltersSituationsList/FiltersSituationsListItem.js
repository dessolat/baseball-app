import React from 'react';

const FiltersSituationsListItem = ({ situationFilter, situation, handleClick, cl }) => {
  const classes = situationFilter === situation ? cl.active : '';
  
	const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <li>
      <button name={situation} onClick={handleClick}>
        <span className={classes}>{capitalizeFirstLetter(situation)}</span>
      </button>
    </li>
  );
};

export default FiltersSituationsListItem;
