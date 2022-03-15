import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentBattingTable.module.scss';

const ContentBattingTable = ({ leagues, playerYears }) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);

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
          {leagues.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
              {currentLeague.id === -1 && <div className={cl.league}>{row.title}</div>}
              {currentLeague.id !== -1 && <div className={cl.game}>01 sep, Name team - Name Team</div>}
              <div>{row.teams[0].batting.AB}</div>
              <div>{row.teams[0].batting.H}</div>
              <div>{row.teams[0].batting['1B']}</div>
              <div>{row.teams[0].batting['2B']}</div>
              <div>{row.teams[0].batting['3B']}</div>
              <div>{row.teams[0].batting.HR}</div>
              <div>{row.teams[0].batting.RBI}</div>
              <div>{row.teams[0].batting.GDP}</div>
              <div>{row.teams[0].batting.BB}</div>
              <div>{row.teams[0].batting.HP}</div>
              <div>{row.teams[0].batting.SH}</div>
              <div>{row.teams[0].batting.SF}</div>
              <div>{row.teams[0].batting.SO}</div>
              <div>{row.teams[0].batting.TB}</div>
              <div className={cl.wider}>{Number(row.teams[0].batting.AVG).toFixed(3)}</div>
              <div className={cl.wider}>{Number(row.teams[0].batting.SLG).toFixed(3)}</div>
              <div className={cl.wider}>{Number(row.teams[0].batting.OBP).toFixed(3)}</div>
              <div className={cl.wider}>{Number(row.teams[0].batting.OPS).toFixed(3)}</div>
              <div>{row.teams[0].fielding.CH}</div>
              <div>{row.teams[0].fielding.PO}</div>
              <div>{row.teams[0].fielding.A}</div>
              <div>{row.teams[0].fielding.E}</div>
              <div>{row.teams[0].fielding.DP}</div>
              <div className={cl.wider}>{row.teams[0].fielding.FLD}</div>
              <div>{row.teams[0].running.R}</div>
              <div>{row.teams[0].running.SB}</div>
              <div>{row.teams[0].running.CS}</div>
              <div className={cl.wider}>{row.teams[0].running.SB_pr}</div>
              <div>{row.teams[0].running.LOB}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentBattingTable;
