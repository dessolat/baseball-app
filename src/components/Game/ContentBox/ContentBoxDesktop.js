import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';
import ContentBoxTables from './ContentBoxTables';

const ContentBoxDesktop = ({ tableData, footer }) => {
  return (
    <div className={cl.box}>
      <ContentBoxTables tableData={tableData} />
      <ContentBoxFooter footer={footer} />
    </div>
  );
};

export default ContentBoxDesktop;
