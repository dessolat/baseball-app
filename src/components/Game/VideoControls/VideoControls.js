import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cl from '../Videos/Videos.module.scss';
import FullscreenIcon from 'icons/fullscreen_icon.png';
import CloseFullscreenIcon from 'icons/close_fullscreen_icon.png';
import PauseIcon from 'icons/pause_video_icon.png';
import PlayIcon from 'icons/play_video_icon.png';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const VideoControls = ({ setPlayPause }, ref) => {
  const [isSynchronization, setIsSynchronization] = useState(false);

  const videoState = useSelector(state => state.game.videoState);

  const timeoutRef = useRef(null);
  const previousTimeRef = useRef(0);

  useEffect(() => {
    const timeDelta = Date.now() - previousTimeRef.current;
    previousTimeRef.current = Date.now();

    if (timeDelta > 300) return;

    clearTimeout(timeoutRef.current);
    setIsSynchronization(true);

    timeoutRef.current = setTimeout(() => {
      setIsSynchronization(false);
    }, 300);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [videoState]);

  const openFullscreen = () => {
    const tempRef = ref.current.parentElement;

    if (tempRef.webkitRequestFullscreen) {
      tempRef.webkitRequestFullscreen();
    } else if (tempRef.webkitRequestFullscreen) {
      /* Safari */
      tempRef.webkitRequestFullscreen();
    } else if (tempRef.msRequestFullscreen) {
      /* IE11 */
      tempRef.msRequestFullscreen();
    }
  };
  const closeFullscreen = () => document.exitFullscreen();

  const getPlayPauseBtn = () => {
    const btnName = videoState === 1 || videoState === 3 || isSynchronization ? 'pause' : 'play';
    const src = btnName === 'play' ? PlayIcon : PauseIcon;

    return (
      <button onClick={() => setPlayPause(btnName)}>
        <img src={src} alt={`${btnName}-icon`} />
      </button>
    );
  };

  const wrapperClasses = classNames(cl.controlsWrapper, {
    [cl.fullOpacity]: videoState === 2
  });
  return (
    <div className={wrapperClasses} ref={ref}>
      <div className={cl.controls}>
        {getPlayPauseBtn()}
        <button onClick={openFullscreen} className={cl.openFullscreen}>
          <img src={FullscreenIcon} alt='fullscreen-icon' />
        </button>
        <button onClick={closeFullscreen} className={cl.closeFullscreen}>
          <img src={CloseFullscreenIcon} alt='fullscreen-icon' />
        </button>
      </div>
    </div>
  );
};

export default forwardRef(VideoControls);
