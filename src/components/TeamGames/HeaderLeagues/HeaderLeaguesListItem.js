import React from 'react';
import cl from './HeaderLeagues.module.scss';
import classNames from 'classnames';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague }) => {
  const leagueName = league.title !== 'All' ? league.title : 'All leagues';

  const leagueClasses = classNames(cl.league, {
    [cl.active]: league.id === currentLeague.id
  });

  return (
    <li className={leagueClasses} onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;
