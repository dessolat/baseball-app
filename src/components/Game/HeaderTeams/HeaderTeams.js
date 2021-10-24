import React from 'react';
import cl from './HeaderTeams.module.scss';

const HeaderTeams = ({ names }) => {
  return (
    <div className={cl.teamNames}>
      <p className={cl.teamAttack}>{names.attack_team}</p>
      <p className={cl.teamDefence}>{names.defence_team}</p>
    </div>
  );
};

export default HeaderTeams;
