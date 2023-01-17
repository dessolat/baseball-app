// import useCurrentEvents from 'hooks/useCurrentEvents';
import React, { useRef, useEffect } from 'react';
// import PlaysEvents from '../PlaysEvents/PlaysEvents';
import cl from './Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// import VideoEventsList from '../VideoEventsList/VideoEventsList';
import VideoList from '../VideoList/VideoList';
import { closeFullscreen, openFullscreen } from 'utils';
import SidePanel from './SidePanel';
import BottomPanel from './BottomPanel';

const Videos = () => {
  const wrapperRef = useRef();
  const timerRef = useRef();
  const controlsWrapperRef = useRef();

  const viewMode = useSelector(state => state.game.viewMode);
  const isFullscreen = useSelector(state => state.game.isFullscreen);
  const currentMoment = useSelector(state => state.game.currentMoment);
  // const videoState = useSelector(state => state.game.videoState);

  // useEffect(() => {
  //   if (videoState !== 2) return;

  //   clearTimeout(timerRef.current);
  //   controlsWrapperRef.current.style.opacity = 1;
  //   // eslint-disable-next-line
  // }, [videoState]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code !== 'KeyF') return;
      e.preventDefault();

      e.code === 'KeyF' && (isFullscreen ? closeFullscreen() : openFullscreen(wrapperRef.current));
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const wrapperClasses = classNames(cl.wrapper, {
    [cl.videos1]: viewMode === 'mode-1',
    [cl.videos4]: viewMode === 'mode-2' || viewMode === 'mode-3'
  });

  function handleMouseMove() {
    if (!currentMoment.video) return;

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

  return (
    <>
      <div className={cl.outerWrapper} ref={wrapperRef}>
        {/* <div className={wrapperClasses} ref={ref}> */}
        <div className={wrapperClasses} onMouseMove={handleMouseMove} onClick={handleMouseMove}>
          <VideoList viewMode={viewMode} ref={controlsWrapperRef} />
        </div>
        <SidePanel />
        <BottomPanel />
        {/* <VideoEventsList /> */}
        {/* <VideoControls ref={controlsWrapperRef} /> */}
      </div>
      {/* <div className={cl.eventsWrapper}>
        <PlaysEvents />
      </div> */}
    </>
  );
};

export default Videos;
