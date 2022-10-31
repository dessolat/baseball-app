import React from 'react';
import cl from './VideoOptions.module.scss';
import classNames from 'classnames';

const ModeListItem = ({ mode, currentMode }) => {
  const itemClasses = classNames({
    [cl.active]: mode === currentMode
  });

  return <li className={itemClasses}>{mode}</li>;
};

export default ModeListItem;
