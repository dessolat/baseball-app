import React from 'react';
import cl from './ContentMobileBox.module.scss';
import MobileBoxHeader from './MobileBoxHeader';

const ContentMobileBox = () => {
  return (
    <div className={cl.mobileBox}>
      <MobileBoxHeader />
      Mobile box
    </div>
  );
};

export default ContentMobileBox;
