import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const ContentPitchingTable = ({ filteredLeagues = [], filteredLeague, playerYears, MONTHS, handleLeagueClick }) => {
  const [sortField, setSortField] = useState('IP');
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
					/>
        <ContentPitchingTableBody
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          currentLeague={currentLeague}
          sortField={sortField}
          sortDirection={sortDirection}
          MONTHS={MONTHS}
        />
      </div>
    </div>
  );
};

export default ContentPitchingTable;
