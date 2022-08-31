import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';

const HeaderLeaguesList = ({ leagues }, ref) => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  const dispatch = useDispatch();

  const handleLeagueClick = league => () => {
    const { id, title } = league;

    dispatch(setCurrentLeague({ ...league, name: title, title, id }));
  };

  return (
    <ul className={cl.leagues} ref={ref}>
      {leagues
        .filter(league => (league.type === currentGameType || league.id === -1) && league.id !== null)
        .map((league, index) => (
          <HeaderLeaguesListItem
            key={index}
            league={league}
            handleClick={handleLeagueClick}
            currentLeague={currentLeague}
          />
        ))}
    </ul>
  );
};

export default forwardRef(HeaderLeaguesList);
