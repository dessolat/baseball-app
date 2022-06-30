import React from 'react';
import cl from './Header.module.scss';
import HeaderWrapper from 'components/HeaderWrapper/HeaderWrapper';
import HeaderSelections from '../HeaderSelections/HeaderSelections';
import HeaderLeagues from '../HeaderLeagues/HeaderLeagues';

const Header = ({ playerYears, setPlayerYears, calculateTeamsArray }) => {
  return (
    <HeaderWrapper>
      <div className={cl.headerContent}>
        <HeaderSelections playerYears={playerYears} setPlayerYears={setPlayerYears} calculateTeamsArray={calculateTeamsArray}/>
        <HeaderLeagues playerYears={playerYears} calculateTeamsArray={calculateTeamsArray} />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
