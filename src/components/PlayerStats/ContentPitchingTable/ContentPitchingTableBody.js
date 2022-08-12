import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';
import { getShortName } from 'utils';
import { Link } from 'react-router-dom';

const ContentPitchingTableBody = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  currentLeague,
  sortField,
  sortDirection,
  MONTHS,
  handleLeagueClick,
	fieldsInfo
}) => {
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);

  const filteredLeagueGamesSummary =
    filteredLeague &&
    (!Array.isArray(filteredLeague)
      ? filteredLeague.pitching?.games_pitching.reduce((sum, game, i) => {
          const sumGame = {
            ...game,
            team_name: filteredLeague.name
          };
          sum.push(sumGame);
          return sum;
        }, []) || []
      : filteredLeague.reduce((totalSum, team) => {
          const teamGamesArr = team.pitching.games_pitching.reduce((sum, game, i) => {
            const sumGame = {
              ...game,
              team_name: team.name
            };
            sum.push(sumGame);
            return sum;
          }, []);

          return totalSum.concat(teamGamesArr);
        }, []));

  const sortedLeagueGames =
    filteredLeague &&
    filteredLeagueGamesSummary
      .slice()
      .sort((a, b) =>
        Number(a[sortField]) > Number(b[sortField])
          ? sortDirection === 'asc'
            ? 1
            : -1
          : sortDirection === 'asc'
          ? -1
          : 1
      );

  let sortedLeagues = [];
  let allTeamGames = [];
  if (currentTeam !== 'All teams') {
    sortedLeagues = filteredLeagues
      .filter(row => row.teams.find(team => team.name === currentTeam).pitching)
      .slice()
      .sort((a, b) =>
        Number(a.teams.find(team => team.name === currentTeam).pitching[sortField]) >
        Number(b.teams.find(team => team.name === currentTeam).pitching[sortField])
          ? sortDirection === 'asc'
            ? 1
            : -1
          : sortDirection === 'asc'
          ? -1
          : 1
      );
  }

  if (currentTeam === 'All teams') {
    allTeamGames = filteredLeagues.reduce((totalGames, league) => {
      league.teams.forEach(team =>
        totalGames.push({
          title: league.title,
          year: league.year,
          game: team,
          team_name: team.name,
          id: league.id,
          teams: league.teams
        })
      );

      return totalGames;
    }, []);

    allTeamGames = allTeamGames.filter(row => row.game.pitching);

    allTeamGames.sort((a, b) =>
      Number(a.game.pitching[sortField]) > Number(b.game.pitching[sortField])
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
    );
  }

  const leagueStyles = [cl.league];
  playerYears === 'All years' && leagueStyles.push(cl.noCursor);

  const yearsAllLeagueTeamTotals =
    currentLeague.id === -1 &&
    currentTeam !== 'All teams' &&
    (currentTeam !== undefined && playerStatsData.teams.find(team => team.name === currentTeam)
      ? playerYears === 'All years'
        ? playerStatsData.teams.find(team => team.name === currentTeam).stats
        : playerStatsData.teams.find(team => team.name === currentTeam).annual_stats[playerYears]
      : null);

  const yearsAllLeagueAllTeamTotals =
    currentLeague.id === -1 && currentTeam === 'All teams' && playerYears === 'All years'
      ? playerStatsData.total
      : playerStatsData.total_annual[playerYears];

  const selectedLeague = playerStatsData.leagues.find(league => league.id === currentLeague.id);

  const getAllLeaguesBodyCells = row => {
    return (
      <>
        {fieldsInfo.map((field, i) => (
          <ActiveBodyCell
            key={i}
            sortField={sortField}
            row={row[field.type]}
            fixed={field.fixed}
            addedClass={field.addedClass}>
            {field.name}
          </ActiveBodyCell>
        ))}
      </>
    );
  };

  const getSelectedLeagueBodyCells = row => {
    return (
      <>
        {fieldsInfo.map((field, i) => (
          <ActiveBodyCell
            key={i}
            sortField={sortField}
            row={row}
            fixed={field.fixed}
            addedClass={field.addedClass}>
            {field.name}
          </ActiveBodyCell>
        ))}
      </>
    );
  };
  return (
    <ul className={cl.rows}>
      {currentLeague.id === -1 ? (
        //All leagues
        <>
          {currentTeam !== 'All teams' ? (
            <>
              {sortedLeagues.map((row, index) => {
                const team = row.teams.find(team => team.name === currentTeam);
                return team.pitching ? (
                  <li key={index} className={cl.tableRow}>
                    {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                    <div className={leagueStyles.join(' ')} onClick={handleLeagueClick(row)}>
                      {row.title}
                    </div>
                    <div className={cl.teamName}>{getShortName(team.name, 20)}</div>
                    {currentLeague.id === -1 && (
                      <ActiveBodyCell sortField={sortField} row={team.pitching}>
                        G
                      </ActiveBodyCell>
                    )}
                    {getAllLeaguesBodyCells(team)}
                  </li>
                ) : (
                  <></>
                );
              })}
              {yearsAllLeagueTeamTotals && (
                <li className={cl.tableRow + ' ' + cl.tableFooter}>
                  {playerYears === 'All years' && <div className={cl.year}></div>}
                  <div className={cl.league}>TOTALS</div>
                  <div className={cl.teamName}></div>
                  {currentLeague.id === -1 && (
                    <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                      G
                    </ActiveBodyCell>
                  )}
                  {getAllLeaguesBodyCells(yearsAllLeagueTeamTotals)}
                </li>
              )}
            </>
          ) : (
            <>
              {allTeamGames.map((row, i) => {
                return row.game.pitching ? (
                  <li key={i} className={cl.tableRow}>
                    {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                    <div className={leagueStyles.join(' ')} onClick={handleLeagueClick(row)}>
                      {row.title}
                    </div>
                    <div className={cl.teamName}>{getShortName(row.team_name, 20)}</div>
                    {currentLeague.id === -1 && (
                      <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                        G
                      </ActiveBodyCell>
                    )}
                    {getAllLeaguesBodyCells(row.game)}
                  </li>
                ) : (
                  <></>
                );
              })}
              {yearsAllLeagueAllTeamTotals && (
                <li className={cl.tableRow + ' ' + cl.tableFooter}>
                  {playerYears === 'All years' && <div className={cl.year}></div>}
                  <div className={cl.league}>TOTALS</div>
                  <div className={cl.teamName}></div>
                  {currentLeague.id === -1 && (
                    <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                      G
                    </ActiveBodyCell>
                  )}
                  {getAllLeaguesBodyCells(yearsAllLeagueAllTeamTotals)}
                </li>
              )}
            </>
          )}
        </>
      ) : (
        //Selected league
        <>
          {sortedLeagueGames.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              <div className={cl.game}>
                {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]},
                <Link className={cl.teams} to={`/game/${row.game_id}?tab=box`}>
                   {getShortName(row.home_team.name, 20)} - {getShortName(row.visit_team.name, 20)}
                </Link>
              </div>
              <div className={cl.teamName}>{getShortName(row.team_name, 20)}</div>
              {getSelectedLeagueBodyCells(row)}
            </li>
          ))}
          <li className={cl.tableRow + ' ' + cl.tableFooter}>
            <div className={cl.game}>TOTALS</div>
            <div className={cl.teamName}></div>
            {getAllLeaguesBodyCells(currentTeam === 'All teams' ? selectedLeague.total : filteredLeague)}
          </li>
        </>
      )}
    </ul>
  );
};

export default ContentPitchingTableBody;
