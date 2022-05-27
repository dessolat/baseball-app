import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
  const leagueName = league.name !== 'All' ? league.name : 'All leagues';
  return (
    <li
      className={
        (
          currentLeague.id === undefined
            ? league.name === currentLeague.name || league.name === currentLeague.title
            : league.id === currentLeague.id
        )
          ? cl.league + ' ' + cl.active
          : cl.league
      }
      onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;
