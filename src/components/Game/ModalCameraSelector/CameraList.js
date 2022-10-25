import React from 'react';
import cl from './CameraList.module.scss';
import CameraListItem from './CameraListItem';

const CameraList = ({ activeNumber }) => {
  const CAMERAS = [
    { number: 1, isActive: false, title: 'Base left main' },
    { number: 2, isActive: false, title: 'Base right main' },
    { number: 3, isActive: false, title: 'Base left add' },
    { number: 4, isActive: false, title: 'Base right add' },
    { number: 5, isActive: false, title: 'Bat left' },
    { number: 6, isActive: false, title: 'Bat right' },
    { number: 7, isActive: false, title: 'Pitch' },
    { number: 8, isActive: false, title: 'IP' }
  ];

  const setIsActive = () => {
		const max = CAMERAS.length
		const cameraIndex = Math.floor(Math.random() * max)

		if (!CAMERAS[cameraIndex].isActive) {
			CAMERAS[cameraIndex].isActive = true
			return
		}

		setIsActive()
	};

  for (let i = 0; i < activeNumber; i++) setIsActive();

  return (
    <div className={cl.camerasContainer}>
      {CAMERAS.map((camera, i) => ( 
        <CameraListItem key={i} camera={camera} />
      ))}
    </div>
  );
};

export default CameraList;
