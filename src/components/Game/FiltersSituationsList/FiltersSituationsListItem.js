import React from 'react';
import cl from './FiltersSituationsList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaybackMode, setSituationFilter } from 'redux/gameReducer';
import { capitalizeFirstLetter } from 'utils';

const FiltersSituationsListItem = ({ situation }) => {
  const situationFilter = useSelector(s => s.game.situationFilter);
  const playbackMode = useSelector(s => s.game.playbackMode);
  const dispatch = useDispatch();
  const spanClass = situationFilter === situation.name ? cl.active : '';
	const buttonClass = situation.count <= 1 ? cl.hidden : ''

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
