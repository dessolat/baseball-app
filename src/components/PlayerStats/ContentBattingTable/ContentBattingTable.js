import React, { useState } from 'react';
import cl from './ContentBattingTable.module.scss';
import { useSelector } from 'react-redux';
import ContentBattingTableHeader from './ContentBattingTableHeader';
import ContentBattingTableBody from './ContentBattingTableBody';

const ContentBattingTable = ({
  filteredLeagues = [],
  filteredLeague,
  playerYears,
  MONTHS,
  handleLeagueClick,
  getSortedTableOptions,
  handleTableOptionClick
}) => {
  const [sortField, setSortField] = useState('AB');
  const [sortDirection, setSortDirection] = useState('asc');

  const currentLeague = useSelector(state => state.games.currentLeague);

  const handleFieldClick = field => () => {
    sortField !== field ? setSortField(field) : setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={cl.wrapper}>
      <div>
        <ContentBattingTableHeader
          cl={cl}
          playerYears={playerYears}
          currentLeague={currentLeague}
          getSortedTableOptions={getSortedTableOptions}
          handleTableOptionClick={handleTableOptionClick}
          sortField={sortField}
          sortDirection={sortDirection}
          handleFieldClick={handleFieldClick}
        />
        <ContentBattingTableBody
          cl={cl}
          currentLeague={currentLeague}
          playerYears={playerYears}
          filteredLeague={filteredLeague}
					filteredLeagues={filteredLeagues}
          sortField={sortField}
					sortDirection={sortDirection}
					handleLeagueClick={handleLeagueClick}
					MONTHS={MONTHS}
        />
      </div>
    </div>
  );
};

export default ContentBattingTable;
