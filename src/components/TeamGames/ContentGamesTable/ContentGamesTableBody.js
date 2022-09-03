import React from 'react';
import ContentGamesTableRow from './ContentGamesTableRow';

const ContentGamesTableBody = ({ cl, games }) => (
  <ul className={cl.rows}>
    {games.map(game => (
      <ContentGamesTableRow cl={cl} game={game} />
    ))}
  </ul>
);

export default ContentGamesTableBody;
