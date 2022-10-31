import React from 'react';
import ModeList from './ModeList';
import cl from './VideoOptions.module.scss';

const VideoOptions = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.videoOptions}>
				<ModeList />
			</div>
    </div>
  );
};

export default VideoOptions;
