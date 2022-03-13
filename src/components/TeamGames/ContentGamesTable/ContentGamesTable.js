import React, { useMemo } from 'react';
import cl from './ContentGamesTable.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getShortName } from 'utils';

const MONTHS = {
  '01': 'jan',
  '02': 'feb',
  '03': 'mar',
  '04': 'apr',
  '05': 'may',
  '06': 'jun',
  '07': 'jul',
  '08': 'aug',
  '09': 'sep',
  10: 'oct',
  11: 'nov',
  12: 'dec'
};

const ContentGamesTable = () => {
  const { teamName } = useParams();

  const games = useSelector(state => state.games.games);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  //Games filtering
  let filteredData = useMemo(
    () =>
      games.filter(
        game =>
          (currentLeague.id !== -1 ? game.league_id === currentLeague.id : true) &&
          (game.owners_name === teamName || game.guests_name === teamName)
      ),
			// eslint-disable-next-line
    [games, currentLeague, teamName]
  );

  //Games sorting
  filteredData = useMemo(() => filteredData.sort((a, b) => (a.date > b.date ? 1 : -1)), [filteredData]);
  return (
    <div className={cl.wrapper}>
      <div className={cl.table}>
        <div className={cl.tableHeader}>
          <div>Data</div>
          <div>Home</div>
          <div> </div>
          <div>Guests</div>
          <div> </div>
          <div>Inn</div>
        </div>
        <ul className={cl.rows}>
          {filteredData.map((game, index) => (
            <li key={game.id} className={cl.tableRow}>
              <div>{game.date.slice(8, 10) + ' ' + MONTHS[game.date.slice(5, 7)]}</div>
              <div className={cl.underlineHover}>
                <Link to={`/games/team/${game.owners_name}`}> {getShortName(game.owners_name, 22)}</Link>
              </div>
              <div>
                {game.score_owners} - {game.score_guests}
              </div>
              <div className={cl.underlineHover}>
                <Link to={`/games/team/${game.guests_name}`}> {getShortName(game.guests_name, 22)}</Link>
              </div>
              <div className={cl.links}>
                <div>
                  <Link to={`/game/${game.id}?tab=box`}>Box</Link>
                  <Link to={`/game/${game.id}?tab=plays`}>Plays</Link>
                  {game.hasVideos && <Link to={`/game/${game.id}?tab=videos`}>Videos</Link>}
                </div>
              </div>
              <div>{game.inn !== null ? `${game.inn} inn` : '—'} </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={cl.linkWrapper}>
        <Link to='/stats/team'>Go to Team Stat</Link>
      </div>
    </div>
  );
};

export default ContentGamesTable;
