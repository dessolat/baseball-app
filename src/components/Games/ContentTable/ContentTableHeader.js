import React from 'react';
import cl from './ContentTable.module.scss';
import ContentCalendars from './ContentCalendars';
import ContentTeam from './ContentTeam';
import ContentTableModeLinks from './ContentTableModeLinks';
import { useSelector } from 'react-redux';

const ContentTableHeader = () => {
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentLeague = useSelector(state => state.shared.currentLeague);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);

  return (
    <div className={cl.header}>
      <ContentTeam />
      {(!isMobile || (isMobile && mobileTableMode === 'Calendar')) && <ContentCalendars />}
      {mobileTableMode !== 'Calendar' && (
        <div className={cl.modeTitle}>{mobileTableMode === 'Team tablo' ? 'Team tablo' : 'Leaders'}</div>
      )}
      {currentLeague.id !== -1 && <ContentTableModeLinks />}
    </div>
  );
};

export default ContentTableHeader;
