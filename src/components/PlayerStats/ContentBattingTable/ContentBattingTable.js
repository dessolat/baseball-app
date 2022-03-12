import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentBattingTable.module.scss';

const ContentBattingTable = ({ TABLE_DATA, playerYears }) => {
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
          <div>FLD%</div>
          <div>SB</div>
          <div>CS</div>
          <div>%SB</div>
          <div>LOB</div>
        </div>
        <ul className={cl.rows}>
          {TABLE_DATA.batting.map((row, index) => (
            <li key={index} className={cl.tableRow}>
              {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
              {currentLeague.id === -1 && <div className={cl.league}>{row.league}</div>}
              {currentLeague.id !== -1 && <div className={cl.game}>{row.game}</div>}
              <div>{row.ab}</div>
              <div>{row.h}</div>
              <div>{row['2b']}</div>
              <div>{row['3b']}</div>
              <div>{row.hr}</div>
              <div>{row.rbi}</div>
              <div>{row.gdp}</div>
              <div>{row.bb}</div>
              <div>{row.hp}</div>
              <div>{row.sh}</div>
              <div>{row.sf}</div>
              <div>{row.so}</div>
              <div>{row.tb}</div>
              <div className={cl.wider}>{row.avg.toFixed(3)}</div>
              <div className={cl.wider}>{row.slg.toFixed(3)}</div>
              <div className={cl.wider}>{row.obp.toFixed(3)}</div>
              <div className={cl.wider}>{row.ops.toFixed(3)}</div>
              <div>{row.ch}</div>
              <div>{row.po}</div>
              <div>{row.a}</div>
              <div>{row.e}</div>
              <div>{row.dp}</div>
              <div>{row['fld%']}</div>
              <div>{row.sb}</div>
              <div>{row.cs}</div>
              <div>{row['%sb']}</div>
              <div>{row.lob}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentBattingTable;
