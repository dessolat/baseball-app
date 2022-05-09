import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/sharedReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';
import { setPlayerCurrentTeam } from 'redux/playerStatsReducer';

const HeaderLeaguesList = ({ leagues, playerYears }, ref) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);
	const statsData = useSelector(state => state.playerStats.playerStatsData);
  const dispatch = useDispatch();

  const handleLeagueClick = league => () => {
    if (playerYears === 'All years') return;
    dispatch(setCurrentLeague(league));

		if (league.id === -1) {
			const teamsArr = Array.from(
				statsData.leagues
					.filter(league => league.year === playerYears)
					.reduce((sum, league) => {
						league.teams.forEach(team => sum.add(team.name));
						return sum;
					}, new Set())
			);

			dispatch(setPlayerCurrentTeam(teamsArr.length > 1 ? 'All teams' : teamsArr[0]))
			return
		}
		
		dispatch(setPlayerCurrentTeam(league.teams.length > 1 ? 'All teams' : league.teams[0].name))
		// const teamsArr = Array.from(
		// 	statsData.leagues
		// 		.filter(league => league.year === playerYears)
		// 		.reduce((sum, league) => {
		// 			league.teams.forEach(team => sum.add(team.name));
		// 			return sum;
		// 		}, new Set())
		// );
		// dispatch(setPlayerCurrentTeam(league.teams ? ))
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
