import React from 'react';
import cl from './HeaderSelections.module.scss';
import HeaderSelectionsTeamInfo from './HeaderSelectionsTeamInfo';
import HeaderSelectionsYears from './HeaderSelectionsYears';

const HeaderSelections = () => (
  <div className={cl.selections}>
    <HeaderSelectionsTeamInfo cl={cl} />
    <HeaderSelectionsYears yearsClass={cl.years} />
  </div>
);

export default HeaderSelections;
