import React, { forwardRef } from 'react';
import cl from './HeaderScoresList.module.scss';
import HeaderScoresListItem from './HeaderScoresListItem';

const HeaderScoresList = forwardRef((props, ref) => {
	const { data, inningNumber, handleClick } = props
  return (
    <ul ref={ref} className={cl.scoresTable}>
      {data.map(inning => (
        <HeaderScoresListItem
          key={inning.inning_number}
          inning={inning}
          inningNumber={inningNumber}
          cl={cl}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
});

export default HeaderScoresList;
