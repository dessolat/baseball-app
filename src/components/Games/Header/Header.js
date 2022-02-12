import React from 'react';
import cl from './Header.module.scss';
import HeaderWrapper from 'components/HeaderWrapper/HeaderWrapper';
import HeaderSelections from '../HeaderSelections/HeaderSelections';
import HeaderLeagues from '../HeaderLeagues/HeaderLeagues';

const Header = ({ leagues }) => (
  <HeaderWrapper>
    <div className={cl.headerContent}>
      <HeaderSelections />
      <HeaderLeagues leagues={leagues} />
    </div>
  </HeaderWrapper>
);

export default Header;
