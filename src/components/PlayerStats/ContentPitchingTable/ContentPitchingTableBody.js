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
  MONTHS
}) => {
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);

  const filteredLeagueGamesSummary =
    filteredLeague &&
    (!Array.isArray(filteredLeague)
      ? filteredLeague.pitching.games_pitching.reduce((sum, game, i) => {
          const sumGame = {
            ...game,
            team_name: filteredLeague.name
          };
          sum.push(sumGame);
          return sum;
        }, [])
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
        a[sortField] > b[sortField] ? (sortDirection === 'asc' ? 1 : -1) : sortDirection === 'asc' ? -1 : 1
      );

  let sortedLeagues = [];
  let allTeamGames = [];
  if (currentTeam !== 'All teams') {
    sortedLeagues = filteredLeagues
      .slice()
      .sort((a, b) =>
        a.teams.find(team => team.name === currentTeam).pitching[sortField] >
        b.teams.find(team => team.name === currentTeam).pitching[sortField]
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
        totalGames.push({ title: league.title, year: league.year, game: team, team_name: team.name })
      );

      return totalGames;
    }, []);

    allTeamGames.sort((a, b) =>
      a.game.pitching[sortField] > b.game.pitching[sortField]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
    );
  }

  const yearsAllLeagueTeamTotals =
    currentLeague.id === -1 &&
    currentTeam !== 'All teams' &&
    ((currentTeam !== undefined && playerStatsData.teams.find(team => team.name === currentTeam))
      ? playerYears === 'All years'
        ? playerStatsData.teams.find(team => team.name === currentTeam).stats
        : playerStatsData.teams.find(team => team.name === currentTeam).annual_stats[playerYears]
      : null);

  const yearsAllLeagueAllTeamTotals =
    currentLeague.id === -1 && currentTeam === 'All teams' && playerYears === 'All years'
      ? playerStatsData.total
      : playerStatsData.total_annual[playerYears];

			const selectedLeague = playerStatsData.leagues.find(league => league.id === currentLeague.id)
  return (
    <ul className={cl.rows}>
      {currentLeague.id === -1 ? (
        //All leagues
        <>
          {currentTeam !== 'All teams' ? (
            <>
              {sortedLeagues.map((row, index) => {
                const team = row.teams.find(team => team.name === currentTeam);
                return (
                  <li key={index} className={cl.tableRow}>
                    {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                    <div className={cl.league}>{row.title}</div>
                    <div className={cl.teamName}>{getShortName(team.name, 20)}</div>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      IP
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      PA
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      R
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      ER
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      H
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      2B
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      3B
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      HR
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      BB
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      IBB
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      HP
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      SH
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      SF
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      SO
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      WP
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      BK
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching} fixed={3} addedClass={cl.wider}>
                      ERA
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      NP
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      NS
                    </ActiveBodyCell>
                    <ActiveBodyCell sortField={sortField} row={team.pitching}>
                      NB
                    </ActiveBodyCell>
                  </li>
                );
              })}
              {yearsAllLeagueTeamTotals && (
                <li className={cl.tableRow + ' ' + cl.tableFooter}>
                  {playerYears === 'All years' && <div className={cl.year}></div>}
                  <div className={cl.league}>TOTALS</div>
                  <div className={cl.teamName}></div>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    IP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    PA
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    R
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    ER
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    H
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    2B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    3B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    HR
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    BB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    IBB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    HP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    SH
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    SF
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    SO
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    WP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    BK
                  </ActiveBodyCell>
                  <ActiveBodyCell
                    sortField={sortField}
                    row={yearsAllLeagueTeamTotals.pitching}
                    fixed={3}
                    addedClass={cl.wider}>
                    ERA
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    NP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    NS
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.pitching}>
                    NB
                  </ActiveBodyCell>
                </li>
              )}
            </>
          ) : (
            <>
              {allTeamGames.map((row, i) => (
                <li key={i} className={cl.tableRow}>
                  {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                  <div className={cl.league}>{row.title}</div>
                  <div className={cl.teamName}>{getShortName(row.team_name, 20)}</div>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    IP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    PA
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    R
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    ER
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    H
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    2B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    3B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    HR
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    BB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    IBB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    HP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    SH
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    SF
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    SO
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    WP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    BK
                  </ActiveBodyCell>
                  <ActiveBodyCell
                    sortField={sortField}
                    row={row.game.pitching}
                    fixed={3}
                    addedClass={cl.wider}>
                    ERA
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    NP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    NS
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row.game.pitching}>
                    NB
                  </ActiveBodyCell>
                </li>
              ))}
              {yearsAllLeagueAllTeamTotals && (
                <li className={cl.tableRow + ' ' + cl.tableFooter}>
                  {playerYears === 'All years' && <div className={cl.year}></div>}
                  <div className={cl.league}>TOTALS</div>
                  <div className={cl.teamName}></div>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    IP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    PA
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    R
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    ER
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    H
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    2B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    3B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    HR
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    BB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    IBB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    HP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    SH
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    SF
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    SO
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    WP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    BK
                  </ActiveBodyCell>
                  <ActiveBodyCell
                    sortField={sortField}
                    row={yearsAllLeagueAllTeamTotals.pitching}
                    fixed={3}
                    addedClass={cl.wider}>
                    ERA
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    NP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    NS
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.pitching}>
                    NB
                  </ActiveBodyCell>
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
              <ActiveBodyCell sortField={sortField} row={row}>
                IP
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                PA
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                R
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                ER
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                H
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                2B
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                3B
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                HR
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                BB
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                IBB
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                HP
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                SH
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                SF
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                SO
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                WP
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                BK
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
                ERA
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                NP
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                NS
              </ActiveBodyCell>
              <ActiveBodyCell sortField={sortField} row={row}>
                NB
              </ActiveBodyCell>
            </li>
          ))}
          <li className={cl.tableRow + ' ' + cl.tableFooter}>
            <div className={cl.game}>TOTALS</div>
            <div className={cl.teamName}></div>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              IP
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              PA
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              R
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              ER
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              H
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              2B
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              3B
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              HR
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              BB
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              IBB
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              HP
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              SH
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              SF
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              SO
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              WP
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              BK
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}
              fixed={3}
              addedClass={cl.wider}>
              ERA
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              NP
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              NS
            </ActiveBodyCell>
            <ActiveBodyCell
              sortField={sortField}
              row={currentTeam === 'All teams' ? selectedLeague.total.pitching : filteredLeague.pitching}>
              NB
            </ActiveBodyCell>
          </li>
        </>
      )}
    </ul>
  );
};

export default ContentPitchingTableBody;
