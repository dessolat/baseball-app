import React from 'react';
import cl from './ContentPlayersTable.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setPlayerCurrentTeam as setCurrentTeam} from 'redux/playerStatsReducer';

const ContentPlayersTable = () => {
	const { teamName } = useParams();

  const teamData = useSelector(state => state.teamGames.teamData);
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentLeague = useSelector(state => state.games.currentLeague);

	const dispatch = useDispatch()

	const handlePlayerClick = () => {
		dispatch(setCurrentTeam(teamName));
	}

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
                <Link to={`/stats/player/${player.id}`} onClick={handlePlayerClick}>
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
        <Link to={`/stats/player?team=${teamName}`}>Go to Player Stat</Link>
      </div>
    </div>
  );
};

export default ContentPlayersTable;
