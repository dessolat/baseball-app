import React from 'react';

const HeaderScoresListItem = ({ inning, inningNumber, maxInnings, cl, handleClick }) => {
  const outerClass = inning.number === inningNumber ? cl.active : '';
  const innerClass = inning.bot_runs === undefined ? cl.hidden : '';

  return (
    <>
      {inning.number <= maxInnings ? (
        <div className={outerClass} onClick={() => handleClick(inning.number)}>
          <span>{inning.number}</span>
          <span>{inning.top_runs !== undefined ? inning.top_runs : 0}</span>
          <span className={innerClass}>{inning.bot_runs !== undefined ? inning.bot_runs : 0}</span>
        </div>
      ) : (
        <div>
          <span>{inning.number}</span>
          <span className={cl.hidden}>0</span>
          <span className={cl.hidden}>0</span>
        </div>
      )}
    </>
  );
};

export default HeaderScoresListItem;
