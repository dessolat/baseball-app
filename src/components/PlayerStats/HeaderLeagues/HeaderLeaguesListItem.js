import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
	const leagueName = league.title !== 'All' ? league.title : 'All leagues';
  return (
    <li
      className={league.id === currentLeague.id ? cl.league + ' ' + cl.active : cl.league}
      onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;
