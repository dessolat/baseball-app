import React from 'react';
import cl from './Header.module.scss';
import HeaderWrapper from 'components/HeaderWrapper/HeaderWrapper';

const Header = () => {
  return (
    <HeaderWrapper>
      <div className={cl.headerContent}>test</div>
    </HeaderWrapper>
  );
};

export default Header;
