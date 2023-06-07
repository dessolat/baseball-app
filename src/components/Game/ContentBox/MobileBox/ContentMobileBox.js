import React from 'react';
// import ContentBoxFooter from '../../ContentBoxFooter/ContentBoxFooter';
import cl from './ContentMobileBox.module.scss';
import MobileBoxTable from './MobileBoxTable';
import { useSelector } from 'react-redux';
import Graphs from '../Graphs/Graphs';

const ContentMobileBox = ({ tableData, graphsData }) => {
  const currentMode = useSelector(s => s.game.boxMode);

  const isTable = currentMode !== 'Info' && currentMode !== 'Machine Vision Statistics';
  // const isFooter = currentMode === 'Info' && footer !== '';
  const { batters_metrix, pitchers_metrix } = graphsData;
  const isGraphs =
    Object.keys(graphsData).length !== 0 &&
    batters_metrix[0].pitches_all.length > 0 &&
    pitchers_metrix[0].pitches_all.length > 0;
  const isStatistics = currentMode === 'Machine Vision Statistics' && isGraphs;
  return (
    <div className={cl.mobileBox}>
      {/* <MobileBoxHeader currentMode={currentMode} /> */}
      {isTable && <MobileBoxTable currentMode={currentMode} tableData={tableData} />}
      {isStatistics && <Graphs graphsData={graphsData} />}
      {/* {isFooter && <ContentBoxFooter footer={footer} />} */}
    </div>
  );
};

export default ContentMobileBox;
