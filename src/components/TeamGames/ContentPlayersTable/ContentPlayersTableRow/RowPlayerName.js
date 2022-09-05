import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { setPlayerCurrentTeam as setCurrentTeam } from 'redux/playerStatsReducer';
import { useDispatch } from 'react-redux';

const RowPlayerName = ({player, nameClass}) => {
  const { teamName } = useParams();

  const dispatch = useDispatch();

	const handlePlayerClick = () => {
    dispatch(setCurrentTeam(teamName));
  };

	return (
		<div className={nameClass}>
        <Link to={`/stats/player/${player.id}`} onClick={handlePlayerClick}>
          {player.name + ' ' + player.surname}
        </Link>
      </div>
	)
}

export default RowPlayerName