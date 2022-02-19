import React from 'react';
import cl from './ContentTable.module.scss';
import ContentCalendars from './ContentCalendars';
import ContentTeam from './ContentTeam';

const ContentTableHeader = () => (
  <div className={cl.header}>
    <ContentTeam />
    <ContentCalendars />
  </div>
);

export default ContentTableHeader;
