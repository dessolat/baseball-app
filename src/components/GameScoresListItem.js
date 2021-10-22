import React from 'react';

const GameScoresListItem = ({inning}) => {
  return (
    <div>
      <span>{inning.inning_number}</span>
      <span>{inning.attack_score}</span>
      <span>{inning.defence_score}</span>
    </div>
  );
};

export default GameScoresListItem;
