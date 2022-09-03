import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getShortName } from 'utils';

const MONTHS = {
  '01': 'january',
  '02': 'february',
  '03': 'march',
  '04': 'april',
  '05': 'may',
  '06': 'june',
  '07': 'july',
  '08': 'august',
  '09': 'september',
  10: 'october',
  11: 'november',
  12: 'december'
};

const ContentGamesTableRow = ({cl, game}) => {
	const { gameType } = useParams();

  const isMobile = useSelector(state => state.shared.isMobile);
  return (
    <li key={game.id} className={cl.tableRow}>
      <div>
        {game.date.slice(8, 10) +
          ' ' +
          (!isMobile ? MONTHS[game.date.slice(5, 7)].slice(0, 3) : MONTHS[game.date.slice(5, 7)])}
      </div>
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
      <div className={cl.links}>
        <div>
          <Link to={`/game/${game.id}?tab=box`}>Box</Link>
          <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
          {game.has_records && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
        </div>
      </div>
      <div>{game.last_inn !== null ? `${game.last_inn} inn` : '—'} </div>
    </li>
  );
};

export default ContentGamesTableRow;
