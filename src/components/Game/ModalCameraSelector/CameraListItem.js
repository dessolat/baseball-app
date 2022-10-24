import React from 'react';
import classNames from 'classnames';
import cl from './CameraList.module.scss';

const CameraListItem = ({ camera }) => {
  const cameraClasses = classNames([cl.camera], {
    [cl.active]: camera.isActive
  });

  return (
    <button className={cameraClasses} data-before={camera.number}>
      {camera.title}
    </button>
  );
};

export default CameraListItem;
