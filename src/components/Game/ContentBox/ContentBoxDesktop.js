import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';
import ContentBoxTables from './ContentBoxTables';
import Graphs from './Graphs/Graphs';

const ContentBoxDesktop = ({ tableData, footer, graphsData }) => {
  const isGraphs = Object.keys(graphsData).length !== 0;

  return (
    <div className={cl.box}>
      <ContentBoxTables tableData={tableData} />
      {isGraphs && <Graphs graphsData={graphsData} />}
      <ContentBoxFooter footer={footer} />
    </div>
  );
};

export default ContentBoxDesktop;
