import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const ContentPitchingTable = ({ filteredLeagues = [], filteredLeague, playerYears, MONTHS }) => {
  const [sortField, setSortField] = useState('PA');
  const [sortDirection, setSortDirection] = useState('asc');

  const currentLeague = useSelector(state => state.shared.currentLeague);

  return (
    <div className={cl.wrapper}>
      <div>
        <ContentPitchingTableHeader playerYears={playerYears} currentLeague={currentLeague} />
        <ContentPitchingTableBody
          filteredLeagues={filteredLeagues}
          filteredLeague={filteredLeague}
          playerYears={playerYears}
          currentLeague={currentLeague}
					MONTHS={MONTHS}
        />
      </div>
    </div>
  );
};

export default ContentPitchingTable;
