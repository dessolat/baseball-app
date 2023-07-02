import React, { useRef, useEffect } from 'react';
import cl from './Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import VideoList from '../VideoList/VideoList';
import { closeFullscreen, openFullscreen } from 'utils';
import SidePanel from './SidePanel';
import BottomPanel from './BottomPanel/BottomPanel';

const Videos = () => {
  const wrapperRef = useRef();
  const timerRef = useRef();
  const controlsWrapperRef = useRef();

  const viewMode = useSelector(s => s.game.viewMode);
  const isFullscreen = useSelector(s => s.game.isFullscreen);
  const currentMoment = useSelector(s => s.game.currentMoment);
  const playerCardFilterFocused = useSelector(s => s.game.playerCardFilterFocused);
  const preferredVideoState = useSelector(s => s.game.preferredVideoState);

  const isMobile = useSelector(s => s.shared.isMobile);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (playerCardFilterFocused) {
      document.removeEventListener('keydown', handleKeyDown);
      return;
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, playerCardFilterFocused]);

  function handleKeyDown(e) {
    if (e.code !== 'KeyF') return;
    e.preventDefault();

    e.code === 'KeyF' && (isFullscreen ? closeFullscreen() : openFullscreen(wrapperRef.current));
  }

  function handleMouseMove() {
    if (!currentMoment.video || isMobile) return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.lastChild.style.opacity = 1;
    controlsWrapperRef.current.lastChild.style.visibility = 'visible';

    timerRef.current = setTimeout(() => {
      if (!controlsWrapperRef.current) return;
      controlsWrapperRef.current.lastChild.style.opacity = 0;
      timerRef.current = setTimeout(() => {
        controlsWrapperRef.current.lastChild.style.visibility = 'hidden';
      }, 300);
    }, 500);
  }

  function handleTouch() {
    if (!currentMoment.video || !isMobile) return;

    clearTimeout(timerRef.current);

    controlsWrapperRef.current.lastChild.style.opacity = 1;
    controlsWrapperRef.current.lastChild.style.visibility = 'visible';

    timerRef.current = setTimeout(
      () => {
        if (!controlsWrapperRef.current) return;
        controlsWrapperRef.current.lastChild.style.opacity = 0;
        timerRef.current = setTimeout(() => {
          controlsWrapperRef.current.lastChild.style.visibility = 'hidden';
        }, 100);
      },
      preferredVideoState === 1 ? 500 : 2500
    );
  }

  

  const outerWrapperClasses = classNames(cl.outerWrapper, cl.mobileLandscapeVideo);
  const wrapperClasses = classNames(cl.wrapper, {
    [cl.videos1]: viewMode === 'mode-1',
    [cl.videos4]: viewMode === 'mode-2' || viewMode === 'mode-3'
  });
  return (
    <div className={outerWrapperClasses} ref={wrapperRef}>
      <div
        className={wrapperClasses}
        onMouseMove={handleMouseMove}
        onClick={handleMouseMove}
        onTouchStart={handleTouch}>
        <VideoList viewMode={viewMode} ref={controlsWrapperRef} />
        
      </div>
      <SidePanel />
      <BottomPanel />
    </div>
  );
};

export default Videos;
