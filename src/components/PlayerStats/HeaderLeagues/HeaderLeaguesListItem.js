import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
  return (
    <li
      className={league.id === currentLeague.id ? cl.league + ' ' + cl.active : cl.league}
      onClick={handleClick(league)}>
      {league.title}
    </li>
  );
};

export default HeaderLeaguesListItem;
