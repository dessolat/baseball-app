import React from 'react';
import cl from './ContentSideTables.module.scss';
import { useSelector } from 'react-redux';
import PctTable from './PctTable';
import SwitchTable from './SwitchTable';

const ContentSideTables = () => {
  const currentLeague = useSelector(state => state.games.currentLeague);
  const isMobile = useSelector(state => state.shared.isMobile);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);

  const isTables = currentLeague.id !== -1;
  return (
    // <div className={cl.side} style={{ maxHeight: '70vh' }}>
    <div
      className={cl.side}
      style={!isTables ? { height: isMobile ? 'auto' : '70vh' } : { maxHeight: isMobile ? 'auto' : '75vh' }}>
      {isTables && (
        <>
          {(!isMobile || mobileTableMode === 'Team tablo/Leader') && (
            <>
              <PctTable currentLeague={currentLeague} />
              <SwitchTable />
            </>
          )}
          {/* {(!isMobile || mobileTableMode === 'Team tablo') && <PctTable currentLeague={currentLeague} />}
          {(!isMobile || mobileTableMode === 'Leaders') && <SwitchTable />} */}
        </>
      )}
    </div>
  );
};

export default ContentSideTables;
