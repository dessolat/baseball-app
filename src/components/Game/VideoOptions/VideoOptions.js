import React from 'react';
import Effects from './Effects';
import ModeList from './ModeList';
import cl from './VideoOptions.module.scss';

const VideoOptions = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.videoOptions}>
				<ModeList />
				<Effects />
			</div>
    </div>
  );
};

export default VideoOptions;