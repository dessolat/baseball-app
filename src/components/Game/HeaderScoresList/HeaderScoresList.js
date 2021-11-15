import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInningNumber, setPlaybackMode, setSituationFilter } from 'redux/gameReducer';
import cl from './HeaderScoresList.module.scss';
import HeaderScoresListItem from './HeaderScoresListItem';

const HeaderScoresList = forwardRef(({ innings }, ref) => {
  const inningNumber = useSelector(state => state.game.inningNumber);
  const playbackMode = useSelector(state => state.game.playbackMode);
  const situationFilter = useSelector(state => state.game.situationFilter);
  const dispatch = useDispatch();
  const maxInnings = innings.length;
  const newInnings = innings.slice();

  if (maxInnings < 9) {
    for (let i = maxInnings + 1; i <= 9; i++) {
      newInnings.push({ number: i });
    }
  }

  const handleClick = number => {
    playbackMode !== 'pause' && dispatch(setPlaybackMode('pause'));
		situationFilter !== 'All' && dispatch(setSituationFilter('All'))
    dispatch(setInningNumber(inningNumber === number ? null : number));
  };

  return (
    <ul ref={ref} className={cl.scoresTable}>
      {newInnings.map(inning => (
        <HeaderScoresListItem
          key={inning.number}
          inning={inning}
          inningNumber={inningNumber}
          maxInnings={maxInnings}
          cl={cl}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
});

export default HeaderScoresList;
