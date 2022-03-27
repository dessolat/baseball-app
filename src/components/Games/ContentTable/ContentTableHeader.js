import React from 'react';
import cl from './ContentTable.module.scss';
import ContentCalendars from './ContentCalendars';
import ContentTeam from './ContentTeam';
import ContentTableModeLinks from './ContentTableModeLinks';

const ContentTableHeader = () => {
	
  return (
    <div className={cl.header}>
      <ContentTeam />
      <ContentCalendars />
			<ContentTableModeLinks />
    </div>
  );
};

export default ContentTableHeader;
