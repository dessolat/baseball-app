// import useCurrentEvents from 'hooks/useCurrentEvents';
import React, { useRef } from 'react';
// import PlaysEvents from '../PlaysEvents/PlaysEvents';
import cl from './Videos.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// import VideoEventsList from '../VideoEventsList/VideoEventsList';
import VideoList from '../VideoList/VideoList';

const Videos = () => {
  const wrapperRef = useRef();
  const timerRef = useRef();
  const controlsWrapperRef = useRef();

  const viewMode = useSelector(state => state.game.viewMode);
  // const videoState = useSelector(state => state.game.videoState);

  // useEffect(() => {
  //   if (videoState !== 2) return;

  //   clearTimeout(timerRef.current);
  //   controlsWrapperRef.current.style.opacity = 1;
  //   // eslint-disable-next-line
  // }, [videoState]);

  const wrapperClasses = classNames(cl.wrapper, {
    [cl.videos1]: viewMode === 'mode-1',
    [cl.videos2]: viewMode === 'mode-2',
    [cl.videos3]: viewMode === 'mode-3',
    [cl.videos4]: viewMode === 'mode-4'
  });

  function handleMouseMove() {
    clearTimeout(timerRef.current);

    controlsWrapperRef.current.style.opacity = 1;

    timerRef.current = setTimeout(() => {
      controlsWrapperRef.current.style.opacity = 0;
    }, 1000);
  }
  
  return (
    <>
      <div className={wrapperClasses} onMouseMove={handleMouseMove} ref={wrapperRef}>
        {/* <div className={wrapperClasses} ref={ref}> */}
        <VideoList viewMode={viewMode} ref={controlsWrapperRef} />
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
