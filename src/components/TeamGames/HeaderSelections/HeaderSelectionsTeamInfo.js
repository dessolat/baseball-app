import React from 'react';
import TeamLogo from 'images/team_logo.png';
import HeaderSelectionsTeamName from './HeaderSelectionsTeamName';
import HeaderSelectionsLinks from './HeaderSelectionsLinks';

const HeaderSelectionsTeamInfo = ({ cl }) => (
  <div className={cl.teamInfo}>
    <img src={TeamLogo} alt='' className={cl.teamImg} />
    <HeaderSelectionsTeamName teamClass={cl.teamName} />
    <HeaderSelectionsLinks wrapperClass={cl.linksWrapper} />
  </div>
);

export default HeaderSelectionsTeamInfo;
