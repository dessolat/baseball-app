import React from 'react';
import ContentGamesTableRow from './ContentGamesTableRow/ContentGamesTableRow';

const ContentGamesTableBody = ({ cl, games }) => (
  <ul className={cl.rows}>
    {games.map(game => (
      <ContentGamesTableRow key={game.id} cl={cl} game={game} />
    ))}
  </ul>
);

export default ContentGamesTableBody;
