import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/sharedReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';
// import { setPlayerCurrentTeam } from 'redux/playerStatsReducer';

const HeaderLeaguesList = ({ leagues, playerYears }, ref) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const dispatch = useDispatch();

  const handleLeagueClick = league => () => {
    if (playerYears === 'All years') return;
    dispatch(setCurrentLeague(league));
		// league.teams && dispatch(setPlayerCurrentTeam(league.teams[0].name))
  };

  const classes = [cl.leagues];
  playerYears === 'All years' && classes.push(cl.disabled);
  return (
    <ul className={classes.join(' ')} ref={ref}>
      {leagues.map((league, index) => (
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
