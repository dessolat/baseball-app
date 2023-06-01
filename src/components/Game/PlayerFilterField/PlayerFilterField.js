import classNames from 'classnames';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPlayerCardFilter, togglePlayerCardFilterBy, setPlayerCardFilterFocused } from 'redux/gameReducer';
import cl from './PlayerFilterField.module.scss';

const PlayerFilterField = () => {
	const isFilteredPlayer = useSelector(s => s.game.isFilteredPlayer)
	const playerCardFilterBy = useSelector(s => s.game.playerCardFilterBy)
	const playerCardFilter = useSelector(s => s.game.playerCardFilter)

  const [filterValue, setFilterValue] = useState(playerCardFilter);
	
  const dispatch = useDispatch();

  const filterTimeoutRef = useRef();

  const changeHandler = e => {
    const value = e.target.value;
    setFilterValue(value);
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      dispatch(setPlayerCardFilter(value));
    }, 400);
  };

  const inputClasses = classNames([cl.filterPlayerField], {
    [cl.noPlayerFiltered]: !isFilteredPlayer
  });

  const btnText = playerCardFilterBy === 'pitcher' ? 'P' : 'B';

  const handleBtnClick = () => dispatch(togglePlayerCardFilterBy());
  const handleFieldFocus = () => dispatch(setPlayerCardFilterFocused(true));
  const handleFieldBlur = () => dispatch(setPlayerCardFilterFocused(false));
  return (
    <div className={cl.filterFieldsWrapper}>
      <button className={cl.btn} onClick={handleBtnClick}>
        {btnText}
      </button>
      <input
        placeholder='Search of player'
        value={filterValue}
        onChange={changeHandler}
        className={inputClasses}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
      />
    </div>
  );
};

export default PlayerFilterField;
