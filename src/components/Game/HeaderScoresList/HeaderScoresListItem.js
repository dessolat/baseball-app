import React from 'react';

const HeaderScoresListItem = ({inning}) => {
  return (
    <div>
      <span>{inning.inning_number}</span>
      <span>{inning.attack_score}</span>
      <span>{inning.defence_score}</span>
    </div>
  );
};

export default HeaderScoresListItem;
