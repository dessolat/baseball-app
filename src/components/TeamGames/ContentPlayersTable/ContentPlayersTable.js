import React from 'react';
import cl from './ContentPlayersTable.module.scss';
import { Link, useParams } from 'react-router-dom';
import ContentPlayersTableHeader from './ContentPlayersTableHeader';
import ContentPlayersTableBody from './ContentPlayersTableBody';

const ContentPlayersTable = () => {
  const { teamName } = useParams();

  return (
    <div className={cl.wrapper}>
      <div className={cl.table}>
        <ContentPlayersTableHeader headerStyle={cl.tableHeader} />
        <ContentPlayersTableBody cl={cl} />
      </div>
      <div className={cl.linkWrapper}>
        <Link to={`/stats/player?team=${teamName}`}>Go to Player Stat</Link>
      </div>
    </div>
  );
};

export default ContentPlayersTable;
