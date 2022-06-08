import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';

const HeaderLeaguesList = ({ leagues }, ref) => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentGameType = useSelector(state => state.shared.currentGameType);
  // const currentYear = useSelector(state => state.shared.currentYear);
  // const allYearsLeagues = useSelector(state => state.shared.allYearsLeagues);
  const dispatch = useDispatch();

  const handleLeagueClick = league => () => {
    const { id, title } = league;
    // const leagueId =
    //   league.id === -1
    //     ? -1
    //     : allYearsLeagues[currentYear].find(
    //         curLeague => curLeague.name === league.title && curLeague.game_type === currentGameType
    //       ).id;

    dispatch(setCurrentLeague({ ...league, name: title, title, id }));
    // dispatch(setCurrentLeague({ ...league, name: league.title, title: league.title, id: leagueId }));
  };

  return (
    <ul className={cl.leagues} ref={ref}>
      {leagues
        .filter(league => league.type === currentGameType || league.id === -1)
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
