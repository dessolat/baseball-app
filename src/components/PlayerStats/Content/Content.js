import React from 'react';
import cl from './Content.module.scss';
import ContentBattingTable from '../ContentBattingTable/ContentBattingTable';
import ContentPitchingTable from '../ContentPitchingTable/ContentPitchingTable';
import Dropdown from 'components/UI/dropdown/GamesDropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setTableType, setPlayerCurrentTeam } from 'redux/playerStatsReducer';
import { setCurrentLeague } from 'redux/gamesReducer';
import ContentMobilePlayerInfo from './ContentMobilePlayerInfo';
import ContentMobileTable from '../ContentMobileTable/ContentMobileTable';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const Content = ({ playerYears, calculateTeamsArray }) => {
  const statsData = useSelector(state => state.playerStats.playerStatsData);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const tableType = useSelector(state => state.playerStats.tableType);
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
			filteredLeague.batting && options.push('Batting')
			filteredLeague.pitching && options.push('Pitching')
		} else {
			selectedLeague.teams.find(team => team.batting) && options.push('Batting')
			selectedLeague.teams.find(team => team.pitching) && options.push('Pitching')
		}

    return options;
  }

  return (
    <section>
      <div className='container'>
        <div className={cl.content}>
          {Object.keys(statsData).length === 0 ? (
            <></>
          ) : (
            <>
              {isMobile && <ContentMobilePlayerInfo statsData={statsData} />}
              <p className={cl.playerChr}>
                {statsData.pos || '—'} | B/T: {statsData.bat_hand}/{statsData.throw_hand} | {statsData.height}{' '}
                {statsData.weight}LBS | Age: {new Date().getFullYear() - statsData.yob}
              </p>
              <div className={cl.dropWrapper}>
                <Dropdown
                  title={tableType}
                  options={getSortedTableOptions()}
                  currentOption={tableType}
                  handleClick={handleTableOptionClick}
                />
              </div>
              {isMobile ? (
                <ContentMobileTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                  MONTHS={MONTHS}
                  handleLeagueClick={handleLeagueClick}
                />
              ) : tableType === 'Batting' ? (
                <ContentBattingTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                  MONTHS={MONTHS}
                  handleLeagueClick={handleLeagueClick}
                />
              ) : (
                <ContentPitchingTable
                  filteredLeagues={filteredLeagues}
                  filteredLeague={filteredLeague}
                  playerYears={playerYears}
                  MONTHS={MONTHS}
                  handleLeagueClick={handleLeagueClick}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
