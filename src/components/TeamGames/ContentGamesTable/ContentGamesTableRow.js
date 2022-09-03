import React from 'react';
import RowDate from './RowDate';
import RowLinks from './RowLinks';
import RowTeamName from './RowTeamName';

const ContentGamesTableRow = ({ cl, game }) => {
  return (
    <li className={cl.tableRow}>
      <RowDate date={game.date} />
      <RowTeamName teamClass={cl.underlineHover} teamName={game.homies.name} />
      <div>
        {game.homies.score} - {game.visitors.score}
      </div>
      <RowTeamName teamClass={cl.underlineHover} teamName={game.visitors.name} />
      <RowLinks game={game} />
      <div>{game.last_inn !== null ? `${game.last_inn} inn` : '—'} </div>
    </li>
  );
};

export default ContentGamesTableRow;
