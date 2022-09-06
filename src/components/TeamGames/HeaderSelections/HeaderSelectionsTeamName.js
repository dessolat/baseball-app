import React from 'react';
import { getShortName } from 'utils';
import { useParams } from 'react-router-dom';

const HeaderSelectionsTeamName = ({ teamClass }) => {
  const { teamName } = useParams();

  return <h2 className={teamClass}>{getShortName(teamName, 24)}</h2>;
};

export default HeaderSelectionsTeamName;
