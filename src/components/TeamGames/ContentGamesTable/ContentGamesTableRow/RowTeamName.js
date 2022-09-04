import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getShortName } from 'utils';

const RowTeamName = ({ teamClass, teamName }) => {
  const { gameType } = useParams();

  return (
    <div className={teamClass}>
      <Link to={`/games/team/${gameType}/${teamName}`}> {getShortName(teamName, 22)}</Link>
    </div>
  );
};

export default RowTeamName;
