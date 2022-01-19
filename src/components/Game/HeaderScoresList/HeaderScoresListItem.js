import React from 'react';

const HeaderScoresListItem = ({ inning, inningNumber, maxInnings, cl, handleClick }) => {
  const outerClass = inning.number === inningNumber ? cl.active : '';
  const innerClass = inning['bottom/owners'] === undefined ? cl.hidden : '';

  const topScore = inning['top/guests'] ? inning.top_runs || 0 : 0;
  const botScore = inning['bottom/owners'] ? inning.bot_runs || 0 : 0;

  const renderedComp =
    inning.number <= maxInnings ? (
      <div className={outerClass}>
        <span>{inning.number}</span>
        <span onClick={handleClick(inning.number, 'top')}>{topScore}</span>
        <span onClick={handleClick(inning.number, 'bottom')} className={innerClass}>
          {botScore}
        </span>
      </div>
    ) : (
      <div>
        <span>{inning.number}</span>
        <span className={cl.hidden}>0</span>
        <span className={cl.hidden}>0</span>
      </div>
    );
  return <>{renderedComp}</>;
};

export default HeaderScoresListItem;
