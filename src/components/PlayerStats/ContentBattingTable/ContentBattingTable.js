import React, { useState } from 'react';
import cl from './ContentBattingTable.module.scss';
import SortField from 'components/UI/sortField/SortField';
import { useSelector } from 'react-redux';

const FIELDS_OBJ = {
  AB: 'batting',
  H: 'batting',
  '1B': 'batting',
  '2B': 'batting',
  '3B': 'batting',
  HR: 'batting',
  RBI: 'batting',
  GDP: 'batting',
  BB: 'batting',
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
  R: 'running',
  SB: 'running',
  CS: 'running',
  SB_pr: 'running',
  LOB: 'running'
};

const ContentBattingTable = ({ filteredLeagues = [], filteredLeague, playerYears, MONTHS }) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);

  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredLeagueGamesSummary =
    filteredLeague &&
    filteredLeague.batting.games_batting.reduce((sum, game, i) => {
      const sumGame = {
        ...game,
        ...filteredLeague.fielding.games_fielding[i],
        ...filteredLeague.running.games_running[i]
      };
      sum.push(sumGame);
      return sum;
    }, []);

  const sortedLeagueGames =
    filteredLeague &&
    filteredLeagueGamesSummary
      .slice()
      .sort((a, b) =>
        a[sortField] > b[sortField] ? (sortDirection === 'asc' ? 1 : -1) : sortDirection === 'asc' ? -1 : 1
      );

  const sortedLeagues = filteredLeagues
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

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          {playerYears === 'All years' && <div className={cl.year}>Years</div>}
          {currentLeague.id === -1 && <div className={cl.league}>League</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            AB
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            H
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            1B
          </SortField>
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
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            GDP
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            BB
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
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            CH
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            PO
          </SortField>
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
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            R
          </SortField>
          <SortField sortField={sortField} sortDirection={sortDirection} handleClick={handleFieldClick}>
            SB
          </SortField>
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
        </div>
        <ul className={cl.rows}>
          {currentLeague.id === -1
            ? // All leagues
              sortedLeagues.map((row, index) => {
                const team = row.teams.find(team => team.name === currentTeam);
                return (
                  <li key={index} className={cl.tableRow}>
                    {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
                    <div className={cl.league}>{row.title}</div>
                    <div>{team.batting.AB}</div>
                    <div>{team.batting.H}</div>
                    <div>{team.batting['1B']}</div>
                    <div>{team.batting['2B']}</div>
                    <div>{team.batting['3B']}</div>
                    <div>{team.batting.HR}</div>
                    <div>{team.batting.RBI}</div>
                    <div>{team.batting.GDP}</div>
                    <div>{team.batting.BB}</div>
                    <div>{team.batting.HP}</div>
                    <div>{team.batting.SH}</div>
                    <div>{team.batting.SF}</div>
                    <div>{team.batting.SO}</div>
                    <div>{team.batting.TB}</div>
                    <div className={cl.wider}>{Number(team.batting.AVG).toFixed(3)}</div>
                    <div className={cl.wider}>{Number(team.batting.SLG).toFixed(3)}</div>
                    <div className={cl.wider}>{Number(team.batting.OBP).toFixed(3)}</div>
                    <div className={cl.wider}>{Number(team.batting.OPS).toFixed(3)}</div>
                    <div>{team.fielding.CH}</div>
                    <div>{team.fielding.PO}</div>
                    <div>{team.fielding.A}</div>
                    <div>{team.fielding.E}</div>
                    <div>{team.fielding.DP}</div>
                    <div className={cl.wider}>{Number(team.fielding.FLD).toFixed(3)}</div>
                    <div>{team.running.R}</div>
                    <div>{team.running.SB}</div>
                    <div>{team.running.CS}</div>
                    <div className={cl.wider}>{team.running.SB_pr}</div>
                    <div>{team.running.LOB}</div>
                  </li>
                );
              })
            : // Selected league
              sortedLeagueGames.map((row, index) => (
                <li key={index} className={cl.tableRow}>
                  <div className={cl.game}>
                    {row.date.slice(8, 10)} {MONTHS[+row.date.slice(5, 7) - 1]},{' '}
                    <span className={cl.teams}>
                      {row.home_team.name} - {row.visit_team.name}
                    </span>
                  </div>
                  <div>{row.AB}</div>
                  <div>{row.H}</div>
                  <div>{row['1B']}</div>
                  <div>{row['2B']}</div>
                  <div>{row['3B']}</div>
                  <div>{row.HR}</div>
                  <div>{row.RBI}</div>
                  <div>{row.GDP}</div>
                  <div>{row.BB}</div>
                  <div>{row.HP}</div>
                  <div>{row.SH}</div>
                  <div>{row.SF}</div>
                  <div>{row.SO}</div>
                  <div>{row.TB}</div>
                  <div className={cl.wider}>{Number(row.AVG).toFixed(3)}</div>
                  <div className={cl.wider}>{Number(row.SLG).toFixed(3)}</div>
                  <div className={cl.wider}>{Number(row.OBP).toFixed(3)}</div>
                  <div className={cl.wider}>{Number(row.OPS).toFixed(3)}</div>
                  <div>{row.CH}</div>
                  <div>{row.PO}</div>
                  <div>{row.A}</div>
                  <div>{row.E}</div>
                  <div>{row.DP}</div>
                  <div className={cl.wider}>{Number(row.FLD).toFixed(3)}</div>
                  <div>{row.R}</div>
                  <div>{row.SB}</div>
                  <div>{row.CS}</div>
                  <div className={cl.wider}>{row.SB_pr}</div>
                  <div>{row.LOB}</div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentBattingTable;
