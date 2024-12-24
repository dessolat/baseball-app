import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';
import { useStatsLoadingCtx } from 'context/StatsLoadingContext';

const HeaderLeaguesList = ({ leagues }, ref) => {
  const isLoading = useStatsLoadingCtx();

  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const dispatch = useDispatch();

  const handleLeagueClick = league => () => {
    if (isLoading) return;

    const { id, title } = league;

    dispatch(setCurrentLeague({ ...league, name: title, title, id }));
  };

  return (
    <ul className={cl.leagues} ref={ref}>
      {leagues
        .filter(
          league =>
            (league.type === currentGameType || league.id === -1 || league.id === -2) && league.id !== null
        )
        .map((league, index) => (
          <HeaderLeaguesListItem
            key={index}
            league={league}
            handleClick={handleLeagueClick}
            currentLeague={currentLeague}
            isLoading={isLoading}
          />
        ))}
    </ul>
  );
};

export default forwardRef(HeaderLeaguesList);
