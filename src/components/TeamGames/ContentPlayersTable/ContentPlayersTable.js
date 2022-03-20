import React from 'react';
import cl from './ContentPlayersTable.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ContentPlayersTable = () => {
  const teamData = useSelector(state => state.teamGames.teamData);
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentLeague = useSelector(state => state.shared.currentLeague);

  const PLAYERS_DATA =
    currentLeague.id !== -1
      ? teamData.find(item => item.league.id === currentLeague.id)?.roster || []
      : teamData.reduce((sum, cur) => {
          if (cur.league.year === currentYear) {
            cur.roster.forEach(
              curPlayer =>
                !sum.find(
                  sumPlayer => sumPlayer.surname === curPlayer.surname && sumPlayer.name === curPlayer.name
                ) && sum.push(curPlayer)
            );
          }
          return sum;
        }, []);

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
                <Link to={`/stats/player/${player.name}/${player.surname}`}>
                  {player.name + ' ' + player.surname}
                </Link>
              </div>
              <div>{player.pos ?? '—'}</div>
              <div>
                {player.bat_hand}/{player.throw_hand}
              </div>
              <div>{player.height}</div>
              <div>{player.weight}</div>
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
