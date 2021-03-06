import React, { useState } from 'react';
import cl from './ContentBattingTable.module.scss';
import SortField from 'components/UI/sortField/SortField';
import { useSelector } from 'react-redux';
import ActiveBodyCell from 'components/UI/ActiveBodyCell/ActiveBodyCell';
import { getShortName } from 'utils';
import { Link } from 'react-router-dom';

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

const ContentBattingTable = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  MONTHS,
  handleLeagueClick
}) => {
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
  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

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
  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          {playerYears === 'All years' && <div className={cl.year}>Years</div>}
          {currentLeague.id === -1 && <div className={cl.league}>League</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
          <div className={cl.teamName}>Team</div>
          {currentLeague.id === -1 && (
            <SortField
              sortField={sortField}
              sortDirection={sortDirection}
              handleClick={handleFieldClick}
              addedClass={cl.tall}>
              G
            </SortField>
          )}
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wide}>
            AB
          </SortField>
          {/* <div className={cl.sortFieldWrapper}> */}
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            R
          </SortField>
          {/* </div> */}
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            H
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            2B
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            3B
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
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
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            HP
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            SH
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            SF
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            SO
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.wide}>
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
          <div className={cl.sortFieldWrapper + ' ' + cl.tall}>
            <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
              SB
            </SortField>
          </div>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
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
          <div className={cl.sortFieldWrapper + ' ' + cl.wide}>
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
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
            E
          </SortField>
          <SortField
            sortField={sortField}
            sortDirection={sortDirection}
            handleClick={handleFieldClick}
            addedClass={cl.tall}>
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
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.wide}>
                          AB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          R
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          H
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          2B
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          3B
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
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
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          HP
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          SH
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          SF
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.tall}>
                          SO
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.batting} addedClass={cl.wide}>
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
                        <ActiveBodyCell sortField={sortField} row={team.running} addedClass={cl.tall}>
                          SB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.running} addedClass={cl.tall}>
                          CS
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.running} addedClass={cl.wider}>
                          SB_pr
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.running}>
                          LOB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding} addedClass={cl.wide}>
                          CH
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          PO
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding}>
                          A
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding} addedClass={cl.tall}>
                          E
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={team.fielding} addedClass={cl.tall}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        G
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.wide}>
                        AB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        R
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        H
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        2B
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        3B
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        HP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        SH
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        SF
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.tall}>
                        SO
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.batting}
                        addedClass={cl.wide}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.running}
                        addedClass={cl.tall}>
                        SB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.running}
                        addedClass={cl.tall}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.fielding}
                        addedClass={cl.wide}>
                        CH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        PO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueTeamTotals.fielding}>
                        A
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.fielding}
                        addedClass={cl.tall}>
                        E
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueTeamTotals.fielding}
                        addedClass={cl.tall}>
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
                  {allTeamGames.map((row, i) => {
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
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.wide}>
                          AB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          R
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          H
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          2B
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          3B
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
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
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          HP
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          SH
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          SF
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.tall}>
                          SO
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.batting} addedClass={cl.wide}>
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
                        <ActiveBodyCell sortField={sortField} row={row.game.running} addedClass={cl.tall}>
                          SB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.running} addedClass={cl.tall}>
                          CS
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.running} addedClass={cl.wider}>
                          SB_pr
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.running}>
                          LOB
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.fielding} addedClass={cl.wide}>
                          CH
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                          PO
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.fielding}>
                          A
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.fielding} addedClass={cl.tall}>
                          E
                        </ActiveBodyCell>
                        <ActiveBodyCell sortField={sortField} row={row.game.fielding} addedClass={cl.tall}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.wide}>
                        AB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        R
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        H
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        2B
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        3B
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        HP
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        SH
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        SF
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.tall}>
                        SO
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.batting}
                        addedClass={cl.wide}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.running}
                        addedClass={cl.tall}>
                        SB
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.running}
                        addedClass={cl.tall}>
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
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.fielding}
                        addedClass={cl.wide}>
                        CH
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        PO
                      </ActiveBodyCell>
                      <ActiveBodyCell sortField={sortField} row={yearsAllLeagueAllTeamTotals.fielding}>
                        A
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.fielding}
                        addedClass={cl.tall}>
                        E
                      </ActiveBodyCell>
                      <ActiveBodyCell
                        sortField={sortField}
                        row={yearsAllLeagueAllTeamTotals.fielding}
                        addedClass={cl.tall}>
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
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide}>
                    AB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    R
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    H
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    2B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    3B
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
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
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    HP
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    SH
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    SF
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    SO
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide}>
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
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    SB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    CS
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wider}>
                    SB_pr
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    LOB
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.wide}>
                    CH
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    PO
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row}>
                    A
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
                    E
                  </ActiveBodyCell>
                  <ActiveBodyCell sortField={sortField} row={row} addedClass={cl.tall}>
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
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.wide}>
                  AB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  R
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  H
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  2B
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  3B
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  HR
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}>
                  RBI
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.wide}>
                  GDP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}>
                  BB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}>
                  IBB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  HP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  SH
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  SF
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.tall}>
                  SO
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  addedClass={cl.wide}>
                  TB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  AVG
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  SLG
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  OBP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.batting : filteredLeague.batting}
                  fixed={3}
                  addedClass={cl.wider}>
                  OPS
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.running : filteredLeague.running}
                  addedClass={cl.tall}>
                  SB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.running : filteredLeague.running}
                  addedClass={cl.tall}>
                  CS
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.running : filteredLeague.running}
                  addedClass={cl.wider}>
                  SB_pr
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.running : filteredLeague.running}>
                  LOB
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.fielding : filteredLeague.fielding}
                  addedClass={cl.wide}>
                  CH
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.fielding : filteredLeague.fielding}>
                  PO
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.fielding : filteredLeague.fielding}>
                  A
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.fielding : filteredLeague.fielding}
                  addedClass={cl.tall}>
                  E
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.fielding : filteredLeague.fielding}
                  addedClass={cl.tall}>
                  DP
                </ActiveBodyCell>
                <ActiveBodyCell
                  sortField={sortField}
                  row={currentTeam === 'All teams' ? selectedLeague.total.fielding : filteredLeague.fielding}
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
