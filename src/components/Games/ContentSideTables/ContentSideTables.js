import React from 'react';
import cl from './ContentSideTables.module.scss';
import { useSelector } from 'react-redux';
import PctTable from './PctTable';
import SwitchTable from './SwitchTable';

const ContentSideTables = () => {
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const isMobile = useSelector(state => state.shared.isMobile);

  const isTables = currentLeague.id !== -1;
  return (
    <div className={cl.side} style={!isTables ? { height: isMobile ? 'auto' : '70vh' } : null}>
      {isTables && (
        <>
          <PctTable currentLeague={currentLeague} />
          <SwitchTable />
        </>
      )}
    </div>
  );
};

export default ContentSideTables;
