import React from 'react';

const HeaderScoresListItem = ({ inning, inningNumber, cl, handleClick }) => {
  const classes = inning.inning_number === inningNumber ? cl.active : '';

  return (
    <div className={classes} onClick={() => handleClick(inning.inning_number)}>
      <span>{inning.inning_number}</span>
      <span>{inning.attack_score}</span>
      <span>{inning.defence_score}</span>
    </div>
  );
};

export default HeaderScoresListItem;
