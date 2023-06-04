import React from 'react';
// import ContentBoxFooter from '../../ContentBoxFooter/ContentBoxFooter';
import cl from './ContentMobileBox.module.scss';
import MobileBoxTable from './MobileBoxTable';
import { useSelector } from 'react-redux';

const ContentMobileBox = ({ tableData, footer }) => {
  const currentMode = useSelector(s => s.game.boxMode);

  const isTable = currentMode !== 'Info';
  // const isFooter = currentMode === 'Info' && footer !== '';
  return (
    <div className={cl.mobileBox}>
      {/* <MobileBoxHeader currentMode={currentMode} /> */}
      {isTable && <MobileBoxTable currentMode={currentMode} tableData={tableData} />}
      {/* {isFooter && <ContentBoxFooter footer={footer} />} */}
    </div>
  );
};

export default ContentMobileBox;
