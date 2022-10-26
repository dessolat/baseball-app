import React from 'react';
import classNames from 'classnames';
import cl from './CameraList.module.scss';

const CameraListItem = ({ camera, activeMode, handleCameraClick }) => {
  const cameraClasses = classNames([cl.camera], {
    [cl.active]: activeMode.cams_values.includes(camera.number),
		[cl.selected]: camera.number === activeMode.cams_values[activeMode.active_cam - 1]
  });

  return (
    <button className={cameraClasses} data-before={camera.number} onClick={e => handleCameraClick(activeMode.number, camera.number, activeMode.active_cam)}>
      {camera.title}
    </button>
  );
};

export default CameraListItem;
