import React from 'react';
import cl from './GameTeams.module.scss';

const GameTeams = ({ names }) => {
  return (
    <div className={cl.teamNames}>
      <p className={cl.teamAttack}>{names.attack_team}</p>
      <p className={cl.teamDefence}>{names.defence_team}</p>
    </div>
  );
};

export default GameTeams;
