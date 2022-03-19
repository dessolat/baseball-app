import React from 'react';
import cl from './ContentPitchingTable.module.scss';

const ContentPitchingTableHeader = ({
  playerYears,
  currentLeague,
  sortField,
  sortDirection,
  handleFieldClick
}) => {
  return (
    <div className={cl.tableHeader}>
      {playerYears === 'All years' && <div className={cl.year}>Years</div>}
      {currentLeague.id === -1 && <div className={cl.league}>League</div>}
      {currentLeague.id !== -1 && <div className={cl.game}>Game</div>}
      <div>PA</div>
      <div>R</div>
      <div>ER</div>
      <div>H</div>
      <div>2B</div>
      <div>3B</div>
      <div>HR</div>
      <div>BB</div>
      <div>IBB</div>
      <div>HP</div>
      <div>SH</div>
      <div>SF</div>
      <div>SO</div>
      <div>WP</div>
      <div className={cl.wider}>ERA</div>
      <div>NP</div>
      <div>NS</div>
      <div>NB</div>
    </div>
  );
};

export default ContentPitchingTableHeader;
