import React from 'react';
import TeamLogo from 'images/team_logo.png';
import ContentHeaderModeLinks from '../ContentMobileHeader/ContentHeaderModeLinks';
import HeaderSelectionsTeamName from './HeaderSelectionsTeamName';

const HeaderSelectionsTeamInfo = ({ cl }) => {
  return (
    <div className={cl.teamInfo}>
      <img src={TeamLogo} alt='' className={cl.teamImg} />
      <HeaderSelectionsTeamName teamClass={cl.teamName} />
      <div className={cl.linksWrapper}>
        <ContentHeaderModeLinks />
      </div>
    </div>
  );
};

export default HeaderSelectionsTeamInfo;
