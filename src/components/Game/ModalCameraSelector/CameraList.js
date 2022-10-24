import React from 'react';
import cl from './CameraList.module.scss';
import CameraListItem from './CameraListItem';

const CAMERAS = [
  { number: 1, isActive: true, title: 'Base left main' },
  { number: 2, isActive: false, title: 'Base right main' },
  { number: 3, isActive: true, title: 'Base left add' },
  { number: 4, isActive: false, title: 'Base right add' },
  { number: 5, isActive: false, title: 'Bat left' },
  { number: 6, isActive: false, title: 'Bat right' },
  { number: 7, isActive: true, title: 'Pitch' },
  { number: 8, isActive: true, title: 'IP' }
];

const CameraList = () => {
  return (
    <div className={cl.camerasContainer}>
      {CAMERAS.map((camera, i) => (
        <CameraListItem key={i} camera={camera} />
      ))}
    </div>
  );
};

export default CameraList;
