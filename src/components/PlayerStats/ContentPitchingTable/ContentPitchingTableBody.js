import React from 'react';
import cl from './ContentPitchingTable.module.scss';

const ContentPitchingTableBody = ({ playerYears, TABLE_DATA, currentLeague }) => {
  return (
    <ul className={cl.rows}>
      {TABLE_DATA.pitching.map((row, index) => (
        <li key={index} className={cl.tableRow}>
          {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
          {currentLeague.id === -1 && <div className={cl.league}>{row.league}</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>{row.game}</div>}
          <div>{row.pa}</div>
          <div>{row.r}</div>
          <div>{row.er}</div>
          <div>{row.h}</div>
          <div>{row['2b']}</div>
          <div>{row['3b']}</div>
          <div>{row.hr}</div>
          <div>{row.bb}</div>
          <div>{row.ibb}</div>
          <div>{row.hp}</div>
          <div>{row.sh}</div>
          <div>{row.sf}</div>
          <div>{row.so}</div>
          <div>{row.wp}</div>
          <div className={cl.wider}>{row.era.toFixed(3)}</div>
          <div>{row.np}</div>
          <div>{row.ns}</div>
          <div>{row.nb}</div>
        </li>
      ))}
    </ul>
  );
};

export default ContentPitchingTableBody;
