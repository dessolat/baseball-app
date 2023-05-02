import React from 'react';
import cl from './ContentBox.module.scss';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';
import ContentBoxTables from './ContentBoxTables';
import Graphs from './Graphs/Graphs';

const ContentBoxDesktop = ({ tableData, footer, graphsData }) => {
  const { batters_metrix, pitchers_metrix } = graphsData;
  const isGraphs =
    Object.keys(graphsData).length !== 0 &&
    batters_metrix[0].pitches_all.length > 0 &&
    pitchers_metrix[0].pitches_all.length > 0;

  return (
    <div className={cl.box}>
      <ContentBoxTables tableData={tableData} />
      {isGraphs && <Graphs graphsData={graphsData} />}
      <ContentBoxFooter footer={footer} />
    </div>
  );
};

export default ContentBoxDesktop;
