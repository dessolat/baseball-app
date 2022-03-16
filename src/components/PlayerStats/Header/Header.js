import React from 'react';
import cl from './Header.module.scss';
import HeaderWrapper from 'components/HeaderWrapper/HeaderWrapper';
import HeaderSelections from '../HeaderSelections/HeaderSelections';
import HeaderLeagues from '../HeaderLeagues/HeaderLeagues';

const Header = ({ playerYears, setPlayerYears }) => {
  return (
    <HeaderWrapper>
      <div className={cl.headerContent}>
        <HeaderSelections playerYears={playerYears} setPlayerYears={setPlayerYears}/>
        <HeaderLeagues playerYears={playerYears} />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
