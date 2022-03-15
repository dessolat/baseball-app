import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const ContentPitchingTable = ({ leagues, playerYears }) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);

  return (
    <div className={cl.wrapper}>
      <div>
        <ContentPitchingTableHeader playerYears={playerYears} currentLeague={currentLeague} />
        <ContentPitchingTableBody playerYears={playerYears} leagues={leagues} currentLeague={currentLeague}/>
      </div>
    </div>
  );
};

export default ContentPitchingTable;
