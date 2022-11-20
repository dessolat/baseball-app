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
  const viewMode = useSelector(state => state.game.viewMode);

  const timeoutRef = useRef(null);
  const previousTimeRef = useRef(0);
  const clickTimerRef = useRef();

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

  const handleFullscreenBtnClick = () =>
    isFullscreen ? closeFullscreen() : openFullscreen(ref.current.parentElement);

  const playMode = videoState === 1 || videoState === 3 || isSynchronization ? 'pause' : 'play';

  const handleWrapperClick = e => {
    if (e.detail === 1) {
      clickTimerRef.current = setTimeout(() => {
        setPlayPause(playMode)
      }, 200);
    }
    if (e.detail === 2) {
      clearTimeout(clickTimerRef.current);
      handleFullscreenBtnClick();
    }
  };

  const getPlayPauseBtn = () => {
    const comp = playMode === 'play' ? <PlayBtn /> : <PauseBtn />;

    return <button onClick={() => setPlayPause(playMode)}>{comp}</button>;
  };

  const wrapperClasses = classNames(cl.controlsWrapper, {
    [cl.fullOpacity]: videoState === 2,
    [cl.leftZero]: viewMode.slice(-1) === '1'
  });

  return (
    <div
      className={wrapperClasses}
      ref={ref}
      onClick={e => handleWrapperClick(e)}
    >
      <div className={cl.innerWrapper} onClick={e => e.stopPropagation()}>
        <div className={cl.controls}>
          {getPlayPauseBtn()}
          <button onClick={handleFullscreenBtnClick}>
            <FullscreenBtn isOff={!isFullscreen} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(VideoControls);
