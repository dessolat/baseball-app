import React from 'react';

const GameSituationsListItem = ({ situationFilter, situation, handleClick, cl }) => {
  const classes = situationFilter === situation ? cl.active : ''
	
	return (
    <li>
      <button name={situation} onClick={handleClick}>
        <span className={classes}>{situation}</span>
      </button>
    </li>
  );
};

export default GameSituationsListItem;
