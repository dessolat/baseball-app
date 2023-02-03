import React, { forwardRef } from 'react';
import cl from './HeaderLeagues.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLeague } from 'redux/gamesReducer';
import HeaderLeaguesListItem from './HeaderLeaguesListItem';
import { setPlayerCurrentTeam, setTableType } from 'redux/playerStatsReducer';

const HeaderLeaguesList = ({ leagues, playerYears }, ref) => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const { playerStatsData: statsData, tableType } = useSelector(state => state.playerStats);

  const dispatch = useDispatch();

  const handleLeagueClick = league => () => {
    if (playerYears === 'All years') return;
    dispatch(setCurrentLeague(league));

    const anotherTableType = tableType === 'Batting' ? 'Pitching' : 'Batting';

    if (league.id === -1) {
      const teamsArr = Array.from(
        statsData.leagues
          .filter(
            league => league.year === playerYears && league.teams.find(team => team[tableType.toLowerCase()])
          )
          .reduce((sum, league) => {
            league.teams.forEach(team => sum.add(team.name));
            return sum;
          }, new Set())
      );

      dispatch(setPlayerCurrentTeam(teamsArr.length > 1 ? 'All teams' : teamsArr[0]));
      return;
    }

    let tempTableType = tableType;
    //Table type switching
    if (!league.teams.find(team => team[tableType.toLowerCase()])) {
      dispatch(setTableType(anotherTableType));
      tempTableType = anotherTableType;
    }

    const teamArr = league.teams.filter(team => team[tempTableType.toLowerCase()]);
    dispatch(
      setPlayerCurrentTeam(teamArr.length > 1 ? 'All teams' : teamArr.length === 1 ? teamArr[0].name : '')
    );
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
