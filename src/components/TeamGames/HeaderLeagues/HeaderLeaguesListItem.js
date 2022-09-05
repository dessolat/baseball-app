import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
  const leagueName = league.title !== 'All' ? league.title : 'All leagues';
	
	const leagueClasses = [cl.league]
	league.id === currentLeague.id && leagueClasses.push(cl.active)

  return (
    <li
      className={leagueClasses.join(' ')}
      onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;
