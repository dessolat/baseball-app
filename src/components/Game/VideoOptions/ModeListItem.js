import React from 'react';
import cl from './VideoOptions.module.scss';
import classNames from 'classnames';

const ModeListItem = ({ mode, currentMode, handleModeClick }) => {
  const itemClasses = classNames({
    [cl.active]: mode === currentMode
  });

  return (
    <li className={itemClasses} onClick={handleModeClick(mode)}>
      {mode}
    </li>
  );
};

export default ModeListItem;
