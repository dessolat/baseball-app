import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShortName } from 'utils';

const FIELDS_OBJ = {
  G: 'batting',
  AB: 'batting',
  H: 'batting',
  '2B': 'batting',
  '3B': 'batting',
  HR: 'batting',
  RBI: 'batting',
  GDP: 'batting',
  BB: 'batting',
  IBB: 'batting',
  HP: 'batting',
  SH: 'batting',
  SF: 'batting',
  SO: 'batting',
  TB: 'batting',
  AVG: 'batting',
  SLG: 'batting',
  OBP: 'batting',
  OPS: 'batting',
  CH: 'fielding',
  PO: 'fielding',
  A: 'fielding',
  E: 'fielding',
  DP: 'fielding',
  FLD: 'fielding',
  R: 'batting',
  SB: 'running',
  CS: 'running',
  SB_pr: 'running',
  LOB: 'running'
};

const ContentBattingTableBody = ({
  cl,
  currentLeague,
  playerYears,
  filteredLeague,
  filteredLeagues,
  sortField,
  sortDirection,
  handleLeagueClick,
  MONTHS,
	fieldsInfo
}) => {
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);

  const filteredLeagueGamesSummary =
    filteredLeague &&
    (!Array.isArray(filteredLeague)
      ? filteredLeague.batting.games_batting.reduce((sum, game, i) => {
          const sumGame = {
            ...game,
            ...filteredLeague.fielding.games_fielding[i],
            ...filteredLeague.running.games_running[i],
            team_name: filteredLeague.name
          };
          sum.push(sumGame);
          return sum;
        }, [])
      : filteredLeague
          .filter(team => team.batting || team.running || team.fielding)
          .reduce((totalSum, team) => {
            const teamGamesArr = team.batting.games_batting.reduce((sum, game, i) => {
              const sumGame = {
                ...game,
                ...team.fielding.games_fielding[i],
                ...team.running.games_running[i],
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
        a[sortField] > b[sortField] ? (sortDirection === 'asc' ? 1 : -1) : sortDirection === 'asc' ? -1 : 1
      );

  let sortedLeagues = [];
  let allTeamGames = [];
  if (currentTeam !== 'All teams') {
    sortedLeagues = filteredLeagues.slice().sort((a, b) => {
      const teamA = a.teams.find(team => team.name === currentTeam);
      const teamB = b.teams.find(team => team.name === currentTeam);

      const fieldTypeA =
        sortField !== 'G'
          ? FIELDS_OBJ[sortField]
          : teamA.batting.G > 0
          ? 'batting'
          : teamA.fielding.G > 0
          ? 'fielding'
          : 'running';
      const fieldTypeB =
        sortField !== 'G'
          ? FIELDS_OBJ[sortField]
          : teamB.batting.G > 0
          ? 'batting'
          : teamB.fielding.G > 0
          ? 'fielding'
          : 'running';

      return teamA[fieldTypeA][sortField] > teamB[fieldTypeB][sortField]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1;
    });
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

    allTeamGames = allTeamGames.filter(
      row => row.game.batting || row.game.fielding || row.game.running || row.game.pitching
    );

    allTeamGames.sort((a, b) => {
      const fieldTypeA =
        sortField !== 'G'
          ? FIELDS_OBJ[sortField]
          : a.game.batting.G > 0
          ? 'batting'
          : a.game.fielding.G > 0
          ? 'fielding'
          : 'running';
      const fieldTypeB =
        sortField !== 'G'
          ? FIELDS_OBJ[sortField]
          : b.game.batting.G > 0
          ? 'batting'
          : b.game.fielding.G > 0
          ? 'fielding'
          : 'running';

      return a.game[fieldTypeA][sortField] > b.game[fieldTypeB][sortField]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1;
    });
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
        // All leagues
        <>
          {currentTeam !== 'All teams' ? (
            <>
              {sortedLeagues.map((row, index) => {
                const team = row.teams.find(team => team.name === currentTeam);
                const gRow =
                  team.batting.G > 0 ? team.batting : team.fielding?.G > 0 ? team.fielding : team.running;
                return (
                  <li key={index} className={cl.tableRow}>
                    {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                    <div className={leagueStyles.join(' ')} onClick={handleLeagueClick(row)}>
                      {row.title}
                    </div>
                    <div className={cl.teamName}>{getShortName(team.name, 20)}</div>
                    <ActiveBodyCell sortField={sortField} row={gRow} addedClass={cl.tall}>
                      G
                    </ActiveBodyCell>
                    {getAllLeaguesBodyCells(team)}
                  </li>
                );
              })}
              {yearsAllLeagueTeamTotals && (
                <li className={cl.tableRow + ' ' + cl.tableFooter}>
                  {playerYears === 'All years' && <div className={cl.year}></div>}
                  <div className={cl.league}>TOTALS</div>
                  <div className={cl.teamName}></div>
                  <ActiveBodyCell
                    sortField={sortField}
                    row={yearsAllLeagueTeamTotals.batting}
                    addedClass={cl.tall}>
                    G
                  </ActiveBodyCell>
                  {getAllLeaguesBodyCells(yearsAllLeagueTeamTotals)}
                </li>
              )}
            </>
          ) : (
            <>
              {allTeamGames
                .filter(row => row.game.batting || row.game.fielding || row.game.running || row.game.pitching)
                .map((row, i) => {
                  const gRow =
                    row.game.batting.G > 0
                      ? row.game.batting
                      : row.game.fielding?.G > 0
                      ? row.game.fielding
                      : row.game.running;
                  return (
                    <li key={i} className={cl.tableRow}>
                      {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                      <div className={leagueStyles.join(' ')} onClick={handleLeagueClick(row)}>
                        {row.title}
                      </div>
                      <div className={cl.teamName}>{getShortName(row.team_name, 20)}</div>
                      <ActiveBodyCell sortField={sortField} row={gRow} addedClass={cl.tall}>
                        G
                      </ActiveBodyCell>
											{getAllLeaguesBodyCells(row.game)}
                    </li>
                  );
                })}
              {yearsAllLeagueAllTeamTotals && (
                <li className={cl.tableRow + ' ' + cl.tableFooter}>
                  {playerYears === 'All years' && <div className={cl.year}></div>}
                  <div className={cl.league}>TOTALS</div>
                  <div className={cl.teamName}></div>
                  <ActiveBodyCell
                    sortField={sortField}
                    row={yearsAllLeagueAllTeamTotals.batting}
                    addedClass={cl.tall}>
                    G
                  </ActiveBodyCell>
									{getAllLeaguesBodyCells(yearsAllLeagueAllTeamTotals)}
                </li>
              )}
            </>
          )}
        </>
      ) : (
        // Selected league
        <>
          {sortedLeagueGames.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              <div className={cl.game}>
                {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]},{' '}
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

export default ContentBattingTableBody;
