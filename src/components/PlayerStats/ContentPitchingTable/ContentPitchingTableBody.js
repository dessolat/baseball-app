import React from 'react';
import cl from './ContentPitchingTable.module.scss';

const ContentPitchingTableBody = ({ playerYears, leagues, currentLeague }) => {
  return (
    <ul className={cl.rows}>
      {leagues.map((row, index) => (
        <li key={index} className={cl.tableRow}>
          {playerYears === 'All years' && <div className={cl.year}>{row.year}</div>}
          {currentLeague.id === -1 && <div className={cl.league}>{row.title}</div>}
          {currentLeague.id !== -1 && <div className={cl.game}>01 sep, Name team - Name Team</div>}
          <div>{row.teams[0].pitching.PA}</div>
          <div>{row.teams[0].pitching.R}</div>
          <div>{row.teams[0].pitching.ER}</div>
          <div>{row.teams[0].pitching.H}</div>
          <div>{row.teams[0].pitching['2B']}</div>
          <div>{row.teams[0].pitching['3B']}</div>
          <div>{row.teams[0].pitching.HR}</div>
          <div>{row.teams[0].pitching.BB}</div>
          <div>{row.teams[0].pitching.IBB}</div>
          <div>{row.teams[0].pitching.HP}</div>
          <div>{row.teams[0].pitching.SH}</div>
          <div>{row.teams[0].pitching.SF}</div>
          <div>{row.teams[0].pitching.SO}</div>
          <div>{row.teams[0].pitching.WP}</div>
          <div className={cl.wider}>{Number(row.teams[0].pitching.ERA).toFixed(3)}</div>
          <div>{row.teams[0].pitching.NP}</div>
          <div>{row.teams[0].pitching.NS}</div>
          <div>{row.teams[0].pitching.NB}</div>
        </li>
      ))}
    </ul>
  );
};

export default ContentPitchingTableBody;
