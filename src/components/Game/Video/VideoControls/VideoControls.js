import React, { forwardRef, useEffect, useRef, useState } from 'react';
import cl from './VideoControls.module.scss';
import PlayBtn from 'components/UI/icons/YTButtons/PlayBtn/PlayBtn';
import SpeedBtn from 'components/UI/icons/YTButtons/SpeedBtn/SpeedBtn';
import { useSelector } from 'react-redux';
import PauseBtn from 'components/UI/icons/YTButtons/PauseBtn/PauseBtn';
import TimeLine from './TimeLine';

const VideoControls = (
  { controlsWrapper, rateChangeHandler, setPlayPause, currentMoment, seekVideos },
  ref
) => {
  const [isSynchronization, setIsSynchronization] = useState(false);

  const videoState = useSelector(state => state.game.videoState);

  const timeoutRef = useRef(null);
  const previousTimeRef = useRef(0);

  useEffect(() => {
    const timeDelta = Date.now() - previousTimeRef.current;
    previousTimeRef.current = Date.now();

    if (timeDelta > 500) return;

    clearTimeout(timeoutRef.current);
    setIsSynchronization(true);

    timeoutRef.current = setTimeout(() => {
      setIsSynchronization(false);
    }, 500);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [videoState]);

  const playPauseBtn =
    videoState === 1 || videoState === 3 || isSynchronization ? (
      <PauseBtn setPlayPause={setPlayPause} />
    ) : (
      <PlayBtn setPlayPause={setPlayPause} />
    );

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
