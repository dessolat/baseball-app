import React from 'react';
import TeamLogo from 'images/team_logo.png';
import ContentHeaderModeLinks from '../ContentMobileHeader/ContentHeaderModeLinks';
import { getShortName } from 'utils';
import { useParams } from 'react-router-dom';

const HeaderSelectionsTeamInfo = ({ cl }) => {
  const { teamName } = useParams();

  return (
    <div className={cl.teamInfo}>
      <img src={TeamLogo} alt='' className={cl.teamImg} />
      <h2 className={cl.teamName}>{getShortName(teamName, 24)}</h2>
      <div className={cl.linksWrapper}>
        <ContentHeaderModeLinks />
      </div>
    </div>
  );
};

export default HeaderSelectionsTeamInfo;
