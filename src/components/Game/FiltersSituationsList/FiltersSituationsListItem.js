import React from 'react';

const FiltersSituationsListItem = ({ situationFilter, situation, handleClick, cl }) => {
  const classes = situationFilter === situation ? cl.active : ''
	
	return (
    <li>
      <button name={situation} onClick={handleClick}>
        <span className={classes}>{situation}</span>
      </button>
    </li>
  );
};

export default FiltersSituationsListItem;
