import classNames from 'classnames';
import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague, isLoading }) => {
  const leagueName = league.name !== 'All' ? league.name : 'All leagues';

  const itemClasses = classNames(cl.league, {
    [cl.active]:
      currentLeague.id === undefined
        ? league.name === currentLeague.name || league.name === currentLeague.title
        : league.id === currentLeague.id,
    [cl.lightGray]: isLoading
  });
  return (
    <li className={itemClasses} onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;
