import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getShortName } from 'utils';
import RowDate from './RowDate';
import RowLinks from './RowLinks';

const ContentGamesTableRow = ({ cl, game }) => {
  const { gameType } = useParams();

  return (
    <li className={cl.tableRow}>
      <RowDate date={game.date}/>
      <div className={cl.underlineHover}>
        <Link to={`/games/team/${gameType}/${game.homies.name}`}> {getShortName(game.homies.name, 22)}</Link>
      </div>
      <div>
        {game.homies.score} - {game.visitors.score}
      </div>
      <div className={cl.underlineHover}>
        <Link to={`/games/team/${gameType}/${game.visitors.name}`}>
          {' '}
          {getShortName(game.visitors.name, 22)}
        </Link>
      </div>
      <RowLinks game={game} />
      <div>{game.last_inn !== null ? `${game.last_inn} inn` : '—'} </div>
    </li>
  );
};

export default ContentGamesTableRow;
