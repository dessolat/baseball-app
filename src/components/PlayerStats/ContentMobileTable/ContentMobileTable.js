import React, { useState, useRef, useEffect } from 'react';
import cl from './ContentMobileTable.module.scss';
import { useSelector } from 'react-redux';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';
import { getShortName } from 'utils';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSortField } from 'redux/playerStatsReducer';
import ContentMobileTableHeader from './ContentMobileTableHeader';

const ContentMobileTable = ({ filteredLeagues, filteredLeague, playerYears, MONTHS, handleLeagueClick }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [isScrollable, setIsScrollable] = useState(true);

  const currentLeague = useSelector(state => state.games.currentLeague);
  const tableMode = useSelector(state => state.playerStats.tableType);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);
  const sortField = useSelector(state => state.playerStats.sortField);
  const mobileOrientation = useSelector(state => state.shared.mobileOrientation);

  const dispatch = useDispatch();

  const headerScroll = useRef(null);
  const rowScrollRef = useRef();

  useEffect(() => {
    if (rowScrollRef.current === null) return;

    setTimeout(
      () => setIsScrollable(rowScrollRef.current?.clientWidth < rowScrollRef.current?.scrollWidth),
      500
    );
  }, []);

  useEffect(() => {
    setIsScrollable(rowScrollRef.current.clientWidth < rowScrollRef.current.scrollWidth);

    if (currentLeague.id !== -1 && sortField[tableMode] === 'G') {
      const defaultSortFields = { Batting: 'AB', Fielding: 'CH', Running: 'SB', Pitching: 'GS' };
      dispatch(setSortField(defaultSortFields[tableMode]));
    }
    // eslint-disable-next-line
  }, [tableMode, currentLeague.id]);

  useEffect(() => {
    if (rowScrollRef.current === null) return;

    setTimeout(() => {
      setIsScrollable(rowScrollRef.current.clientWidth < rowScrollRef.current.scrollWidth);
    }, 150);
  }, [mobileOrientation]);

  const fieldsInfo = [
    { name: 'AB', type: 'batting' },
    { name: 'R', type: 'batting' },
    { name: 'H', type: 'batting' },
    { name: '2B', type: 'batting' },
    { name: '3B', type: 'batting' },
    { name: 'HR', type: 'batting' },
    { name: 'RBI', type: 'batting' },
    { name: 'GDP', type: 'batting' },
    { name: 'BB', type: 'batting' },
    { name: 'IBB', type: 'batting' },
    { name: 'HP', type: 'batting' },
    { name: 'SH', type: 'batting' },
    { name: 'SF', type: 'batting' },
    { name: 'SO', type: 'batting' },
    { name: 'TB', type: 'batting' },
    { name: 'AVG', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'SLG', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'OBP', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'OPS', type: 'batting', fixed: 3, addedClass: cl.wider },
    { name: 'SB', type: 'running' },
    { name: 'CS', type: 'running' },
    { name: 'SB_pr', type: 'running', fixed: 3, childField: '%SB' },
    { name: 'LOB', type: 'running' },
    { name: 'CH', type: 'fielding' },
    { name: 'PO', type: 'fielding' },
    { name: 'A', type: 'fielding' },
    { name: 'E', type: 'fielding' },
    { name: 'DP', type: 'fielding' },
    { name: 'FLD', type: 'fielding', fixed: 3, addedClass: cl.wider },
    { name: 'GS', type: 'pitching' },
    { name: 'W', type: 'pitching' },
    { name: 'L', type: 'pitching' },
    { name: 'CG', type: 'pitching' },
    { name: 'SV', type: 'pitching' },
    { name: 'IP', type: 'pitching', fixed: 1 },
    { name: 'PA', type: 'pitching' },
    { name: 'R', type: 'pitching' },
    { name: 'ER', type: 'pitching' },
    { name: 'H', type: 'pitching' },
    { name: '2B', type: 'pitching' },
    { name: '3B', type: 'pitching' },
    { name: 'HR', type: 'pitching' },
    { name: 'BB', type: 'pitching' },
    { name: 'IBB', type: 'pitching' },
    { name: 'HP', type: 'pitching' },
    { name: 'SH', type: 'pitching' },
    { name: 'SF', type: 'pitching' },
    { name: 'SO', type: 'pitching' },
    { name: 'WP', type: 'pitching' },
    { name: 'BK', type: 'pitching' },
    { name: 'ERA', type: 'pitching', fixed: 2, addedClass: cl.wider },
    { name: 'NP', type: 'pitching' },
    { name: 'NS', type: 'pitching' },
    { name: 'NB', type: 'pitching' }
  ];

  const getTableRows = (row, sortField) => (
    <>
      {currentLeague.id === -1 && (tableMode === 'Batting' || tableMode === 'Pitching') && (
        <ActiveBodyCell sortField={sortField} row={row}>
          G
        </ActiveBodyCell>
      )}
      {fieldsInfo
        .filter(field => field.type === tableMode.toLowerCase())
        .map((field, i) => (
          <ActiveBodyCell
            key={i}
            sortField={sortField}
            row={row}
            fixed={field.fixed}
            addedClass={field.addedClass}
						noAction={currentLeague.id !== -1}>
            {field.name}
          </ActiveBodyCell>
        ))}
    </>
  );

  const filteredLeagueGamesSummary =
    filteredLeague &&
    (!Array.isArray(filteredLeague)
      ? filteredLeague[tableMode.toLowerCase()][`games_${tableMode.toLowerCase()}`].filter(
          game => game.game_id
        )
      : filteredLeague
          .filter(row => row[tableMode.toLowerCase()])
          .reduce((totalSum, team) => {
            team[tableMode.toLowerCase()][`games_${tableMode.toLowerCase()}`].forEach(game =>
              totalSum.push(game)
            );

            return totalSum;
          }, []));

  const sortedLeagueGames =
    filteredLeague &&
    filteredLeagueGamesSummary.slice().sort((a, b) =>
      a.date > b.date
        ? // a[sortField[tableMode]] > b[sortField[tableMode]]
          sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
    );

  let sortedLeagues = [];
  let allTeamGames = [];

  if (currentTeam !== 'All teams') {
    sortedLeagues = filteredLeagues.slice().sort((a, b) => {
      const teamA = a.teams.find(team => team.name === currentTeam);
      const teamB = b.teams.find(team => team.name === currentTeam);

      let tableTypeA = 'pitching';
      let tableTypeB = 'pitching';

      if (tableMode !== 'Pitching') {
        tableTypeA =
          sortField[tableMode] !== 'G'
            ? tableMode.toLowerCase()
            : teamA.batting.G > 0
            ? 'batting'
            : teamA.fielding.G > 0
            ? 'fielding'
            : 'running';
        tableTypeB =
          sortField[tableMode] !== 'G'
            ? tableMode.toLowerCase()
            : teamB.batting.G > 0
            ? 'batting'
            : teamB.fielding.G > 0
            ? 'fielding'
            : 'running';
      }

      return Number(teamA[tableTypeA][sortField[tableMode]]) > Number(teamB[tableTypeB][sortField[tableMode]])
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
      league.teams
        .filter(team => team[tableMode.toLowerCase()])
        .forEach(team =>
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

    allTeamGames.sort((a, b) => {
      let tableTypeA = 'pitching';
      let tableTypeB = 'pitching';

      if (tableMode !== 'Pitching') {
        tableTypeA =
          sortField[tableMode] !== 'G'
            ? tableMode.toLowerCase()
            : a.game.batting.G > 0
            ? 'batting'
            : a.game.fielding.G > 0
            ? 'fielding'
            : 'running';
        tableTypeB =
          sortField[tableMode] !== 'G'
            ? tableMode.toLowerCase()
            : b.game.batting.G > 0
            ? 'batting'
            : b.game.fielding.G > 0
            ? 'fielding'
            : 'running';
      }

      return Number(a.game[tableTypeA][sortField[tableMode]]) >
        Number(b.game[tableTypeB][sortField[tableMode]])
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1;
    });
  }

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
  return (
    <div className={cl.mobileWrapper}>
      <ContentMobileTableHeader
        cl={cl}
        playerYears={playerYears}
        currentLeague={currentLeague}
        isScrollable={isScrollable}
				sortField={sortField}
        sortDirection={sortDirection}
				setSortDirection={setSortDirection}
				fieldsInfo={fieldsInfo}
        ref={headerScroll}
      />
      <div className={cl.sides}>
        <div
          className={cl.leftRows}
          style={!isScrollable ? { borderRight: 'none', boxShadow: 'none' } : null}>
          {currentLeague.id === -1 ? ( //All leagues
            <>
              {currentTeam !== 'All teams' ? (
                <>
                  {sortedLeagues.map((row, index) => (
                    <div key={index} className={cl.tableRow}>
                      {playerYears === 'All years' && <div className={cl.years}>{row.year}</div>}
                      <div className={cl.league} onClick={handleLeagueClick(row)}>
                        {row.title}
                      </div>
                    </div>
                  ))}
                  {sortedLeagues.length > 0 && (
                    <div className={cl.tableRow + ' ' + cl.tableFooter}>
                      {playerYears === 'All years' && <div className={cl.years}></div>}
                      <div className={cl.league}>TOTALS</div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {allTeamGames.map((row, index) => (
                    <div key={index} className={cl.tableRow}>
                      {playerYears === 'All years' && <div className={cl.years}>{row.year}</div>}
                      <div className={cl.league} onClick={handleLeagueClick(row)}>
                        {row.title}
                      </div>
                    </div>
                  ))}
                  {allTeamGames.length > 0 && (
                    <div className={cl.tableRow + ' ' + cl.tableFooter}>
                      {playerYears === 'All years' && <div className={cl.years}></div>}
                      <div className={cl.league}>TOTALS</div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            //Selected league
            <>
              {sortedLeagueGames.map((row, index) => (
                <div key={index} className={cl.tableRow}>
                  <div className={cl.game}>
                    <div className={cl.date}>
                      {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]},
                    </div>
                    <Link className={cl.teamNames} to={`/game/${row.game_id}?tab=box`}>
                      {getShortName(row.home_team.name, 14)} - {getShortName(row.visit_team.name, 14)}
                    </Link>
                  </div>
                </div>
              ))}
              {sortedLeagueGames.length > 0 && (
                <div className={cl.tableRow + ' ' + cl.tableFooter}>
                  <div className={cl.game}>
                    <div className={cl.date}></div>
                    <div className={cl.teamNames}>TOTALS</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div
          className={cl.rightRows}
          onScroll={e => (headerScroll.current.scrollLeft = e.target.scrollLeft)}
          ref={rowScrollRef}>
          {currentLeague.id === -1 ? ( //All leagues
            <>
              {currentTeam !== 'All teams' ? (
                <>
                  {sortedLeagues.map((row, index) => {
                    const team = row.teams.find(team => team.name === currentTeam);

                    const gameRow =
                      tableMode === 'Pitching'
                        ? team.pitching
                        : tableMode !== 'Batting'
                        ? team[tableMode.toLowerCase()]
                        : {
                            ...team.batting,
                            G:
                              team.batting.G > 0
                                ? team.batting.G
                                : team.fielding.G > 0
                                ? team.fielding.G
                                : team.running.G
                          };
                    return (
                      <div
                        key={index}
                        className={cl.tableRow}
                        style={{
                          width: !isScrollable ? '100%' : 'fit-content'
                        }}>
                        {getTableRows(gameRow, sortField[tableMode])}
                      </div>
                    );
                  })}
                  {sortedLeagues.length > 0 && (
                    <div
                      className={cl.tableRow + ' ' + cl.tableFooter}
                      style={{
                        width: !isScrollable ? '100%' : 'fit-content'
                      }}>
                      {getTableRows(
                        yearsAllLeagueTeamTotals[tableMode.toLowerCase()],

                        sortField[tableMode]
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {allTeamGames.map((row, index) => {
                    const gameRow =
                      tableMode === 'Pitching'
                        ? row.game.pitching
                        : tableMode !== 'Batting'
                        ? row.game[tableMode.toLowerCase()]
                        : {
                            ...row.game.batting,
                            G:
                              row.game.batting.G > 0
                                ? row.game.batting.G
                                : row.game.fielding.G > 0
                                ? row.game.fielding.G
                                : row.game.running.G
                          };

                    return (
                      <div
                        key={index}
                        className={cl.tableRow}
                        style={{
                          width: !isScrollable ? '100%' : 'fit-content'
                        }}>
                        {getTableRows(gameRow, sortField[tableMode])}
                      </div>
                    );
                  })}
                  {allTeamGames.length > 0 && (
                    <div
                      className={cl.tableRow + ' ' + cl.tableFooter}
                      style={{
                        width: !isScrollable ? '100%' : 'fit-content'
                      }}>
                      {getTableRows(
                        yearsAllLeagueAllTeamTotals[tableMode.toLowerCase()],

                        sortField[tableMode]
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            //Selected league
            <>
              {sortedLeagueGames.map((row, index) => (
                <div
                  key={index}
                  className={cl.tableRow}
                  style={{
                    width: !isScrollable ? '100%' : 'fit-content'
                  }}>
                  {getTableRows(row, sortField[tableMode])}
                </div>
              ))}
              {sortedLeagueGames.length > 0 && (
                <div
                  className={cl.tableRow + ' ' + cl.tableFooter}
                  style={{
                    width: !isScrollable ? '100%' : 'fit-content'
                  }}>
                  {getTableRows(
                    currentTeam === 'All teams'
                      ? selectedLeague.total[tableMode.toLowerCase()]
                      : filteredLeague[tableMode.toLowerCase()],

                    sortField[tableMode]
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentMobileTable;
