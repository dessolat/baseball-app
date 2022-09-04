import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { setPlayerCurrentTeam as setCurrentTeam } from 'redux/playerStatsReducer';
import { useDispatch } from 'react-redux';

const ContentPlayersTableRow = ({ player, index, cl }) => {
  const { teamName } = useParams();

	const handlePlayerClick = () => {
    dispatch(setCurrentTeam(teamName));
  };

  const dispatch = useDispatch();

  return (
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
  );
};

export default ContentPlayersTableRow;
