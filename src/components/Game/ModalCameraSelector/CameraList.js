import classNames from 'classnames';
import React, { useState } from 'react';
import cl from './CameraList.module.scss';
import CameraListItem from './CameraListItem';

const MODES_DATA = [
  { number: 1, cams_values: [2], active_cam: 1, is_active: true },
  { number: 2, cams_values: [1, 3, 5, 7], active_cam: 4, is_active: false },
  { number: 3, cams_values: [2, 6, 4, 8], active_cam: 2, is_active: false }
];

const CAMERAS = [
  { number: 1, title: 'Base left main' },
  { number: 2, title: 'Base right main' },
  { number: 3, title: 'Base left add' },
  { number: 4, title: 'Base right add' },
  { number: 5, title: 'Bat left' },
  { number: 6, title: 'Bat right' },
  { number: 7, title: 'Pitch' },
  { number: 8, title: 'IP' }
];

const CameraList = () => {
  const [modesData, setModesData] = useState(MODES_DATA);

  const handleModeClick = index => {
    !modesData[index].is_active &&
      setModesData(prev =>
        prev.map((mode, i) => (i === index ? { ...mode, is_active: true } : { ...mode, is_active: false }))
      );
  };

  const handleModeValueClick = (modeIndex, valueIndex) => {
    modesData[modeIndex].is_active &&
      setModesData(prev =>
        prev.map((mode, i) => (i === modeIndex ? { ...mode, active_cam: valueIndex + 1 } : mode))
      );
  };

  const handleCameraClick = (activeModeNumber, cameraNumber, activeCam) => {
    setModesData(prev =>
      prev.map((mode, i) => {
        if (mode.number === activeModeNumber) {
          const values = mode.cams_values;
          values[activeCam - 1] = cameraNumber;

          return { ...mode, cams_values: values };
        }
        return mode;
      })
    );
  };

  const activeMode = modesData.find(mode => mode.is_active);

  return (
    <div className={cl.camerasContainer}>
      {CAMERAS.map((camera, i) => (
        <CameraListItem
          key={i}
          camera={camera}
          activeMode={activeMode}
          handleCameraClick={handleCameraClick}
        />
      ))}
      <div className={cl.modesList}>
        {modesData.map((mode, i) => {
          const modeClasses = classNames({
            [cl.oneCamera]: mode.cams_values.length === 1,
            [cl.fourCameras]: mode.cams_values.length === 4,
            [cl.activeMode]: mode.is_active
          });
          return (
            <div key={i} className={modeClasses} onClick={e => handleModeClick(i)}>
              {mode.cams_values.map((value, j) => {
                const valueClasses = classNames({
                  [cl.activeCameraBtn]: mode.is_active && mode.active_cam - 1 === j
                });
                return (
                  <button key={j} className={valueClasses} onClick={e => handleModeValueClick(i, j)}>
                    {value}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CameraList;
