import React, { useState } from 'react';
import cl from './ContentBattingTable.module.scss';
import SortField from 'components/UI/sortField/SortField';
import { useSelector } from 'react-redux';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';
import { getShortName } from 'utils';
import { Link } from 'react-router-dom';

const FIELDS_OBJ = {
  AB: 'batting',
  H: 'batting',
  // '1B': 'batting',
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

const ContentBattingTable = ({ filteredLeagues = [], filteredLeague, playerYears, MONTHS }) => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);
  const playerStatsData = useSelector(state => state.playerStats.playerStatsData);

  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('asc');

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
      : filteredLeague.reduce((totalSum, team) => {
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
    sortedLeagues = filteredLeagues
      .slice()
      .sort((a, b) =>
        a.teams.find(team => team.name === currentTeam)[FIELDS_OBJ[sortField]][sortField] >
        b.teams.find(team => team.name === currentTeam)[FIELDS_OBJ[sortField]][sortField]
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
      a.game[FIELDS_OBJ[sortField]][sortField] > b.game[FIELDS_OBJ[sortField]][sortField]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : sortDirection === 'asc'
        ? -1
        : 1
    );
  }
  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const yearsAllLeagueTeamTotals =
    currentLeague.id === -1 &&
    currentTeam !== 'All teams' &&
    (currentTeam !== undefined
      ? playerYears === 'All years'
        ? playerStatsData.teams.find(team => team.name === currentTeam).stats
        : playerStatsData.teams.find(team => team.name === currentTeam).annual_stats[playerYears]
      : null);

  const yearsAllLeagueAllTeamTotals =
    currentLeague.id === -1 && currentTeam === 'All teams' && playerYears === 'All years'
      ? playerStatsData.total
      : playerStatsData.total_annual[playerYears];

  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          {playerYears === 'All years' && <div className={cl.year}>Years</div>}
          {currentLeague.id === -1 && <div className={cl.league}>League</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
          <div className={cl.teamName}>Team</div>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            AB
          </SortField>
          <div className={cl.sortFieldWrapper}>
            <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
              R
            </SortField>
          </div>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            H
          </SortField>
          {/* <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            1B
          </SortField> */}
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            2B
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            3B
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            HR
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            RBI
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wide}>
            GDP
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            BB
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            IBB
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            HP
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            SH
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            SF
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            SO
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            TB
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wider}>
            AVG
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wider}>
            SLG
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wider}>
            OBP
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wider}>
            OPS
          </SortField>

          <div className={cl.sortFieldWrapper}>
            <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
              SB
            </SortField>
          </div>

          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            CS
          </SortField>

          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wider}
            renamedField='SB_pr'>
            %SB
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            LOB
          </SortField>

          <div className={cl.sortFieldWrapper}>
            <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
              CH
            </SortField>
          </div>
          <div className={cl.sortFieldWrapper}>
            <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
              PO
            </SortField>
          </div>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            A
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            E
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            DP
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wider}
            renamedField='FLD'>
            FLD%
          </SortField>
        </div>
        <ul className={cl.rows}>
          {currentLeague.id === -1 ? (
            // All leagues
            <>
              {currentTeam !== 'All teams' ? (
                <>
                  {sortedLeagues.map((row, index) => {
                    const team = row.teams.find(team => team.name === currentTeam);

                    return (
                      <li key={index} className={cl.tableRow}>
                        {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                        <div className={cl.league}>{row.title}</div>
                        <div className={cl.teamName}>{team.name}</div>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          AB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          R
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          H
                        </ActiveBodyCell>
                        {/* <ActiveBodyCell sortField={sortField} row={team.batting}>
                          1B
                        </ActiveBodyCell> */}
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          2B
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          3B
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          HR
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          RBI
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.wide}>
                          GDP
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          BB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          IBB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          HP
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          SH
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          SF
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          SO
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting}>
                          TB
                        </ActiveBodyCell>
                        <ActiveBodyCell
                          sortField={sortField}
                          row={team.batting}
                          fixed={3}
                          addedClass={cl.wider}>
                          AVG
                        </ActiveBodyCell>
                        <ActiveBodyCell
                          sortField={sortField}
                          row={team.batting}
                          fixed={3}
                          addedClass={cl.wider}>
                          SLG
                        </ActiveBodyCell>
                        <ActiveBodyCell
                          sortField={sortField}
                          row={team.batting}
                          fixed={3}
                          addedClass={cl.wider}>
                          OBP
                        </ActiveBodyCell>
                        <ActiveBodyCell
                          sortField={sortField}
                          row={team.batting}
                          fixed={3}
                          addedClass={cl.wider}>
                          OPS
                        </ActiveBodyCell>

                        <ActiveBodyCell sortField={sortField} row={team.running}>
                          SB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.running}>
                          CS
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.running} addedClass={cl.wider}>
                          SB_pr
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.running}>
                          LOB
                        </ActiveBodyCell>

                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          CH
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          PO
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          A
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          E
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          DP
                        </ActiveBodyCell>
                        <ActiveBodyCell
                          sortField={sortField}
                          row={team.fielding}
                          fixed={3}
                          addedClass={cl.wider}>
                          FLD
                        </ActiveBodyCell>
                      </li>
                    );
                  })}
                  {yearsAllLeagueTeamTotals && (
                    <li className={cl.tableRow + ' ' + cl.tableFooter}>
                      {playerYears === 'All years' && <div className={cl.year}></div>}
                      <div className={cl.league}>TOTALS</div>
                      <div className={cl.teamName}></div>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        AB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        R
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        H
                      </ActiveBodyCell>
                      {/* <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        1B
                      </ActiveBodyCell> */}
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        2B
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        3B
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        HR
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        RBI
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.wide}>
                        GDP
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        BB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        IBB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        HP
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        SH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        SF
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        SO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.batting}>
                        TB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        AVG
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        SLG
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        OBP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        OPS
                      </ActiveBodyCell>

                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.running}>
                        SB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.running}>
                        CS
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.running}
                        addedClass={cl.wider}>
                        SB_pr
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.running}>
                        LOB
                      </ActiveBodyCell>

                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        CH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        PO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        A
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        E
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        DP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.fielding}
                        fixed={3}
                        addedClass={cl.wider}>
                        FLD
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
                      <div className={cl.teamName}>{row.team_name}</div>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        AB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        R
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        H
                      </ActiveBodyCell>
                      {/* <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        1B
                      </ActiveBodyCell> */}
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        2B
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        3B
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        HR
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        RBI
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.wide}>
                        GDP
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        BB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        IBB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        HP
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        SH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        SF
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        SO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.batting}>
                        TB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={row.game.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        AVG
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={row.game.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        SLG
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={row.game.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        OBP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={row.game.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        OPS
                      </ActiveBodyCell>

                      <ActiveBodyCell sortField={sortField} row={row.game.running}>
                        SB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.running}>
                        CS
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.running} addedClass={cl.wider}>
                        SB_pr
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.running}>
                        LOB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                        CH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                        PO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                        A
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                        E
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                        DP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={row.game.fielding}
                        fixed={3}
                        addedClass={cl.wider}>
                        FLD
                      </ActiveBodyCell>
                    </li>
                  ))}
                  {yearsAllLeagueAllTeamTotals && (
                    <li className={cl.tableRow + ' ' + cl.tableFooter}>
                      {playerYears === 'All years' && <div className={cl.year}></div>}
                      <div className={cl.league}>TOTALS</div>
                      <div className={cl.teamName}></div>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        AB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        R
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        H
                      </ActiveBodyCell>
                      {/* <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        1B
                      </ActiveBodyCell> */}
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        2B
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        3B
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        HR
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        RBI
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.wide}>
                        GDP
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        BB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        IBB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        HP
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        SH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        SF
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        SO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.batting}>
                        TB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        AVG
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        SLG
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        OBP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        fixed={3}
                        addedClass={cl.wider}>
                        OPS
                      </ActiveBodyCell>

                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.running}>
                        SB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.running}>
                        CS
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.running}
                        addedClass={cl.wider}>
                        SB_pr
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.running}>
                        LOB
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        CH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        PO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        A
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        E
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        DP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.fielding}
                        fixed={3}
                        addedClass={cl.wider}>
                        FLD
                      </ActiveBodyCell>
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
                  <ActiveBodyCell sortField={sortField} row={row}>
                    AB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    R
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    H
                  </ActiveBodyCell>
                  {/* <ActiveBodyCell sortField={sortField} row={row}>
                    1B
                  </ActiveBodyCell> */}
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
                    RBI
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide}>
                    GDP
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
                    TB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
                    AVG
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
                    SLG
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
                    OBP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
                    OPS
                  </ActiveBodyCell>

                  <ActiveBodyCell sortField={sortField} row={row}>
                    SB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    CS
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wider}>
                    SB_pr
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    LOB
                  </ActiveBodyCell>

                  <ActiveBodyCell sortField={sortField} row={row}>
                    CH
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    PO
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    A
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    E
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    DP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} fixed={3} addedClass={cl.wider}>
                    FLD
                  </ActiveBodyCell>
                </li>
              ))}

              <li className={cl.tableRow + ' ' + cl.tableFooter}>
                <div className={cl.game}>TOTALS</div>
                <div className={cl.teamName}></div>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  AB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  R
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  H
                </ActiveBodyCell>
                {/* <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  1B
                </ActiveBodyCell> */}
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  2B
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  3B
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  HR
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  RBI
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.wide}>
                  GDP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  BB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  IBB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  HP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  SH
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  SF
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  SO
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}>
                  TB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  AVG
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  SLG
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  OBP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  OPS
                </ActiveBodyCell>

                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.running : filteredLeague.running}>
                  SB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.running : filteredLeague.running}>
                  CS
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.running : filteredLeague.running}
                  addedClass={cl.wider}>
                  SB_pr
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.running : filteredLeague.running}>
                  LOB
                </ActiveBodyCell>

                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.fielding : filteredLeague.fielding}>
                  CH
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.fielding : filteredLeague.fielding}>
                  PO
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.fielding : filteredLeague.fielding}>
                  A
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.fielding : filteredLeague.fielding}>
                  E
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.fielding : filteredLeague.fielding}>
                  DP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? currentLeague.total.fielding : filteredLeague.fielding}
                  fixed={3}
                  addedClass={cl.wider}>
                  FLD
                </ActiveBodyCell>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContentBattingTable;
