import React from 'react';
import Effects from './Effects';
import ModeList from './ModeList';
import SpeedSelector from './SpeedSelector';
import cl from './VideoOptions.module.scss';

const VideoOptions = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.videoOptions}>
        <ModeList />
        <Effects />
        <SpeedSelector />
      </div>
    </div>
  );
};

export default VideoOptions;