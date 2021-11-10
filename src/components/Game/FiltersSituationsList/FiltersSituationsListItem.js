import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSituationFilter } from 'redux/gameReducer';

const FiltersSituationsListItem = ({ situation, cl }) => {
	const situationFilter = useSelector(state => state.game.situationFilter)
	const dispatch = useDispatch();
  const classes = situationFilter === situation ? cl.active : '';

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <li>
      <button name={situation} onClick={e => dispatch(setSituationFilter(e.currentTarget.name))}>
        <span className={classes}>{capitalizeFirstLetter(situation)}</span>
      </button>
    </li>
  );
};

export default FiltersSituationsListItem;
