import React from 'react';
import cl from './ContentTable.module.scss';
import ContentCalendars from './ContentCalendars';
import ContentTeam from './ContentTeam';
import ContentTableModeLinks from './ContentTableModeLinks';
import { useSelector } from 'react-redux';

const ContentTableHeader = ({ games }) => {
  const isMobile = useSelector(state => state.shared.isMobile);
  const currentLeague = useSelector(state => state.games.currentLeague);
  const mobileTableMode = useSelector(state => state.games.mobileTableMode);

  return (
    <div className={cl.header}>
      {(!isMobile || (isMobile && mobileTableMode === 'Calendar')) && <ContentTeam games={games} />}
      {(!isMobile || (isMobile && mobileTableMode === 'Calendar')) && <ContentCalendars />}
      {mobileTableMode !== 'Calendar' && (
        <div className={cl.modeTitle}>Team tablo/Leader</div>
        // <div className={cl.modeTitle}>{mobileTableMode === 'Team tablo' ? 'Team tablo' : 'Leaders'}</div>
      )}
      {currentLeague.id !== -1 && <ContentTableModeLinks />}
    </div>
  );
};

export default ContentTableHeader;
