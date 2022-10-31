import React, { useState } from 'react';
import cl from './VideoOptions.module.scss';

const ModeList = () => {
  const [mode, setMode] = useState('Full');
	
  const MODES = ['Full', 'Short', 'Super Short'];
  return (
    <ul className={cl.modeList}>
      <li>Full</li>
      <li>Short</li>
      <li>Super Short</li>
    </ul>
  );
};

export default ModeList;
