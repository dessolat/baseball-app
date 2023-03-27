import classNames from 'classnames';
import React from 'react';
import cl from './HeaderLeagues.module.scss';

const HeaderLeaguesListItem = ({ league, handleClick, currentLeague, isLoading }) => {
  const leagueName = league.title !== 'All' ? league.title : 'All leagues';

  const itemClasses = classNames(cl.league, {
    [cl.active]: league.title === currentLeague.title || league.title === currentLeague.name,
    [cl.lightGray]: isLoading
  });
  return (
    <li className={itemClasses} onClick={handleClick(league)}>
      {leagueName}
    </li>
  );
};

export default HeaderLeaguesListItem;