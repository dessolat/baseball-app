import classNames from 'classnames';

const HeaderScoresListItem = ({ inning, inningNumber, maxInnings, cl, handleClick, currentTab }) => {
  const outerClasses = classNames({ [cl.active]: inning.number === inningNumber && currentTab !== 'box' });
  const innerClasses = classNames({ [cl.hidden]: inning['bottom/owners'] === undefined });

  const topScore = inning['top/guests'] ? inning.top_runs || 0 : 0;
  const botScore = inning['bottom/owners'] ? inning.bot_runs || 0 : 0;

  // Render main innings
  if (inning.number <= maxInnings) {
    return (
      <div className={outerClasses}>
        <span>{inning.number}</span>
        <span onClick={handleClick(inning.number, 'top')}>{topScore}</span>
        <span onClick={handleClick(inning.number, 'bottom')} className={innerClasses}>
          {botScore}
        </span>
      </div>
    );
  }

  // Render empty innings
  return (
    <div>
      <span>{inning.number}</span>
      <span className={cl.hidden}>0</span>
      <span className={cl.hidden}>0</span>
    </div>
  );
};

export default HeaderScoresListItem;
