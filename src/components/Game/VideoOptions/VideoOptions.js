import React from 'react';
import { useSelector } from 'react-redux';
import Effects from './Effects';
import ModeList from './ModeList';
import SpeedSelector from './SpeedSelector';
import cl from './VideoOptions.module.scss';

const VideoOptions = ({ currentTab }) => {
  const currentMoment = useSelector(state => state.game.currentMoment);
  const isBroadcast = useSelector(state => state.game.isBroadcast);
  const viewMode = useSelector(state => state.game.viewMode);
  const preview = useSelector(state => state.game.preview);

  const timeData = {
    pitch: currentMoment.metering?.pitch?.time_start_pitch_window,
    hitting: currentMoment.metering?.hit?.time_start_hit_window
  };

  const isFirstBroadcastedVideo =
    currentTab === 'videos' &&
    !isBroadcast &&
    viewMode === 'mode-1' &&
    JSON.parse(preview.camera_views[0]).cameras[0] === 'broadcast_link';

  const isModeListDisabled = timeData[currentTab] || isBroadcast || isFirstBroadcastedVideo;

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
