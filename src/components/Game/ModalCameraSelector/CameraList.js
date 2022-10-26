import React from 'react';
import cl from './CameraList.module.scss';
import CameraListItem from './CameraListItem';

const CameraList = ({ activeNumber }) => {
  const MODES_DATA = [
    { cams_number: 1, cams_values: [2], active_cam: null },
    { cams_number: 4, cams_values: [1, 3, 5, 7], active_cam: null },
    { cams_number: 4, cams_values: [2, 6, 4, 8], active_cam: null }
  ];

  const CAMERAS = [
    { number: 1, isActive: true, title: 'Base left main' },
    { number: 2, isActive: false, title: 'Base right main' },
    { number: 3, isActive: true, title: 'Base left add' },
    { number: 4, isActive: false, title: 'Base right add' },
    { number: 5, isActive: true, title: 'Bat left' },
    { number: 6, isActive: false, title: 'Bat right' },
    { number: 7, isActive: true, title: 'Pitch' },
    { number: 8, isActive: false, title: 'IP' }
  ];

  // const setIsActive = () => {
  //   const max = CAMERAS.length;
  //   const cameraIndex = Math.floor(Math.random() * max);

  //   if (!CAMERAS[cameraIndex].isActive) {
  //     CAMERAS[cameraIndex].isActive = true;
  //     return;
  //   }

  //   setIsActive();
  // };

  // for (let i = 0; i < activeNumber; i++) setIsActive();

  return (
    <div className={cl.camerasContainer}>
      {CAMERAS.map((camera, i) => (
        <CameraListItem key={i} camera={camera} index={i}/>
      ))}
			<div className={cl.modesList}>
				<div>
					<button style={{width: '100%', height: '100%', backgroundColor: 'var(--side-color)'}}>

					</button>
				</div>
				<div className={cl.activeMode + ' ' + cl.fourCameras}>
					<button>1</button>
					<button>3</button>
					<button>5</button>
					<button className={cl.activeCameraBtn}>7</button>
				</div>
				<div className={cl.fourCameras}>
					<button>2</button>
					<button>6</button>
					<button>4</button>
					<button>8</button>
				</div>
			</div>
    </div>
  );
};

export default CameraList;
