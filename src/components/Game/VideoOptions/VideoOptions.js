import React from 'react';
import { useSelector } from 'react-redux';
import Effects from './Effects';
import ModeList from './ModeList';
import SpeedSelector from './SpeedSelector';
import cl from './VideoOptions.module.scss';

const VideoOptions = ({ currentTab }) => {
  const currentMoment = useSelector(state => state.game.currentMoment);
  const isBroadcast = useSelector(state => state.game.isBroadcast);

  const timeData = {
    pitch: currentMoment.metering?.pitch?.time_start_pitch_window,
    hitting: currentMoment.metering?.hit?.time_start_hit_window
  };

  const isModeListDisabled = timeData[currentTab] || isBroadcast;
  return (
    <div className={cl.wrapper}>
      <div className={cl.videoOptions}>
        <ModeList disabled={isModeListDisabled} />
        <Effects />
        <SpeedSelector />
      </div>
    </div>
  );
};

export default VideoOptions;
