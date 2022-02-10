import React from 'react';
import cl from './HeaderWrapper.module.scss';

const HeaderWrapper = ({ children, ...props }) => {
  return (
    <header className={cl.header} {...props}>
      <div className='container'>{children}</div>
    </header>
  );
};

export default HeaderWrapper;
