import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentBattingTable.module.scss';

const ContentBattingTable = ({ filteredLeagues = [], filteredLeague, playerYears }) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const currentTeam = useSelector(state => state.playerStats.playerCurrentTeam);

  return (
    <div className={cl.wrapper}>
      <div>
        <div className={cl.tableHeader}>
          {playerYears === 'All years' && <div className={cl.year}>Years</div>}
          {currentLeague.id === -1 && <div className={cl.league}>League</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
          <div>AB</div>
          <div>H</div>
          <div>1B</div>
          <div>2B</div>
          <div>3B</div>
          <div>HR</div>
          <div>RBI</div>
          <div>GDP</div>
          <div>BB</div>
          <div>HP</div>
          <div>SH</div>
          <div>SF</div>
          <div>SO</div>
          <div>TB</div>
          <div className={cl.wider}>AVG</div>
          <div className={cl.wider}>SLG</div>
          <div className={cl.wider}>OBP</div>
          <div className={cl.wider}>OPS</div>
          <div>CH</div>
          <div>PO</div>
          <div>A</div>
          <div>E</div>
          <div>DP</div>
          <div className={cl.wider}>FLD%</div>
          <div>R</div>
          <div>SB</div>
          <div>CS</div>
          <div className={cl.wider}>%SB</div>
          <div>LOB</div>
        </div>
        <ul className={cl.rows}>
          {currentLeague.id === -1
            ? filteredLeagues.map((row, index) => {
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
            : filteredLeague?.batting?.games_batting.map((row, index) => (
                <li key={index} className={cl.tableRow}>
                  <div className={cl.game}>
                    {row.date.slice(8, 10)} sep, {row.home_team.name} - {row.visit_team.name}
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
                  <div>{filteredLeague.fielding.games_fielding[index].CH}</div>
                  <div>{filteredLeague.fielding.games_fielding[index].PO}</div>
                  <div>{filteredLeague.fielding.games_fielding[index].A}</div>
                  <div>{filteredLeague.fielding.games_fielding[index].E}</div>
                  <div>{filteredLeague.fielding.games_fielding[index].DP}</div>
                  <div className={cl.wider}>
                    {Number(filteredLeague.fielding.games_fielding[index].FLD).toFixed(3)}
                  </div>
                  <div>{filteredLeague.running.games_running[index].R}</div>
                  <div>{filteredLeague.running.games_running[index].SB}</div>
                  <div>{filteredLeague.running.games_running[index].CS}</div>
                  <div className={cl.wider}>{filteredLeague.running.games_running[index].SB_pr}</div>
                  <div>{filteredLeague.running.games_running[index].LOB}</div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentBattingTable;
