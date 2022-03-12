import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';

const HeaderLeaguesList = ({ leagues }, ref) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const dispatch = useDispatch();

  const handleLeagueClick = league => () => dispatch(setCurrentLeague(league));

  return (
    <ul className={cl.leagues} ref={ref}>
      {leagues.map(league => (
        <HeaderLeaguesListItem
          key={league.id}
          league={league}
          handleClick={handleLeagueClick}
          currentLeague={currentLeague}
        />
      ))}
    </ul>
  );
};

export default forwardRef(HeaderLeaguesList);
