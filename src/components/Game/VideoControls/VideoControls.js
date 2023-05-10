import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cl from '../Videos/Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PlayBtn from 'components/UI/icons/VideoControlsBtns/PlayBtn/PlayBtn';
import PauseBtn from 'components/UI/icons/VideoControlsBtns/PauseBtn/PauseBtn';
import FullscreenBtn from 'components/UI/icons/VideoControlsBtns/FullscreenBtn/FullscreenBtn';
import { closeFullscreen, openFullscreen } from 'utils';
import { useDispatch } from 'react-redux';
import { setPreferredVideoState } from 'redux/gameReducer';
import useGameFocus from 'hooks/useGameFocus';

const VideoControls = ({ setPlayPause, fullscreenAvailable = true }, ref) => {
  const [isSynchronization, setIsSynchronization] = useState(false);

  const setGameFocus = useGameFocus('timeline');

  const videoState = useSelector(state => state.game.videoState);
  const isFullscreen = useSelector(state => state.game.isFullscreen);
  const viewMode = useSelector(state => state.game.viewMode);
  const preferredVideoState = useSelector(state => state.game.preferredVideoState);

  const isMobile = useSelector(s => s.shared.isMobile);

  const dispatch = useDispatch();

  const timeoutRef = useRef(null);
  const previousTimeRef = useRef(0);
  const clickTimerRef = useRef();

	const isFullscreenModeAvailable = fullscreenAvailable && !isMobile

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

  const handleFullscreenBtnClick = () => {
    if (isMobile) return;

    isFullscreen ? closeFullscreen() : openFullscreen(ref.current.parentElement.parentElement);
  };
  const handleFullscreenBtnTouch = () => {
    if (!isMobile) return;

    isFullscreen ? closeFullscreen() : openFullscreen(ref.current.parentElement.parentElement);
  };

  const playMode = videoState === 1 || videoState === 3 || isSynchronization ? 'pause' : 'play';
  const prefVideoStateValue = playMode === 'play' ? 1 : 2;

  const handleWrapperClick = e => {
    if (isMobile) return;
    // console.log(ref.current.lastChild.style.visibility);

    if (e.detail === 1) {
      clickTimerRef.current = setTimeout(() => {
        setPlayPause(playMode);
        dispatch(setPreferredVideoState(prefVideoStateValue));
      }, 200);
    }

    if (!isFullscreenModeAvailable) return;

    if (e.detail === 2) {
      clearTimeout(clickTimerRef.current);
      handleFullscreenBtnClick();
    }
  };

  const handlePlayPauseBtnClick = e => {
    if (isMobile) return;

    // const prefVideoStateValue = playMode === 'play' ? 1 : 2
    const prefVideoStateValue = preferredVideoState === 1 ? 2 : 1;
    const playMode = preferredVideoState === 1 ? 'pause' : 'play';

    // playMode === 'pause' && clearTimeout(playTimeout);
    setPlayPause(playMode);
    dispatch(setPreferredVideoState(prefVideoStateValue));
  };
  const handlePlayPauseBtnTouch = e => {
    if (!isMobile) return;

    console.log(e);
    // const prefVideoStateValue = playMode === 'play' ? 1 : 2
    const prefVideoStateValue = preferredVideoState === 1 ? 2 : 1;
    const playMode = preferredVideoState === 1 ? 'pause' : 'play';

    // playMode === 'pause' && clearTimeout(playTimeout);
    setPlayPause(playMode);
    dispatch(setPreferredVideoState(prefVideoStateValue));
  };

  const getPlayPauseBtn = () => {
    const comp = preferredVideoState !== 1 ? <PlayBtn /> : <PauseBtn />;
    // const comp = playMode === 'play' ? <PlayBtn /> : <PauseBtn />;

    return (
      <button onClick={handlePlayPauseBtnClick} onTouchStart={handlePlayPauseBtnTouch}>
        {comp}
      </button>
    );
  };

  const wrapperClasses = classNames(cl.controlsWrapper, {
    [cl.fullOpacity]: videoState === 2,
    [cl.leftZero]: viewMode.slice(-1) === '1'
  });

  const handleInnerWrapperClick = e => {
    e.stopPropagation();
    setGameFocus();
  };
  return (
    <div className={wrapperClasses} ref={ref} onClick={e => handleWrapperClick(e)}>
      <div
        className={cl.activeArea}
        style={{ position: 'absolute', left: '5%', top: 0, right: '57%', bottom: 0 }}></div>
      <div
        className={cl.activeArea}
        style={{ position: 'absolute', left: '50%', top: 0, right: '5%', bottom: 0 }}></div>
      <div
        className={cl.innerWrapper}
        style={isFullscreenModeAvailable ? null : { width: '10rem' }}
        onClick={handleInnerWrapperClick}>
        <div className={cl.controls} style={isFullscreenModeAvailable ? null : { width: '10rem' }}>
          {getPlayPauseBtn()}
          {isFullscreenModeAvailable && (
            <button onClick={handleFullscreenBtnClick} onTouchStart={handleFullscreenBtnTouch}>
              <FullscreenBtn isOff={!isFullscreen} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(VideoControls);
