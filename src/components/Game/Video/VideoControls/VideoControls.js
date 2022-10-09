import React from 'react';
import cl from './VideoControls.module.scss';
import PlayBtn from 'components/UI/icons/YTButtons/PlayBtn/PlayBtn';
import SpeedBtn from 'components/UI/icons/YTButtons/SpeedBtn/SpeedBtn';
import { useSelector } from 'react-redux';
import PauseBtn from 'components/UI/icons/YTButtons/PauseBtn/PauseBtn';

const VideoControls = ({ controlsWrapper, rateChangeHandler, setPlayPause }) => {
  const videoState = useSelector(state => state.game.videoState);

  const playPauseBtn =
    videoState === 1 || videoState === 3 ? (
    // videoState === 1 || videoState === 3 || videoState === -1 ? (
      <PauseBtn setPlayPause={setPlayPause} />
    ) : (
      <PlayBtn setPlayPause={setPlayPause} />
    );
  return (
    <div className={controlsWrapper}>
      <div className={cl.timeLine}>Timeline</div>
      <div className={cl.buttons}>
        {playPauseBtn}
        <SpeedBtn rateChangeHandler={rateChangeHandler} />
      </div>
    </div>
  );
};

export default VideoControls;
