import React, { forwardRef } from 'react';
import cl from './VideoControls.module.scss';
import PlayBtn from 'components/UI/icons/YTButtons/PlayBtn/PlayBtn';
import SpeedBtn from 'components/UI/icons/YTButtons/SpeedBtn/SpeedBtn';
import { useSelector } from 'react-redux';
import PauseBtn from 'components/UI/icons/YTButtons/PauseBtn/PauseBtn';
import TimeLine from './TimeLine';

const VideoControls = ({ controlsWrapper, rateChangeHandler, setPlayPause, currentMoment, seekVideos }, ref) => {
  const videoState = useSelector(state => state.game.videoState);


  const playPauseBtn =
    videoState === 1 || videoState === 3 ? (
      // videoState === 1 || videoState === 3 || videoState === -1 ? (
      <PauseBtn setPlayPause={setPlayPause} />
    ) : (
      <PlayBtn setPlayPause={setPlayPause} />
    );

  // {`${totalMinutes}:${remainSeconds}`}
  return (
    <div className={controlsWrapper}>
      <TimeLine cl={cl} currentMoment={currentMoment} seekVideos={seekVideos} ref={ref} />
      <div className={cl.buttons}>
        {playPauseBtn}
        <SpeedBtn rateChangeHandler={rateChangeHandler} />
      </div>
    </div>
  );
};

export default forwardRef(VideoControls);
