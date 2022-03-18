import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const ContentPitchingTable = ({ filteredLeagues = [], filteredLeague, playerYears, MONTHS }) => {
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
