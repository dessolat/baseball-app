import React, { useContext } from 'react';
import cl from './Content.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setTableType, setPlayerCurrentTeam } from 'redux/playerStatsReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import ContentMobilePlayerInfo from './ContentMobilePlayerInfo';
import PitcherContentGraphs from '../PitcherContentGraphs/PitcherContentGraphs';
import ContentTables from '../ContentTables/ContentTables';
import { PlayerYearsContext } from 'context';

const Content = ({ pitchesData }) => {
  const { playerYears, calculateTeamsArray } = useContext(PlayerYearsContext);

  const {
    playerStatsData: statsData,
    playerCurrentTeam: currentTeam,
    tableType
  } = useSelector(state => state.playerStats);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const isMobile = useSelector(state => state.shared.isMobile);
  const dispatch = useDispatch();

  const handleTableOptionClick = option => {
    const teamsArray = calculateTeamsArray(option);

    dispatch(setPlayerCurrentTeam(teamsArray.length > 1 ? 'All teams' : teamsArray[0]));
    dispatch(setTableType(option));
  };

  const filteredLeagues =
    playerYears === 'All years'
      ? currentTeam === 'All teams'
        ? statsData.leagues.filter(league => league.teams.find(team => team[tableType.toLowerCase()]))
        : statsData.leagues.filter(league =>
            league.teams.find(team => team.name === currentTeam && team[tableType.toLowerCase()])
          )
      : currentTeam === 'All teams'
      ? statsData.leagues.filter(
          league => league.year === playerYears && league.teams.find(team => team[tableType.toLowerCase()])
        )
      : statsData.leagues.filter(
          league =>
            league.year === playerYears &&
            league.teams.find(team => team.name === currentTeam && team[tableType.toLowerCase()])
        );

  const selectedLeague = statsData.leagues.find(league => league.id === currentLeague.id);

  const filteredLeague =
    currentLeague.id === -1
      ? null
      : currentTeam === 'All teams'
      ? selectedLeague.teams
      : selectedLeague.teams.find(team => team.name === currentTeam && team[tableType.toLowerCase()]) || [];

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

      dispatch(setPlayerCurrentTeam(teamsArr.length > 1 ? 'All teams' : teamsArr[0]));
      return;
    }

    dispatch(setPlayerCurrentTeam(league.teams.length > 1 ? 'All teams' : league.teams[0].name));
  };

  //Table options calculating
  function getSortedTableOptions() {
    const options = [];
    const anotherTableType = tableType === 'Batting' ? 'Pitching' : 'Batting';

    //All leagues
    if (currentLeague.id === -1) {
      if (filteredLeagues.length > 0) options.push(tableType);

      const anotherTableTypeFilteredLeagues =
        playerYears === 'All years'
          ? currentTeam === 'All teams'
            ? statsData.leagues.filter(league =>
                league.teams.find(team => team[anotherTableType.toLowerCase()])
              )
            : statsData.leagues.filter(league =>
                league.teams.find(team => team.name === currentTeam && team[anotherTableType.toLowerCase()])
              )
          : currentTeam === 'All teams'
          ? statsData.leagues.filter(
              league =>
                league.year === playerYears && league.teams.find(team => team[anotherTableType.toLowerCase()])
            )
          : statsData.leagues.filter(
              league =>
                league.year === playerYears &&
                league.teams.find(team => team.name === currentTeam && team[anotherTableType.toLowerCase()])
            );

      if (anotherTableTypeFilteredLeagues.length > 0) options.push(anotherTableType);

      //Sort options
      options.sort((a, b) => (a > b ? 1 : -1));
      return options;
    }

    //Selected league
    const filteredLeague = selectedLeague.teams.find(team => team.name === currentTeam);

    if (filteredLeague) {
      filteredLeague.batting && options.push('Batting');
      filteredLeague.pitching && options.push('Pitching');
    } else {
      selectedLeague.teams.find(team => team.batting) && options.push('Batting');
      selectedLeague.teams.find(team => team.pitching) && options.push('Pitching');
    }

    return options;
  }

  const isContentGraphs =
    tableType === 'Pitching' &&
    getSortedTableOptions().length !== 0 &&
    !isMobile &&
    statsData.pitcher_banner.teams.length > 0;
  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {Object.keys(statsData).length === 0 ? (
            <></>
          ) : (
            <>
              {isMobile && <ContentMobilePlayerInfo statsData={statsData} />}
              <div className={cl.innerContainer}>
                <p className={cl.playerChr}>
                  {statsData.pos || '—'} | B/T: {statsData.bat_hand}/{statsData.throw_hand} |{' '}
                  {statsData.height} {statsData.weight}LBS | Age: {new Date().getFullYear() - statsData.yob}
                </p>
                <ContentTables
                  getSortedTableOptions={getSortedTableOptions}
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  handleTableOptionClick={handleTableOptionClick}
                  playerYears={playerYears}
                  handleLeagueClick={handleLeagueClick}
                />
              </div>
              {isContentGraphs && <PitcherContentGraphs pitchesData={pitchesData} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
