import React from 'react';
import { useSelector } from 'react-redux';
import cl from './ContentPitchingTable.module.scss';
import ContentPitchingTableBody from './ContentPitchingTableBody';
import ContentPitchingTableHeader from './ContentPitchingTableHeader';

const ContentPitchingTable = ({ TABLE_DATA, playerYears }) => {
  const currentLeague = useSelector(state => state.shared.currentLeague);

  return (
    <div className={cl.wrapper}>
      <div>
        <ContentPitchingTableHeader playerYear={playerYears} currentLeague={currentLeague} />
        <ContentPitchingTableBody playerYears={playerYears} TABLE_DATA={TABLE_DATA} currentLeague={currentLeague}/>
      </div>
    </div>
  );
};

export default ContentPitchingTable;
