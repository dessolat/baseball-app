import React, { useState } from 'react';
import ModeListItem from './ModeListItem';
import cl from './VideoOptions.module.scss';

const ModeList = () => {
  const [currentMode, setCurrentMode] = useState('Full');

  const MODES = ['Full', 'Short', 'Super Short'];

  return (
    <ul className={cl.modeList}>
      {MODES.map((mode, i) => (
        <ModeListItem key={i} mode={mode} currentMode={currentMode} />
      ))}
    </ul>
  );
};

export default ModeList;
