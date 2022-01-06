import React from 'react';

const HeaderScoresListItem = ({ inning, inningNumber, maxInnings, cl, handleClick }) => {
  const outerClass = inning.number === inningNumber ? cl.active : '';
  const innerClass = inning.bot_runs === undefined ? cl.hidden : '';

  return (
    <>
      {inning.number <= maxInnings ? (
        <div className={outerClass}>
          <span>{inning.number}</span>
          <span onClick={handleClick(inning.number, 'top')}>{inning.top_runs ?? 0}</span>
          <span onClick={handleClick(inning.number, 'bottom')} className={innerClass}>{inning.bot_runs ?? 0}</span>
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
