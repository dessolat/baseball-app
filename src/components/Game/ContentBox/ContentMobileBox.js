import React, { useState } from 'react';
import ContentBoxFooter from '../ContentBoxFooter/ContentBoxFooter';
import cl from './ContentMobileBox.module.scss';
import MobileBoxHeader from './MobileBoxHeader';
import MobileBoxTable from './MobileBoxTable';

const ContentMobileBox = ({ tableData, footer }) => {
  const [currentMode, setCurrentMode] = useState('Batting');

  return (
    <div className={cl.mobileBox}>
      <MobileBoxHeader currentMode={currentMode} setCurrentMode={setCurrentMode} />
      {currentMode !== 'Info' ? (
        <MobileBoxTable currentMode={currentMode} tableData={tableData} />
      ) : (
        <ContentBoxFooter footer={footer}/>
      )}
    </div>
  );
};

export default ContentMobileBox;
