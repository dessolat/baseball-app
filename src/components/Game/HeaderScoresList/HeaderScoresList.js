import React, { forwardRef } from 'react';
import cl from './HeaderScoresList.module.scss';
import HeaderScoresListItem from './HeaderScoresListItem';

const HeaderScoresList = forwardRef((props, ref) => {
  const { innings, inningNumber, handleClick } = props;
  const maxInnings = innings.length;
	const newInnings = innings.slice()

  if (maxInnings < 9) {
    for (let i = maxInnings + 1; i <= 9; i++) {
			newInnings.push({number: i });
    }
  }

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
