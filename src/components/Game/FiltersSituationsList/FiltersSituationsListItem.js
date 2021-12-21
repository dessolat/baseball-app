import React from 'react';
import cl from './FiltersSituationsList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaybackMode, setSituationFilter } from 'redux/gameReducer';

const FiltersSituationsListItem = ({ situation }) => {
  const situationFilter = useSelector(state => state.game.situationFilter);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const dispatch = useDispatch();
  const spanClass = situationFilter === situation.name ? cl.active : '';
	const buttonClass = situation.count <= 1 ? cl.hidden : ''

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
  const handleClick = e => {
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
		const newSituationFilter = situationFilter !== e.currentTarget.name ? e.currentTarget.name : 'All'
    dispatch(setSituationFilter(newSituationFilter));
  };
  return (
    <li>
      <button
        name={situation.name}
        onClick={handleClick}
        data-count={situation.count}
        className={buttonClass}>
        <span className={spanClass}>{capitalizeFirstLetter(situation.name)}</span>
      </button>
    </li>
  );
};

export default FiltersSituationsListItem;
