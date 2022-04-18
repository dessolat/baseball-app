import React, { useState } from 'react';
import cl from './ContentMobileBox.module.scss';
import MobileBoxHeader from './MobileBoxHeader';
import MobileBoxTable from './MobileBoxTable';

const ContentMobileBox = ({ tableData, footer }) => {
  const [currentMode, setCurrentMode] = useState('Batting');

  return (
    <div className={cl.mobileBox}>
      <MobileBoxHeader currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <MobileBoxTable currentMode={currentMode} />
    </div>
  );
};

export default ContentMobileBox;
