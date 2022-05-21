import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
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
      {league.name}
    </li>
  );
};

export default HeaderLeaguesListItem;
