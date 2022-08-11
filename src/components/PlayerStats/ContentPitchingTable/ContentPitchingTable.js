import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const ContentPitchingTable = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  MONTHS,
  handleLeagueClick,
  getSortedTableOptions,
  handleTableOptionClick
}) => {
  const [sortField, setSortField] = useState('G');
  const [sortDirection, setSortDirection] = useState('asc');

  const currentLeague = useSelector(state => state.games.currentLeague);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  return (
    <div className={cl.wrapper}>
      <div>
        <ContentPitchingTableHeader
          playerYears={playerYears}
          currentLeague={currentLeague}
          sortField={sortField}
          sortDirection={sortDirection}
          handleFieldClick={handleFieldClick}
          getSortedTableOptions={getSortedTableOptions}
          handleTableOptionClick={handleTableOptionClick}
        />
        <ContentPitchingTableBody
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          currentLeague={currentLeague}
          sortField={sortField}
          sortDirection={sortDirection}
          MONTHS={MONTHS}
          handleLeagueClick={handleLeagueClick}
        />
      </div>
    </div>
  );
};

export default ContentPitchingTable;
