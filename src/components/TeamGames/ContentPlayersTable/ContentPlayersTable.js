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
              <div className={cl.underlineHover}>
                <Link to={`/stats/player/${player.surname} ${player.name}`}>
                  {player.surname + ' ' + player.name}
                </Link>
              </div>
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
