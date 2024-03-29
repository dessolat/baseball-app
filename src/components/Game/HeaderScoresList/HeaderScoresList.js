import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCard, setPlaybackMode } from 'redux/gameReducer';
import cl from './HeaderScoresList.module.scss';
import HeaderScoresListItem from './HeaderScoresListItem';
import classNames from 'classnames';

const HeaderScoresList = forwardRef(({ innings, currentTab }, ref) => {
  const inningNumber = useSelector(state => state.game.inningNumber);
  const filteredCards = useSelector(state => state.game.filteredCards);
  const dispatch = useDispatch();
  const maxInnings = innings.length;
  const newInnings = innings.slice();

  if (maxInnings < 9) {
    for (let i = maxInnings + 1; i <= 9; i++) {
      newInnings.push({ number: i });
    }
  }

  const handleClick = (number, side) => () => {
    dispatch(setPlaybackMode('pause'));
    const newCurrentCard = filteredCards.find(card => card.inning_number === number && card.side === side);
    newCurrentCard && dispatch(setCurrentCard({ ...newCurrentCard, manualClick: false }));
  };

  const renderedInnings = newInnings.map(inning => (
    <HeaderScoresListItem
      key={inning.number}
      inning={inning}
      inningNumber={inningNumber}
      maxInnings={maxInnings}
      cl={cl}
      handleClick={handleClick}
      currentTab={currentTab}
    />
  ));

  const listClasses = classNames(cl.scoresTable, { [cl.inActiveList]: currentTab === 'box' });
  return (
    <ul ref={ref} className={listClasses}>
      {renderedInnings}
    </ul>
  );
});

export default HeaderScoresList;
