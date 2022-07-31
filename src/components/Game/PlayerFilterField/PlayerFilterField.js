import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCards, setPlayerCardFilter } from 'redux/gameReducer';
import cl from './PlayerFilterField.module.scss';

const PlayerFilterField = () => {
  const [filterValue, setFilterValue] = useState('');

  const filteredCards = useSelector(state => state.game.filteredCards);
  const dispatch = useDispatch();

  const filterTimeoutRef = useRef();
  console.log(filteredCards);
  const changeHandler = e => {
    const value = e.target.value;
    setFilterValue(value);
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      // const filterArr = value.split(' ');

      // const newCards =
      //   value !== ''
      //     ? filteredCards.filter(card => {
      //         return filterArr.reduce((sum, word) => {
      //           if (!(card.who.slice(0, word.length).toLowerCase() === word.toLowerCase())) {
      //             sum = false;
      //           }
      //           return sum;
      //         }, true);
      //       })
      //     : filteredCards;

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
