import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cl from '../Videos/Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PlayBtn from 'components/UI/icons/VideoControlsBtns/PlayBtn/PlayBtn';
import PauseBtn from 'components/UI/icons/VideoControlsBtns/PauseBtn/PauseBtn';
import FullscreenBtn from 'components/UI/icons/VideoControlsBtns/FullscreenBtn/FullscreenBtn';
import { closeFullscreen, openFullscreen } from 'utils';

const VideoControls = ({ setPlayPause }, ref) => {
  const [isSynchronization, setIsSynchronization] = useState(false);

  const videoState = useSelector(state => state.game.videoState);
  const isFullscreen = useSelector(state => state.game.isFullscreen);

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

  const handleFullscreenClick = () =>
    isFullscreen ? closeFullscreen() : openFullscreen(ref.current.parentElement);

  const getPlayPauseBtn = () => {
    const btnName = videoState === 1 || videoState === 3 || isSynchronization ? 'pause' : 'play';
    const comp = btnName === 'play' ? <PlayBtn /> : <PauseBtn />;

    return <button onClick={() => setPlayPause(btnName)}>{comp}</button>;
  };

  const wrapperClasses = classNames(cl.controlsWrapper, {
    [cl.fullOpacity]: videoState === 2
  });
  return (
    <div className={wrapperClasses} ref={ref}>
      <div className={cl.innerWrapper}>
        <div className={cl.controls}>
          {getPlayPauseBtn()}
          <button onClick={handleFullscreenClick}>
            <FullscreenBtn isOff={!isFullscreen} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(VideoControls);
