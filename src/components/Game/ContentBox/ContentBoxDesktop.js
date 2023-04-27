import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';
import ContentBoxTables from './ContentBoxTables';
import Graphs from './Graphs/Graphs';

const ContentBoxDesktop = ({ tableData, footer }) => {
  return (
    <div className={cl.box}>
      <ContentBoxTables tableData={tableData} />
      <Graphs />
      <ContentBoxFooter footer={footer} />
    </div>
  );
};

export default ContentBoxDesktop;
