import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPlayerCurrentTeam as setCurrentTeam } from 'redux/playerStatsReducer';

const ContentPlayersTableBody = ({ cl }) => {
  const teamData = useSelector(state => state.teamGames.teamData);
  const currentYear = useSelector(state => state.shared.currentYear);
  const currentLeague = useSelector(state => state.games.currentLeague);

  const dispatch = useDispatch();

  const handlePlayerClick = () => {
    dispatch(setCurrentTeam(teamName));
  };

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
  );
};

export default ContentPlayersTableBody;
