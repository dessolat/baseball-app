import React from 'react';
import { Link } from 'react-router-dom';
import cl from './ContentPlayersTable.module.scss';

const PLAYERS_DATA = [
  { surname: 'SURNAME', name: 'name', pos: 'P', bt: 'L/L', ht: 0, wt: 0, yob: 1996 },
  { surname: 'SURNAME', name: 'name', pos: 'P', bt: 'R/R', ht: 0, wt: 0, yob: 1993 },
  { surname: 'SURNAME', name: 'name', pos: 'OF', bt: 'R/R', ht: 0, wt: 0, yob: 1991 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1997 },
  { surname: 'SURNAME', name: 'name', pos: 'P', bt: 'R/R', ht: 0, wt: 0, yob: 1994 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1987 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 },
  { surname: 'SURNAME', name: 'name', pos: 'IF', bt: 'R/R', ht: 0, wt: 0, yob: 1990 }
];

const ContentPlayersTable = () => {
  // //Games filtering
  // let filteredData = useMemo(
  //   () =>
  //     games.filter(
  //       game =>
  //         (currentStadium !== 'All' ? game.stadium_name === currentStadium : true) &&
  //         (currentLeague.id !== -1
  //           ? game.league_id === currentLeague.id
  //           : currentGameType === game.game_type) &&
  //         (currentHome !== 'All' ? game.owners_name === currentHome : true) &&
  //         (currentGuests !== 'All' ? game.guests_name === currentGuests : true)
  //     ),
  //   [games, currentStadium, currentLeague, currentGameType, currentHome, currentGuests]
  // );

  // //Games sorting
  // filteredData = useMemo(() => filteredData.sort((a, b) => (a.date > b.date ? 1 : -1)), [filteredData]);
  return (
    <div className={cl.wrapper}>
      <div className={cl.table}>
        <div className={cl.tableHeader}>
          <div>#</div>
          <div>Player</div>
          <div>POS</div>
          <div>B/T</div>
          <div>HT</div>
          <div>WT</div>
          <div>YOB</div>
        </div>
        <ul className={cl.rows}>
          {PLAYERS_DATA.map((player, index) => (
            <li key={index} className={cl.tableRow}>
              <div>{index + 1}</div>
              <div>{player.surname + ' ' + player.name}</div>
              <div>{player.pos}</div>
              <div>{player.bt}</div>
              <div>{player.ht}</div>
              <div>{player.wt}</div>
              <div>{player.yob}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={cl.linkWrapper}>
        <Link to='/stats/player'>Go to Player Stat</Link>
      </div>
    </div>
  );
};

export default ContentPlayersTable;
