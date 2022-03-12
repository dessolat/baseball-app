import React from 'react';
import cl from './ContentSideTables.module.scss';
import { useSelector } from 'react-redux';
import PctTable from './PctTable';
import SwitchTable from './SwitchTable';

const ContentSideTables = () => {
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const isTables = currentLeague.id !== -1;
  return (
    <div className={cl.side} style={!isTables ? { height: '70vh' } : null}>
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
