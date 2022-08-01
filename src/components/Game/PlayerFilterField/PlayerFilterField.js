import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayerCardFilter } from 'redux/gameReducer';
import cl from './PlayerFilterField.module.scss';

const PlayerFilterField = () => {
  const [filterValue, setFilterValue] = useState('');

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
  return (
    <input
      placeholder='Search of player'
      value={filterValue}
      onChange={changeHandler}
      className={cl.filterPlayerField}
    />
  );
};

export default PlayerFilterField;
