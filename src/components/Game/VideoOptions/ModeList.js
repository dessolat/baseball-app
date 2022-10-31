import React from 'react';
import cl from './VideoOptions.module.scss';

const ModeList = () => {
  return (
    <ul className={cl.modeList}>
      <li>Full</li>
      <li>Short</li>
      <li className={cl.active}>
        Super
        <br />
        Short
      </li>
    </ul>
  );
};

export default ModeList;
