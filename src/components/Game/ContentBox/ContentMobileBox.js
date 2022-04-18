import React from 'react';
import cl from './ContentMobileBox.module.scss';
import MobileBoxHeader from './MobileBoxHeader';
import MobileBoxTable from './MobileBoxTable';

const ContentMobileBox = () => {
  return (
    <div className={cl.mobileBox}>
      <MobileBoxHeader />
      <MobileBoxTable />
    </div>
  );
};

export default ContentMobileBox;
