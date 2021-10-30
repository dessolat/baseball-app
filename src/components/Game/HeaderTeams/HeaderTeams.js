import React from 'react';
import cl from './HeaderTeams.module.scss';

const HeaderTeams = ({ names }) => {
  const getShortName = name => (name.length > 8 ? name.slice(0, 7) + '…' : name);

  return (
    <div className={cl.teamNames}>
      <p className={cl.guests}>{getShortName(names[0])}</p>
      <p className={cl.owners}>{getShortName(names[1])}</p>
    </div>
  );
};

export default HeaderTeams;
