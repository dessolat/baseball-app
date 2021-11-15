import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaybackMode, setSituationFilter } from 'redux/gameReducer';

const FiltersSituationsListItem = ({ situation, cl }) => {
	const situationFilter = useSelector(state => state.game.situationFilter)
	const playbackMode = useSelector(state => state.game.playbackMode)
	const dispatch = useDispatch();
  const classes = situationFilter === situation ? cl.active : '';

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
	const handleClick = e => {
		playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'))
		dispatch(setSituationFilter(e.currentTarget.name))
	}
  return (
    <li>
      <button name={situation} onClick={handleClick}>
        <span className={classes}>{capitalizeFirstLetter(situation)}</span>
      </button>
    </li>
  );
};

export default FiltersSituationsListItem;
