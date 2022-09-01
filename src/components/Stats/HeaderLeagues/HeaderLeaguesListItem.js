import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
  const leagueName = league.title !== 'All' ? league.title : 'All leagues';
	
  const classes = [cl.league];
  (league.title === currentLeague.title || league.title === currentLeague.name) && classes.push(cl.active);
  return (
    <li className={classes.join(' ')} onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;
